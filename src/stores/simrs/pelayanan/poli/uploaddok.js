import { defineStore } from 'pinia'
// eslint-disable-next-line no-unused-vars
import { api } from 'src/boot/axios'
// eslint-disable-next-line no-unused-vars
import { usePengunjungPoliStore } from './pengunjung'
// eslint-disable-next-line no-unused-vars
import { notifErr, notifSuccess } from 'src/modules/utils'

export const useUploadDokStore = defineStore('upload-dok-poli', {
  state: () => ({
    masters: [],
    form: {},
    loadingSave: false
  }),
  actions: {

    initForm() {
      // anamnesis tambahan
      this.form.nama = null
      this.form.dokumen = []
    },

    getMaster() {
      return new Promise((resolve, reject) => {
        api.get('v1/simrs/pelayanan/dokumenupload/master')
          .then((resp) => {
            console.log(resp)
            if (resp.status === 200) {
              this.masters = resp.data
            }
          })
          .catch((err) => {
            console.log(err)
            reject(err)
          })
      })
    },

    selectFiles(files) {
      for (let i = 0; i < files.length; i++) {
        const images = files[i]
        this.form.dokumen.push(images)
      }
      // console.log(this.form)
    },

    saveData(pasien) {
      this.form.noreg = pasien?.noreg
      this.form.norm = pasien?.norm

      const data = new FormData()
      for (let i = 0; i < this.form.dokumen; i++) {
        const images = this.form.dokumen[i]
        data.append(`dokumen[${i}]`, images)
      }
      data.append('noreg', pasien?.noreg)
      data.append('norm', pasien?.norm)
      data.append('nama', this.form.nama)
      this.loadingSave = true
      // console.log(data)
      return new Promise((resolve, reject) => {
        api.post('v1/simrs/pelayanan/dokumenupload/store', this.form, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then((resp) => {
            // console.log('upload', resp)
            if (resp.status === 200) {
              const storePasien = usePengunjungPoliStore()
              const isi = resp.data.result
              storePasien.injectDataPasien(pasien, isi, 'dokumenluar')
              notifSuccess(resp)
              this.initForm()
              this.loadingSave = false
            }
            this.loadingSave = false
          })
          .catch((err) => {
            console.log(err)
            this.loadingSave = false
            reject(err)
          })
      })
    },

    deleteData(pasien, id) {
      const payload = { id }
      return new Promise((resolve, reject) => {
        api.post('v1/simrs/pelayanan/dokumenupload/deletedata', payload)
          .then((resp) => {
            // console.log('del', resp)
            if (resp.status === 200) {
              const storePasien = usePengunjungPoliStore()
              storePasien.hapusDataInjectan(pasien, id, 'dokumenluar')
              notifSuccess(resp)
            }
          })
          .catch((err) => {
            console.log(err)
            reject(err)
          })
      })
    }

    // previewData(item) {
    //   this.preview = true
    //   this.form = item
    // }

  }
})
