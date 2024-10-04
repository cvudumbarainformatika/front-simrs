import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'

export const registerJurnal = defineStore('register_jurnal', {
  state: () => ({
    loading: false,
    disabled: false,
    reqs: {
      q: '',
      bulan: date.formatDate(Date.now(), 'MM'),
      tahun: date.formatDate(Date.now(), 'YYYY')
    },
    display: {
      sekarang: date.formatDate(Date.now(), 'DD MMMM YYYY')
    },
    bulans: [
      { nama: 'Januari', value: '01' },
      { nama: 'Februari', value: '02' },
      { nama: 'Maret', value: '03' },
      { nama: 'April', value: '04' },
      { nama: 'Mei', value: '05' },
      { nama: 'Juni', value: '06' },
      { nama: 'Juli', value: '07' },
      { nama: 'Agustus', value: '08' },
      { nama: 'September', value: '09' },
      { nama: 'Oktober', value: '10' },
      { nama: 'November', value: '11' },
      { nama: 'Desember', value: '12' }
    ],
    regjurnal: []
  }),
  actions: {
    getRegJurnal () {
      this.loading = true
      const params = { params: this.reqs }
      return new Promise((resolve) => {
        api.get('v1/akuntansi/registerjurnal/regjurnal', params).then((resp) => {
          console.log('Register Jurnal', resp.data)
          if (resp.status === 200) {
            this.regjurnal = resp.data

            this.loading = false
            resolve(resp.data)
          }
        }).catch(() => { this.loading = false })
      })
    }
  }

})
