import { defineStore } from 'pinia'
// import { api } from 'src/boot/axios'

export const useAnamnesis = defineStore('anamnesis', {
  state: () => ({
    form: {
      keluhanutama: '',
      riwayatpenyakit: '',
      riwayatalergi: '',
      riwayatpengobatan: ''
    }
  }),
  // getters: {
  //   doubleCount: (state) => state.counter * 2
  // },
  actions: {

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
