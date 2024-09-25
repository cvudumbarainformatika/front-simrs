import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { filterDuplicateArrays, notifSuccess } from 'src/modules/utils'

export const useListKunjunganPenjualanLangsungStore = defineStore('list_kunjungan_penjualan_langsung', {
  state: () => ({
    loading: false,
    items: [],
    meta: {},
    params: {
      q: '',
      page: 1,
      per_page: 10,
      from: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      to: date.formatDate(Date.now(), 'YYYY-MM-DD')
    },
    columns: [
      'noreg',
      'kode_identitas',
      'nama',
      'tgl_kunjungan'

    ],
    columnHide: []
  }),
  actions: {
    setParam (key, val) {
      this.params[key] = val
    },
    setSearch (payload) {
      this.setParam('q', payload)
      this.setParam('page', 1)
      this.getDataTable()
    },
    setPage (payload) {
      this.setParam('page', payload)
      this.getDataTable()
    },
    setPerPage (payload) {
      this.setParam('per_page', payload)
      this.setParam('page', 1)
      this.getDataTable()
    },

    setPeriode (val) {
      this.setParam('to', val.to)
      this.setParam('from', val.from)

      console.log('periodik', val)
      // this.getDataTable()
    },
    refreshTable () {
      this.setParam('page', 1)
      this.getDataTable()
    },
    async getDataTable () {
      const param = {
        params: this.params
      }
      this.loading = true
      await api.get('v1/simrs/farmasinew/penjualanbebas/list-kunjungan', param)
        .then(resp => {
          this.loading = false
          this.items = resp?.data?.data ?? resp?.data
          this.meta = resp?.data?.meta ?? resp?.data
          if (this.items?.length) {
            this.items.forEach(item => {
              item.apotek = []
              item?.rincian?.forEach(an => {
                an.subtotal = parseFloat(an.jumlah) * parseFloat(an.harga_jual)
              })
              const noresep = filterDuplicateArrays(item?.rincian.map(m => m.noresep))
              if (noresep.length) {
                noresep.forEach(res => {
                  const det = {
                    noresep: res,
                    rincian: item?.rincian?.filter(f => f.noresep === res),
                    total: item?.rincian?.filter(f => f.noresep === res)?.reduce((a, b) => parseFloat(a) + parseFloat(b.subtotal), 0),
                    flag_pembayaran: item?.rincian?.find(f => f.noresep === res)?.flag_pembayaran ?? false,
                    nama_pejabat: item?.rincian?.find(f => f.noresep === res)?.nama_pejabat ?? ''
                  }
                  item.apotek.push(det)
                })
              }
              console.log('noresep', item)
            })
          }
        })
        .catch(() => {
          this.loading = false
        })
    },
    hapusResep (item) {
      item.loadingHapus = true
      const form = {
        noresep: item?.noresep
      }
      return new Promise(resolve => {
        api.post('v1/simrs/farmasinew/penjualanbebas/hapus', form)
          .then(resp => {
            delete item.loadingHapus
            this.items.forEach(da => {
              const indexes = da.apotek.findIndex(a => a.noresep === item?.noresep)
              const indexri = da.rincian.filter(cur => cur.noresep === item?.noresep)
              if (indexes >= 0) da.apotek.splice(indexes, 1)
              if (indexri.length > 0) {
                indexri.forEach(ind => {
                  const index = da.rincian.findIndex(a => a.noresep === item?.noresep)
                  // console.log('ind', ind, da.rincian[index])
                  if (index >= 0)da.rincian.splice(index, 1)
                })
              }
              // console.log('ind', indexes, indexri, da.rincian)
            })
            // console.log('items', this.items)

            console.log((resp?.data))
            notifSuccess(resp)
            resolve(resp)
          })
          .catch(() => { delete item.loadingHapus })
      })
    }
  }
})
