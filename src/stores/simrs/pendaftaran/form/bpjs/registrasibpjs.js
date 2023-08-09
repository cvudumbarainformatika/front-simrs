import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { usePendaftaranAutocompleteStore } from '../../autocomplete'
import { findWithAttr, loadingBlock, notifCenterVue, notifErrVue, notifSuccessVue } from 'src/modules/utils'

export const useRegistrasiPasienBPJSStore = defineStore('registrasi_pasien_BPJS', {
  state: () => ({
    autocompleteStore: usePendaftaranAutocompleteStore(),
    loading: false,
    loadingdiagnosa: false,
    loadingsistembayar: false,
    loadingCekBpjs: false,
    tampilRujukan: false,
    tampilKontrol: false,
    tampilSuplesi: false,
    jumlahSEP: 0,
    suratKontrolChecked: false,
    rujukanPCareChecked: false,
    rujukanRSChecked: false,
    rencanaKontrolValid: false,
    rujukanPostMRS: false,
    kontrolDPJP: false,
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
      kecelakaan: '0',
      suplesi: '0'
    },
    paramKarcis: {},
    paramDiagnosa: { q: '' },
    paramPpkRujukan: { faskesasal: '' },
    paramDpjp: {
      tglsep: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      jenis_pelayanan: 2
    },
    paramKecelakaan: {
      kodepropinsi: '',
      kodekabupaten: ''
    },
    kataraks: [
      { nama: 'Tidak', value: '0' },
      { nama: 'Ya', value: '1' }
    ],
    // auto com
    asalrujukans: [
      { asalrujukan: 'Faskes Tingkat 1', kode: '1' },
      { asalrujukan: 'Faskes Tingkat 2', kode: '2' }
    ],
    sistembayars: [],
    polis: [],
    jenisKarcises: [],
    jenisKunjungans: [],
    prosedurs: [
      { id: 0, kode: '', procedure: '' },
      { id: 1, kode: '0', procedure: 'Prosedur Tidak Berkelanjutan' },
      { id: 2, kode: '1', procedure: 'Prosedur dan Terapi Berkelanjutan' }
    ],
    assesmens: [
      { id: 0, kode: '', assesmentpel: '' },
      { id: 1, kode: '1', assesmentpel: 'Poli spesialis tidak tersedia pada hari sebelumnya' },
      { id: 2, kode: '2', assesmentpel: 'Jam Poli telah berakhir pada hari sebelumnya' },
      { id: 3, kode: '3', assesmentpel: 'Dokter Spesialis yang dimaksud tidak praktek pada hari sebelumnya' },
      { id: 4, kode: '4', assesmentpel: 'Atas Instruksi RS' },
      { id: 5, kode: '5', assesmentpel: 'Tujuan Kontrol' }
    ],
    penunjangs: [],
    ///
    sistembayars1: [],
    kasrcispoli: null,
    dpjps: [],
    jadwalDpjps: [],
    tujuanKunjungans: [
      { nama: 'Normal', value: '0' },
      { nama: 'Prosedur', value: '1' },
      { nama: 'Konsul Dokter', value: '2' }
    ],
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
      { value: '0', nama: 'Bukan Kecelakaan Lalu Lintas [BKLL]' },
      { value: '1', nama: 'KLL dan Bukan Kecelakaan Kerja [BKK]' },
      { value: '2', nama: 'KLL dan KK' },
      { value: '3', nama: 'KK' }
    ],
    optionSuplesi: [
      { value: '1', nama: 'Ya' },
      { value: '0', nama: 'Tidak' }
    ],
    loadingKecelakaan: false,

    propinsies: [],
    kabupatens: [],
    kecamatans: [],

    form: {
      tglsep: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      tglrujukan: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      tglmasuk: date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss'),
      katarak: '0',
      jnspelayanan: '2',
      dpjp: '',
      nosuratkontrol: '',
      assesmentPel: '',
      kdPenunjang: '',
      flagprocedure: '',
      namadokter: '',
      kodekecamatankecelakaan: '',
      kodekabupatenkecelakaan: '',
      kodepropinsikecelakaan: '',
      propinsikecelakaan: '',
      kabupatenkecelakaan: '',
      kecamatankecelakaan: '',
      nosepsuplesi: '',
      suplesi: '0',
      keterangan: '',
      tglKecelakaan: '',
      lakalantas: '0',
      kodepolibpjs: '',
      catatan: ''
    }
  }),
  actions: {
    setForm(key, val) {
      this.form[key] = val
    },
    clearForm() {
      this.form = {
        tglsep: date.formatDate(Date.now(), 'YYYY-MM-DD'),
        tglrujukan: date.formatDate(Date.now(), 'YYYY-MM-DD'),
        tglKecelakaan: '',
        tglmasuk: date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss'),
        katarak: '0',
        jnspelayanan: '2',
        dpjp: '',
        nosuratkontrol: '',
        assesmentPel: '',
        asalRujukan: '1',
        asalrujukan: '1',
        kdPenunjang: '',
        flagprocedure: '',
        namadokter: '',
        kodekecamatankecelakaan: '',
        kodekabupatenkecelakaan: '',
        kodepropinsikecelakaan: '',
        propinsikecelakaan: '',
        kabupatenkecelakaan: '',
        kecamatankecelakaan: '',
        nosepsuplesi: '',
        suplesi: '0',
        keterangan: '',
        lakalantas: '0',
        kodepolibpjs: '',
        catatan: '',
        kdUnit: '',
        jkn: 'JKN'
      }
      this.display = {
        diagnosa: {},
        prosedur: {},
        assesment: {},
        penunjang: {},
        bayar: {
          kode: '1'
        },
        tanggal: {
          sep: date.formatDate(Date.now(), 'DD MMMM YYYY'),
          rujukan: date.formatDate(Date.now(), 'DD MMMM YYYY'),
          kecelakaan: date.formatDate(Date.now(), 'DD MMMM YYYY')
        },
        tempatKecelakaan: {},
        kabupatenKecelakaan: {},
        kecamatanKecelakaan: {},
        kecelakaan: '0',
        suplesi: '0'
      }
      this.paramKarcis = {}
      this.paramDiagnosa = { q: '' }
      this.paramPpkRujukan = { faskesasal: '' }
      this.paramDpjp = {
        tglsep: date.formatDate(Date.now(), 'YYYY-MM-DD'),
        jenis_pelayanan: 2
      }
      this.paramKecelakaan = {
        kodepropinsi: '',
        kodekabupaten: ''
      }
      this.jumlahSEP = 0
      this.suratKontrolChecked = false
      this.rencanaKontrolValid = false

      this.rujukanPCareChecked = false
      this.rujukanRSChecked = false
    },
    // initial data
    getInitialData() {
      // if (this.autocompleteStore.asalrujukans.length) {
      //   this.asalrujukans = this.autocompleteStore.asalrujukans
      // } else {
      //   this.getAsalRujukan()
      // }

      if (this.autocompleteStore.sistembayars1.length) {
        this.sistembayars1 = this.autocompleteStore.sistembayars1
      } else {
        this.getSistemBayar()
      }

      if (this.autocompleteStore.polis.length) {
        this.polis = this.autocompleteStore.polis
      } else {
        this.getPoli()
      }

      if (this.autocompleteStore.jenisKarcises.length) {
        this.jenisKarcises = this.autocompleteStore.jenisKarcises
      } else {
        this.getJenisKarcis()
      }

      if (this.autocompleteStore.jenisKunjungans.length) {
        this.jenisKunjungans = this.autocompleteStore.jenisKunjungans
      } else {
        this.getJenisKunjungan()
      }

      // if (this.autocompleteStore.prosedurs.length) {
      //   this.prosedurs = this.autocompleteStore.prosedurs
      // } else {
      //   this.getProsedur()
      // }

      // if (this.autocompleteStore.assesmens.length) {
      //   this.assesmens = this.autocompleteStore.assesmens
      // } else {
      //   this.getAssesmen()
      // }

      if (this.autocompleteStore.penunjangs.length) {
        this.penunjangs = this.autocompleteStore.penunjangs
      } else {
        this.getPenunjang()
      }
      // this.getDiagnosaAwal()
      // this.getPpkRujukan('anu')
    },
    // api related function
    // tempat kecelakaan -- start --
    async getPropinsiKecelakaan() {
      this.loadingKecelakaan = true
      await api.post('v1/simrs/bridgingbpjs/pendaftaran/provinsibpjs', this.paramKecelakaan)
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
      await api.post('v1/simrs/bridgingbpjs/pendaftaran/kabupatenbpjs', this.paramKecelakaan)
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
      await api.post('v1/simrs/bridgingbpjs/pendaftaran/kecamatanbpjs', this.paramKecelakaan)
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
      await api.post('v1/simrs/bridgingbpjs/pendaftaran/ceksuplesibpjs', val)
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
      await api.post('v1/simrs/bridgingbpjs/pendaftaran/listrujukanpcare', val)
        .then(resp => {
          this.loadingListRujukan = false
          this.listRujukanPcare = resp.data.result.rujukan ? resp.data.result.rujukan : []
          console.log('List rujukan p care', resp)
        })
        .catch(err => {
          console.log('List rujukan p care Error', err)
          this.loadingListRujukan = false
        })
    },
    async getListRujukanRs(val) {
      this.loadingListRujukanRS = true
      await api.post('v1/simrs/bridgingbpjs/pendaftaran/listrujukanrs', val)
        .then(resp => {
          this.loadingListRujukanRS = false
          this.listRujukanRs = resp.data.result.rujukan ? resp.data.result.rujukan : []
          console.log('list rujukan rs', resp)
        })
        .catch(err => {
          console.log('List rujukan rs', err)
          this.loadingListRujukanRS = false
        })
    },
    async getListSepMrs(val) {
      this.loadingListRujukanMrs = true
      await api.post('v1/simrs/bridgingbpjs/pendaftaran/listsepmrs', val)
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
      await api.post('v1/simrs/bridgingbpjs/pendaftaran/rencanakontrolbpjs', val)
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
      await api.post('v1/simrs/bridgingbpjs/pendaftaran/faskesasalbpjs', param)
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
    async getjadwalDokterDpjp() {
      this.loading = true
      await api.post('v1/simrs/bridgingbpjs/pendaftaran/jadwaldokter', this.paramDpjp)
        .then(resp => {
          this.loading = false
          // console.log('get jadwal dokter dpjp', resp.data.result)
          if (resp.data.result.length) {
            const data = resp.data.result
            data.forEach(anu => {
              anu.dpjp = String(anu.kodedokter)
            })
            this.jadwalDpjps = data
            console.log('jadwal dpjp ', data)
          }
          console.log('Jadwal DPJp ', resp.data.result)
          if (this.dpjpSuratKontrol !== '') {
            // this.form.dpjp = this.dpjpSuratKontrol
            const index = findWithAttr(this.jadwalDpjps, 'dpjp', this.dpjpSuratKontrol)
            if (index >= 0) {
              this.setForm('namadokter', this.jadwalDpjps[index].namadokter)
              this.setForm('jampraktek', this.jadwalDpjps[index].jadwal)
              console.log('log form ', this.form)
            }
          }
          return new Promise(resolve => { resolve(resp.data) })
        })
        .catch(() => {
          this.loading = false
        })
    },
    async getDokterDpjp() {
      this.loading = true
      await api.post('v1/simrs/bridgingbpjs/pendaftaran/dpjpbpjs', this.paramDpjp)
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
          // console.log('dokter DPJp ', resp.data)
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
      await api.post('v1/simrs/bridgingbpjs/pendaftaran/faskesasalbpjs', param)
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
          const data = resp.data
          const tamb = { id: 0, kode: '', namapenunjang: 'penunjang belum dipilih' }
          data.unshift(tamb)
          this.penunjangs = data
          this.autocompleteStore.setPenunjang(data)
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
          this.autocompleteStore.setAssesmen(resp.data)
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
          this.autocompleteStore.setProsedur(resp.data)
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
          this.autocompleteStore.setJenisKunjungan(resp.data)
        })
        .catch(() => {
          this.loading = false
        })
    },
    getDiagnosaAwal() {
      this.loadingdiagnosa = true
      // const param = { params: this.paramDiagnosa }
      return new Promise(resolve => {
        api.post('v1/simrs/bridgingbpjs/pendaftaran/diagnosabybpjs', this.paramDiagnosa)
          .then(resp => {
            this.loadingdiagnosa = false
            this.diagnosaAwals = resp.data.result.diagnosa
            console.log('dignosa awal', resp.data.result)
            resolve(resp)
          })
          .catch(() => {
            this.loadingdiagnosa = false
          })
      })
    },
    async getJenisKarcis() {
      this.loading = true
      await api.get('v1/simrs/master/jeniskartukarcis')
        .then(resp => {
          this.loading = false
          this.jenisKarcises = resp.data
          this.autocompleteStore.setJenisKarcis(resp.data)
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
          this.autocompleteStore.setPoli(resp.data)
        })
        .catch(() => {
          this.loading = false
        })
    },
    async getSistemBayar() {
      this.loadingsistembayar = true
      await api.get('v1/simrs/master/sistembayar')
        .then(resp => {
          this.loadingsistembayar = false
          this.sistembayars1 = resp.data
          this.autocompleteStore.setSistemBayar(resp.data)
          console.log('sistem bayar', resp.data)
        })
        .catch(() => {
          this.loadingsistembayar = false
        })
    },
    async getSistemBayar2(val) {
      const param = { params: { sistembayar1: val } }
      this.loadingsistembayar = true
      await api.get('v1/simrs/master/sistembayar2', param)
        .then(resp => {
          this.loadingsistembayar = false
          this.sistembayars = resp.data
          if (this.sistembayars.length === 1) {
            this.setForm('sistembayar', this.sistembayars[0].rs2)
            this.setForm('kodesistembayar', this.sistembayars[0].rs1)
            this.display.rs2 = this.sistembayars[0].rs2
          }
        })
        .catch(() => {
          this.loadingsistembayar = false
        })
    },
    // async getAsalRujukan() {
    //   this.loading = true
    //   await api.get('v1/simrs/master/listasalrujukan')
    //     .then(resp => {
    //       this.loading = false
    //       this.asalrujukans = resp.data
    //       this.autocompleteStore.setAsalRujukan(resp.data)
    //     })
    //     .catch(() => {
    //       this.loading = false
    //     })
    // },
    getJumlahSep(val) {
      const params = { params: val }
      this.suratKontrolChecked = false
      this.rencanaKontrolValid = false
      this.rujukanPCareChecked = false
      this.rujukanRSChecked = false
      this.loadingCekBpjs = true
      return new Promise(resolve => {
        api.get('/v1/anjungan/cek-jumlah-sep', params)
          .then(resp => {
            this.loadingCekBpjs = false
            // this.asalrujukans = resp.data
            console.log('jumlah sep', resp.data)
            this.jumlahSEP = parseInt(resp.data.result.jumlahSEP) >= 0 ? parseInt(resp.data.result.jumlahSEP) : 0
            if (resp.data.metadata.code !== '200') {
              notifErrVue('cek jumlah sep : ' + resp.data.metadata.message)
            }
            resolve(resp.data.result)
          })
          .catch(() => {
            this.loadingCekBpjs = false
          })
      })
    },
    cekRujukanPcare(val) {
      const params = { params: val }
      this.suratKontrolChecked = false
      this.loadingCekBpjs = true
      return new Promise(resolve => {
        api.get('/v1/anjungan/cari-rujukan', params)
          .then(resp => {
            this.loadingCekBpjs = false
            this.rujukanPCareChecked = true
            console.log('rujukan ', resp.data)
            if (resp.data.metadata.code !== '200') {
              notifErrVue('Cari Rujukan P Care : ' + resp.data.metadata.message)
            }
            resolve(resp.data)
          })
          .catch(() => {
            this.loadingCekBpjs = false
          })
      })
    },
    cekRujukanRs(val) {
      const params = { params: val }
      this.suratKontrolChecked = false
      this.loadingCekBpjs = true
      return new Promise(resolve => {
        api.get('/v1/anjungan/cari-rujukan-rs', params)
          .then(resp => {
            this.loadingCekBpjs = false
            this.rujukanRSChecked = true
            console.log('rujukan ', resp.data)
            if (resp.data.metadata.code !== '200') {
              notifErrVue('Cari Rujukan RS : ' + resp.data.metadata.message)
            }
            resolve(resp.data)
          })
          .catch(() => {
            this.loadingCekBpjs = false
          })
      })
    },
    cekSuratKontrol(val) {
      const params = { params: val }
      this.suratKontrolChecked = true
      this.loadingCekBpjs = true
      return new Promise(resolve => {
        api.get('/v1/anjungan/cari-rencana-kontrol', params)
          .then(resp => {
            console.log('surat kontrol resp', resp.data)
            if (resp.data.metadata.code !== '200') {
              notifErrVue('Cari Surat Kontrol : ' + resp.data.metadata.message)
            }
            const rujukan = resp.data.result.sep.provPerujuk.noRujukan
            console.log('surat kontrol rujukan', rujukan)
            if (!this.form.norujukan) {
              console.log('tidak ada nomor rujukan')
              if (rujukan) {
                const param = {
                  jenisrujukan: resp.data.result.sep.provPerujuk.asalRujukan,
                  norujukan: rujukan

                }
                this.getJumlahSep(param).then(resp => {
                  this.loadingCekBpjs = false
                  console.log('jumlah sep', resp)
                  // store.jumlahSEP = parseInt(resp.jumlahSEP) >= 0 ? parseInt(resp.jumlahSEP) : 0
                  this.form.norujukan = rujukan
                  this.rencanaKontrolValid = true
                })
              } else {
                notifErrVue('Nomor Rujukan tidak ditemukan')
              }
            } else {
              this.loadingCekBpjs = false
              if (rujukan) {
                if (rujukan !== this.form.norujukan) {
                  notifErrVue('Nomor Rujukan tidak sama')
                } else {
                  this.rencanaKontrolValid = true
                }
              } else {
                notifErrVue('Nomor rujukan Tidak ditemukan')
              }
            }
            // if (resp.data.metadata.code === '201') {
            //   notifErrVue(resp.data.metadata.message)
            // }
            resolve(resp.data)
          })
          .catch(() => {
            this.loadingCekBpjs = false
          })
      })
    },
    simpanRegistrasi() {
      return new Promise(resolve => {
        loadingBlock('show')
        this.loading = true
        api.post('v1/simrs/pendaftaran/simpandaftar', this.form)
          .then(resp => {
            console.log('simpan pendaftaran', resp)
            this.setForm('noreg', resp.data.noreg)
            console.log('after simpan ', this.form.noreg)
            this.loading = false
            loadingBlock('hide')
            resolve(resp.data)
            this.rujukanPostMRS = false
            this.kontrolDPJP = false
          })
          .catch(() => {
            this.loading = false
            loadingBlock('hide')
          })
      })
    },
    buatSep() {
      return new Promise(resolve => {
        this.loading = true
        api.post('v1/simrs/bridgingbpjs/pendaftaran/createsep', this.form)
          .then(resp => {
            console.log('Response SEP', resp.data)
            this.loading = false
            if (resp.data.metadata.code === '201') {
              notifSuccessVue('Perbaiki kesalahan, kemudian tak tekan tombol SEP')
              notifErrVue(resp.data.metadata.message)
            }
            if (resp.data.metadata.code === '200') {
              notifSuccessVue(resp.data.metadata.message)
              notifCenterVue('Berhasil Buat SEP')
            }
            resolve(resp.data)
          })
          .catch(() => { this.loading = false })
      })
    }
  }
})
