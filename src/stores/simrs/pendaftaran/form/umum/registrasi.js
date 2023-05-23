import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useRegistrasiPasienUmumStore = defineStore('registrasi_pasien_umum', {
  state: () => ({
    loading: false,
    form: {},
    display: {},
    paramKarcis: {},
    asalrujukans: [],
    sistembayars: [],
    polis: [],
    kasrcispolis: [],
    dpjps: []
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
    },

    // api related function
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
