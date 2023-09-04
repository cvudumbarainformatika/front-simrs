import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
// import { api } from 'src/boot/axios'

export const usePemeriksaanFisik = defineStore('pemeriksaan-fisik', {
  state: () => ({
    dialogTemplate: false,
    templateActive: 'Body',
    gambarActive: 0,
    fileGambar: '/src/assets/human/anatomys/body-human.jpg',
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
      suhutubuh: 0, // numerik derajat celcius
      // status
      statuspsikologis: 'Tidak ada kelainan',
      sosialekonomi: '',
      spiritual: ''
    }
  }),
  // getters: {
  //   doubleCount: (state) => state.counter * 2
  // },
  actions: {
    setTemplateActive(val) {
      this.templateActive = val
      this.dialogForm.anatomy = val === 'Body' ? '' : val
    },
    setGambarActive(val, file) {
      this.gambarActive = val
      this.fileGambar = file
    },
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
    },
    setDialogTemplate() {
      console.log('oooi')
      this.dialogTemplate = !this.dialogTemplate
    },
    async savePemeriksaan(pasien, menus) {
      // console.log(storage.$state?.user?.id)
      const arr = menus.length > 0 ? menus.filter(x => x.name !== 'Body').map(y => y.name) : []
      const arr2 = this.shapes
      const anatomys = []
      for (let i = 0; i < arr.length; i++) {
        const ada = arr2.filter(x => x.anatomy === arr[i])
        let obj = { nama: arr[i], ket: 'Tidak diperiksa' }
        if (ada.length > 0) {
          obj = { nama: ada[0].anatomy, ket: ada.map(x => x.ket).join() }
        }
        anatomys.push(obj)
      }
      const form = this.formVital
      form.noreg = pasien ? pasien.noreg : ''
      form.norm = pasien ? pasien.norm : ''
      form.ruangan = pasien ? pasien.poli : ''
      form.details = arr2
      form.anatomys = anatomys

      console.log('simpan pemeriksaan', form)

      const resp = await api.post('v1/simrs/pelayanan/simpanpemeriksaanfisik', form)
      console.log('resp dari back end', resp)
    },

    async saveImage(img, pasien, details) {
      // console.log(details)
      let keterangan = ''
      if (details.length) {
        keterangan = details.map(x => x.ket).join()
      }
      const obj = {
        noreg: pasien ? pasien.noreg : '',
        norm: pasien ? pasien.norm : '',
        image: img,
        keterangan
      }
      const resp = await api.post('v1/simrs/pelayanan/simpangambar', obj)

      console.log('simpan gambar', resp)
    },

    initReset() {
      return new Promise((resolve, reject) => {
        this.dialogTemplate = false
        this.templateActive = 'Body'
        this.gambarActive = 0
        this.fileGambar = '/src/assets/human/anatomys/body-human.jpg'
        this.writingMode = false
        this.dialogForm = {
          anatomy: '',
          ket: '',
          x: 0,
          y: 0,
          ketebalan: 2,
          panjang: 15,
          warna: '#000000',
          penanda: 'circle'
        }
        // this.shapes= [],
        this.formVital = {
          denyutjantung: '', // string
          pernapasan: '', // string
          // Tekanan darah
          sistole: 0, // numerik per mmHg
          diastole: 0, // numerik per mmHg
          suhutubuh: 0, // numerik derajat celcius
          // status
          statuspsikologis: 'Tidak ada kelainan',
          sosialekonomi: '',
          spiritual: ''
        }

        resolve()
      })
    }

  }
})
