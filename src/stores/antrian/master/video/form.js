import { defineStore } from 'pinia'
import { api } from 'boot/axios'
// import { routerInstance } from 'src/boot/router'
import { notifSuccess } from 'src/modules/utils'
// import { Dialog } from 'quasar'

export const useVideoFormStore = defineStore('video_form', {
  state: () => ({
    tempImg: null,
    form: {
      // id: null,
      nama: null,
      url: null,
      type: null
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
      this.tempImg = null
      this.form = {}
      const columns = [
        'nama',
        'url',
        'type'
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
      console.log(item)
      this.edited = true
      // const keys = Object.keys(item)
      // keys.forEach((key, index) => {
      //   this.setForm(key, item[key])
      // })
      // kecuali yang ada di object user
      this.tempImg = null
      this.form = item
      this.dialog = true
    },

    async saveForm() {
      this.loading = true
      // this.setForm('details', arr)
      const formData = new FormData()
      formData.append('video', this.tempImg)
      formData.append('nama', this.form.nama)
      formData.append('type', this.form.type)
      try {
        const resp = await api.post('/v1/video/store', formData)
        console.log('save data', resp)
        notifSuccess(resp)

        this.loading = false
        return new Promise((resolve) => {
          this.resetFORM()
          resolve(resp)
        })
      } catch (error) {
        console.log('error upload', error)
        this.loading = false
      }
    }
    // async getDisplays() {
    //   const resp = await api.get('/v1/masterunit/displays')
    //   console.log('display', resp)
    //   if (resp.status === 200) {
    //     this.displays = resp.data
    //   }
    // }
  }
})
