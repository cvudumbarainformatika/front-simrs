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

    form: {
      kajiansistem: [],
      keadaanumum: [],
      laboratorium: [],
      keteranganLab: '',
      asaclass: [],
      penyulitAnestesiLain: [],
      catatan: '',
      perencanaanAnestesi: ''

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
          model: []
        }
      })
      this.master = m
      this.masterKajian = kaj.splice(0, 8)
      this.masterKajian2 = kaj

      this.masterKeadaanUmum = m.filter(x => x.group === 'keadaan umum')?.map(x => {
        return {
          nama: x.nama,
          model: ''
        }
      })
      this.masterLab = m.filter(x => x.group === 'laboratorium')?.map(x => {
        return {
          nama: x.nama,
          model: ''
        }
      })
      this.masterLab2 = this.masterLab.splice(0, 7)

      this.asaClass = m.filter(x => x.group === 'asa clasification').map(x => {
        return {
          nama: x.nama,
          check: false
        }
      })
    }
  }
})
