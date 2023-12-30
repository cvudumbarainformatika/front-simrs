import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { useKasirRajalListKunjunganStore } from '../../kasir/rajal/kunjungan'
import { useAplikasiStore } from 'src/stores/app/aplikasi'

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
      resep_keluar: date.formatDate(Date.now(), 'HH:mm'),
      jumlah: 0,
      keterangan: '-',
      aturan: '',
      noresep: date.formatDate(Date.now(), 'YYMMDDHHmmss')
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
    dokters: [],
    filtDokters: [],
    reseprinci: []
  }),
  actions: {
    setForm(key, val) {
      this.form[key] = val
    },
    setParams(key, val) {
      this.params[key] = val
    },
    resetObat() {
      this.form.jumlah = 0
      this.form.keterangan = '-'
      this.form.aturan = ''
      this.form.kodeobat = ''
      this.obatTerpilih = null
    },
    setPasien(val) {
      console.log('pasien', val)
      console.log('jenis pasien', this.jenispasien)
      const temp = val?.diagnosa?.map(x => x?.rs3 + ' - ' + x?.masterdiagnosa?.rs4)
      const diag = temp.join(',')
      console.log('diag', diag)
      if (val) {
        this.pasien = val
        this.isOpen = false
        this.setForm('noreg', val.noreg)
        this.setForm('norm', val.norm)
        this.setForm('sistembayar', val.kodesistembayar)
        this.setForm('dokter', val.kodedokter)
        this.setForm('diagnosa', diag ?? '-')
        this.reseprinci = []
        this.cariSimulasi(val?.noreg)
        if (this.jenispasien === 'rjl') this.getBillRajal(val)
        if (this.jenispasien === 'rnp') this.getBillRanap(val)
        if (this.jenispasien === 'igd') this.getBillIgd(val)

        const apps = useAplikasiStore()
        const param = {
          groups: val?.groups,
          kdruang: apps?.user?.pegawai?.kdruangansim
        }
        this.getDataObat(param)
      }
    },
    getBillRajal(val) {
      this.setForm('kdruangan', val.kodepoli)
      const kunjRajal = useKasirRajalListKunjunganStore()
      const param = { noreg: val?.noreg }
      kunjRajal.getBill(param).then(resp => {
        this.setForm('tagihanrs', resp?.data?.totalall)
        console.log('bill', resp?.data)
        console.log('form', this.form)
      })
    },
    getBillRanap(val) {
      this.setForm('kdruangan', val.kdruangan)
      if (!!this.form.dokter && !this.dokters.length) this.cariDokter(this.form.dokter)
    },
    getBillIgd(val) {
      this.setForm('kdruangan', val.kodepoli)
      if (!!this.form.dokter && !this.dokters.length) this.cariDokter(this.form.dokter)
    },
    obatSelected(val) {
      this.setForm('kdobat', val)
      const obat = this.obats.filter(a => a.kodeobat === val)
      console.log('obat', obat)
      if (obat.length) {
        this.obatTerpilih = obat[0]
        this.setForm('satuan_kcl', obat[0]?.satuankecil ?? '-')
        this.setForm('kodeobat', obat[0]?.kodeobat ?? '-')
        this.setForm('kandungan', obat[0]?.kandungan ?? '-')
        this.setForm('fornas', obat[0]?.fornas ?? '-')
        this.setForm('forkit', obat[0]?.forkit ?? '-')
        this.setForm('generik', obat[0]?.generik ?? '-')
        this.setForm('kode108', obat[0]?.kode108 ?? '-')
        this.setForm('uraian108', obat[0]?.uraian108 ?? '-')
        this.setForm('kode50', obat[0]?.kode50 ?? '-')
        this.setForm('uraian50', obat[0]?.uraian50 ?? '-')
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
            this.filtDokters = this.dokters.filter(dok => dok.nama.toLowerCase().includes(val.toLowerCase()) || dok.kdpegsimrs.toLowerCase().includes(val.toLowerCase()))
            resolve(resp)
          })
          .catch(() => {
            this.loadingDokter = false
          })
      })
    },
    simpanObat() {
      this.setForm('kddokter', this.form.dokter)
      console.log('form', this.form)
      this.loading = true
      return new Promise(resolve => {
        api.post('v1/simrs/farmasinew/depo/resepkeluar', this.form)
          .then(resp => {
            this.loading = false
            console.log('simpan obat', resp?.data)
            this.reseprinci.push(resp?.data?.rinci)
            this.resetObat()
            resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    }
  }
})
