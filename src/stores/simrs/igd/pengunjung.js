import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { dateDbFormat } from 'src/modules/formatter'

export const usePengunjungIgdStore = defineStore('pengunjung-igd', {
  state: () => ({
    loading: false,
    loadingSaveGantiDpjp: false,
    pasiens: [],
    meta: null,
    params: {
      q: '',
      page: 1,
      per_page: 50,
      to: dateDbFormat(new Date()),
      from: dateDbFormat(new Date())
    },
    periods: ['Hari Ini', 'Minggu Ini', 'Bulan Ini'],
    periode: 'Hari Ini',
    pageLayanan: false
  }),
  actions: {
    setParams(key, val) {
      this.params[key] = val
    },
    goToPage(val) {
      this.params.page = val
      this.getData()
    },
    search(val) {
      this.params.q = val
      this.params.page = 1
      this.getData()
    },
    refresh(val) {
      this.params.page = 1
      this.getData()
    },
    async getData() {
      this.loading = true
      const params = { params: this.params }
      await api.get('v1/simrs/pendaftaran/igd/daftarkunjunganpasienbpjs', params)
        .then(resp => {
          console.log('kunjungan igd', resp?.data?.data)
          this.loading = false
          this.pasiens = resp?.data?.data
          this.meta = resp?.data
        })
        .catch(() => { this.loading = false })
    },
    async gantiDpjp(form, pasien) {
      // console.log(form)
      this.loadingSaveGantiDpjp = true
      try {
        const resp = await api.post('/v1/simrs/pelayanan/gantidpjp', form)
        console.log(resp)
        if (resp.status === 200) {
          const findPasien = this.items.filter(x => x === pasien)
          if (findPasien.length) {
            const data = findPasien[0]
            data.datasimpeg = resp?.data?.result?.datasimpeg
            data.dokter = resp?.data?.result?.datasimpeg?.nama
            data.kodedokter = resp?.data?.result?.datasimpeg?.kdpegsimrs
            this.loadingSaveGantiDpjp = false
          }

          this.loadingSaveGantiDpjp = false
        }
        this.loadingSaveGantiDpjp = false
      } catch (error) {
        console.log(error)
        this.loadingSaveGantiDpjp = false
      }
    }
  }
})
