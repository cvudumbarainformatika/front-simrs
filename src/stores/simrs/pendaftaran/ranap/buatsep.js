import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { dateDbFormat } from 'src/modules/formatter'
// eslint-disable-next-line no-unused-vars
import { useListHistoryPendaftaranRanapStore } from './history'
// eslint-disable-next-line no-unused-vars
import { notifCenterVue, notifErrVue, notifSuccessVue } from 'src/modules/utils'
// import { api } from 'boot/axios'
// import { dateDbFormat } from 'src/modules/formatter'
// import { date } from 'quasar'

export const useBuatSepRanapStore = defineStore('buat-sep-ranap', {
  state: () => ({
    t_sep: {
      noreg: '',
      noKartu: '', // auto
      tglSep: '', // auto
      ppkPelayanan: '', // dr backend kode rs
      jnsPelayanan: '1',
      klsRawat: {
        klsRawatHak: '',
        klsRawatNaik: '',
        pembiayaan: '',
        penanggungJawab: 'Pribadi'
      },
      noMR: '',
      rujukan: {
        asalRujukan: '',
        tglRujukan: '',
        noRujukan: '',
        ppkRujukan: ''
      },
      catatan: '',
      diagAwal: '',
      poli: {
        tujuan: '',
        eksekutif: '0'
      },
      cob: {
        cob: '0'
      },
      katarak: {
        katarak: '0'
      },
      jaminan: {
        lakaLantas: '0',
        noLP: '-',
        penjamin: {
          tglKejadian: '',
          keterangan: '',
          suplesi: {
            suplesi: '0',
            noSepSuplesi: '',
            lokasiLaka: {
              kdPropinsi: '',
              kdKabupaten: '',
              kdKecamatan: ''
            }
          }
        }
      },
      tujuanKunj: '0',
      flagProcedure: '',
      kdPenunjang: '',
      assesmentPel: '',
      skdp: {
        noSurat: '',
        kodeDPJP: ''
      },
      dpjpLayan: null, // (tidak diisi jika jnsPelayanan = "1" (RANAP)
      noTelp: '',
      user: '',
      // ini tambahan untuk rs227
      sepRanap: {
        ruang: '',
        kodesistembayar: '',
        diagnosa: '',
        jenispeserta: '',
        nama: '',
        tglLahir: '',
        jeniskelamin: '',
        hakKelas: '',
        namaAsuransiCob: ''
      }
    },

    loading: false,
    errors: [],
    jnsPelayanans: [
      { label: 'Rawat Inap', value: '1' },
      { label: 'Rawat Jalan', value: '2' }
    ],
    klsRawats: [
      { label: '-', value: '' },
      { label: 'Kelas 1', value: '1' },
      { label: 'Kelas 2', value: '2' },
      { label: 'Kelas 3', value: '3' }
    ],
    klsRawatNaiks: [
      { label: '-', value: '' },
      { label: 'VVIP', value: '1' },
      { label: 'VIP', value: '2' },
      { label: 'Kelas 1', value: '3' },
      { label: 'Kelas 2', value: '4' },
      { label: 'Kelas 3', value: '5' },
      { label: 'ICCU', value: '6' },
      { label: 'ICU', value: '7' }
    ],
    pembiayaans: [
      { label: '-', value: '' },
      { label: 'Pribadi', value: '1' },
      { label: 'Pemberi Kerja', value: '2' },
      { label: 'Asuransi Kesehatan Tambahan', value: '3' }
    ],
    asalRujukans: [
      { label: 'Faskes 1', value: '1' },
      { label: 'Faskes 2(Rs)', value: '2' }
    ],
    eksekutifs: [
      { label: 'Tidak', value: '0' },
      { label: 'Ya', value: '1' }
    ],
    cobs: [
      { label: 'TIDAK', value: '0' },
      { label: 'YA', value: '1' }
    ],
    kataraks: [
      { label: 'TIDAK', value: '0' },
      { label: 'YA', value: '1' }
    ],
    lakaLantas: [
      { label: 'Bukan Kecelakaan Lalu Lintas [BKLL]', value: '0' },
      { label: 'KLL dan bukan kecelakaan Kerja [BKK]', value: '1' },
      { label: 'KLL dan KK', value: '2' },
      { label: 'KK', value: '3' }
    ],
    penjamins: [
      { label: 'Jasa Raharja PT', value: '1' },
      { label: 'BPJS Ketenagakerjaan', value: '2' },
      { label: 'Taspen PT', value: '3' },
      { label: 'ASABRI PT', value: '4' }
    ],
    suplesis: [
      { label: 'Tidak', value: '0' },
      { label: 'Ya', value: '1' }
    ],

    tujuanKunjs: [
      { label: 'Normal', value: '0' },
      { label: 'Prosedure', value: '1' },
      { label: 'Konsul Dokter', value: '2' }
    ],

    flagProcedurs: [
      { label: 'Prosedure Tidak Berkelanjutan', value: '0' },
      { label: 'Prosedur dan Terapi Berkelanjutan', value: '1' },
      { label: '-', value: '' }
    ],

    kdPenunjangs: [
      { label: 'Radioterapi', value: '1' },
      { label: 'Kemoterapi', value: '2' },
      { label: 'Rehabilitasi Medik', value: '3' },
      { label: 'Rehabilitasi Psikososial', value: '4' },
      { label: 'Transfusi Darah', value: '5' },
      { label: 'Pelayanan Gigi', value: '6' },
      { label: 'Laboratorium', value: '7' },
      { label: 'USG', value: '8' },
      { label: 'Farmasi', value: '9' },
      { label: 'Lain-lain', value: '10' },
      { label: 'MRI', value: '11' },
      { label: 'Hemodialisa', value: '12' },
      { label: '-', value: '' }
    ],

    assesmentPels: [
      { label: '-', value: '' },
      { label: 'Atas Instruksi RS', value: '4' },
      { label: 'Tujuan Kontrol', value: '5' }
    ],

    propinsis: [],
    kabupatens: [],
    kecamatans: [],

    cekRujukanPeserta: null,
    listsRujukanPcare: [],
    listsRujukanRs: [],
    loadingListRujukan: false,
    listSpri: [],
    loadingListSpri: false,
    dialogListRujukan: false,
    dialogListSpri: false,

    listSuplesis: [],
    loadingListSuplesi: false,
    dialogListSuplesi: false,

    loadingRujukanInternal: false,

    ppkRujukan: {
      kode: null,
      nama: null
    },
    ppkRujukans: [],
    diagnosas: [],
    diagnosa: null,
    hakKelas: null,
    kelasRawat: null,
    skrDiKelas: null,
    naikKelas: false
  }),
  getters: {
    // doubleCount: (state) => state.counter * 2
  },
  actions: {
    initForm (pasien, petugas) {
      console.log('from RS', pasien)
      this.resetForm()
      this.t_sep.tglSep = dateDbFormat(pasien?.tglmasuk ?? new Date())

      this.t_sep.noreg = pasien?.noreg
      this.t_sep.noKartu = pasien?.noka
      this.t_sep.noMR = pasien?.norm
      this.t_sep.tglSep = dateDbFormat(new Date())
      this.t_sep.jnsPelayanan = '1'
      this.kelasRawat = (pasien.kelasruangan === '1' || pasien.kelasruangan === '2' || pasien.kelasruangan === '3') ? parseInt(pasien?.kelasruangan) : pasien.kelasruangan ?? null

      this.t_sep.jaminan.penjamin.tglKejadian = dateDbFormat(new Date())
      this.t_sep.noTelp = pasien?.nohp ?? '-'
      this.t_sep.user = petugas

      this.t_sep.sepRanap.ruang = pasien?.ruangan ?? ''
      this.t_sep.sepRanap.kodesistembayar = pasien?.kodesistembayar ?? ''
      this.t_sep.sepRanap.nama = pasien?.nama_panggil ?? ''
      this.t_sep.sepRanap.tglLahir = pasien?.tgllahir ?? ''
      this.t_sep.sepRanap.jeniskelamin = pasien?.kelamin ?? ''
    },

    fromListRujukan (ada, asal) {
      console.log('fromListRujukan', ada)
      this.t_sep.rujukan.asalRujukan = asal ?? ''
      this.t_sep.rujukan.noRujukan = ada?.noKunjungan ?? ''
      this.t_sep.rujukan.tglRujukan = ada?.tglKunjungan ?? ''
      this.t_sep.rujukan.ppkRujukan = ada?.provPerujuk?.kode ?? ''
      this.t_sep.diagAwal = ada?.diagnosa?.kode ?? ''

      this.ppkRujukan = ada?.provPerujuk ?? null
      this.diagnosa = ada?.diagnosa ?? null

      this.ppkRujukans = []
      this.ppkRujukans.push(this.ppkRujukan)

      this.diagnosas = []
      this.diagnosas.push(this.diagnosa ?? null)
    },

    fromListSpri (ada) {
      // console.log('fromListSpri', ada)
      this.t_sep.skdp.noSurat = ada?.noSuratKontrol ?? ''
      // this.t_sep.skdp.kodeDPJP = ada?.kodeDokter ?? ''
    },

    // gak dipake
    async getRujukanBridging (pasien) {
      const params = {
        noka: pasien?.noka
      }

      await api.post('v1/simrs/pendaftaran/ranap/get-rujukan-bridging-by-noka', params)
        .then((resp) => {
          console.log('Rujukan', resp)
          if (resp.data.metadata.code === '200') {
            this.cekRujukanPeserta = resp.data.result
            console.log('cekRujukanPeserta', this.cekRujukanPeserta)

            const ada = resp.data.result
            this.t_sep.rujukan.asalRujukan = ada?.asalFaskes ?? ''
            // this.t_sep.rujukan.noRujukan = ada?.rujukan?.noKunjungan ?? ''
            // this.t_sep.rujukan.tglRujukan = ada?.rujukan?.tglKunjungan ?? ''
            // this.t_sep.rujukan.ppkRujukan = ada?.rujukan?.provPerujuk?.kode ?? ''
            // this.t_sep.diagAwal = ada?.rujukan?.diagnosa?.kode ?? ''

            // this.ppkRujukan = ada?.rujukan?.provPerujuk ?? null
            // this.diagnosa = ada?.rujukan?.diagnosa ?? null

            this.ppkRujukans = []
            this.ppkRujukans.push(this.ppkRujukan)

            this.diagnosas = []
            this.diagnosas.push(this.diagnosa ?? null)
          }
        })
        .catch((err) => {
          console.log('Rujukan', err)
        })
    },

    async getRujukanInternal () {
      this.loadingRujukanInternal = true
      await api.get('v1/simrs/pendaftaran/ranap/get-no-rujukan-internal')
        .then((resp) => {
          this.loadingRujukanInternal = false
          console.log('No Rujukan', resp)
          if (resp.status === 200) {
            this.t_sep.rujukan.noRujukan = resp.data
            this.t_sep.rujukan.tglRujukan = dateDbFormat(new Date())
          }
        })
        .catch((err) => {
          console.log('No Rujukan', err)
          this.loadingRujukanInternal = false
        })
    },

    async getSpri (pasien) {
      this.dialogListSpri = true
      this.loadingListSpri = true
      const params = {
        norm: pasien?.norm
      }
      await api.post('v1/simrs/pendaftaran/ranap/get-list-spri', params)
        .then((resp) => {
          console.log('spri', resp)
          this.listSpri = resp.data
          this.loadingListSpri = false
        })
        .catch((err) => {
          console.log('spri', err)
          this.loadingListSpri = false
        })
    },

    async getPropinsiBpjs () {
      await api.post('v1/simrs/pendaftaran/ranap/get-propinsi-bpjs')
        .then((resp) => {
          console.log('propinsi-bpjs', resp)
          let data = []
          if (resp.data?.metadata?.code === '200') {
            const result = resp?.data?.result?.list
            if (result) {
              data = result
            }
          }

          this.propinsis = data
        })
        .catch((err) => {
          console.log('propinsi', err)
        })
    },
    async getKabupatenBpjs (val) {
      const params = {
        param: val
      }
      await api.post('v1/simrs/pendaftaran/ranap/get-kabupaten-bpjs', params)
        .then((resp) => {
          console.log('kabupaten-bpjs', resp)
          let data = []
          if (resp.data?.metadata?.code === '200') {
            const result = resp?.data?.result?.list
            if (result) {
              data = result
            }
          }

          this.kabupatens = data
        })
        .catch((err) => {
          console.log('kabupaten', err)
        })
    },
    async getKecamatanBpjs (val) {
      const params = {
        param: val
      }
      await api.post('v1/simrs/pendaftaran/ranap/get-kecamatan-bpjs', params)
        .then((resp) => {
          console.log('kecamatan-bpjs', resp)
          let data = []
          if (resp.data?.metadata?.code === '200') {
            const result = resp?.data?.result?.list
            if (result) {
              data = result
            }
          }

          this.kecamatans = data
        })
        .catch((err) => {
          console.log('kecamatan', err)
        })
    },

    async getSuplesiJasaRaharjaByBpjs (pasien) {
      this.dialogListSuplesi = true
      this.loadingListSuplesi = true
      const params = {
        noka: pasien.noka
      }
      await api.post('v1/simrs/pendaftaran/ranap/get-suplesi-jasa-raharja-by-bpjs', params)
        .then((resp) => {
          console.log('suplesi-jasa-raharja-by-bpjs', resp)
          let data = []
          if (resp.data?.metadata?.code === '200') {
            const result = resp?.data?.result?.jaminan
            if (result) {
              data = result
            }
          }

          this.listSuplesis = data

          this.propinsis = data
          this.loadingListSuplesi = false
        })
        .catch((err) => {
          console.log('kecamatan', err)
          this.loadingListSuplesi = false
        })
    },

    async onSubmit () {
      // console.log('t_sep', this.t_sep)
      this.loading = true
      await api.post('v1/simrs/pendaftaran/ranap/create-sep-ranap', this.t_sep)
        .then((resp) => {
          console.log('resp submit', resp)
          const history = useListHistoryPendaftaranRanapStore()
          this.loading = false
          if (resp.data?.metadata?.code === '200') {
            const result = resp?.data?.result?.sep
            if (result) {
              const items = history?.items
              const index = items.findIndex((item) => item.noreg === this.t_sep.noreg)
              items[index].sep = result?.noSep
            }
            notifSuccessVue(resp?.data?.metadata?.message)
            notifCenterVue('Berhasil Buat SEP')

            // tutup dialog
            history.dialogSep = false
          }
          else {
            notifErrVue(resp?.data?.metadata?.message)
          }
        })
        .catch((err) => {
          console.log('create sep', err)
          this.loading = false
        })
    },

    async onPreviewListRujukan (pasien) {
      this.dialogListRujukan = true
      this.loadingListRujukan = true
      const params = {
        noka: pasien.noka
      }

      await api.post('v1/simrs/pendaftaran/ranap/list-rujukan-peserta', params)
        .then((resp) => {
          console.log('Rujukan', resp)
          this.loadingListRujukan = false
          this.listsRujukanRs = resp.data?.rs?.rujukan ?? []
          this.listsRujukanPcare = resp.data?.pcare?.rujukan ?? []
        })
        .catch((err) => {
          console.log('Rujukan', err)
          this.loadingListRujukan = false
        })
    },

    resetForm () {
      this.t_sep = {
        noreg: '',
        noKartu: '', // auto
        tglSep: '', // auto
        ppkPelayanan: '', // dr backend kode rs
        jnsPelayanan: '1',
        klsRawat: {
          klsRawatHak: '',
          klsRawatNaik: '',
          pembiayaan: '',
          penanggungJawab: 'Pribadi'
        },
        noMR: '',
        rujukan: {
          asalRujukan: '',
          tglRujukan: '',
          noRujukan: '',
          ppkRujukan: ''
        },
        catatan: '',
        diagAwal: '',
        poli: {
          tujuan: '',
          eksekutif: '0'
        },
        cob: {
          cob: '0'
        },
        katarak: {
          katarak: '0'
        },
        jaminan: {
          lakaLantas: '0',
          noLP: '-',
          penjamin: {
            tglKejadian: '',
            keterangan: '',
            suplesi: {
              suplesi: '0',
              noSepSuplesi: '',
              lokasiLaka: {
                kdPropinsi: '',
                kdKabupaten: '',
                kdKecamatan: ''
              }
            }
          }
        },
        tujuanKunj: '0',
        flagProcedure: '',
        kdPenunjang: '',
        assesmentPel: '',
        skdp: {
          noSurat: '',
          kodeDPJP: ''
        },
        dpjpLayan: null, // (tidak diisi jika jnsPelayanan = "1" (RANAP)
        noTelp: '',
        user: '',

        sepRanap: {
          ruang: '',
          kodesistembayar: '',
          diagnosa: '',
          jenispeserta: '',
          nama: '',
          tglLahir: '',
          jeniskelamin: '',
          hakKelas: '',
          namaAsuransiCob: ''
        }
      }
    }

  }
})
