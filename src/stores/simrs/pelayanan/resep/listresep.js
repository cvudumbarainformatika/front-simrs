import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
// import { dateDbFormat } from 'src/modules/formatter'
import { notifSuccess } from 'src/modules/utils'

export const useListResepDokterToDepoStore = defineStore('list_resep_dokter_to_depo', {
  state: () => ({
    isOpen: false,
    loading: false,
    loadingSelesai: false,
    loadingHead: false,
    loadingRinci: false,
    meta: {},
    items: [],
    params: {
      q: '',
      page: 1,
      per_page: 10,
      dokter: '',
      flag: 'semua'
    },
    dataToPrint: {}
  }),
  actions: {
    setParam (key, val) {
      this.params[key] = val
    },
    setSearch (val) {
      this.setParam('q', val)
      this.setParam('page', 1)
      this.getData()
    },
    setSearchDokter (val) {
      this.setParam('dokter', val)
      this.setParam('page', 1)
      this.getData()
    },
    setPerPage (val) {
      this.setParam('per_page', val)
      this.setParam('page', 1)
      this.getData()
    },
    setPage (val) {
      this.setParam('page', val)
      this.getData()
    },
    refresh () {
      this.setParam('page', 1)
      this.getData()
    },
    setPeriodik (val) {
      this.params.page = 1
      const { to, from } = val
      this.params.to = to
      this.params.from = from
      this.getData()
    },
    setFlag (val) {
      // console.log('flag', val)
      this.setParam('flag', val)
      this.setParam('page', 1)
      this.getData()
    },
    getInitialData () {
      this.getData()
    },
    metanidata () {
      if (this.items.length) {
        this.items.forEach(item => {
          this.metaniItem(item)
        })
      }
    },
    metaniItem (item) {
      if (item.permintaanresep.length) {
        item.permintaanresep.forEach(resep => {
          resep.kronis = resep?.mobat?.status_kronis
          const rinci = item?.rincian.filter(x => x.kdobat === resep.kdobat)
          // console.log('rinc', rinci, resep)
          if (rinci.length) {
            const obatkeluar = rinci.map(m => parseFloat(m.jumlah)).reduce((a, b) => a + b, 0)
            resep.obatkeluar = obatkeluar
            resep.hargajual = rinci[0].harga_jual
            resep.harga = (parseFloat(obatkeluar) * parseFloat(rinci[0]?.harga_jual)) + parseFloat(rinci[0]?.nilai_r)

            resep.done = true
          }
          else {
            resep.done = false
          }
          // console.log('rinci ', rinci)
        })
        const adaKronis = item?.permintaanresep.filter(f => f.kronis === '1' && parseInt(f.konsumsi) >= 28)
        if (adaKronis.length) item.adaKronis = 'kronis'
      }
      if (item.permintaanracikan.length) {
        item.permintaanracikan.forEach(resep => {
          resep.kronis = resep?.mobat?.status_kronis
          const rinci = item?.rincianracik.filter(x => x.kdobat === resep.kdobat && x.namaracikan === resep.namaracikan)
          // console.log('rinc', rinci, resep)
          if (rinci.length) {
            const obatkeluar = rinci.map(m => parseFloat(m.jumlah)).reduce((a, b) => a + b, 0)
            resep.obatkeluar = obatkeluar
            resep.hargajual = rinci[0].harga_jual
            resep.harga = (parseFloat(obatkeluar) * parseFloat(rinci[0]?.harga_jual)) + parseFloat(rinci[0]?.nilai_r)
            resep.done = true
          }
          else {
            resep.done = false
          }
          // console.log('rinci rac', rinci)
        })
      }
      item.listRacikan = []
      let nilaiR = 0
      if (item?.permintaanracikan?.length) {
        item?.permintaanracikan.forEach(key => {
          nilaiR = parseFloat(key?.r)
          key.jumlahresep = key.jumlah
          if (parseInt(key?.mobat?.kelompok_psikotropika) === 1) {
            // console.log('mobat', key?.mobat)
            key.jumlahobat = this.customRound(key.jumlah)
          }
          else key.jumlahobat = Math.ceil(key.jumlah)
          key.harga = (parseFloat(key?.jumlahobat) * parseFloat(key?.harga_jual))// + parseFloat(key?.r)
          key.jumlahobatAwal = parseFloat(key?.jumlahobat)
          key.jumlahresepAwal = parseFloat(key?.jumlahresep)
          key.groupsistembayar = item?.sistembayar?.groups
          const namaracikan = key?.namaracikan
          const adaList = item.listRacikan.filter(list => list.namaracikan === namaracikan)
          if (adaList.length) {
            adaList[0].rincian.push(key)
            const harga = adaList[0].rincian.map(a => a?.harga).reduce((a, b) => a + b, 0) ?? 0
            adaList[0].harga = harga
          }
          else {
            const temp = {
              namaracikan: key?.namaracikan,
              harga: key?.harga,
              aturan: key?.aturan,
              keterangan: key?.keterangan,
              tiperacikan: key?.tiperacikan,
              konsumsi: key?.konsumsi,
              satuan_racik: key?.satuan_racik,
              jumlahdibutuhkan: key?.jumlahdibutuhkan,

              jumlahdibutuhkanAwal: key?.jumlahdibutuhkan,
              etiket: false,
              nilaiR,
              rincian: [key]
            }
            item.listRacikan.push(temp)
          }
        })
      }
      if (item.listRacikan.length) {
        item.listRacikan.forEach(a => {
          a.harga += nilaiR
        })
      }
      if (item?.permintaanresep?.length) {
        item?.permintaanresep.forEach(key => {
          key.groupsistembayar = item?.sistembayar?.groups
          key.harga = (parseFloat(key?.jumlah) * parseFloat(key?.hargajual)) + parseFloat(key?.r)
          key.jumlahAwal = parseFloat(key?.jumlah)
          key.etiket = false
        })
      }
      // const adaKronisR = item?.permintaanracikan.filter(f => f.kronis === '1' && parseInt(f.konsumsi) >= 28)
      // if (adaKronisR.length) item.adaKronis = 'kronis'
      // item.doneresep = item?.permintaanresep.filter(x => x.done === true).length > 0
      // item.doneracik = item?.permintaanracikan.filter(x => x.done === true).length > 0
      // // item.doneresep = item?.permintaanresep.filter(x => x.done === true).length === item?.permintaanresep?.length
      // // item.doneracik = item?.permintaanracikan.filter(x => x.done === true).length === item?.permintaanracikan?.length
      // item.semuaresep = item?.permintaanresep.length ? item?.permintaanresep.length && item?.permintaanresep.filter(x => x.done === true).length === item?.permintaanresep?.length : true
      // item.semuaracik = item?.permintaanracikan.length ? item?.permintaanracikan.length && item?.permintaanracikan.filter(x => x.done === true).length === item?.permintaanracikan?.length : true
      // console.log('item', item)
    },
    async getData () {
      const param = { params: this.params }
      this.loading = true
      await api.get('v1/simrs/farmasinew/depo/ambil-resep-dokter', param)
        .then(resp => {
          this.loading = false
          console.log('resep dokter', resp.data)
          this.items = resp?.data?.data ?? resp?.data
          this.meta = resp?.data?.data ? resp?.data : {}
          this.metanidata()
        })
        .catch(() => { this.loading = false })
    },
    selesaiPemakaian (val) {
      const formData = new FormData()
      formData.append('nopemakaian', val?.nopemakaian)
      val.loading = true
      this.loadingSelesai = true
      return new Promise(resolve => {
        api.post('v1/simrs/penunjang/farmasinew/ruangan/selesai', formData)
          .then(resp => {
            this.loadingSelesai = false
            val.loading = false
            console.log('selesai pemakaian ', resp?.data)
            notifSuccess(resp)
            this.getData()
            resolve(resp)
          })
          .catch(() => {
            this.loadingSelesai = false
            val.loading = false
          })
      })
    },
    hapusHead (item) {
      this.loadingHead = true
      item.loading = true
      return new Promise(resolve => {
        api.post('v1/simrs/penunjang/farmasinew/ruangan/hapus-header', item)
          .then(resp => {
            this.loadingHead = false
            item.loading = false
            console.log('hapus head', resp?.data)
            this.getData()
            notifSuccess(resp)
            resolve(resp)
          })
          .catch(() => {
            this.loadingHead = false
            item.loading = false
          })
      })
    },
    hapusRinci (item) {
      console.log('hapus rinci', item)
      this.loadingRinci = true
      item.loading = true
      return new Promise(resolve => {
        api.post('v1/simrs/penunjang/farmasinew/ruangan/hapus-rinci', item)
          .then(resp => {
            this.loadingRinci = false
            item.loading = false
            console.log('hapus rinci', resp?.data)
            const head = this.items.find(it => it.nopemakaian === item.nopemakaian)
            if (head && resp?.data?.adaRinci?.length > 0) {
              const index = head?.rinci.findIndex(a => a.kd_obat === item.kd_obat)
              console.log('index', index)
              if (index >= 0) {
                head.rinci.splice(index, 1)
              }
            }
            if (resp?.data?.adaRinci?.length <= 0) {
              this.getData()
            }
            notifSuccess(resp)
            resolve(resp)
          })
          .catch(() => {
            this.loadingRinci = false
            item.loading = false
          })
      })
    }
  }
})
