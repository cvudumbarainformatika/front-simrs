/* eslint-disable no-return-assign */
import { defineStore } from 'pinia'
// import { date } from 'quasar'
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
    // baru
    teknikAnestesia: [],
    teknikKhusus: [],
    pascaAnastesi: [],
    rawatKhusus: [],
    modelRawatKhusus: [],
    regionals: [],
    regional: [],
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
      penyulitAnastesi: [],
      // baru
      keteranganLainlainRawatKhusus: null,
      // mulaiPuasaTgl: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      // mulaiPuasajam: date.formatDate(Date.now(), 'HH:mm'),
      // preMedikasiTgl: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      // preMedikasiJam: date.formatDate(Date.now(), 'HH:mm'),
      // transKeKamarBedahTgl: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      // transKeKamarBedahJam: date.formatDate(Date.now(), 'HH:mm'),
      // rencanaOperasiTgl: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      // rencanaOperasiJam: date.formatDate(Date.now(), 'HH:mm'),
      mulaiPuasaTgl: null,
      mulaiPuasajam: null,
      preMedikasiTgl: null,
      preMedikasiJam: null,
      transKeKamarBedahTgl: null,
      transKeKamarBedahJam: null,
      rencanaOperasiTgl: null,
      rencanaOperasiJam: null,
      catatanPersiapanPraAnastesi: null,
      kolomTindakLanjut: null
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
      this.teknikAnestesia = m.filter(x => x.group === 'teknik anestesia').map(x => {
        return {
          nama: x.nama,
          check: false,
          keterangan: null
        }
      })
      this.teknikKhusus = m.filter(x => x.group === 'teknik khusus').map(x => {
        return {
          nama: x.nama,
          check: false,
          keterangan: null
        }
      })
      this.regionals = m.filter(x => x.group === 'regional').map(x => {
        return {
          label: x.nama,
          value: x.nama
        }
      })
      this.pascaAnastesi = m.filter(x => x.group === 'pasca anestesia').map(x => {
        return {
          nama: x.nama,
          check: false,
          keterangan: null
        }
      })
      this.rawatKhusus = m.filter(x => x.group === 'rawat khusus').map(x => {
        return {
          label: x.nama,
          value: x.nama
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
    initForm(item) {
      delete this.form.id
      // ===================
      this.form.skorMallampati = item ? item?.skorMallampati : null
      this.form.jantung = item ? item?.jantung : null
      this.form.paruparu = item ? item?.paruparu : null
      this.form.abdomen = item ? item?.abdomen : null
      this.form.tulangbelakang = item ? item?.tulangbelakang : null
      this.form.ekstremitas = item ? item?.ekstremitas : null
      this.form.neurologi = item ? item?.neurologi : null
      this.form.keteranganKajianSistem = item ? item?.keteranganKajianSistem : null
      this.form.keteranganLaborat = item ? item?.keteranganLaborat : null
      this.form.catatan = item ? item?.catatan : null
      this.form.perencanaan = item ? item?.perencanaan : null
      this.form.penyulitAnastesi = []
      //  baru
      this.form.mulaiPuasaTgl = item ? item?.mulaiPuasaTgl : null
      this.form.mulaiPuasajam = item ? item.mulaiPuasaJam : null
      this.form.preMedikasiTgl = item ? item.preMedikasiTgl : null
      this.form.preMedikasiJam = item ? item.preMedikasiJam : null
      this.form.transKeKamarBedahTgl = item ? item.transKeKamarBedahTgl : null
      this.form.transKeKamarBedahJam = item ? item.transKeKamarBedahJam : null
      this.form.rencanaOperasiTgl = item ? item.rencanaOperasiTgl : null
      this.form.rencanaOperasiJam = item ? item.rencanaOperasiJam : null
      this.form.catatanPersiapanPraAnastesi = item ? item.catatanPersiapanPraAnastesi : null
      this.form.kolomTindakLanjut = item ? item.kolomTindakLanjut : null

      if (!item || item === undefined || item === 'undefined') {
        const m = [...this.master]
        this.reducerMaster(m)
      } else {
        for (let i = 0; i < item.kajianSistem.length; i++) {
          const el = item.kajianSistem[i]
          this.masterKajian.filter(x => x.kajian === el).map(x => x.check = true)
          this.masterKajian2.filter(x => x.kajian === el).map(x => x.check = true)
        }
        for (let i = 0; i < item.laboratorium.length; i++) {
          const el = item.laboratorium[i]
          this.masterLab.filter(x => x.nama === el.nama).map(x => x.model = el.model)
          this.masterLab2.filter(x => x.nama === el.nama).map(x => x.model = el.model)
        }
        for (let i = 0; i < item.asaClasification.length; i++) {
          const el = item.asaClasification[i]
          this.asaClass.filter(x => x.nama === el).map(x => x.check = true)
        }
        this.form.penyulitAnastesi = item.penyulitAnastesi

        // baru
        for (let i = 0; i < item.teknikAnestesia.length; i++) {
          const el = item.teknikAnestesia[i]
          // eslint-disable-next-line array-callback-return
          this.teknikAnestesia.filter(x => x.nama === el.nama).map(x => {
            x.nama = el.nama
            x.check = el.check
            x.keterangan = el.keterangan
          })

          if (el.nama === 'Regional' && el.keterangan !== null) {
            const ket = el.keterangan
            const arr = ket.split('||')
            this.regional = arr
          }
        }
        for (let i = 0; i < item.teknikKhusus.length; i++) {
          const el = item.teknikKhusus[i]
          // eslint-disable-next-line array-callback-return
          this.teknikKhusus.filter(x => x.nama === el.nama).map(x => {
            x.nama = el.nama
            x.check = el.check
            x.keterangan = el.keterangan
          })
        }
        for (let i = 0; i < item.pascaAnastesi.length; i++) {
          const el = item.pascaAnastesi[i]
          // eslint-disable-next-line array-callback-return
          this.pascaAnastesi.filter(x => x.nama === el.nama).map(x => {
            x.nama = el.nama
            x.check = el.check
            x.keterangan = el.keterangan
          })
          if (el.nama === 'Rawat Khusus' && el.keterangan !== null) {
            const ket = el.keterangan
            const arr = ket.split('||')
            this.modelRawatKhusus = arr
          }
          this.form.keteranganLainlainRawatKhusus = item.keteranganLainlainRawatKhusus
        }
        this.form.id = item.id

        console.log('oooi', this.regional)
      }
    },
    saveData(pasien) {
      this.waiting = true
      return new Promise((resolve, reject) => {
        this.form.noreg = pasien?.noreg
        this.form.norm = pasien?.norm

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
        // baru
        this.form.teknikAnestesia = this.teknikAnestesia.filter(x => x.check) ?? []
        this.form.teknikKhusus = this.teknikKhusus.filter(x => x.check) ?? []
        this.form.pascaAnastesi = this.pascaAnastesi.filter(x => x.check) ?? []

        console.log('form', this.form)

        api.post('/v1/simrs/pelayanan/praanastesi/savedata', this.form)
          .then(resp => {
            // console.log('post pra', resp)
            if (resp.status === 200) {
              // ==================jika bukan edit
              const check = this.resultPraAnastesi.filter(x => x.id === resp.data.id)
              const target = this.resultPraAnastesi.find(x => x.id === resp?.data?.id)
              if (check.length) {
                Object.assign(target, resp?.data)
              } else {
                this.resultPraAnastesi.push(resp?.data)
              }
              delete this.form.id
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
