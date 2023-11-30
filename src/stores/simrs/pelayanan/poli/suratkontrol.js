import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { notifErrVue } from 'src/modules/utils'
import { useAplikasiStore } from 'src/stores/app/aplikasi'

export const useSuratKontrolPoliStore = defineStore('surat_kontrol_poli', {
  state: () => ({
    isOpen: false,
    loading: false,
    loadingSuKe: false,
    meta: null,
    items: [],
    filteredItems: [],
    fNama: '',
    params: {
      tglawal: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      tglakhir: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      filter: '2'
    },
    tgl: {},
    filters: false,
    custom: false,
    form: {
      tglrencanakontrol: date.formatDate(Date.now(), 'YYYY-MM-DD')
    },
    jadwalDpjps: [],
    loadingJadwalDokter: false
  }),
  actions: {
    resetParam() {
      this.fNama = ''
      this.params = {
        tglawal: date.formatDate(Date.now(), 'YYYY-MM-DD'),
        tglakhir: date.formatDate(Date.now(), 'YYYY-MM-DD'),
        filter: '2'
      }
      this.filters = false
      this.custom = false
    },
    setParam(key, val) {
      this.params[key] = val
    },
    setForm(key, val) {
      this.form[key] = val
    },
    setDate(val) {
      this.tgl = val
      const { to, from, status } = val
      this.params.tglakhir = to
      this.params.tglawal = from
      this.params.filter = status
    },
    setPeriodik(val) {
      const { to, from, status } = val
      this.params.tglakhir = to
      this.params.tglawal = from
      this.params.filter = status
      this.getData()
    },
    setOpen() {
      this.isOpen = !this.isOpen
    },
    setFilters() {
      this.filters = !this.filters
    },
    setCustom() {
      this.custom = true
    },
    notCustom() {
      this.custom = false
    },
    setQ(val) {
      this.fNama = val
      this.filterItem(val)
    },
    filterData(val) {
      const { to, from, q, status } = val // status
      this.params.tglakhir = to
      this.params.tglawal = from
      this.params.filter = status
      this.fNama = q
      this.setCustom()
      this.getData()
      // console.log(val)
    },
    filterItem(val) {
      this.filteredItems = this.items.filter(a => a?.nama?.toLowerCase().includes(val.toLowerCase()))
    },
    getAllSurat() {
      this.getData()
      this.getSuratKeluar()
    },
    getData() {
      this.loading = true
      const param = { params: this.params }
      return new Promise(resolve => {
        api.get('v1/simrs/rajal/poli/listsuratkontrol', param)
        // api.get('v1/simrs/rajal/poli/listsuratkontrol')
          .then(resp => {
            this.loading = false
            console.log('list surat kontrol ', resp.data)
            // eslint-disable-next-line no-unused-vars
            const apps = useAplikasiStore()
            // eslint-disable-next-line no-unused-vars
            const gigis = ['BDM', 'GND', 'GOR']
            const res = resp?.data?.result?.list
            const pol = apps?.user?.pegawai?.poli?.rs6 ?? false
            // const pol = 'BDM'
            if (pol) {
              const gig = gigis.filter(a => a.toLowerCase().includes(pol.toLowerCase()))
              if (gig.length) {
                gigis.forEach(anu => {
                  const anunya = res.filter(a => a.poliTujuan.toLowerCase().includes(anu.toLowerCase()))
                  if (anunya.length) {
                    anunya.forEach(b => {
                      this.items.push(b)
                    })
                  }
                })
                if (this.items.length) {
                  this.items.sort((a, b) => new Date(a.tglRencanaKontrol).getTime() - new Date(b.tglRencanaKontrol).getTime())
                }
              } else {
                this.items = res.filter(a => a.poliTujuan.toLowerCase().includes(pol.toLowerCase()))
              }
            } else {
              this.items = res
            }

            this.filteredItems = this.items.length ? this.items.filter(a => a?.nama?.toLowerCase().includes(this.fNama.toLowerCase())) : []
            // this.filteredItems = this.items.length ? this.items.filter(a => a.namaJnsKontrol === 'Surat Kontrol' && a.jnsPelayanan === 'Rawat Inap') : []
            if (resp?.data?.original?.code) {
              notifErrVue(resp?.data?.original?.message)
            }
            resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    },
    getSuratKeluar() {
      this.loadingSuKe = true
      const param = { params: this.params }
      return new Promise(resolve => {
        api.get('v1/simrs/rajal/poli/listrujukankeluarrs', param)
          .then(resp => {
            this.loadingSuKe = false
            console.log('surat keluar', resp?.data)
            resolve(resp)
          })
          .catch(() => {
            this.loadingSuKe = false
          })
      })
    },
    getjadwalDokterDpjp() {
      this.jadwalDpjps = []
      this.loadingJadwalDokter = true
      // console.log('get jadwal dokter')

      return new Promise(resolve => {
        api.post('v1/simrs/rajal/poli/jadwal', this.form)
          .then(resp => {
            this.loadingJadwalDokter = false
            console.log(resp.data)
            if (resp?.data?.metadata?.code === '200' || resp?.data?.metadata?.code === 200) {
              this.jadwalDpjps = resp?.data?.result
              if (this.jadwalDpjps.length) {
                this.setForm('kodeDokter', this.jadwalDpjps[0].kodedokter)
              }
            } else {
              this.setForm('kodeDokter', null)
            }
            resolve(resp.data)
          })
          .catch(() => {
            this.loadingJadwalDokter = false
          })
      })
    },
    simpanEdit() {
      this.loading = true
      return new Promise(resolve => {
        api.post('v1/simrs/rajal/poli/editsuratkontrol', this.form)
          .then(resp => {
            console.log(resp)
            this.loading = false
            if (resp?.data?.result?.metadata?.code === '200') {
              this.getData()
            } else {
              notifErrVue(resp?.data?.result?.metadata?.message)
            }
            this.setOpen()
            resolve(resp)
          })
          .catch(() => { this.loading = false })
      })
    }
  }
})
