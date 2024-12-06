import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
// import { usePengunjungRanapStore } from './pengunjung'
// eslint-disable-next-line no-unused-vars
import { notifErrVue, notifSuccess } from 'src/modules/utils'
import { date } from 'quasar'

export const useAnatommyRanapStore = defineStore('anatomy-ranap-store', {
  state: () => ({
    form: {
      // prognosis: null,
      // caraKeluar: null
    },

    anatomys: [],

    // dokters: [],
    // perawats: [],

    loadingSave: false,
    loadingHapus: false

  }),
  // getters: {
  //   doubleCount: (state) => state.counter * 2
  // },
  actions: {

    async getmasteranatomys () {
      const resp = await api.get('v1/simrs/ranap/layanan/pemeriksaan/getmasteranatomys')
      // console.log('anatomys', resp)

      this.anatomys = resp.data
    },

    // async simpandata (pasien) {
    //   this.loadingOrder = true

    //   // const form = {
    //   this.form.noreg = pasien?.noreg
    //   this.form.norm = pasien?.norm
    //   this.form.ruangan = pasien?.ruangan
    //   this.form.kodesistembayar = pasien?.kodesistembayar
    //   this.form.dokter = pasien?.dokter
    //   this.form.kdruang = pasien?.kdruangan
    //   // }
    //   // // this.form.isRanap = isRanap

    //   // console.log('form hais', form)

    //   try {
    //     const resp = await api.post('v1/simrs/ranap/layanan/pulang/simpandata', this.form)
    //     console.log('save permintaan dp', resp.data)
    //     if (resp.status === 200) {
    //       // const storePasien = usePengunjungPoliStore()
    //       const storeRanap = usePengunjungRanapStore()
    //       const isi = resp?.data?.result
    //       // storePasien.injectDataPasien(pasien, isi, 'fisio')
    //       storeRanap.injectDataPasien(pasien?.noreg, isi, 'haidischargeplannings')
    //       notifSuccess(resp)
    //       this.loadingOrder = false
    //       this.initReset()
    //     }
    //     this.loadingOrder = false
    //   }
    //   catch (error) {
    //     this.loadingOrder = false
    //   }
    // },

    // async hapusdata (pasien, id) {
    //   this.loadingHapus = true
    //   const payload = { noreg: pasien?.noreg, id }
    //   try {
    //     const resp = await api.post('v1/simrs/ranap/layanan/dischargeplanning/hapusdata', payload)
    //     this.loadingHapus = false
    //     // console.log(resp)
    //     if (resp.status === 200) {
    //       // const storePasien = usePengunjungPoliStore()
    //       const storeRanap = usePengunjungRanapStore()
    //       // storePasien.hapusDataFisio(pasien, id)
    //       storeRanap.hapusDataInjectan(pasien, id, 'dischargeplanning')
    //       notifSuccess(resp)
    //     }
    //   }
    //   catch (error) {
    //     this.loadingHapus = false
    //     // console.log(error)
    //   }
    // },

    initReset () {
      this.form = {

        prognosis: null,
        caraKeluar: null,
        tglKeluar: date.formatDate(Date.now(), 'YYYY-MM-DD'),
        noSuratMeninggal: null,
        noLp: null,
        diagnosaAkhir: null,
        diagnosaPenyebabMeninggal: null,
        tindakLanjut: null
      }

      // const pengunjung = usePengunjungRanapStore()
      // this.dokters = pengunjung?.nakes?.filter(x => x?.kdgroupnakes === '1') ?? []
      // this.perawats = pengunjung?.nakes?.filter(x => x?.kdgroupnakes === '2' || x?.kdgroupnakes === '3') ?? []

      // return new Promise((resolve, reject) => {
      //   resolve()
      // })
    }
  }
})
