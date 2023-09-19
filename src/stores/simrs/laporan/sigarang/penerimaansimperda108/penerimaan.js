import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { filterDuplicateArrays } from 'src/modules/utils'

export const useSimrsLaporanSigarangPenerimaanSimperda108Store = defineStore('laporan_penerimaan_simperda_108_sigarang', {
  state: () => ({
    loading: false,
    items: [],
    level4: {},
    level5: {},
    params: {
      q: '',
      per_page: 10,
      page: 1,
      // tgl: date.formatDate(Date.now(), 'YYYY-05-01'),
      tgl: date.formatDate(Date.now(), 'YYYY-MM-01'),
      tglx: date.formatDate(Date.now(), 'YYYY-MM-DD')
    }
  }),
  actions: {
    setParam(key, val) {
      this.params[key] = val
    },
    mapingItems(val) {
      // kode108
      // kode_barang

      const adaisi = val.filter(a => a.rincianpenerimaan.length)
      if (adaisi.length) {
        adaisi.forEach(isi => {
          // ambil kode 108
          const satuNol = isi.rincianpenerimaan.map(rin => rin.kode_108)
          isi.kode108 = []
          if (satuNol.length) {
            // filter duplicated
            // console.log('satunol', satuNol)
            const filtSatu = filterDuplicateArrays(satuNol)
            filtSatu.forEach(sat => {
              const anu = isi.rincianpenerimaan.filter(is => is.kode_108 === sat)
              const jumlah = anu.map(rin => rin.subtotal).reduce((a, b) => a + b, 0)
              // console.log('jumlah', jumlah)
              const temp = {
                kode_108: sat,
                uraian_108: anu[0].uraian_108,
                kode_barang: anu,
                subtotal: jumlah
              }
              isi.kode108.push(temp)
              // console.log('anu', anu)
            })
          }
          const subt = isi.kode108.map(rin => rin.subtotal).reduce((a, b) => a + b, 0)
          isi.subtotal = subt
          // console.log('subt', subt)
        })
        const lv4 = val.filter(a => a.kode === '5.1.02.01')
        if (lv4.length) this.level4 = lv4[0]
        const lv5 = val.filter(a => a.kode === '5.1.02.01.01')
        if (lv5.length) this.level5 = lv5[0]
        console.log('lv4', lv4)
        console.log('lv5', lv5)
        const jml = adaisi.map(rin => rin.subtotal).reduce((a, b) => a + b, 0)
        console.log('ada isi', jml)
        this.level4.nilai = jml
        this.level5.nilai = jml
        this.items = adaisi
      }
    },
    getInitialData() {
      this.getDataPenerimaan()
    },
    getDataPenerimaan() {
      this.loading = true
      const param = { params: this.params }
      return new Promise(resolve => {
        api.get('v1/simrs/laporan/sigarang/lappenerimaan', param)
          .then(resp => {
            this.loading = false
            console.log('laporan penerimaan', resp.data)
            this.mapingItems(resp.data)
            resolve(resp)
          })
          .catch(() => { this.loading = false })
      })
    }
  }
})
