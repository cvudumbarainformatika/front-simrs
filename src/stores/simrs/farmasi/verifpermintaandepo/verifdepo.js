import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifSuccess } from 'src/modules/utils'

export const useVerifPermintaanDepoStore = defineStore('verif_permintaan_depo', {
  state: () => ({
    loading: false,
    loadingCariPermintaan: false,
    loadingKunci: false,
    items: [],
    meta: { },
    params: {
      page: 1,
      q: '',
      per_page: 10,
      no_permintaan: '',
      kdgudang: '',
      flag: ''
    },
    form: {},
    disp: { no_permintaan: '' },
    terpilih: {},
    columns: [
      'no_permintaan',
      'tgl_permintaan',
      'dari',
      'tujuan',
      'status',
      'user',
      'act'
    ],
    gudangs: [
      { nama: 'Gudang Farmasi ( Kamar Obat )', value: 'Gd-05010100' },
      { nama: 'Gudang Farmasi (Floor Stok)', value: 'Gd-03010100' }
    ],
    depos: [
      { nama: 'Floor Stock 1 (AKHP)', value: 'Gd-03010101' },
      { nama: 'Floor Stock 2 (Obat)', value: 'Gd-04010101' },
      { nama: 'Depo Rawat inap', value: 'Gd-04010102' },
      { nama: 'Depo OK', value: 'Gd-04010103' },
      { nama: 'Depo Rawat Jalan', value: 'Gd-05010101' }
    ],
    statuses: [
      { nama: 'Tampilkan semua', value: '', color: 'grey' },
      { nama: 'Menunggu verifikasi', value: '1', color: 'cyan' },
      { nama: 'Telah di verifikasi', value: '2', color: 'blue' }
      // { nama: 'Barang sudah bisa diambil', value: 6, color: 'green' },
      // { nama: 'Telah di distribusikan', value: 7, color: 'orange' },
      // { nama: 'Ditolak', value: 20, color: 'red' }
    ],
    paramStatus: {
      nama: 'Belum di filter', value: 99, color: 'cyan'
    }
  }),
  actions: {
    setQ(payload) {
      this.params.page = 1
      this.params.q = payload
      this.getPermintaanDepo()
    },
    setPeriodik(val) {
      const { to, from } = val
      this.params.to = to
      this.params.from = from
      console.log('periodik', to)
      this.getPermintaanDepo()
    },
    setForm(key, val) {
      this.form[key] = val
    },
    setParams(key, val) {
      this.params[key] = val
    },
    setSearch(val) {
      this.setParams('no_permintaan', val)
      this.setParams('page', 1)
      this.getPermintaanDepo()
    },
    setPage(val) {
      this.setParams('page', val)
      this.getPermintaanDepo()
    },
    setPerPage(val) {
      this.setParams('per_page', val)
      this.setParams('page', 1)
      this.getPermintaanDepo()
    },
    refreshTable(val) {
      this.setParams('page', 1)
      this.getPermintaanDepo()
    },
    setParamStatus(val) {
      console.log('status ', val)
      if (val.value === 99) {
        this.paramStatus = val
        delete this.params.status
        this.setParams('flag', '')
        this.getPermintaanDepo()
      } else {
        this.paramStatus = val
        this.setParams('flag', val.value)
        this.getPermintaanDepo()
      }
    },
    permintaanSelected(val) {
      this.disp.no_permintaan = val
      const temp = this.items.filter(a => a.no_permintaan === val)
      if (temp.length) {
        const item = temp[0]
        this.terpilih = item
        console.log('item', item)
      }
    },
    cariPermintaan(val) {
      const needle = val.toLowerCase()
      const arr = 'no_permintaan'
      let opt = []

      const splits = arr.split('-')
      const multiFilter = (data = [], filterKeys = [], value = '') =>
        data.filter((item) =>
          filterKeys.some(
            (key) =>
              item[key].toString().toLowerCase().includes(value.toLowerCase()) &&
                item[key]
          )
        )
      const filteredData = multiFilter(this.items, splits, needle)
      opt = filteredData
      if (opt.length <= 0) {
        this.setParams('no_permintaan', val)
        this.getPermintaanDepo()
        // console.log('opt', 'ga ada')
      }
      // console.log('opt', opt)
      // console.log('val', val)
    },

    getInitialData() {
      this.getPermintaanDepo()
    },
    getPermintaanDepo() {
      this.loading = true
      const param = { params: this.params }
      return new Promise(resolve => {
        api.get('v1/simrs/farmasinew/gudang/distribusi/listpermintaandepo', param)
          .then(resp => {
            this.loading = false
            console.log('list Permintaan depo', resp.data)
            this.items = resp.data.data
            this.meta = resp.data
            resolve(resp)
          })
          .catch(() => { this.loading = false })
      })
    },
    simpanDetail(val) {
      this.loading = true
      return new Promise(resolve => {
        api.post('v1/simrs/farmasinew/gudang/distribusi/verifpermintaanobat', val)
          .then(resp => {
            this.loading = false
            notifSuccess(resp)
            this.getPermintaanDepo()
            resolve(resp)
          })
          .catch(() => { this.loading = false })
      })
    },
    kunci() {
      console.log('store.kunci')
    }
  }
})
