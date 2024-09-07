import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { usePendaftaranAutocompleteStore } from '../../autocomplete'

export const useRegistrasiPasienHomeCareStore = defineStore('registrasi_pasien_home_care', {
  state: () => ({
    autocompleteStore: usePendaftaranAutocompleteStore(),
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
    setForm (key, val) {
      this.form[key] = val
    },
    clearForm () {
      this.form = {
        tglmasuk: date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss')
      }
      this.display = {}
      this.paramKarcis = {}
      this.paramDpjp = {
        tglsep: date.formatDate(Date.now(), 'YYYY-MM-DD'),
        jenis_pelayanan: 2
      }
    },
    // initial data
    getInitialData () {
      // this.getAsalRujukan()
      // this.getSistemBayar()
      // this.getPoli()
      // this.getJenisKarcis()

      if (this.autocompleteStore.asalrujukans.length) {
        this.asalrujukans = this.autocompleteStore.asalrujukans
      }
      else {
        this.getAsalRujukan()
      }

      if (this.autocompleteStore.sistembayars1.length) {
        this.sistembayars1 = this.autocompleteStore.sistembayars1
      }
      else {
        this.getSistemBayar()
      }

      if (this.autocompleteStore.polis.length) {
        this.polis = this.autocompleteStore.polis
      }
      else {
        this.getPoli()
      }

      if (this.autocompleteStore.jenisKarcises.length) {
        this.jenisKarcises = this.autocompleteStore.jenisKarcises
      }
      else {
        this.getJenisKarcis()
      }
    },

    // api related function
    async getDokterDpjp () {
      this.loading = true
      await api.post('v1/simrs/bridgingbpjs/pendaftaran/dpjpbpjs', this.paramDpjp)
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
    async getKarcisPoli () {
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
          // console.log('jenis karcis ', resp.data)
          return new Promise(resolve => { resolve(resp.data) })
        })
        .catch(() => {
          this.loading = false
        })
    },
    async getJenisKarcis () {
      this.loading = true
      await api.get('v1/simrs/master/jeniskartukarcis')
        .then(resp => {
          this.loading = false
          this.jenisKarcises = resp.data
          this.autocompleteStore.setJenisKarcis(resp.data)
        })
        .catch(() => {
          this.loading = false
        })
    },
    async getPoli () {
      this.loading = true
      await api.get('v1/simrs/master/listmasterpoli')
        .then(resp => {
          this.loading = false
          this.polis = resp.data
          this.autocompleteStore.setPoli(resp.data)
        })
        .catch(() => {
          this.loading = false
        })
    },
    async getSistemBayar () {
      this.loading = true
      await api.get('v1/simrs/master/sistembayar')
        .then(resp => {
          this.loading = false
          this.sistembayars1 = resp.data
          this.autocompleteStore.setSistemBayar(resp.data)
          console.log('sistem bayar', resp.data)
        })
        .catch(() => {
          this.loading = false
        })
    },
    async getSistemBayar2 (val) {
      const param = { params: { sistembayar1: val } }
      this.loading = true
      await api.get('v1/simrs/master/sistembayar2', param)
        .then(resp => {
          this.loading = false
          this.sistembayars = resp.data
          console.log('sistem bayar', resp.data)
          if (this.sistembayars.length === 1) {
            this.setForm('kodesistembayar', this.sistembayars[0].rs2)
            this.display.rs2 = this.sistembayars[0].rs2
          }
        })
        .catch(() => {
          this.loading = false
        })
    },
    async getAsalRujukan () {
      this.loading = true
      await api.get('v1/simrs/master/listasalrujukan')
        .then(resp => {
          this.loading = false
          this.asalrujukans = resp.data
          this.autocompleteStore.setAsalRujukan(resp.data)
          console.log('asal rujukan', resp.data)
        })
        .catch(() => {
          this.loading = false
        })
    },
    simpanRegistrasi () {
      return new Promise(resolve => {
        this.loading = true
        api.post('v1/simrs/pendaftaran/homecare/simpan-daftar', this.form)
          .then(resp => {
            console.log('simpan pendaftaran', resp)
            this.loading = false
            resolve(resp.data)
          })
          .catch(() => { this.loading = false })
      })
    }
  }
})
