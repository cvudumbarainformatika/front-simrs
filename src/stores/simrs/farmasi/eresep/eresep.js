import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifSuccess } from 'src/modules/utils'

export const useEResepDepoFarmasiStore = defineStore('e_resep_depo_farmasi', {
  state: () => ({
    isOpen: false,
    loading: false,
    loadingTerima: false,
    loadingSelesai: false,
    loadingSimpan: false,
    items: [],
    meta: {},
    params: {
      q: '',
      page: 1,
      per_page: 10,
      kddepo: '',
      flag: ['1', '2']
    },
    depos: [
      { nama: 'Floor Stock 1 (AKHP)', value: 'Gd-03010101' },
      { nama: 'Depo Rawat inap', value: 'Gd-04010102' },
      { nama: 'Depo OK', value: 'Gd-04010103' },
      { nama: 'Depo Rawat Jalan', value: 'Gd-05010101' },
      { nama: 'Depo IGD', value: 'Gd-02010104' }
    ],
    resep: {},
    noresLoad: null,
    removedItemId: []
  }),
  actions: {
    setOpen() { this.isOpen = true },
    setClose() { this.isOpen = false },
    setParams(key, val) { this.params[key] = val },
    setFlag(val) {
      // console.log('flag', val)
      this.setParams('flag', val)
      this.setParams('page', 1)
      this.removedItemId = []
      this.getDataTable()
    },
    setSearch(val) {
      this.setParams('q', val)
      this.setParams('page', 1)
      this.removedItemId = []
      this.getDataTable()
    },
    setPerPage(val) {
      this.setParams('per_page', val)
      this.setParams('page', 1)
      this.removedItemId = []
      this.getDataTable()
    },
    setPage(val) {
      this.setParams('page', val)
      this.removedItemId = []
      this.getDataTable()
    },
    refresh() {
      this.setParams('page', 1)
      this.removedItemId = []
      this.getDataTable()
    },
    setResep(val) {
      const res = val
      res.listRacikan = []
      if (res?.permintaanracikan?.length) {
        res?.permintaanracikan.forEach(key => {
          key.jumlahresep = key.jumlah
          key.jumlahobat = Math.ceil(key.jumlah)
          key.harga = (parseFloat(key?.jumlahobat) * parseFloat(key?.harga_jual)) + parseFloat(key?.r)
          const namaracikan = key?.namaracikan
          const adaList = res.listRacikan.filter(list => list.namaracikan === namaracikan)
          if (adaList.length) {
            adaList[0].rincian.push(key)
            const harga = adaList[0].rincian.map(a => a?.harga).reduce((a, b) => a + b, 0) ?? 0
            adaList[0].harga = harga
          } else {
            const temp = {
              namaracikan: key?.namaracikan,
              harga: key?.harga,
              aturan: key?.aturan,
              keterangan: key?.keterangan,
              tiperacikan: key?.tiperacikan,
              konsumsi: key?.konsumsi,
              jumlahdibutuhkan: key?.jumlahdibutuhkan,
              rincian: [key]
            }
            res.listRacikan.push(temp)
          }
        })
      }
      this.resep = res
    },
    async getDataTable(val) {
      if (!val) this.loading = true
      const param = { params: this.params }
      // console.log('loading', val, this.loading)
      await api.get('v1/simrs/farmasinew/depo/listresepbydokter', param)
        .then(resp => {
          console.log('get data table', resp?.data)
          this.loading = false
          const data = resp?.data?.data ?? resp?.data
          if (this.removedItemId.length) {
            this.items = data.filter(x => !this.removedItemId.includes(x.id))
          } else {
            this.items = data
          }
          this.meta = resp?.data?.data ? resp?.data : {}
        })
        .catch(() => { this.loading = false })
    },
    async getSatuResep(val) {
      const param = {
        id: val?.id,
        noreg: val?.noreg
      }
      // console.log('obat', val, filtObat)
      this.loadingObat = true
      const params = { params: param }
      await api.get('v1/simrs/farmasinew/depo/get-single-resep', params)
        .then(resp => {
          console.log('get single', resp.data)
          if (resp.status === 200) {
            // if (this.params.per_page <= this.items.length) this.items.splice(this.items.length - 1, 1)
            this.items.push(resp.data)
          }
        })
    },
    async terimaResep(val) {
      console.log('terima resep', val)
      this.loadingTerima = true
      val.loading = true
      await api.post('v1/simrs/farmasinew/depo/terima-resep', val)
        .then(resp => {
          console.log('resp', resp)
          this.loadingTerima = false
          delete val.loading
          const index = this.items.findIndex(x => x.id === resp?.data?.data.id)
          if (this.params.flag.includes('2')) {
            if (index >= 0) this.items[index].flag = '2'
            this.items.sort((firstItem, secondItem) => parseInt(firstItem.flag) - parseInt(secondItem.flag) || new Date(firstItem.tgl_permintaan) - new Date(secondItem.tgl_permintaan))
          } else {
            if (index >= 0) this.items.splice(index, 1)
            this.removedItemId.push(resp?.data?.data.id)
          }
          this.getDataTable(true)
          notifSuccess(resp)
        })
        .catch(() => {
          this.loadingTerima = false
          delete val.loading
        })
      // this.loadingTerima = true
    },
    async resepSelesai(val) {
      console.log('resep selesai', val)
      this.loadingSelesai = true
      val.loading = true
      await api.post('v1/simrs/farmasinew/depo/resep-selesai', val)
        .then(resp => {
          console.log('resp', resp)
          this.loadingSelesai = false
          delete val.loading
          const index = this.items.findIndex(x => x.id === resp?.data?.data.id)
          if (this.params.flag.includes('3')) {
            if (index >= 0) this.items[index].flag = '3'
            this.items.sort((firstItem, secondItem) => parseInt(firstItem.flag) - parseInt(secondItem.flag) || new Date(firstItem.tgl_permintaan) - new Date(secondItem.tgl_permintaan))
          } else {
            if (index >= 0) this.items.splice(index, 1)
            this.removedItemId.push(resp?.data?.data.id)
          }
          this.getDataTable(true)
          notifSuccess(resp)
        })
        .catch(() => {
          this.loadingSelesai = false
          delete val.loading
        })
      // this.loadingTerima = true
    },
    simpanObat(val) {
      console.log('obat', val)
      val.nilai_r = val?.r
      val.loading = true
      this.simpan(val).then(() => { delete val.loading }).catch(() => { delete val.loading })
    },
    simpanRacikan(val) {
      const temp = new FormData()
      const key = Object.keys(val)
      key.forEach(a => {
        if (a === 'jumlah') {
          temp.append(a, val?.jumlahobat)
        } else {
          temp.append(a, val[a])
        }
      })
      temp.append('nilai_r', val?.r)
      temp.append('jenisresep', 'Racikan')
      console.log('Racikan', temp, val)
      val.loading = true
      this.simpan(temp).then(() => { delete val.loading }).catch(() => { delete val.loading })
    },
    simpan(val) {
      this.loadingSimpan = true
      return new Promise((resolve, reject) => {
        api.post('v1/simrs/farmasinew/depo/eresepobatkeluar', val)
          .then(resp => {
            this.loadingSimpan = false
            console.log('resp', resp)
            resolve(resp)
          })
          .catch(err => {
            this.loadingSimpan = false
            reject(err)
          })
      })
    }
  }
})
