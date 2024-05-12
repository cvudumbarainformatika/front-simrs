import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { useTabelObatDirencanakaStore } from './tabelObatRencana'
import { filterDuplicateArrays, notifErrVue, notifSuccess } from 'src/modules/utils'

export const useRencanaPemesananObatStore = defineStore('store_rencana_pemesanan_obat', {
  state: () => ({
    isOpen: false,
    loading: false,
    loadingRinci: false,
    items: [],
    rincis: {},
    obat: null,
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
    columnHide: ['id', 'created_at', 'updated_at', 'deleted_at'],
    viewrinci: {
      min: 0,
      max: 0,
      stok: 0
    },
    cetaks: []
  }),
  actions: {
    setForm(key, val) {
      this.form[key] = val
    },
    setParam(key, val) {
      this.param[key] = val
    },
    setOpen() {
      this.isOpen = true
    },
    setClose() {
      this.isOpen = false
      this.obat = null
    },

    resetForm() {
      const kodeGudang = this.form.kd_ruang
      this.form = {
        tanggal: date.formatDate(Date.now(), 'YYYY-MM-DD'),
        no_rencbeliobat: '',
        kd_ruang: kodeGudang
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
    parsingDataRinci(data) {
      console.log('max ', data)
      const rinc = []
      const mm = data?.viewrinciminmax?.map(x => x.kd_ruang)
      const st = data?.viewrincistok?.map(x => x.kdruang)
      const all = filterDuplicateArrays(mm.concat(st))
      if (all?.length) {
        all.forEach(a => {
          const max = data?.viewrinciminmax?.find(rm => rm.kd_ruang === a)
          const sto = data?.viewrincistok?.find(rm => rm.kdruang === a)
          const gud = max?.gudang?.nama ?? sto?.gudangdepo?.nama
          const ruang = max?.ruang?.uraian
          const temp = {
            kode_ruang: a,
            nama_ruang: gud ?? ruang,
            min: isNaN(parseFloat(max?.min)) ? 0 : parseFloat(max?.min),
            max: isNaN(parseFloat(max?.max)) ? 0 : parseFloat(max?.max),
            stok: isNaN(parseFloat(sto?.jumlah)) ? 0 : parseFloat(sto?.jumlah),
            nama_obat: ''
          }
          rinc.push(temp)
        })
      }

      this.rincis = rinc
      this.viewrinci.min = rinc.map(r => r.min).reduce((a, b) => a + b, 0)
      this.viewrinci.max = rinc.map(r => r.max).reduce((a, b) => a + b, 0)
      this.viewrinci.stok = rinc.map(r => r.stok).reduce((a, b) => a + b, 0)
      // console.log('mm ', mm)
      // console.log('st ', st)
      // console.log('all ', all)
      // console.log('rinci ', rinc)
    },
    getInitialData() {
      this.cariRencanaBeli()
    },
    getRinciMinmax(val) {
      this.obat = val
      this.setOpen()
      const param = {
        params: {
          kdobat: val?.kd_obat
        }
      }
      this.loadingRinci = true
      return new Promise(resolve => {
        api.get('v1/simrs/farmasinew/dialogperencanaanobatdetail', param)
          .then(resp => {
            this.loadingRinci = false
            this.parsingDataRinci(resp?.data)
            resolve(resp)
          })
          .catch(() => { this.loadingRinci = false })
      })
      // console.log('get rinci', val)
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
      const tabel = useTabelObatDirencanakaStore()
      console.log('form ', this.form)
      console.log('kirim ', val)
      this.setForm('kd_obat', val.kd_obat)
      if (!this.form.kd_ruang) return notifErrVue('Gudang tidak boleh kosong')
      const gudBen = this.gudangs.find(a => a.value === this.form.kd_ruang)
      if (!gudBen) return notifErrVue('Pastikan akses Anda adalah akses Gudang, bukan Depo')
      const data = {
        norencanabeliobat: this.form.no_rencbeliobat,
        kd_ruang: this.form.kd_ruang,
        kdobat: val.kd_obat,
        stok_real_gudang: val.stokGudang,
        stok_real_rs: val.stokReals,
        stok_max_rs: val.stokMaxs,
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
            tabel.getInitialData()
            notifSuccess(resp)
            resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    },
    getPesananBynomor(val) {
      // console.log('no', val)
      this.loading = true
      const nomor = {
        no_rencbeliobat: val
      }
      const params = { params: nomor }
      console.log('no', params)
      return new Promise(resolve => {
        api.get('v1/simrs/farmasinew/listrencanabeliBynomor', params)
          .then(resp => {
            this.loading = false
            this.cetaks = resp?.data
          })
          .catch(() => {
            this.loading = false
          })
      })
    }
  }
})
