import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
// eslint-disable-next-line no-unused-vars
import { notifErrVue, notifSuccess } from 'src/modules/utils'

export const useHistoryPasienRanapStore = defineStore('history-pasien-ranap-store', {
  state: () => ({
    igdBefore: null,
    loading: false,
    pasienIgd: null

  }),
  actions: {
    async historyIgdBefore (pasien) {
      // this.loadingCall = false
      this.loading = true
      // console.log('load1', this.loadingTerima)
      const params = { params: { noreg: pasien?.noreg } }
      try {
        const resp = await api.get('v1/simrs/ranap/ruangan/data-igd', params)
        // console.log('igd before', resp)
        if (resp.status === 200) {
          let hasil = resp?.data ?? null
          if (JSON.stringify(hasil) === '{}') hasil = null
          this.igdBefore = hasil ?? null
          this.setPasienIgd(pasien, hasil)
        }
        else {
          this.igdBefore = null
        }
        this.loading = false
      }
      catch (error) {
        console.log(error)
        this.loading = false
        // this.notifikasiError('Maaf.. Harap ulangi, Ada Kesalahan ')
      }
    },

    setPasienIgd (pas, hasil) {
      const pasien = { ...pas }
      pasien.triage = hasil?.triage
      pasien.anamnesis = hasil?.anamnesis
      pasien.penilaiananamnesis = hasil?.penilaiananamnesis
      pasien.datasimpeg = hasil?.datasimpeg
      pasien.diagnosa = hasil?.diagnosa
      pasien.permintaanperawatanjenazah = hasil?.permintaanperawatanjenazah
      pasien.historyperkawinan = hasil?.historyperkawinan
      pasien.historykehamilan = hasil?.historykehamilan
      pasien.anamnesekebidanan = hasil?.anamnesekebidanan
      pasien.fisio = hasil?.fisio
      pasien.diagnosakeperawatan = hasil?.diagnosakeperawatan
      pasien.laborats = hasil?.laborats
      pasien.newapotekrajal = hasil?.newapotekrajal
      pasien.ok = hasil?.ok
      pasien.diagnosakebidanan = hasil?.diagnosakebidanan
      pasien.penunjanglain = hasil?.penunjanglain
      pasien.ambulan = hasil?.ambulan
      pasien.radiologi = hasil?.radiologi
      pasien.bankdarah = hasil?.bankdarah
      pasien.planheder = hasil?.planheder
      pasien.tindakan = hasil?.tindakan
      pasien.laboratold = hasil?.laboratold
      pasien.pemeriksaanfisikpsikologidll = hasil?.pemeriksaanfisikpsikologidll
      pasien.konsultasi = hasil?.konsuldokterspesialis
      pasien.tinjauanulang = hasil?.tinjauanulang
      this.pasienIgd = { ...pasien }

      // console.log('pasien igd', this.pasienIgd)
    }
  }
})
