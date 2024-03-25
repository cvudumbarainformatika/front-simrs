import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { notifErrVue } from 'src/modules/utils'
import { usePengunjungPoliStore } from './pengunjung'
// import { useAplikasiStore } from 'src/stores/app/aplikasi'

export const useLaporanTindakanPoliStore = defineStore('laporan-tindakan-poli', {
  state: () => ({
    loading: false,
    form: {
      kddokter: null,
      jenistindakan: null,
      dikirimuntukpemeriksaanpa: 'Tidak',
      tanggal: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      jammulai: date.formatDate(Date.now(), 'HH:mm'),
      jamselesai: date.formatDate(Date.now(), 'HH:mm'),
      lamatindakan: null,
      catatankomplikasi: null,
      laporantindakan: []
    },
    selectAll: false,
    listdokters: []
  }),
  actions: {
    getData() {
      console.log('asdas')
    },
    getListDokter() {
      return new Promise((resolve, reject) => {
        api.get('v1/simrs/pelayanan/laporantindakan/listdokter')
          .then(resp => {
            this.listdokters = resp.data.length ? resp.data.map(x => {
              return { nama: x.nama, kode: x.kdpegsimrs }
            }) : []
            // console.log('list dokters', resp)
          })
          .catch(err => {
            console.log('list dokters', err)
          })
      })
    },

    simpanData(pasien) {
      this.loading = true

      this.form.norm = pasien?.norm
      this.form.noreg = pasien?.noreg
      if (this.form.laporantindakan.length === 0) {
        notifErrVue('Maaf, Harap pilih tindakan terlebih dahulu!')
        return
      }

      return new Promise((resolve, reject) => {
        api.post('v1/simrs/pelayanan/laporantindakan/simpan', this.form)
          .then((resp) => {
            this.loading = false
            const storePasien = usePengunjungPoliStore()
            let isi = resp.data
            if (resp.data === 1) {
              isi = this.form
            }
            storePasien.injectDataPasien(pasien, isi, 'laporantindakan')
            resolve(resp)
          }).catch(err => {
            console.log('simpan err', err)
            this.loading = false
            reject(err)
          })
      })
    },

    initForm() {
      this.form.norm = null
      this.form.noreg = null
      this.form.kddokter = null
      this.form.jenistindakan = null
      this.form.dikirimuntukpemeriksaanpa = 'Tidak'
      this.form.tanggal = date.formatDate(Date.now(), 'YYYY-MM-DD')
      this.form.jammulai = date.formatDate(Date.now(), 'HH:mm')
      this.form.jamselesai = date.formatDate(Date.now(), 'HH:mm')
      this.form.lamatindakan = null
      this.form.catatankomplikasi = null
      this.form.laporantindakan = []
    },

    hapusData(pasien, id) {
      const payload = { id }
      return new Promise((resolve, reject) => {
        api.post('v1/simrs/pelayanan/laporantindakan/hapus', payload)
          .then((resp) => {
            const storePasien = usePengunjungPoliStore()
            storePasien.hapusDataLaporanTindakan(pasien, id)
            resolve(resp)
          })
          .catch(err => {
            console.log('err', err)
            reject(err)
          })
      })
    }
  }
})
