import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifErrVue } from 'src/modules/utils'

export const usePembayaranStore = defineStore('pembayaran_store', {
  state: () => ({
    loading: false,
    kontraks: [],
    penyedias: [],
    basts: [],
    kontrak: {},
    penerimaans: [],
    noBayar: 0,
    form: {},
    params: {
      q: ''
    }
  }),
  actions: {
    // local function
    setForm(key, val) {
      this.form[key] = val
    },
    setParam(key, val) {
      this.params[key] = val
    },
    resetAll() {
      this.kontraks = []
      this.kontrak = {}
      this.penerimaans = []
      this.form = {}
      this.getKontraks()
    },
    kontrakSelected(val) {
      console.log('kontrak', val)
      this.setParam('kontrak', val)
      this.getPenerimaan().then(pnrm => {
        this.getNoBayar().then(byr => {
          if (pnrm.length) {
            const nomor = pnrm[0].nomor
            const tempNom = nomor.split('SP-')
            let nom = ''
            let nom2 = ''
            const noByr = byr < 9 ? '0' + (byr + 1) : byr + 1
            if (tempNom.length > 1) {
              nom = tempNom[0].split('/')
              nom2 = tempNom[1].split('/')
              const dua = nom2[0] === '' ? nom2[1] + '/' + nom2[2] + '/' + nom2[3] : tempNom[1]
              if (nom.length > 3) {
                // this.setForm('no_kwitansi', noByr + '/KWTS/SP-' + nom[2] + '/' + dua)
                this.setForm('no_pembayaran', noByr + '/BYR/SP-' + nom[2] + '/' + dua)
              } else {
                // this.setForm('no_kwitansi', noByr + '/KWTS/' + tempNom[1])
                this.setForm('no_pembayaran', noByr + '/BYR/' + tempNom[1])
              }
            } else {
              // this.setForm('no_kwitansi', noByr + '/KWTS/' + nomor)
              this.setForm('no_pembayaran', noByr + '/BYR/' + nomor)
            }
            console.log('nom length', tempNom.length)
            console.log('nom', nom2)
          } else {
            notifErrVue('tidak ada Transaksi Penerimaan')
          }
          console.log('penerimaan', pnrm)
          console.log('anu', byr)
        })
      })
      this.getKontrak()
    },
    bastSelected(val) {
      console.log('no_bast', val)
      this.setParam('no_bast', val)
      const bast = this.basts.find(x => x.no_bast === val)
      this.setParam('kontrak', bast?.kontrak)
      console.log('bast', bast)
      this.getPenerimaanByBast().then(pnrm => {
        this.getNoBayar().then(byr => {
          if (pnrm.length) {
            const nomor = pnrm[0].nomor
            const tempNom = nomor.split('SP-')
            let nom = ''
            let nom2 = ''
            const noByr = byr < 9 ? '0' + (byr + 1) : byr + 1
            if (tempNom.length > 1) {
              nom = tempNom[0].split('/')
              nom2 = tempNom[1].split('/')
              const dua = nom2[0] === '' ? nom2[1] + '/' + nom2[2] + '/' + nom2[3] : tempNom[1]
              if (nom.length > 3) {
                // this.setForm('no_kwitansi', noByr + '/KWTS/SP-' + nom[2] + '/' + dua)
                this.setForm('no_pembayaran', noByr + '/BYR/SP-' + nom[2] + '/' + dua)
              } else {
                // this.setForm('no_kwitansi', noByr + '/KWTS/' + tempNom[1])
                this.setForm('no_pembayaran', noByr + '/BYR/' + tempNom[1])
              }
            } else {
              // this.setForm('no_kwitansi', noByr + '/KWTS/' + nomor)
              this.setForm('no_pembayaran', noByr + '/BYR/' + nomor)
            }
            console.log('nom length', tempNom.length)
            console.log('nom', nom2)
          } else {
            notifErrVue('tidak ada Transaksi Penerimaan')
          }
          console.log('penerimaan', pnrm)
          console.log('anu', byr)
        })
      })
      this.getKontrak()
    },
    penyediaSelected(val) {
      console.log(val)
      this.setForm('bast', '')
      this.setParam('kode', val)
      this.getBast()
    },
    // api related function
    // ambil data kontrak
    getKontraks() {
      this.loading = true
      return new Promise(resolve => {
        api.get('v1/transaksi/pembayaran/cari-kontrak')
          .then(resp => {
            console.log('kontraks ', resp.data)
            this.loading = false
            this.kontraks = resp.data
            resolve(resp)
          })
          .catch(() => { this.loading = false })
      })
    },
    getKontrak() {
      this.loading = true
      const param = { params: this.params }
      return new Promise(resolve => {
        api.get('v1/transaksi/pembayaran/ambil-kontrak', param)
          .then(resp => {
            console.log('kontrak ', resp.data)
            console.log('ada ', Object.keys(resp.data))
            this.loading = false
            this.kontrak = resp.data
            resolve(resp)
          })
          .catch(() => { this.loading = false })
      })
    },
    // ambil penyedia
    getPenyedias() {
      this.loading = true
      return new Promise(resolve => {
        api.get('v1/transaksi/pembayaran/cari-penyedia')
          .then(resp => {
            console.log('penyedias ', resp.data)
            this.loading = false
            this.penyedias = resp.data
            resolve(resp)
          })
          .catch(() => { this.loading = false })
      })
    },
    getBast() {
      this.loading = true
      const param = { params: this.params }
      return new Promise(resolve => {
        api.get('v1/transaksi/pembayaran/cari-bast', param)
          .then(resp => {
            console.log('basts ', resp.data)
            console.log('ada ', Object.keys(resp.data))
            this.loading = false
            this.basts = resp.data
            resolve(resp)
          })
          .catch(() => { this.loading = false })
      })
    },
    getPenerimaanByBast() {
      this.loading = true
      const param = { params: this.params }
      return new Promise(resolve => {
        api.get('v1/transaksi/pembayaran/ambil-penerimaan-by-bast', param)
          .then(resp => {
            this.loading = false
            // console.log('get penerimaan', resp.data)
            const trm = resp.data.map(terima => {
              terima.nilai_pembayaran = terima.nilai_tagihan
              return terima
            })
            this.penerimaans = trm
            resolve(resp.data)
          })
          .catch(() => { this.loading = false })
      })
    },
    getPenerimaan() {
      this.loading = true
      const param = { params: this.params }
      return new Promise(resolve => {
        api.get('v1/transaksi/pembayaran/ambil-penerimaan', param)
          .then(resp => {
            this.loading = false
            // console.log('get penerimaan', resp.data)
            const trm = resp.data.map(terima => {
              terima.nilai_pembayaran = terima.nilai_tagihan
              return terima
            })
            this.penerimaans = trm
            resolve(resp.data)
          })
          .catch(() => { this.loading = false })
      })
    },
    getNoBayar() {
      this.loading = true
      const param = { params: this.params }
      return new Promise(resolve => {
        api.get('v1/transaksi/pembayaran/ambil-no-bayar', param)
          .then(resp => {
            this.loading = false
            // console.log('get no bayar', resp.data)
            this.noBayar = resp.data
            resolve(resp.data)
          })
          .catch(() => { this.loading = false })
      })
    },
    simpanPembayaran() {
      this.loading = true
      console.log('simpan pembayaran', this.form)
      return new Promise(resolve => {
        api.post('v1/transaksi/pembayaran/simpan-bayar', this.form)
          .then(resp => {
            this.loading = false
            console.log('simpan resp ', resp.data)
            this.resetAll()
            resolve(resp.data)
          })
          .catch(() => { this.loading = false })
      })
    }
  }
})
