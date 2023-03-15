import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifSuccess } from 'src/modules/utils'

export const useTandaTanganStore = defineStore('tanda_tangan_store_form', {
  state: () => ({
    isOpen: false,
    loading: false,
    loadingPtk: false,
    loadingPpk: false,
    loadingGudang: false,
    loadingMengetahui: false,
    data: {},
    form: {
      ptk: null,
      ppk: null,
      gudang: null,
      mengetahui: null,
      text: ''
    },
    optionPTK: [],
    optionPPK: [],
    optionGudang: [],
    optionMengetahui: [],
    optionTT: [
      { nama: 'none', value: null },
      { nama: 'PTK', value: 'ptk' },
      { nama: 'PPK', value: 'ppk' },
      { nama: 'Gudang', value: 'gudang' },
      { nama: 'Mengetahui', value: 'mengetahui' },
      { nama: 'Lainnya', value: 'text' }
    ],
    tt: {
      kanan: null,
      kiri: null,
      tengah: null
    },
    kanan: '',
    kiri: '',
    tengah: '',
    onKanan: {},
    onKiri: {},
    onTengah: {}
  }),
  actions: {
    setForm(key, val) {
      this.form[key] = val
    },
    setOpen() {
      this.isOpen = !this.isOpen
    },
    kananSelected(val) {
      if (val !== null) {
        let data = {}
        if (val !== 'text') {
          data = this.data[val]
          const anu = this.optionTT.filter(tt => tt.value === val)
          data.acr = val === 'ptk' ? 'Pejabat Teknis Kegiatan' : (val === 'ppk' ? 'Pejaban Penandatangan Kontrak' : (val === 'mengetahui' ? '' : anu[0].nama))
          data.ada = true
        } else {
          data.ada = false
          data.acr = this.data[val]
        }
        this.onKanan = data
        console.log('kanan', data)
      } else {
        this.onKanan = {}
      }
    },
    kiriSelected(val) {
      if (val !== null) {
        let data = {}
        if (val !== 'text') {
          data = this.data[val]
          const anu = this.optionTT.filter(tt => tt.value === val)
          data.acr = val === 'ptk' ? 'Pejabat Teknis Kegiatan' : (val === 'ppk' ? 'Pejaban Penandatangan Kontrak' : (val === 'mengetahui' ? '' : anu[0].nama))
          data.ada = true
        } else {
          data.ada = false
          data.acr = this.data[val]
        }
        this.onKiri = data
        console.log('kiri', data)
      } else {
        this.onKiri = {}
      }
    },
    tengahSelected(val) {
      if (val !== null) {
        let data = {}
        if (val !== 'text') {
          data = this.data[val]
          const anu = this.optionTT.filter(tt => tt.value === val)
          data.acr = val === 'ptk' ? 'Pejabat Teknis Kegiatan' : (val === 'ppk' ? 'Pejaban Penandatangan Kontrak' : anu[0].nama)
          data.ada = true
        } else {
          data.ada = false
          data.acr = this.data[val]
        }
        this.onTengah = data
        console.log('kiri', data)
      } else {
        this.onTengah = {}
      }
    },
    ptkSelected(val) {
      this.setForm('ptk', val)
    },
    ppkSelected(val) {
      this.setForm('ppk', val)
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
      this.getDataPpk()
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
            // if (Object.getPrototypeOf(this.data).constructor.name === 'Object') {
            if (this.data) {
              // ptk
              // console.log('ptk', Object.getPrototypeOf(this.data.ptk).constructor.name === 'Object')
              // if (Object.getPrototypeOf(this.data.ptk).constructor.name === 'Object') {
              if (this.data.ptk) {
                this.setForm('ptk', this.data.ptk.id)
                const anu = this.optionPTK.filter(a => a.id === this.data.ptk.id)
                if (!anu.length) {
                  this.optionPTK.push(this.data.ptk)
                }
              }
              // ppk
              // console.log('ppk', Object.getPrototypeOf(this.data.ppk).constructor.name === 'Object')
              // if (Object.getPrototypeOf(this.data.ppk).constructor.name === 'Object') {
              if (this.data.ppk) {
                this.setForm('ppk', this.data.ppk.id)
                const anu = this.optionPPK.filter(a => a.id === this.data.ppk.id)
                if (!anu.length) {
                  this.optionPPK.push(this.data.ppk)
                }
              }
              // gudang
              if (this.data.gudang) {
                this.setForm('gudang', this.data.gudang.id)
                const anu = this.optionGudang.filter(a => a.id === this.data.gudang.id)
                if (!anu.length) {
                  this.optionGudang.push(this.data.gudang)
                }
              }
              // mengetahui
              if (this.data.mengetahui) {
                this.setForm('mengetahui', this.data.mengetahui.id)
                const anu = this.optionMengetahui.filter(a => a.id === this.data.mengetahui.id)
                if (!anu.length) {
                  this.optionMengetahui.push(this.data.mengetahui)
                }
              }
              // mengetahui
              if (this.data.text !== null) {
                this.setForm('text', this.data.text)
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
    getDataPpk(val) {
      console.log('cari ptk', val)
      this.loadingPpk = true
      const params = {
        params: {
          ppk: val
        }
      }
      return new Promise(resolve => {
        api.get('v1/tandatangan/get-ppk', params)
          .then(resp => {
            this.loadingPpk = false
            console.log('ppk', resp)
            this.optionPPK = resp.data
            resolve(resp)
          })
          .catch(() => {
            this.loadingPpk = false
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
