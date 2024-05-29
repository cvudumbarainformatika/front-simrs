import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'

export const useListPermintaanStore = defineStore('list_permintaan_store', {
  state: () => ({
    isOpen: false,
    loading: false,
    items: [],
    meta: {},
    param: {
      no_permintaan: '',
      per_page: 10,
      page: 1,
      tanggal: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      nama: 'permintaan depo',
      flag: ['1', '2', '3', '4']
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
    setParam (key, val) {
      this.param[key] = val
    },
    setSearch (payload) {
      this.setParam('no_permintaan', payload)
      this.setParam('page', 1)
      this.ambilPermintaan()
    },
    setPage (payload) {
      this.setParam('page', payload)
      this.ambilPermintaan()
    },
    setPerPage (payload) {
      this.setParam('per_page', payload)
      this.setParam('page', 1)
      this.ambilPermintaan()
    },
    refreshTable () {
      this.setParam('page', 1)
      this.ambilPermintaan()
    },
    getInitialData () {
      this.ambilPermintaan()
    },
    ambilPermintaan () {
      this.loading = true
      console.log('penerimaan ', this.param)
      const params = { params: this.param }
      return new Promise(resolve => {
        api.get('v1/simrs/farmasinew/depo/listpermintaandepo', params)
          .then(resp => {
            this.loading = false
            console.log('list permintaan', resp.data)
            this.items = resp?.data?.data ?? resp.data
            this.meta = resp.data
            if (this.items?.length) {
              this.items.forEach(it => {
                if (it?.permintaanrinci.length) {
                  it?.permintaanrinci.forEach(ri => {
                    if (it?.mutasigudangkedepo.length) {
                      const dist = it?.mutasigudangkedepo.filter(mu => mu.kd_obat === ri.kdobat).map(ma => parseFloat(ma.jml)).reduce((a, b) => a + b, 0)
                      // console.log('dist', dist)
                      ri.distribusi = !isNaN(dist) ? dist : 0
                    }
                    else {
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
    }
  }
})
