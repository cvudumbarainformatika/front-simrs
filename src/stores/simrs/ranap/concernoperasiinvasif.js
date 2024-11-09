import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { usePengunjungRanapStore } from './pengunjung'
// eslint-disable-next-line no-unused-vars
import { notifErrVue, notifSuccess } from 'src/modules/utils'
import { date } from 'quasar'

export const useConcernOperasiInvasifRanapStore = defineStore('concern-operasi-invasif-ranap-store', {
  state: () => ({
    form: {
      tanggal: null,
      pelaksana: null,
      pengedukasi: null,
      penerimaEdukasi: null,
      diagnosis: [],
      dasarDiagnosis: null,
      tindakanMedis: null,
      indikasi: null,
      tujuan: [],
      tujuanLain: null,
      tatacara: null,
      resiko: [],
      resikoLain: null,
      komplikasi: null,
      prognosis: [],
      alternatif: null,

      hubunganDgPasien: 'Diri Sendiri',
      keluarga: null,
      nama: null,
      lp: null,
      tglLahir: null,
      noKtp: null,
      alamat: null,
      telepon: null,

      ttdDokter: null,
      // ttdSaksiRs: null,
      ttdPetugas: null,
      // ttdPasien: null,
      ttdSaksiPasien: null,
      ttdYgMenyatakan: null,
      kdDokter: null,
      kdPetugas: null,
      // kdSaksiRs: null,
      saksiPasien: null,
      // ygMenyatakan: null,
      setuju: 'Iya'
    },
    dokters: [],
    perawats: [],
    nonNakes: [],

    loadingSave: false,
    loadingHapus: false,

    hubunganDgPasiens: ['Diri Sendiri', 'Suami', 'Istri', 'Anak', 'Orang Tua', 'Keluarga'],
    tujuans: ['Mengangkat Tumor', 'Menghilangkan Sumber Infeksi', 'Mengambil Spesimen', 'Mengembalikan fungsi tubuh', 'Melahirkan Bayi', 'Lain-lain'],
    resikos: ['Pendarahan', 'Infeksi Luka Operasi', 'Perlukaan Jaringan', 'Kematian', 'Lain-lain'],
    prognosis: ['Baik', 'Buruk'],
    iyaTidaks: ['Iya', 'Tidak'],
    jekels: [{
      value: 'Laki-Laki',
      label: 'L'
    },
    {
      value: 'Perempuan',
      label: 'P'
    }],
    loading: false,

    // =========================================================================================================== UNTUK ANESTESI-SEDASI
    tindakanMedisSedasis: ['Anestesi Umum', 'Anestesi Spinal', 'Anestesi Lokal', 'Sedasi sedang - dalam'],
    tujuanSedasis: ['Agar daerah yang akan dioperasi terbius atau tidak terasa', 'Agar tidak gelisah saat dilakukan tindakan'],
    tatacaraSedasis: 'Premedikasi, induksi anestesia / sedasi  recovery',
    resikoSedasis: 'Kegagalan pembiusan / sedasi',
    komplikasiSedasis: [
      {
        nama: 'Anestesi Umum',
        details: ['Mual / Muntah / menggigil', 'Sakit tenggorokan', 'Sakit menelan', 'Alergi / hipersensitif terhadap obat', 'Tekanan darah menurun', 'Nadi menurun']
      },
      {
        nama: 'Anestesi Spinal',
        details: ['Mual / Muntah / menggigil', 'Kesulitan buang air kecil', 'Alergi / hipersensitif tetapi jarang', 'Gangguan pernafasan / nafas terasa berat', 'Tekanan darah menurun', 'Nadi menurun']
      },
      {
        nama: 'Anestesi Lokal',
        details: ['Alergi / hipersensitif terhadap obat', 'Infeksi']
      },
      {
        nama: 'Sedasi sedang - dalam',
        details: ['Tidur dalam, sulit dibangunkan', 'Sumbatan jalan nafas', 'Perlu bantuan nafas', 'Mual / muntah']
      }

    ],
    // =========================================================================================================== UNTUK COLONOSCOPY

    pengertianColonoscopy: 'Tehnik pelayanan canggih untuk memeriksa saluran cerna bagian bawah secara visual dengan cara melihat langsung pada layar monitor',
    tujuanColonoscopy: 'Mendeteksi kelainan pada saluran cerna bagian bawah mulai dari anus, rektum dan usus besar, mengambil sampel jaringan',
    resikoColonoscopy: 'Mual, kembung sementara',
    komplikasiColonoscopys: '- Perdarahan' + '\n' + '- Infeksi' + '\n' + '- Luka gores',

    // =========================================================================================================== UNTUK di depan
    item: null,
    menuTab: 'OperasiInvasif'

  }),
  // getters: {
  //   doubleCount: (state) => state.counter * 2
  // },
  actions: {

    async saveData (pasien, jns) {
      // if (!pasien?.kodedokter) {
      //   return notifErrVue('kode Dokter masih kosong, silahkan tutup dulu pasien ini kemudian tekan tombol refresh di pojok kanan atas')
      // }
      this.loadingSave = true

      this.form.noreg = pasien?.noreg
      this.form.norm = pasien?.norm
      this.form.kdRuang = pasien?.kodepoli
      this.form.jenis = jns

      console.log('save inform form', this.form)

      // eslint-disable-next-line no-unused-vars
      const storeRanap = usePengunjungRanapStore()
      // storeRanap.injectDataPasien(pasien?.noreg, this.form, 'informconcern')

      try {
        const resp = await api.post('v1/simrs/ranap/layanan/informconcern/simpandata', this.form)
        console.log('save inform concern', resp.data)
        if (resp.status === 200) {
          storeRanap.deleteInjectanNull2(pasien?.noreg, 'informconcern')
          const isi = resp?.data?.result
          storeRanap.injectDataPasien(pasien?.noreg, isi, 'informconcern')
          notifSuccess(resp)
          this.loadingOrder = false
          this.initReset()
        }
        this.loadingOrder = false
      }
      catch (error) {
        this.loadingOrder = false
      }
    },

    async deleteData (pasien, id) {
      this.loadingHapus = true

      if (!id) {
        return notifErrVue('Tidak dapat dihapus')
      }

      const payload = { noreg: pasien?.noreg, id }
      try {
        const resp = await api.post('v1/simrs/ranap/layanan/informconcern/hapusdata', payload)
        this.loadingHapus = false
        // console.log(resp)
        if (resp.status === 200) {
          // const storePasien = usePengunjungPoliStore()
          const storeRanap = usePengunjungRanapStore()
          // storePasien.hapusDataFisio(pasien, id)
          storeRanap.hapusDataInjectan(pasien, id, 'informconcern')
          notifSuccess(resp)
        }
      }
      catch (error) {
        this.loadingHapus = false
        // console.log(error)
      }
    },

    initReset (pasien) {
      const hariIni = date.formatDate(Date.now(), 'YYYY-MM-DD')
      this.form = {
        tanggal: hariIni,
        pelaksana: null,
        pengedukasi: null,
        penerimaEdukasi: null,
        diagnosis: [],
        dasarDiagnosis: null,
        // tindakanMedis: null,
        indikasi: null,
        tujuan: [],
        tujuanLain: null,
        // tatacara: null,
        resiko: [],
        resikoLain: null,
        komplikasi: null,
        prognosis: [],
        alternatif: null,
        ttdPetugas: null,
        ttdPasien: null,

        hubunganDgPasien: 'Diri Sendiri',
        keluarga: null,
        nama: null,
        lp: 'Laki-Laki',
        tglLahir: null,
        noKtp: null,
        alamat: null,
        telepon: null,

        ttdDokter: null,
        ttdSaksiRs: null,
        ttdSaksiPasien: null,
        ttdYgMenyatakan: null,
        kdDokter: null,
        kdPetugas: null,
        // kdSaksiRs: null,
        saksiPasien: null,
        // ygMenyatakan: null,
        setuju: 'Iya'
      }

      if (this.menuTab === 'OperasiInvasif') {
        this.form.tatacara = null
        this.form.tindakanMedis = null
        this.form.tujuan = []
        this.form.resiko = []
        this.form.komplikasi = null
      }

      if (this.menuTab === 'Sedasi') {
        this.form.tatacara = this.tatacaraSedasis
        this.form.tindakanMedis = this.tindakanMedisSedasis.join(' | ')
        this.form.tujuan = this.tujuanSedasis
        this.form.resiko = this.resikoSedasis
        this.form.komplikasi = null
      }
      else if (this.menuTab === 'Colonoscopy') {
        this.form.indikasi = this.pengertianColonoscopy
        this.form.tujuanLain = this.tujuanColonoscopy
        this.form.resikoLain = this.resikoColonoscopy
        this.form.komplikasi = this.komplikasiColonoscopys
      }
      else {
        this.form.tatacara = null
        this.form.tindakanMedis = null
        this.form.tujuan = []
        this.form.resiko = []
        this.form.komplikasi = null
      }

      const pengunjung = usePengunjungRanapStore()
      this.dokters = pengunjung?.nakes?.filter(x => x?.kdgroupnakes === '1') ?? []
      this.perawats = pengunjung?.nakes?.filter(x => x?.kdgroupnakes === '2' || x?.kdgroupnakes === '3') ?? []
      this.nonNakes = pengunjung?.nonNakes

      // this.item = null

      return new Promise((resolve, reject) => {
        resolve()
      })
    }
  }
})
