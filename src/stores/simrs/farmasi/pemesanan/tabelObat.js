import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { usePemesananObatStore } from './pesanan'
import { filterDuplicateArrays } from 'src/modules/utils'
import { date } from 'quasar'
import { useListPemesananStore } from './listpesanan'

export const useTabelPemesananObatStore = defineStore('tabel_pemesanan_obat', {
  state: () => ({
    loadingList: false,
    loading: false,
    items: [],
    terima: [],
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
      'harga',
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
    rencanaSelected(val, from) {
      // eslint-disable-next-line no-unused-vars
      const gudangs = [
        { nama: 'Gudang Farmasi ( Kamar Obat )', value: 'Gd-05010100' },
        { nama: 'Gudang Farmasi (Floor Stok)', value: 'Gd-03010100' }
      ]
      this.pesan.isOpen = true
      this.pesan.setForm('no_rencbeliobat', val)
      console.log('renc se', from, val)
      this.getRencanaRinci(val).then(() => {
        if (!this.items.length) {
          this.pesan.setClose()
          this.getObatMauBeli()

          const list = useListPemesananStore()
          list.refreshTable()
          return
        }
        // const item = this.rencanaAlls.filter(a => a.noperencanaan === val)
        // if (item.length) {
        this.pesan.setForm('gudang', this.items[0].gudang)
        const gud = this.gudangs.filter(a => a.value === this.items[0].gudang)
        if (gud.length) this.gudang = gud[0].nama
        this.tglRencana = date.formatDate(this.items[0].tglperencanaan, 'DD MMMM YYYY')
        //   this.items = item

        this.items.forEach(item => {
          item.diterima = 0
          if (this.terima?.length) {
            const dterima = this.terima?.find(a => a.kdobat === item.kdobat)
            if (dterima) item.diterima = dterima?.jumlah
          }
          if (item?.rincian.length) {
            const rinc = item.rincian.find(a => a.kdobat === item.kdobat)
            if (rinc) {
              const trm = rinc.penerimaan.map(ha => parseFloat(ha.harga)).reduce((a, b) => a + b, 0)
              const stok = rinc?.harga?.harga ?? 0

              // console.log('trm', trm, 'stok', stok)
              item.harga = trm > 0 ? trm : stok
            }
          }
          const dipesan = !isNaN(parseFloat(item.jumlah_diverif)) ? parseFloat(item.jumlah_diverif) : 0
          // const dpesan = !isNaN(parseFloat(item.jumlahallpesan)) ? parseFloat(item.jumlahallpesan) : 0
          const dpesan = !isNaN(parseFloat(item.jumlahallpesan)) ? parseFloat(item.jumlahallpesan) : 0
          // const ditolak = !isNaN(parseFloat(item.jumlahallpesan)) && item?.flag_pesan === '2' ? parseFloat(item.jumlahallpesan) : 0
          // const bolehDipesan = ((parseFloat(item.stomaxkrs) - parseFloat(item.stokrs)) - dpesan) > 0 ? (parseFloat(item.stomaxkrs) - parseFloat(item.stokrs)) - dpesan : 0
          const bolehDipesan = (dipesan - dpesan + parseFloat(item?.ditolak)) > 0 ? (dipesan - dpesan + parseFloat(item?.ditolak)) : 0
          // console.log('boleh dipesan', bolehDipesan)
          item.jumlahdipesan = (dipesan - dpesan + parseFloat(item?.ditolak)) > 0 ? (dipesan - dpesan + parseFloat(item?.ditolak)) : 0
          item.jumlahdirencanakan = dipesan
          item.bolehdipesan = bolehDipesan
        })
        // }
        // console.log('pesanan', item)
      })
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
      this.terima = []
      this.loadingList = true

      const param = { params: this.params }
      return new Promise(resolve => {
        api.get('v1/simrs/farmasinew/pemesananobat/dialogrencanabeli', param)
          .then(resp => {
            this.loadingList = false
            console.log('obat direncakan', resp.data)
            const rencana = resp?.data?.data ?? resp?.data
            this.rencanas = rencana
            this.rencanaAlls = rencana
            // if (rencana.length) {
            //   this.rencanaAlls = rencana
            //   const noren = filterDuplicateArrays(rencana.map(a => a.noperencanaan))
            //   if (noren.length) {
            //     noren.forEach(a => {
            //       const anu = { no_rencbeliobat: a }
            //       const head = this.rencanaAlls.filter(kep => kep.noperencanaan === a)
            //       if (head.length) {
            //         head.forEach(he => {
            //           if (he?.rincian.length) {
            //             const rinc = he.rincian.filter(a => a.kdobat === he.kdobat)
            //             if (rinc.length) {
            //               const trm = rinc[0].penerimaan.map(ha => parseFloat(ha.harga)).reduce((a, b) => a + b, 0)
            //               const stok = rinc[0].stok.map(ha => parseFloat(ha.harga)).reduce((a, b) => a + b, 0)
            //               console.log('trm', trm, 'stok', stok)
            //               he.harga = trm > 0 ? trm : stok
            //             }
            //           }
            //         })
            //         const gudA = this.gudangs.filter(gu => gu.value === head[0]?.gudang)
            //         const gud = gudA[0] ?? {}
            //         // console.log('gu', gud)
            //         const temp = {
            //           no_rencbeliobat: a,
            //           gudang: gud,
            //           tglperencanaan: head[0]?.tglperencanaan,
            //           detail: head
            //         }
            //         this.rencanas.push(temp)
            //       }
            //       this.norencanas.push(anu)
            //     })
            //   }
            //   console.log('rencanas', this.rencanas)
            // }

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
            resolve(rencana)
          })
          .catch(() => {
            this.loadingList = false
          })
      })
    },
    getRencanaRinci(val) {
      this.loading = true
      this.terima = []
      const param = { params: { no_rencbeliobat: val } }
      return new Promise(resolve => {
        api.get('v1/simrs/farmasinew/pemesananobat/dialogrencanabeli_rinci', param)
          .then(resp => {
            this.loading = false
            console.log('rencana r', resp?.data)
            this.items = resp?.data?.data ?? resp?.data
            // this.terima = resp?.data?.terima

            resolve(this.items)
          })
          .catch(() => {
            this.loading = false
          })
      })
    }
  }
})
