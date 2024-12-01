import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { usePengunjungRanapStore } from './pengunjung'
// eslint-disable-next-line no-unused-vars
import { notifErrVue, notifSuccess } from 'src/modules/utils'
import { date } from 'quasar'

export const useDischargePlanningRanapStore = defineStore('discharge-planning-ranap-store', {
  state: () => ({
    form: {
      lamaPerawatan: '1',
      tglRencanaPlg: null,
      pldiRumah: null,
      bayiTglBersama: null,
      transportasi: null,
      anjuran: null,
      prognosis: null
    },

    perawatanLanjutanDirumahs: ['Hygiene', 'Perawatan Luka', 'Perawatan Bayi', 'Pemberian Obat', ' Pemberian Minum NGT/Sendok/Dot Bayi', 'Nutrisi', 'Latihan Gerak/Excercise',
      'Pemeriksaan Laboratorium Lanjutan'
    ],

    bayiglBersamas: ['-', 'OT Kandung', 'Keluraga'],
    TrasportasiYgDigunakans: ['Kendaraan Pribadi (mobil, beroda dua dll)', 'Kendaraan Umum', 'Mobil Ambulance'],
    prognosis: [],

    dokters: [],
    perawats: [],

    loadingOrder: false,
    loadingHapus: false

  }),
  // getters: {
  //   doubleCount: (state) => state.counter * 2
  // },
  actions: {

    async getmasterprognosis () {
      const resp = await api.get('v1/simrs/ranap/layanan/dischargeplanning/getmasterprognosis')
      // console.log('prognosis', resp)

      this.prognosis = resp.data
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
        const resp = await api.post('v1/simrs/ranap/layanan/dischargeplanning/simpandata', this.form)
        console.log('save permintaan dp', resp.data)
        if (resp.status === 200) {
          // const storePasien = usePengunjungPoliStore()
          const storeRanap = usePengunjungRanapStore()
          const isi = resp?.data?.result
          // storePasien.injectDataPasien(pasien, isi, 'fisio')
          storeRanap.injectDataPasien(pasien?.noreg, isi, 'haidischargeplannings')
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
        const resp = await api.post('v1/simrs/ranap/layanan/dischargeplanning/hapusdata', payload)
        this.loadingHapus = false
        // console.log(resp)
        if (resp.status === 200) {
          // const storePasien = usePengunjungPoliStore()
          const storeRanap = usePengunjungRanapStore()
          // storePasien.hapusDataFisio(pasien, id)
          storeRanap.hapusDataInjectan(pasien, id, 'dischargeplanning')
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
        lamaPerawatan: '1',
        tglRencanaPlg: date.formatDate(Date.now(), 'YYYY-MM-DD'),
        pldiRumah: null,
        bayiTglBersama: null,
        transportasi: null,
        anjuran: '-',
        prognosis: null
      }

      const pengunjung = usePengunjungRanapStore()
      this.dokters = pengunjung?.nakes?.filter(x => x?.kdgroupnakes === '1') ?? []
      this.perawats = pengunjung?.nakes?.filter(x => x?.kdgroupnakes === '2' || x?.kdgroupnakes === '3') ?? []

      return new Promise((resolve, reject) => {
        resolve()
      })
    }
  }
})
