import { defineStore } from 'pinia'
import { notifSuccess } from 'src/modules/utils'
import { api } from 'boot/axios'
import { useMasterObatTable } from './table'

export const useMasterObatForm = defineStore('master_Obat_form', {
  state: () => ({
    isOpen: false,
    form: {
      kd_obat: 'sdadasdasdasd',
      gudang: '',
      jenis_perbekalan: null,
      kelasterapis: []
    },
    namaObat: {
      nama: null,
      bentukSediaan: null,
      kekuatanDosis: null,
      volumeSediaan: null,
      merk: null
    },
    temp: { kelas_terapi: '' },
    gedungs: [],
    loading: false,
    loadingJenisPerbekalan: false,
    loadingJenisProduk: false,
    loadingKodeBelanja: false,
    loadingKandungan: false,
    loadingBentukSediaan: false,
    loadingKekuatanDosis: false,
    loadingVolumeSediaan: false,
    loadingKelasTerapi: false,
    loadingKelompokPenyimpanan: false,
    loadingKelompokRKO: false,
    loadingSatuanB: false,
    loadingSatuanK: false,
    loadingMerk: false,

    optionNapzas: [
      { label: 'YA', value: '1' },
      { label: 'TIDAK', value: '' }
    ],
    optionStatusGeneriks: [
      { label: 'YA', value: '1' },
      { label: 'TIDAK', value: '' }
    ],
    optionStatusForkits: [
      { label: 'YA', value: '1' },
      { label: 'TIDAK', value: '' }
    ],
    optionStatusFornases: [
      { label: 'YA', value: '1' },
      { label: 'TIDAK', value: '' }
    ],
    optionStatusKonsinyasi: [
      { label: 'Konsinyasi', value: '1' },
      { label: 'Non-Konsinyasi', value: '' }
    ],
    optionSistemBayars: [
      { label: 'SEMUA', value: 'SEMUA' },
      { label: 'UMUM', value: 'UMUM' },
      { label: 'BPJS', value: 'BPJS' }
    ],
    optionGudangs: [
      { label: 'Semua Gudang', value: '' },
      { label: 'Gudang Farmasi ( Floor Stok )', value: 'Gd-03010100' },
      { label: 'Gudang Farmasi ( Kamar Obat )', value: 'Gd-05010100' }
    ],
    optionKronis: [
      { label: 'YA', value: '1' },
      { label: 'TIDAK', value: '' }
    ],
    optionPrb: [
      { label: 'YA', value: '1' },
      { label: 'TIDAK', value: '' }
    ],

    kelasTerapis: [],
    kelompokPenyimpanans: [],
    kelompokRKOs: [],
    satuanBs: [],
    satuanKs: [],
    merks: [],
    kandungans: [],
    jenisPerbekalans: [],
    jenisProduks: [],
    kodeBelanjas: [],
    bentukSediaans: [],
    kekuatanDosiss: [],
    volumeSediaans: [],
    countSatuan: 0,
    paramsKandungan: { q: '' }
  }),
  actions: {
    // local related actions
    resetFORM () {
      console.log('reset form')
      this.form = { kelasterapis: [] }
      this.namaObat = {
        nama: null,
        bentukSediaan: null,
        kekuatanDosis: null,
        volumeSediaan: null,
        merk: null
      }
      this.setFormNamaObat()
      // const columns = [
      //   // 'kekuatan_dosis',
      //   // 'jenis_perbekalan'
      // ]
      // for (let i = 0; i < columns.length; i++) {
      //   this.setForm(columns[i], null)
      // }
      // this.setForm('kd_obat', 'dasdasdasds1')
    },
    setForm (nama, val) {
      this.form[nama] = val
    },
    pushKelasTerapi(val) {
      this.form.kelasterapis.push({ kelasterapi: val })
    },
    removeKelasTerapi(i) {
      const ter = this.form.kelasterapis[i]
      if (this.edited && Object.keys(ter).length) {
        // console.log('ter ', ter)
        this.hapusMaping(ter.id)
      }
      this.form.kelasterapis.splice(i, 1)
    },
    deleteForm (nama) {
      this.form[nama] = null
    },
    setNamaObat(key, val) {
      this.namaObat[key] = val
    },
    deleteNamaObat(key) {
      this.namaObat[key] = null
    },
    setFormNamaObat() {
      const jenisPerbekalan = !!(this.form.jenis_perbekalan === 'Reagen' || (this.form.jenis_perbekalan ? this.form.jenis_perbekalan.includes('Alkes') : false))
      const nama = this.namaObat.nama ? this.namaObat.nama : ''
      const merk = this.namaObat.merk && jenisPerbekalan ? ' ' + this.namaObat.merk : ''
      const bentukSediaan = this.namaObat.bentukSediaan ? ' ' + this.namaObat.bentukSediaan : ''
      const volumeSediaan = this.namaObat.volumeSediaan ? ' ' + this.namaObat.volumeSediaan : ''
      const kekuatanDosis = this.namaObat.kekuatanDosis ? ' ' + this.namaObat.kekuatanDosis : ''
      const namaObat = nama + kekuatanDosis + volumeSediaan + bentukSediaan + merk
      this.setForm('nama_obat', namaObat)
    },
    setOpen () {
      this.isOpen = !this.isOpen
    },
    newData () {
      this.resetFORM()
      this.edited = false
      this.isOpen = !this.isOpen
    },
    editData (val) {
      this.edited = true
      console.log('edit ', val)
      if (val.mkelasterapi.length) {
        this.form.kelasterapis = []
        console.log('kelas terapi ', val.mkelasterapi)
        val.mkelasterapi.forEach(ter => {
          ter.kelasterapi = ter.kelas_terapi
          this.form.kelasterapis.push(ter)
        })
      } else {
        this.form.kelasterapis = []
      }
      // nama: null,
      //   bentukSediaan: bentuk_sediaan,
      //   kekuatanDosis: kekuatan_dosis,
      //   volumeSediaan: volumesediaan,
      //   merk: merk
      const keys = Object.keys(val)
      keys.forEach((key, index) => {
        this.setForm(key, val[key])
        if (key === 'merk') this.setNamaObat(key, val[key])
        if (key === 'bentuk_sediaan') this.setNamaObat('bentukSediaan', val[key])
        if (key === 'volumesediaan') this.setNamaObat('volumeSediaan', val[key])
        if (key === 'kekuatan_dosis') this.setNamaObat('kekuatanDosis', val[key])
      })
      const namaObat = val.nama_obat.split(' ')
      const numIn = []
      for (let index = 0; index < namaObat.length; index++) {
        const element = namaObat[index]
        if (!isNaN(parseInt(element))) numIn.push(index)
        // console.log('element', element, ' p ', parseInt(element), ' t ', typeof (parseInt(element)))
      }
      // console.log('numIn ', numIn[0])
      let nama = ''
      for (let index = 0; index < numIn[0]; index++) {
        if (index === 0) nama = namaObat[index]
        else nama += ' ' + namaObat[index]
      }
      this.setForm('nama', nama)
      this.setNamaObat('nama', nama)
      this.isOpen = !this.isOpen
    },
    getInitialData() {
      this.getJenisProduk('')
      this.getJenisPerbekalan('')
      this.getKodeBelanja('')
      this.getKandungan('')
      this.getBetukSediaan('')
      this.getKekuatanDosis('')
      this.getVolumeSediaan('')
      this.getSatuanBes('')
      this.getSatuanKec('')
      this.getMerk('')
      this.getKelompokPenyimpanan('')
      this.getKelompokRKO('')
      this.getKelasTerapi('')
      this.getCountSatuan()
    },
    quickSet(key, val, array, pushed) {
      array.push(pushed)
      this.setForm(key, val)
      this.setNamaObat(key, val)
    },
    // api related actions
    // ambil Jenis produk
    async getJenisProduk(val) {
      this.loadingJenisProduk = true
      const param = { params: { q: val } }
      await api.get('v1/simrs/farmasi/master/listjenisproduk', param)
        .then(resp => {
          this.loadingJenisProduk = false
          // console.log('rko', resp.data)
          this.jenisProduks = resp.data
        })
        .catch(() => {
          this.loadingJenisProduk = false
        })
    },
    // ambil kelas terapi
    async getKelasTerapi(val) {
      this.loadingKelasTerapi = true
      const param = { params: { q: val } }
      await api.get('v1/simrs/farmasi/master/listkelasterapi', param)
        .then(resp => {
          this.loadingKelasTerapi = false
          // console.log('rko', resp.data)
          this.kelasTerapis = resp.data
        })
        .catch(() => {
          this.loadingKelasTerapi = false
        })
    },
    // ambil kelompok Rko
    async getKelompokRKO(val) {
      this.loadingKelompokRKO = true
      const param = { params: { q: val } }
      await api.get('v1/simrs/farmasi/master/listrko', param)
        .then(resp => {
          this.loadingKelompokRKO = false
          // console.log('rko', resp.data)
          this.kelompokRKOs = resp.data
        })
        .catch(() => {
          this.loadingKelompokRKO = false
        })
    },
    // ambil kelompok penyimpanan
    async getKelompokPenyimpanan(val) {
      this.loadingKelompokPenyimpanan = true
      const param = { params: { q: val } }
      await api.get('v1/simrs/farmasi/master/listkelompokpenyimpanan', param)
        .then(resp => {
          this.loadingKelompokPenyimpanan = false
          this.kelompokPenyimpanans = resp.data
        })
        .catch(() => {
          this.loadingKelompokPenyimpanan = false
        })
    },
    // ambil Merk
    async getMerk(val) {
      this.loadingMerk = true
      const param = { params: { q: val } }
      await api.get('v1/simrs/farmasi/master/listmerk', param)
        .then(resp => {
          this.loadingMerk = false
          this.merks = resp.data
        })
        .catch(() => {
          this.loadingMerk = false
        })
    },
    // ambil satuan Kecil
    async getSatuanKec(val) {
      this.loadingSatuanK = true
      const param = {
        params: {
          q: val,
          per_page: 20
        }
      }
      await api.get('v1/satuan/index', param)
        .then(resp => {
          this.loadingSatuanK = false
          this.satuanKs = resp.data.data
        })
        .catch(() => {
          this.loadingSatuanK = false
        })
    },
    // ambil satuan besar
    async getSatuanBes(val) {
      this.loadingSatuanB = true
      const param = {
        params: {
          q: val,
          per_page: 20
        }
      }
      await api.get('v1/satuan/index', param)
        .then(resp => {
          this.loadingSatuanB = false
          this.satuanBs = resp.data.data
        })
        .catch(() => {
          this.loadingSatuanB = false
        })
    },
    // ambil jumlah satuan
    async getCountSatuan() {
      await api.get('v1/satuan/count')
        .then(resp => {
          this.countSatuan = resp.data + 1
          console.log('count satuan', this.countSatuan)
        })
    },
    // ambil list jenis perbekalan
    async getJenisPerbekalan(val) {
      this.loadingJenisPerbekalan = true
      const param = { params: { q: val } }
      await api.get('v1/simrs/farmasi/master/listmjenisperbekalan', param)
        .then(resp => {
          this.loadingJenisPerbekalan = false
          this.jenisPerbekalans = resp.data
        })
        .catch(() => {
          this.loadingJenisPerbekalan = false
        })
    },
    // ambil list kode Belanja
    async getKodeBelanja(val) {
      this.loadingKodeBelanja = true
      const param = { params: { q: val } }
      await api.get('v1/simrs/farmasi/master/listkodebelanjaobat', param)
        .then(resp => {
          this.loadingKodeBelanja = false
          // console.log('kode belanja', resp.data)
          this.kodeBelanjas = resp.data
        })
        .catch(() => {
          this.loadingKodeBelanja = false
        })
    },
    // ambil list kandungan
    async getKandungan(val) {
      this.loadingKandungan = true
      const params = { params: { q: val } }
      await api.get('v1/simrs/farmasi/master/listkandungan_namagenerik', params)
        .then(resp => {
          this.loadingKandungan = false
          this.kandungans = resp.data
        })
        .catch(() => {
          this.loadingKandungan = false
        })
    },
    // ambil list Bantuk Sediaan
    async getBetukSediaan(val) {
      this.loadingBentukSediaan = true
      const param = { params: { q: val } }
      await api.get('v1/simrs/farmasi/master/listbentuksediaan', param)
        .then(resp => {
          this.loadingBentukSediaan = false
          this.bentukSediaans = resp.data
        })
        .catch(() => {
          this.loadingBentukSediaan = false
        })
    },
    // ambil list kekuatan dosis
    async getKekuatanDosis(val) {
      this.loadingKekuatanDosis = true
      const param = { params: { q: val } }
      await api.get('v1/simrs/farmasi/master/listkekuatandosis', param)
        .then(resp => {
          this.loadingKekuatanDosis = false
          this.kekuatanDosiss = resp.data
        })
        .catch(() => {
          this.loadingKekuatanDosis = false
        })
    },
    // ambil list Volume sediaan
    async getVolumeSediaan(val) {
      this.loadingVolumeSediaan = true
      const param = { params: { q: val } }
      await api.get('v1/simrs/farmasi/master/listvolumesediaan', param)
        .then(resp => {
          this.loadingVolumeSediaan = false
          this.volumeSediaans = resp.data
        })
        .catch(() => {
          this.loadingVolumeSediaan = false
        })
    },
    // tambah
    saveForm () {
      this.loading = true

      return new Promise((resolve, reject) => {
        api
          .post('v1/simrs/farmasi/master/simpanobat', this.form)
          .then((resp) => {
            // console.log('save data   ', resp)
            notifSuccess(resp)
            const table = useMasterObatTable()
            table.getDataTable()
            this.loading = false
            this.isOpen = false
            resolve(resp)
          })
          .catch((err) => {
            this.isOpen = false
            this.loading = false
            reject(err)
          })
      })
    },
    // simpan cepat start----
    async simpanCepatJenisProduk(val) {
      // console.log('simpan cepat', val)
      this.loadingJenisProduk = true
      const form = { jenisproduk: val }
      await api.post('v1/simrs/farmasi/master/simpanjenisproduk', form)
        .then(resp => {
          this.loadingJenisProduk = false
          // console.log('dosis', resp.data)
          const temp = resp.data.data
          this.quickSet('jenisproduk', temp.jenisproduk, this.jenisProduks, temp)
        }).catch(() => { this.loadingJenisProduk = false })
    },
    async simpanCepatKelompokPenyimpanan(val) {
      // console.log('simpan cepat', val)
      this.loadingKelompokPenyimpanan = true
      const form = { kelompokpenyimpanan: val }
      await api.post('v1/simrs/farmasi/master/simpankelompokpenyimpanan', form)
        .then(resp => {
          this.loadingKelompokPenyimpanan = false
          // console.log('dosis', resp.data)
          const temp = resp.data.data
          this.quickSet('kelompok_penyimpanan', temp.kelompokpenyimpanan, this.kelompokPenyimpanans, temp)
        }).catch(() => { this.loadingKelompokPenyimpanan = false })
    },
    async simpanCepatKelasTerapi(val) {
      // console.log('simpan cepat', val)
      this.loadingKelasTerapi = true
      const form = { kelasterapi: val }
      await api.post('v1/simrs/farmasi/master/simpankelasterapi', form)
        .then(resp => {
          this.loadingKelasTerapi = false
          // console.log('dosis', resp.data)
          const temp = resp.data.data
          // this.quickSet('kelas_terapi', temp.kelasterapi, this.kelasTerapis, temp)
          this.pushKelasTerapi(temp.kelasterapi)
          this.kelasTerapis.push(temp)
          this.temp.kelas_terapi = temp.kelasterapi
        }).catch(() => { this.loadingKelasTerapi = false })
    },
    async simpanCepatVolumeSediaan(val) {
      // console.log('simpan cepat', val)
      this.loadingVolumeSediaan = true
      const form = { volumesediaan: val }
      await api.post('v1/simrs/farmasi/master/simpanvolumesediaan', form)
        .then(resp => {
          this.loadingVolumeSediaan = false
          // console.log('dosis', resp.data)
          const temp = resp.data.data
          this.quickSet('volumesediaan', temp.volumesediaan, this.volumeSediaans, temp)
          this.setFormNamaObat()
        }).catch(() => { this.loadingVolumeSediaan = false })
    },
    async simpanCepatKekuatanDosis(val) {
      // console.log('simpan cepat', val)
      this.loadingKekuatanDosis = true
      const form = { kekuatandosis: val }
      await api.post('v1/simrs/farmasi/master/simpankekuatandosis', form)
        .then(resp => {
          this.loadingKekuatanDosis = false
          console.log('dosis', resp.data)
          const temp = resp.data.data
          this.quickSet('kekuatan_dosis', temp.kekuatandosis, this.kekuatanDosiss, temp)
          this.setFormNamaObat()
        }).catch(() => { this.loadingKekuatanDosis = false })
    },
    async simpanCepatBentukSediaan(val) {
      // console.log('simpan cepat', val)
      this.loadingBentukSediaan = true
      const form = { bentuksediaan: val }
      await api.post('v1/simrs/farmasi/master/simpanbentuksediaan', form)
        .then(resp => {
          this.loadingBentukSediaan = false
          // console.log('merk', resp.data)
          const temp = resp.data.data
          this.quickSet('bentuk_sediaan', temp.bentuksediaan, this.bentukSediaans, temp)
          this.setFormNamaObat()
        }).catch(() => { this.loadingBentukSediaan = false })
    },
    async simpanCepatSatuanBes(val) {
      // console.log('simpan cepat', val)
      this.loadingSatuanB = true
      const form = { nama: val, kode: this.countSatuan }
      await api.post('v1/satuan/store', form)
        .then(resp => {
          this.loadingSatuanB = false
          // console.log('merk', resp.data)
          const temp = resp.data.data
          this.quickSet('satuan_b', temp.nama, this.satuanBs, temp)
          this.getCountSatuan()
        }).catch(() => { this.loadingSatuanB = false })
    },
    async simpanCepatSatuanKec(val) {
      // console.log('simpan cepat', val)
      this.loadingSatuanK = true
      const form = { nama: val, kode: this.countSatuan }
      await api.post('v1/satuan/store', form)
        .then(resp => {
          this.loadingSatuanK = false
          // console.log('merk', resp.data)
          const temp = resp.data.data
          this.quickSet('satuan_k', temp.nama, this.satuanKs, temp)
          this.getCountSatuan()
        }).catch(() => { this.loadingSatuanK = false })
    },
    async simpanCepatMerk(val) {
      // console.log('simpan cepat', val)
      this.loadingMerk = true
      const form = { merk: val }
      await api.post('v1/simrs/farmasi/master/simpanmerk', form)
        .then(resp => {
          this.loadingMerk = false
          // console.log('merk', resp.data)
          const temp = resp.data.data
          this.quickSet('merk', temp.merk, this.merks, temp)
          this.setFormNamaObat()
        }).catch(() => { this.loadingMerk = false })
    },
    async simpanCepatKandungan(val) {
      // console.log('simpan cepat', val)
      this.loadingKandungan = true
      const form = { nama: val }
      await api.post('v1/simrs/farmasi/master/simpankandungan_namagenerik', form)
        .then(resp => {
          this.loadingKandungan = false
          // console.log('kandungan', resp.data)
          const temp = resp.data.data
          this.quickSet('kandungan', temp.nama, this.kandungans, temp)
        }).catch(() => { this.loadingKandungan = false })
    },
    async simpanCepatJenisPerbekalan(val) {
      console.log('simpan cepat', val)
      this.loadingJenisPerbekalan = true
      const form = { jenisperbekalan: val }
      await api.post('v1/simrs/farmasi/master/simpanjenisperbekalan', form)
        .then(resp => {
          this.loadingJenisPerbekalan = false
          console.log('jenis perbekalan', resp.data)
          const temp = resp.data.data
          this.quickSet('jenis_perbekalan', temp.jenisperbekalan, this.jenisPerbekalans, temp)
          this.setFormNamaObat()
        }).catch(() => { this.loadingJenisPerbekalan = false })
    },
    // simpan cepat end----
    // hapus maping kelas terapi
    async hapusMaping(val) {
      console.log('hapus maping', val)
      this.loadingKelasTerapi = true
      const form = { id: val }
      await api.post('v1/simrs/farmasi/master/hapus-maping-terapi', form)
        .then(resp => {
          const table = useMasterObatTable()
          table.getDataTable()
          notifSuccess(resp)
          this.loadingKelasTerapi = false
        }).catch(() => { this.loadingKelasTerapi = false })
    }

  }
})
