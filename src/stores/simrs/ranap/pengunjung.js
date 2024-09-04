import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { dateDbFormat } from 'src/modules/formatter'

export const usePengunjungRanapStore = defineStore('pengunjung-ranap', {
  state: () => ({
    pasiens: [],
    meta: null,
    params: {
      page: 1,
      q: '',
      status: 'Belum Pulang',
      to: dateDbFormat(new Date()),
      from: dateDbFormat(new Date()),
      per_page: 100,
      koderuangan: ['SEMUA']
    },
    periods: ['Hari Ini', 'Minggu Ini', 'Bulan Ini'],
    periode: 'Hari Ini',
    ruangans: ['SEMUA'],
    ruangan: 'SEMUA',
    statuses: ['Belum Pulang', 'Pulang'],
    statusx: 'Belum Pulang',
    loading: false,
    pageLayanan: false,
    loadingLayanan: false
  }),

  actions: {
    async getData () {
      this.loading = true
      const params = { params: this.params }
      try {
        const resp = await api.get('v1/simrs/ranap/ruangan/kunjunganpasien', params)
        // console.log('ranap', resp)
        if (resp.status === 200) {
          this.meta = resp.data
          this.pasiens = resp.data.data
          this.loading = false
        }
        this.loading = false
        // // console.log(resp)
      }
      catch (error) {
        // console.log(error)
        this.loading = false
      }
    },

    goToPage (val) {
      this.params.page = val
      this.getData()
    },
    refresh () {
      this.params.page = 1
      this.getData()
    },
    bukaLayanan (val, pasien) {
      this.pageLayanan = val
      this.loadingLayanan = true
      const form = { noreg: pasien?.noreg }
      // try {
      //   const resp = await api.post('v1/simrs/ranap/ruangan/bukalayanan', form)
      //   // console.log('ranap', resp)
      //   this.loadingLayanan = false
      //   if (resp.status === 200) {
      //     // // console.log('ranap', this.pasiens)
      //     this.setPasien(pasien, resp.data)
      //   }
      // }
      // catch (error) {
      //   // console.log('error buka layanan', error)
      //   this.loadingLayanan = false
      // }

      return new Promise((resolve, reject) => {
        api.post('v1/simrs/ranap/ruangan/bukalayanan', form)
          .then(resp => {
            // console.log('ranap', resp)
            this.loadingLayanan = false
            // if (resp.status === 200) {
            this.setPasien(pasien, resp.data)
            const indexPasien = this.pasiens.findIndex(x => x.noreg === pasien.noreg)
            // this.pasiens[indexPasien] = resp.data
            // }
            resolve(this.pasiens[indexPasien])
          })
          .catch(err => {
            // console.log('error buka layanan', err)
            this.loadingLayanan = false
            reject(err)
          })
      })
    },

    setPasien (pasien, data) {
      const findPasien = this.pasiens.filter(x => x?.noreg === data?.noreg)
      // this.pasiens[indexPasien] = data
      // // console.log('wew', this.pasiens[indexPasien])
      if (findPasien.length) {
        const datax = findPasien[0]
        datax.newapotekrajal = data?.newapotekrajal
        datax.diagnosa = data?.diagnosa
        // datax.dokter = data?.datasimpeg?.nama
        // datax.kodedokter = data?.datasimpeg?.kdpegsimrs
        // this.pageLayanan = false
      }
    },
    getRuangan () {
      return new Promise((resolve, reject) => {
        api.get('v1/simrs/ranap/ruangan/listruanganranap')
          .then(resp => {
            // console.log('ruangan ranap', resp)
            if (resp.status === 200) {
              this.ruangans = resp.data
              this.ruangans.push('SEMUA')
              this.params.koderuangan = this.ruangans.map(x => x.groups)
            }
            resolve(resp)
          }).catch(err => {
            // console.log(err)
            reject(err)
          })
      })
    },
    gantiRuangan () {
      // console.log('gnt ruangan', this.ruangan)
      if (this.ruangan === 'SEMUA') {
        this.params.koderuangan = this.ruangans.map(x => x.groups)
        this.getData()
      }
      else {
        this.params.koderuangan = [this.ruangan]
        this.getData()
      }
    },
    gantiPeriode (val) {
      if (val === 'Hari Ini') {
        this.hariIni()
      }
      else if (val === 'Minggu Ini') {
        this.mingguIni()
      }
      else if (val === 'Bulan Ini') {
        this.bulanIni()
      }
      this.getData()
    },
    hariIni () {
      const cDate = new Date()
      this.params.to = dateDbFormat(cDate)
      this.params.from = dateDbFormat(cDate)
    },
    mingguIni () {
      const curr = new Date()
      const firstday = new Date(curr.setDate(curr.getDate() - curr.getDay()))
      const lastday = new Date(curr.setDate(curr.getDate() - curr.getDay() + 6))
      this.params.to = dateDbFormat(firstday)
      this.params.from = dateDbFormat(lastday)
    },
    bulanIni () {
      const curr = new Date()
      const firstday = date.formatDate(curr, 'YYYY') + '-' + date.formatDate(curr, 'MM') + '-01'
      const lastday = date.formatDate(curr, 'YYYY') + '-' + date.formatDate(curr, 'MM') + '-31'
      this.params.to = dateDbFormat(firstday)
      this.params.from = dateDbFormat(lastday)
    },

    tahunIni () {
      const curr = new Date()
      const firstday = date.formatDate(curr, 'YYYY') + '-01' + '-01'
      const lastday = date.formatDate(curr, 'YYYY') + '-12' + '-31'
      this.params.to = dateDbFormat(firstday)
      this.params.from = dateDbFormat(lastday)
    }
  }
})
