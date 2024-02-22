import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useResepPermintaanOperasiStore = defineStore('resep_permintaan_operasi', {
  state: () => ({
    loading: false,
    isOpen: false,
    items: [],
    form: {},
    params: {
      noreg: '',
      tgl: ''
    }
  }),
  actions: {
    setForm(key, val) {
      this.form[key] = val
    },
    setParams(key, val) {
      this.params[key] = val
    },
    setPasien(val) {
      console.log('pasien', val)
    },
    async getData() {
      this.loading = true
      const param = { params: this.params }
      await api.get('v1', param)
        .then(resp => {
          this.loading = false
          console.log('permintaan ok', resp?.data)
        })
        .catch(() => { this.loading = false })
    }
  }
})
