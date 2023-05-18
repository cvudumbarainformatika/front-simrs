import { defineStore } from 'pinia'

export const useRegistrasiPasienUmumStore = defineStore('registrasi_pasien_umum', {
  state: () => ({
    loading: false,
    form: {}
  }),
  actions: {
    setForm(key, val) {
      this.form[key] = val
    }
  }
})
