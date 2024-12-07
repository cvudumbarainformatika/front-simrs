import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'

export const useSPJOPNameStore = defineStore('spjopname', {
  state: () => ({
    loading: false,
    items: [],
    pelaksanas: [],
    pegawaies: [],
    pegawai: {},
    params: {
      q: '',
      page: 1,
      per_page: 10
    },
    form: {
      no_sp: '',
      no_ba: '',
      tgl_ba: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      tgl_mulai: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      tgl_selesai: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      tglopname: '',
      user_uang: '',
      user_farmasi: '',
      uer_pj_so: '',
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
    KaUang: {},
    KaFarmasi: {}
  }),
  actions: {
    setParams (key, val) {
      this.params[key] = val
    },
    getInitialData () {
      this.getKepala()
    },
    getKepala () {
      return new Promise(resolve => {
        api.get('v1/simrs/farmasinew/spj/get-kepala')
          .then(resp => {
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
            console.log('pel', this.pelaksanas, this.form.pelaksanas)

            resolve(resp)
          })
      })
    }

  }
})
