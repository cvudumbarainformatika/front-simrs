import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
// eslint-disable-next-line no-unused-vars
import { useRencanaPemesananObatStore } from './rencana'
import { useAplikasiStore } from 'src/stores/app/aplikasi'

export const useTabelObatDirencanakaStore = defineStore('tabel_obat_direncanakan', {
  state: () => ({
    loading: false,
    items: [],
    itemsNotFiltered: [],
    meta: null,
    params: {
      per_page: 10,
      namaobat: '',
      q: '',
      page: 1
    },
    columns: [
      // 'kd_obat',
      'obat',
      'stok',
      // 'stok_gudang',
      // 'stok_rs',
      // 'stok_max_rs',
      // 'jml_bisa_beli',
      // 'pabrikan',
      // 'pabrikan',
      // 'pbf',
      // 'jumlah_dipesan',
      'jumlah',
      'centang'
    ],
    columnHide: []
  }),
  actions: {

    setQ(payload) {
      this.params.page = 1
      this.params.q = payload
      this.getLists()
    },
    setPerPage(payload) {
      this.params.page = 1
      this.params.per_page = payload
      this.getLists()
    },
    setPeriodik(val) {
      const { to, from } = val
      this.params.to = to
      this.params.from = from
      console.log('periodik', to)
      this.getLists()
    },
    setPage(payload) {
      this.params.page = payload
      this.getLists()
    },
    filterItem(val) {
      if (val !== '') {
        const all = this.itemsNotFiltered.filter(z => z.gudang === '')
        const gud = this.itemsNotFiltered.filter(z => z.gudang === val)
        this.items = [...all, ...gud]

        // sort
        this.items.sort((a, b) => {
          const nameA = a.kd_obat.toUpperCase() // ignore upper and lowercase
          const nameB = b.kd_obat.toUpperCase() // ignore upper and lowercase
          if (nameA < nameB) {
            return -1
          }
          if (nameA > nameB) {
            return 1
          }

          // names must be equal
          return 0
        })
      } else {
        this.items = this.itemsNotFiltered
      }
    },
    getLists() {
      this.getObatMauBeli()
    },
    getInitialData() {
      this.getObatMauBeli()
    },
    assignItems(val, renc) {
      const apps = useAplikasiStore()
      const kdRuang = apps?.user?.pegawai?.kdruangansim ?? renc?.form?.kd_ruang
      if (kdRuang) {
        console.log('koRuang jarene true')
      }
      console.log('kode ruang user', apps?.user?.pegawai?.kdruangansim, kdRuang)
      val.forEach(item => {
        item.checked = false
        item.stokGudang = item.stokrealgudang.length ? item.stokrealgudang.map(a => parseInt(a.jumlah)).reduce((a, b) => a + b, 0) : 0
        item.stokGudangFs = item.stokrealgudangfs.length ? item.stokrealgudangfs.map(a => parseInt(a.jumlah)).reduce((a, b) => a + b, 0) : 0
        item.stokGudangKo = item.stokrealgudangko.length ? item.stokrealgudangko.map(a => parseInt(a.jumlah)).reduce((a, b) => a + b, 0) : 0
        item.stokRS = item.stokrealallrs.length ? item.stokrealallrs.map(a => parseInt(a.jumlah)).reduce((a, b) => a + b, 0) : 0
        item.stokMaxRS = item.stokmaxrs.length ? item.stokmaxrs.map(a => parseInt(a.jumlah)).reduce((a, b) => a + b, 0) : 0
        item.stokMaxGudangKo = item.stokmaxpergudang.length ? item.stokmaxpergudang.filter(a => a.kd_ruang === 'Gd-05010100').map(a => parseInt(a.jumlah)).reduce((a, b) => a + b, 0) : 0
        item.stokMaxGudangFs = item.stokmaxpergudang.length ? item.stokmaxpergudang.filter(a => a.kd_ruang === 'Gd-03010100').map(a => parseInt(a.jumlah)).reduce((a, b) => a + b, 0) : 0
        item.sudahDirencanakan = item.perencanaanrinci.length ? item.perencanaanrinci.map(a => parseInt(a.jumlah)).reduce((a, b) => a + b, 0) : 0
        item.stokMaxs = !kdRuang ? item.stokMaxRS : (kdRuang === 'Gd-05010100' ? (item.stokMaxGudangKo) : (item.stokMaxGudangFs))
        item.stokReals = !kdRuang ? item.stokGudang : (kdRuang === 'Gd-05010100' ? (item.stokGudangKo) : (item.stokGudangFs))
        item.bisaBeli = (item.stokMaxs - item.stokRS - item.sudahDirencanakan) > 0 ? (item.stokMaxs - item.stokRS - item.sudahDirencanakan) : 0

        item.jumlahBeli = item.bisaBeli
      })
      this.items = val
      this.itemsNotFiltered = val
    },
    getObatMauBeli() {
      this.loading = true
      const param = { params: this.params }
      return new Promise(resolve => {
        api.get('v1/simrs/farmasinew/dialogperencanaanobat', param)
          .then(resp => {
            this.loading = false
            console.log('obat mau dibeli', resp?.data)
            // const temp = resp?.data?.data ?? resp?.data
            // const renc = useRencanaPemesananObatStore()
            // this.assignItems(temp, renc)
            // this.meta = resp?.data?.current_page ? resp?.data : null
            // if (renc.form?.kd_ruang) {
            //   this.filterItem(renc.form?.kd_ruang)
            // }
            resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    }
  }
})
