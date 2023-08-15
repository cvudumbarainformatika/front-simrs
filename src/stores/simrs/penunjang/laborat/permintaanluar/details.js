import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useDetailsLaboratLuar = defineStore('details_laborat_luar', {
  state: () => ({
    row: null,
    details: [],
    groups: [],
    total: 0,
    catatan: null,
    loading: false
  }),
  getters: {
    // doubleCount: (state) => state.counter * 2
    // groups: (state) => {
    //   return this.groupBy(state.details, paket => paket.kd_lab)
    // },
    kelamin: (state) => {
      return state.details.length > 0 ? state.details[0].kelamin : null
    }
  },
  actions: {
    getRow(payload) {
      this.row = payload
    },
    async getDetails (payload) {
      this.loading = true
      try {
        await api.get(`/v1/transaksi_laborats_luar_details?nota=${payload}`).then((resp) => {
          console.log('lab_luar_by_nota', resp)
          if (resp.data) {
            this.catatan = resp.data[0].catatan.ket
            let x = []
            x = resp.data.map(x =>
              ({
                pemeriksaan_laborat: x.pemeriksaan_laborat,
                kd_lab: x.kd_lab,
                biaya: parseInt(x.tarif_pelayanan) + parseInt(x.tarif_sarana),
                subtotal: (parseInt(x.tarif_pelayanan) + parseInt(x.tarif_sarana)) * parseInt(x.jml)
              })
            )
            // this.details = x
            // const mentah = resp.data
            // for (let i = 0; i < mentah.length; i++) {
            //   const obj = mentah[i].pemeriksaan_laborat
            //   obj.biaya = this.details[i].biaya
            //   obj.jumlah = mentah[i].jml
            //   obj.subtotal = this.details[i].subtotal
            // }
            this.details = resp.data
            this.groups = this.groupBy(x, paket => paket.pemeriksaan_laborat.rs21)
            this.total = this.getTotal(this.groups)
            this.loading = false
          }
          this.loading = false
        })
      } catch (error) {
        this.loading = false
      }
    },

    groupBy(list, keyGetter) {
      const map = new Map()
      list.forEach((item) => {
        const key = keyGetter(item)
        const collection = map.get(key)
        if (!collection) {
          map.set(key, [item])
        } else {
          collection.push(item)
        }
      })
      const arr = Array.from(map, ([name, value]) => ({ name, value }))
      return arr
    },
    getTotal(arr) {
      const paket = arr.map(x => {
        const val = x.value
        let sum = 0
        if (x.name !== '') {
          sum = val[0].subtotal
        } else {
          for (let i = 0; i < val.length; i++) {
            sum = sum + val[i].subtotal
          }
        }
        return sum
      })
      // console.log(paket.reduce((prev, cur) => prev + cur))
      const total = paket.reduce((prev, cur) => prev + cur)

      return total
    }
  }
})
