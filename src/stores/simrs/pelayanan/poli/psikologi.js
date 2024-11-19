import { defineStore } from 'pinia'
import { dateDbFormat } from 'src/modules/formatter'
import { api } from 'src/boot/axios'
import { usePengunjungPoliStore } from './pengunjung'
// import { notifErrVue, notifSuccess } from 'src/modules/utils'
// import { dateDbFormat } from 'src/modules/formatter'

export const usePsikologiPoli = defineStore('poli-psikologi', {
  state: () => ({
    masterSimptom: [
      'Sakit Kepala',
      'Kurang Nafsu Makan',
      'Sulit Tidur',
      'Mudah Takut',
      'Tegang',
      'Cemas',
      'Gemetar',
      'Gangguan Perut',
      'Sulit Konsentrasi',
      'Sedih',
      'Sulit Mengambil Keputusan',
      'Kehilangan Minat',
      'Merasa tidak berguna',
      'Mudah Lupa',
      'Merasa bersalah',
      'Mudah lelah',
      'Putus asa',
      'Mudah marah',
      'Mudah tersinggung',
      'Mimpi buruk',
      'Tidak percaya diri'
    ],
    optionSimptom: [],
    loadingSave: false,
    psikotes: null,
    form: {}
  }),
  actions: {
    setOptionsSimptom () {
      this.optionSimptom = this.masterSimptom.map(x => {
        return {
          label: x,
          value: x
        }
      })
    },

    setPsiko () {
      return new Promise((resolve, reject) => {
        if (this.psikotes !== null || this.psikotes !== '') {
          this.form.psikotespendukung.push(this.psikotes)
        }
        resolve()
      })
    },
    initForm () {
      this.form.urutankelahiran = null
      this.form.tanggalpemeriksaan = dateDbFormat(new Date())
      this.form.penampilanumum = null
      this.form.sikapThdPemeriksaan = null
      this.form.afek = null
      this.form.romanMuka = null
      this.form.prosesPikir = null
      this.form.gangguanPersepsi = null
      this.form.memory = null
      this.form.konsentrasi = null
      this.form.orientasi = null
      this.form.kemampuanverbal = null
      this.form.emosi = null
      this.form.prilaku = null
      this.form.psikotespendukung = []
      this.form.hasilTes = null
      this.form.simptom = []
      this.form.dinamikPsikologi = null
      this.form.diagnosaPsikologi = null
      this.form.rencanaIntervensiPsikologi = null
      this.form.intervensiPsikologi = null
    },

    saveData (pasien) {
      this.loadingSave = true

      this.form.noreg = pasien?.noreg
      this.form.norm = pasien?.norm

      return new Promise((resolve, reject) => {
        api.post('v1/simrs/pelayanan/psikiatripoli/store', this.form)
          .then((resp) => {
            this.loadingSave = false
            console.log(resp)

            const storePasien = usePengunjungPoliStore()
            let isi = resp.data
            if (resp.data === 1) {
              isi = this.form
            }
            storePasien.injectDataPasien(pasien, isi, 'psikiatri')

            this.initForm()
            resolve(resp)
          })
          .catch((err) => {
            console.log(err)
            reject(err)
            this.loadingSave = false
          })
      })
    },

    deleteData (pasien, id) {
      const payload = { id }
      return new Promise((resolve, reject) => {
        api.post('v1/simrs/pelayanan/psikiatripoli/deletedata', payload)
          .then((resp) => {
            if (resp.status === 200) {
              const storePasien = usePengunjungPoliStore()
              storePasien.hapusDataPsikiatri(pasien, id)
            }
            resolve(resp)
          })
          .catch((err) => {
            console.log(err)
            reject(err)
          })
      })
    }
  }
})
