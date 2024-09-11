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
    konsinyasis: [],
    datakons: [],
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
      // this.bastfarmasis = true
      // this.konsinyasis = true
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
              this.bastfarmasis = []
              this.konsinyasis = []

              console.log('farmasi', resp.data)
              this.loading = false
              this.bastfarmasis = resp.data.penerimaan.data
              console.log('bast penerimaan', this.bastfarmasis)
              this.konsinyasis = resp.data.konsinyasi.data
              console.log('konsinyasi', this.konsinyasis)
              this.reqs.rowsNumber = resp.data.total
              // this.rekening50 = resp.data.data
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
      if (this.bastfarmasis.length) {
        const dataPagu = []
        for (let i = 0; i < this.bastfarmasis.length; i++) {
          const el = this.bastfarmasis[i].rincianbast
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
                nobast: x.nobast,
                hargabast: x.harga_net,
                volumebast: x.jumlah,
                subtotal: parseFloat(x.subtotal),
                nominalpembayaran: parseFloat(x.subtotal),
                realisasi: x.masterobat.pagu.realisasi.map(x => parseFloat(x.total_realisasi)).reduce((a, b) => a + b, 0)
              }
            })
            : []
          // const filter = master.filter((z, a) => z.rek108 === a.rek108)
          //   .reduce((x, y) => x + y, 0)
          dataPagu.push(...master)
        }
        this.rekening50 = dataPagu
        const unik108 = this.rekening50.map((s) => s.rek108)
        const unik = unik108.length ? [...new Set(unik108)] : []

        // ITEM UNTUK FARMASI
        const arr = []
        for (let i = 0; i < unik.length; i++) {
          const el = unik[i]
          const obj = {
            koderek50: dataPagu.filter((z) => z.rek108 === el)[0]?.rek50,
            rincianbelanja: dataPagu.filter((z) => z.rek108 === el)[0]?.uraian50,
            idserahterima_rinci: dataPagu.filter((z) => z.rek108 === el)[0]?.id_bast,
            nopenerimaan: dataPagu.filter((z) => z.rek108 === el)[0]?.nobast,
            itembelanja: dataPagu.filter((z) => z.rek108 === el)[0]?.itembelanja,
            koderek108: dataPagu.filter((z) => z.rek108 === el)[0]?.rek108,
            uraian108: dataPagu.filter((z) => z.rek108 === el)[0]?.item,
            harga: parseFloat(dataPagu.filter((z) => z.rek108 === el)[0]?.harga),
            satuan: dataPagu.filter((z) => z.rek108 === el)[0]?.satuan,
            volume: parseFloat(dataPagu.filter((z) => z.rek108 === el)[0]?.volume),
            total: parseFloat(dataPagu.filter((z) => z.rek108 === el)[0]?.pagu),
            // hargabast: dataPagu.filter((z) => z.rek108 === el).map((x) => x.hargabast)[i] * dataPagu.filter((z) => z.rek108 === el).map((x) => x.volumebast)[i],
            hargals: dataPagu.filter((z) => z.rek108 === el).map((x) => x.subtotal).reduce((a, b) => a + b, 0),
            volumels: 1,
            totalls: dataPagu.filter((z) => z.rek108 === el).map((x) => x.subtotal).reduce((a, b) => a + b, 0),
            nominalpembayaran: dataPagu.filter((z) => z.rek108 === el).map((x) => x.nominalpembayaran).reduce((a, b) => a + b, 0),
            realisasi: parseFloat(dataPagu.filter((z) => z.rek108 === el)[i]?.realisasi),
            sisapagu: parseFloat(dataPagu.filter((z) => z.rek108 === el)[0]?.pagu) - parseFloat(dataPagu.filter((z) => z.rek108 === el)[i]?.realisasi)
          }
          arr.push(obj)
        // console.log('jjjj', arr)
        }
        this.itembelanja.push(...arr)
      }
      else {
        const kons = []
        for (let i = 0; i < this.konsinyasis.length; i++) {
          const el = this.konsinyasis[i].rinci
          // console.log('baaaaast', el)

          const master = el.length
            ? el.map((x) => {
            // const a = x.masterobat.pagu.koderek108
              return {
                rek50: x.obat.pagu.koderek50,
                uraian50: x.obat.pagu.uraian50,
                itembelanja: x.obat.pagu.usulan,
                rek108: x.obat.pagu.koderek108,
                item: x.obat.pagu.usulan,
                harga: x.obat.pagu.harga,
                satuan: x.obat.pagu.satuan,
                volume: x.obat.pagu.volume,
                pagu: parseFloat(x.obat.pagu.pagu),
                id_bast: x.id,
                nobast: x.notranskonsi,
                hargabast: x.harga_net,
                volumebast: x.jumlah,
                subtotal: parseFloat(x.subtotal),
                nominalpembayaran: parseFloat(x.subtotal),
                realisasi: x.obat.pagu.realisasi.map(x => parseFloat(x.total_realisasi)).reduce((a, b) => a + b, 0)
              }
            })
            : []
          kons.push(...master)
        }
        this.rekening50 = kons
        console.log('kons', this.rekening50)

        const unik108 = this.rekening50.map((s) => s.rek108)
        const unik = unik108.length ? [...new Set(unik108)] : []
        console.log('unik', unik)

        const arrkons = []
        for (let i = 0; i < unik.length; i++) {
          const el = unik[i]
          const objkons = {
            koderek50: kons.filter((z) => z.rek108 === el)[0]?.rek50,
            rincianbelanja: kons.filter((z) => z.rek108 === el)[0]?.uraian50,
            idserahterima_rinci: kons.filter((z) => z.rek108 === el)[0]?.id_bast,
            nopenerimaan: kons.filter((z) => z.rek108 === el)[0]?.nobast,
            itembelanja: kons.filter((z) => z.rek108 === el)[0]?.itembelanja,
            koderek108: kons.filter((z) => z.rek108 === el)[0]?.rek108,
            uraian108: kons.filter((z) => z.rek108 === el)[0]?.item,
            harga: parseFloat(kons.filter((z) => z.rek108 === el)[0]?.harga),
            satuan: kons.filter((z) => z.rek108 === el)[0]?.satuan,
            volume: parseFloat(kons.filter((z) => z.rek108 === el)[0]?.volume),
            total: parseFloat(kons.filter((z) => z.rek108 === el)[0]?.pagu),
            // hargabast: dataPagu.filter((z) => z.rek108 === el).map((x) => x.hargabast)[i] * dataPagu.filter((z) => z.rek108 === el).map((x) => x.volumebast)[i],
            hargals: kons.filter((z) => z.rek108 === el).map((x) => x.subtotal).reduce((a, b) => a + b, 0),
            volumels: 1,
            totalls: kons.filter((z) => z.rek108 === el).map((x) => x.subtotal).reduce((a, b) => a + b, 0),
            nominalpembayaran: kons.filter((z) => z.rek108 === el).map((x) => x.nominalpembayaran).reduce((a, b) => a + b, 0),
            realisasi: parseFloat(kons.filter((z) => z.rek108 === el)[i]?.realisasi),
            sisapagu: parseFloat(kons.filter((z) => z.rek108 === el)[0]?.pagu) - parseFloat(kons.filter((z) => z.rek108 === el)[i]?.realisasi)
          }
          arrkons.push(objkons)
        // console.log('jjjj', arrkons)
        }
        this.itembelanja.push(...arrkons)
        console.log('DATA KONSINYASI', this.itembelanja)
      }
    }

    // ambilRekeningFarmasi () {
    //   const data = this.rekening50

    //   console.log('rincian baru', data)
    // }

  }
})
