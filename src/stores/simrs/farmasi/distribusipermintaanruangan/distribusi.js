import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifSuccess } from 'src/modules/utils'

export const useDistribusiPermintaanRuanganStore = defineStore('distribusi_permintaan_ruangan', {
  state: () => ({
    isOpen: false,
    loading: false,
    loadingSimpan: false,
    loadingCariPermintaan: false,
    loadingKunci: false,
    items: [],
    meta: { },
    params: {
      page: 1,
      q: '',
      per_page: 10,
      no_permintaan: '',
      kdgudang: '',
      flag: '',
      jenisdistribusi: 'non-konsinyasi'
    },
    form: {
    },
    disp: { no_permintaan: '' },
    terpilih: {},
    columns: [
      'no_permintaan',
      'tgl_permintaan',
      'dari',
      'status',
      'act'
    ],
    gudangs: [
      { nama: 'Gudang Farmasi ( Kamar Obat )', value: 'Gd-05010100' },
      { nama: 'Gudang Farmasi (Floor Stok)', value: 'Gd-03010100' }
    ],
    depos: [
      { nama: 'Floor Stock 1 (AKHP)', value: 'Gd-03010101' },
      { nama: 'Floor Stock 2 (Obat)', value: 'Gd-04010101' },
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
    paramStatus: {
      nama: 'Belum di filter', value: 99, color: 'cyan'
    },
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
      this.getPermintaanDepo()
    },
    setPage (val) {
      this.setParams('page', val)
      this.getPermintaanDepo()
    },
    setPerPage (val) {
      this.setParams('per_page', val)
      this.setParams('page', 1)
      this.getPermintaanDepo()
    },
    refreshTable (val) {
      this.setParams('page', 1)
      this.getPermintaanDepo()
    },
    setParamStatus (val) {
      console.log('status ', val)
      if (val.value === 99) {
        this.paramStatus = val
        delete this.params.status
        this.setParams('flag', '')
        this.getPermintaanDepo()
      }
      else {
        this.paramStatus = val
        this.setParams('flag', val.value)
        this.getPermintaanDepo()
      }
    },
    permintaanSelected (val) {
      this.disp.no_permintaan = val
      const temp = this.items.filter(a => a.no_permintaan === val)
      if (temp.length) {
        const item = temp[0]
        this.terpilih = item
        console.log('item', item)
      }
    },
    gantiJenisDistribusi (val) {
      console.log('jenis dist', val)
      this.setParams('jenisdistribusi', val)
      this.getPermintaanDepo()
    },
    cariPermintaan (val) {
      const needle = val.toLowerCase()
      const arr = 'no_permintaan'
      let opt = []

      const splits = arr.split('-')
      const multiFilter = (data = [], filterKeys = [], value = '') =>
        data.filter((item) =>
          filterKeys.some(
            (key) =>
              item[key].toString().toLowerCase().includes(value.toLowerCase()) &&
                item[key]
          )
        )
      const filteredData = multiFilter(this.items, splits, needle)
      opt = filteredData
      if (opt.length <= 0) {
        this.setParams('no_permintaan', val)
        this.getPermintaanDepo()
        // console.log('opt', 'ga ada')
      }
      // console.log('opt', opt)
      // console.log('val', val)
    },

    getInitialData () {
      this.getPermintaanDepo()
    },
    getPermintaanDepo () {
      this.loading = true
      const param = { params: this.params }
      return new Promise(resolve => {
        // api.get('v1/simrs/farmasinew/gudang/distribusi/rencanadistribusikedepo', param)
        api.get('v1/simrs/farmasinew/gudang/distribusi/list-permintaan-ruangan', param)
          .then(resp => {
            this.loading = false
            this.items = resp?.data?.data
            this.meta = resp.data
            if (this.items.length) {
              console.log('items anu', this.items)
              this.items.forEach(it => {
                if (it?.permintaanrinci.length) {
                  it?.permintaanrinci.forEach(ri => {
                    ri.jumlahdiminta = ri.jumlah_minta
                    ri.jumlah_minta = 0
                    if (it?.mutasigudangkedepo.length) {
                      const dist = it?.mutasigudangkedepo.filter(mu => mu.kd_obat === ri.kdobat).map(ma => parseFloat(ma.jml)).reduce((a, b) => a + b, 0)
                      console.log('dist', dist)
                      ri.distribusi = !isNaN(dist) ? dist : 0
                    }
                    else {
                      ri.distribusi = 0
                    }
                  })
                }
              })
            }
            console.log('list PErmintaan depo', this.items)
            resolve(resp)
          })
          .catch(() => { this.loading = false })
      })
    },
    simpanDetail (val, row) {
      this.loadingSimpan = true
      row.loading = true
      return new Promise(resolve => {
        api.post('v1/simrs/farmasinew/gudang/distribusi/simpandistribusidepo', val)
          .then(resp => {
            this.loadingSimpan = false
            delete row.loading
            console.log('didtribusi', resp)
            val.distribusi = parseFloat(resp?.data?.data?.jml)
            notifSuccess(resp)
            // this.getPermintaanDepo()
            resolve(resp)
          })
          .catch(() => {
            this.loadingSimpan = false
            delete row.loading
          })
      })
    },
    kunci (val) {
      console.log('store.kunci')
      this.loadingKunci = true
      return new Promise(resolve => {
        api.post('v1/simrs/farmasinew/gudang/distribusi/kuncipermintaandaridepo', val)
          .then(resp => {
            this.loadingKunci = false
            this.getPermintaanDepo()
            notifSuccess(resp)
            resolve(resp)
          })
          .catch(() => {
            this.loadingKunci = false
          })
      })
    },
    tolak (val) {
      console.log('store.tolak')
      val.loading = true
      return new Promise(resolve => {
        api.post('v1/simrs/farmasinew/gudang/distribusi/tolak', val)
          .then(resp => {
            delete val.loading
            this.getPermintaanDepo()
            notifSuccess(resp)
            resolve(resp)
          })
          .catch(() => {
            delete val.loading
          })
      })
    },
    distribusi (val) {
      console.log('store.kunci')
      this.loadingKunci = true
      return new Promise(resolve => {
        api.post('v1/simrs/farmasinew/gudang/distribusi/distribusikan', val)
          .then(resp => {
            this.loadingKunci = false
            this.getPermintaanDepo()
            notifSuccess(resp)
            resolve(resp)
          })
          .catch(() => {
            this.loadingKunci = false
          })
      })
    }
  }
})
