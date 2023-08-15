import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'

export const useRekapAbesensiUserStore = defineStore('rekap_absensi_user', {
  state: () => ({
    loading: false,
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
      sort: 'asc',
      bulan: date.formatDate(Date.now(), 'MM'),
      tahun: date.formatDate(Date.now(), 'YYYY')
    },
    // custom for this store
    rekapOpen: false,
    jadwalOpen: false,
    user: {},
    rekaps: [],
    jadwals: [],
    tanggals: [],
    weeks: [],
    weeksData: [],
    telat: 0
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
    setWeeks(data) {
      const temp = Object.keys(data)
      this.weeks = temp
      this.weeks.forEach(week => {
        this.weeksData[week] = [null, null, null, null, null, null, null]
        data[week].forEach((tanggal, index) => {
          const d = new Date(tanggal.tanggal)
          tanggal.day = d.getDay()
          const iian = d.getDay() === 0 ? 6 : d.getDay() - 1
          this.weeksData[week][iian] = tanggal
        })
        // console.log(data[week])
      })

      console.log('data', this.weeksData)
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
          this.rekaps = resp.data
          this.tanggals = resp.data.tanggals
          this.telat = resp.data.telat
          this.setWeeks(resp.data.weeks)
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
