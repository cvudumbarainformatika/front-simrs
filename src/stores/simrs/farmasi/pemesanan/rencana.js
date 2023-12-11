import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { useTabelObatDirencanakaStore } from './tabelObatRencana'
import { notifErrVue, notifSuccess } from 'src/modules/utils'

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
    gudangs: [
      { nama: 'Gudang Farmasi ( Kamar Obat )', value: 'Gd-05010100' },
      { nama: 'Gudang Farmasi (Floor Stok)', value: 'Gd-03010100' }
    ],
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
    resetForm() {
      this.form = {
        tanggal: date.formatDate(Date.now(), 'YYYY-MM-DD'),
        no_rencbeliobat: ''
      }
      this.getInitialData()
      const tabel = useTabelObatDirencanakaStore()
      tabel.getInitialData()
    },
    gudangSelected(val) {
      this.setForm('kd_ruang', val)
      const tabel = useTabelObatDirencanakaStore()
      tabel.filterItem(val)
      console.log('gudang selected', val)
    },
    gudangDeleted() {
      this.setForm('kd_ruang', null)
      const tabel = useTabelObatDirencanakaStore()
      tabel.filterItem('')
      console.log('gudang deleteed', null)
    },
    getInitialData() {
      this.cariRencanaBeli()
    },
    //
    selesaiDanKunci() {
      this.loading = true
      const data = {
        no_rencbeliobat: this.form.no_rencbeliobat
      }
      return new Promise(resolve => {
        api.post('v1/simrs/farmasinew/kuncirencana', data)
          .then(resp => {
            this.loading = false
            this.resetForm()
            resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    },
    kunci(val) {
      this.loading = true
      const data = {
        no_rencbeliobat: val
      }
      const tabel = useTabelObatDirencanakaStore()
      return new Promise(resolve => {
        api.post('v1/simrs/farmasinew/kuncirencana', data)
          .then(resp => {
            this.loading = false
            tabel.getInitialData()
            resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    },
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
      if (!this.form.kd_ruang) return notifErrVue('Gudang tidak boleh kosong')
      const data = {
        norencanabeliobat: this.form.no_rencbeliobat,
        kd_ruang: this.form.kd_ruang,
        kdobat: val.kd_obat,
        stok_real_gudang: val.stokGudang,
        stok_real_rs: val.stokRS,
        stok_max_rs: val.stokMaxRS,
        jumlah_bisa_dibeli: val.bisaBeli,
        tgl_stok: this.form.tanggal,
        pabrikan: 'belum ada',
        pbf: 'belum tersedia',
        satuan_k: val.satuan_k,
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
            notifSuccess(resp)
            resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    }
  }
})
