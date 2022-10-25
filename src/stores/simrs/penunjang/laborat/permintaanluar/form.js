import { defineStore } from 'pinia'
// import { useSurveyorTable } from 'src/stores/surveyor/table'
import {
  api
} from 'boot/axios'
// import { routerInstance } from 'src/boot/router'
import { notifSuccess } from 'src/modules/utils'
import { date } from 'quasar'
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
    pemeriksaans: [],
    pemeriksaanPakets: [],
    loading: false,
    edited: false
  }),

  getters: {

  },

  actions: {

    setForm (name, val) {
      this.form[name] = val
    },
    async saveForm (arr) {
      this.loading = true
      this.setForm('details', arr)
      try {
        const resp = await api.post('/v1/transaksi_laborat_luar/store', this.form)
        console.log('save data', resp)
        notifSuccess(resp)

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
      this.setForm('kelamin', 'Laki-laki')
      this.setForm('jam_sampel_diambil', '07:00')
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
      const tgl = new Date()
      const year = tgl.getFullYear()
      const month = ('0' + (tgl.getMonth() + 1)).slice(-2)
      const day = ('0' + (tgl.getDate())).slice(-2)
      const formatDb = year + '-' + month + '-' + day
      const formatUniq = date.formatDate(tgl, 'YYMMDD')
      this.form.tgl_lahir = formatDb
      this.form.sampel_diambil = formatDb
      this.uniqueId(formatUniq)
    },

    uniqueId (val) {
      // const dateString = val.toString(36)
      const randomness = Math.random().toString(36).substring(2, 9)
      // const uniq = dateString + randomness
      this.form.nota = val + '/' + randomness + '-L'
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
    },
    async getMasterPemeriksaanGroup() {
      await api.get('/v1/master_laborat_group').then((resp) => {
        // console.log('master pemeriksaan', resp)
        const arr = resp.data
        const arr2 = arr.length > 0 ? resp.data.map(x =>
          ({
            paket: x.rs21 !== '' ? x.rs21 : x.rs2,
            nama: x.rs2,
            jenis: x.rs21 !== '' ? 'PAKET' : 'NON-PAKET',
            biaya: parseInt(x.rs3) + parseInt(x.rs4),
            kode: x.rs1,
            aslix: x
          })
        ) : []
        const groupped = this.groupBy(arr2, paket => paket.paket)
        this.pemeriksaans = groupped
        console.log('group pemeriksaan', groupped)
      })
    },

    groupBy(list, keyGetter) {
      const map = new Map()
      list.forEach((item) => {
        const key = keyGetter(item)
        const collection = map.get(key)
        if (!collection) {
          map.set(key, [item])
        } else {
          collection.push(item)
        }
      })
      const arr = Array.from(map, ([name, value]) => ({ name, value }))
      return arr
    }

  }
})
