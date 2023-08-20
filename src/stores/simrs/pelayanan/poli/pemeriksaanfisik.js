import { defineStore } from 'pinia'

export const usePemeriksaanFisik = defineStore('pemeriksaan-fisik', {
  state: () => ({
    dialogTemplate: false,
    writingMode: false,
    dialogForm: {
      anatomy: '',
      ket: '',
      x: 0,
      y: 0,
      ketebalan: 2,
      panjang: 15,
      warna: '#000000',
      penanda: 'circle'
    },
    shapes: [],
    formVital: {
      denyutjantung: '', // string
      pernapasan: '', // string
      // Tekanan darah
      sistole: 0, // numerik per mmHg
      diastole: 0, // numerik per mmHg
      suhutubuh: 0 // numerik derajat celcius
    }
  }),
  // getters: {
  //   doubleCount: (state) => state.counter * 2
  // },
  actions: {
    pushShapes(val) {
      return new Promise((resolve, reject) => {
        const newArr = [...this.shapes]
        newArr.push(val)
        this.shapes = newArr
        this.setDialogForm('anatomy', '')
        this.setDialogForm('ket', '')
        resolve()
      })
    },

    deleteObjShapes(idx) {
      // const index = this.shapes.indexOf(idx);
      if (idx > -1) { // only splice array when item is found
        this.shapes.splice(idx, 1) // 2nd parameter means remove one item only
      }
    },

    resetShapes() {
      this.shapes = []
    },

    setDialogForm(key, val) {
      this.dialogForm[key] = val
    }

  }
})
