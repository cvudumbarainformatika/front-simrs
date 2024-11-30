import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { usePengunjungRanapStore } from './pengunjung'
// eslint-disable-next-line no-unused-vars
import { notifErrVue, notifSuccess } from 'src/modules/utils'
import { date } from 'quasar'
import { useDischargePlanningRanapStore } from './dischargeplanning'

export const usePasienPulangRanapStore = defineStore('pasien-pulang-ranap-store', {
  state: () => ({
    form: {
      prognosis: null,
      caraKeluar: null,
      tglKeluar: null,
      noSuratMeninggal: null,
      noLp: null,
      diagnosaAkhir: null,
      diagnosaPenyebabMeninggal: null,
      tindakLanjut: null
    },

    search1: null,
    search2: null,

    // perawatanLanjutanDirumahs: ['Hygiene', 'Perawatan Luka', 'Perawatan Bayi', 'Pemberian Obat', ' Pemberian Minum NGT/Sendok/Dot Bayi', 'Nutrisi', 'Latihan Gerak/Excercise',
    //   'Pemeriksaan Laboratorium Lanjutan'
    // ],

    // bayiglBersamas: ['-', 'OT Kandung', 'Keluraga'],
    // TrasportasiYgDigunakans: ['Kendaraan Pribadi (mobil, beroda dua dll)', 'Kendaraan Umum', 'Mobil Ambulance'],
    prognosis: [],
    carakeluars: [],

    dokters: [],
    perawats: [],

    loadingOrder: false,
    loadingHapus: false

  }),
  // getters: {
  //   doubleCount: (state) => state.counter * 2
  // },
  actions: {

    // async getmasterprognosis () {
    //   const resp = await api.get('v1/simrs/ranap/layanan/dischargeplanning/getmasterprognosis')
    //   console.log('prognosis', resp)

    //   this.prognosis = resp.data
    // },
    async getmastercarakeluar () {
      const resp = await api.get('v1/simrs/ranap/layanan/pulang/getmastercarakeluar')
      console.log('getmastercarakeluar', resp)

      this.carakeluars = resp.data
    },

    async simpandata (pasien) {
      this.loadingOrder = true

      // const form = {
      this.form.noreg = pasien?.noreg
      this.form.norm = pasien?.norm
      this.form.ruangan = pasien?.ruangan
      this.form.kodesistembayar = pasien?.kodesistembayar
      this.form.dokter = pasien?.dokter
      this.form.kdruang = pasien?.kdruangan
      // }
      // // this.form.isRanap = isRanap

      // console.log('form hais', form)

      try {
        const resp = await api.post('v1/simrs/ranap/layanan/pulang/simpandata', this.form)
        console.log('save pulang', resp.data)
        if (resp.status === 200) {
          // const storePasien = usePengunjungPoliStore()
          const storeRanap = usePengunjungRanapStore()
          const isi = '3'
          // storePasien.injectDataPasien(pasien, isi, 'fisio')
          storeRanap.injectDataPasien(pasien?.noreg, isi, 'status')
          storeRanap.injectDataPasien(pasien?.noreg, resp?.data?.result[0]?.rs24, 'prognosis')
          storeRanap.injectDataPasien(pasien?.noreg, resp?.data?.result[0]?.rs25, 'sebabkematian')
          storeRanap.injectDataPasien(pasien?.noreg, resp?.data?.result[0]?.rs26, 'diagakhir')
          storeRanap.injectDataPasien(pasien?.noreg, resp?.data?.result[0]?.rs27, 'tindaklanjut')
          storeRanap.injectDataPasien(pasien?.noreg, resp?.data?.result[0]?.rs23, 'carakeluar')
          notifSuccess(resp)
          this.loadingOrder = false
          this.initReset(pasien)
        }
        this.loadingOrder = false
      }
      catch (error) {
        this.loadingOrder = false
      }
    },

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

    initReset (pasien) {
      this.form = {

        prognosis: pasien?.prognosis ?? null,
        caraKeluar: pasien?.carakeluar ?? null,
        tglKeluar: pasien?.tglKeluar ? date.formatDate(pasien?.tglKeluar, 'YYYY-MM-DD') : date.formatDate(Date.now(), 'YYYY-MM-DD'),
        noSuratMeninggal: null,
        noLp: null,
        diagnosaAkhir: pasien?.diagakhir ?? null,
        diagnosaPenyebabMeninggal: pasien?.sebabkematian ?? null,
        tindakLanjut: pasien?.tindaklanjut ?? null
      }
      this.search1 = pasien?.diagakhir ?? null
      this.search2 = pasien?.sebabkematian ?? null

      const pengunjung = usePengunjungRanapStore()
      const dischargeplanning = useDischargePlanningRanapStore()
      this.prognosis = dischargeplanning.prognosis
      this.dokters = pengunjung?.nakes?.filter(x => x?.kdgroupnakes === '1') ?? []
      this.perawats = pengunjung?.nakes?.filter(x => x?.kdgroupnakes === '2' || x?.kdgroupnakes === '3') ?? []

      return new Promise((resolve, reject) => {
        resolve()
      })
    }
  }
})
