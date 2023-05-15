import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import { findWithAttr } from 'src/modules/utils'

export const usePendaftaranPasienUmumStore = defineStore('pendaftaran_pasien_umum', {
  state: () => ({
    loading: false,
    params: {},
    paramWilayah: {
      kd_negara: '',
      kd_propinsi: '',
      kd_kotakabupaten: '',
      kd_kecamatan: ''
    },
    wilayah: {
      kecamatan: {},
      kelurahan: {}
    },
    tanggal: {
      tahun: null,
      bulan: null,
      hari: null
    },
    form: {
      sapaan: 'Bpk.',
      barulama: 'baru',
      kelamin: '-'
    },
    display: {
      sapaan: 'Bpk.'
    },
    sapaans: [],
    jenisPasiens: [
      { nama: 'Baru', value: 'baru' },
      { nama: 'Lama', value: 'lama' }
    ],
    kelamins: [
      { nama: '-', value: '-' },
      { nama: 'Perempuan', value: 'Perempuan' },
      { nama: 'Laki-laki', value: 'Laki-laki' }
    ],
    agamas: [],
    pendidikans: [],
    loadingSelect: false,
    negaras: [],
    propinsies: [],
    kabupatens: [],
    kecamatans: [],
    kelurahans: []
  }),
  actions: {
    setForm(key, val) {
      this.form[key] = val
    },
    negaraSelected(val) {
      // const index = findWithAttr(this.negaras, 'kd_negara', val)
      // const propinsi = this.negaras[index]
      this.wilayah.kd_negara = val
      this.paramWilayah.kd_negara = val
      this.setForm('negara', val)
      // this.setForm('propinsi', propinsi.wilayah)

      console.log('negara selected', this.form)

      this.getProvinces()
    },
    clearNegara() {
      delete this.form.negara
      delete this.form.propinsi
      delete this.form.kodepropinsi
      delete this.form.kabupatenkota
      delete this.form.kodekabupatenkota
      delete this.form.kecamatan
      delete this.form.kodekecamatan
      delete this.form.kelurahan
      delete this.form.kodekelurahan

      this.wilayah.kd_negara = null
      this.wilayah.propinsi = null
      this.wilayah.kotakabupaten = null
      this.wilayah.kecamatan.kotakabupaten = null
      this.wilayah.kelurahan.kotakabupaten = null

      this.paramWilayah.kd_negara = null
      this.paramWilayah.kd_propinsi = null
      this.paramWilayah.kd_kotakabupaten = null
      this.paramWilayah.kd_kecamatan = null
      this.paramWilayah.kd_kelurahan = null

      this.propinsies = []
      this.kabupatens = []
      this.kecamatans = []
      this.kelurahans = []
    },
    propinsiSelected(val) {
      const index = findWithAttr(this.propinsies, 'propinsi', val)
      const propinsi = this.propinsies[index]
      this.wilayah.propinsi = val
      this.paramWilayah.kd_propinsi = val
      this.setForm('kodepropinsi', val)
      this.setForm('propinsi', propinsi.wilayah)

      console.log('form ', this.form)

      this.getKota()
    },
    clearPropinsi() {
      delete this.form.propinsi
      delete this.form.kodepropinsi
      delete this.form.kabupatenkota
      delete this.form.kodekabupatenkota
      delete this.form.kecamatan
      delete this.form.kodekecamatan
      delete this.form.kelurahan
      delete this.form.kodekelurahan

      this.wilayah.propinsi = null
      this.wilayah.kotakabupaten = null
      this.wilayah.kecamatan.kotakabupaten = null
      this.wilayah.kelurahan.kotakabupaten = null

      this.paramWilayah.kd_propinsi = null
      this.paramWilayah.kd_kotakabupaten = null
      this.paramWilayah.kd_kecamatan = null
      this.paramWilayah.kd_kelurahan = null

      this.kabupatens = []
      this.kecamatans = []
      this.kelurahans = []
    },
    kabupatenSelected(val) {
      const index = findWithAttr(this.kabupatens, 'kotakabupaten', val)
      const kabupaten = this.kabupatens[index]
      this.wilayah.kotakabupaten = val
      this.paramWilayah.kd_kotakabupaten = val
      this.setForm('kodekabupatenkota', val)
      this.setForm('kabupatenkota', kabupaten.wilayah)

      console.log('kabupaten ', val)
      this.getKec()
    },
    clearKabupaten() {
      delete this.form.kabupatenkota
      delete this.form.kodekabupatenkota
      delete this.form.kecamatan
      delete this.form.kodekecamatan
      delete this.form.kelurahan
      delete this.form.kodekelurahan

      this.wilayah.kotakabupaten = null
      this.wilayah.kecamatan.kotakabupaten = null
      this.wilayah.kelurahan.kotakabupaten = null

      this.paramWilayah.kd_kotakabupaten = null
      this.paramWilayah.kd_kecamatan = null
      this.paramWilayah.kd_kelurahan = null

      this.kecamatans = []
      this.kelurahans = []
    },
    kecamatanSelected(val) {
      const index = findWithAttr(this.kecamatans, 'kotakabupaten', val)
      const kabupaten = this.kecamatans[index]
      this.wilayah.kecamatan.kotakabupaten = val
      this.paramWilayah.kd_kecamatan = val
      this.setForm('kodekecamatan', val)
      this.setForm('kecamatan', kabupaten.wilayah)
      console.log('kecamatan ', val)
      this.getKels()
    },
    clearKecamatan() {
      delete this.form.kecamatan
      delete this.form.kodekecamatan
      delete this.form.kelurahan
      delete this.form.kodekelurahan

      this.wilayah.kecamatan.kotakabupaten = null
      this.wilayah.kelurahan.kotakabupaten = null

      this.paramWilayah.kd_kecamatan = null
      this.paramWilayah.kd_kelurahan = null

      this.kelurahans = []
    },
    kelurahanSelected(val) {
      const index = findWithAttr(this.kelurahans, 'kotakabupaten', val)
      const kabupaten = this.kelurahans[index]
      this.wilayah.kelurahan.kotakabupaten = val
      this.paramWilayah.kd_kelurahan = val
      this.setForm('kodekelurahan', val)
      this.setForm('kelurahan', kabupaten.wilayah)

      console.log('kelurahan ', this.form)
    },
    clearKelurahan() {
      delete this.form.kelurahan
      delete this.form.kodekelurahan

      this.wilayah.kelurahan.kotakabupaten = null

      this.paramWilayah.kd_kelurahan = null
    },

    // initial data
    getInitialData() {
      this.getNegara()
      this.getAgama()
      this.getSapaan()
      this.getKelamin()
      this.getPendidikan()
    },
    // api related functions
    async getSuku() {
      this.loading = true
      await api.get('v1/simrs/master/pendidikan')
        .then(resp => {
          this.loading = false
          console.log('pendidikan ', resp.data)
          this.pendidikans = resp.data
        })
        .catch(() => { this.loading = false })
    },
    async getPendidikan() {
      this.loading = true
      await api.get('v1/simrs/master/pendidikan')
        .then(resp => {
          this.loading = false
          console.log('sapaan ', resp.data)
          this.pendidikans = resp.data
        })
        .catch(() => { this.loading = false })
    },
    async getKelamin() {
      this.loading = true
      await api.get('v1/simrs/master/kelamin')
        .then(resp => {
          this.loading = false
          console.log('sapaan ', resp.data)
          this.kelamins = resp.data
        })
        .catch(() => { this.loading = false })
    },
    async getSapaan() {
      this.loading = true
      await api.get('v1/simrs/master/sapaan')
        .then(resp => {
          this.loading = false
          console.log('sapaan ', resp.data)
          this.sapaans = resp.data
        })
        .catch(() => { this.loading = false })
    },
    async getAgama() {
      this.loading = true
      await api.get('v1/simrs/master/agama')
        .then(resp => {
          this.loading = false
          console.log('agama ', resp.data)
          this.agamas = resp.data
        })
        .catch(() => { this.loading = false })
    },
    // api propinsi kebawah
    async getNegara () {
      this.loadingSelect = true
      const param = { params: this.paramWilayah }
      await api.get('v1/simrs/master/getnegara', param)
        .then((resp) => {
          this.loadingSelect = false
          // console.log('negara', resp.data[0])
          this.negaras = resp.data[0]
        }).catch(() => {
          this.loadingSelect = false
        })
    },
    async getProvinces () {
      this.loadingSelect = true
      const param = { params: this.paramWilayah }
      await api.get('v1/simrs/master/getpropinsi', param)
        .then((resp) => {
          this.loadingSelect = false
          // console.log('Propinsi', resp.data[0])
          this.propinsies = resp.data[0]
        }).catch(() => {
          this.loadingSelect = false
        })
    },
    async getKota () {
      this.loadingSelect = true
      const param = { params: this.paramWilayah }
      await api.get('v1/simrs/master/getkotakabupaten', param)
        .then((resp) => {
          // console.log('kota', resp.data)
          this.kabupatens = resp.data[0]
          this.loadingSelect = false
        }).catch(() => {
          this.loadingSelect = false
        })
    },
    async getKec () {
      this.loadingSelect = true
      const param = { params: this.paramWilayah }
      await api.get('v1/simrs/master/getkecamatan', param)
        .then((resp) => {
          // console.log('kecamatan', resp.data[0])
          this.kecamatans = resp.data[0]
          // console.log('kec', this.kecamatans)
          this.loadingSelect = false
        }).catch(() => {
          this.loadingSelect = false
        })
    },
    async getKels () {
      this.loadingSelect = true
      const param = { params: this.paramWilayah }
      await api.get('v1/simrs/master/getkelurahan', param)
        .then((resp) => {
          // console.log('keluarahan', resp.data[0])
          this.kelurahans = resp.data[0]
          this.loadingSelect = false
          // console.log('kec', this.kels)
        }).catch(() => {
          this.loadingSelect = false
        })
    }
  }
})
