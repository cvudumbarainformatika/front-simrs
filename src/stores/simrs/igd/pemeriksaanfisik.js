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

      try {
        const resp = await api.post('v1/simrs/igd/pemeriksaanfisik/simpanpemeriksaanfisik', this.form)
        if (resp.status === 200) {
          const storePasien = usePengunjungIgdStore()
          const isi = resp.data.result[0]
          storePasien.injectDataPasien(pasien, isi, 'pemeriksaanfisikpsikologidll')
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
    initReset () {
      this.form.statuspsikologi = ''
      this.form.sebutkanstatuspsikologis = ''
      this.form.sosial = ''
      this.form.ekonomi = ''
      this.form.spiritual = ''
      this.form.kepercayaan = ''
      this.form.sebutkankepercayaan = ''
      this.form.keadaanpupil = ''
      this.form.reflekmatakirikecahaya = ''
      this.form.reflekmatakanankecahaya = ''
      this.form.diamterkiri = ''
      this.form.diamterkanan = ''
      this.form.keadaanpupil = ''
      this.form.anatomikepala = 'a/i/c/d = -/-/-/-pKGB (-)'
      this.form.anatomileher = 'thiroid = normal faring = normal Vena jugularis = normalTrachea = normal '
      this.form.anatomidada = 'S1 S2 Single, N, M (-), g(-)SN v/v Rh (-) Wh (-)simetris (-) '
      this.form.anatomipunggung = ''
      this.form.anatomiperut = 'SoeflBU (+) N Nyeri Tekan (-) '
      this.form.anatomitangan = 'Akral hangat (+) CRT < 2 dtk'
      this.form.anatomikaki = 'Akral hangat (+) CRT < 2 dtk'
      this.form.anatomineurologis = 'Meningeal sign (-) kaku kuduk (-) reflek patologis (-/-) refek fisiologis = (+2/+2) MMT 55/55'
      this.form.anatomigenital = 'normal, hernia (-)'
    },
    async deleteData (pasien, id, noreg) {
      this.loadingForm = true
      const payload = { id, noreg }
      try {
        const resp = await api.post('v1/simrs/igd/pemeriksaanfisik/hapuspemeriksaanfisik', payload)
        // console.log(resp)
        if (resp.status === 200) {
          const storePasien = usePengunjungIgdStore()
          storePasien.hapusDataPemeriksaanFisik(pasien, id)
          notifSuccess(resp)
          this.loadingForm = false
        }
      }
      catch (error) {
        notifErr(error)
        this.loadingForm = false
      }
    }
  }
})
