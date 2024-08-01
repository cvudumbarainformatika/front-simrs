import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifSuccessVue } from 'src/modules/utils'

export const useMasterDokumenPasienStore = defineStore('master-dokumen-pasien', {
  state: () => ({
    isOpen: false,
    edit: false,
    loading: false,
    isi: '',
    params: {
      kelompok: null,
      pernyataan: null
    },
    form: {}

  }),
  actions: {

    async getDokumen () {
      return new Promise((resolve, reject) => {
        const params = { params: this.params }
        api.get('/v1/simrs/pendaftaran/generalconscent/mastergeneralconsent', params)
          .then(resp => {
            if (resp.status === 200) {
              const data = resp.data.length ? resp.data[0] : null
              // console.log('dokumen data', data)
              if (data) {
                this.kelompok = data.kelompok
                this.isi = data.pernyataan ?? ''
              }

              // console.log('dokumen', this.isi)
            }

            resolve(resp)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    async changeIsi (kelompok) {
      const params = {
        kelompok,
        pernyataan: this.isi
      }
      await api.post('v1/simrs/pendaftaran/generalconscent/simpanmaster', params)
        .then(resp => {
          // console.log(resp)
          notifSuccessVue('Data Sukses tersimpan')
        })
    }
  }
})
