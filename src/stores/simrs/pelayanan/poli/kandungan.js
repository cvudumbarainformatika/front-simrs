import { defineStore } from 'pinia'
// eslint-disable-next-line no-unused-vars
import { api } from 'src/boot/axios'
// eslint-disable-next-line no-unused-vars
import { usePengunjungPoliStore } from './pengunjung'
// eslint-disable-next-line no-unused-vars
import { notifErr, notifSuccess } from 'src/modules/utils'

export const useKandunganStore = defineStore('kandungan-poli', {
  state: () => ({
    form: {},
    loadingSave: false,
    preview: false,
    riwayatObstetri: [],

    tribulans: ['I', 'II', 'III.1', 'III.2'],

    penyebabPenyakits: ['Hukuman', 'Ujian', 'Takdir', 'Buatan orang lain', 'Keturunan'],
    polaKomunikasis: ['Normal', 'Introvert', 'Ekstrovert', 'Lain-lain'],

    kesimpulanKehamilan: 'Resiko rendah',
    kesimpulanSkreeningGizi: 'Tidak Beresiko mal nutrisi',
    resikoJatuhs: [
      'Tidak seimbang / sempoyongan / limbung',
      'Jalan Menggunakan alat bantu (kruk/kripot, kursi roda, orang lain',
      'Menopang saat akan duduk : tampak memegang pingiiran kursi atau meja / benda lain sebagai penopang saat akan duduk'
    ],
    mobilisasis: ['Mandiri', 'Perlu bantuan'],
    points1: [{ value: 1, label: 'Ya' }, { value: 0, label: 'Tidak' }],
    points2: [{ value: 2, label: 'Ya' }, { value: 0, label: 'Tidak' }],
    points3: [{ value: 1, label: 'Ya' }, { value: 0, label: 'Tidak' }],
    points4: [{ value: 2, label: 'Ya' }, { value: 0, label: 'Tidak' }],

    masterSkrining: [],
    skriningAllFromServer: [],
    addEdited: false,
    formSkrining: {
      kehamilanNo: 1,
      skriningKehamilan: []
    }
  }),
  actions: {

    initForm() {
      this.form = {}
      // anamnesis tambahan
      this.form.operasi = null
      this.form.gemeli = null
      this.form.menarche = null
      this.form.menstruasi = null
      this.form.menikahKe = 1
      this.form.kontrasepsi = null
      this.form.kandunganG = null
      this.form.kandunganP = null
      this.form.kandunganA = null
      this.form.haidAwal = null
      this.form.tglHarapanLahir = null
      this.form.keluhan = null
      this.form.pemeriksaanDalam = null

      // skreening dini

      // this.form.tribulanKe = 'I'
      // this.form.skor0 = 2
      // this.form.skor1 = 0
      // this.form.skor2a = 0
      // this.form.skor2b = 0
      // this.form.skor3 = 0
      // this.form.skor4 = 0
      // this.form.skor5 = 0
      // this.form.skor6 = 0
      // this.form.skor7 = 0
      // this.form.skor8 = 0
      // this.form.skor9a = 0
      // this.form.skor9b = 0
      // this.form.skor9c = 0
      // this.form.skor10 = 0
      // this.form.skor11a = 0
      // this.form.skor11b = 0
      // this.form.skor11c = 0
      // this.form.skor11d = 0
      // this.form.skor11d = 0
      // this.form.skor11e = 0
      // this.form.skor11f = 0
      // this.form.skor12 = 0
      // this.form.skor13 = 0
      // this.form.skor14 = 0
      // this.form.skor15 = 0
      // this.form.skor16 = 0
      // this.form.skor17 = 0
      // this.form.skor18 = 0
      // this.form.skor19 = 0
      // this.form.skor20 = 0
      // this.form.jmlSkor = 0

      // kultural

      this.form.penyebabPenyakit = null
      this.form.polaKomunikasi = 'Normal'
      this.form.polaKomunikasiLain = null

      // skreening gizi
      this.form.poin1 = 0
      this.form.poin2 = 0
      this.form.poin3 = 0
      this.form.poin4 = 0
      this.form.skorGizi = 0

      // skreening jatuh
      this.form.resikoJatuh = []

      this.form.mobilisasi = 'Mandiri'
      this.form.perluBantuan = null
      this.form.alatBantuJalan = null

      this.setSkorGizi()
    },

    setSkorKandungan() {
      const jml = this.form.skor0 + this.form.skor1 + this.form.skor2a + this.form.skor2b + this.form.skor3 + this.form.skor4 + this.form.skor5 + this.form.skor6 + this.form.skor7 + this.form.skor8 +
      this.form.skor9a + this.form.skor9b + this.form.skor9c + this.form.skor10 + this.form.skor11a + this.form.skor11b + this.form.skor11c + this.form.skor11d + this.form.skor11e +
      this.form.skor11f + this.form.skor12 + this.form.skor13 + this.form.skor14 + this.form.skor15 + this.form.skor16 + this.form.skor17 + this.form.skor18 + this.form.skor19 + this.form.skor20
      this.form.jmlSkor = jml

      if (jml >= 0 && jml <= 5) {
        this.kesimpulanKehamilan = 'Resiko rendah'
      } else if (jml >= 6 && jml <= 11) {
        this.kesimpulanKehamilan = 'Resiko sedang'
      } else if (jml >= 12) {
        this.kesimpulanKehamilan = 'Resiko berat'
      }
    },

    setSkorGizi() {
      const jml = parseInt(this.form.poin1) + parseInt(this.form.poin2) + parseInt(this.form.poin3) +
      parseInt(this.form.poin4)
      this.form.skorGizi = jml

      if (jml < 2) {
        this.kesimpulanSkreeningGizi = 'Tidak Beresiko mal nutrisi'
      } else {
        this.kesimpulanSkreeningGizi = 'Beresiko mal nutrisi'
      }
    },

    saveData(pasien) {
      this.form.noreg = pasien?.noreg
      this.form.norm = pasien?.norm

      // console.log(this.form)
      return new Promise((resolve, reject) => {
        api.post('v1/simrs/pelayanan/kandungan/store', this.form)
          .then((resp) => {
            // console.log(resp)
            if (resp.status === 200) {
              const storePasien = usePengunjungPoliStore()
              const isi = resp.data
              storePasien.injectDataPasien(pasien, isi, 'kandungan')
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

    deleteData(pasien, id) {
      const payload = { id }
      return new Promise((resolve, reject) => {
        api.post('v1/simrs/pelayanan/kandungan/deletedata', payload)
          .then((resp) => {
            // console.log('del', resp)
            if (resp.status === 200) {
              const storePasien = usePengunjungPoliStore()
              storePasien.hapusDataInjectan(pasien, id, 'kandungan')
              notifSuccess(resp)
            }
          })
          .catch((err) => {
            console.log(err)
            reject(err)
          })
      })
    },

    // previewData(item) {
    //   this.preview = true
    //   this.form = item
    // }

    getMasterSkreening() {
      return new Promise((resolve, reject) => {
        api.get('v1/simrs/pelayanan/kandungan/masterskrining')
          .then((resp) => {
            // console.log('del', resp)
            if (resp.status === 200) {
              this.masterSkrining = resp.data
            }
          })
          .catch((err) => {
            console.log(err)
            reject(err)
          })
      })
    },

    getskrining(pasien) {
      const params = {
        params: {
          norm: pasien?.norm
        }
      }

      return new Promise((resolve, reject) => {
        api.get('v1/simrs/pelayanan/kandungan/skrining', params)
          .then((resp) => {
            // console.log('skrining', resp)
            if (resp.status === 200) {
              this.skriningAllFromServer = resp.data
              this.filterFormSkrining(resp.data)
            }
          })
          .catch((err) => {
            console.log(err)
            reject(err)
          })
      })
    },

    filterFormSkrining(data) {
      const arr = this.skriningAllFromServer
      const res = arr.length ? arr.filter(x => x.kehamilanNo === this.formSkrining.kehamilanNo).map(x => x.valueSingkat) : []
      this.formSkrining.skriningKehamilan = res
    },

    saveSkrining(pasien) {
      this.formSkrining.noreg = pasien?.noreg
      this.formSkrining.norm = pasien?.norm
      this.loadingSave = true
      return new Promise((resolve, reject) => {
        api.post('v1/simrs/pelayanan/kandungan/storeSkrining', this.formSkrining)
          .then((resp) => {
            // console.log('save skrining', resp)
            if (resp.status === 200) {
              this.getskrining(pasien)
              notifSuccess(resp)
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

    setUpdateSkrining(val) {
      if (this.formSkrining.skriningKehamilan.length) {
        const arr = this.formSkrining.skriningKehamilan
        if (arr.includes(val)) {
          this.addEdited = false
        } else {
          this.addEdited = true
        }
      } else {
        this.addEdited = false
      }
      // console.log('val', val)
      // console.log('edited', this.addEdited)
    }

  }
})
