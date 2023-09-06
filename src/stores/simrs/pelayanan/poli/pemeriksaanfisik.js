import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifSuccess } from 'src/modules/utils'
import { usePengunjungPoliStore } from './pengunjung'
// import { api } from 'src/boot/axios'

export const usePemeriksaanFisik = defineStore('pemeriksaan-fisik', {
  state: () => ({
    tab: 'Fisik',
    tabs: ['Fisik', 'Anatomy'],
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
      tingkatkesadaran: 0,
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
    },
    optionsTingkatkesadaran: [
      { value: 0, label: 'Sadar Baik/Alert' },
      { value: 1, label: 'Berespon denga kata-kata / Voice' },
      { value: 2, label: 'Hanya berespons jika dirangsang nyeri / Pain' },
      { value: 3, label: 'Pasien tidak sadar / Unresponsive' },
      { value: 4, label: 'Gelisah atau bingung' },
      { value: 5, label: 'Acute Confusional States' }
    ],
    loadingform: false
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
      this.setDialogTemplate()
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
      // console.log('oooi')
      this.dialogTemplate = !this.dialogTemplate
    },
    async savePemeriksaan(pasien, menus) {
      // console.log(storage.$state?.user?.id)
      this.loadingform = true
      const arr = menus.length > 0 ? menus.filter(x => x.name !== 'Body').map(y => y.name) : []
      const arr2 = this.shapes
      const anatomys = []
      for (let i = 0; i < arr.length; i++) {
        const ada = arr2.filter(x => x.anatomy === arr[i])
        let obj = { nama: arr[i], ket: 'Tidak Ada Kelainan / TAK' }
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

      // console.log('simpan pemeriksaan', form)
      const resp = await api.post('v1/simrs/pelayanan/simpanpemeriksaanfisik', form)
      if (resp.status === 200) {
        const storePasien = usePengunjungPoliStore()
        const isi = resp.data.result
        storePasien.injectDataPasien(pasien, isi, 'pemeriksaanfisik')

        notifSuccess(resp)
        this.initReset()
        this.loadingform = false
        return new Promise((resolve, reject) => {
          resolve()
        })
      }
      this.loadingform = false
    },

    async deleteData(pasien, id) {
      const payload = { id }
      try {
        const resp = await api.post('v1/simrs/pelayanan/hapuspemeriksaanfisik', payload)
        if (resp.status === 200) {
          const storePasien = usePengunjungPoliStore()
          storePasien.hapusDataPemeriksaanfisik(pasien, id)
          notifSuccess(resp)
        }
      } catch (error) {
        console.log(error)
      }
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
      if (resp.status === 200) {
        console.log('simpan gambar', resp)
        const storePasien = usePengunjungPoliStore()
        const isi = resp.data.result
        storePasien.injectDataPasien(pasien, isi, 'gambars')
        notifSuccess(resp)
      }
    },

    async deleteGambar(pasien, nama) {
      this.loadingform = true
      const payload = { nama }
      try {
        const resp = await api.post('v1/simrs/pelayanan/hapusgambar', payload)
        if (resp.status === 200) {
          // console.log(resp)
          const storePasien = usePengunjungPoliStore()
          storePasien.hapusGambars(pasien, nama)
          notifSuccess(resp)
          this.loadingform = false
        }
        this.loadingform = false
      } catch (error) {
        console.log(error)
        this.loadingform = false
      }
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
        this.shapes = []
        this.formVital = {
          tingkatkesadaran: 0,
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
