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
    loadingFormDiagnosa: false,
    formdiagnosa: {
      kddiagnosa: '',
      diagnosa: '',
      keterangan: '',
      kasus: 'Baru',
      tipediagnosa: 'Primer',
      dtd: ''
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

    setKode(val) {
      this.formdiagnosa.kddiagnosa = val
      const ada = this.listDiagnosa.length > 0
      if (ada) {
        const target = this.listDiagnosa.filter(x => x.kode === val)
        target.length
          ? this.formdiagnosa.diagnosa = target[0].keterangan
          : this.formdiagnosa.diagnosa = ''
        target.length
          ? this.formdiagnosa.dtd = target[0].dtd
          : this.formdiagnosa.dtd = ''
      }
    },

    async simpanDiagnosa(pasien) {
      const form = this.formdiagnosa
      form.noreg = pasien?.noreg
      form.norm = pasien?.norm
      form.ruangan = pasien?.kodepoli
      console.log('sdiag', form)

      // this.loadingFormDiagnosa = true
      // try {
      //   const resp = await api.post('v1/simrs/pelayanan/simpandiagnosa', this.formdiagnosa)
      //   if (resp.status === 200) {
      //     console.log(resp)
      //   }
      //   this.loadingFormDiagnosa = false
      // } catch (error) {
      //   console.log(error)
      //   this.loadingFormDiagnosa = false
      // }
    },

    initReset() {
      return new Promise((resolve, reject) => {
        this.tab = 'Diagnosa'
        this.tabs = ['Diagnosa', 'Tindakan']

        this.searchdiagnosa = ''
        this.formdiagnosa = {
          kddiagnosa: '',
          diagnosa: '',
          keterangan: '',
          kasus: 'Baru',
          tipediagnosa: 'Primer',
          dtd: ''
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
