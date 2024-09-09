import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { dateDbFormat } from 'src/modules/formatter'

export const usePermintaanCathLab = defineStore('permintaan_cathlab', {
  state: () => ({
    items: [],
    meta: {},
    item: {},
    total: 0,
    loading: false,
    params: {
      q: '',
      page: 1,
      per_page: 10,
      to: dateDbFormat(new Date()),
      from: dateDbFormat(new Date()),
      status: ''
    },
    nota: null,
    loadingTerima: false,
    flag: null,
    pageLayanan: false
  }),
  actions: {
    setParams (key, val) {
      this.params[key] = val
    },
    goToPage (val) {
      this.params.page = val
      this.getData()
    },
    search (val) {
      this.params.q = val
      this.params.page = 1
      this.getData()
    },
    refresh (val) {
      this.params.page = 1
      this.getData()
    },
    setPeriodik (val) {
      // console.log('wew', val)
      this.params.page = 1
      const { to, from, status } = val
      this.params.to = to
      this.params.from = from
      this.params.status = status
      // console.log('periodik', to)
      this.getData()
    },
    setDate (val) {
      this.params.tgl = val
    },
    setQ (payload) {
      this.params.page = 1
      this.params.q = payload
      this.getLists()
    },
    setPerPage (payload) {
      // console.log('sasa', payload)
      this.params.page = 1
      this.params.per_page = payload
      this.getLists()
    },
    setFilters () {
      this.filters = !this.filters
    },
    async getData () {
      this.loading = true
      const params = { params: this.params }
      await api.get('v1/simrs/penunjang/cathlab/reqcathlab', params)
        .then(resp => {
          this.loading = false
          this.pasiens = resp?.data?.data
          this.items = resp?.data?.data
          this.meta = resp?.data
        })
        .catch(() => { this.loading = false })
    },
    async setTerima (pasien) {
      this.loadingTerima = true
      const form = { nota: pasien?.nota }
      this.nota = pasien?.nota
      try {
        const resp = await api.post('v1/simrs/penunjang/cathlab/terimapasien', form)
        if (resp.status === 200) {
          const wew = this.items.filter(x => x === pasien)
          if (wew.length) {
            wew[0].flag = '2'
          }
          this.loadingTerima = false
          this.nota = null
        }
      }
      catch (error) {
        console.log(error)
        this.loadingTerima = false
        this.nota = null
        this.notifikasiError('Maaf.. Harap ulangi, Ada Kesalahan ')
      }
    },
    async bukaLayanan (pasien) {
      // this.loadingCall = false
      this.loadingTerima = true
      const form = { nota: pasien?.nota }
      this.nota = pasien?.nota
      this.togglePageTindakan()
      try {
        const resp = await api.post('v1/simrs/penunjang/cathlab/terimapasien', form)
        // console.log('terima', resp)
        if (resp.status === 200) {
          const findPasien = this.items.filter(x => x?.rs1 === pasien?.nota)
          if (findPasien.length) {
            // findPasien[0].status = findPasien[0].status === '' ? '2' : findPasien[0].status

            // BARU
            // findPasien[0].triage = resp?.data?.triage
          }
          this.loadingTerima = false
          // console.log('load2', this.loadingTerima)
          this.nota = null
        }
      }
      catch (error) {
        console.log(error)
        this.loadingTerima = false
        this.nota = null
        this.notifikasiError('Maaf.. Harap ulangi, Ada Kesalahan ')
      }
    },
    togglePageTindakan () {
      this.pageLayanan = !this.pageLayanan
    }
  }
})
