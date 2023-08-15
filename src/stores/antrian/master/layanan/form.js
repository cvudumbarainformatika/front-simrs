import { defineStore } from 'pinia'
import { api } from 'boot/axios'
// import { routerInstance } from 'src/boot/router'
import { notifSuccess } from 'src/modules/utils'
// import { Dialog } from 'quasar'

export const useMasterLayananFormStore = defineStore('layanan_form', {
  state: () => ({

    form: {
      // id: null,
      id_layanan: null,
      nama: null,
      kode: null
    },
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
        'id_layanan',
        'nama',
        'kode'
      ]
      for (let i = 0; i < columns.length; i++) {
        this.setForm(columns[i], null)
      }
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
        const resp = await api.post('/v1/layanan/store', this.form)
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
    }
    // async getLayanans() {
    //   const resp = await api.get('/v1/masterunit/layanans')
    //   console.log('layanan', resp)
    //   if (resp.status === 200) {
    //     this.layanans = resp.data
    //   }
    // }
  }
})
