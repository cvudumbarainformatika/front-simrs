import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifErr, notifSuccess } from 'src/modules/utils'
import { usePermintaanCathLab } from './permintaan'

export const usePelayanaCahtlab = defineStore('pelayanan-cathlab', {
  state: () => ({
    items: [],
    meta: {},
    item: {},
    loading: false,
    paramsx: {
      kelas: ''
    },
    mastertarif: [],
    form: {
      noreg: '',
      norm: '',
      nota: ''
    }
  }),
  actions: {
    async tarifcatlab (val) {
      this.loading = true
      await api.get('v1/simrs/penunjang/cathlab/tarifcathlab')
        .then(resp => {
          this.loading = false
          this.carikelas(resp?.data, val)
        })
        .catch(() => { this.loading = false })
    },
    carikelas (resp, kelas) {
      const temptarif = []
      resp.forEach(x => {
        if (kelas === '3') {
          const vartarif = {
            kode: x?.kode,
            tindakan: x?.nama_tindakan
            // js: x?.js_kelas3,
            // jp: x?.jp_kelas3,
            // total: parseInt(x?.js_kelas3) + parseInt(x?.jp_kelas3)
          }
          temptarif.push(vartarif)
        }
        else if (kelas === '2') {
          const vartarif = {
            kode: x?.kode,
            tindakan: x?.nama_tindakan,
            js: x?.js_kelas2,
            jp: x?.jp_kelas2,
            total: parseInt(x?.js_kelas2) + parseInt(x?.jp_kelas2)
          }
          temptarif.push(vartarif)
        }
        else if (kelas === '1') {
          const vartarif = {
            kode: x?.kode,
            tindakan: x?.nama_tindakan,
            js: x?.js_kelas1,
            jp: x?.jp_kelas1,
            total: parseInt(x?.js_kelas1) + parseInt(x?.jp_kelas1)
          }
          temptarif.push(vartarif)
        }
        else if (kelas === 'vip') {
          const vartarif = {
            kode: x?.kode,
            tindakan: x?.nama_tindakan,
            js: x?.js_vip,
            jp: x?.jp_vip,
            total: parseInt(x?.js_vip) + parseInt(x?.jp_vip)
          }
          temptarif.push(vartarif)
        }
      })
      this.mastertarif = temptarif
      console.log('hasil', this.mastertarif)
    },
    async saveData (pasien) {
      // console.log('noreg', pasien.noreg)
      this.loadingForm = true
      this.form.noreg = pasien ? pasien.noreg : ''
      this.form.norm = pasien ? pasien.norm : ''
      this.form.nota = pasien ? pasien.nota : ''

      try {
        const resp = await api.post('v1/simrs/penunjang/cathlab/simpancathlab', this.form)
        if (resp.status === 200) {
          const storePasien = usePermintaanCathLab()
          const isi = resp.data.result
          storePasien.injectDataPasien(pasien, isi, 'catlab')
          notifSuccess(resp)
          this.initReset()
          this.loadingForm = false
        }
        this.loadingForm = false
      }
      catch (error) {
        this.loadingForm = false
        notifErr(error)
      }
    }
  }
})
