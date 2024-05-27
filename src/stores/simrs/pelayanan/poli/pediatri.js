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
    pediatris: [],
    pediatri: null,

    form: {},
    loadingSave: false,
    preview: false,
    bukaCdc: false,
    masterCdc: [],
    isEdited: false
  }),
  actions: {

    initForm (pasien) {
      const riwayatPediatri = this.pediatris

      const data = riwayatPediatri.length ? riwayatPediatri[riwayatPediatri.length - 1] : null

      this.isEdited = data?.noreg === pasien?.noreg

      // ini baru hanya untuk simpan data
      if (!this.isEdited) {
        this.form.bb = pasien?.pemeriksaanfisik?.length ? pasien.pemeriksaanfisik[0]?.beratbadan : null
        this.form.pb = pasien?.pemeriksaanfisik?.length ? pasien.pemeriksaanfisik[0]?.tinggibadan : null
        this.form.age_m = 0
        this.form.lk = null
        this.form.lila = null
        this.form.bbi = null
        this.form.bmi = null
        this.form.catatanBmi = null
        this.form.keteranganBmi = null
      }

      // anamnesis tambahan
      this.form.riwayatPerinatal = data?.riwayatPerinatal ?? null
      this.form.imunisasiDasar = data?.imunisasiDasar ?? []
      this.form.imunisasiUlang = data?.imunisasiUlang ?? []

      // kebiasaan Pasien Saat Sakit
      this.form.polaKomunikasi = data?.polaKomunikasi ?? 'Normal'
      this.form.polaKomunikasiLain = data?.polaKomunikasiLain ?? null
      this.form.makananPokok = data?.makananPokok ?? 'Nasi'
      this.form.makananPokokLain = data?.makananPokokLain ?? null

      // asesmen jatuh
      this.form.skorMethodeHumpty = data?.skorMethodeHumpty ?? null
      this.form.resikoMethodeHumpty = data?.resikoMethodeHumpty ?? null
      this.form.skorMorsefallScale = data?.skorMorsefallScale ?? null
      this.form.resikoMorsefallScale = data?.resikoMorsefallScale ?? null

      this.form.mobilisasi = data?.mobilisasi ?? null
      this.form.perluBantuan = data?.perluBantuan ?? null
      this.form.alatBantu = data?.alatBantu ?? null

      this.form.kriteriaHasil = data?.kriteriaHasil ?? null
      this.form.implementasi = data?.implementasi ?? null
      this.form.evaluasi = data?.evaluasi ?? null
      this.form.catatanKie = data?.catatanKie ?? null

      // skreening Gizi
      this.form.poin1 = data?.poin1 ?? 0
      this.form.poin2 = data?.poin2 ?? 0
      this.form.poin3 = data?.poin3 ?? 0
      this.form.poin4 = data?.poin4 ?? 0
      this.form.skorGizi = data?.skorGizi ?? 0

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

    getData (pasien) {
      const params = { params: { norm: pasien?.norm } }

      return new Promise((resolve, reject) => {
        api.get('v1/simrs/pelayanan/pediatri/get-pediatri-by-norm', params)
          .then((resp) => {
            if (resp.status === 200) {
              console.log('pediatri-all :', resp.data)
              this.pediatris = resp.data
            }
            resolve(resp)
          })
          .catch((err) => {
            console.log(err)
            reject(err)
          })
      })
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
              // const storePasien = usePengunjungPoliStore()
              // const isi = resp.data
              // storePasien.injectDataPasien(pasien, isi, 'pediatri')
              notifSuccess(resp)
              this.pediatris = resp.data
              this.initForm(pasien)
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
              // const storePasien = usePengunjungPoliStore()
              // storePasien.hapusDataInjectan(pasien, id, 'pediatri')
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
    }

  }
})
