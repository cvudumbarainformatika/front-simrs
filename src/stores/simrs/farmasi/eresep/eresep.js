import { defineStore } from 'pinia'
import { Dialog, date } from 'quasar'
import { api } from 'src/boot/axios'
import { dateDbFormat } from 'src/modules/formatter'
import { notifSuccess } from 'src/modules/utils'
import { useAplikasiStore } from 'src/stores/app/aplikasi'

export const useEResepDepoFarmasiStore = defineStore('e_resep_depo_farmasi', {
  state: () => ({
    printIdOpen: false,
    isOpen: false,
    isAdaCopy: false,
    isHistory: false,
    isInfo: false,
    isAlasan: false,
    isTolak: false,
    loading: false,
    loadingTerima: false,
    loadingSelesai: false,
    loadingSimpan: false,
    loadingCopy: false,
    loadingHistory: false,
    loadingPelayananInfoObat: false,
    loadingTolak: false,
    loadingAlasan: false,
    openHistory: false,
    toAlasan: {},
    noreg: '',
    items: [],
    meta: {},
    params: {
      q: '',
      page: 1,
      per_page: 10,
      kddepo: '',
      tipe: '',
      flag: 'semua',
      to: dateDbFormat(new Date()),
      from: dateDbFormat(new Date())
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
    removedItemId: [],
    adaCopys: {},
    historys: {},
    formInfo: {},
    metodes: [
      { label: 'Lisan', value: '1' },
      { label: 'Telepon', value: '2' },
      { label: 'Tertulis', value: '3' }
    ],
    statuses: [
      { label: 'Pasien', value: '1' },
      { label: 'Keluarga Pasien', value: '2' },
      { label: 'Tenaga Kesehatan', value: '3' }
    ],
    yns: [
      { label: 'Ya', value: '1' },
      { label: 'Tidak', value: '2' }
    ],
    kelamins: [
      { label: 'Laki-Laki', value: 'Laki-Laki' },
      { label: 'Perempuan', value: 'Perempuan' }
    ],
    apotekers: [],
    jenisPertanyaans: [
      { label: 'Penggunaan Terapetik', value: 'penggunaan_terapetik' },
      { label: 'Identifikasi Obat', value: 'identifikasi_obat' },
      { label: 'Interaksi Obat', value: 'interaksi_obat' },
      { label: 'Kontra Indikasi', value: 'kontra_indikasi' },
      { label: 'Cara Pemakaian', value: 'cara_pemakaian' },
      { label: 'Stabilitas Obat', value: 'stabilitas_obat' },
      { label: 'Dosis Obat', value: 'dosis_obat' },
      { label: 'Keracunan / OD', value: 'keracunan_od' },
      { label: 'ESO', value: 'eso' },
      { label: 'Harga Obat', value: 'harga_obat' },
      { label: 'Farmakokinetika / Farmakodinamika', value: 'farmako' },
      { label: 'Ketersediaan Obat', value: 'ketersediaan' },
      { label: 'Kompatibilitas', value: 'kompatibilitas' },
      { label: 'Harga', value: 'harga' },
      { label: 'Obat Alternatif', value: 'obat_alternatif' }
    ]
  }),
  actions: {
    setOpen () { this.isOpen = true },
    setClose () {
      this.isOpen = false
      this.resep = {}
    },
    closeCopy () {
      this.isAdaCopy = false
    },
    closeHistory () {
      this.isHistory = false
    },
    setFormInfo (key, val) {
      this.formInfo[key] = val
    },
    openInfo () {
      this.isInfo = true
    },
    closeInfo () {
      this.isInfo = false
    },
    setInfo (val) {
      // console.log('set info', val)
      const apps = useAplikasiStore()
      // const info = Object.keys(val?.info).length <= 0 || !val?.info
      // console.log('set info', info)
      if (!val?.info) {
        this.setFormInfo('hari', date.formatDate(Date.now(), 'dddd'))
        this.setFormInfo('waktu', date.formatDate(Date.now(), 'HH:mm:ss'))
        this.setFormInfo('tanggal', date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss'))
        this.setFormInfo('tgl', date.formatDate(Date.now(), 'DD MMMM YYYY'))
        this.setFormInfo('metode', '1')
        this.setFormInfo('nama_penanya', '')
        this.setFormInfo('status_penanya', '3')
        this.setFormInfo('umur_pasien', val?.datapasien?.usia)
        this.setFormInfo('kehamilan', '2')
        this.setFormInfo('noreg', val?.noreg)
        this.setFormInfo('norm', val?.norm)
        this.setFormInfo('jenisPertanyaan', [])
      }
      else {
        const keys = Object.keys(val?.info)
        keys.forEach(k => {
          if (k === 'jenis_pertanyaan') {
            const jen = val?.info[k].split('|')
            this.setFormInfo('jenisPertanyaan', jen)
          }
          else if (k === 'tanggal') {
            this.setFormInfo(k, val?.info[k])
            const tang = val?.info[k]
            this.setFormInfo('hari', date.formatDate(tang, 'dddd'))
            this.setFormInfo('waktu', date.formatDate(tang, 'HH:mm:ss'))
            // this.setFormInfo('tanggal', date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss'))
            this.setFormInfo('tgl', date.formatDate(tang, 'DD MMMM YYYY'))
          }
          else {
            this.setFormInfo(k, val?.info[k])
          }
        })
      }

      this.setFormInfo('user_input', apps?.user?.pegawai?.kdpegsimrs)
    },
    setParams (key, val) { this.params[key] = val },
    setFlag (val) {
      // console.log('flag', val)
      this.setParams('flag', val)
      this.setParams('page', 1)
      this.removedItemId = []
      this.getDataTable()
    },
    setTipe (val) {
      this.setParams('tipe', val)
      this.setParams('page', 1)
      this.removedItemId = []
      this.getDataTable()
    },
    setSearch (val) {
      this.setParams('q', val)
      this.setParams('page', 1)
      this.removedItemId = []
      this.getDataTable()
    },
    setPerPage (val) {
      this.setParams('per_page', val)
      this.setParams('page', 1)
      this.removedItemId = []
      this.getDataTable()
    },
    setPage (val) {
      this.setParams('page', val)
      this.removedItemId = []
      this.getDataTable()
    },
    refresh () {
      this.setParams('page', 1)
      this.removedItemId = []
      this.getDataTable()
    },
    setPeriodik (val) {
      this.params.page = 1
      const { to, from } = val
      this.params.to = to
      this.params.from = from
      this.removedItemId = []
      this.getDataTable()
    },
    setSistembayar (val) {
      this.setParams('sistembayar', val)
      this.setParams('listsistembayar', null)
      // console.log('val', val);
      this.getDataTable()
    },
    setListSistembayar (val) {
      const sisBa = val?.map(m => m?.kode)
      // console.log('val', sisBa);
      this.setParams('listsistembayar', sisBa)
      this.setParams('sistembayar', null)
      this.getDataTable()
    },
    customRound (num) {
      // Pisahkan bagian integer dan bagian desimal
      const integerPart = Math.floor(num)
      const decimalPart = num - integerPart
      console.log('deimal', decimalPart)

      if (decimalPart <= 0.5 && decimalPart > 0) {
        // Jika bagian desimal kurang dari atau sama dengan 0.5
        return integerPart + 0.5
      }
      else {
        // Jika bagian desimal lebih dari 0.5
        return Math.ceil(num)
      }
    },
    setResep (val) {
      const res = val
      // console.log('set Resep', val)
      if (res.flag === '3' && val.tiperesep === 'iter') {
        res.rincian = []
        res.rincianracik = []
        this.getResepIter(val).then(resp => {
          // console.log('resep iter', resp?.data)
          const datanya = resp?.data?.head
          res.rincian = datanya?.permintaanresep
          if (res.rincian.length > 0) {
            res.rincian.forEach(key => {
              key.harga = (parseFloat(key?.jumlah) * parseFloat(key?.hargajual)) + parseFloat(key?.r)
              key.diCopy = true
              const stok = key.stok[0]
              const totalStok = isNaN(parseFloat(stok?.total)) ? 0 : parseFloat(stok?.total)
              const permintaan = stok?.permintaanobatrinci?.map(per => parseFloat(per.allpermintaan)).reduce((a, b) => a + b, 0) ?? 0
              const transnonracikan = stok?.transnonracikan?.map(per => parseFloat(per.jumlah)).reduce((a, b) => a + b, 0) ?? 0
              const transracikan = stok?.transracikan?.map(per => parseFloat(per.jumlah)).reduce((a, b) => a + b, 0) ?? 0
              key.alokasi = totalStok - permintaan - transnonracikan - transracikan
              // console.log('alokasi', totalStok, permintaan, transnonracikan, transracikan)
            })
          }
          const racik = datanya?.permintaanracikan
          if (racik.length > 0) {
            racik.forEach(key => {
              key.harga = (parseFloat(key?.jumlah) * parseFloat(key?.hargajual)) + parseFloat(key?.r)
              key.jumlahresep = key.jumlah
              key.jumlahobat = Math.ceil(key.jumlah)
              key.groupsistembayar = val?.sistembayar?.groups

              const stok = key.stok[0]
              const totalStok = isNaN(parseFloat(stok?.total)) ? 0 : parseFloat(stok?.total)
              const permintaan = stok?.permintaanobatrinci?.map(per => parseFloat(per.allpermintaan)).reduce((a, b) => a + b, 0) ?? 0
              const transnonracikan = stok?.transnonracikan?.map(per => parseFloat(per.jumlah)).reduce((a, b) => a + b, 0) ?? 0
              const transracikan = stok?.transracikan?.map(per => parseFloat(per.jumlah)).reduce((a, b) => a + b, 0) ?? 0
              key.alokasi = totalStok - permintaan - transnonracikan - transracikan
              // console.log('alokasi', totalStok, permintaan, transnonracikan, transracikan)
              let kosong = false
              if (parseFloat(key.jumlah) > key.alokasi) {
                kosong = true
              }
              const namaracikan = key?.namaracikan
              const adaList = res.rincianracik.filter(list => list.namaracikan === namaracikan)
              if (adaList.length) {
                adaList[0].rincian.push(key)
                const harga = adaList[0].rincian.map(a => a?.harga).reduce((a, b) => a + b, 0) ?? 0
                adaList[0].harga = harga
                if (kosong) {
                  adaList[0].kosong = kosong
                }
              }
              else {
                const temp = {
                  diCopy: true,
                  namaracikan: key?.namaracikan,
                  harga: key?.harga,
                  aturan: key?.aturan,
                  keterangan: key?.keterangan,
                  tiperacikan: key?.tiperacikan,
                  konsumsi: key?.konsumsi,
                  satuan_racik: key?.satuan_racik,
                  jumlahdibutuhkan: key?.jumlahdibutuhkan,
                  rincian: [key]
                }
                if (kosong) {
                  temp.kosong = kosong
                }
                res.rincianracik.push(temp)
              }
            })
          }
          // console.log('rinc', res.rincian)
          // console.log('rac', res.rincianracik)
        })
      }
      res.listRacikan = []
      let nilaiR = 0
      if (res?.permintaanracikan?.length) {
        res?.permintaanracikan.forEach(key => {
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
          key.groupsistembayar = val?.sistembayar?.groups
          const namaracikan = key?.namaracikan
          const adaList = res.listRacikan.filter(list => list.namaracikan === namaracikan)
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
            res.listRacikan.push(temp)
          }
        })
      }
      if (res.listRacikan.length) {
        res.listRacikan.forEach(a => {
          a.harga += nilaiR
        })
      }
      if (res?.permintaanresep?.length) {
        res?.permintaanresep.forEach(key => {
          key.groupsistembayar = val?.sistembayar?.groups
          key.harga = (parseFloat(key?.jumlah) * parseFloat(key?.hargajual)) + parseFloat(key?.r)
          key.jumlahAwal = parseFloat(key?.jumlah)
          key.etiket = false
        })
      }
      this.resep = res
    },
    metanirinci () {
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
      const adaKronisR = item?.permintaanracikan.filter(f => f.kronis === '1' && parseInt(f.konsumsi) >= 28)
      if (adaKronisR.length) item.adaKronis = 'kronis'
      item.doneresep = item?.permintaanresep.filter(x => x.done === true).length > 0
      item.doneracik = item?.permintaanracikan.filter(x => x.done === true).length > 0
      // item.doneresep = item?.permintaanresep.filter(x => x.done === true).length === item?.permintaanresep?.length
      // item.doneracik = item?.permintaanracikan.filter(x => x.done === true).length === item?.permintaanracikan?.length
      item.semuaresep = item?.permintaanresep.length ? item?.permintaanresep.length && item?.permintaanresep.filter(x => x.done === true).length === item?.permintaanresep?.length : true
      item.semuaracik = item?.permintaanracikan.length ? item?.permintaanracikan.length && item?.permintaanracikan.filter(x => x.done === true).length === item?.permintaanracikan?.length : true
      // console.log('item', item)
    },
    getResepIter (val) {
      val.loadingGetIter = true
      return new Promise(resolve => {
        api.post('v1/simrs/farmasinew/depo/ambil-iter', val)
          .then(resp => {
            val.loadingGetIter = false
            resolve(resp)
          })
          .catch(() => {
            val.loadingGetIter = false
          })
      })
    },
    getHistory (val) {
      val.loadingHistory = true
      return new Promise(resolve => {
        api.post('v1/simrs/farmasinew/depo/ambil-history', val)
          .then(resp => {
            val.loadingHistory = false
            this.isHistory = true
            // console.log('his', resp?.data)
            this.historys = resp?.data?.data
            if (this.historys.length) {
              this.historys.forEach(hi => {
                hi.listRacikan = []
                hi.show = false
                if (hi?.asalpermintaanracikan?.length) {
                  hi?.asalpermintaanracikan.forEach(key => {
                    const obatKeluar = hi?.rincianracik.find(ra => ra.namaracikan === key.namaracikan && ra.kdobat === key.kdobat)
                    key.jumlahKeluar = obatKeluar?.jumlah ?? 'Tidak Ditemukan'
                    const namaracikan = key?.namaracikan
                    const adaList = hi.listRacikan.find(list => list.namaracikan === namaracikan)
                    if (adaList) {
                      adaList.rincian.push(key)
                      const harga = adaList.rincian.map(a => a?.harga).reduce((a, b) => a + b, 0) ?? 0
                      adaList.harga = harga
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
                        rincian: [key]
                      }
                      hi.listRacikan.push(temp)
                    }
                  })
                }
              })
            }

            resolve(resp)
          })
          .catch(() => {
            val.loadingHistory = false
          })
      })
    },
    async sendPanggil (pasien, channel) {
      console.log('pasien', pasien)
      this.loadingCall = true
      const params = {
        noreg: pasien?.noreg,
        noantrian: pasien?.nomor,
        // kdpoli: pasien?.kodepoli,
        kdpoli: 'APT001',
        tglkunjungan: pasien?.tgl_kirim,
        channel
      }
      this.noreg = pasien?.noreg
      await api.post('v1/fordisplay/send_panggilan', params)
        .then((resp) => {
          // console.log('call', resp)
          this.loadingCall = false
          if (resp.status === 200) {
            // this.meta = resp.data
            // this.items = resp.data.data
            // coba
          }
        }).catch((err) => {
          console.log('call', err)
          this.loadingCall = false
        })
    },
    async getDataTable (val) {
      // this.items = []
      if (!val) this.loading = true
      const param = { params: this.params }
      // console.log('loading', val, this.loading)
      await api.get('v1/simrs/farmasinew/depo/listresepbydokter', param)
        .then(resp => {
          this.loading = false
          const data = resp?.data?.data ?? resp?.data
          console.log('get data table', data)
          if (data?.length) {
            data.forEach(da => {
              const adaKwi = da.kwitansi?.find(kw => kw?.nota?.includes(da?.noresep))
              if (adaKwi) da.lunas = true
              if (da?.diagnosas?.length) {
                da.diagnosaigd = null
                da.diagnosa = null
                const diagIGD = da?.diagnosas.filter(fa => fa.rs13 === 'POL014')
                const diagAja = da?.diagnosas.filter(fa => fa.rs13 !== 'POL014')
                diagIGD.forEach((diag, index) => {
                  const diagA = diag?.masterdiagnosa?.rs1 + ' - ' + diag?.masterdiagnosa?.rs4
                  if (index === 0) da.diagnosaigd = diagA
                  else da.diagnosaigd += ', ' + diagA
                })
                diagAja.forEach((diag, index) => {
                  const diagA = diag?.masterdiagnosa?.rs1 + ' - ' + diag?.masterdiagnosa?.rs4
                  if (index === 0) da.diagnosa = diagA
                  else da.diagnosa += ', ' + diagA
                })
              }
            })
          }
          this.items = data
          // if (this.removedItemId.length) {
          //   this.items = data.filter(x => !this.removedItemId.includes(x.id))
          // }
          // else {
          //   this.items = data
          // }
          if (!data.length) this.items = []
          this.meta = resp?.data?.data ? resp?.data : {}
          this.metanirinci()
        })
        .catch(() => {
          this.loading = false
        })
    },
    async getSatuResep (val) {
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
            const data = resp.data
            if (data.length) {
              data.forEach(item => {
                item.permintaanresep.forEach(resep => {
                  resep.kronis = resep?.mobat?.status_kronis
                })
                const adaKronis = item?.permintaanresep.filter(f => f.kronis === '1')
                if (adaKronis.length) item.adaKronis = 'kronis'
                item.permintaanracikan.forEach(resep => {
                  resep.kronis = resep?.mobat?.status_kronis
                })
                const adaKronisR = item?.permintaanracikan.filter(f => f.kronis === '1')
                if (adaKronisR.length) item.adaKronis = 'kronis'
              })
              if (this.removedItemId.length) {
                this.items = data.filter(x => !this.removedItemId.includes(x.id))
              }
              else {
                this.items = data
              }
            }
            const index = this.items.findIndex(it => it.noresep === resp.data.noresep)
            if (index < 0) this.items.push(resp.data)
          }
        })
    },
    async terimaResep (val) {
      // console.log('terima resep', val)
      this.loadingTerima = true
      val.loading = true
      await api.post('v1/simrs/farmasinew/depo/terima-resep', val)
        .then(resp => {
          // console.log('resp', resp)
          this.loadingTerima = false
          delete val.loading
          this.afterTerima(resp?.data?.data)
          notifSuccess(resp)
        })
        .catch((err) => {
          console.log('err', err?.response?.data?.message, 'val', val)
          if (err?.response?.data?.message?.includes('https://apijkn.bpjs-kesehatan.go.id/antreanrs/antrean/updatewaktu') || err?.response?.data?.message?.includes('simrs/events?auth_key=simrs_key_harry141312&auth_')) {
            // notifErrVue('Error Update Waktu BPJS')
            this.afterTerima(val)
          }
          this.loadingTerima = false
          delete val.loading
        })
      // this.loadingTerima = true
    },
    afterTerima (val) {
      const index = this.items.findIndex(x => x.id === val.id)
      if (this.params.flag.includes('2')) {
        if (index >= 0) this.items[index].flag = '2'
        this.items.sort((firstItem, secondItem) => parseInt(firstItem.flag) - parseInt(secondItem.flag) || new Date(firstItem.tgl_permintaan) - new Date(secondItem.tgl_permintaan))
      }
      else {
        if (index >= 0) this.items.splice(index, 1)
        this.removedItemId.push(val.id)
      }
      this.getDataTable(true)
    },
    async resepSelesai (val) {
      // console.log('resep selesai', val)
      this.loadingSelesai = true
      val.loading = true
      await api.post('v1/simrs/farmasinew/depo/resep-selesai', val)
        .then(resp => {
          // console.log('resp', resp)
          this.loadingSelesai = false
          delete val.loading
          this.afterSelesai(resp?.data?.data)
          this.setClose()
          notifSuccess(resp)
        })
        .catch((err) => {
          console.log('err', err, 'val', val)
          if (err?.response?.data?.message?.includes('https://apijkn.bpjs-kesehatan.go.id') || err?.response?.data?.message?.includes('simrs/events?auth_key=simrs_key_harry141312&auth_')) {
            // notifErrVue('Error Update Waktu BPJS')
            this.afterSelesai(val)
          }
          this.loadingSelesai = false
          delete val.loading
        })
      // this.loadingTerima = true
    },
    afterSelesai (val) {
      const index = this.items.findIndex(x => x.id === val.id)
      if (this.params.flag.includes('3')) {
        if (index >= 0) this.items[index].flag = '3'
        this.items.sort((firstItem, secondItem) => parseInt(firstItem.flag) - parseInt(secondItem.flag) || new Date(firstItem.tgl_permintaan) - new Date(secondItem.tgl_permintaan))
      }
      else {
        if (index >= 0) this.items.splice(index, 1)
        this.removedItemId.push(val.id)
      }
      this.getDataTable(true)
    },
    simpanObat (val) {
      val.nilai_r = val?.r
      val.kodedepo = this.params.kddepo
      val.loading = true
      this.simpan(val).then((resp) => {
        console.log('obat', resp)
        const item = this.items.find(x => x.noresep === resp?.data?.rinci?.noresep)
        if (item) {
          console.log('item', item)
          item?.rincian.push(resp?.data?.rinci)
          this.metaniItem(item)
        }
        delete val.loading
      }).catch(() => { delete val.loading })
    },
    simpanRacikan (val) {
      val.kodedepo = this.params.kddepo
      const temp = new FormData()
      const key = Object.keys(val)
      key.forEach(a => {
        if (a === 'jumlah') temp.append(a, val?.jumlahobat)
        else temp.append(a, val[a])
      })
      temp.append('nilai_r', val?.r)
      temp.append('jenisresep', 'Racikan')
      temp.append('jenisresep', 'Racikan')

      val.loading = true
      this.simpan(temp).then((resp) => {
        console.log('Racikan', resp)
        const item = this.items.find(x => x.noresep === resp?.data?.rinci?.noresep)
        if (item) {
          item?.rincianracik.push(resp?.data?.rinci)
          this.metaniItem(item)
        }
        delete val.loading
      }).catch(() => { delete val.loading })
    },
    simpan (val) {
      this.loadingSimpan = true
      return new Promise((resolve, reject) => {
        api.post('v1/simrs/farmasinew/depo/eresepobatkeluar', val)
          .then(resp => {
            this.loadingSimpan = false
            notifSuccess(resp)
            resolve(resp)
          })
          .catch(err => {
            this.loadingSimpan = false
            reject(err)
          })
      })
    },
    tolakResep (val) {
      this.loadingTolak = true
      val.loading = true
      const data = {
        noresep: val.noresep,
        id: val.id,
        alasan: val.alasan
      }
      return new Promise((resolve, reject) => {
        api.post('v1/simrs/farmasinew/depo/tolak-resep', data)
          .then(resp => {
            this.loadingTolak = false
            val.loading = false
            val.flag = '5'
            this.isAlasan = false
            this.isTolak = false
            notifSuccess(resp)
            resolve(resp)
          })
          .catch(err => {
            this.loadingTolak = false
            val.loading = false
            reject(err)
          })
      })
    },
    isiAlasan (val) {
      this.loadingAlasan = true
      val.loading = true
      const data = {
        noresep: val.noresep,
        id: val.id,
        alasan: val.alasan
      }
      return new Promise((resolve, reject) => {
        api.post('v1/simrs/farmasinew/depo/isi-alasan', data)
          .then(resp => {
            this.loadingAlasan = false
            val.loading = false
            val.alasan = resp?.data?.data?.alasan

            this.isAlasan = false
            resolve(resp)
          })
          .catch(err => {
            this.loadingAlasan = false
            val.loading = false
            reject(err)
          })
      })
    },
    dialog (val) {
      Dialog.create({
        title: 'Konfirmasi',
        message: 'Obat Masih ada, Apakah Akan dilanjutkan?',
        ok: {
          push: true,
          label: 'Lanjut',
          color: 'negative',
          'no-caps': true
        },
        cancel: {
          push: true,
          label: 'Batal',
          color: 'dark',
          'no-caps': true
        }
      })
        .onOk(() => {
          val.lanjut = '1'
          // console.log(val)
          this.copyResep(val)
        })
    },
    copyResep (val) {
      this.loadingCopy = true
      return new Promise((resolve, reject) => {
        api.post('v1/simrs/farmasinew/depo/copy-resep', val)
          .then(resp => {
            this.loadingCopy = false
            // console.log('copy', resp?.data)
            if (resp?.status === 202) {
              this.dialog(val)
            }
            notifSuccess(resp)
            resolve(resp)
          })
          .catch(err => {
            this.loadingCopy = false
            this.isAdaCopy = true
            // console.log('copy err', err?.response)
            this.adaCopys = err?.response?.data?.data
            this.adaCopys.listRacikan = []
            if (this.adaCopys?.rincianracik?.length) {
              this.adaCopys?.rincianracik.forEach(key => {
                const namaracikan = key?.namaracikan
                const adaList = this.adaCopys.listRacikan.find(list => list.namaracikan === namaracikan)
                if (adaList) {
                  adaList.rincian.push(key)
                  const harga = adaList.rincian.map(a => a?.harga).reduce((a, b) => a + b, 0) ?? 0
                  adaList.harga = harga
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
                    rincian: [key]
                  }
                  this.adaCopys.listRacikan.push(temp)
                }
              })
            }
            reject(err)
          })
      })
    },
    async getApoteker () {
      if (this.apotekers.length) return
      await api.get('v1/simrs/farmasinew/depo/ambil-pegawai-farmasi')
        .then(resp => {
          this.apotekers = resp?.data
        })
    },
    simpanPelayananInfoObat () {
      this.loadingPelayananInfoObat = true
      return new Promise(resolve => {
        api.post('v1/simrs/farmasinew/depo/simpan-pelayanan-informasi-obat', this.formInfo)
          .then(resp => {
            this.loadingPelayananInfoObat = false
            notifSuccess(resp)
            resolve(resp)
          })
          .catch(() => {
            this.loadingPelayananInfoObat = false
          })
      })
    },
    simpanTglPelayananObat (val) {
      val.loading = true
      const data = {
        id: val?.id,
        tgl_pelayanan_obat: val?.tgl_pelayanan_obat
      }
      return new Promise(resolve => {
        api.post('v1/simrs/farmasinew/depo/simpan-tgl-pelayanan', data)
          .then(resp => {
            val.loading = false
            notifSuccess(resp)
            resolve(resp)
          })
          .catch(() => {
            val.tgl_pelayanan_obat = null
            val.loading = false
          })
      })
    }

  }
})
