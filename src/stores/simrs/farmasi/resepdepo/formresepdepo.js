import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { useKasirRajalListKunjunganStore } from '../../kasir/rajal/kunjungan'
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { useListResepDepoStore } from './listresep'

export const useResepDepoFarmasiStore = defineStore('resep_depo_farmasi_setore', {
  state: () => ({
    isOpen: false,
    loading: false,
    loadingSimulasi: false,
    loadingCari: false,
    loadingDokter: false,
    loadingSigna: false,
    jenispasien: 'rjl',
    form: {
      tanggal: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      resep_masuk: date.formatDate(Date.now(), 'HH:mm'),
      resep_keluar: date.formatDate(Date.now(), 'HH:mm'),
      jumlah: 0,
      keterangan: '-',
      aturan: '',
      konsumsi: '',
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
    reseprinci: [],
    signas: []
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
      this.form.konsumsi = ''
      this.obatTerpilih = null
    },
    setPasien(val) {
      const list = useListResepDepoStore()
      console.log('pasien', val)
      console.log('jenis pasien', this.jenispasien)
      const temp = val?.diagnosa?.map(x => x?.rs3 + ' - ' + x?.masterdiagnosa?.rs4)
      const diag = temp?.length ? temp.join(',') : '-'
      console.log('diag', diag)
      if (val) {
        this.notas = []
        this.nota = ''
        list.setParam('noreg', val?.noreg)
        this.pasien = val
        this.isOpen = false
        this.setForm('noreg', val.noreg)
        this.setForm('norm', val.norm)
        this.setForm('groupsistembayar', val.groups)
        this.setForm('sistembayar', val.kodesistembayar ?? val?.kdsistembayar)
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
    signaSelected(val) {
      this.setForm('aturan', val)
      const signa = this.signas.filter(sig => sig.signa === val)
      if (signa.length) {
        this.setForm('jumlahdosis', parseFloat(signa[0]?.jumlah))
        if (parseFloat(this.form.jumlah) > 0) {
          const kons = this.form.jumlah / parseFloat(signa[0]?.jumlah)
          this.setForm('konsumsi', kons)
        }
      }
      console.log('signa selected', signa)
      console.log('form', this.form)
    },
    writeSigna(val) {
      console.log('write signa', val)
      this.setForm('aturan', val)
    },
    saveSigna(val) {
      console.log('save signa', val)
    },
    async getSigna() {
      this.loadingSigna = true
      await api.get('v1/simrs/farmasinew/depo/get-signa')
        .then(resp => {
          this.loadingSigna = false
          console.log('signa', resp?.data)
          this.signas = resp?.data
        })
        .catch(() => { this.loadingSigna = false })
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
      this.setForm('kodeincbg', '-')
      this.setForm('uraianinacbg', '-')
      this.setForm('tarifina', 0)
      // this.loadingSimulasi = true
      // const param = {
      //   params: { noreg: val }
      // }
      // return new Promise(resolve => {
      //   api.get('v1/simrs/pelayanan/carisimulasi', param)
      //     .then(resp => {
      //       this.loadingSimulasi = false
      //       console.log('cri simulasi', resp)
      //       const tarif = resp?.data?.response?.cbg?.base_tariff ?? (resp?.data?.response?.cbg?.tariff ?? 0)
      //       this.setForm('kodeincbg', resp?.data?.response?.cbg?.code ?? '-')
      //       this.setForm('uraianinacbg', resp?.data?.response?.cbg?.description ?? '-')
      //       this.setForm('tarifina', tarif ?? '-')

      //       resolve(resp)
      //     })
      //     .catch(() => {
      //       this.loadingSimulasi = false
      //     })
      // })
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
      this.setForm('nota', this.nota)
      console.log('form', this.form)
      this.loading = true
      return new Promise(resolve => {
        api.post('v1/simrs/farmasinew/depo/resepkeluar', this.form)
          .then(resp => {
            this.loading = false
            console.log('simpan obat', resp?.data)
            if (resp?.data?.rinci) this.reseprinci.push(resp?.data?.rinci)
            if (resp?.data?.nota) {
              const temp = resp?.data?.nota
              const adaNota = this.notas.filter(a => a === temp)
              if (!adaNota?.length) {
                this.notas.push(temp)
                this.nota = temp
              }
            }
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
