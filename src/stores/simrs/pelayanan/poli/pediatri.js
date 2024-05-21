import { defineStore } from 'pinia'
// eslint-disable-next-line no-unused-vars
import { api } from 'src/boot/axios'
// eslint-disable-next-line no-unused-vars
import { usePengunjungPoliStore } from './pengunjung'
// eslint-disable-next-line no-unused-vars
import { notifErr, notifSuccess } from 'src/modules/utils'

export const usePediatriStore = defineStore('pediatri-poli', {
  state: () => ({
    imunisasiDasars: ['HBU', 'BCG / Polio I', 'DPT-HB-HbI / Polio II', 'DPT-HB-HbII / Polio III',
      'DPT-HB-HbIII / Polio IV', 'Campak / MRI'
    ],
    imunisasiUlangs: ['DPT-HB-HbIV / Polio V', 'Campak / MRII'],
    polaKomunikasis: ['Normal', 'Introvert', 'Ekstrovert', 'Lain-lain'],
    makananPokoks: ['Nasi', 'Selain nasi'],
    mobilisasis: ['Mandiri', 'Perlu bantuan', 'Alat bantu jalan'],

    points1: [{ value: 1, label: 'Ya' }, { value: 0, label: 'Tidak' }],
    points2: [{ value: 2, label: 'Ya' }, { value: 0, label: 'Tidak' }],
    points3: [{ value: 1, label: 'Ya' }, { value: 0, label: 'Tidak' }],
    points4: [{ value: 2, label: 'Ya' }, { value: 0, label: 'Tidak' }],

    kesimpulanSkreeningGizi: 'Tidak Beresiko mal nutrisi',
    form: {},
    loadingSave: false,
    preview: false,
    bukaCdc: false,
    masterCdc: []
  }),
  actions: {

    initForm (pasien) {
      // ini baru
      this.form.bb = pasien?.pemeriksaanfisik?.length ? pasien.pemeriksaanfisik[0]?.beratbadan : null
      this.form.pb = pasien?.pemeriksaanfisik?.length ? pasien.pemeriksaanfisik[0]?.tinggibadan : null
      this.form.lk = null
      this.form.lila = null
      this.form.bbi = null
      this.form.bmi = null
      // anamnesis tambahan
      this.form.riwayatPerinatal = null
      this.form.imunisasiDasar = []
      this.form.imunisasiUlang = []

      // kebiasaan Pasien Saat Sakit
      this.form.polaKomunikasi = 'Normal'
      this.form.polaKomunikasiLain = null
      this.form.makananPokok = 'Nasi'
      this.form.makananPokokLain = null

      // asesmen jatuh
      this.form.skorMethodeHumpty = null
      this.form.resikoMethodeHumpty = null
      this.form.skorMorsefallScale = null
      this.form.resikoMorsefallScale = null

      this.form.mobilisasi = null
      this.form.perluBantuan = null
      this.form.alatBantu = null

      this.form.kriteriaHasil = null
      this.form.implementasi = null
      this.form.evaluasi = null
      this.form.catatanKie = null

      // skreening Gizi
      this.form.poin1 = 0
      this.form.poin2 = 0
      this.form.poin3 = 0
      this.form.poin4 = 0
      this.form.skorGizi = 0

      this.setSkorGizi()
    },

    setSkorGizi () {
      const jml = parseInt(this.form.poin1) + parseInt(this.form.poin2) + parseInt(this.form.poin3) +
      parseInt(this.form.poin4)
      this.form.skorGizi = jml

      if (jml < 2) {
        this.kesimpulanSkreeningGizi = 'Tidak Beresiko mal nutrisi'
      }
      else {
        this.kesimpulanSkreeningGizi = 'Beresiko mal nutrisi'
      }
    },

    saveData (pasien) {
      this.form.noreg = pasien?.noreg
      this.form.norm = pasien?.norm

      // console.log(this.form)
      return new Promise((resolve, reject) => {
        api.post('v1/simrs/pelayanan/pediatri/store', this.form)
          .then((resp) => {
            // console.log(resp)
            if (resp.status === 200) {
              const storePasien = usePengunjungPoliStore()
              const isi = resp.data
              storePasien.injectDataPasien(pasien, isi, 'pediatri')
              notifSuccess(resp)
              this.initForm()
              this.loadingSave = false
            }
            this.loadingSave = false
          })
          .catch((err) => {
            console.log(err)
            this.loadingSave = false
            reject(err)
          })
      })
    },

    deleteData (pasien, id) {
      const payload = { id }
      return new Promise((resolve, reject) => {
        api.post('v1/simrs/pelayanan/pediatri/deletedata', payload)
          .then((resp) => {
            // console.log('del', resp)
            if (resp.status === 200) {
              const storePasien = usePengunjungPoliStore()
              storePasien.hapusDataInjectan(pasien, id, 'pediatri')
              notifSuccess(resp)
            }
          })
          .catch((err) => {
            console.log(err)
            reject(err)
          })
      })
    },

    previewData (item) {
      this.preview = true
      this.form = item
    },

    getMasterCdc () {
      return new Promise((resolve, reject) => {
        api.get('v1/simrs/pelayanan/pediatri/master-who-cdc')
          .then((resp) => {
            console.log('master', resp)
            if (resp.status === 200) {
              this.masterCdc = resp.data
            }
          })
          .catch((err) => {
            console.log(err)
            reject(err)
          })
      })
    },

    getJsonData () {
      fetch('https://echarts.apache.org/examples/data/asset/data/life-expectancy-table.json')
        .then(response => response.json())
        .then(data => {
          // Handle the response data
          console.log('json', data)
        })
        .catch(error => {
          // Handle any errors
          console.error(error)
        })
    }

  }
})
