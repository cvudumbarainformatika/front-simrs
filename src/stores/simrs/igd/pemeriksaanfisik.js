import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { usePengunjungIgdStore } from './pengunjung'
import { notifErr, notifSuccess } from 'src/modules/utils'

export const usePemeriksaanfisikStore = defineStore('pemeriksaan-fisik-store', {
  state: () => ({
    tab: 'PemeriksaanFisik',
    loadingForm: false,
    tabs: [
      { name: 'Pemriksaan Fisik', page: 'PemeriksaanFisik' },
      { name: 'Anatomi', page: 'Anatomi' }
    ],
    form: {
      anatomikepala: 'a/i/c/d = -/-/-/-pKGB (-)',
      anatomileher: 'thiroid = normal faring = normal Vena jugularis = normalTrachea : normal ',
      anatomidada: 'S1 S2 Single, N, M (-), g(-)SN v/v Rh (-) Wh (-)simetris (-) ',
      anatomipunggung: '',
      anatomiperut: 'SoeflBU (+) N Nyeri Tekan (-) ',
      anatomitangan: 'Akral hangat (+) CRT < 2 dtk',
      anatomikaki: 'Akral hangat (+) CRT < 2 dtk',
      anatomineurologis: 'Meningeal sign (-) kaku kuduk (-) reflek patologis (-/-) refek fisiologis : (+2/+2) MMT 55/55',
      anatomigenital: 'normal, hernia (-)'
    }
  }),
  actions: {
    async saveData (pasien) {
      this.loadingForm = true
      this.form.norm = pasien ? pasien.norm : ''
      this.form.noreg = pasien ? pasien.noreg : ''

      this.hitungNilaiSkor()

      // console.log(this.form)

      try {
        const resp = await api.post('v1/simrs/igd/anamnesis/simpananamnesis', this.form)
        if (resp.status === 200) {
          // console.log('simpan anamnesis', resp)
          const storePasien = usePengunjungIgdStore()

          if (resp.data.result === 1) {
            this.form.rs4 = this.form.keluhanutama
          }
          const isi = resp.data.result[0]
          storePasien.injectDataPasien(pasien, isi, 'anamnesis')
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
    }
  }
})
