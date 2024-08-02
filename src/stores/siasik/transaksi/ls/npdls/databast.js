import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const dataBastFarmasi = defineStore('data_Bast_Farmasi', {
  state: () => ({
    loading: false,
    reqs: {
      q: '',
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 0
    },
    bastfarmasis: []
  }),
  actions: {
    setParams (key, val) {
      this.reqs[key] = val
    },
    getDataBast () {
      this.selectbastFarmasi()
    },
    refreshTable () {
      this.reqs.page = 1
      this.getDataBast()
    },
    onRequest (props) {
      console.log('props', props)
      this.reqs.page = props?.pagination?.page ?? 1
      this.reqs.rowsPerPage = props?.pagination?.rowsPerPage ?? 10
      this.getDataBast()
    },
    goToPage (val) {
      this.reqs.page = val
      this.getDataBast()
    },

    selectbastFarmasi () {
      this.loading = true
      const params = { params: this.reqs }
      return new Promise((resolve) => {
        api.get('/v1/transaksi/belanja_ls/bastfarmasi', params)
          .then((resp) => {
            if (resp.status === 200) {
              console.log('farmasi', resp)
              this.loading = false
              this.bastfarmasis = resp.data.data
              this.reqs.rowsNumber = resp.data.total

              resolve(resp.data)
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
