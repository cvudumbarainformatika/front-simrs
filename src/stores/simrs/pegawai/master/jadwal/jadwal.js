import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { changeArrayIndex, notifSuccess } from 'src/modules/utils'

export const useAbsensiJadwalStore = defineStore('jadwal_absensi', {
  state: () => ({
    loading: false,
    isOpen: false, // for open / close modal
    edited: false,
    checkBoxValue: [],
    items: [],
    meta: {},
    columns: [],
    columnHide: [
      'id',
      'created_at',
      'updated_at',
      'user_id',
      'status',
      'ruang_id',
      'kategory_id',
      'hari_01',
      'hari_02',
      'hari_03',
      'hari_04',
      'hari_05',
      'hari_06',
      'hari_07',
      'jam01',
      'jam02',
      'jam03',
      'jam04',
      'jam05',
      'jam06',
      'jam07',
      'jam_01',
      'jam_02',
      'jam_03',
      'jam_04',
      'jam_05',
      'jam_06',
      'jam_07',
      'kedua',
      'keempat',
      'keenam',
      'kelima',
      'ketiga',
      'ketujuh',
      'pertama',
      'ruang_id',
      'status',
      'updated_at'
    ],
    form: {},
    deleteId: null,
    pegawaies: [],
    ruangs: [],
    kategoriJadwal: [
      { nama: '5 Hari kerja', value: 1 },
      { nama: '6 Hari kerja', value: 2 },
      { nama: 'shift', value: 3 }
    ],
    kategori: null,
    kategories: [],
    days: [],
    haries: [],
    tanggals: [],
    pagies: [],
    siangs: [],
    malams: [],
    subuhes: [],
    weeks: [],
    shifts: [],
    params: {
      q: '',
      page: 1,
      per_page: 10,
      order_by: 'created_at',
      sort: 'desc',
      tahun: date.formatDate(new Date(), 'YYYY')
    }
  }),
  actions: {
    resetFORM() {
      this.form = {}
      const columns = [
        'user_id',
        'kategory_id',
        'ruang_id'
      ]
      const hari = [
        'hari_01',
        'hari_02',
        'hari_03',
        'hari_04',
        'hari_05',
        'hari_06',
        'hari_07',
        'jam_01',
        'jam_02',
        'jam_03',
        'jam_04',
        'jam_05',
        'jam_06',
        'jam_07'
      ]
      for (let i = 0; i < columns.length; i++) {
        this.setForm(columns[i], null)
      }
      for (let i = 0; i < hari.length; i++) {
        this.setForm(hari[i], false)
      }
      this.days.forEach((data) => {
        if (data.shift) delete data.shift
      })
    },
    setParam(key, payload) {
      this.params[key] = payload
    },
    setForm(key, payload) {
      this.form[key] = payload
    },
    setMeta(payload) {
      delete payload.data
      this.meta = payload
    },
    setItems(payload) {
      this.items = payload
    },
    setOpen() {
      this.isOpen = !this.isOpen
    },
    deletesData(payload) {
      this.deleteId = payload
      // console.log('id', payload)
      this.deleteData()
    },
    // local table related function
    setSearch(val) {
      this.params.q = val
      this.getDataTable()
    },
    setOder(payload) {
      this.params.order_by = payload
      this.params.sort === 'desc'
        ? (this.params.sort = 'asc')
        : (this.params.sort = 'desc')
      this.getDataTable()
    },
    setPage(payload) {
      // console.log('setPage', payload)
      this.params.page = payload
      this.getDataTable()
    },
    setPerPage(payload) {
      this.params.per_page = payload
      this.params.page = 1
      this.getDataTable()
    },
    setColumns(payload) {
      if (!payload) return
      const thumb = payload.map((x) => Object.keys(x))
      this.columns = thumb[0]
      this.columns.push('jadwal')
      this.columns.sort()
      changeArrayIndex(this.columns, 'pegawai', 'jadwal')
      changeArrayIndex(this.columns, 'ruang', 'jadwal')
      changeArrayIndex(this.columns, 'kategory', 'jadwal')
      // this.columns.reverse()
      // console.log('columns', this.columns)
    },

    refreshTable() {
      this.params.page = 1
      this.getDataTable()
    },

    // data form related

    newData() {
      this.resetFORM()
      this.checkBoxValue = []
      this.kategori = null
      this.tanggals = []
      this.edited = false
      this.isOpen = !this.isOpen
    },
    editData(val) {
      this.edited = true
      const keys = Object.keys(val)
      keys.forEach((key, index) => {
        if (val[key] !== null) {
          this.setForm(key, val[key])
        }
      })
      if (val.kategory_id !== null) {
        this.kategori = val.kategory_id
      } else {
        this.kategori = 3
        // this.tanggals = val.jadwal
        // val.jadwal.forEach((data, index) => {
        //   if (data !== null) {
        //     this.checkBoxValue.push(index)
        //   }
        //   // console.log('data', data)
        //   // console.log('index', index)
        // })
      }
      console.log('value to edit', val)
      console.log('the form', this.form)
      // console.log('the key', keys)
      // kecuali yang ada di object user
      this.isOpen = !this.isOpen
    },

    // autocomplete pilih pegawai
    pegawaiSelected(val) {
      this.setForm('user_id', val)
    },
    pegawaiCleared() {
      this.setForm('user_id', null)
    },

    // autocomplete pilih kategory
    kategorySelected(val, i) {
      this.setForm('kategory_id', val)
      // console.log('kategory selected', val, i)
    },
    kategoryCleared() {
      this.setForm('kategory_id', null)
    },

    // autocomplete pilih kategori jadwal
    kategoriJadwalSelected(val) {
      this.kategori = val
      if (val === 1) {
        this.form.kategory_id = val
        this.haries = [0, 1, 2, 3, 4]
      }
      if (val === 2) {
        this.form.kategory_id = val
        this.haries = [0, 1, 2, 3, 4, 5]
      }
      if (val === 3) {
        this.haries = []
      }
    },
    kategoriJadwalCleared() {
      this.haries = []
      this.kategori = null
    },

    // autocomplete pilih ruang
    ruangSelected(val) {
      this.setForm('ruang_id', val)
    },
    ruangCleared() {
      this.setForm('ruang_id', null)
    },
    // set jam shift
    setShift(tgl, i) {
      // const kateg = this.kategories.filter((data) => {
      //   return data.id === this.form.kategory_id
      // })
      // this.tanggals[i].masuk = kateg[0].jam_reguler.masuk
      // this.tanggals[i].pulang = kateg[0].jam_reguler.pulang
      // console.log('kateg', kateg[0])
      // console.log('tgl i', this.tanggals[i])
      // console.log('tgl', tgl)
      // console.log('i', i)
    },
    // update model tanggal
    updateTagggal(value, reason, details) {
      const tgl = details.year + '-' + details.month + '-' + details.day
      if (reason === 'remove-day') {
        const iPagi = this.pagies.indexOf(tgl)
        const iSiang = this.siangs.indexOf(tgl)
        const iMalam = this.malams.indexOf(tgl)
        const iSubuh = this.subuhes.indexOf(tgl)
        if (iPagi >= 0) this.pagies.splice(iPagi, 1)
        if (iSiang >= 0) this.siangs.splice(iSiang, 1)
        if (iMalam >= 0) this.malams.splice(iMalam, 1)
        if (iSubuh >= 0) this.subuhes.splice(iSubuh, 1)
        // console.log('iPagi', iPagi)
      }

      if (this.form.kategory_id === 3) {
        if (reason === 'add-day') this.pagies.push(tgl)
        this.pagies.sort()
      } else if (this.form.kategory_id === 4) {
        if (reason === 'add-day') this.siangs.push(tgl)

        this.siangs.sort()
      } else if (this.form.kategory_id === 5) {
        if (reason === 'add-day') this.malams.push(tgl)
        this.malams.sort()
      } else if (this.form.kategory_id === 6) {
        if (reason === 'add-day') this.subuhes.push(tgl)
        this.subuhes.sort()
      }
      if (!this.tanggals.length) return
      this.tanggals.sort()
      const wtemp = []
      for (let index = 1; index < this.tanggals.length; index++) {
        const tgl = this.tanggals[index - 1]
        const tgl2 = this.tanggals[index]
        const unit = 'days'
        const diff = date.getDateDiff(tgl2, tgl, unit)
        // console.log('diff', diff)
        if (diff > 1) {
          const week = date.formatDate(tgl2, 'w')
          wtemp.push(week)
        }
      }
      this.weeks = wtemp
      // console.log('value', value)
      // console.log('reason', reason)
      // console.log('details', details)
      // console.log('pagi', this.pagies)
      // console.log('siang', this.siangs)
      // console.log('malam', this.malams)
      // console.log('subuh', this.subuhes)
    },
    getInitialData() {
      this.getDataTable()
      this.getPegawai()
      this.getRuang()
      this.getKategories()
      this.getDays()
    },
    // api related function

    getPegawai() {
      this.loading = true
      return new Promise((resolve, reject) => {
        api
          .get('v1/pegawai/master/pegawai')
          .then((resp) => {
            this.loading = false
            // console.log('pegawai', resp)
            this.pegawaies = resp.data
            resolve(resp)
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    },
    getRuang() {
      this.loading = true
      return new Promise((resolve, reject) => {
        api
          .get('v1/ruang/ruang')
          .then((resp) => {
            this.loading = false
            // console.log('ruang', resp)
            this.ruangs = resp.data
            resolve(resp)
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    },
    getKategories() {
      this.loading = true
      return new Promise((resolve, reject) => {
        api
          .get('v1/pegawai/absensi/jadwal/kategori')
          .then((resp) => {
            this.loading = false
            console.log('kategori', resp.data)
            this.kategories = resp.data
            this.shifts = this.kategories.filter((data) => {
              const nam = data.nama.split(' ')
              // console.log('nam', nam[0])
              return nam[0] === 'Shift'
            })
            // console.log('shift', this.shifts)
            // console.log('kate', this.kategories)
            resolve(resp)
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    },
    getDays() {
      this.loading = true
      return new Promise((resolve, reject) => {
        api
          .get('v1/pegawai/absensi/jadwal/hari')
          .then((resp) => {
            this.loading = false
            // console.log('Hari', resp)
            this.days = resp.data
            this.resetFORM()
            resolve(resp)
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    },
    getDataTable() {
      this.loading = true
      const params = { params: this.params }
      return new Promise((resolve, reject) => {
        api
          .get('v1/pegawai/absensi/jadwal/index', params)
          .then((resp) => {
            this.loading = false
            const data = resp.data.data
            // console.log('get data table', resp)
            console.log('data table', data)
            if (data.length) {
              this.setColumns(data)
              this.setItems(data)
            }
            resolve(resp)
            this.setMeta(resp.data)
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    },
    getByUser() {
      this.loading = true
      const params = { params: this.params }
      return new Promise((resolve, reject) => {
        api
          .get('v1/pegawai/absensi/jadwal/by-user', params)
          .then((resp) => {
            this.loading = false
            const data = resp.data.data
            // console.log('get by user', resp)
            // console.log('data by user', data)
            if (data.length) {
              this.setColumns(data)
              this.setItems(data)
            }
            resolve(resp)
            this.setMeta(resp.data)
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    },
    saveForm() {
      // const data = {
      //   ruang_id: 13,
      //   user_id: 6,
      //   jadwal: [
      //     {
      //       id: 1,
      //       nama: 'Senin',
      //       name: 'Monday',
      //       shift: {
      //         id: 3,
      //         masuk: '07:00:00',
      //         pulang: '14:00:00'
      //       }
      //     },
      //     {
      //       id: 2,
      //       nama: 'Selasa',
      //       name: 'Tuesday',
      //       shift: {
      //         id: 3,
      //         masuk: '07:00:00',
      //         pulang: '14:00:00'
      //       }
      //     },
      //     {
      //       id: 3,
      //       nama: 'Rabu',
      //       name: 'Wednesday',
      //       shift: {
      //         id: 3,
      //         masuk: '07:00:00',
      //         pulang: '14:00:00'
      //       }
      //     },
      //     {
      //       id: 4,
      //       nama: 'Kamis',
      //       name: 'Thursday',
      //       shift: {
      //         id: 3,
      //         masuk: '07:00:00',
      //         pulang: '14:00:00'
      //       }
      //     }
      //   ]
      // }
      // if (this.kategori === 3) {
      //   this.form.jadwal = this.tanggals
      // }
      console.log('form', this.form)
      this.loading = true

      return new Promise((resolve, reject) => {
        api
          // .post('v1/pegawai/absensi/jadwal/store', data)
          .post('v1/pegawai/absensi/jadwal/store', this.form)
          .then((resp) => {
            this.loading = false
            console.log('save jadwal', resp)
            notifSuccess(resp)
            this.getDataTable()
            this.resetFORM()
            resolve(resp)
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    },
    deleteData() {
      this.loading = true
      const data = { id: this.deleteId }
      return new Promise((resolve, reject) => {
        api
          .post('v1/pegawai/absensi/jadwal/destroy', data)
          .then((resp) => {
            this.loading = false
            notifSuccess(resp)
            this.getDataTable()
            resolve(resp)
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    }
  }
})
