import { defineStore } from 'pinia'

export const usePemeriksaanfisikStore = defineStore('pemeriksaan-fisik-store', {
  state: () => ({
    tab: 'PemeriksaanFisik',
    tabs: [
      { name: 'Pemriksaan Fisik', page: 'PemeriksaanFisik' },
      { name: 'Anatomi', page: 'Anatomi' }
    ]
  })
})
