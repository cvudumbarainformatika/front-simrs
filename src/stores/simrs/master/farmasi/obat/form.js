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

    jenisPerbekalans: [],
    kodeBelanjas: [],
    kandungans: [],
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
    },
    // api related actions
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
