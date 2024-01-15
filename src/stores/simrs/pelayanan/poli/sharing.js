import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifSuccess } from 'src/modules/utils'
import { usePengunjungPoliStore } from './pengunjung'

export const usePoliSharingStore = defineStore('sharing_poli_store', {
  state: () => ({
    loading: false,
    loadingSave: false,
    form: {
      kodesharing: '',
      nominal: '',
      jumlah: 0
    },
    sharings: []
  }),
  actions: {
    setForm(key, val) {
      this.form[key] = val
    },
    initForm(pasien) {
      this.setForm('noreg', pasien?.noreg)
      this.setForm('norm', pasien?.norm)
      this.setForm('kodepoli', pasien?.kodepoli)
      this.setForm('kodesistembayar', pasien?.kodesistembayar)
    },
    async getMasterSharing() {
      this.loading = true
      await api.get('v1/simrs/pelayanan/dialogmaster')
        .then(resp => {
          this.loading = false
          // console.log('resp sharing', resp)
          this.sharings = resp.data
        })
        .catch(() => { this.loading = false })
    },
    simpan(pasien) {
      this.setForm('subtotal', parseFloat(this.form.nominal) * parseFloat(this.form.jumlah))
      this.loadingSave = true
      return new Promise(resolve => {
        api.post('v1/simrs/pelayanan/simpansharing', this.form)
          .then(resp => {
            this.loadingSave = false
            // console.log('resp', resp.data)
            if (resp.status === 200) {
              const storePasien = usePengunjungPoliStore()
              const isi = resp?.data?.result
              storePasien.injectDataPasien(pasien, isi, 'sharing')
              notifSuccess(resp)
            }
            resolve(resp.data)
          })
          .catch(() => { this.loadingSave = false })
      })
    }
  }
})
