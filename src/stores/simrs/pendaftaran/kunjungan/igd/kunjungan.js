import { defineStore } from 'pinia'
import { dateDbFormat } from 'src/modules/formatter'
import { api } from 'src/boot/axios'
import { notifSuccess } from 'src/modules/utils'

export const useListKunjunganIgd = defineStore('list_kunjungan_igd_pendaftaran', {
  state: () => ({
    items: [],
    meta: null,
    params: {
      q: '',
      per_page: 10,
      sort: 'DESC',
      page: 1,
      order_by: 'id',
      // tgl: dateDbFormat(new Date()),
      to: dateDbFormat(new Date()),
      from: dateDbFormat(new Date()),
      kdbayar: null
    },
    loading: false,
    loadingH: false,
    filters: false
  }),
  actions: {
    async getLists() {
      this.loading = true
      const params = { params: this.params }
      const resp = await api.get('/v1/simrs/pendaftaran/igd/kunjunganpasienigd', params)
      if (resp.status === 200) {
        // console.log('kunjungan', resp)
        this.items = resp.data?.data
        this.meta = resp.data
        this.loading = false
      }
      this.loading = false
    },
    setQ(payload) {
      this.params.page = 1
      this.params.q = payload
      this.getLists()
    },
    setPerPage(payload) {
      console.log('sasa', payload)
      this.params.page = 1
      this.params.per_page = payload
      this.getLists()
    },
    setPeriodik(val) {
      console.log('wew', val)
      this.params.page = 1
      const { to, from, status } = val
      this.params.to = to
      this.params.from = from
      this.params.status = status
      console.log('periodik', to)
      this.getLists()
    },
    setFilters() {
      this.filters = !this.filters
    },
    setPage(payload) {
      this.params.page = payload
      this.getLists()
    },
    hapusPasien(pasien) {
      console.log('hapus', pasien)
      this.loadingH = true
      const form = {
        noreg: pasien.noreg
      }
      return new Promise(resolve => {
        api.post('/v1/simrs/pendaftaran/igd/hapuspasien', form)
          .then(resp => {
            this.loadingH = false
            notifSuccess(resp)
            this.getLists()
            resolve(resp)
          })
          .catch(() => {
            this.loadingH = false
          })
      })
    }
  }
})
