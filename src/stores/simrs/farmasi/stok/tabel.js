import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { notifSuccess } from 'src/modules/utils'

export const UseFarmasiStokTable = defineStore('tabel_stok', {
  state: () => ({
    loading: false,
    loadingTutup: false,
    tutup: false,
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
      'fisik',
      'selisih'
    ],
    columnHide: [],
    keterangan: 'keterangan',
    now: null
  }),
  actions: {
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
      // this.getDataTable()
      this.getDataGudang()
    },
    async getDataGudang () {
      this.loading = true
      const param = { params: { q: '' } }
      await api.get('v1/gudang/gudang', param)
        .then(resp => {
          this.loading = false
          console.log('gudang ', resp.data)
          this.gudangs = resp?.data
        })
        .catch(() => { this.loading = false })
    },
    getDataTable (val) {
      this.loading = !val
      const param = { params: this.params }
      return new Promise(resolve => {
        api.get('v1/simrs/farmasinew/penerimaan/liststokreal', param)
          .then(resp => {
            this.loading = false
            console.log('setok ', resp.data)
            this.items = resp?.data?.data ?? resp?.data
            this.meta = resp.data?.meta
            this.now = resp.data?.now
            if (this.items.length) {
              this.items.forEach(it => {
                const tglInputFisik = it.tgl_input_fisik
                if (it.tgl_input_fisik) {
                  it.jamInput = date.formatDate(tglInputFisik, 'HH:mm:ss')
                  it.tglInputFisik = date.formatDate(tglInputFisik, 'DD MMMM YYYY')
                  it.tgl_input_fisik = date.formatDate(tglInputFisik, 'YYYY-MM-DD')
                }
                else {
                  it.jamInput = date.formatDate(Date.now(), 'HH:mm:ss')
                  it.tglInputFisik = date.formatDate(Date.now(), 'DD MMMM YYYY')
                  it.tgl_input_fisik = date.formatDate(Date.now(), 'YYYY-MM-DD')
                }
                it.total = 0
                it.total = it?.oneopname?.total ?? it?.onestok?.total
                it.kdruang = it?.oneopname?.kdruang ?? it?.onestok?.kdruang
                it.harga = it?.oneopname?.harga ?? it?.onestok?.harga
                it.tglexp = it?.oneopname?.tglexp ?? it?.onestok?.tglexp
                it.fisik = it?.onefisik?.jumlah ?? null
              })
            }
            resolve(resp)
          })
          .catch(() => { this.loading = false })
      })
    },
    tutupOpname (val) {
      this.loadingTutup = true
      return new Promise(resolve => {
        api.post('v1/simrs/farmasinew/penerimaan/tutup-opname', val)
          .then(resp => {
            this.loadingTutup = false
            notifSuccess(resp)
            this.tutup = true
            resolve(resp)
          })
          .catch(() => {
            this.loadingTutup = false
          })
      })
    }
  }
})
