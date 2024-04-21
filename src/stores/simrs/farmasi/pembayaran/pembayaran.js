import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifSuccess } from 'src/modules/utils'

export const useFarmasiPembayaranPenerimaanStore = defineStore('farmasi_pembayaran_penerimaan', {
  state: () => ({
    loading: false,
    loadingCari: false,
    loadingAmbil: false,
    params: {},
    form: {},
    basts: [],
    penerimaans: []
  }),
  actions: {
    setParams(key, val) {
      this.params[key] = val
    },
    setForm(key, val) {
      this.form[key] = val
    },

    bastSelected(val) {
      console.log('bast selected', val)
      if (val === null) {
        this.form = {}
        this.penerimaans = []
        return
      }
      this.setParams('nobast', val)
      this.ambilBast()
    },

    getInitialData() {
      this.cariBast()
    },
    async cariBast() {
      this.loadingCari = true
      await api.get('v1/simrs/penunjang/farmasinew/pembayaran/cari-bast')
        .then(resp => {
          console.log('cari bast', resp?.data)
          this.loadingCari = false
          this.basts = resp?.data
        })
        .catch(() => { this.loadingCari = false })
    },
    async ambilBast() {
      this.penerimaans = []
      this.loadingAmbil = true
      const param = { params: this.params }
      await api.get('v1/simrs/penunjang/farmasinew/pembayaran/ambil-bast', param)
        .then(resp => {
          this.loadingAmbil = false
          console.log('ambil bast', resp?.data)
          this.penerimaans = resp?.data
          // nilia_penerimaan, nilai_tagihan, total pembayaran
          if (this.penerimaans?.length) {
            this.setForm('total_pembayaran', this?.penerimaans[0].jumlah_bast)
            this.setForm('nopemesanan', this?.penerimaans[0].nopemesanan)
            this.penerimaans?.forEach(trm => {
              trm.nilai_tagihan = 0
              trm.nilai_pembayaran = 0
              trm.nilai_penerimaan = (trm.jenissurat === 'Faktur') ? parseFloat(trm?.total_faktur_pbf) : parseFloat(trm?.faktur?.total_faktur)

              const tagihan = trm?.penerimaanrinci?.map(c => parseFloat(c.subtotal)).reduce((a, b) => a + b, 0)
              trm.nilai_tagihan = (tagihan - trm.nilai_retur)
              trm.nilai_pembayaran = trm.nilai_tagihan
              // console.log('foreach', trm.nilai_pembayaran)
            })
          }
        })
        .catch(() => {
          this.loadingAmbil = false
        })
    },
    simpanPembayaran() {
      this.loading = true
      return new Promise(resolve => {
        api.post('v1/simrs/penunjang/farmasinew/pembayaran/simpan', this.form)
          .then(resp => {
            this.loading = false
            console.log('simpan', resp?.data)
            notifSuccess(resp)
            this.form = {}
            this.penerimaans = []
            this.cariBast()
            resolve(resp)
          })
          .catch(() => { this.loading = false })
      })
    }
  }
})
