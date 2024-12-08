import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'

export const useSPJOPNameStore = defineStore('spjopname', {
  state: () => ({
    loading: false,
    loadingSp: false,
    loadingBa: false,
    items: [],
    itemPerDepos: [],
    pelaksanas: [],
    pegawaies: [],
    pegawai: {},
    params: {
      q: '',
      page: 1,
      per_page: 10,
      tahun: date.formatDate(Date.now(), 'YYYY'),
      bulan: date.formatDate(Date.now(), 'MM')
    },
    form: {
      no_sp: '',
      no_ba: '',
      tgl_ba: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      tgl_mulai: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      tgl_selesai: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      tglopname: null,
      user_uang: '',
      user_farmasi: '',
      user_pj_so: '',
      pelaksanas: []
    },
    formSp: {
      no_surat: ''
    },
    formBa: {
      no_surat: ''
    },
    periodeOpname: {
      tgl_ba: date.formatDate(Date.now(), 'DD MMMM YYYY'),
      tgl_mulai: date.formatDate(Date.now(), 'DD MMMM YYYY'),
      tgl_selesai: date.formatDate(Date.now(), 'DD MMMM YYYY')
    },
    bulans: [
      { nama: 'January', value: '01' },
      { nama: 'February', value: '02' },
      { nama: 'Maret', value: '03' },
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
    gudangs: [
      { nama: 'Gudang Farmasi ( Kamar Obat )', kode: 'Gd-05010100', opname: [] },
      { nama: 'Gudang Farmasi (Floor Stok)', kode: 'Gd-03010100', opname: [] },
      { nama: 'Depo Rawat Jalan', kode: 'Gd-05010101', opname: [] },
      { nama: 'Depo Rawat inap', kode: 'Gd-04010102', opname: [] },
      { nama: 'Depo IGD', kode: 'Gd-02010104', opname: [] },
      { nama: 'Depo OK', kode: 'Gd-04010103', opname: [] },
      { nama: 'Floor Stock 1 (AKHP)', kode: 'Gd-03010101', opname: [] }
    ],
    KaUang: {},
    KaFarmasi: {}
  }),
  actions: {
    setParams (key, val) {
      this.params[key] = val
    },
    getInitialData () {
      this.getKepala()
      this.getListOpname()
    },
    getListOpname () {
      this.loading = true
      const param = { params: this.params }
      return new Promise(resolve => {
        api.get('v1/simrs/farmasinew/spj/get-opname', param)
          .then(resp => {
            this.loading = false
            // console.log('resp', resp)
            this.items = resp?.data?.data
            if (resp?.data?.tglopname) this.form.tglopname = resp?.data?.tglopname
            else this.form.tglopname = null
            if (this.items?.length > 0) {
              this.gudangs.forEach(gd => {
                gd.opname = this.items.filter(i => i.kdruang === gd.kode)
              })
            }
            else {
              this.gudangs.forEach(item => {
                item.opname = []
              })
            }
            console.log('gud', this.gudangs, this.items)
            resolve(resp)
          })
          .catch(() => { this.loading = false })
      })
    },
    getListOpnamePerDepos () {
      this.loading = true
      const param = { params: this.params }
      return new Promise(resolve => {
        api.get('v1/simrs/farmasinew/spj/get-opname-depo', param)
          .then(resp => {
            this.loading = false
            console.log('resp', resp)
            this.items = resp?.data?.data
            resolve(resp)
          })
          .catch(() => { this.loading = false })
      })
    },
    getKepala () {
      this.loading = true
      return new Promise(resolve => {
        api.get('v1/simrs/farmasinew/spj/get-kepala')
          .then(resp => {
            this.loading = false
            console.log('resp', resp)

            this.KaFarmasi = resp?.data?.farmasi
            this.KaUang = resp?.data?.keuangan
            this.pegawaies = resp?.data?.pegawai
            this.pelaksanas = resp?.data?.pelaksanas
            if (this.pelaksanas.length > 0 && this.form.pelaksanas.length <= 0) {
              this.pelaksanas.forEach(item => {
                this.form.pelaksanas.push(item?.id)
              })
            }
            if (this.KaFarmasi) {
              this.form.user_farmasi = this.KaFarmasi?.id
            }
            if (this.KaUang) {
              this.form.user_uang = this.KaUang?.id
            }
            console.log('pel', this.pelaksanas, this.form.pelaksanas)

            resolve(resp)
          })
          .catch(() => { this.loading = false })
      })
    },
    simpanPernyataan () {
      this.loadingSp = true
      return new Promise(resolve => {
        api.post('v1/simrs/farmasinew/spj/simpan-pernyataan', this.form)
          .then(resp => {
            this.loadingSp = false
            resolve(resp)
          })
          .catch(() => { this.loadingSp = false })
      })
    },
    simpanBA () {
      this.loadingBa = true
      return new Promise(resolve => {
        api.post('v1/simrs/farmasinew/spj/simpan-ba', this.form)
          .then(resp => {
            this.loadingBa = false
            resolve(resp)
          })
          .catch(() => { this.loadingBa = false })
      })
    }

  }
})
