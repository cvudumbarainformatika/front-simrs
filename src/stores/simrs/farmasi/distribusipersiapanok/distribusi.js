import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { notifSuccess } from 'src/modules/utils'

export const useDistribusiPersiapanOperasiStore = defineStore('distribusi_persiapan_operasi', {
  state: () => ({
    addOpen: false,
    isOpen: false,
    loading: false,
    loadingSimpan: false,
    loadingDistribusi: false,
    items: [],
    meta: {},
    params: {
      page: 1,
      q: '',
      per_page: 10,
      jenis: 'non-konsinyasi',
      no_permintaan: '',
      kdgudang: '',
      flag: ['1'],
      from: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      to: date.formatDate(Date.now(), 'YYYY-MM-DD')
    },
    form: {},
    columns: [
      'pasien',
      'permintaan',
      'tanggal',
      'status',
      'act'
    ],
    gudangs: [
      { nama: 'Gudang Farmasi ( Kamar Obat )', value: 'Gd-05010100' },
      { nama: 'Gudang Farmasi (Floor Stok)', value: 'Gd-03010100' }
    ],
    depos: [
      { nama: 'Floor Stock 1 (AKHP)', value: 'Gd-03010101' },
      { nama: 'Depo Rawat inap', value: 'Gd-04010102' },
      { nama: 'Depo OK', value: 'Gd-04010103' },
      { nama: 'Depo Rawat Jalan', value: 'Gd-05010101' },
      { nama: 'Depo IGD', value: 'Gd-02010104' }
    ],
    statuses: [
      { nama: 'Tampilkan semua', value: '', color: 'grey' },
      { nama: 'Menunggu verifikasi', value: '1', color: 'cyan' },
      { nama: 'Telah di verifikasi', value: '2', color: 'blue' }
    ],
    columnsHide: [],
    dataToPrint: {}
  }),
  actions: {
    setForm (key, val) {
      this.form[key] = val
    },
    setParams (key, val) {
      this.params[key] = val
    },
    setSearch (val) {
      this.setParams('no_permintaan', val)
      this.setParams('page', 1)
      this.getPermintaan()
    },
    setPage (val) {
      this.setParams('page', val)
      this.getPermintaan()
    },
    setPerPage (val) {
      this.setParams('per_page', val)
      this.setParams('page', 1)
      this.getPermintaan()
    },
    refreshTable (val) {
      this.setParams('page', 1)
      this.getPermintaan()
    },
    getInitialData () {
      this.getPermintaan()
    },
    metaniRinci () {
      this.items.forEach(item => {
        item?.permintaanrinci?.forEach(rinc => {
          rinc.distribusi = item?.mutasigudangkedepo?.filter(x => x.kd_obat === rinc.kdobat).map(m => parseFloat(m.jml)).reduce((a, b) => a + b, 0) ?? 0
        })
      })
    },
    getPermintaan () {
      this.loading = true
      const param = { params: this.params }
      return new Promise(resolve => {
        api.get('v1/simrs/penunjang/farmasinew/obatoperasi/get-permintaan', param)
          .then(resp => {
            this.loading = false
            this.items = resp?.data?.data ?? resp?.data
            this.meta = resp.data

            console.log('list PErmintaan depo', resp?.data)
            if (this.items?.length) this.metaniRinci()
            resolve(resp)
          })
          .catch(() => { this.loading = false })
      })
    },
    simpanDistribusi (val) {
      this.loadingDistribusi = true
      val.loading = true
      return new Promise(resolve => {
        api.post('v1/simrs/penunjang/farmasinew/obatoperasi/distribusi', val)
          .then(resp => {
            this.loadingDistribusi = false
            val.loading = false
            console.log('distribusi', resp)
            notifSuccess(resp)
            this.getPermintaan()
            resolve(resp)
          })
          .catch(() => {
            this.loadingDistribusi = false
            val.loading = false
          })
      })
    },
    terimaPengembalian (val) {
      this.loadingSimpan = true
      val.loading = true
      return new Promise(resolve => {
        api.post('v1/simrs/penunjang/farmasinew/obatoperasi/terima-pengembalian', val)
          .then(resp => {
            this.loadingSimpan = false
            val.loading = false
            console.log('kembali', resp)
            notifSuccess(resp)
            this.getPermintaan()
            resolve(resp)
          })
          .catch(() => {
            this.loadingSimpan = false
            val.loading = false
          })
      })
    }
  }
})
