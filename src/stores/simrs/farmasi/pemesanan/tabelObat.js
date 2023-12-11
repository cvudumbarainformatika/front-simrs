import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { usePemesananObatStore } from './pesanan'
import { filterDuplicateArrays } from 'src/modules/utils'

export const useTabelPemesananObatStore = defineStore('tabel_pemesanan_obat', {
  state: () => ({
    loadingList: false,
    loading: false,
    items: [],
    meta: {},
    params: {
      per_page: 50,
      namaobat: '',
      page: 1
    },
    columns: [
      'obat',
      'stok',
      'jumlah',
      'centang'
    ],
    columnHide: [],
    rencanas: [],
    norencanas: [],
    pesan: usePemesananObatStore(),
    tglRencana: null
  }),
  actions: {
    setParam(key, val) {
      this.params[key] = val
    },
    setPerPage(payload) {
      this.setParam('per_page', payload)
      this.setParam('page', 1)
      this.getObatMauBeli()
    },
    setPage(payload) {
      this.setParam('page', payload)
      this.getObatMauBeli()
    },
    setSearch(payload) {
      this.setParam('namaobat', payload)
      this.setParam('page', 1)
      this.getObatMauBeli()
    },
    setColumns (payload) {
      const thumb = payload.map((x) => Object.keys(x))
      this.columns = thumb[0]
      // console.log('columns', this.columns)
    },
    rencanaSelected(val) {
      this.pesan.setForm('no_rencbeliobat', val)
      const item = this.rencanas.filter(a => a.noperencanaan === val)
      if (item.length) {
        this.tglRencana = item[0].tglperencanaan
        this.items = item

        this.items.forEach(a => {
          const dipesan = !isNaN(parseFloat(a.jumlahdipesandiperencanaan)) ? parseFloat(a.jumlahdipesandiperencanaan) : 0
          const dpesan = !isNaN(parseFloat(a.jumlahallpesan)) ? parseFloat(a.jumlahallpesan) : 0
          const bolehDipesan = ((parseFloat(a.stomaxkrs) - parseFloat(a.stokrs)) - dpesan) > 0 ? (parseFloat(a.stomaxkrs) - parseFloat(a.stokrs)) - dpesan : 0
          console.log('boleh dipesan', bolehDipesan)
          a.jumlahdipesan = (dipesan - dpesan) > 0 ? (dipesan - dpesan) : 0
          a.jumlahdirencanakan = dipesan
          a.bolehdipesan = bolehDipesan
        })
      }
      console.log('pesanan', item)
    },
    clearRencana(val) {
      this.pesan.setForm('no_rencbeliobat', null)
    },
    getInitialData() {
      this.getObatMauBeli()
    },
    getObatMauBeli() {
      this.norencanas = []
      this.loadingList = true
      const param = { params: this.params }
      return new Promise(resolve => {
        api.get('v1/simrs/farmasinew/pemesananobat/dialogrencanabeli', param)
          .then(resp => {
            this.loadingList = false
            console.log('obat direncakan', resp.data)
            const rencana = resp?.data?.data ?? resp?.data
            if (rencana.length) {
              this.rencanas = rencana
              const noren = filterDuplicateArrays(rencana.map(a => a.noperencanaan))
              if (noren.length) {
                noren.forEach(a => {
                  const anu = { no_rencbeliobat: a }
                  this.norencanas.push(anu)
                })
              }
              console.log('no ren', noren)
            }

            // this.rencanas = resp.data
            // const temp = resp.data
            // temp.forEach(item => {
            //   item.checked = false
            //   item.stokGudang = item.stokrealgudang.length ? item.stokrealgudang.map(a => parseInt(a.jumlah)).reduce((a, b) => a + b, 0) : 0
            //   item.stokRS = item.stokrealallrs.length ? item.stokrealallrs.map(a => parseInt(a.jumlah)).reduce((a, b) => a + b, 0) : 0
            //   item.stokMaxRS = item.stokmaxrs.length ? item.stokmaxrs.map(a => parseInt(a.jumlah)).reduce((a, b) => a + b, 0) : 0
            //   item.bisaBeli = (item.stokMaxRS - item.stokRS) > 0 ? (item.stokMaxRS - item.stokRS) : 0
            //   item.jumlahBeli = item.bisaBeli
            // })

            // console.log('item', this.items)
            this.meta = resp.data
            // this.setColumns(resp.data.data)
            resolve(resp)
          })
          .catch(() => {
            this.loadingList = false
          })
      })
    }
  }
})
