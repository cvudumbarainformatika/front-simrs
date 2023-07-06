import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { dateDbFormat } from 'src/modules/formatter'

export const useGeneralConsentStore = defineStore('general_consent', {
  state: () => ({
    items: [],
    loading: false,

    form: {
      tanggal: dateDbFormat(new Date()),
      petugas: null,
      nama: null,
      alamat: null,
      nohp: null,
      hubunganpasien: 'Diri Sendiri'
    }
  }),
  // getters: {
  //   doubleCount: (state) => state.counter * 2
  // },
  actions: {
    async getData() {
      this.loading = true
      try {
        const resp = await api.get('/v1/simrs/pendaftaran/generalconscent/mastergeneralconsent')
        console.log('master general consent', resp)
        if (resp.status === 200) {
          this.items = resp.data
          this.loading = false
        }
        this.loading = false
      } catch (error) {
        this.loading = false
      }
    }
  }
})
