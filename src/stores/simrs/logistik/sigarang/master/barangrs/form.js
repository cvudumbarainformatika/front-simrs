import { defineStore } from 'pinia'
import { findWithAttr, notifSuccess } from 'src/modules/utils'
import { api } from 'boot/axios'
import { useMasterBarangRSTable } from './table'

export const useMasterBarangRSForm = defineStore('master_barangrs_form', {
  state: () => ({
    isOpen: false,
    loadingCount: false,
    form: {
      nama: null,
      kode: null,
      pengali: 1,
      kode_satuan: null,
      kode_depo: null,
      kode_108: null,
      kode_50: null,
      kode_satuan_kecil: null,
      ssh: 'non-ssh',
      tipe: 'kering'
    },
    input_kode: '',
    loading: false,
    satuans: [],
    sshOption: [
      { nama: 'SSH', value: 'ssh' },
      { nama: 'Non-SSH', value: 'non-ssh' }
    ],
    tipeOption: [
      { nama: 'Basah', value: 'basah' },
      { nama: 'Kering', value: 'kering' }
    ],
    depos: [],
    barang108s: [],
    rekening50s: [],
    loading108: false,
    loading50: false,
    edited: false,
    autocompleteParams: {
      per_page: 10,
      page: 1,
      q: ''
    },
    autocompleteParam50s: {
      per_page: 10,
      page: 1,
      q: ''
    }

  }),
  actions: {
    // local related actions
    resetFORM () {
      this.form = {}
      const columns = [
        'nama',
        'kode',
        'kode_satuan',
        'kode_depo',
        'kode_50',
        'kode_108',
        'kode_satuan_kecil'
      ]
      for (let i = 0; i < columns.length; i++) {
        this.setForm(columns[i], null)
      }
      this.setForm('ssh', 'non-ssh')
      this.setForm('tipe', 'kering')
      this.setForm('pengali', 1)
    },
    setToday () {
      const date = new Date()
      const year = date.getFullYear()
      const month = ('0' + (date.getMonth() + 1)).slice(-2)
      const day = ('0' + date.getDate()).slice(-2)
      const formatDb = year + '-' + month + '-' + day
      this.form.tanggal_lahir = formatDb
    },
    setKode (kode) {
      // console.log('kode', kode)
      if (!this.edited) {
        const anu = this.input_kode === '' ? this.input_kode.split('') : false
        const temp = anu || kode.split('')
        const apem = temp.length
        apem >= 5 ? this.form.kode = 'RS-' + this.input_kode
          : apem === 4 ? this.form.kode = 'RS-0' + this.input_kode
            : apem === 3 ? this.form.kode = 'RS-00' + this.input_kode
              : apem === 2 ? this.form.kode = 'RS-000' + this.input_kode
                : apem === 1 ? this.form.kode = 'RS-0000' + this.input_kode : this.form.kode = 'RS-00000'
      }
      // console.log('apem', apem)
    },
    setForm (nama, val) {
      this.form[nama] = val
    },
    setOpen () {
      this.isOpen = !this.isOpen
    },
    newData () {
      this.resetFORM()
      this.edited = false
      this.isOpen = !this.isOpen
      this.getIndexNumber()
    },
    editData (val) {
      this.input_kode = ''
      this.edited = true
      const keys = Object.keys(val)
      keys.forEach((key, index) => {
        this.setForm(key, val[key])
      })
      console.log('edit', val)
      const index108 = findWithAttr(this.barang108s, 'kode', val.barang108.kode)
      const index50 = findWithAttr(this.rekening50s, 'kode', val.rekening50.kode)
      // console.log('index 108 ', index108, index50)
      if (index108 < 0) {
        this.barang108s.push(val.barang108)
      }
      if (index50 < 0) {
        this.rekening50s.push(val.rekening50)
      }
      // console.log('val barnag ', val.barang108, val.rekening50)
      // const temp108=this.barang108s
      // kecuali yang ada di object user
      this.isOpen = !this.isOpen
    },
    getInitialData() {
      this.getDataSatuans()
      this.getData108s()
      this.getRekening50()
      this.getDataDepos()
    },
    // api related actions
    // ambil data satuan
    getDataSatuans () {
      return new Promise(resolve => {
        api.get('v1/satuan/satuan')
          .then(resp => {
            if (resp.status === 200) {
              // console.log('satuan', resp.data)
              this.satuans = resp.data
            }
          })
      })
    },
    getIndexNumber() {
      this.loadingCount = true
      return new Promise(resolve => {
        api.get('v1/barangrs/count-index')
          .then(resp => {
            this.loadingCount = false
            // console.log('count barang', resp.data)
            this.input_kode = resp.data
            setTimeout(() => {
              this.setKode(String(resp.data))
            }, 300)

            resolve(resp)
          })
          .catch(() => { this.loadingCount = false })
      })
    },
    // ambil data depo
    getDataDepos () {
      if (!this.depos.length) {
        return new Promise(resolve => {
          api.get('v1/gudang/depo')
            .then(resp => {
              if (resp.status === 200) {
                // console.log('Depos', resp.data)
                this.depos = resp.data
              }
            })
        })
      }
    },
    // ambil data barang108
    getData108s () {
      const param = { params: this.autocompleteParams }
      // loading diambil dari tambah baru barang 108
      if (!this.barang108s.length || this.loading108) {
        return new Promise(resolve => {
          // api.get('v1/barang108/barang108')
          api.get('v1/barang108/index', param)
            .then(resp => {
              if (resp.status === 200) {
                // console.log('108', resp.data.data)
                // this.barang108s = resp.data
                this.barang108s = resp.data.data
              }
              this.loading108 = false
            }).catch(() => { this.loading108 = false })
        })
      }
    }, // ambil rekening 50
    getRekening50 () {
      const params = { params: this.autocompleteParam50s }
      return new Promise(resolve => {
        this.loading50 = true
        // api.get('v1/mapingbarang/maping', params)
        api.get('v1/rekening50/index', params)
          .then(resp => {
            // console.log('rekening 50', resp.data.data)
            this.rekening50s = resp.data.data
            // console.log(resp.data)
            this.loading50 = false
            resolve(resp)
          })
          .catch(() => { this.loading50 = false })
      })
    },
    // tambah
    saveForm () {
      this.loading = true
      return new Promise((resolve, reject) => {
        api
          .post('v1/barangrs/store-by-kode', this.form)
          .then((resp) => {
            // console.log('save data   ', resp)
            this.resetFORM()
            notifSuccess(resp)
            const table = useMasterBarangRSTable()
            table.getDataTable()
            this.loading = false
            this.isOpen = false
            resolve(resp)
          })
          .catch((err) => {
            this.isOpen = false
            this.loading = false
            reject(err)
          })
      })
    }
  }
})
