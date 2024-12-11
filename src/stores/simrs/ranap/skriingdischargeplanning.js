import { defineStore } from 'pinia'
// eslint-disable-next-line no-unused-vars
import { api } from 'src/boot/axios'
import { usePengunjungRanapStore } from './pengunjung'
// eslint-disable-next-line no-unused-vars
import { notifErrVue, notifSuccess } from 'src/modules/utils'
import { date } from 'quasar'

export const useSkriiningDischargePlanningRanapStore = defineStore('skriining-discharge-planning-ranap-store', {
  state: () => ({
    form: {
      rs1: null,
      rs2: null,
      rs4: null,
      rs5: null,
      rs5Ket: null,
      rs6: null,
      rs7: null,
      rs8: null,
      rs9: null,
      rs10: null,
      rs11: null,
      rs12: null,
      rs13: null,
      rs14: null,
      rs15: null,
      rs16: null,
      rs16Ket: null,
      rs17: null,
      rs18: null,
      rs18Ket: null,
      rs19: null,
      tglRencanaPulang: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      rs20: null,
      rs21: null,
      rs22: null
    },

    dokters: [],
    perawats: [],
    nakes: [],

    loadingOrder: false,
    loadingHapus: false,

    // masterform
    yaTidaks: ['Ya', 'Tidak'],
    tempatTinggals: ['Rumah milik sendiri', 'Menumpang', 'Kost/Kontrakan']

  }),
  // getters: {
  //   doubleCount: (state) => state.counter * 2
  // },
  actions: {

    async simpandata (pasien) {
      this.loadingOrder = true

      // const form = {
      this.form.rs1 = pasien?.noreg
      this.form.rs2 = pasien?.norm
      this.form.kdruang = pasien?.kdruangan
      // }
      // // this.form.isRanap = isRanap

      // console.log('form hais', form)

      try {
        const resp = await api.post('v1/simrs/ranap/layanan/dischargeplanning/skrining/simpandata', this.form)
        console.log('save permintaan skrining discharge planning', resp.data)
        if (resp.status === 200) {
          // const storePasien = usePengunjungPoliStore()
          const storeRanap = usePengunjungRanapStore()
          const isi = resp?.data?.result
          // storePasien.injectDataPasien(pasien, isi, 'fisio')
          storeRanap.injectDataPasien(pasien?.noreg, isi, 'skriningdischargeplannings')
          notifSuccess(resp)
          this.loadingOrder = false
          this.initReset()
        }
        this.loadingOrder = false
      }
      catch (error) {
        this.loadingOrder = false
      }
    },

    async hapusdata (pasien, id) {
      this.loadingHapus = true
      const payload = { noreg: pasien?.noreg, id }
      try {
        const resp = await api.post('v1/simrs/ranap/layanan/dischargeplanning/skrining/hapusdata', payload)
        this.loadingHapus = false
        // console.log(resp)
        if (resp.status === 200) {
          // const storePasien = usePengunjungPoliStore()
          const storeRanap = usePengunjungRanapStore()
          // storePasien.hapusDataFisio(pasien, id)
          storeRanap.hapusDataInjectan(pasien, id, 'skriningdischargeplannings')
          notifSuccess(resp)
        }
      }
      catch (error) {
        this.loadingHapus = false
        // console.log(error)
      }
    },

    initReset () {
      this.form = {
        rs4: null,
        rs5: null,
        rs5Ket: null,
        rs6: null,
        rs7: null,
        rs8: null,
        rs9: null,
        rs10: null,
        rs11: null,
        rs12: null,
        rs13: null,
        rs14: null,
        rs15: null,
        rs16: null,
        rs16Ket: null,
        rs17: null,
        rs18: null,
        rs18Ket: null,
        rs19: null,
        tglRencanaPulang: null,
        rs20: null,
        rs21: null,
        rs22: null
      }

      const pengunjung = usePengunjungRanapStore()
      this.dokters = pengunjung?.nakes?.filter(x => x?.kdgroupnakes === '1') ?? []
      this.perawats = pengunjung?.nakes?.filter(x => x?.kdgroupnakes === '2' || x?.kdgroupnakes === '3') ?? []
      this.nakes = pengunjung?.nakes ?? []

      return new Promise((resolve, reject) => {
        resolve()
      })
    }
  }
})
