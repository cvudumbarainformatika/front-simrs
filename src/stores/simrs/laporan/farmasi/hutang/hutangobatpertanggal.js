import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'

export const usehutangObatPerTanggalStore = defineStore('laporan_hutang_obat_pertanggal', {
  state: () => ({
    loading: false,
    items: [],
    meta: {},
    tanggal: {
      from: date.formatDate(Date.now(), 'DD MMMM YYYY')
    },
    params: {
      tgldari: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      jenisreport: ''
      // ruangan: ''
    }
  }),
  actions: {
    async initAmbilData () {
      this.laporanHutangObatPertanggal()
    },
    async laporanHutangObatPertanggal () {
      this.loading = true
      const params = { params: this.params }
      await api.get('v1/simrs/laporan/farmasi/hutang/reportObatPesananBytanggal', params)
        .then((resp) => {
          if (resp.status === 200) {
            const datahasil = resp?.data
            this.sethasilx(datahasil)
          }
        })
        .catch((err) => {
          console.log(err)
          this.loading = false
        })
    },
    sethasil (val) {
      console.log('sasa', val)
    }
  }
})
