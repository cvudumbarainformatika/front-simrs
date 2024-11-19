import { defineStore } from 'pinia'

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

  }
})
