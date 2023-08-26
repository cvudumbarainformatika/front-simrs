import { defineStore } from 'pinia'
// import { api } from 'src/boot/axios'

export const useLayananPoli = defineStore('layanan-poli', {
  state: () => ({
    tab: 'Diagnosa',
    tabs: ['Diagnosa', 'Tindakan'],
    // diagnosa
    searchdiagnosa: '',
    formdiagnosa: {
      code: '',
      keterangan: '',
      kasus: 'Baru',
      tipe: 'Iya'
    },
    // tindakan
    searchtindakan: '',
    formtindakan: {
      tindakan: '',
      tarif: 0,
      jumlah: 1,
      subtotal: 0,
      pelaksana: '',
      keterangan: ''
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
