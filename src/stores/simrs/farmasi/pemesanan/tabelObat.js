import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { usePemesananObatStore } from './pesanan'
import { filterDuplicateArrays } from 'src/modules/utils'
import { date } from 'quasar'

export const useTabelPemesananObatStore = defineStore('tabel_pemesanan_obat', {
  state: () => ({
    loadingList: false,
    loading: false,
    items: [],
    meta: {},
    params: {
      per_page: 50,
      no_rencbeliobat: '',
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
    rencanaAlls: [],
    norencanas: [],
    pesan: usePemesananObatStore(),
    tglRencana: null,
    gudang: null,
    gudangs: [
      { nama: 'Gudang Farmasi ( Kamar Obat )', value: 'Gd-05010100' },
      { nama: 'Gudang Farmasi (Floor Stok)', value: 'Gd-03010100' }
    ]
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
      // const gudangs = [
      //   { nama: 'Gudang Farmasi ( Kamar Obat )', value: 'Gd-05010100' },
      //   { nama: 'Gudang Farmasi (Floor Stok)', value: 'Gd-03010100' }
      // ]
      this.pesan.isOpen = true
      this.pesan.setForm('no_rencbeliobat', val)
      const item = this.rencanaAlls.filter(a => a.noperencanaan === val)
      if (item.length) {
        const gud = this.gudangs.filter(a => a.value === item[0].gudang)
        if (gud.length) this.gudang = gud[0].nama
        this.tglRencana = date.formatDate(item[0].tglperencanaan, 'DD MMMM YYYY')
        this.items = item

        this.items.forEach(a => {
          const dipesan = !isNaN(parseFloat(a.jumlahdipesandiperencanaan)) ? parseFloat(a.jumlahdipesandiperencanaan) : 0
          const dpesan = !isNaN(parseFloat(a.jumlahallpesan)) ? parseFloat(a.jumlahallpesan) : 0
          // const bolehDipesan = ((parseFloat(a.stomaxkrs) - parseFloat(a.stokrs)) - dpesan) > 0 ? (parseFloat(a.stomaxkrs) - parseFloat(a.stokrs)) - dpesan : 0
          const bolehDipesan = (dipesan - dpesan) > 0 ? (dipesan - dpesan) : 0
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
    cariRencana(val) {
      this.setParam('no_rencbeliobat', '')
      this.rencanas = []
      const ren = this.rencanaAlls.filter(a => a.noperencanaan.includes(val))
      if (ren.length) {
        const noren = filterDuplicateArrays(ren.map(a => a.noperencanaan))
        if (noren.length) {
          noren.forEach(a => {
            const head = this.rencanaAlls.filter(kep => kep.noperencanaan === a)
            if (head.length) {
              const gudA = this.gudangs.filter(gu => gu.value === head[0]?.gudang)
              const gud = gudA[0] ?? {}
              console.log('gu', gud)
              const temp = {
                no_rencbeliobat: a,
                gudang: gud,
                tglperencanaan: head[0]?.tglperencanaan,
                detail: head
              }
              this.rencanas.push(temp)
            }
          })
        }
        // this.rencanas = ren
      } else {
        this.setParam('no_rencbeliobat', val)
        this.getObatMauBeli()
      }
    },
    getInitialData() {
      this.getObatMauBeli()
    },
    getObatMauBeli() {
      this.norencanas = []
      this.rencanas = []
      this.loadingList = true

      const param = { params: this.params }
      return new Promise(resolve => {
        api.get('v1/simrs/farmasinew/pemesananobat/dialogrencanabeli', param)
          .then(resp => {
            this.loadingList = false
            console.log('obat direncakan', resp.data)
            const rencana = resp?.data?.data ?? resp?.data
            if (rencana.length) {
              this.rencanaAlls = rencana
              const noren = filterDuplicateArrays(rencana.map(a => a.noperencanaan))
              if (noren.length) {
                noren.forEach(a => {
                  const anu = { no_rencbeliobat: a }
                  const head = this.rencanaAlls.filter(kep => kep.noperencanaan === a)
                  if (head.length) {
                    const gudA = this.gudangs.filter(gu => gu.value === head[0]?.gudang)
                    const gud = gudA[0] ?? {}
                    // console.log('gu', gud)
                    const temp = {
                      no_rencbeliobat: a,
                      gudang: gud,
                      tglperencanaan: head[0]?.tglperencanaan,
                      detail: head
                    }
                    this.rencanas.push(temp)
                  }
                  this.norencanas.push(anu)
                })
              }
              console.log('rencanas', this.rencanas)
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
