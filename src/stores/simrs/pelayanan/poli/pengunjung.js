import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
// import { dateDbFormat } from 'src/modules/formatter'

export const usePengunjungPoliStore = defineStore('pengunjung-poli-store', {
  state: () => ({
    items: [],
    loading: false,

    params: {
      // tgl: dateDbFormat(new Date())
      tgl: '2023-07-07'
    },
    pageTindakan: false
  }),
  // getters: {
  //   doubleCount: (state) => state.counter * 2
  // },
  actions: {
    async getData() {
      this.loading = true
      const params = { params: this.params }
      await api.get('/v1/simrs/rajal/poli/kunjunganpoli', params)
        .then((resp) => {
          console.log(resp)
          this.loading = false
          if (resp.status === 200) {
            this.items = resp.data
          }
        }).catch((err) => {
          console.log(err)
          this.loading = false
        })
    },
    togglePageTindakan() {
      this.pageTindakan = !this.pageTindakan
    }
  }
})
