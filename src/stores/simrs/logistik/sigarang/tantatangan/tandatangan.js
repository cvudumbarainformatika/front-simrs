import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifSuccess } from 'src/modules/utils'

export const useTandaTanganStore = defineStore('tanda_tangan_store_form', {
  state: () => ({
    isOpen: false,
    loading: false,
    loadingPtk: false,
    loadingGudang: false,
    loadingMengetahui: false,
    data: {},
    form: {
      ptk: null,
      gudang: null,
      mengetahui: null
    },
    optionPTK: [],
    optionGudang: [],
    optionMengetahui: []
  }),
  actions: {
    setForm(key, val) {
      this.form[key] = val
    },
    setOpen() {
      this.isOpen = !this.isOpen
    },
    ptkSelected(val) {
      this.setForm('ptk', val)
    },
    gudangSelected(val) {
      this.setForm('gudang', val)
    },
    mengetahuiSelected(val) {
      this.setForm('mengetahui', val)
    },
    // initial data
    getInitialData() {
      this.getDataPtk()
      this.getDataGudang()
      this.getDataMengetahui().then(() => {
        this.getDataIndex()
      })
    },
    getDataIndex() {
      this.loading = false
      return new Promise(resolve => {
        api.get('v1/tandatangan/index')
          .then(resp => {
            this.loading = false
            this.data = resp.data
            console.log('data length', Object.getPrototypeOf(this.data.ptk).constructor.name)
            if (Object.getPrototypeOf(this.data).constructor.name === 'Object') {
              // ptk
              console.log('ptk', Object.getPrototypeOf(this.data.ptk).constructor.name === 'Object')
              if (Object.getPrototypeOf(this.data.ptk).constructor.name === 'Object') {
                this.setForm('ptk', this.data.ptk.id)
                const anu = this.optionPTK.filter(a => a.id === this.data.ptk.id)
                if (!anu.length) {
                  this.optionPTK.push(this.data.ptk)
                }
              }
              // gudang
              if (Object.getPrototypeOf(this.data.gudang).constructor.name === 'Object') {
                this.setForm('gudang', this.data.gudang.id)
                const anu = this.optionGudang.filter(a => a.id === this.data.gudang.id)
                if (!anu.length) {
                  this.optionGudang.push(this.data.gudang)
                }
              }
              // mengetahui
              if (Object.getPrototypeOf(this.data.mengetahui).constructor.name === 'Object') {
                this.setForm('mengetahui', this.data.mengetahui.id)
                const anu = this.optionMengetahui.filter(a => a.id === this.data.mengetahui.id)
                if (!anu.length) {
                  this.optionMengetahui.push(this.data.mengetahui)
                }
              }
            }
            console.log('form', this.form)
            resolve(resp)
          })
      })
    },
    getDataPtk(val) {
      console.log('cari ptk', val)
      this.loadingPtk = true
      const params = {
        params: {
          ptk: val
        }
      }
      return new Promise(resolve => {
        api.get('v1/tandatangan/get-ptk', params)
          .then(resp => {
            this.loadingPtk = false
            console.log('ptk', resp)
            this.optionPTK = resp.data
            resolve(resp)
          })
          .catch(() => {
            this.loadingPtk = false
          })
      })
    },
    getDataGudang(val) {
      console.log('cari gudang', val)
      this.loadingGudang = true
      const params = {
        params: {
          gudang: val
        }
      }
      return new Promise(resolve => {
        api.get('v1/tandatangan/get-gudang', params)
          .then(resp => {
            this.loadingGudang = false
            console.log('gudang', resp)
            this.optionGudang = resp.data
            resolve(resp)
          })
          .catch(() => {
            this.loadingGudang = false
          })
      })
    },
    getDataMengetahui(val) {
      console.log('cari mengetahui', val)
      this.loadingMengetahui = true
      const params = {
        params: {
          tahu: val
        }
      }
      return new Promise(resolve => {
        api.get('v1/tandatangan/get-mengetahui', params)
          .then(resp => {
            this.loadingMengetahui = false
            console.log('mengetahui', resp)
            this.optionMengetahui = resp.data
            resolve(resp)
          })
          .catch(() => {
            this.loadingMengetahui = false
          })
      })
    },
    saveForm() {
      this.loading = true
      return new Promise(resolve => {
        api.post('v1/tandatangan/store', this.form)
          .then(resp => {
            this.loading = false
            console.log('sved ', resp.data)
            notifSuccess(resp)
            this.getDataIndex()
            this.setOpen()
            resolve(resp)
          })
          .catch(() => { this.loading = false })
      })
    }
  }
})
