import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useTransaksiBastStore = defineStore('transaksi_bast', {
  state: () => ({
    loading: false,
    loadingNomor: false,
    perusahaans: [],
    kontraks: [],
    pemesanans: [],
    penerimaans: [],
    tampilPenerimaans: [],
    pemesanan: {},
    penerimaan: {},
    form: {},
    params: {}
  }),
  actions: {
    setForm(key, val) {
      this.form[key] = val
    },
    setParam(key, val) {
      this.params[key] = val
    },
    // autocomplete area
    // select perusahaan
    perusahaanSelected(val) {
      this.form = {}
      this.pemesanan = {}
      this.penerimaans = []
      this.pemesanans = []
      this.tampilPenerimaans = []
      this.penerimaan = {}
      this.setForm('kode_perusahaan', val)
      console.log('perusahaan selected', val)
      this.setParam('kode_perusahaan', val)

      this.getNomorKontrak()
    },
    kontrakSelected(val) {
      this.pemesanans = []
      this.penerimaans = []
      this.tampilPenerimaans = []
      console.log('kontrak selected', val)
      // const pes = this.pemesanans.filter(y => y.kontrak === val)
      const temp = val.split('SP')
      // this.setParam('nomor', pes[0].nomor)
      this.setParam('kontrak', val)
      // console.log('pemesanan temp', temp)
      this.getNoBast().then(data => {
        const anu = data > 0 ? '-' + data : ''
        if (temp.length > 1) {
          this.setForm('no_bast', temp[0] + 'BAST' + temp[1] + anu)
        } else {
          this.setForm('no_bast', val + ' (BAST)' + anu)
        }
        // if (temp.length > 1) {
        //   this.setForm('no_bast', temp[0] + 'BAST-' + temp[1] + anu)
        // } else {
        //   this.setForm('no_bast', pes[0].nomor + ' (BAST)' + anu)
        // }
      })

      this.getDataPemesanan()
    },
    pemesananSelected(val) {
    },
    /// //////////////////
    getInitialData() {
      this.getPerusahaan()
    },
    // api related function
    // ambil data perusahaan
    getNoBast() {
      const param = { params: this.params }
      this.loadingNomor = true
      return new Promise(resolve => {
        api.get('v1/transaksi/bast/no-bast', param)
          .then(resp => {
            console.log('resp no bast', resp.data)
            this.loadingNomor = false
            resolve(resp.data)
          })
          .catch(() => { this.loadingNomor = false })
      })
    },
    // ambil data perusahaan
    getPerusahaan() {
      this.loading = true
      return new Promise(resolve => {
        api.get('v1/transaksi/bast/perusahaan')
          .then(resp => {
            // console.log('resp perusahaan', resp.data)
            this.loading = false
            this.perusahaans = resp.data
            resolve(resp)
          })
          .catch(() => { this.loading = false })
      })
    },
    // ambil data Kontrak
    getNomorKontrak() {
      const param = { params: this.params }
      this.loading = true
      return new Promise(resolve => {
        api.get('v1/transaksi/bast/kontrak-pemesanan', param)
          .then(resp => {
            this.loading = false
            // console.log('nomor pemesanan', resp.data)
            this.kontraks = resp.data
            resolve(resp)
          })
          .catch(() => { this.loading = false })
      })
    },
    // ambil data pemesanan
    // KogetNomorKontrak() {
    //   const param = { params: this.params }
    //   this.loading = true
    //   return new Promise(resolve => {
    //     api.get('v1/transaksi/bast/nomor-pemesanan', param)
    //       .then(resp => {
    //         this.loading = false
    //         // console.log('nomor pemesanan', resp.data)
    //         this.pemesanans = resp.data
    //         resolve(resp)
    //       })
    //       .catch(() => { this.loading = false })
    //   })
    // },
    // ambil data pemesanan dan penerimaan

    getDataPemesanan() {
      const param = { params: this.params }
      this.loading = true
      return new Promise(resolve => {
        api.get('v1/transaksi/bast/pemesanan', param)
          .then(resp => {
            this.loading = false
            const temp = resp.data
            temp.forEach(anu => {
              // console.log('raw', anu)
              anu.checked = false
              if (anu.penerimaan.length) {
                anu.penerimaan.forEach(trm => {
                  trm.checked = false
                  trm.details.forEach(det => {
                    det.diskon = 0
                    det.ppn = 0
                    if (det.harga_kontrak === 0) det.harga_kontrak = det.harga
                    if (det.harga_jadi === 0) det.harga_jadi = det.harga
                    if (det.harga_kontrak !== 0 && det.harga_kontrak > 0) det.harga_jadi = det.harga_kontrak
                  })
                  trm.nilai_tagihan = trm.details.map(x => x.sub_total).reduce((a, b) => a + b, 0)
                })
              } else { anu.penerimaan = false }
            })

            this.pemesanans = temp.filter(s => s.penerimaan !== false)
            console.log('pemesanan', this.pemesanans)
            // const terima = resp.data
            // if (terima.length) {
            //   terima.forEach(anu => {
            //     if (term.penerimaan.length) {
            //       this.penerimaans = term.penerimaan.map(data => {
            //         data.checked = false
            //         // const balik = data.details.map(anu => {
            //         data.details.map(anu => {
            //           if (anu.harga_kontrak === 0) anu.harga_kontrak = anu.harga
            //           if (anu.harga_jadi === 0) anu.harga_jadi = anu.harga
            //           // console.log('harga kontrak', anu.harga_kontrak)
            //           return anu
            //         })
            //         data.nilai_tagihan = data.details.map(x => x.harga_jadi).reduce((a, b) => a + b, 0)
            //         // return balik
            //         return data
            //       })

            //       console.log('penerimaan', anu.penerimaan)
            //     }
            //   })
            // }
            resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    },
    // simpan
    simpanBast() {
      console.log('simpan', this.form)
      this.loading = true
      return new Promise(resolve => {
        api.post('v1/transaksi/bast/simpan-bast', this.form)
          .then(resp => {
            this.loading = false
            this.form = {}
            this.pemesanan = {}
            this.pemesanans = []
            this.penerimaans = []
            this.tampilPenerimaans = []
            this.penerimaan = {}
            this.getPerusahaan()
            resolve(resp)
          })
          .catch(() => { this.loading = false })
      })
    }
  }
})
