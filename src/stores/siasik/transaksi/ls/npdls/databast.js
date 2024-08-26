import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const dataBastFarmasi = defineStore('data_Bast_Farmasi', {
  state: () => ({
    loading: false,
    reqs: {
      q: '',
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 0,
      kodepenerima: null,
      kodekegiatan: null,
      kodebast: null,
      rincianbast: null
    },
    form: {
      bast: null
    },
    bastfarmasis: [],
    rekening50: [],
    ambilrekfarmasi: {},
    itembelanja: []
  }),
  actions: {
    setParams (key, val) {
      this.reqs[key] = val
    },
    getDataBast () {
      this.selectbastFarmasi()
    },
    refreshTable () {
      this.reqs.page = 1
      this.getDataBast()
    },
    onRequest (props) {
      // console.log('props', props)
      this.reqs.page = props?.pagination?.page ?? 1
      this.reqs.rowsPerPage = props?.pagination?.rowsPerPage ?? 10
      this.getDataBast()
    },
    goToPage (val) {
      this.reqs.page = val
      this.getDataBast()
    },

    selectbastFarmasi () {
      this.loading = true
      const params = { params: this.reqs }
      return new Promise((resolve) => {
        api.get('/v1/transaksi/belanja_ls/bastfarmasi', params)
          .then((resp) => {
            if (resp.status === 200) {
              console.log('farmasi', resp.data.data)
              this.loading = false
              this.bastfarmasis = resp.data.data
              this.reqs.rowsNumber = resp.data.total
              this.rekening50 = resp.data.data
              this.filterRekening50(resp.data)
              this.ambilRekeningFarmasi(resp.data)

              resolve(resp.data)
            }
            else {
              this.loading = false
            }
          })
          .catch(() => {
            this.loading = false
          })
      })
    },
    filterRekening50 () {
      const dataPagu = []
      for (let i = 0; i < this.rekening50.length; i++) {
        const el = this.rekening50[i].rincianbast
        const master = el.length
          ? el.map((x) => {
            // const a = x.masterobat.pagu.koderek108
            return {
              rek50: x.masterobat.pagu.koderek50,
              uraian50: x.masterobat.pagu.uraian50,
              itembelanja: x.masterobat.pagu.usulan,
              rek108: x.masterobat.pagu.koderek108,
              item: x.masterobat.pagu.usulan,
              harga: x.masterobat.pagu.harga,
              satuan: x.masterobat.pagu.satuan,
              volume: x.masterobat.pagu.volume,
              pagu: parseFloat(x.masterobat.pagu.pagu),
              id_bast: x.id,
              hargabast: x.harga_net,
              volumebast: x.jumlah,
              subtotal: parseFloat(x.subtotal),
              realisasi: x.masterobat.pagu.realisasi.map(x => parseFloat(x.total_realisasi)).reduce((a, b) => a + b, 0)
            }
          })
          : []
        // const filter = master.filter((z, a) => z.rek108 === a.rek108)
        //   .reduce((x, y) => x + y, 0)
        dataPagu.push(...master)
      }
      this.rekening50 = dataPagu
      console.log('rincian BAST', dataPagu)

      // FITER DATA UNIK
      const unik108 = this.rekening50.map((s) => s.rek108)
      const unik = unik108.length ? [...new Set(unik108)] : []
      // console.log('unik', unik)

      // ITEM UNTUK FARMASI
      const arr = []
      for (let i = 0; i < unik.length; i++) {
        const el = unik[i]
        const obj = {
          rek50: dataPagu.filter((z) => z.rek108 === el)[0]?.rek50,
          uraian50: dataPagu.filter((z) => z.rek108 === el)[0]?.uraian50,
          id_bast: dataPagu.filter((z) => z.rek108 === el)[0]?.id_bast,
          itembelanja: dataPagu.filter((z) => z.rek108 === el)[0]?.itembelanja,
          rek108: dataPagu.filter((z) => z.rek108 === el)[0]?.rek108,
          item: dataPagu.filter((z) => z.rek108 === el)[0]?.item,
          harga: parseFloat(dataPagu.filter((z) => z.rek108 === el)[0]?.harga),
          satuan: dataPagu.filter((z) => z.rek108 === el)[0]?.satuan,
          volume: parseFloat(dataPagu.filter((z) => z.rek108 === el)[0]?.volume),
          pagu: parseFloat(dataPagu.filter((z) => z.rek108 === el)[0]?.pagu),
          // hargabast: dataPagu.filter((z) => z.rek108 === el).map((x) => x.hargabast)[i] * dataPagu.filter((z) => z.rek108 === el).map((x) => x.volumebast)[i],
          hargabast: dataPagu.filter((z) => z.rek108 === el).map((x) => x.subtotal).reduce((a, b) => a + b, 0),
          volumebast: 1,
          subtotal: dataPagu.filter((z) => z.rek108 === el).map((x) => x.subtotal).reduce((a, b) => a + b, 0),
          realisasi: parseFloat(dataPagu.filter((z) => z.rek108 === el).map((x) => x.realisasi)).reduce((a, b) => a + b, 0)
          // sisapagu: parseFloat(dataPagu.filter((z) => z.rek108 === el)[0]?.pagu) - parseFloat(dataPagu.filter((z) => z.rek108 === el).map((x) => x.realisasi)).reduce((a, b) => a + b, 0)
        }
        arr.push(obj)
      }
      this.itembelanja.push(...arr)
      console.log('baru', this.itembelanja)
      // this.rekening50.filter((z) => z?.rek108 ===)
    }
    // ambilRekeningFarmasi () {
    //   const data = this.rekening50

    //   console.log('rincian baru', data)
    // }

  }
})
