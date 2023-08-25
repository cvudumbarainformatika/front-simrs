import { defineStore } from 'pinia'
// import { api } from 'src/boot/axios'

export const useLayananPoli = defineStore('layanan-poli', {
  state: () => ({
    tab: 'Diagnosa',
    tabs: ['Diagnosa', 'Tindakan'],
    searchdiagnosa: '',
    formdiagnosa: {
      code: '',
      keterangan: '',
      kasusbaru: 'Tidak',
      primer: 'Iya'
    }
  }),
  // getters: {
  //   doubleCount: (state) => state.counter * 2
  // },
  actions: {

    initReset() {
      return new Promise((resolve, reject) => {
        this.tab = 'Diagnosa'
        this.tabs = ['Diagnosa', 'Tindakan']

        resolve()
      })
    }

  }
})
