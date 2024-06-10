import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifSuccess } from 'src/modules/utils'

export const UseFarmasiStokSekarangTable = defineStore('tabel_stok_sekarang', {
  state: () => ({
    loading: false,
    loadingAlokasi: false,
    isOpen: false,
    params: {
      per_page: 10,
      q: '',
      page: 1
    },
    meta: {},
    items: [],
    gudangs: [],
    columns: [
      'obat',
      // 'penerimaan',
      'stok',
      'stokalokasi',
      'lain',
      'peny'

    ],
    columnHide: [],
    rincis: [],
    mutasis: [],
    reseps: [],
    obat: {},
    ruangRanaps: []
  }),
  actions: {
    setClose () {
      this.isOpen = false
    },
    setParam (key, val) {
      this.params[key] = val
    },
    setQ (payload) {
      this.params.page = 1
      this.params.q = payload
      this.getLists()
    },
    setPerPage (payload) {
      this.params.page = 1
      this.params.per_page = payload
      this.getLists()
    },
    setPeriodik (val) {
      const { to, from } = val
      this.params.to = to
      this.params.from = from
      console.log('periodik', to)
      this.getLists()
    },
    setPeriode (val) {
      this.params.to = val
      this.params.from = val
      console.log('periodik', val)
      this.getLists()
    },
    setPage (payload) {
      this.params.page = payload
      this.getLists()
    },
    getLists () {
      this.getDataTable()
    },
    getInitialData () {
      this.getDataTable()
      this.getDataGudang()
      this.getRuangRanap()
    },
    async getDataGudang () {
      // this.loading = true
      const param = { params: { q: '' } }
      await api.get('v1/gudang/gudang', param)
        .then(resp => {
          // this.loading = false
          console.log('gudang ', resp.data)
          this.gudangs = resp?.data
        })
        // .catch(() => { this.loading = false })
    },
    getRuangRanap () {
      if (this.ruangRanaps.length) return
      return new Promise(resolve => {
        api.get('v1/simrs/farmasinew/penerimaan/list-ruang-ranap')
          .then(resp => {
            this.ruangRanaps = resp?.data?.data ?? resp?.data
            console.log(this.ruangRanaps)
            resolve(resp)
          })
          // .catch(() => { this.loading = false })
      })
    },
    getDataTable () {
      this.loading = true
      const param = { params: this.params }
      return new Promise(resolve => {
        api.get('v1/simrs/farmasinew/penerimaan/list-stok-sekarang', param)
          .then(resp => {
            this.loading = false
            console.log('setok ', resp.data)
            this.items = resp?.data?.data ?? resp?.data
            this.meta = resp.data?.meta
            resolve(resp)
          })
          .catch(() => { this.loading = false })
      })
    },
    getDataAlokasi (row) {
      this.obat = row
      this.loadingAlokasi = true
      const data = row
      data.kdruang = this.params.kdruang
      const param = { params: data }
      return new Promise(resolve => {
        api.get('v1/simrs/farmasinew/penerimaan/data-alokasi', param)
          .then(resp => {
            this.loadingAlokasi = false
            console.log('setok ', resp.data)
            this.mutasis = resp?.data?.permintaan
            this.reseps = resp?.data?.transRacikan ?? []
            if (resp?.data?.transNonRacikan?.length) {
              resp?.data?.transNonRacikan.forEach(racik => {
                this.reseps.push(racik)
              })
            }

            resolve(resp)
          })
          .catch(() => { this.loadingAlokasi = false })
      })
    },
    cekStok (val) {
      val.loading = true
      const form = {
        kdruang: this.params.kdruang,
        kdobat: val?.kdobat
      }
      return new Promise(resolve => {
        api.post('v1/simrs/farmasinew/stok/perbaikan-stok', form)
          .then(resp => {
            val.loading = false
            console.log('penye ', resp?.data)
            notifSuccess(resp)
            this.getDataTable()
            resolve(resp)
          })
          .catch(() => { val.loading = false })
      })
    }
  }
})
