import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { dateDbFormat } from 'src/modules/formatter'

export const useReturDepoStore = defineStore('retur_dari_depo', {
  state: () => ({
    isOpen: false,
    loading: false,
    loadingKirim: false,
    meta: {},
    items: [],
    params: {
      q: '',
      per_page: 10,
      page: 1,
      kddepo: '',
      flag: ['3'],
      to: dateDbFormat(new Date()),
      from: dateDbFormat(new Date())
    },
    resep: {}

  }),
  actions: {
    setOpen() { this.isOpen = true },
    setClose() {
      this.isOpen = false
      this.resep = {}
    },
    setParams(key, val) {
      this.params[key] = val
    },
    setFlag(val) {
      // console.log('flag', val)
      this.setParams('flag', val)
      this.setParams('page', 1)
      this.getDataTable()
    },
    setSearch(val) {
      this.setParams('q', val)
      this.setParams('page', 1)
      this.getDataTable()
    },
    setPerPage(val) {
      this.setParams('per_page', val)
      this.setParams('page', 1)
      this.getDataTable()
    },
    setPage(val) {
      this.setParams('page', val)
      this.getDataTable()
    },
    refresh() {
      this.setParams('page', 1)
      this.getDataTable()
    },
    setPeriodik(val) {
      this.params.page = 1
      const { to, from } = val
      this.params.to = to
      this.params.from = from
      this.getDataTable()
    },
    setResep(val) {
      const res = val
      res.listRacikan = []
      if (res?.rincianracik?.length) {
        res?.rincianracik.forEach(key => {
          // key.jumlahresep = key.jumlah
          // key.jumlahobat = Math.ceil(key.jumlah)
          // key.harga = (parseFloat(key?.jumlahobat) * parseFloat(key?.harga_jual)) + parseFloat(key?.r)
          key.jumlah = parseFloat(key.jumlah)
          key.jumlahasal = key.jumlah
          key.nilai_r = parseFloat(key.nilai_r)
          key.harga_jual = parseFloat(key.harga_jual)
          key.harga = (parseFloat(key?.jumlah) * parseFloat(key?.harga_jual)) + parseFloat(key?.nilai_r)
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
              // aturan: key?.aturan,
              // keterangan: key?.keterangan,
              // tiperacikan: key?.tiperacikan,
              // konsumsi: key?.konsumsi,
              // jumlahdibutuhkan: key?.jumlahdibutuhkan,
              rincian: [key]
            }
            res.listRacikan.push(temp)
          }
        })
      }
      if (res?.rincian?.length) {
        res?.rincian.forEach(key => {
          key.jumlah = parseFloat(key.jumlah)
          key.jumlahasal = key.jumlah
          key.nilai_r = parseFloat(key.nilai_r)
          key.harga_jual = parseFloat(key.harga_jual)
          key.harga = (parseFloat(key?.jumlah) * parseFloat(key?.harga_jual)) + parseFloat(key?.nilai_r)
        })
      }
      this.resep = res
    },
    getInitalData() {},
    async getDataTable() {
      this.loading = true
      const param = { params: this.params }
      await api.get('v1/simrs/farmasinew/depo/caribynoresep', param)
        .then(resp => {
          this.loading = false
          this.items = resp?.data?.result?.data ?? resp?.data?.result
          this.meta = resp?.data?.result?.data ? resp?.data?.result : {}
          console.log('cari ret', resp?.data)
          console.log('items', this.items)
        })
        .catch(() => { this.loading = false })
    },
    kirim() {
      console.log('kirim', this.resep)
    }
  }
})
