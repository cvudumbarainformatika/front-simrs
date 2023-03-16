import { defineStore } from 'pinia'
import { api } from 'boot/axios'
// import { routerInstance } from 'src/boot/router'
import { notifSuccess } from 'src/modules/utils'
// import { Dialog } from 'quasar'

export const useFormMasterPoliStore = defineStore('master_poli_form', {
  state: () => ({

    form: {
      // id: null,
      kode_simrs: null,
      kode_bpjs: null,
      nama: null,
      max: 30,
      max_ol: 20
    },
    loading: false,
    dialog: false,
    edited: false,
    titleDialog: 'Tambah Data'
  }),

  getters: {
  },

  actions: {
    resetFORM () {
      this.form = {}
      const columns = [
        // 'id',
        'kode_simrs',
        'kode_bpjs',
        'nama',
        'max',
        'max_ol'
      ]
      for (let i = 0; i < columns.length; i++) {
        this.setForm(columns[i], null)
      }
      this.setForm('max', 30)
      this.setForm('max_ol', 20)
    },
    setForm (name, val) {
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

    async saveForm () {
      this.loading = true
      // this.setForm('details', arr)
      try {
        const resp = await api.post('/v1/masterpoli/store', this.form)
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
  }
})
