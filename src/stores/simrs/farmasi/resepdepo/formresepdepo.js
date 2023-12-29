import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { useKasirRajalListKunjunganStore } from '../../kasir/rajal/kunjungan'

export const useResepDepoFarmasiStore = defineStore('resep_depo_farmasi_setore', {
  state: () => ({
    isOpen: false,
    loading: false,
    loadingSimulasi: false,
    loadingCari: false,
    loadingDokter: false,
    jenispasien: 'rjl',
    form: {
      tanggal: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      resep_masuk: date.formatDate(Date.now(), 'HH:mm'),
      resep_keluar: date.formatDate(Date.now(), 'HH:mm')
    },
    params: {
      nama: '',
      nik: '',
      norm: '',
      noreg: '',
      nosep: ''
    },
    notas: [],
    nota: '',
    pasien: {
    },

    floor: [ // racikan / floor stok
      { kode: 'Gd-03010101' },
      { kode: 'Gd-04010101' }
    ],
    obats: [],
    obatTerpilih: null,
    dokters: []
  }),
  actions: {
    setForm(key, val) {
      this.form[key] = val
    },
    setParams(key, val) {
      this.params[key] = val
    },
    setPasien(val) {
      console.log('pasien', val)
      console.log('jenis pasien', this.jenispasien)
      if (val) {
        this.pasien = val
        this.isOpen = false
        this.cariSimulasi(val?.noreg)
        if (this.jenispasien === 'rjl') this.getBillRajal(val)
      }
    },
    getBillRajal(val) {
      const kunjRajal = useKasirRajalListKunjunganStore()
      const param = { noreg: val?.noreg }
      kunjRajal.getBill(param).then(resp => {
        this.setForm('tagihanrs', resp?.data?.totalall)
        console.log('bill', resp?.data)
        console.log('form', this.form)
      })
    },
    obatSelected(val) {
      this.setForm('kdobat', val)
      const obat = this.obats.filter(a => a.kdobat === val)
      console.log('obat', obat)
      if (obat.length) {
        // this.obatTerpilih = obat[0]
        this.setForm('satuan_bsr', obat[0].satuan_b)
        this.setForm('satuan_kcl', obat[0].satuan_k)
      }
    },

    clearObat() {
      this.setForm('kdobat', null)
      this.obatTerpilih = null
    },
    getDataObat(val) {
      this.loadingCari = true
      const params = { params: val }
      return new Promise(resolve => {
        api.get('v1/simrs/farmasinew/depo/lihatstokobateresep', params)
          .then(resp => {
            this.loadingCari = false
            this.obats = resp.data?.dataobat
            console.log(resp.data)
            resolve(resp)
          })
          .catch(() => { this.loadingCari = false })
      })
    },
    cariSimulasi(val) {
      this.loadingSimulasi = true
      const param = {
        params: { noreg: val }
      }
      return new Promise(resolve => {
        api.get('v1/simrs/pelayanan/carisimulasi', param)
          .then(resp => {
            this.loadingSimulasi = false
            console.log('cri simulasi', resp)
            const tarif = resp?.data?.response?.cbg?.base_tariff ?? (resp?.data?.response?.cbg?.tariff ?? 0)
            this.setForm('kodeincbg', resp?.data?.response?.cbg?.code ?? '-')
            this.setForm('uraianinacbg', resp?.data?.response?.cbg?.description ?? '-')
            this.setForm('tarifina', tarif ?? '-')

            resolve(resp)
          })
          .catch(() => {
            this.loadingSimulasi = false
          })
      })
    },
    cariDokter(val) {
      this.loadingDokter = true
      const params = {
        params: {
          q: val
        }
      }
      return new Promise(resolve => {
        api.get('/v1/settings/appmenu/cari_dokter', params)
          .then(resp => {
            this.loadingDokter = false
            console.log('dokter', resp?.data)
            this.dokters = resp?.data
            resolve(resp)
          })
          .catch(() => {
            this.loadingDokter = false
          })
      })
    }
  }
})
