import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { filterDuplicateArrays } from 'src/modules/utils'

export const usehutangObatPerTanggalStore = defineStore('laporan_hutang_obat_pertanggal', {
  state: () => ({
    loading: false,
    items: [],
    detail: [],
    meta: {},
    kolom: [],
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
      this.kolom = ['PBF', 'Total']
      const params = { params: this.params }
      await api.get('v1/simrs/laporan/farmasi/hutang/reportObatPesananBytanggal', params)
        .then((resp) => {
          if (resp.status === 200) {
            const datahasil = resp?.data
            this.sethasil(datahasil)
          }
        })
        .catch((err) => {
          console.log(err)
          this.loading = false
        })
    },
    sethasil (val) {
      const wew = []
      val.forEach(element => {
        const kodepbf = element?.kdpbf
        const namapbfx = element?.pihakketiga?.nama
        // const kodepbf = filterDuplicateArrays(val.map(m => m?.kdpbf))
        const rincian = element?.penerimaanrinci
        const subtotalz = rincian.reduce((x, y) => parseFloat(x) + parseFloat(y.subtotal), 0)

        const xxx = {
          kodepbf,
          namapbfx,
          subtotalz
        }

        wew.push(xxx)
      })

      const kodepbf = filterDuplicateArrays(wew.map(m => m?.kodepbf))
      const hasilglobal = []

      kodepbf.forEach(sasa => {
        const subtotal = wew?.filter(m => m.kodepbf === sasa)?.reduce((x, y) => parseFloat(x) + parseFloat(y.subtotalz), 0)
        const pbfnama = wew.find(kd => kd.kodepbf === sasa)
        const hasilglobalzz = {
          kodepbfp: sasa,
          PBF: pbfnama?.namapbfx,
          Total: subtotal
        }
        hasilglobal.push(hasilglobalzz)
      })
      // const nopenrimaanhx = []

      this.items = hasilglobal
      this.loading = false
    },
    refreshTable () {
      this.initAmbilData()
    }
  }
})
