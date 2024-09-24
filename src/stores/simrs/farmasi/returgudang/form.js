import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { notifSuccess } from 'src/modules/utils'

export const useReturGudangFormStore = defineStore('form_retur_gudang', {
  state: () => ({
    loading: false,
    form: {
      gudang: '',
      depo: '',
      no_retur: '',
      tgl_retur: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      details: [
        // {
        //   alasan: 'nwewsasdas',
        //   jumlah_retur: 100,
        //   kd_obat: '0001320-FAR',
        //   nama_obat: 'ABACAVIR (PROGRAM) 300 MG TABLET'
        // },
        // {
        //   alasan: 'sadloiihkj,sa',
        //   jumlah_retur: 100,
        //   kd_obat: '0000283-FAR',
        //   nama_obat: 'ACARBOSE 50 MG TABLET'
        // },
        // {
        //   alasan: 'sdasds==dsakjhaasdas',
        //   jumlah_retur: 100,
        //   kd_obat: '0000284-FAR',
        //   nama_obat: 'ACARBOSE 100 MG TABLET'
        // }
      ]
    },
    dispForm: {
      kd_obat: '',
      alasan: '',
      jumlah_retur: 0

    },
    gudangs: [
      { nama: 'Gudang Farmasi ( Floor Stok )', kode: 'Gd-03010100' },
      { nama: 'Gudang Farmasi ( Kamar Obat )', kode: 'Gd-05010100' }
    ],
    obats: [],
    model: null
  }),
  actions: {
    setForm (key, val) {
      this.form[key] = val
    },
    setDispForm (key, val) {
      this.dispForm[key] = val
    },
    resetObat () {
      this.setDispForm('kd_obat', null)
      this.setDispForm('jumlah_retur', 0)
      this.setDispForm('alasan', '')
      this.model = null
    },
    resetForm () {
      this.form = {
        gudang: '',
        depo: '',
        no_retur: '',
        tgl_retur: date.formatDate(Date.now(), 'YYYY-MM-DD'),
        details: []
      }
    },
    getObat (val) {
      this.obats = []
      this.loadingGetObat = true
      const param = {
        params: {
          q: val,
          kdruang: this.form.depo,
          per_page: 10
        }
      }
      return new Promise(resolve => {
        api.get('v1/simrs/farmasinew/penerimaan/list-stok-sekarang', param)
          .then(resp => {
            this.loadingGetObat = false
            this.obats = resp?.data?.data ?? resp?.data
            resolve(resp)
          })
          .catch(() => {
            this.loadingGetObat = false
          })
      })
    },
    simpan () {
      this.loading = true
      return new Promise(resolve => {
        api.post('v1/simrs/penunjang/farmasinew/gudang/simpan-retur', this.form)
          .then(resp => {
            this.loading = false
            this.setForm('no_retur', resp?.data?.noretur)
            console.log('resp', resp?.data)

            notifSuccess(resp)
            resolve(resp)
          })
          .catch((err) => {
            this.loading = false
            const data = err?.response?.data?.data
            if (data?.length) {
              data.forEach(ite => {
                console.log(ite)
                const index = this.form.details.findIndex(f => f.kd_obat === ite?.det?.kd_obat)
                if (index >= 0) {
                  this.form.details[index].error = true
                  this.form.details[index].stok = ite?.jml
                }
              })
            }
          })
      })
    }
  }
})
