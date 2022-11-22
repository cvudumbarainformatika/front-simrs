import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useRekapAbesensiUserStore = defineStore('rekap_absensi_user', {
  state: () => ({
    loading: true,
    isOpen: false,
    items: [],
    meta: {},
    columns: [],
    columnHide: ['id', 'created_at', 'updated_at'],
    form: {},
    deleteId: null,
    params: {
      q: '',
      page: 1,
      per_page: 10,
      order_by: 'created_at',
      sort: 'asc'
    },
    // custom for this store
    rekapOpen: false,
    jadwalOpen: false,
    user: {},
    rekaps: [],
    jadwals: [],
    tanggals: []
  }),
  actions: {
    // table related functions

    setParams(key, val) {
      this.params[key] = val
    },
    delParams(key) {
      delete this.params[key]
    },
    setForm(key, val) {
      this.form[key] = val
    },
    // local related function
    setUser(val) {
      this.user = val
    },
    setRekap() {
      this.rekapOpen = !this.rekapOpen
    },
    setJadwal() {
      this.jadwalOpen = !this.jadwalOpen
    },
    getInitialData() {
      // this.getRekapAbsensiByUser()
    },
    // api related functions
    getRekapAbsensiByUser() {
      this.loading = true
      const params = { params: this.params }
      return new Promise((resolve, reject) => {
        api.get('v1/pegawai/absensi/jadwal/rekap-per-user', params).then(resp => {
          this.loading = false
          console.log('rekap absen', resp)
          this.rekaps = resp.data.data
          this.tanggals = resp.data.tanggals
          resolve(resp)
        }).catch(err => {
          this.loading = false
          reject(err)
        })
      })
    },
    getJadwalByUser() {
      this.loading = true
      const params = { params: this.params }
      return new Promise((resolve, reject) => {
        api.get('v1/pegawai/absensi/jadwal/by-user', params).then(resp => {
          this.loading = false
          console.log('rekap absen', resp)
          this.jadwals = resp.data
          delete this.params.id
          resolve(resp)
        }).catch(err => {
          this.loading = false
          reject(err)
        })
      })
    }
  }
})
