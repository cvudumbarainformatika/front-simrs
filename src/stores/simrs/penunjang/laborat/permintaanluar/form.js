import { defineStore } from 'pinia'
// import { useSurveyorTable } from 'src/stores/surveyor/table'
import {
  api
} from 'boot/axios'
// import { routerInstance } from 'src/boot/router'
import { notifSuccess } from 'src/modules/utils'
// import { useAuthStore } from './auth'
// import { Dialog } from 'quasar'

export const usePermintaanLuarForm = defineStore('permintaan_luar_form', {
  state: () => ({
    isOpen: false,
    form: {
      // data diri
      // id: '',
      nota: null,
      nosurat: null,
      noktp: null,
      nama: null,
      alamat: null,
      pengirim: null,
      temp_lahir: null,
      tgl_lahir: null,
      sampel_diambil: null,
      jam_sampel_diambil: '07:00',
      kelamin: 'Laki-laki',
      tgl: null,
      kd_lab: null,
      jml: null,
      tarif_sarana: null,
      tarif_pelayanan: null,
      jenispembayaran: null,
      jam_sampel_selesai: null,
      sampel_selesai: null,
      perusahaan_id: null,
      agama: null,
      nohp: null,
      kode_pekerjaan: null,
      nama_pekerjaan: null
    },
    agamas: [],
    pekerjaans: [],
    perusahaans: [],
    loading: false,
    edited: false
  }),

  getters: {

  },

  actions: {

    setForm (name, val) {
      this.form[name] = val
    },
    async saveForm () {
      this.loading = true
      try {
        const resp = await api.post('/v1/surveyor/store', this.form)
        console.log('save data', resp)
        notifSuccess(resp)
        // ini untuk panggil data table
        // const table = useSurveyorTable()
        // table.getDataTable()
        this.resetFORM()
        this.loading = false
        return new Promise((resolve) => {
          resolve(resp)
        })
      } catch (error) {
        this.loading = false
      }
    },
    resetFORM () {
      this.form = {}
      const columns = ['nama',
        'kelamin',
        'alamat',
        'pengirim',
        'tgl_lahir',
        'tgl',
        'nota',
        'kd_lab',
        'jml',
        'tarif_sarana',
        'tarif_pelayanan',
        'jenispembayaran',
        'jam_sampel_selesai',
        'jam_sampel_diambil',
        'sampel_selesai',
        'sampel_diambil',
        'perusahaan_id',
        'noktp',
        'nosurat',
        'temp_lahir',
        'agama',
        'nohp',
        'kode_pekerjaan',
        'nama_pekerjaan']
      for (let i = 0; i < columns.length; i++) {
        this.setForm(columns[i], '')
      }
      this.setToday()
      // this.setForm('gender', 'L')
      // this.setForm('agama', 'Islam')
    },
    newData () {
      this.resetFORM()
      this.edited = false
      this.isOpen = !this.isOpen
    },
    editData (val) {
      this.edited = true
      const keys = Object.keys(val)
      keys.forEach((key, index) => {
        this.setForm(key, val[key])
      })
      // kecuali yang ada di object user
      this.isOpen = !this.isOpen
    },
    setToday () {
      const date = new Date()
      const year = date.getFullYear()
      const month = ('0' + (date.getMonth() + 1)).slice(-2)
      const day = ('0' + (date.getDate())).slice(-2)
      const formatDb = year + '-' + month + '-' + day
      this.form.tgl_lahir = formatDb
      this.form.sampel_diambil = formatDb
    },

    async getAgama() {
      await api.get('/v1/agama').then((resp) => {
        console.log('agama', resp)
        this.agamas = resp.data
      })
    },
    async getPekerjaan() {
      await api.get('/v1/pekerjaan').then((resp) => {
        console.log('pekerjaan', resp)
        this.pekerjaans = resp.data
      })
    },
    async getPerusahaan() {
      await api.get('/v1/perusahaan').then((resp) => {
        console.log('perusahaan', resp)
        this.perusahaans = resp.data
      })
    }

  }
})
