import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { useKasirRajalListKunjunganStore } from '../../kasir/rajal/kunjungan'
import { notifErrVue } from 'src/modules/utils'

export const usePermintaanEResepStore = defineStore('permintaan_e_resep', {
  state: () => ({
    loading: false,
    loadingSigna: false,
    loadingObat: false,
    form: {
      keterangan: '-',
      jumlah_diminta: 1
    },
    listPemintaanSementara: [],
    signas: [],
    depos: [
      { nama: 'Floor Stock 1 (AKHP)', value: 'Gd-03010101', jenis: 't' },
      { nama: 'Depo Rawat inap', value: 'Gd-04010102', jenis: 'rnp' },
      { nama: 'Depo OK', value: 'Gd-04010103', jenis: 'ok' },
      { nama: 'Depo Rawat Jalan', value: 'Gd-05010101', jenis: 'rjl' },
      { nama: 'Depo IGD', value: 'Gd-02010104', jenis: 'igd' }
    ],
    nonFilteredObat: [],
    dpPar: '',
    Obats: [],
    namaObat: null,
    pasien: null,
    depo: ''
  }),
  actions: {
    setForm(key, val) {
      this.form[key] = val
    },
    resetForm() {},
    resetObat() {
      this.setForm('jumlah_diminta', 1)
      this.setForm('aturan', '')
      this.setForm('kodeobat', '')
      this.setForm('keterangan', '-')
    },
    setList(key) {
      this.listPemintaanSementara.unshift(key)
    },
    cariObat(val) {
      const depo = this.depos.filter(pa => pa.jenis === this.depo)
      console.log('depo', this?.depo, depo)
      if (depo.length) {
        this.dpPar = depo[0]?.value
      } else return notifErrVue('depo tujuan tidak ditemukan')
      const param = {
        groups: this?.pasien?.groups,
        kdruang: this.dpPar
      }
      const filtObat = this.nonFilteredObat.filter(nfil => nfil?.namaobat.toLowerCase().includes(val?.toLowerCase()))
      if (filtObat.length) {
        this.Obats = filtObat
      } else {
        console.log('obat', val, this.namaObat)
        this.loadingObat = true
        const params = { params: param }
        return new Promise(resolve => {
          api.get('v1/simrs/farmasinew/depo/lihatstokobateresep', params)
            .then(resp => {
              this.loadingObat = false
              this.nonFilteredObat = resp.data?.dataobat
              this.Obats = this.nonFilteredObat.filter(nfil => nfil?.namaobat.toLowerCase().includes(val?.toLowerCase()))
              console.log(resp.data)
              resolve(resp)
            })
            .catch(() => {
              this.loadingObat = false
              this.Obats = []
            })
        })
      }
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
    simpanObat() {
      console.log('form', this.form)
      this.loading = true
      return new Promise(resolve => {
        api.post('v1/simrs/farmasinew/depo/pembuatanresep', this.form)
          .then(resp => {
            this.loading = false
            console.log(resp)
            this.setForm('noresep', resp?.data?.nota)
            this.setList(resp?.data?.rinci)
            this.resetObat()
            resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    },
    selesaiResep() {
      console.log('selesai', this.form)
    }
  }
})
