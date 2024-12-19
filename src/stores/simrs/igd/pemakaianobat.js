import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifErr, notifSuccess } from 'src/modules/utils'
import { usePengunjungIgdStore } from './pengunjung'

export const usePemakaianObatStore = defineStore('pemakaian-obat-store', {
  state: () => ({
    loading: false,
    fixed: false,
    listresep: [],
    satuanobat: [],
    loadingForm: false,
    params: {
      noreg: ''
    },
    form: {
      pump: false
    },
    namaobat: ''
  }),
  actions: {
    async cariresep (val) {
      this.loading = true
      this.params.noreg = val?.noreg
      const params = { params: this.params }
      await api.get('v1/simrs/igd/pemberianobat/resepobat', params)
        .then(resp => {
          // console.log('kunjungan igd', resp?.data?.data)
          this.loading = false
          this.listresep = resp?.data?.data
        })
        .catch(() => { this.loading = false })
    },
    async carisatuan () {
      this.loading = true
      await api.get('v1/satuan/satuan')
        .then(resp => {
          // console.log('kunjungan igd', resp?.data?.data)
          this.satuanobat = resp?.data
          this.loading = false
        })
        .catch(() => { this.loading = false })
    },
    initReset () {
      this.form.dosis = ''
      this.form.satuan = ''
      this.form.pump = false
      this.form.routepemberianobat = ''
    },
    async saveData (pasien) {
      // console.log('sasa', pasien)
      this.loadingForm = true
      this.form.norm = pasien ? pasien.norm : ''
      this.form.noreg = pasien ? pasien.noreg : ''

      try {
        const resp = await api.post('v1/simrs/igd/pemberianobat/simpanpemberianobat', this.form)
        if (resp.status === 200) {
          // console.log('simpan anamnesis', resp)
          const storePasien = usePengunjungIgdStore()
          const isi = resp.data.data[0]
          storePasien.injectDataPasien(pasien, isi, 'pemberianobat')
          notifSuccess(resp)
          this.initReset()
          this.loadingForm = false
        }
        this.loadingForm = false
      }
      catch (error) {
        // console.log('anamnesis err', error)
        this.loadingForm = false
        notifErr(error)
      }
    },
    async deleteData (pasien, id) {
      const payload = { id }
      try {
        const resp = await api.post('v1/simrs/igd/pemberianobat/hapuspemberianobat', payload)
        // console.log(resp)
        if (resp.status === 200) {
          const storePasien = usePengunjungIgdStore()
          storePasien.hapusPemakaianObat(pasien, id)
          notifSuccess(resp)
        }
      }
      catch (error) {
        notifErr(error)
      }
    }
  }
})
