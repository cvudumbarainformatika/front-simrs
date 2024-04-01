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
      riwayatpengobatan: '',
      // baru
      riwayatpekerjaan: '',
      riwayatpenyakitkeluarga: '',
      skreeninggizi: 0,
      asupanmakan: 0,
      kondisikhusus: '',
      skor: 0,

      // baru skornyeri
      skornyeri: 0,
      keteranganscorenyeri: 'tidak ada nyeri'
    },

    alergis: ['Obat', 'Makanan', 'Udara', 'Lain-lain', 'Tidak ada Alergi'],
    selection: [],
    historys: [],
    historyMeta: null
  }),
  // getters: {
  //   doubleCount: (state) => state.counter * 2
  // },
  actions: {

    async saveData(pasien) {
      this.loadingForm = true
      this.form.norm = pasien ? pasien.norm : ''
      this.form.noreg = pasien ? pasien.noreg : ''

      const skorKondKhusus = this.form.kondisikhusus.trim().length === 0 ? 0 : 2
      const skor = parseInt(this.form.skreeninggizi) + parseInt(this.form.asupanmakan) + parseInt(skorKondKhusus)

      this.form.skor = skor

      // console.log(this.form)

      try {
        const resp = await api.post('v1/simrs/pelayanan/simpananamnesis', this.form)
        if (resp.status === 200) {
          // console.log('simpan anamnesis', resp)
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
        // console.log('anamnesis err', error)
        this.loadingForm = false
        notifErr(error)
      }
    },

    editForm(val) {
      this.form = {
        id: val.id,
        keluhanutama: val.rs4,
        riwayatpenyakit: val.riwayatpenyakit,
        riwayatpenyakitsekarang: val.riwayatpenyakitsekarang,
        riwayatalergi: val.riwayatalergi,
        keteranganalergi: val.keteranganalergi,
        riwayatpengobatan: val.riwayatpengobatan,
        // baru
        riwayatpenyakitkeluarga: val.riwayatpenyakitkeluarga,
        skreeninggizi: val.skreeninggizi,
        asupanmakan: val.asupanmakan,
        kondisikhusus: val.kondisikhusus,
        skor: val.skor,
        skornyeri: isNaN(parseInt(val?.scorenyeri)) ? 0 : parseInt(val?.scorenyeri),
        keteranganscorenyeri: val?.keteranganscorenyeri
      }
      const kommatext = val?.riwayatalergi?.split(', ')
      this.selection = kommatext
      // console.log('form', this.form)
      // console.log('xxx', val)
    },
    copyForm(val) {
      this.form = {
        keluhanutama: val.keluhanutama,
        riwayatpenyakit: val.riwayatpenyakit,
        riwayatpenyakitsekarang: val.riwayatpenyakitsekarang,
        riwayatalergi: val.riwayatalergi,
        keteranganalergi: val.keteranganalergi,
        riwayatpengobatan: val.riwayatpengobatan,
        // baru
        riwayatpenyakitkeluarga: val.riwayatpenyakitkeluarga,
        skreeninggizi: val.skreeninggizi,
        asupanmakan: val.asupanmakan,
        kondisikhusus: val.kondisikhusus,
        skor: val.skor,
        skornyeri: isNaN(parseInt(val?.scorenyeri)) ? 0 : parseInt(val?.scorenyeri),
        keteranganscorenyeri: val?.keteranganscorenyeri
      }
      const kommatext = val?.riwayatalergi?.split(', ')
      this.selection = kommatext
      // console.log('form', this.form)
      // console.log('xxx', val)
    },

    setForm(key, val) {
      this.form[key] = val
    },

    setKeteranganSkornyeri(val) {
      if (val === 0) {
        this.form.keteranganscorenyeri = 'tidak ada nyeri'
      } else if (val > 0 && val <= 3) {
        this.form.keteranganscorenyeri = 'nyeri ringan'
      } else if (val > 3 && val <= 6) {
        this.form.keteranganscorenyeri = 'nyeri sedang'
      } else if (val > 6 && val <= 10) {
        this.form.keteranganscorenyeri = 'nyeri berat'
      }
    },

    async deleteData(pasien, id) {
      const payload = { id }
      try {
        const resp = await api.post('v1/simrs/pelayanan/hapusanamnesis', payload)
        // console.log(resp)
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
          if (resp.data?.length) {
            const arr = resp.data
            this.historyMeta = null
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
    async nextHistory(cursor) {
      this.loadingHistory = true
      const params = { params: { cursor } }
      try {
        const resp = await api.get('v1/simrs/pelayanan/historyanamnesis', params)
        console.log('history', resp)
        if (resp.status === 200) {
          if (resp.data?.length) {
            const arr = resp.data
            this.historyMeta = null
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
        riwayatpenyakitsekarang: val.riwayatpenyakitsekarang,
        riwayatalergi: val.riwayatalergi,
        keteranganalergi: val.keteranganalergi,
        riwayatpengobatan: val.riwayatpengobatan
      }
      const kommatext = val?.riwayatalergi?.split(', ')
      this.selection = kommatext
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
          riwayatpengobatan: '',
          // baru
          riwayatpekerjaan: '',
          riwayatpenyakitkeluarga: '',
          skreeninggizi: 0,
          asupanmakan: 0,
          kondisikhusus: '',
          skor: 0,

          // baru skornyeri
          skornyeri: 0,
          keteranganskornyeri: 'tidak ada nyeri'
        }
        this.selection = []

        resolve()
      })
    },

    keteranganSkorGizi(nilai) {
      const skor = nilai || 0
      if (skor < 2) {
        return 'tidak beresiko malnutrisi'
      } else {
        return 'Beresiko malnutrisi'
      }
    }

  }
})
