import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { useTabelObatMauDibeliStore } from './tabelObat'

export const useRencanaPemesananObatStore = defineStore('store_rencana_pemesanan_obat', {
  state: () => ({
    loading: false,
    items: [],
    param: {
      no_rencbeliobat: '',
      per_page: 10,
      tanggal: date.formatDate(Date.now(), 'YYYY-MM-DD')
    },
    form: {
      tanggal: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      no_rencbeliobat: ''
    },
    disp: {
      tanggal: date.formatDate(Date.now(), 'DD MMMM YYYY')
    },
    columns: [],
    columnHide: ['id', 'created_at', 'updated_at', 'deleted_at']

  }),
  actions: {
    setForm(key, val) {
      this.form[key] = val
    },
    setParam(key, val) {
      this.param[key] = val
    },
    refreshForm() {
      this.form = {
        tanggal: date.formatDate(Date.now(), 'YYYY-MM-DD'),
        no_rencbeliobat: ''
      }
      this.getInitialData()
      const tabel = useTabelObatMauDibeliStore()
      tabel.getInitialData()
    },

    getInitialData() {
      this.cariRencanaBeli()
    },
    //
    cariRencanaBeli() {
      this.loading = true
      console.log('rencana beli ', this.param)
      const params = { params: this.param }
      return new Promise(resolve => {
        api.get('v1/simrs/farmasinew/listrencanabeli', params)
          .then(resp => {
            this.loading = false
            console.log('list rencana', resp)
            resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    },
    enterCariRencanaBeli(evt) {
      const val = evt.target.value
      this.setParam('no_rencbeliobat', val)
      this.cariRencanaBeli()
    },
    kirimRencana(val) {
      console.log('form ', this.form)
      console.log('kirim ', val)
      this.setForm('kd_obat', val.kd_obat)
      const data = {
        norencanabeliobat: this.form.no_rencbeliobat,
        kdobat: val.kd_obat,
        stok_real_gudang: val.stokGudang,
        stok_real_rs: val.stokRS,
        stok_max_rs: val.stokMaxRS,
        jumlah_bisa_dibeli: val.bisaBeli,
        tgl_stok: this.form.tanggal,
        pabrikan: 'wew',
        pbf: 'wewewew',
        jumlahdpesan: val.jumlahBeli
      }
      console.log('data kirim', data)
      this.loading = true
      return new Promise(resolve => {
        api.post('v1/simrs/farmasinew/simpanperencanaanbeliobat', data)
          .then(resp => {
            this.loading = false
            console.log('resp simpan rencana', resp)
            if (resp.data) {
              if (resp.data.notrans) {
                this.setForm('no_rencbeliobat', resp.data.notrans)
              }
            }
            resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    }
  }
})
