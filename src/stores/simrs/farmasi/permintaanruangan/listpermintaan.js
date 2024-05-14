import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { notifSuccess } from 'src/modules/utils'

export const useListPermintaanRuanganStore = defineStore('list_permintaan_ruangan_store', {
  state: () => ({
    isOpen: false,
    loading: false,
    items: [],
    meta: {},
    param: {
      cari: '',
      per_page: 10,
      page: 1,
      tanggal: date.formatDate(Date.now(), 'YYYY-MM-DD')
    },
    columns: [
      'no_permintaan',
      'tgl_permintaan',
      'dari',
      'tujuan',
      'flag'
    ],
    columnHide: [],
    dataToPrint: {}
  }),
  actions: {
    setParam(key, val) {
      this.param[key] = val
    },
    setSearch(payload) {
      this.setParam('cari', payload)
      this.setParam('page', 1)
      this.ambilPermintaan()
    },
    setPage(payload) {
      this.setParam('page', payload)
      this.ambilPermintaan()
    },
    setPerPage(payload) {
      this.setParam('per_page', payload)
      this.setParam('page', 1)
      this.ambilPermintaan()
    },
    refreshTable() {
      this.setParam('page', 1)
      this.ambilPermintaan()
    },
    getInitialData() {
      this.ambilPermintaan()
    },
    ambilPermintaan() {
      this.loading = true
      console.log('penerimaan ', this.param)
      const params = { params: this.param }
      return new Promise(resolve => {
        api.get('v1/simrs/farmasinew/depo/list-permintaan-ruangan', params)
          .then(resp => {
            this.loading = false
            console.log('list permintaan', resp.data)
            this.items = resp.data?.data
            this.meta = resp.data
            if (this.items?.length) {
              this.items.forEach(it => {
                if (it?.permintaanrinci.length) {
                  it?.permintaanrinci.forEach(ri => {
                    if (it?.mutasigudangkedepo.length) {
                      const dist = it?.mutasigudangkedepo.filter(mu => mu.kd_obat === ri.kdobat).map(ma => parseFloat(ma.jml)).reduce((a, b) => a + b, 0)
                      // console.log('dist', dist)
                      ri.distribusi = !isNaN(dist) ? dist : 0
                    } else {
                      ri.distribusi = 0
                    }
                  })
                }
              })
            }
            resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    },
    simpanDetail(val, item) {
      this.loadingSimpan = true
      item.loading = true
      return new Promise(resolve => {
        api.post('v1/simrs/farmasinew/depo/terimadistribusi', val)
          .then(resp => {
            this.loadingSimpan = false
            item.loading = false
            console.log('terima', resp)
            notifSuccess(resp)
            this.ambilPermintaan()
            resolve(resp)
          })
          .catch(() => {
            this.loadingSimpan = false
            item.loading = false
          })
      })
    }
  }
})
