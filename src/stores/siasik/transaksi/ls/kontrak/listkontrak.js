import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const uselistKontrakPekerjaan = defineStore('list_kontra_kPekerjaan', {
  state: () => ({
    loading: false,
    reqs: {
      q: '',
      page: 1,
      tahun: 2024,
      rowsPerPage: 20,
      rowsNumber: 0
    },
    kontraks: [],
    exportExcel: false
  }),
  actions: {
    setParams (key, val) {
      this.reqs[key] = val
    },
    getInitialData () {
      this.getlistKontrak()
    },
    refreshTable () {
      this.reqs.page = 1
      this.getInitialData()
    },
    onRequest (props) {
      console.log('props', props)
      this.reqs.page = props?.pagination?.page ?? 1
      this.reqs.rowsPerPage = props?.pagination?.rowsPerPage ?? 20
      this.getInitialData()
    },
    setTahun (val) {
      this.reqs.tahun = val
    },

    goToPage (val) {
      this.reqs.page = val
      this.getInitialData()
    },

    getlistKontrak () {
      this.loading = true
      const params = { params: this.reqs }
      return new Promise((resolve) => {
        api.get('v1/transaksi/kontrak/listkontrak', params).then((resp) => {
          console.log('kontrak', resp)
          if (resp.status === 200) {
            this.loading = false
            this.kontraks = resp.data.data
            this.reqs.rowsNumber = resp.data.total
            resolve(resp)
          }
          else {
            this.loading = false
          }
        })
          .catch(() => {
            this.loading = false
          })
      })
    }
  }
})
