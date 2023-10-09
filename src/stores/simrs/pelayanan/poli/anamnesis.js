import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { usePengunjungPoliStore } from './pengunjung'
import { notifErr, notifSuccess } from 'src/modules/utils'

export const useAnamnesis = defineStore('anamnesis', {
  state: () => ({
    loadingForm: false,
    loadingHistory: false,

    form: {
      keluhanutama: '',
      riwayatpenyakit: '',
      riwayatpenyakitsekarang: '',
      riwayatalergi: '',
      keteranganalergi: '',
      riwayatpengobatan: ''
    },

    alergis: ['Obat', 'Makanan', 'Udara', 'Lain-lain', 'Tidak ada Alergi'],
    selection: [],
    historys: []
  }),
  // getters: {
  //   doubleCount: (state) => state.counter * 2
  // },
  actions: {

    async saveData(pasien) {
      this.loadingForm = true
      this.form.norm = pasien ? pasien.norm : ''
      this.form.noreg = pasien ? pasien.noreg : ''

      // console.log(this.form)

      try {
        const resp = await api.post('v1/simrs/pelayanan/simpananamnesis', this.form)
        if (resp.status === 200) {
          console.log('simpan anamnesis', resp)
          const storePasien = usePengunjungPoliStore()
          let isi = resp.data.result
          if (resp.data.result === 1) {
            this.form.rs4 = this.form.keluhanutama
            isi = this.form
          }
          storePasien.injectDataPasien(pasien, isi, 'anamnesis')
          notifSuccess(resp)
          this.initReset()
          this.loadingForm = false
        }

        this.loadingForm = false
      } catch (error) {
        console.log('anamnesis err', error)
        this.loadingForm = false
        notifErr(error)
      }
    },

    editForm(val) {
      this.form = {
        id: val.id,
        keluhanutama: val.rs4,
        riwayatpenyakit: val.riwayatpenyakit,
        riwayatalergi: val.riwayatalergi,
        keteranganalergi: val.keteranganalergi,
        riwayatpengobatan: val.riwayatpengobatan
      }
      console.log('form', this.form)
      console.log('xxx', val)
    },

    setForm(key, val) {
      this.form[key] = val
    },

    async deleteData(pasien, id) {
      const payload = { id }
      try {
        const resp = await api.post('v1/simrs/pelayanan/hapusanamnesis', payload)
        console.log(resp)
        if (resp.status === 200) {
          const storePasien = usePengunjungPoliStore()
          storePasien.hapusDataAnamnesis(pasien, id)
          notifSuccess(resp)
        }
      } catch (error) {
        notifErr(error)
      }
    },

    async getHistory(norm) {
      this.loadingHistory = true
      const params = { params: { norm } }
      try {
        const resp = await api.get('v1/simrs/pelayanan/historyanamnesis', params)
        console.log('history', resp)
        if (resp.status === 200) {
          if (resp.data.length) {
            const arr = resp.data
            this.historys = arr
          } else {
            this.historys = []
          }
        }
        this.loadingHistory = false
      } catch (error) {
        this.loadingHistory = false
        notifErr(error)
      }
    },

    pilihHistory(val) {
      this.form = {
        keluhanutama: val.keluhanutama,
        riwayatpenyakit: val.riwayatpenyakit,
        riwayatalergi: val.riwayatalergi,
        keteranganalergi: val.keteranganalergi,
        riwayatpengobatan: val.riwayatpengobatan
      }
    },

    initReset() {
      this.form = null
      return new Promise((resolve, reject) => {
        this.form = {
          keluhanutama: '',
          riwayatpenyakit: '',
          riwayatpenyakitsekarang: '',
          riwayatalergi: '',
          keteranganalergi: '',
          riwayatpengobatan: ''
        }
        this.selection = []

        resolve()
      })
    }

  }
})
