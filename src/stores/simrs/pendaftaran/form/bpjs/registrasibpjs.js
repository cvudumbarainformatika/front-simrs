import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useRegistrasiPasienBPJSStore = defineStore('registrasi_pasien_BPJS', {
  state: () => ({
    loading: false,
    form: {},
    display: {
      diagnosa: {},
      prosedur: {},
      assesment: {},
      penunjang: {}
    },
    paramKarcis: {},
    paramDiagnosa: { q: '' },
    kataraks: [
      { nama: 'Tidak', value: 0 },
      { nama: 'Ya', value: 1 }
    ],
    asalrujukans: [],
    sistembayars: [],
    polis: [],
    kasrcispolis: [],
    dpjps: [],
    jenisKunjungans: [],
    tujuanKunjungans: [
      { nama: 'Prosedur', value: 1 },
      { nama: 'Konsul Dokter', value: 2 }
    ],
    prosedurs: [],
    assesmens: [],
    penunjangs: [],
    diagnosaAwals: []
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
      this.getKarcispoli()
      this.getJenisKunjungan()
      this.getProsedur()
      this.getAssesmen()
      this.getPenunjang()
    },
    // api related function
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
    async getKarcispoli() {
      this.loading = true
      const param = { params: this.paramKarcis }
      await api.get('v1/simrs/pendaftaran/getkarcispoli', param)
        .then(resp => {
          this.loading = false
          this.kasrcispolis = resp.data
          console.log('karcis poli', resp.data)
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
