import { defineStore } from 'pinia'
import { notifSuccess } from 'src/modules/utils'
import { api } from 'boot/axios'
import { useMasterObatTable } from './table'

export const useMasterObatForm = defineStore('master_Obat_form', {
  state: () => ({
    isOpen: false,
    form: {
      kekuatan_dosis: null
    },
    gedungs: [],
    loading: false,
    loadingJenisPerbekalan: false,
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
      { nama: 'YA', value: '1' },
      { nama: 'TIDAK', value: '0' }
    ],
    optionStatusGeneriks: [
      { nama: 'YA', value: '1' },
      { nama: 'TIDAK', value: '0' }
    ],
    optionStatusForkits: [
      { nama: 'YA', value: '1' },
      { nama: 'TIDAK', value: '0' }
    ],
    optionStatusFornases: [
      { nama: 'YA', value: '1' },
      { nama: 'TIDAK', value: '0' }
    ],

    kelasTerapis: [],
    kelompokPenyimpanans: [],
    kelompokRKOs: [],
    satuanBs: [],
    satuanKs: [],
    merks: [],
    kandungans: [],
    jenisPerbekalans: [],
    kodeBelanjas: [],
    bentukSediaans: [],
    kekuatanDosiss: [],
    volumeSediaans: [],

    paramsKandungan: { q: '' }
  }),
  actions: {
    // local related actions
    resetFORM () {
      this.form = {}
      const columns = [
        'kekuatan_dosis'
      ]
      for (let i = 0; i < columns.length; i++) {
        this.setForm(columns[i], null)
      }
      // this.setForm('isi', 1)
    },
    setForm (nama, val) {
      this.form[nama] = val
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
      const keys = Object.keys(val)
      keys.forEach((key, index) => {
        this.setForm(key, val[key])
      })
      // kecuali yang ada di object user
      this.isOpen = !this.isOpen
    },
    getInitialData() {
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
    },
    // api related actions
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
    }
  }
})
