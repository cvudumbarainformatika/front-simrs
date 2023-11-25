import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { usePengunjungPoliStore } from './pengunjung'
import { notifErr, notifSuccess } from 'src/modules/utils'
// import { notifSuccess } from 'src/modules/utils'

export const useDiagnosaKeperawatan = defineStore('diagnosa-keperawatan', {
  state: () => ({
    diagnosas: [],
    selectDiagnosa: [],
    selectIntervensis: [],
    diagnosa: '',
    loadingSave: false
    // form: {
    //   norm: '',
    //   noreg: '',
    //   kddiagnosa: '',
    //   namadiagnosa: ''
    // }
  }),
  // getters: {
  //   doubleCount: (state) => state.counter * 2
  // },
  actions: {
    async getData() {
      const resp = await api.get('v1/simrs/pelayanan/diagnosakeperawatan')
      console.log('diagnosa keperawatan', resp)
      if (resp.status === 200) {
        this.diagnosas = resp.data
      }
    },

    setDiagnosa(val) {
      this.diagnosa = val
    },

    async simpanDiagnosadanIntervensi(pasien) {
      this.loadingSave = true

      let intv = []
      if (this.selectIntervensis.length) {
        intv = this.selectIntervensis.map(x => {
          return {
            intervensi_id: x?.split('||')[0],
            diagnosakeperawatan_kode: x?.split('||')[1]
          }
        })
      }
      const thumb = []
      if (this.selectDiagnosa.length) {
        for (let i = 0; i < this.selectDiagnosa.length; i++) {
          const el = this.selectDiagnosa[i]
          const frm = {
            norm: pasien?.norm,
            noreg: pasien?.noreg,
            kode: el?.kode,
            nama: el?.nama,
            details: intv.filter(x => x.diagnosakeperawatan_kode === el?.kode) ?? []
          }

          thumb.push(frm)
        }
      }

      const form = {
        diagnosa: thumb
      }

      console.log('diagnosa saved ', form)

      try {
        const resp = await api.post('v1/simrs/pelayanan/simpandiagnosakeperawatan', form)
        console.log('simpan', resp)
        if (resp.status === 200) {
          const storePasien = usePengunjungPoliStore()
          const arr = resp.data.result
          for (let i = 0; i < arr.length; i++) {
            const isi = arr[i]
            storePasien.injectDataPasien(pasien, isi, 'diagnosakeperawatan')
          }
          notifSuccess(resp)
          this.initReset()
          this.loadingSave = false
        }
        this.loadingSave = false
      } catch (error) {
        console.log(error)
        notifErr(error)
      }
    },

    async deleteDiagnosa(pasien, id) {
      const payload = { id }
      const resp = await api.post('v1/simrs/pelayanan/deletediagnosakeperawatan', payload)
      console.log('delete', resp)
      if (resp.status === 200) {
        const storePasien = usePengunjungPoliStore()
        storePasien.hapusDataDiagnosaKeperawatan(pasien, id)
        notifSuccess(resp)
      }
    },

    initReset() {
      this.diagnosa = ''
      this.selectDiagnosa = []
    }
  }
})
