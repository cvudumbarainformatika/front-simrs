import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { notifSuccess } from 'src/modules/utils'

export const useRekapAbsensiPegawaiStore = defineStore('rekap_absensi_pegawai', {
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
    monthNum: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
    bulan: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
    users: [],
    protas: [],
    liburs: [],
    kategories: []
  }),
  actions: {
    resetFORM() {
      this.form = {}
      const columns = [
        'nama',
        'username',
        'device',
        'status',
        'id',
        'email',
        'pegawai_id'
      ]

      for (let i = 0; i < columns.length; i++) {
        this.setForm(columns[i], null)
      }
    },
    setForm(key, payload) {
      this.form[key] = payload
    },
    setParam(key, payload) {
      this.params[key] = payload
    },
    setOpen() {
      this.isOpen = !this.isOpen
    },
    setMeta(payload) {
      delete payload.data
      this.meta = payload
    },
    setItems(payload) {
      this.items = payload
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
    // setPage(payload) {
    //   // console.log('setPage', payload)
    //   this.params.page = payload
    //   this.getDataTable()
    // },
    // setPerPage(payload) {
    //   this.params.per_page = payload
    //   this.params.page = 1
    //   this.getDataTable()
    // },
    setColumns(payload) {
      this.columns = [
        'nama', 'telat'
      ]
      for (let index = 0; index < 31; index++) {
        this.columns[index + 2] = index < 9 ? '0' + (index + 1) : index.toString()
      }

      // if (!payload) return
      // const thumb = payload.map((x) => Object.keys(x))
      // this.columns = thumb[0]
      // this.columns.sort()
      // this.columns.reverse()
      // console.log('columns', this.columns)
    },
    setData(payload) {
      this.users.forEach(user => {
        console.log('cari id', payload[user.id])
        if (payload[user.id]) {
          // console.log('ada lengt', payload[user.id])
          payload[user.id].forEach(data => {
            user[data.day] = data
          })
        }
        if (payload.apem) {
          payload.apem.forEach(apem => {
            if (user.id === apem.user_id) {
              user.telat = apem.telat
              user.total = apem.total
            }
          })
        }
        if (this.protas.length) {
          this.protas.forEach(prota => {
            if (user[prota.day]) {
              user[prota.day].prota = prota
            } else {
              user[prota.day] = { prota }
            }
          })
        }
        if (this.liburs.length) {
          this.liburs.forEach(libur => {
            if (user.id === libur.user_id) {
              if (user[libur.day]) {
                user[libur.day].libur = libur
              } else {
                user[libur.day] = { libur }
              }
            }
          })
        }
      })
      this.items = this.users
      // console.log('set data', this.users)
    },

    // refreshTable() {
    //   this.params.page = 1
    //   this.getDataTable()
    // },
    // data form related

    newData() {
      this.resetFORM()
      this.edited = false
      this.isOpen = !this.isOpen
    },
    editData(val) {
      this.edited = true
      const keys = Object.keys(val)
      keys.forEach((key, index) => {
        this.setForm(key, val[key])
      })
      console.log('edit', val)
      // kecuali yang ada di object user
      this.isOpen = !this.isOpen
    },
    sanitazeForm() {
      const formini = Object.keys(this.form)
      formini.forEach((data) => {
        if (this.form[data] === null) {
          delete this.form[data]
        }
      })
    },
    getInitialData() {
      this.getKatgory()
      this.getUsers().then(() => {
        this.getProta()
        this.getLibur()
        this.getDataTable()
      })
    },
    // this custom store
    refreshTable() {
      const month = date.formatDate(Date.now(), 'MM')
      // const month = date.formatDate('2022/3/1', 'MM')
      this.setParam('month', month)
      console.log('moth', month)
      this.getProta()
      this.getLibur()
      this.getDataTable()
    },
    setPage(payload) {
      // console.log('setPage', payload)
      this.params.month = payload
      this.getProta()
      this.getLibur()
      this.getDataTable()
    },
    // api related function
    // get data tabel
    getDataTable() {
      this.loading = true
      const params = { params: this.params }
      return new Promise((resolve, reject) => {
        api
          .get('v1/pegawai/absensi/index', params)
          .then((resp) => {
            this.loading = false
            console.log('index absensi', resp.data)
            this.setData(resp.data)
            this.setColumns(resp.data)
            // this.meta = resp.data
            this.resetFORM()
            resolve(resp)
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    },
    getUsers() {
      this.loading = true
      const params = { params: this.params }
      return new Promise((resolve, reject) => {
        api
          .get('v1/user/all', params)
          .then((resp) => {
            this.loading = false
            console.log('store user', resp.data)
            this.users = resp.data
            resolve(resp)
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    },
    getProta() {
      this.loading = true
      const params = { params: this.params }
      return new Promise((resolve, reject) => {
        api
          .get('v1/pegawai/absensi/prota/all', params)
          .then((resp) => {
            this.loading = false
            console.log('store prota', resp.data)
            this.protas = resp.data
            resolve(resp)
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    },
    getKatgory() {
      this.loading = true
      const params = { params: this.params }
      return new Promise((resolve, reject) => {
        api
          .get('v1/pegawai/absensi/kategori/all', params)
          .then((resp) => {
            this.loading = false
            console.log('store kategori', resp.data)
            this.kategories = resp.data
            resolve(resp)
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    },
    getLibur() {
      this.loading = true
      const params = { params: this.params }
      return new Promise((resolve, reject) => {
        api
          .get('v1/libur/month', params)
          .then((resp) => {
            this.loading = false
            console.log('store libur', resp.data)
            this.liburs = resp.data
            resolve(resp)
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    },
    saveForm() {
      this.loading = true
      return new Promise((resolve, reject) => {
        api
          .post('v1/', this.form)
          .then((resp) => {
            console.log('save kategory', resp)
            notifSuccess(resp)
            this.loading = false
            this.getDataTable()
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
          .post('v1//destroy', data)
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
