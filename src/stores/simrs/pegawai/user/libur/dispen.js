import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useDispenStore = defineStore('dispen', {
  state: () => ({
    loading: false,
    isOpen: false,
    params: {
      q: null,
      per_page: 20,
      page: 1
    },
    pegawais: [],
    form: {
      alasan: null,
      user_id: null,
      tanggal: null,
      flag: 'DISPEN'
    }

  }),
  // getters: {
  //   doubleCount: (state) => state.counter * 2
  // },
  actions: {
    setIsOpen () {
      this.isOpen = !this.isOpen
    },
    searchPegawai() {
      this.params.page = 1
      this.getPegawai()
    },
    async getPegawai() {
      this.loading = true
      const params = { params: this.params }
      try {
        const resp = await api.get('v1/dispen/pegawai', params)
        console.log('pegawai', resp)
        if (resp.status === 200) {
          this.pegawais = resp.data.data
          this.loading = false
        }
        this.loading = false
      } catch (error) {
        console.log('dispen', error)
        this.loading = false
      }
    }
  }
})
