import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { dateDbFormat } from 'src/modules/formatter'
import { notifSuccess } from 'src/modules/utils'

export const useListPemakaianRuanganStore = defineStore('list_pemakaian_ruangan_farmasi', {
  state: () => ({
    isOpen: false,
    loading: false,
    loadingSelesai: false,
    loadingHead: false,
    loadingRinci: false,
    meta: {},
    items: [],
    params: {
      q: '',
      page: 1,
      per_page: 10,
      kdruang: '',
      flag: ['', '1'],
      to: dateDbFormat(new Date()),
      from: dateDbFormat(new Date())
    },
    dataToPrint: {}
  }),
  actions: {
    setParam (key, val) {
      this.params[key] = val
    },
    setSearch (val) {
      this.setParam('q', val)
      this.setParam('page', 1)
      this.getData()
    },
    setPerPage (val) {
      this.setParam('per_page', val)
      this.setParam('page', 1)
      this.getData()
    },
    setPage (val) {
      this.setParam('page', val)
      this.getData()
    },
    refresh () {
      this.setParam('page', 1)
      this.getData()
    },
    setPeriodik (val) {
      this.params.page = 1
      const { to, from } = val
      this.params.to = to
      this.params.from = from
      this.getData()
    },
    setFlag (val) {
      // console.log('flag', val)
      this.setParam('flag', val)
      this.setParam('page', 1)
      this.getData()
    },
    getInitialData () {
      this.getData()
    },
    async getData () {
      const param = { params: this.params }
      this.loading = true
      await api.get('v1/simrs/penunjang/farmasinew/ruangan/get-pemakaian-ruangan', param)
        .then(resp => {
          this.loading = false
          console.log('stok ruangan', resp.data)
          this.items = resp?.data?.data ?? resp?.data
          this.meta = resp?.data?.data ? resp?.data : {}
          // this.metanidata()
        })
        .catch(() => { this.loading = false })
    },
    selesaiPemakaian (val) {
      const formData = new FormData()
      formData.append('nopemakaian', val?.nopemakaian)
      val.loading = true
      this.loadingSelesai = true
      return new Promise(resolve => {
        api.post('v1/simrs/penunjang/farmasinew/ruangan/selesai', formData)
          .then(resp => {
            this.loadingSelesai = false
            val.loading = false
            console.log('selesai pemakaian ', resp?.data)
            notifSuccess(resp)
            this.getData()
            resolve(resp)
          })
          .catch(() => {
            this.loadingSelesai = false
            val.loading = false
          })
      })
    },
    hapusHead (item) {
      this.loadingHead = true
      item.loading = true
      return new Promise(resolve => {
        api.post('v1/simrs/penunjang/farmasinew/ruangan/hapus-header', item)
          .then(resp => {
            this.loadingHead = false
            item.loading = false
            console.log('hapus head', resp?.data)
            this.getData()
            notifSuccess(resp)
            resolve(resp)
          })
          .catch(() => {
            this.loadingHead = false
            item.loading = false
          })
      })
    },
    hapusRinci (item) {
      console.log('hapus rinci', item)
      this.loadingRinci = true
      item.loading = true
      return new Promise(resolve => {
        api.post('v1/simrs/penunjang/farmasinew/ruangan/hapus-rinci', item)
          .then(resp => {
            this.loadingRinci = false
            item.loading = false
            console.log('hapus rinci', resp?.data)
            const head = this.items.find(it => it.nopemakaian === item.nopemakaian)
            if (head && resp?.data?.adaRinci?.length > 0) {
              const index = head?.rinci.findIndex(a => a.kd_obat === item.kd_obat)
              console.log('index', index)
              if (index >= 0) {
                head.rinci.splice(index, 1)
              }
            }
            if (resp?.data?.adaRinci?.length <= 0) {
              this.getData()
            }
            notifSuccess(resp)
            resolve(resp)
          })
          .catch(() => {
            this.loadingRinci = false
            item.loading = false
          })
      })
    }
  }
})
