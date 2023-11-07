import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifSuccess } from 'src/modules/utils'
import { usePengunjungPoliStore } from './pengunjung'
import { useMasterPemeriksaanFisik } from '../../master/poliklinik/pemeriksaanfisik'
// import { api } from 'src/boot/axios'

export const usePemeriksaanFisik = defineStore('pemeriksaan-fisik', {
  state: () => ({
    tab: 'Fisik',
    tabs: ['Fisik', 'Anatomy'],
    dialogTemplate: false,
    fullCanvas: false,
    templateActive: 'Body',
    gambarActive: 0,
    // fileGambar: '/src/assets/human/anatomys/body-human.jpg',
    fileGambar: null,
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
    formMata: {
      vodawal: '',
      vodrefraksi: '',
      vodakhir: '',
      vosawal: '',
      vosrefraksi: '',
      vosakhir: '',
      tod: '',
      tos: '',
      fondosod: '',
      fondosos: ''
    },
    formParu: {
      inspeksi: '',
      palpasi: '',
      perkusi: '',
      auskultasi: ''
    },
    shapes: [],
    mata: [],
    paru: [],
    selectStatusPsikologi: [],
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
      spiritual: '',
      skornyeri: 0,
      keteranganskornyeri: 'tidak ada nyeri'
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
    setFormVital(key, val) {
      this.formVital[key] = val
    },
    setTemplateActive(val) {
      this.templateActive = val
      this.dialogForm.anatomy = val === 'Body' ? '' : val
    },
    setGambarActive(val, file) {
      this.gambarActive = val
      this.fileGambar = file
      this.setDialogTemplate()
    },
    setFullCanvas() {
      this.fullCanvas = !this.fullCanvas
      // console.log(this.fullCanvas)
      // const master = useMasterPemeriksaanFisik()
      // const file = master?.items[0]?.gambars[0]?.url
      // this.templateActive = this
      // this.gambarActive = 0
      // this.fileGambar = file ?? null
    },
    setFullCanvasFalse() {
      this.fullCanvas = false
    },
    pushShapes(val) {
      return new Promise((resolve, reject) => {
        const newArr = [...this.shapes]
        newArr.push(val)
        this.shapes = newArr
        this.setDialogForm('anatomy', '')
        this.setDialogForm('ket', '')

        if (val.anatomy === 'Mata') {
          const newMata = [...this.mata]
          newMata.push(this.formMata)
          this.mata = newMata
        }
        if (val.anatomy === 'Dada dan Paru') {
          const newParu = [...this.paru]
          newParu.push(this.formParu)
          this.paru = newParu
        }

        this.resetFormMataDanParu()
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
      this.mata = []
      this.paru = []
    },

    resetFormMataDanParu() {
      this.formMata = {
        vodawal: '',
        vodrefraksi: '',
        vodakhir: '',
        vosawal: '',
        vosrefraksi: '',
        vosakhir: '',
        tod: '',
        tos: '',
        fondosod: '',
        fondosos: ''
      }
      this.formParu = {
        inspeksi: '',
        palpasi: '',
        perkusi: '',
        auskultasi: ''
      }
    },

    setDialogForm(key, val) {
      this.dialogForm[key] = val
    },
    setDialogTemplate() {
      // console.log('oooi')
      this.dialogTemplate = !this.dialogTemplate
    },

    setKeteranganSkornyeri(val) {
      if (val === 0) {
        this.formVital.keteranganskornyeri = 'tidak ada nyeri'
      } else if (val > 0 && val <= 3) {
        this.formVital.keteranganskornyeri = 'nyeri ringan'
      } else if (val > 3 && val <= 6) {
        this.formVital.keteranganskornyeri = 'nyeri sedang'
      } else if (val > 6 && val <= 10) {
        this.formVital.keteranganskornyeri = 'nyeri berat'
      }
    },
    async savePemeriksaan(pasien, menus) {
      this.loadingform = true
      const arr = menus.length > 0 ? menus.filter(x => x.nama !== 'Body').map(y => y.nama) : []

      const arr2 = this.shapes
      const anatomys = []
      for (let i = 0; i < arr.length; i++) {
        let obj = { nama: arr[i], ket: 'Tidak Ada Kelainan / TAK' }
        const ada = arr2.filter(x => x.anatomy === arr[i])
        if (ada.length > 0) {
          obj = { nama: ada[0].anatomy, ket: ada.map(x => x.ket).join() ?? 'Tidak Ada Kelainan / TAK' }
        }

        anatomys.push(obj)
      }
      const form = this.formVital
      form.noreg = pasien ? pasien.noreg : ''
      form.norm = pasien ? pasien.norm : ''
      form.ruangan = pasien ? pasien.poli : ''
      form.details = arr2
      form.anatomys = anatomys

      // FORm LOKALIS MATA

      if (this.mata.length) {
        form.mata = this.mata
      }

      // form lokalis Paru

      if (this.paru.length) {
        form.paru = this.paru
      }
      // console.log('LOG FORM', form)
      try {
        const resp = await api.post('v1/simrs/pelayanan/simpanpemeriksaanfisik', form)
        console.log('save', resp)
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
      } catch (error) {
        console.log('savepemeriksaan', error)
        // notifErr(error.response)
        this.loadingform = false
      }
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
          this.fileGambar = '/src/assets/human/anatomys/body-human.jpg'
          return new Promise((resolve, reject) => {
            resolve()
          })
        }
        this.loadingform = false
      } catch (error) {
        console.log(error)
        this.loadingform = false
      }
    },

    // editForm(val) {
    //   this.formVital = {
    //     tingkatkesadaran: val.tingkatkesadaran,
    //     denyutjantung: val.rs4, // string
    //     pernapasan: val.pernapasan, // string
    //     // Tekanan darah
    //     sistole: val.sistole, // numerik per mmHg
    //     diastole: val.diastole, // numerik per mmHg
    //     suhutubuh: val.suhutubuh, // numerik derajat celcius
    //     // status
    //     statuspsikologis: val.statuspsikologis,
    //     sosialekonomi: val.sosialekonomi,
    //     spiritual: val.spiritual
    //   }
    //   this.shapes = val.detailgambars
    //   this.fileGambar = this.shapes[0]?.templategambar
    //   console.log('form', this.form)
    //   console.log('xxx', val)
    // },

    initReset(val) {
      // ini load template gambar pertama
      const master = useMasterPemeriksaanFisik()
      const file = master?.items[0]?.gambars[0]?.image

      return new Promise((resolve, reject) => {
        this.dialogTemplate = false
        // this.templateActive = 'Body'
        // this.gambarActive = 0
        // this.fileGambar = file ?? null
        this.templateActive = val ? 'Body' : this.templateActive
        this.gambarActive = val ? 0 : this.gambarActive
        this.fileGambar = val ? file ?? null : this.fileGambar
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
        // this.shapes = []
        this.shapes = val ? [] : this.shapes
        this.selectStatusPsikologi = []
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
          spiritual: '',
          skornyeri: 0,
          keteranganskornyeri: 'tidak ada nyeri'
        }

        resolve()
      })
    }

  }
})
