import { defineStore } from 'pinia'
// import { api } from 'src/boot/axios'
// import { routerInstance } from 'src/boot/router'
// import * as storage from 'src/modules/storage'
// import { useSatsetStore } from 'src/stores/satset/index'

export const useSatsetKunjunganStore = defineStore('satset_kunjungan_store', {
  state: () => ({
    loading: false,
    params: {
      token: null,
      q: '',
      jenis: '',
      per_page: 20,
      page: 1
    }
  }),
  actions: {
    async getData() {
      console.log('kunjungan')
    }
  }
})
