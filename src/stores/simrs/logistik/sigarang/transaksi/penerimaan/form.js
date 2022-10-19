import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { routerInstance } from 'src/boot/router'
// import { routerInstance } from 'src/boot/router'
import { dateFullFormat } from 'src/modules/formatter'
import { findWithAttr, uniqueId } from 'src/modules/utils'
// import { notifSuccess } from 'src/modules/utils'

export const useTransaksiPenerimaanForm = defineStore('form_transaksi_penerimaan', {
  state: () => ({
    loading: false,
    form: {
      nama: 'PENERIMAAN',
      no_penerimaan: null,
      nomor: null,
      status_pembelian: 'pembelian',
      total: 0
    },
    pemesanans: [],
    pemesanan: {},
    detailPemesanans: [],
    surats: [
      { id: 'faktur', nama: 'Faktur' },
      { id: 'surat_jalan', nama: 'Surat Jalan' }
    ],
    option_surat: 'faktur',
    statuses: [
      { id: 'hibah', nama: 'Hibah' },
      { id: 'pembelian', nama: 'Pembelian' }
    ],
    params: {
      q: '',
      page: 1,
      per_page: 10,
      order_by: 'created_at',
      sort: 'desc'
    }
  }),
  actions: {
    resetForm () {
      this.form = {
        nama: 'PENERIMAAN',
        no_penerimaan: null,
        pemesanan: null,
        status_pembelian: 'pembelian',
        total: 0
      }
      this.detailPemesanans = []
      this.setNomorPenerimaan()
      this.setReff()
      this.setToday()
    },
    setForm (key, val) {
      this.form[key] = val
    },
    deleteForm (key) {
      delete this.form[key]
    },
    setNomorPenerimaan () {
      const tgl = date.formatDate(Date.now(), '/DD/MM/YYYY')
      const randomness = Math.random().toString(36).substring(2, 7).toUpperCase()
      this.form.no_penerimaan = randomness + tgl
    },
    setToday () {
      const date = new Date()
      const year = date.getFullYear()
      const month = ('0' + (date.getMonth() + 1)).slice(-2)
      const day = ('0' + date.getDate()).slice(-2)
      const formatDb = year + '-' + month + '-' + day
      // const formatTp = day + '/' + month + '/' + year
      this.form.tanggal = formatDb
      this.tanggalTampil = dateFullFormat(formatDb)
    },
    setReff () {
      const slug = 'TRM-' + uniqueId()
      this.setForm('reff', slug)
      routerInstance.replace({ name: 'sigarang.transaksi.penerimaan', params: { slug } })
    },
    setSearch (val) {
      // console.log(val)
      this.params.q = val
      this.searchPemesanan()
    },
    inputSurat (val) {
      this.setForm(this.option_surat, val)
      // console.log('option_surat', this.option_surat)
      // console.log('form', this.form)
    },
    suratSelected (val) {
      this.setForm(val, this.form.surat)
      this.surats.forEach(data => {
        if (data.id !== val) {
          delete this.form[data.id]
        }
      })
      // console.log('form', this.form)
    },
    pemesananSelected (val) {
      this.params.nomor = val
      this.form.nomor = val
      this.getDataPenerimaan().then(data => {
        console.log('data', data)
        this.pemesanan = data.pemesanan[0]
        this.setForm('kontrak', data.pemesanan[0].kontrak)
        this.setForm('kode_perusahaan', data.pemesanan[0].kode_perusahaan)
        this.setForm('namaPerusahaan', data.pemesanan[0].perusahaan.nama)
        // this.setForm('harga', data.pemesanan[0].details.harga)

        if (data.trmSkr.length && !data.trmSkr[0].status) {
          const apem = data.trmSkr[0]
          if (apem.faktur) {
            this.option_surat = 'faktur'
            this.setForm('faktur', apem.faktur)
            this.setForm('surat', apem.faktur)
          }
          if (apem.surat_jalan) {
            this.option_surat = 'surat_jalan'
            this.setForm('surat_jalan', apem.surat_jalan)
            this.setForm('surat', apem.surat_jalan)
          }
          if (apem.no_penerimaan) { this.setForm('no_penerimaan', apem.no_penerimaan) }
          if (apem.pengirim) { this.setForm('pengirim', apem.pengirim) }
          if (apem.reff) { this.setForm('reff', apem.reff) }
          if (apem.tanggal) { this.setForm('tanggal', apem.tanggal) }
          if (apem.tempo) { this.setForm('tempo', apem.tempo) }
          if (apem.tanggal_surat) { this.setForm('tanggal_surat', apem.tanggal_surat) }
          // } else if (data.trmSblm.length && data.trmSblm[0].status) {
          //   const apem = data.trmSblm[0]
          //   if (apem.faktur) {
          //     this.option_surat = 'faktur'
          //     this.setForm('faktur', apem.faktur)
          //     this.setForm('surat', apem.faktur)
          //   }
          //   if (apem.surat_jalan) {
          //     this.option_surat = 'surat_jalan'
          //     this.setForm('surat_jalan', apem.surat_jalan)
          //     this.setForm('surat', apem.surat_jalan)
          //   }
          //   if (apem.no_penerimaan) { this.setForm('no_penerimaan', apem.no_penerimaan) }
          //   if (apem.pengirim) { this.setForm('pengirim', apem.pengirim) }

          //   if (apem.tanggal) { this.setForm('tanggal', apem.tanggal) }
          //   if (apem.tempo) { this.setForm('tempo', apem.tempo) }
          //   if (apem.tanggal_surat) { this.setForm('tanggal_surat', apem.tanggal_surat) }
        } else {
          this.clearNomorPemesanan()
        }

        console.log('form', this.form)
        this.setDetails(data)
      })
      // const temp = this.pemesanans.filter(data => {
      //   return data.nomor === val
      // })
      // this.pemesanan = temp[0]
      // console.log('pemesanan selected', val)
      // console.log('pemesanan', this.pemesanan)
    },
    clearNomorPemesanan () {
      this.detailPemesanans = []
      this.option_surat = 'faktur'
      this.deleteForm('faktur')
      this.deleteForm('surat')
      this.deleteForm('surat_jalan')
      this.deleteForm('pengirim')
      this.deleteForm('tempo')
      this.deleteForm('tanggal_surat')
      this.setNomorPenerimaan()
      this.setToday()
    },
    setDetails (data) {
      const pesanan = data.pemesanan[0].details
      const skr = data.trmSkr.length ? data.trmSkr[0].details : null
      const sblm = data.detailLama.length ? data.detailLama : null

      pesanan.forEach((data, index) => {
        data.qtyskr = 0
        data.qtysblm = 0
        data.total = 0
        if (skr !== null) {
          const item = findWithAttr(skr, 'kode_rs', data.kode_rs)
          if (item >= 0) {
            data.qtyskr = skr[item].qty
            data.total = skr[item].sub_total
          }
          console.log('item', item)
        }
        if (sblm !== null) {
          const temp = findWithAttr(sblm, 'kode_rs', data.kode_rs)
          if (temp >= 0) {
            data.qtysblm = parseFloat(sblm[temp].jml)
          }
          console.log('temp', temp)
        }
      })
      this.detailPemesanans = pesanan
      console.log('pesanan', pesanan)
      console.log('skr', skr)
      console.log('sblm', sblm)
    },
    setDataLama (data) {
      if (data.length === 1) {
        return data[0].details
      } else if (data.length > 1) {
        return data.map(apem => {
          return apem.details
        })
      } else {
        return null
      }
    },
    // api related function
    // cari pemesanan
    searchPemesanan () {
      this.loading = true
      const params = { params: this.params }
      return new Promise((resolve, reject) => {
        api.get('v1/transaksi/penerimaan/cari-pemesanan', params)
          .then(resp => {
            this.loading = false
            console.log('cari pemesanans', resp)
            console.log('pemesanan ini', this.pemesanan)
            this.pemesanans = resp.data
            resolve(resp)
          }).catch(err => {
            this.loading = false
            reject(err)
          })
      })
    },
    // ambil Transaksis Penerimaan saat ini
    getDataPenerimaan () {
      this.loading = true
      const params = { params: this.params }
      return new Promise((resolve, reject) => {
        api.get('v1/transaksi/penerimaan/penerimaan', params)
          .then(resp => {
            this.loading = false
            console.log('penerimaan ', resp.data)
            resolve(resp.data)
          })
          .catch(err => {
            this.loading = false
            reject(err)
          })
      })
    },
    simpanTransaksi () {
      this.loading = true

      return new Promise((resolve, reject) => {
        api.post('v1/transaksi/penerimaan/simpan-penerimaan', this.form)
          .then(resp => {
            this.loading = false
            console.log(resp)
            // notifSuccess('data berhasil disimpan')
            this.getDataPenerimaan()
            resolve(resp)
          })
          .catch(err => {
            this.loading = false
            reject(err)
          })
      })
    }
  }
})
