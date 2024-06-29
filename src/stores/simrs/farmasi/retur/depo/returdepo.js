import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
// import { dateDbFormat } from 'src/modules/formatter'
import { filterDuplicateArrays, notifSuccess } from 'src/modules/utils'

export const useReturDepoStore = defineStore('retur_dari_depo', {
  state: () => ({
    isOpen: false,
    loading: false,
    loadingKirim: false,
    meta: {},
    items: [],
    params: {
      q: '',
      nama: '',
      per_page: 10,
      page: 1,
      kddepo: '',
      flag: ['3'],
      // to: dateDbFormat(new Date()),
      from: null
    },
    resep: {}

  }),
  actions: {
    setOpen () { this.isOpen = true },
    setClose () {
      this.isOpen = false
      this.resep = {}
    },
    setParams (key, val) {
      this.params[key] = val
    },
    setFlag (val) {
      // console.log('flag', val)
      this.setParams('flag', val)
      this.setParams('page', 1)
      this.getDataTable()
    },
    setSearch (val) {
      this.setParams('q', val)
      this.setParams('page', 1)
      this.getDataTable()
    },
    setSearchDua (val) {
      this.setParams('nama', val)
      this.setParams('page', 1)
      this.getDataTable()
    },
    setPerPage (val) {
      this.setParams('per_page', val)
      this.setParams('page', 1)
      this.getDataTable()
    },
    setPage (val) {
      this.setParams('page', val)
      this.getDataTable()
    },
    refresh () {
      this.setParams('page', 1)
      this.getDataTable()
    },
    setPeriodik (val) {
      this.params.page = 1
      // const { to, from } = val
      // this.params.to = to
      // this.params.from = from
      this.params.from = val
      this.getDataTable()
    },
    setResep (val) {
      const res = val
      res.listRacikan = []
      res.listObat = []

      if (res?.rincianracik?.length) {
        res?.rincianracik.forEach(key => {
          key.jumlah_keluar = parseFloat(key.jumlah)
          key.nilai_r = parseFloat(key.nilai_r)
          key.harga_jual = parseFloat(key.harga_jual)
          key.harga = (parseFloat(key?.jumlah) * parseFloat(key?.harga_jual)) + parseFloat(key?.nilai_r)
          key.jumlah_retur = 0
        })
      }
      const obatraciks = filterDuplicateArrays(res?.rincianracik.map(x => x.kdobat))
      // console.log('rinc', obatraciks)
      if (obatraciks.length) {
        obatraciks.forEach(key => {
          const temp = res?.rincianracik.filter(x => x.kdobat === key)
          const obat = res?.rincianracik.find(x => x.kdobat === key)
          obat.jumlah_keluar = temp.map(x => x.jumlah_keluar).reduce((a, b) => a + b, 0)
          // console.log('key', temp, obat)
          // metani by namaracikan
          const namaracikan = obat?.namaracikan
          const adaList = res.listRacikan.filter(list => list.namaracikan === namaracikan)
          if (adaList.length) {
            adaList[0].rincian.push(obat)
            const harga = adaList[0].rincian.map(a => a?.harga).reduce((a, b) => a + b, 0) ?? 0
            adaList[0].harga = harga
          }
          else {
            const temp = {
              namaracikan: obat?.namaracikan,
              harga: obat?.harga,
              rincian: [obat]
            }
            res.listRacikan.push(temp)
          }
        })
      }
      if (res?.rincian?.length) {
        res?.rincian.forEach(key => {
          key.jumlah_keluar = parseFloat(key.jumlah)
          key.nilai_r = parseFloat(key.nilai_r)
          key.harga_jual = parseFloat(key.harga_jual)
          key.harga = (parseFloat(key?.jumlah) * parseFloat(key?.harga_jual)) + parseFloat(key?.nilai_r)
          key.jumlah_retur = 0
          const adaRet = res?.rincianwret.find(ret => ret.kdobat === key.kdobat)
          if (adaRet) {
            if (adaRet.jumlah_retur) key.jumlah_retur = adaRet.jumlah_retur
          }
        })
      }
      const obats = filterDuplicateArrays(res?.rincian.map(x => x.kdobat))
      if (obats.length) {
        obats.forEach(key => {
          const temp = res?.rincian.filter(x => x.kdobat === key)
          const obat = res?.rincian.find(x => x.kdobat === key)
          obat.jumlah_keluar = temp.map(x => x.jumlah_keluar).reduce((a, b) => a + b, 0)
          res.listObat.push(obat)
        })
      }
      this.resep = res
    },
    getInitalData () {},
    async getDataTable () {
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
    kirim () {
      console.log('kirim', this.resep)
      const form = {
        listObat: this.resep.listObat,
        noresep: this.resep.noresep,
        noreg: this.resep.noreg,
        norm: this.resep.norm,
        kddokter: this.resep.kddokter,
        ruangan: this.resep.ruangan,
        depo: this.resep.depo
      }
      this.loadingKirim = true
      this.resep.loading = true
      return new Promise(resolve => {
        api.post('v1/simrs/farmasinew/depo/returpenjualan', form)
          .then(resp => {
            this.loadingKirim = false
            this.resep.loading = false
            console.log('resp', resp)
            this.resep.flag = '4'
            this.setClose()
            notifSuccess(resp)
            resolve(resp)
          })
          .catch(() => {
            this.resep.loading = false
            this.loadingKirim = false
          })
      })
    }
  }
})
