import { defineStore } from 'pinia'
// eslint-disable-next-line no-unused-vars
import { api } from 'src/boot/axios'
import { usePengunjungRanapStore } from './pengunjung'
// eslint-disable-next-line no-unused-vars
import { notifErrVue, notifSuccess } from 'src/modules/utils'

export const useSummaryDischargePlanningRanapStore = defineStore('summary-discharge-planning-ranap-store', {
  state: () => ({
    form: {
      rs1: null,
      rs2: null,
      rs4: null,
      rs5: null,
      rs6: null,
      rs7: null,
      rs8: null,
      rs9: null,
      rs10: null,
      operasi: null,
      tglOperasi: null,
      ttdPasien: null
    },

    dokters: [],
    perawats: [],
    nakes: [],

    loadingOrder: false,
    loadingHapus: false

    // masterform
    // yaTidaks: ['Ya', 'Tidak'],
    // tempatTinggals: ['Rumah milik sendiri', 'Menumpang', 'Kost/Kontrakan']

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
        const resp = await api.post('v1/simrs/ranap/layanan/dischargeplanning/summary/simpandata', this.form)
        // console.log('save permintaan summary discharge planning', resp.data)
        if (resp.status === 200) {
          // const storePasien = usePengunjungPoliStore()
          const storeRanap = usePengunjungRanapStore()
          const isi = resp?.data?.result
          // storePasien.injectDataPasien(pasien, isi, 'fisio')
          storeRanap.injectDataPasien(pasien?.noreg, isi, 'summarydischargeplannings')
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
        const resp = await api.post('v1/simrs/ranap/layanan/dischargeplanning/summary/hapusdata', payload)
        this.loadingHapus = false
        // console.log(resp)
        if (resp.status === 200) {
          // const storePasien = usePengunjungPoliStore()
          const storeRanap = usePengunjungRanapStore()
          // storePasien.hapusDataFisio(pasien, id)
          storeRanap.hapusDataInjectan(pasien, id, 'summarydischargeplannings')
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
        s1: null,
        rs2: null,
        rs4: null,
        rs5: null,
        rs6: null,
        rs7: null,
        rs8: null,
        rs9: 'LABORAT' + '\n' + 'RADIOLOGI' + '\n' + 'EKG' + '\n' + 'LAIN-LAIN.....',
        rs10: 'KONTROL SESUAI TANGGAL' + '\n' + 'MEMBAWA HASIL PEMERIKSAAN PENUNJANG JIKA KONTROL ' + '\n' + 'LAIN-LAIN.....',
        operasi: null,
        tglOperasi: null,
        ttdPasien: null
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
