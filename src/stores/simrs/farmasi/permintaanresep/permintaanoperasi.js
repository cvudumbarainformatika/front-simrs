import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { notifSuccess } from 'src/modules/utils'

export const useResepPermintaanOperasiStore = defineStore('resep_permintaan_operasi', {
  state: () => ({
    loading: false,
    loadingSimpan: false,
    loadingSelesai: false,
    isOpen: false,
    belums: [],
    sudahs: [],
    form: {
      obats: []
    },
    rincBelId: [],
    rincSudId: [],
    params: {
      noreg: '',
      from: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      to: date.formatDate(Date.now(), 'YYYY-MM-DD')

    }
  }),
  actions: {
    setForm(key, val) {
      this.form[key] = val
    },
    setParams(key, val) {
      this.params[key] = val
      console.log('params', key, val)
    },
    refresh() {
      // console.log('params', this.params)
      this.getData()
    },
    resetParams() {
      this.params = {
        noreg: '',
        from: date.formatDate(Date.now(), 'YYYY-MM-DD'),
        to: date.formatDate(Date.now(), 'YYYY-MM-DD')

      }
    },
    setPasien(val) {
      console.log('pasien', val)
      this.setForm('noreg', val?.noreg)
      this.setForm('norm', val?.norm)
      this.setForm('groupsistembayar', val?.groupsistembayar)
      this.setForm('sistembayar', val?.kodesistembayar)
      this.setParams('noreg', val?.noreg)
    },
    setValues() {
      this.rincBelId = []
      this.rincSudId = []
      if (this.belums?.length) {
        this.belums?.forEach(item => {
          if (item?.rinci?.length) {
            item?.rinci?.forEach(rin => {
              rin.checked = false
              if (rin?.noresep === '') this.rincBelId.push(rin?.id)
            })
          }
        })
      }
      if (this.sudahs?.length) {
        this.sudahs?.forEach(item => {
          if (item?.rinci?.length) {
            item?.rinci?.forEach(rin => {
              rin.checked = false
              this.rincSudId.push(rin?.id)
            })
          }
        })
      }
      console.log('belum', this.rincBelId, 'sudah', this.rincSudId)
    },
    async getData(val) {
      if (!val) this.loading = true
      this.belums = []
      const param = { params: this.params }
      await api.get('v1/simrs/penunjang/farmasinew/obatoperasi/get-permintaan-for-dokter', param)
        .then(resp => {
          this.loading = false
          this.belums = resp?.data?.belum
          this.sudahs = resp?.data?.sudah
          this.setValues()
          console.log('permintaan ok', resp?.data)
        })
        .catch(() => { this.loading = false })
    },
    async simpan() {
      this.loadingSimpan = true
      this.form.param = this.params
      await api.post('v1/simrs/penunjang/farmasinew/obatoperasi/simpan-resep', this.form)
        .then(resp => {
          this.loadingSimpan = false
          notifSuccess(resp)
          if (resp?.data.noresep) this.setForm('noresep', resp?.data.noresep)
          this.getData(true)
          console.log('Simpan resep', resp?.data)
        })
        .catch(() => { this.loadingSimpan = false })
    },
    async selesai() {
      this.loadingSelesai = true
      await api.post('v1/simrs/penunjang/farmasinew/obatoperasi/selesai-resep', this.form)
        .then(resp => {
          this.loadingSelesai = false
          notifSuccess(resp)
          console.log('Simpan resep', resp?.data)
        })
        .catch(() => { this.loadingSelesai = false })
    }
  }
})
