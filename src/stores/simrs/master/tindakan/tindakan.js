import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifSuccess } from 'src/modules/utils'

export const useMasterTindakanJsJpStore = defineStore('master_tindakan_js_jp', {
  state: () => ({
    isOpen: false,
    edit: false,
    loading: false,
    items: [],
    meta: {},
    params: {
      nmtindakan: '',
      per_page: 10,
      page: 1
    },
    form: {},
    columns: [
      'kode',
      'nama',
      'kelas3',
      'kelas2',
      'kelas1',
      'utama',
      'vip',
      'vvip'
    ]
  }),
  actions: {
    resetForm () {
      this.setForm('kdtindakan', '')
      this.setForm('nmtindakan', '')
      const col = [
        'js3',
        'jp3',
        'tarif3',
        'tarif2',
        'tarif1',
        'tarifutama',
        'tarifvip',
        'tarifvvip',
        'habispake3',
        'js2',
        'jp2',
        'habispake2',
        'js1',
        'jp1',
        'habispake1',
        'jsutama',
        'jputama',
        'habispakeutama',
        'jsvip',
        'jpvip',
        'habisvip',
        'jsvvip',
        'jpvvip',
        'habispakevvip'
      ]
      col.forEach(a => {
        this.setForm(a, 0)
      })
    },
    setOpen () {
      this.isOpen = !this.isOpen
    },
    setForm (key, val) {
      this.form[key] = val
    },
    setParams (key, val) {
      this.params[key] = val
    },
    setPage (payload) {
      this.params.page = payload
      this.getDataTable()
    },
    setPerPage (payload) {
      this.params.per_page = payload
      this.params.page = 1
      this.getDataTable()
    },
    refreshTable () {
      this.params.page = 1
      this.getDataTable()
    },
    setSearch (payload) {
      this.params.nmtindakan = payload
      this.params.page = 1
      this.getDataTable()
    },
    newData (payload) {
      this.edit = false
      this.resetForm()
      this.setOpen()
      this.setForm('flag', 'baru')
      console.log('new data', payload)
    },
    editData (payload) {
      this.edit = true
      this.setOpen()
      const key = Object.keys(payload)
      key.forEach(a => {
        this.setForm(a, payload[a])
        // console.log('edit data', payload[a])
      })

      this.setForm('flag', 'edit')
      // console.log('edit data', key)
    },
    deletesData (payload) {
      console.log('delete data', payload)
      const data = {
        kdtindakan: payload.kdtindakan
      }
      this.deleteData(data)
    },
    getInitialData () {
      this.getDataTable()
    },
    // api related function
    async getDataTable () {
      this.loading = true
      const param = { params: this.params }
      await api.get('v1/simrs/master/listtindakan', param)
        .then(resp => {
          this.loading = false
          console.log('resp tindakan', resp.data)
          this.meta = resp.data
          this.items = resp.data.data
        })
        .catch(() => { this.loading = false })
    },
    async saveForm () {
      this.loading = true
      await api.post('v1/simrs/master/simpanmastertindakan', this.form)
        .then(resp => {
          this.loading = false
          console.log('resp tindakan', resp.data)
          this.setOpen()
          this.getDataTable()
          notifSuccess(resp)
        })
        .catch(() => { this.loading = false })
    },
    async deleteData (val) {
      this.loading = true
      await api.post('v1/simrs/master/hapusmastertindakan', val)
        .then(resp => {
          this.loading = false
          console.log('hapus tindakan', resp.data)
          this.getDataTable()
          notifSuccess(resp)
        })
        .catch(() => { this.loading = false })
    }
  }
})
