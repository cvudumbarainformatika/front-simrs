import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
// import { api } from 'src/boot/axios'

export const useLayananPoli = defineStore('layanan-poli', {
  state: () => ({
    tab: 'Diagnosa',
    tabs: ['Diagnosa', 'Tindakan'],
    // diagnosa
    searchdiagnosa: '',
    listDiagnosa: [],
    formdiagnosa: {
      kode: '',
      diagnosa: '',
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

    async getDiagnosaDropdown() {
      const resp = await api.get('v1/simrs/pelayanan/listdiagnosa')
      if (resp.status === 200) {
        this.listDiagnosa = resp.data
      }
    },

    initReset() {
      return new Promise((resolve, reject) => {
        this.tab = 'Diagnosa'
        this.tabs = ['Diagnosa', 'Tindakan']

        this.searchdiagnosa = ''
        this.formdiagnosa = {
          kode: '',
          diagnosa: '',
          keterangan: '',
          kasus: 'Baru',
          tipe: 'Iya'
        }
        // tindakan
        this.searchtindakan = ''
        this.formtindakan = {
          tindakan: '',
          tarif: 0,
          jumlah: 1,
          subtotal: 0,
          pelaksana: '',
          keterangan: ''
        }

        resolve()
      })
    }

  }
})
