import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { usePengunjungPoliStore } from './pengunjung'
import { notifSuccess } from 'src/modules/utils'
import { usePengunjungRanapStore } from '../../ranap/pengunjung'

export const useEdukasiPoliStore = defineStore('edukasi-poli', {
  state: () => ({
    mpenerimaedukasi: [],
    mkebutuhanedukasi: [],
    selectKebutuhanEdukasi: [],
    selectPenerimaEdukasi: [],
    form: {
      noreg: '',
      norm: '',
      edukasi: '',
      koderuang: '', // kodepoli
      kepada: 'Pasien',
      perlupenerjemah: 'Tidak',
      bahasaisyarat: 'Tidak',
      caraedukasi: 'Lisan',
      kesediaan: 'Iya',
      kebutuhanedukasi: ''
    },
    loadingSave: false
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
    async getMasterPenerimaEdukasi () {
      const resp = await api.get('v1/simrs/pelayanan/mpenerimaedukasi')
      // console.log('mpenerimaedukasi', resp)
      if (resp?.status === 200) {
        this.mpenerimaedukasi = resp?.data
      }
    },
    async getMasterKebutuhanEdukasi () {
      const resp = await api.get('v1/simrs/pelayanan/mkebutuhanedukasi')
      // console.log('mkebutuhanedukasi', resp)
      if (resp?.status === 200) {
        this.mkebutuhanedukasi = resp?.data
      }
    },
    setForm (key, val) {
      this.form[key] = val
    },
    async simpanEdukasi (pasien) {
      this.loadingSave = true

      this.form.noreg = pasien?.noreg
      this.form.norm = pasien?.norm
      this.form.koderuang = pasien?.kodepoli
      try {
        const resp = await api.post('v1/simrs/pelayanan/simpanedukasi', this.form)
        // console.log('save edukasi', resp)
        if (resp?.status === 200) {
          const storePasien = usePengunjungPoliStore()
          const storeRananp = usePengunjungRanapStore()
          const isi = resp?.data?.result
          storePasien.injectDataPasien(pasien, isi, 'edukasi')
          storeRananp.injectDataPasien(pasien?.noreg, isi, 'edukasi')
          notifSuccess(resp)
          this.loadingSave = false
        }
      }
      catch (error) {
        // console.log(error)
        this.loadingSave = false
      }
    },

    async hapusItem (pasien, id) {
      const payload = { id, noreg: pasien?.noreg }
      try {
        const resp = await api.post('v1/simrs/pelayanan/hapusedukasi', payload)
        // console.log('hapus laborat', resp)
        if (resp.status === 200) {
          const storePasien = usePengunjungPoliStore()
          const storeRananp = usePengunjungRanapStore()
          storePasien.hapusDataEdukasi(pasien, id)
          storeRananp.hapusDataInjectan(pasien, id, 'edukasi')
          this.setNotas(resp?.data?.nota)
          notifSuccess(resp)
        }
      }
      catch (error) {
        console.log('hapus laborat', error)
      }
    }
  }
})
