import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useInacbgPoli = defineStore('inacbg-poli', {
  state: () => ({
    kodeIna: '',
    tarifIna: 0,
    tarifRs: 0,
    desc: '',

    loading: false
  }),
  // getters: {
  //   doubleCount: (state) => state.counter * 2
  // },
  actions: {
    async getDataIna(pasien) {
      const adaIcd = pasien?.diagnosa?.length
      const noreg = pasien?.noreg
      // console.log(adaIcd)
      this.loading = true
      if (adaIcd) {
        const params = {
          params: { noreg }
        }
        try {
          const resp = await api.get('v1/simrs/pelayanan/carisimulasi', params)
          // console.log(resp)
          if (resp.status === 200) {
            const ok = resp.data?.metadata?.code === 200
            if (ok) {
              this.setIna(resp.data?.response)
            }
            this.loading = false
          }
          this.loading = false
        } catch (error) {
          this.loading = false
        }
      } else {
        this.setIna()
        this.loading = false
      }
    },
    setIna(obj) {
      this.kodeIna = obj?.cbg?.code ?? '---'
      this.tarifIna = obj?.cbg?.tariff ?? '0'
      this.desc = obj?.cbg?.description ?? ''
    }
  }
})
