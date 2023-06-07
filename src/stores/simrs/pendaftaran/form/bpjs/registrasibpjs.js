import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'

export const useRegistrasiPasienBPJSStore = defineStore('registrasi_pasien_BPJS', {
  state: () => ({
    loading: false,
    tampilRujukan: false,
    tampilKontrol: false,
    tampilSuplesi: false,
    form: {
      tglsep: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      tglrujukan: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      tglKecelakaan: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      tglmasuk: date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss'),
      katarak: '0'
    },
    display: {
      diagnosa: {},
      prosedur: {},
      assesment: {},
      penunjang: {},
      bayar: {},
      tanggal: {
        sep: date.formatDate(Date.now(), 'DD MMMM YYYY'),
        rujukan: date.formatDate(Date.now(), 'DD MMMM YYYY'),
        kecelakaan: date.formatDate(Date.now(), 'DD MMMM YYYY')
      },
      tempatKecelakaan: {},
      kabupatenKecelakaan: {},
      kecamatanKecelakaan: {},
      kecelakaan: 0,
      suplesi: 0
    },
    paramKarcis: {},
    paramDiagnosa: { q: '' },
    paramPpkRujukan: { faskesasal: '' },
    paramDpjp: {
      tglsep: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      jenis_pelayanan: 2
    },
    kataraks: [
      { nama: 'Tidak', value: '0' },
      { nama: 'Ya', value: '1' }
    ],
    asalrujukans: [],
    sistembayars: [],
    sistembayars1: [],
    polis: [],
    kasrcispoli: null,
    jenisKarcises: [],
    dpjps: [],
    jenisKunjungans: [],
    tujuanKunjungans: [
      { nama: 'Prosedur', value: 1 },
      { nama: 'Konsul Dokter', value: 2 }
    ],
    prosedurs: [],
    assesmens: [],
    penunjangs: [],
    diagnosaAwals: [],
    ppkRujukans: [],
    listSuratKontrols: [],
    listRencanaKontrols: [],
    dpjpSuratKontrol: '',
    listRujukanPcare: [],
    listRujukanRs: [],
    listRujukanSepMrs: [],
    listSuplesi: [],
    loadingPpkRujukan: false,
    loadingListRujukan: false,
    loadingListRujukanRS: false,
    loadingListRujukanMrs: false,
    loadingSuplesi: false,
    loadingSuratKontrol: false,
    loadingRencanaKontrol: false,
    kecelakaans: [
      { value: 0, nama: 'Bukan Kecelakaan Lalu Lintas [BKLL]' },
      { value: 1, nama: 'KLL dan Bukan Kecelakaan Kerja [BKK]' },
      { value: 2, nama: 'KLL dan KK' },
      { value: 3, nama: 'KK' }
    ],
    optionSuplesi: [
      { value: 1, nama: 'Ya' },
      { value: 0, nama: 'Tidak' }
    ],
    loadingKecelakaan: false,
    paramKecelakaan: {
      kodepropinsi: '',
      kodekabupaten: ''
    },
    propinsies: [],
    kabupatens: [],
    kecamatans: []
  }),
  actions: {
    setForm(key, val) {
      this.form[key] = val
    },

    // initial data
    getInitialData() {
      this.getAsalRujukan()
      this.getSistemBayar()
      this.getPoli()
      this.getJenisKarcis()
      this.getJenisKunjungan()
      this.getProsedur()
      this.getAssesmen()
      this.getPenunjang()
      // this.getDiagnosaAwal()
      // this.getPpkRujukan('anu')
    },
    // api related function
    // tempat kecelakaan -- start --
    async getPropinsiKecelakaan() {
      this.loadingKecelakaan = true
      await api.post('v1/simrs/pendaftaran/provinsibpjs', this.paramKecelakaan)
        .then(resp => {
          this.loadingKecelakaan = false
          this.propinsies = resp.data.result.list ? resp.data.result.list : []
          console.log('propinsi', resp)
        })
        .catch(() => {
          this.loadingKecelakaan = false
        })
    },
    async getKabupatenKecelakaan() {
      this.loadingKecelakaan = true
      await api.post('v1/simrs/pendaftaran/kabupatenbpjs', this.paramKecelakaan)
        .then(resp => {
          this.loadingKecelakaan = false
          this.kabupatens = resp.data.result.list ? resp.data.result.list : []
          console.log('kabupaten', resp)
        })
        .catch(() => {
          this.loadingKecelakaan = false
        })
    },
    async getKecamatanKecelakaan() {
      this.loadingKecelakaan = true
      await api.post('v1/simrs/pendaftaran/kecamatanbpjs', this.paramKecelakaan)
        .then(resp => {
          this.loadingKecelakaan = false
          this.kecamatans = resp.data.result.list ? resp.data.result.list : []
          console.log('kecamatan', resp)
        })
        .catch(() => {
          this.loadingKecelakaan = false
        })
    },
    // tempat kecelakaan -- end --
    async getListSuplesi(val) {
      this.loadingSuplesi = true
      this.tampilSuplesi = true
      await api.post('v1/simrs/pendaftaran/ceksuplesibpjs', val)
        .then(resp => {
          this.loadingSuplesi = false
          this.listSuplesi = resp.data.result.jaminan ? resp.data.result.jaminan : []
          console.log('List Suplesi', resp)
        })
        .catch(() => {
          this.loadingSuplesi = false
        })
    },
    async getListRujukanPCare(val) {
      this.loadingListRujukan = true
      await api.post('v1/simrs/pendaftaran/listrujukanpcare', val)
        .then(resp => {
          this.loadingListRujukan = false
          this.listRujukanPcare = resp.data.result.rujukan ? resp.data.result.rujukan : []
          console.log('List rujukan p care', resp)
        })
        .catch(() => {
          this.loadingListRujukan = false
        })
    },
    async getListRujukanRs(val) {
      this.loadingListRujukanRS = true
      await api.post('v1/simrs/pendaftaran/listrujukanrs', val)
        .then(resp => {
          this.loadingListRujukanRS = false
          this.listRujukanRs = resp.data.result.rujukan ? resp.data.result.rujukan : []
          console.log('list rujukan rs', resp)
        })
        .catch(() => {
          this.loadingListRujukanRS = false
        })
    },
    async getListSepMrs(val) {
      this.loadingListRujukanMrs = true
      await api.post('v1/simrs/pendaftaran/listsepmrs', val)
        .then(resp => {
          this.loadingListRujukanMrs = false
          this.listRujukanSepMrs = resp.data
          console.log('list sep mrs', resp)
        })
        .catch(() => {
          this.loadingListRujukanMrs = false
        })
    },
    async getListRencanaKontrol(val) {
      this.loadingRencanaKontrol = true
      await api.post('v1/simrs/pendaftaran/rencanakontrolbpjs', val)
        .then(resp => {
          this.loadingRencanaKontrol = false
          this.listRencanaKontrols = resp.data.result.list ? resp.data.result.list : []
          console.log('List rencana kontrol', resp)
        })
        .catch(() => {
          this.loadingRencanaKontrol = false
        })
    },
    async cekRujukanPeserta(val) {
      this.loading = true
      const param = { faskesasal: val }
      await api.post('v1/simrs/pendaftaran/faskesasalbpjs', param)
        .then(resp => {
          this.loading = false
          this.ppkRujukans = resp.data.result.faskes
          console.log('PPK rujukan', resp)
        })
        .catch(() => {
          this.loading = false
        })
    },
    async getListSuratKontrol(val) {
      this.loadingSuratKontrol = true
      const param = { params: val }
      await api.get('v1/simrs/rekomdpjp/rekomdpjp', param)
        .then(resp => {
          this.loadingSuratKontrol = false
          this.listSuratKontrols = resp.data
          console.log('Surat kontrols', resp)
        })
        .catch(() => {
          this.loadingSuratKontrol = false
        })
    },
    async getDokterDpjp() {
      this.loading = true
      await api.post('v1/simrs/pendaftaran/dpjpbpjs', this.paramDpjp)
        .then(resp => {
          this.loading = false
          if (resp.data.result.list.length) {
            const data = resp.data.result.list
            data.forEach(anu => {
              anu.dpjp = anu.kode
            })
            this.dpjps = data
            console.log('result ', data)
          }
          console.log('dokter DPJp ', resp.data)
          if (this.dpjpSuratKontrol !== '') this.form.dpjp = this.dpjpSuratKontrol
          return new Promise(resolve => { resolve(resp.data) })
        })
        .catch(() => {
          this.loading = false
        })
    },
    async getKarcisPoli() {
      this.loading = true
      const param = { params: this.paramKarcis }
      await api.get('v1/simrs/pendaftaran/getkarcispoli', param)
        .then(resp => {
          this.loading = false
          this.kasrcispoli = resp.data
          const temp = Object.keys(resp.data)
          if (temp.length) {
            temp.forEach(key => {
              this.setForm(key, resp.data[key])
            })
          }
          console.log('jenis karcis ', resp.data)
          return new Promise(resolve => { resolve(resp.data) })
        })
        .catch(() => {
          this.loading = false
        })
    },
    async getPpkRujukan(val) {
      this.loadingPpkRujukan = true
      const param = { faskesasal: val }
      await api.post('v1/simrs/pendaftaran/faskesasalbpjs', param)
        .then(resp => {
          this.loadingPpkRujukan = false
          this.ppkRujukans = resp.data.result.faskes
          console.log('PPK rujukan', resp)
        })
        .catch(() => {
          this.loadingPpkRujukan = false
        })
    },
    async getPenunjang() {
      this.loading = true
      await api.get('v1/simrs/bpjs/master/penunjangbpjs')
        .then(resp => {
          this.loading = false
          this.penunjangs = resp.data
          console.log('Penunjang BPJS', resp.data)
        })
        .catch(() => {
          this.loading = false
        })
    },
    async getAssesmen() {
      this.loading = true
      await api.get('v1/simrs/bpjs/master/assesmenbpjs')
        .then(resp => {
          this.loading = false
          this.assesmens = resp.data
          console.log('Assesmen BPJS', resp.data)
        })
        .catch(() => {
          this.loading = false
        })
    },
    async getProsedur() {
      this.loading = true
      await api.get('v1/simrs/bpjs/master/procedurebpjs')
        .then(resp => {
          this.loading = false
          this.prosedurs = resp.data
          console.log('Prosedur BPJS', resp.data)
        })
        .catch(() => {
          this.loading = false
        })
    },
    async getJenisKunjungan() {
      this.loading = true
      await api.get('v1/simrs/bpjs/master/jeniskunjunganbpjs')
        .then(resp => {
          this.loading = false
          this.jenisKunjungans = resp.data
          console.log('Jenis kunjungan BPJS', resp.data)
        })
        .catch(() => {
          this.loading = false
        })
    },
    async getDiagnosaAwal() {
      this.loading = true
      const param = { params: this.paramDiagnosa }
      await api.get('v1/simrs/pendaftaran/getDiagnosa', param)
        .then(resp => {
          this.loading = false
          this.diagnosaAwals = resp.data
          console.log('karcis poli', resp.data)
        })
        .catch(() => {
          this.loading = false
        })
    },
    async getJenisKarcis() {
      this.loading = true
      await api.get('v1/simrs/master/jeniskartukarcis')
        .then(resp => {
          this.loading = false
          this.jenisKarcises = resp.data
          console.log('jenis karcis ', resp.data)
        })
        .catch(() => {
          this.loading = false
        })
    },
    async getPoli() {
      this.loading = true
      await api.get('v1/simrs/master/listmasterpoli')
        .then(resp => {
          this.loading = false
          this.polis = resp.data
          console.log('poli', resp.data)
        })
        .catch(() => {
          this.loading = false
        })
    },
    async getSistemBayar() {
      this.loading = true
      await api.get('v1/simrs/master/sistembayar')
        .then(resp => {
          this.loading = false
          this.sistembayars1 = resp.data
          console.log('sistem bayar', resp.data)
        })
        .catch(() => {
          this.loading = false
        })
    },
    async getSistemBayar2(val) {
      const param = { params: { sistembayar1: val } }
      this.loading = true
      await api.get('v1/simrs/master/sistembayar2', param)
        .then(resp => {
          this.loading = false
          this.sistembayars = resp.data
          console.log('sistem bayar', resp.data)
        })
        .catch(() => {
          this.loading = false
        })
    },
    async getAsalRujukan() {
      this.loading = true
      await api.get('v1/simrs/master/listasalrujukan')
        .then(resp => {
          this.loading = false
          this.asalrujukans = resp.data
          console.log('asal rujukan', resp.data)
        })
        .catch(() => {
          this.loading = false
        })
    },
    simpanRegistrasi() {
      return new Promise(resolve => {
        this.loading = true
        api.post('v1/simrs/pendaftaran/rajalumumsimpan', this.form)
          .then(resp => {
            console.log('simpan pendaftaran', resp)
            this.loading = false
            resolve(resp)
          })
          .catch(() => { this.loading = false })
      })
    }
  }
})
