import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useQrCodeStore = defineStore('qr_code_store', {
  state: () => ({
    newQr: '',
    loading: false
  }),
  actions: {
    getQrCode() {
      this.loading = true
      return new Promise((resolve, reject) => {
        api.get('v1/pegawai/absensi/qr/get-qr')
          .then(resp => {
            this.loading = false
            console.log(resp)
            if (Object.keys(resp.data).length) {
              this.newQr = resp.data.code
              resolve('has data')
            } else {
              resolve('no data')
            }
          })
          .catch(err => {
            this.loading = false
            reject(err)
          })
      })
    }
  }
})
