import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
// import { usePengunjungPoliStore } from './pengunjung'
// import { notifErr, notifSuccess } from 'src/modules/utils'

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
    }
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
      const kaj = m.filter(x => x.group === 'kajian sistem')?.map(x => {
        return {
          kajian: x.nama,
          check: false
        }
      })
      this.master = m
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
    saveData() {
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

        console.log('form', this.form)
      })
    }
  }
})
