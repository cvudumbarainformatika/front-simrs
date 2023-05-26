import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'

export const useRegistrasiPasienBPJSStore = defineStore('registrasi_pasien_BPJS', {
  state: () => ({
    loading: false,
    form: {
      tglsep: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      tglrujukan: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      tglKecelakaan: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      jenis_pelayanan: 2
    },
    display: {
      diagnosa: {},
      prosedur: {},
      assesment: {},
      penunjang: {},
      tanggal: {
        sep: date.formatDate(Date.now(), 'DD MMMM YYYY'),
        rujukan: date.formatDate(Date.now(), 'DD MMMM YYYY'),
        kecelakaan: date.formatDate(Date.now(), 'DD MMMM YYYY')
      },
      kecelakaan: 0,
      suplesi: 0
    },
    paramKarcis: {},
    paramDiagnosa: { q: '' },
    paramPpkRujukan: { faskesasal: '' },
    kataraks: [
      { nama: 'Tidak', value: 0 },
      { nama: 'Ya', value: 1 }
    ],
    asalrujukans: [],
    sistembayars: [],
    polis: [],
    kasrcispolis: [],
    jenisKarcises: [],
    dpjps: [],
    jenisKunjungans: [],
    tujuanKunjungans: [
      { nama: 'Prosedur', value: 1 },
      { nama: 'Konsul Dokter', value: 2 }
    ],
    prosedurs: [],
    assesmens: [],
    penunjangs: [],
    diagnosaAwals: [],
    ppkRujukans: [],
    loadingPpkRujukan: false,
    loadingSuplesi: false,
    loadingSuratKontrol: false,
    kecelakaans: [
      { value: 0, nama: 'Bukan Kecelakaan Lalu Lintas [BKLL]' },
      { value: 1, nama: 'KLL dan Bukan Kecelakaan Kerja [BKK]' },
      { value: 2, nama: 'KLL dan KK' },
      { value: 3, nama: 'KK' }
    ],
    optionSuplesi: [
      { value: 1, nama: 'Ya' },
      { value: 0, nama: 'Tidak' }
    ],
    propinsies: [],
    kabupatens: [],
    kecamatans: []
  }),
  actions: {
    setForm(key, val) {
      this.form[key] = val
    },

    // initial data
    getInitialData() {
      this.getAsalRujukan()
      this.getSistemBayar()
      this.getPoli()
      this.getJenisKarcis()
      this.getJenisKunjungan()
      this.getProsedur()
      this.getAssesmen()
      this.getPenunjang()
      // this.getPpkRujukan('anu')
    },
    // api related function
    async getPpkRujukan(val) {
      this.loadingPpkRujukan = true
      const param = { faskesasal: val }
      await api.post('v1/simrs/pendaftaran/faskesasalbpjs', param)
        .then(resp => {
          this.loadingPpkRujukan = false
          this.ppkRujukans = resp.data.result.faskes
          console.log('PPK rujukan', resp)
        })
        .catch(() => {
          this.loadingPpkRujukan = false
        })
    },
    async getPenunjang() {
      this.loading = true
      await api.get('v1/simrs/bpjs/master/penunjangbpjs')
        .then(resp => {
          this.loading = false
          this.penunjangs = resp.data
          console.log('Penunjang BPJS', resp.data)
        })
        .catch(() => {
          this.loading = false
        })
    },
    async getAssesmen() {
      this.loading = true
      await api.get('v1/simrs/bpjs/master/assesmenbpjs')
        .then(resp => {
          this.loading = false
          this.assesmens = resp.data
          console.log('Assesmen BPJS', resp.data)
        })
        .catch(() => {
          this.loading = false
        })
    },
    async getProsedur() {
      this.loading = true
      await api.get('v1/simrs/bpjs/master/procedurebpjs')
        .then(resp => {
          this.loading = false
          this.prosedurs = resp.data
          console.log('Prosedur BPJS', resp.data)
        })
        .catch(() => {
          this.loading = false
        })
    },
    async getJenisKunjungan() {
      this.loading = true
      await api.get('v1/simrs/bpjs/master/jeniskunjunganbpjs')
        .then(resp => {
          this.loading = false
          this.jenisKunjungans = resp.data
          console.log('Jenis kunjungan BPJS', resp.data)
        })
        .catch(() => {
          this.loading = false
        })
    },
    async getDiagnosaAwal() {
      this.loading = true
      const param = { params: this.paramDiagnosa }
      await api.get('v1/simrs/pendaftaran/getDiagnosa', param)
        .then(resp => {
          this.loading = false
          this.diagnosaAwals = resp.data
          console.log('karcis poli', resp.data)
        })
        .catch(() => {
          this.loading = false
        })
    },
    async getJenisKarcis() {
      this.loading = true
      await api.get('v1/simrs/master/jeniskartukarcis')
        .then(resp => {
          this.loading = false
          this.jenisKarcises = resp.data
          console.log('jenis karcis ', resp.data)
        })
        .catch(() => {
          this.loading = false
        })
    },
    async getPoli() {
      this.loading = true
      await api.get('v1/simrs/master/listmasterpoli')
        .then(resp => {
          this.loading = false
          this.polis = resp.data
          console.log('poli', resp.data)
        })
        .catch(() => {
          this.loading = false
        })
    },
    async getSistemBayar() {
      this.loading = true
      await api.get('v1/simrs/master/sistembayar')
        .then(resp => {
          this.loading = false
          this.sistembayars = resp.data
          console.log('sistem bayar', resp.data)
        })
        .catch(() => {
          this.loading = false
        })
    },
    async getAsalRujukan() {
      this.loading = true
      await api.get('v1/simrs/master/listasalrujukan')
        .then(resp => {
          this.loading = false
          this.asalrujukans = resp.data
          console.log('asal rujukan', resp.data)
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
})
