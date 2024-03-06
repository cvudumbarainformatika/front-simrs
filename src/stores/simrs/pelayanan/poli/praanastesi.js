import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
// import { usePengunjungPoliStore } from './pengunjung'
import { notifErr, notifSuccess } from 'src/modules/utils'

export const usePraAnastesiStore = defineStore('pra-anastesi-store', {
  state: () => ({
    master: [],
    masterKajian: [],
    masterKajian2: [],
    masterKeadaanUmum: [],
    masterLab: [],
    masterLab2: [],
    asaClass: [],
    // keteranganKajianSistem: null,
    // keteranganLaborat: null,
    penyulit: null,
    form: {
      skorMallampati: null,
      jantung: null,
      paruparu: null,
      abdomen: null,
      tulangbelakang: null,
      ekstremitas: null,
      neurologi: null,
      keteranganKajianSistem: null,
      keteranganLaborat: null,
      catatan: null,
      perencanaan: null,
      penyulitAnastesi: []
    },
    resultPraAnastesi: [],
    waiting: false
  }),
  // getters: {
  //   doubleCount: (state) => state.counter * 2
  // },
  actions: {
    getMaster() {
      return new Promise((resolve, reject) => {
        api.get('/v1/simrs/pelayanan/praanastesi/master')
          .then(resp => {
            console.log(resp)
            if (resp.status === 200) {
              const m = resp.data
              this.reducerMaster(m)
            }
            resolve(resp)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },

    reducerMaster(m) {
      this.master = m
      const kaj = m.filter(x => x.group === 'kajian sistem')?.map(x => {
        return {
          kajian: x.nama,
          check: false
        }
      })
      this.masterKajian = kaj.splice(0, 8)
      this.masterKajian2 = kaj

      this.masterKeadaanUmum = m.filter(x => x.group === 'keadaan umum')?.map(x => {
        return {
          nama: x.nama,
          model: null
        }
      })
      this.masterLab = m.filter(x => x.group === 'laboratorium')?.map(x => {
        return {
          nama: x.nama,
          model: null
        }
      })
      this.masterLab2 = this.masterLab.splice(0, 7)

      this.asaClass = m.filter(x => x.group === 'asa clasification').map(x => {
        return {
          nama: x.nama,
          check: false
        }
      })
    },
    setPenyulits() {
      return new Promise((resolve, reject) => {
        if (this.penyulit !== null || this.penyulit !== '') {
          this.form.penyulitAnastesi.push(this.penyulit)
        }
        resolve()
      })
    },
    initForm() {
      this.skorMallampati = null
      this.jantung = null
      this.paruparu = null
      this.abdomen = null
      this.tulangbelakang = null
      this.ekstremitas = null
      this.neurologi = null
      this.keteranganKajianSistem = null
      this.keteranganLaborat = null
      this.catatan = null
      this.perencanaan = null
      this.penyulitAnastesi = []
      const m = [...this.master]
      this.reducerMaster(m)
    },
    saveData(pasien) {
      this.waiting = true
      return new Promise((resolve, reject) => {
        const kaj1 = this.masterKajian.filter(x => x.check)?.map(x => x.kajian)
        const kaj2 = this.masterKajian2.filter(x => x.check)?.map(x => x.kajian)
        const kajianSistem = kaj1.concat(kaj2)

        const lab1 = this.masterLab.filter(x => x.model)
        const lab2 = this.masterLab2.filter(x => x.model)
        const laboratorium = lab1.concat(lab2)
        const asa = this.asaClass.filter(x => x.check)?.map(x => x.nama)

        this.form.kajianSistem = kajianSistem
        this.form.laboratorium = laboratorium
        this.form.asaClasification = asa
        this.form.noreg = pasien?.noreg
        this.form.norm = pasien?.norm

        console.log('form', this.form)

        api.post('/v1/simrs/pelayanan/praanastesi/savedata', this.form)
          .then(resp => {
            console.log('post pra', resp)
            if (resp.status === 200) {
              this.resultPraAnastesi.push(resp?.data)
              notifSuccess(resp)
              this.waiting = false
            }
            this.waiting = false
            resolve(resp)
          })
          .catch(err => {
            console.log(err)
            notifErr(err)
            this.waiting = false
            reject(err)
          })
      })
    },
    getData(pasien) {
      const params = { params: { noreg: pasien?.noreg } }
      return new Promise((resolve, reject) => {
        api.get('/v1/simrs/pelayanan/praanastesi/getPraAnastesiKunjunganPoli', params)
          .then(resp => {
            console.log('get pra', resp)
            if (resp.status === 200) {
              this.resultPraAnastesi = resp.data
            }
            resolve(resp)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    deleteData(id) {
      const form = { id }
      return new Promise((resolve, reject) => {
        api.post('/v1/simrs/pelayanan/praanastesi/deletedata', form)
          .then(resp => {
            // console.log('del pra', resp)
            const pos = this.resultPraAnastesi?.findIndex(el => el.id === id)
            if (pos >= 0) { this.resultPraAnastesi.splice(pos, 1) }
            notifSuccess(resp)
            resolve(resp)
          })
          .catch(err => {
            console.log(err)
            notifErr(err)
            reject(err)
          })
      })
    }
  }
})
