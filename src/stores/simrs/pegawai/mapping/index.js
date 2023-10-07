import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useMappingNakesStore = defineStore('mapping-nakes', {
  state: () => ({
    listsnakes: [],
    loadingListNakes: false,
    objNakes: null,
    searchResultKepeg: null
  }),
  // getters: {
  //   doubleCount: (state) => state.counter * 2
  // },
  actions: {
    async getNakes() {
      this.loadingListNakes = true
      try {
        const resp = await api.get('v1/simrs/maping/simpegsimrs/listnakes')
        console.log(resp)
        if (resp.status === 200) {
          this.listsnakes = resp?.data
          this.loadingListNakes = false
        }
      } catch (error) {
        console.log(error)
        this.loadingListNakes = false
      }
    },
    setObjnakes(val) {
      this.objNakes = val
    }
  }
})
