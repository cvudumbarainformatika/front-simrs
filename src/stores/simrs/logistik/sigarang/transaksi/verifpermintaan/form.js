import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useVerifPermintaanRuangan = defineStore('verif_permintaan_ruangan', {
  state: ({
    loading: false,
    permintaans: []
  }),
  actions: {
    // local related function

    // api related function
    // ambil permintaan yang sudah selesai
    getPermintaan() {
      this.loading = true
      return new Promise((resolve, reject) => {
        api.get('v1/transaksi/permintaanruangan/get-perrmintaan')
          .then(resp => {
            this.loading = false
            console.log(resp)
            this.permintaans = resp.data
            resolve(resp)
          })
          .then(err => {
            this.loading = false
            reject(err)
          })
      })
    }
  }
})
