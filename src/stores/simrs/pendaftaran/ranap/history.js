import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import { dateDbFormat } from 'src/modules/formatter'
import { date } from 'quasar'

export const useListHistoryPendaftaranRanapStore = defineStore('list-history-pendaftaran-ranap', {
  state: () => ({
    items: [],
    meta: null,
    loading: false,
    header: {
      periode: 'Hari ini'
    },
    params: {
      page: 1,
      per_page: 20,
      q: '',
      status: 'Belum Pulang',
      to: dateDbFormat(new Date()),
      from: dateDbFormat(new Date()),
      sort: 'terbaru',
      ruangan: ''
    },

    ruangans: [],

    cekPeserta: null,

    periods: ['Hari ini', 'Minggu ini', 'Bulan ini', 'Custom'],
    sorting: ['terbaru', 'terlama'],
    statuses: ['Semua', 'Pulang', 'Belum Pulang'],
    isViewList: false,
    pasien: null,
    dialogSpri: false,
    dialogSep: false,
    dialogSepManual: false,
    dialogCetakSep: false,
    dialogCetakGelang: false,
    dialogCetakIdentitas: false,
    dialogHalaman1: false,
    dialogHalaman2: false

  }),
  getters: {
    // doubleCount: (state) => state.counter * 2
  },
  actions: {

    getRuangan () {
      return new Promise((resolve, reject) => {
        api.get('v1/simrs/ranap/ruangan/listruanganranap')
          .then(resp => {
            console.log('ruangan ranap', resp)
            if (resp.status === 200) {
              this.ruangans = resp.data
              const all = {
                groups: '',
                groups_nama: 'SEMUA RUANGAN'
              }
              this.ruangans.unshift(all)
              // this.params.koderuangan = this.ruangans.map(x => x.groups)
            }
            resolve(resp)
          }).catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    getDataTable () {
      this.loading = true
      return new Promise((resolve, reject) => {
        api.get('/v1/simrs/pendaftaran/ranap/history-kunjungan', {
          params: this.params
        }).then(res => {
          // console.log('res list tggu ranap', res)
          if (res.status === 200) {
            const total = res.data?.total
            const obj = res.data?.data
            const clone = (({ data, ...o }) => o)(obj)
            this.meta = clone
            this.meta.total = total
            this.items = obj?.data ?? []

            console.log('this.meta', this.meta)
            console.log('this.items', this.items)
          }
          this.loading = false
          resolve(res)
        }).catch(err => {
          console.log('err list tggu ranap', err)
          this.loading = false
          reject(err)
        })
      })
    },

    setRuangan (val) {
      this.params.ruangan = val?.groups
      this.getDataTable()
    },

    setPeriode (val) {
      this.header.periode = val
      if (val === 'Hari ini') {
        this.hariIni()
      }
      else if (val === 'Minggu ini') {
        this.mingguIni()
      }
      else if (val === 'Bulan ini') {
        this.bulanIni()
      }
    },

    setUrutan (val) {
      this.params.sort = val
      this.getDataTable()
    },

    setPage (val) {
      this.params.page = val
      this.getDataTable()
    },

    setStatus (val) {
      this.params.page = 1
      this.params.status = val
      this.getDataTable()
    },

    hariIni () {
      const cDate = new Date()
      this.params.to = dateDbFormat(cDate)
      this.params.from = dateDbFormat(cDate)
    },
    bulanIni () {
      const curr = new Date(), y = curr.getFullYear(), m = curr.getMonth()
      // const firstday = date.formatDate(curr, 'YYYY') + '-' + date.formatDate(curr, 'MM') + '-01'
      // const lastday = date.formatDate(curr, 'YYYY') + '-' + date.formatDate(curr, 'MM') + '-31'
      const firstday = curr.setFullYear(y, m, 1)
      const lastday = curr.setFullYear(y, m + 1, 0)
      this.params.to = dateDbFormat(firstday)
      this.params.from = dateDbFormat(lastday)
    },
    mingguIni () {
      const curr = new Date()
      const firstday = new Date(curr.setDate(curr.getDate() - curr.getDay()))
      const lastday = new Date(curr.setDate(curr.getDate() - curr.getDay() + 6))
      this.params.to = dateDbFormat(firstday)
      this.params.from = dateDbFormat(lastday)
    },
    tahunIni () {
      const curr = new Date()
      const firstday = date.formatDate(curr, 'YYYY') + '-01' + '-01'
      const lastday = date.formatDate(curr, 'YYYY') + '-12' + '-31'
      this.params.to = dateDbFormat(firstday)
      this.params.from = dateDbFormat(lastday)
    },

    async cekPesertaBpjs (by, no) {
      const params = { params: { by, no } }
      // await api.get('v1/simrs/pendaftaran/ranap/cek-peserta-bpjs', params)
      //   .then(resp => {
      //     const bpjs = resp?.data?.bpjs
      //     // const rs = resp?.data?.rs
      //     if (bpjs.metadata.code === '200') {
      //       this.cekPeserta = resp?.data.bpjs.result.peserta
      //     }
      //   })
      //   .catch(err => {
      //     console.log('cekPesertaBpjs', err)
      //   })

      return new Promise((resolve, reject) => {
        api.get('v1/simrs/pendaftaran/ranap/cek-peserta-bpjs', params)
          .then(resp => {
            const bpjs = resp?.data?.bpjs
            // const rs = resp?.data?.rs
            if (bpjs?.metadata?.code === '200') {
              this.cekPeserta = resp?.data.bpjs.result.peserta
            }
            resolve(resp)
          })
          .catch(err => {
            console.log('cekPesertaBpjs', err)
            reject(err)
          })
      })
    },

    async cekSep (noSep) {
      const params = { noSep }

      return new Promise((resolve, reject) => {
        api.post('v1/simrs/pendaftaran/ranap/get-sep-from-bpjs', params)
          .then(resp => {
            // console.log('cekSep', resp)
            resolve(resp)
          })
          .catch(err => {
            console.log('cekSep', err)
            reject(err)
          })
      })
    }

  }
})
