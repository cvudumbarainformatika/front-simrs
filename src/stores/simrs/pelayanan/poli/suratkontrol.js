import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { notifErrVue } from 'src/modules/utils'

export const useSuratKontrolPoliStore = defineStore('surat_kontrol_poli', {
  state: () => ({
    isOpen: false,
    loading: false,
    meta: null,
    items: [],
    filteredItems: [],
    fNama: '',
    params: {
      tglawal: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      tglakhir: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      filter: '2'
    },
    filters: [
      { nama: 'Tanggal Entri', value: '1' },
      { nama: 'Tanggal Rencana Kontrol', value: '2' }
    ],
    form: {
      tglrencanakontrol: date.formatDate(Date.now(), 'YYYY-MM-DD')
    },
    jadwalDpjps: [],
    loadingJadwalDokter: false
  }),
  actions: {
    setParam(key, val) {
      this.params[key] = val
    },
    setForm(key, val) {
      this.form[key] = val
    },
    setOpen() {
      this.isOpen = !this.isOpen
    },
    filterItem(val) {
      this.filteredItems = this.items.filter(a => a.nama.toLowerCase().includes(val.toLowerCase()))
      // console.log(this.filteredItems)
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
            this.items = resp?.data?.result?.list
            this.filteredItems = this.items.length ? this.items.filter(a => a.nama.toLowerCase().includes(this.fNama.toLowerCase())) : []
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
