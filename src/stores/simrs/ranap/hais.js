import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { usePengunjungRanapStore } from './pengunjung'
// eslint-disable-next-line no-unused-vars
import { notifErrVue, notifSuccess } from 'src/modules/utils'

export const useHaisRanapStore = defineStore('hais-ranap-store', {
  state: () => ({
    form: {
      isk: [],
      iadp: [],
      ido: [],
      plebitis: [],
      vap: [],
      kultur: null,
      antibiotik: null
    },
    masters: [],
    dokters: [],
    perawats: [],

    isk: null,
    iadp: null,
    ido: null,
    plebitis: null,
    vap: null,

    loadingOrder: false,
    loadingHapus: false

  }),
  // getters: {
  //   doubleCount: (state) => state.counter * 2
  // },
  actions: {

    async getMaster () {
      try {
        const resp = await api.get('v1/simrs/ranap/layanan/hais/getmaster')
        // console.log('master hais', resp)

        if (resp.status === 200) {
          const data = resp.data
          this.masters = data
        }
      }
      catch (error) {

      }
    },

    async saveOrder (pasien) {
      if (!pasien?.kodedokter) {
        return notifErrVue('kode Dokter masih kosong, silahkan tutup dulu pasien ini kemudian tekan tombol refresh di pojok kanan atas')
      }
      this.loadingOrder = true

      const isk = this.form.isk
      console.log(isk.join(','))

      const form = {
        noreg: pasien?.noreg,
        norm: pasien?.norm,
        kodepoli: pasien?.kodepoli,
        isk: this.isk,
        iadp: this.iadp,
        ido: this.ido,
        plebitis: this.plebitis,
        vap: this.vap,
        kultur: this.form.kultur,
        antibiotik: this.form.antibiotik
      }
      // // this.form.isRanap = isRanap

      // console.log('form hais', form)

      try {
        const resp = await api.post('v1/simrs/ranap/layanan/hais/simpandata', form)
        console.log('save permintaan hais', resp.data)
        if (resp.status === 200) {
          // const storePasien = usePengunjungPoliStore()
          const storeRanap = usePengunjungRanapStore()
          const isi = resp?.data?.result
          // storePasien.injectDataPasien(pasien, isi, 'fisio')
          storeRanap.injectDataPasien(pasien?.noreg, isi, 'hais')
          this.setNotas(resp?.data?.nota)
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

    async hapusPermintaan (pasien, id) {
      this.loadingHapus = true
      const payload = { noreg: pasien?.noreg, id }
      try {
        const resp = await api.post('v1/simrs/ranap/layanan/hais/hapusdata', payload)
        this.loadingHapus = false
        // console.log(resp)
        if (resp.status === 200) {
          // const storePasien = usePengunjungPoliStore()
          const storeRanap = usePengunjungRanapStore()
          // storePasien.hapusDataFisio(pasien, id)
          storeRanap.hapusDataInjectan(pasien, id, 'hais')
          this.setNotas(resp?.data?.nota)
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
        isk: [],
        iadp: [],
        ido: [],
        plebitis: [],
        vap: [],
        kultur: null,
        antibiotik: null
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
