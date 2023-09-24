import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useInacbgPoli = defineStore('inacbg-poli', {
  state: () => ({
    kodeIna: '',
    tarifIna: 0,
    tarifRs: 0,
    totalTindakan: 0,
    totalLaborat: 0,
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
    },

    setTotalTindakan(pasien) {
      const arr = pasien?.tindakan
      this.totalTindakan = arr?.length ? arr?.reduce((acc, cur) => acc + cur.subtotal, 0) : 0
      this.tarifRs = parseInt(this.totalTindakan) + parseInt(this.totalLaborat)
    },
    setTotalLaborat(pasien) {
      const arr = pasien?.laborats
      const lab = arr?.map(x => {
        const obj = {
          biayaLayanan: x?.details[0]?.rs13,
          biayaSarana: x?.details[0]?.rs6
        }
        const subtotal = parseInt(obj?.biayaLayanan) + parseInt(obj?.biayaSarana)
        return subtotal
      })

      this.totalLaborat = lab?.length ? lab?.reduce((acc, cur) => acc + cur, 0) : 0
      console.log('total lab', this.totalLaborat)
      this.tarifRs = parseInt(this.totalTindakan) + parseInt(this.totalLaborat)
    }
  }
})
