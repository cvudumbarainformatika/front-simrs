import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useListPembayaranPenerimaanFarmasiStore = defineStore('list_pembayaran_penerimaan_farmasi', {
  state: () => ({
    loading: false,
    items: [],
    meta: {},
    param: {
      q: '',
      page: 1,
      per_page: 10
    },
    columns: [
      'penyedia',
      'no_bast',
      'tanggal',
      'total',
      'oleh'
    ],
    columnHide: []
  }),
  actions: {
    setParam (key, val) {
      this.param[key] = val
    },
    setSearch (payload) {
      this.setParam('q', payload)
      this.setParam('page', 1)
      this.getListBast()
    },
    setPage (payload) {
      this.setParam('page', payload)
      this.getListBast()
    },
    setPerPage (payload) {
      this.setParam('per_page', payload)
      this.setParam('page', 1)
      this.getListBast()
    },
    refreshTable () {
      this.setParam('page', 1)
      this.getListBast()
    },

    getInitialData () {
      this.getListBast()
    },
    getListBast () {
      this.loading = true
      const param = { params: this.param }
      return new Promise(resolve => {
        api.get('v1/simrs/penunjang/farmasinew/pembayaran/list-pembayaran', param)
          .then(resp => {
            this.loading = false
            console.log('list bast', resp.data)
            this.items = resp.data.data
            this.meta = resp.data.meta
            this.items.forEach(item => {
              item?.penerimaan?.forEach(trm => {
                trm.subtotal_bast = 0
                trm.subtotal_terima = 0
                if (trm?.jenissurat === 'Faktur') trm.subtotal_terima = trm.total_faktur_pbf
                else trm.subtotal_terima = trm?.faktur?.total_faktur ?? 0
                trm.subtotal_bast = parseFloat(trm.subtotal_terima) - parseFloat(trm?.nilai_retur)
              })
            })
            resolve(resp)
          })
          .catch(() => { this.loading = false })
      })
    }
  }
})
