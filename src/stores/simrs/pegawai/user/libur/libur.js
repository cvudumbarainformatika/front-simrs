import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifSuccess } from 'src/modules/utils'

export const useLiburAbsenStore = defineStore('libur_absen', {
  state: () => ({
    loading: true,
    isOpen: false,
    items: [],
    meta: {},
    columns: [],
    columnHide: ['id', 'created_at', 'updated_at'],
    form: {},
    tanggal: '',
    deleteId: null,
    params: {
      q: '',
      page: 1,
      per_page: 10,
      order_by: 'tanggal',
      sort: 'desc'
    },
    // custom for this store
    flags: [
      { nama: 'Dinas Luar', value: 'DL' },
      { nama: 'Sakit', value: 'SAKIT' },
      { nama: 'Ijin', value: 'IJIN' },
      { nama: 'Cuti', value: 'CUTI' },
      { nama: 'Extra', value: 'EXTRA' }
    ],
    days: [
      { nama: 'Satu Hari', link: 'v1/libur/store', value: 'sehari' },
      { nama: 'Lebih', link: 'v1/libur/range', value: 'lebih' }
    ],
    day: { nama: 'Satu Hari', link: 'v1/libur/store', value: 'sehari' },
    bulans: [
      { nama: 'Januari', value: '01' },
      { nama: 'Februari', value: '02' },
      { nama: 'Maret', value: '02' },
      { nama: 'April', value: '04' },
      { nama: 'Mei', value: '05' },
      { nama: 'Juni', value: '06' },
      { nama: 'Juli', value: '07' },
      { nama: 'Agustus', value: '08' },
      { nama: 'September', value: '09' },
      { nama: 'Oktober', value: '10' },
      { nama: 'November', value: '11' },
      { nama: 'Desember', value: '12' }
    ],
    rangeDay: 'sehari',
    image: '',
    ext: '',
    expand: false
  }),
  actions: {
    resetFORM() {
      this.form = {}
      const columns = [
        'user_id',
        'tanggal',
        'flag',
        'alasan'
      ]

      for (let i = 0; i < columns.length; i++) {
        this.setForm(columns[i], null)
      }
      this.setForm('tanggals', [])
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
      this.columns = ['nama', 'tanggal', 'flag', 'alasan', 'image']
      // if (!payload) return
      // const thumb = payload.map((x) => Object.keys(x))
      // this.columns = thumb[0]
      // this.columns.sort()
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
      this.edited = false
      this.isOpen = !this.isOpen
    },
    editData(val) {
      this.edited = true
      const keys = Object.keys(val)
      keys.forEach((key, index) => {
        this.setForm(key, val[key])
      })
      // console.log('edit', val)
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
      this.getDataTable()
    },
    // custom for this store
    searchUser(val) {
      // console.log('search user', val)
      this.setParam('q', val)
      this.setParam('order_by', 'created_at')
      this.getUser()
    },
    setExpand() {
      this.expand = !this.expand
    },
    setRangeDay(val) {
      const temp = this.days.filter(d => {
        return d.value === val
      })
      this.day = temp[0]
      // console.log('hari', temp)
      // console.log(val)
    },
    // api related function
    // get data tabel
    getDataTable() {
      this.loading = true
      const params = { params: this.params }
      return new Promise((resolve, reject) => {
        api
          .get('v1/libur/index', params)
          .then((resp) => {
            this.loading = false
            this.items = resp.data.data
            this.items.forEach(data => {
              if (data.image.length) {
                const temp = data.image.split('.')
                console.log('data', data)
                console.log('image ', temp)
                console.log('image ', temp[1])
                data.fileType = temp[temp.length - 1]
                data.disp = true
              }
            })
            this.setColumns(resp.data.data)
            this.meta = resp.data
            this.resetFORM()
            console.log('data table', this.items)
            resolve(resp)
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    },
    getDataTablePage() {
      this.loading = true
      this.params.page = 1
      const params = { params: this.params }
      return new Promise((resolve, reject) => {
        api
          .get('v1/libur/index', params)
          .then((resp) => {
            this.loading = false
            // console.log('data table', resp.data)
            this.items = resp.data.data
            this.setColumns(resp.data.data)
            this.meta = resp.data
            this.resetFORM()
            resolve(resp)
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    },
    getUser() {
      this.loading = true
      const params = { params: this.params }
      return new Promise((resolve, reject) => {
        api
          .get('v1/user/user', params)
          .then((resp) => {
            this.loading = false
            // console.log('store user', resp.data)
            this.users = resp.data.data
            resolve(resp)
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    },
    toSaveForm() {
      if (this.rangeDay === 'sehari') {
        this.saveForm().then(() => {
          this.setOpen()
        })
      } else {
        this.form.tanggals.forEach(tanggal => {
          this.setForm('tanggal', tanggal)
          this.saveForm()
        })
        this.setOpen()
      }
    },
    saveForm() {
      this.loading = true
      const data = new FormData()
      data.append('user_id', this.form.user_id)
      data.append('tanggal', this.form.tanggal)
      data.append('flag', this.form.flag)
      if (this.form.alasan) data.append('alasan', this.form.alasan)
      if (this.form.image) data.append('gambar', this.form.image)
      // console.log('image', this.form)
      return new Promise((resolve, reject) => {
        api
          .post('v1/libur/store', data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then((resp) => {
            // console.log('save libur', resp)
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
      console.log('id', this.deleteId)
      const send = { id: this.deleteId }
      return new Promise(resolve => {
        api.post('v1/libur/delete', send)
          .then(resp => {
            console.log('delete ', resp)
            this.getDataTable()
            this.loading = false
            resolve(resp)
          })
          .catch(() => { this.loading = false })
      })
    }
  }
})
