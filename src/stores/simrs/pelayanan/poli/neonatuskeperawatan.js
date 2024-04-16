import { defineStore } from 'pinia'
// eslint-disable-next-line no-unused-vars
import { api } from 'src/boot/axios'
// eslint-disable-next-line no-unused-vars
import { usePengunjungPoliStore } from './pengunjung'
// eslint-disable-next-line no-unused-vars
import { notifErr, notifSuccess } from 'src/modules/utils'

export const useNeonatusKeperawatanStore = defineStore('neonatus-keperawatan', {
  state: () => ({
    yaTidaks: ['Tidak', 'Ya'],
    baikBuruks: ['Baik', 'Buruk'],
    kebiasaanIbus: ['Merokok', 'Minum Jamu', 'Minuman Beralkohol', 'Dll'],
    keadaanUmums: ['Tampak tidak sakit', 'Sakit ringan', 'Sakit sedang', 'Sakit berat'],
    golDarahs: ['A', 'B', 'O', 'AB'],
    positifNegatifs: ['Positif', 'Negatif'],
    aktifs: ['Aktif', 'Tidak Aktif'],
    uubs: ['Datar', 'Cekung', 'Tegang', 'Membonjol', 'Lain-lain'],
    adas: ['Tidak ada', 'Ada'],
    refleks: ['Moro', 'Menelan', 'Hisap', 'Babinski', 'Rooting', 'Lain-lain'],
    tangis: ['Kuat', 'Melengking', 'Lain-lain'],
    matas: ['Simetris', 'Asimetris'],
    pupils: ['Isokor', 'Anisokor'],
    kelopaks: ['TAK', 'Edema', 'Cekung', 'Lain-lain'],
    konjungtivas: ['TAK', 'Anemis', 'Konjungtivitis', 'Lain-lain'],
    skleras: ['TAK', 'Ikterik', 'Pendarahan', 'Lain-lain'],
    pendengarans: ['TAK', 'Asimetris', 'Serumen', 'Tidak ada lubang drum', 'Lain-lain'],
    penciumans: ['TAK', 'Asimetris', 'Pengeluaran cairan', 'Lain-lain'],
    warnaKulits: ['Kemerahan', 'Sianosis', 'Pucat', 'Lain-lain'],
    sirkulasis: ['Akral hangat', 'Akral dingin', 'CRT'],
    pulsasis: ['Palpitasi', 'Ederma', 'Kuat', 'Lemah', 'Mur-mur', 'Lain-lain'],
    jenisPernapasans: ['Pernapasan dada', 'Pernapasan Perut', 'Alat Bantu Napas'],
    teraturs: ['Teratur', 'Tidak Teratur'],
    retraksis: ['Tidak ada', 'Ringan', 'Sedang', 'Berat'],
    airEntris: ['Udara masuk', 'Penurunan udara masuk', 'Tidak ada udara masuk'],
    merintihs: ['Tidak ada', 'Terdengar dengan Stetoskop', 'Terdengar tanpa stetoskop'],
    suaraNapas: ['Veskuler', 'Weezing', 'Ronchi', 'Stridor'],
    muluts: ['Tidak Ada Kelainan', 'Simetris', 'Asimetris', 'Mucossa mulut kering', 'Bibir pucat', 'Lain-lain'],
    lidahs: ['Tidak Ada Kelainan', 'Kotor', 'Gerakan Asimetris', 'Bibir pucat', 'Lain-lain'],
    oesofagus: ['Tidak Ada Kelainan', 'Lain-lain'],
    abdomens: ['Supel', 'Asites', 'Tegang', 'Bising usus', 'Lain-lain'],
    babs: ['Normal', 'Konstipasi', 'Melena', 'Colostomy', 'Diare', 'Meco pertama'],
    warnaGenitourinasis: ['Kuning', 'Dempul', 'Coklat', 'Hijau', 'Lain-lain'],
    baks: ['Normal', 'Hematuri', 'Urin menetes', 'Sakit', 'Tidak Sakit', 'Oliguri', 'BAK pertama'],
    warnaBaks: ['Jernih', 'Kuning', 'Kuning pekat', 'Lain-lain'],
    lakilakis: ['Normal', 'Hiposdapia', 'Epispadia', 'Fimosis', 'Hidrokel', 'Lain-lain'],
    perempuans: ['Normal', 'Keputihan', 'Vagina Skintag', 'Lain-lain'],
    lanugos: ['Tidak ada', 'Banyak', 'Tipis', 'Bercak-bercak tanpa lanugo', 'Sebagian besar tanpa lanugo'],
    warnaInteguments: ['Pucat', 'Ikterik', 'Sianosis', 'Normal', 'Lain-lain'],
    turgors: ['Baik', 'Sedang', 'Buruk'],
    kulits: ['Normal', 'Rash/Kemerahan', 'Lesi', 'Luka', 'Memar', 'Piechi', 'Bula'],

    lengans: ['Fleksi', 'Ekstensi', 'Pergerakan Aktif', 'Pergerakan tidak aktif', 'Lain-lain'],
    tungkals: ['Fleksi', 'Ekstensi', 'Pergerakan Aktif', 'Pergerakan tidak aktif', 'Lain-lain'],
    rekoils: ['Rekoil lambat', 'Rekoil cepat', 'Rekoil segera', 'Lain-lain'],
    telapakKakis: ['Tipis', 'Garis transversal anterior', 'Garis 2/3 anterior', 'Seluruh telapak kaki'],

    komunikasis: ['Normal', 'Introvert', 'Ekstrovert', 'Lain-lain'],
    makananPokoks: ['Nasi', 'Selain nasi'],

    // skornyeri
    ekspresiWajahs: [{ value: 0, label: 'Santai' }, { value: 1, label: 'Meringis' }],
    menangis: [{ value: 0, label: 'Tidak Menangis' }, { value: 1, label: 'Merengek / Merintih' }, { value: 2, label: '' }],
    polaNafas: [{ value: 0, label: 'Santai' }, { value: 1, label: 'Perubahan Pola Nafas' }],
    skorLengans: [{ value: 0, label: 'Santai' }, { value: 1, label: 'Flexi/Ekstensi' }],
    skorKakis: [{ value: 0, label: 'Santai' }, { value: 1, label: 'Flexi/Ekstensi' }],
    rangsangans: [{ value: 0, label: 'Tertidur/bangun' }, { value: 1, label: 'Rewel' }],

    kesimpulanNyeri: 'Tidak Nyeri',

    form: {},
    loadingSave: false,
    preview: false
  }),
  actions: {

    initForm() {
      // anamnesis tambahan
      this.form.pernahDirawat = null
      this.form.indikasiRawat = null
      this.form.giziIbu = null
      this.form.kebiasaanIbu = []
      this.form.kebiasaanIbuDll = null
      this.form.riwayatTransfusi = null
      this.form.transfusiKapan = null
      this.form.reaksi = null
      this.form.reaksiYa = null
      this.form.riwayatImunisasi = null
      this.form.imunisasiKapan = null

      // pemeriksaan fisik
      this.form.keadaanUmum = null
      this.form.golDarahBayi = null
      this.form.golDarahBayiRh = null
      this.form.golDarahIbu = null
      this.form.golDarahIbuRh = null
      this.form.golDarahAyah = null
      this.form.golDarahAyahRh = null
      // Sistem Susunan Syaraf Pusat
      this.form.gerakBayi = null
      this.form.uub = null
      this.form.uubLain = null
      this.form.kejang = null
      this.form.kejangAda = null
      this.form.refleks = []
      this.form.refleksLain = null
      this.form.tangisBayi = []
      this.form.tangisBayiLain = null
      // sistempenglihatan
      this.form.posisiMata = null
      this.form.besarPupil = null
      this.form.kelopakMata = 'TAK'
      this.form.kelopakMataLain = null
      this.form.konjungtiva = 'TAK'
      this.form.konjungtivaLain = null
      this.form.sklera = 'TAK'
      this.form.skleraLain = null
      // sistem pendengaran
      this.form.pendengaran = 'TAK'
      this.form.pendengaranLain = null
      // Sistem Penciuman
      this.form.penciuman = 'TAK'
      this.form.penciumanLain = null
      // sistem kardiovaskuler
      this.form.warnaKulit = null
      this.form.warnaKulitSianosis = null
      this.form.warnaKulitLain = null
      this.form.denyutNadi = null
      this.form.denyutNadiFrekwensi = null
      this.form.sirkulasi = null
      this.form.sirkulasiCrt = null
      this.form.pulsasi = null
      this.form.pulsasiLokasi = null
      this.form.pulsasiLain = null
      // sistem pernapasan
      this.form.polaNafasNormal = null
      this.form.bradipnea = null
      this.form.tachipnea = null
      this.form.jenisPernapasan = null
      this.form.alatBantuPernapasan = null
      this.form.iramaPernapasan = null
      this.form.retraksi = null
      this.form.airEntri = null
      this.form.merintih = null
      this.form.suaraNapas = null
      // sistem pencernaan
      this.form.mulut = 'Tidak Ada Kelainan'
      this.form.mulutLain = null
      this.form.lidah = 'Tidak Ada Kelainan'
      this.form.lidahLain = null
      this.form.oesofagus = 'Tidak Ada Kelainan'
      this.form.oesofagusLain = null
      this.form.abdomen = null
      this.form.bisingUsus = null
      this.form.abdomenLain = null
      this.form.bab = null
      this.form.frekwensiBab = null
      this.form.mecoPertama = null
      // sistem genitourinasis
      this.form.warnaGenitourinasis = null
      this.form.warnaGenitourinasisLain = null
      this.form.bak = null
      this.form.bakPertama = null
      this.form.warnaBak = null
      this.form.warnaBakLain = null
      // sistem reproduksi
      this.form.lakilaki = []
      this.form.lakilakiLain = null
      this.form.perempuan = []
      this.form.perempuanLain = null
      // sistem integument
      this.form.vernicKasesosa = null
      this.form.vernicKasesosaAda = null
      this.form.lanugo = null
      this.form.warnaIntegument = null
      this.form.warnaIntegumentLain = null
      this.form.turgor = null
      this.form.kulitIntegument = null
      // sistem muskuloskeletal
      this.form.lengan = null
      this.form.lenganLain = null
      this.form.tungkal = null
      this.form.tungkalLain = null
      this.form.rekoil = null
      this.form.rekoilLain = null
      this.form.telapakKaki = null

      // ekonomi, spiritual, kultural
      this.form.komunikasi = null
      this.form.komunikasiLain = null
      this.form.makananPokok = []
      this.form.makananPokokLain = null
      this.form.pantanganMakan = null
      this.form.pantanganMakanYa = null

      // skor nyeri
      this.form.ekspresiWajah = 0
      this.form.menangis = 0
      this.form.polaNafas = 0
      this.form.skorLengan = 0
      this.form.skorKaki = 0
      this.form.keadaanRangsangan = 0
      this.form.skorNyeri = 0

      this.setSkorNyeri()
    },

    setSkorNyeri() {
      const jml = parseInt(this.form.ekspresiWajah) + parseInt(this.form.menangis) + parseInt(this.form.polaNafas) +
      parseInt(this.form.skorLengan) + parseInt(this.form.skorKaki) + parseInt(this.form.keadaanRangsangan)
      this.form.skorNyeri = jml

      if (jml === 0) {
        this.kesimpulanNyeri = 'Tidak Nyeri'
      } else if (jml === 1) {
        this.kesimpulanNyeri = 'Tidak Nyaman'
      } else if (jml >= 2 && jml <= 4) {
        this.kesimpulanNyeri = 'Nyeri Ringan - sedang'
      } else if (jml >= 5 && jml <= 7) {
        this.kesimpulanNyeri = 'Nyeri sedang - berat'
      }
    },

    saveData(pasien) {
      this.form.noreg = pasien?.noreg
      this.form.norm = pasien?.norm

      // console.log(this.form)
      return new Promise((resolve, reject) => {
        api.post('v1/simrs/pelayanan/neonatuskeperawatan/store', this.form)
          .then((resp) => {
            // console.log(resp)
            if (resp.status === 200) {
              const storePasien = usePengunjungPoliStore()
              const isi = resp.data
              storePasien.injectDataPasien(pasien, isi, 'neonatuskeperawatan')
              notifSuccess(resp)
              this.initForm()
              this.loadingSave = false
            }
            this.loadingSave = false
          })
          .catch((err) => {
            console.log(err)
            this.loadingSave = false
            reject(err)
          })
      })
    },

    deleteData(pasien, id) {
      const payload = { id }
      return new Promise((resolve, reject) => {
        api.post('v1/simrs/pelayanan/neonatuskeperawatan/deletedata', payload)
          .then((resp) => {
            // console.log('del', resp)
            if (resp.status === 200) {
              const storePasien = usePengunjungPoliStore()
              storePasien.hapusDataNeonatusKeperawatan(pasien, id)
              notifSuccess(resp)
            }
          })
          .catch((err) => {
            console.log(err)
            reject(err)
          })
      })
    },

    previewData(item) {
      this.preview = true
      this.form = item
    }

  }
})
