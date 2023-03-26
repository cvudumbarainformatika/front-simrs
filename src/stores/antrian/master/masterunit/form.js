import { defineStore } from 'pinia'
import { api } from 'boot/axios'
// import { routerInstance } from 'src/boot/router'
import { notifSuccess } from 'src/modules/utils'
// import { Dialog } from 'quasar'

export const useMasterUnitFormStore = defineStore('masterunit_form', {
  state: () => ({

    form: {
      // id: null,
      loket: null,
      layanan_id: null,
      kuotajkn: 60,
      kuotanonjkn: 40,
      loket_no: 1,
      tersedia: 'ada'
    },
    layanans: [],
    loading: false,
    dialog: false,
    edited: false,
    titleDialog: 'Tambah Data'
  }),

  getters: {
  },

  actions: {
    resetFORM() {
      this.form = {}
      const columns = [
        // 'id',
        'loket',
        'layanan_id',
        'kuotajkn',
        'kuotanonjkn',
        'loket_no',
        'tersedia'
      ]
      for (let i = 0; i < columns.length; i++) {
        this.setForm(columns[i], null)
      }
      this.setForm('loket_no', 1)
      this.setForm('kuotajkn', 60)
      this.setForm('kuotanonjkn', 40) // kuotajkn
    },
    setForm(name, val) {
      this.form[name] = val
    },
    addNew() {
      this.resetFORM()
      this.edited = false
      this.dialog = true
    },
    editData(item) {
      // console.log(item)
      this.edited = true
      // const keys = Object.keys(item)
      // keys.forEach((key, index) => {
      //   this.setForm(key, item[key])
      // })
      // kecuali yang ada di object user
      this.form = item
      this.dialog = true
    },

    async saveForm() {
      this.loading = true
      // this.setForm('details', arr)
      try {
        const resp = await api.post('/v1/masterunit/store', this.form)
        console.log('save data', resp)
        notifSuccess(resp)

        this.loading = false
        return new Promise((resolve) => {
          this.resetFORM()
          resolve(resp)
        })
      } catch (error) {
        this.loading = false
      }
    },
    async getLayanans() {
      const resp = await api.get('/v1/masterunit/layanans')
      console.log('layanan', resp)
      if (resp.status === 200) {
        this.layanans = resp.data
      }
    }
  }
})
