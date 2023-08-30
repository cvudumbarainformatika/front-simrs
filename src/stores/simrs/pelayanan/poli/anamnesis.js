import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { usePengunjungPoliStore } from './pengunjung'

export const useAnamnesis = defineStore('anamnesis', {
  state: () => ({
    form: {
      keluhanutama: '',
      riwayatpenyakit: '',
      riwayatalergi: '',
      keteranganalergi: '',
      riwayatpengobatan: ''
    },
    alergis: ['Obat', 'Makanan', 'Udara', 'Lain-lain']
  }),
  // getters: {
  //   doubleCount: (state) => state.counter * 2
  // },
  actions: {

    async saveData(pasien) {
      this.form.norm = pasien ? pasien.norm : ''
      this.form.noreg = pasien ? pasien.noreg : ''

      console.log(this.form)
      try {
        const resp = await api.post('v1/simrs/pelayanan/simpananamnesis', this.form)
        if (resp.status === 200) {
          console.log('simpan anamnesis', resp)
          const storePasien = usePengunjungPoliStore()
          storePasien.injectDataPasien(pasien, resp.data.result, 'anamnesis')
        }
      } catch (error) {
        console.log('anamnesis err', error)
      }
    },

    initReset() {
      return new Promise((resolve, reject) => {
        this.form = {
          keluhanutama: '',
          riwayatpenyakit: '',
          riwayatalergi: '',
          riwayatpengobatan: ''
        }

        resolve()
      })
    }

  }
})
