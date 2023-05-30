import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'

export const useRegistrasiPasienUmumStore = defineStore('registrasi_pasien_umum', {
  state: () => ({
    loading: false,
    form: {
      tglmasuk: date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss')
    },
    display: {},
    paramKarcis: {},
    paramDpjp: {
      tglsep: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      jenis_pelayanan: 2
    },
    asalrujukans: [],
    sistembayars1: [],
    sistembayars: [],
    polis: [],
    kasrcispoli: null,
    jenisKarcises: [],
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
      this.getJenisKarcis()
    },

    // api related function
    async getDokterDpjp() {
      this.loading = true
      await api.post('v1/simrs/pendaftaran/dpjpbpjs', this.paramDpjp)
        .then(resp => {
          this.loading = false
          if (resp.data.result.list.length) {
            const data = resp.data.result.list
            data.forEach(anu => {
              anu.dpjp = anu.kode
            })
            this.dpjps = data
            console.log('result ', data)
          }
          console.log('dokter DPJp ', resp.data)
          return new Promise(resolve => { resolve(resp.data) })
        })
        .catch(() => {
          this.loading = false
        })
    },
    async getKarcisPoli() {
      this.loading = true
      const param = { params: this.paramKarcis }
      await api.get('v1/simrs/pendaftaran/getkarcispoli', param)
        .then(resp => {
          this.loading = false
          this.kasrcispoli = resp.data
          const temp = Object.keys(resp.data)
          if (temp.length) {
            temp.forEach(key => {
              this.setForm(key, resp.data[key])
            })
          }
          console.log('jenis karcis ', resp.data)
          return new Promise(resolve => { resolve(resp.data) })
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
          this.sistembayars1 = resp.data
          console.log('sistem bayar', resp.data)
        })
        .catch(() => {
          this.loading = false
        })
    },
    async getSistemBayar2(val) {
      const param = { params: { sistembayar1: val } }
      this.loading = true
      await api.get('v1/simrs/master/sistembayar2', param)
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
    },
    simpanRegistrasi() {
      return new Promise(resolve => {
        this.loading = true
        api.post('v1/simrs/pendaftaran/rajalumumsimpan', this.form)
          .then(resp => {
            console.log('simpan pendaftaran', resp)
            this.loading = false
            resolve(resp)
          })
          .catch(() => { this.loading = false })
      })
    }
  }
})
