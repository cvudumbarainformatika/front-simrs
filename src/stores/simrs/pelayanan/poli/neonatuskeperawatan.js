import { defineStore } from 'pinia'
// eslint-disable-next-line no-unused-vars
import { api } from 'src/boot/axios'
// eslint-disable-next-line no-unused-vars
import { usePengunjungPoliStore } from './pengunjung'
// eslint-disable-next-line no-unused-vars
import { notifErr, notifSuccess } from 'src/modules/utils'

export const useNeonatusKeperawatanStore = defineStore('neonatus-keperawatan', {
  state: () => ({
    neonatuskeperawatan: null,

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

    initForm (pasien) {
      // anamnesis tambahan
      this.form.pernahDirawat = this.neonatuskeperawatan?.pernahDirawat ?? null
      this.form.indikasiRawat = this.neonatuskeperawatan?.indikasiRawat ?? null
      this.form.giziIbu = this.neonatuskeperawatan?.giziIbu ?? null
      this.form.kebiasaanIbu = this.neonatuskeperawatan?.kebiasaanIbu ?? []
      this.form.kebiasaanIbuDll = this.neonatuskeperawatan?.kebiasaanIbuDll ?? null
      this.form.riwayatTransfusi = this.neonatuskeperawatan?.riwayatTransfusi ?? null
      this.form.transfusiKapan = this.neonatuskeperawatan?.transfusiKapan ?? null
      this.form.reaksi = this.neonatuskeperawatan?.reaksi ?? null
      this.form.reaksiYa = this.neonatuskeperawatan?.reaksiYa ?? null
      this.form.riwayatImunisasi = this.neonatuskeperawatan?.riwayatImunisasi ?? null
      this.form.imunisasiKapan = this.neonatuskeperawatan?.imunisasiKapan ?? null

      // pemeriksaan fisik
      this.form.keadaanUmum = this.neonatuskeperawatan?.keadaanUmum ?? null
      this.form.golDarahBayi = this.neonatuskeperawatan?.golDarahBayi ?? null
      this.form.golDarahBayiRh = this.neonatuskeperawatan?.golDarahBayiRh ?? null
      this.form.golDarahIbu = this.neonatuskeperawatan?.golDarahIbu ?? null
      this.form.golDarahIbuRh = this.neonatuskeperawatan?.golDarahIbuRh ?? null
      this.form.golDarahAyah = this.neonatuskeperawatan?.golDarahAyah ?? null
      this.form.golDarahAyahRh = this.neonatuskeperawatan?.golDarahAyahRh ?? null
      // Sistem Susunan Syaraf Pusat
      this.form.gerakBayi = this.neonatuskeperawatan?.gerakBayi ?? null
      this.form.uub = this.neonatuskeperawatan?.uub ?? null
      this.form.uubLain = this.neonatuskeperawatan?.uubLain ?? null
      this.form.kejang = this.neonatuskeperawatan?.kejang ?? null
      this.form.kejangAda = this.neonatuskeperawatan?.kejangAda ?? null
      this.form.refleks = this.neonatuskeperawatan?.refleks ?? []
      this.form.refleksLain = this.neonatuskeperawatan?.refleksLain ?? null
      this.form.tangisBayi = this.neonatuskeperawatan?.tangisBayi ?? []
      this.form.tangisBayiLain = this.neonatuskeperawatan?.tangisBayiLain ?? null
      // sistempenglihatan
      this.form.posisiMata = this.neonatuskeperawatan?.posisiMata ?? null
      this.form.besarPupil = this.neonatuskeperawatan?.besarPupil ?? null
      this.form.kelopakMata = this.neonatuskeperawatan?.kelopakMata ?? 'TAK'
      this.form.kelopakMataLain = this.neonatuskeperawatan?.kelopakMataLain ?? null
      this.form.konjungtiva = this.neonatuskeperawatan?.konjungtiva ?? 'TAK'
      this.form.konjungtivaLain = this.neonatuskeperawatan?.konjungtivaLain ?? null
      this.form.sklera = this.neonatuskeperawatan?.sklera ?? 'TAK'
      this.form.skleraLain = this.neonatuskeperawatan?.skleraLain ?? null
      // sistem pendengaran
      this.form.pendengaran = this.neonatuskeperawatan?.pendengaran ?? 'TAK'
      this.form.pendengaranLain = this.neonatuskeperawatan?.pendengaranLain ?? null
      // Sistem Penciuman
      this.form.penciuman = this.neonatuskeperawatan?.penciuman ?? 'TAK'
      this.form.penciumanLain = this.neonatuskeperawatan?.penciumanLain ?? null
      // sistem kardiovaskuler
      this.form.warnaKulit = this.neonatuskeperawatan?.warnaKulit ?? null
      this.form.warnaKulitSianosis = this.neonatuskeperawatan?.warnaKulitSianosis ?? null
      this.form.warnaKulitLain = this.neonatuskeperawatan?.warnaKulitLain ?? null
      this.form.denyutNadi = this.neonatuskeperawatan?.denyutNadi ?? null
      this.form.denyutNadiFrekwensi = this.neonatuskeperawatan?.denyutNadiFrekwensi ?? null
      this.form.sirkulasi = this.neonatuskeperawatan?.sirkulasi ?? null
      this.form.sirkulasiCrt = this.neonatuskeperawatan?.sirkulasiCrt ?? null
      this.form.pulsasi = this.neoanatuskeperawatan?.pulsasi ?? null
      this.form.pulsasiLokasi = this.neonatuskeperawatan?.pulsasiLokasi ?? null
      this.form.pulsasiLain = this.neonatuskeperawatan?.pulsasiLain ?? null
      // sistem pernapasan
      this.form.polaNafasNormal = this.neonatuskeperawatan?.polaNafasNormal ?? null
      this.form.bradipnea = this.neonatuskeperawatan?.bradipnea ?? null
      this.form.tachipnea = this.neonatuskeperawatan?.tachipnea ?? null
      this.form.jenisPernapasan = this.neonatuskeperawatan?.jenisPernapasan ?? null
      this.form.alatBantuPernapasan = this.neonatuskeperawatan?.alatBantuPernapasan ?? null
      this.form.iramaPernapasan = this.neonatuskeperawatan?.iramaPernapasan ?? null
      this.form.retraksi = this.neonatuskeperawatan?.retraksi ?? null
      this.form.airEntri = this.neonatuskeperawatan?.airEntri ?? null
      this.form.merintih = this.neonatuskeperawatan?.merintih ?? null
      this.form.suaraNapas = this.neonatuskeperawatan?.suaraNapas ?? null
      // sistem pencernaan
      this.form.mulut = this.neonatuskeperawatan?.mulut ?? 'Tidak Ada Kelainan'
      this.form.mulutLain = this.neonatuskeperawatan?.mulutLain ?? null
      this.form.lidah = this.neonatuskeperawatan?.lidah ?? 'Tidak Ada Kelainan'
      this.form.lidahLain = this.neonatuskeperawatan?.lidahLain ?? null
      this.form.oesofagus = this.neonatuskeperawatan?.oesofagus ?? 'Tidak Ada Kelainan'
      this.form.oesofagusLain = this.neonatuskeperawatan?.oesofagusLain ?? null
      this.form.abdomen = this.neonatuskeperawatan?.abdomen ?? null
      this.form.bisingUsus = this.neonatuskeperawatan?.bisingUsus ?? null
      this.form.abdomenLain = this.neonatuskeperawatan?.abdomenLain ?? null
      this.form.bab = this.neonatuskeperawatan?.bab ?? null
      this.form.frekwensiBab = this.neonatuskeperawatan?.frekwensiBab ?? null
      this.form.mecoPertama = this.neonatuskeperawatan?.mecoPertama ?? null
      // sistem genitourinasis
      this.form.warnaGenitourinasis = this.neonatuskeperawatan?.warnaGenitourinasis ?? null
      this.form.warnaGenitourinasisLain = this.neonatuskeperawatan?.warnaGenitourinasisLain ?? null
      this.form.bak = this.neonatuskeperawatan?.bak ?? null
      this.form.bakPertama = this.neonatuskeperawatan?.bakPertama ?? null
      this.form.warnaBak = this.neonatuskeperawatan?.warnaBak ?? null
      this.form.warnaBakLain = this.neonatuskeperawatan?.warnaBakLain ?? null
      // sistem reproduksi
      this.form.lakilaki = this.neonatuskeperawatan?.lakilaki ?? []
      this.form.lakilakiLain = this.neonatuskeperawatan?.lakilakiLain ?? null
      this.form.perempuan = this.neonatuskeperawatan?.perempuan ?? []
      this.form.perempuanLain = this.neonatuskeperawatan?.perempuanLain ?? null
      // sistem integument
      this.form.vernicKasesosa = this.neonatuskeperawatan?.vernicKasesosa ?? null
      this.form.vernicKasesosaAda = this.neonatuskeperawatan?.vernicKasesosaAda ?? null
      this.form.lanugo = this.neonatuskeperawatan?.lanugo ?? null
      this.form.warnaIntegument = this.neonatuskeperawatan?.warnaIntegument ?? null
      this.form.warnaIntegumentLain = this.neonatuskeperawatan?.warnaIntegumentLain ?? null
      this.form.turgor = this.neonatuskeperawatan?.turgor ?? null
      this.form.kulitIntegument = this.neonatuskeperawatan?.kulitIntegument ?? null
      // sistem muskuloskeletal
      this.form.lengan = this.neonatuskeperawatan?.lengan ?? null
      this.form.lenganLain = this.neonatuskeperawatan?.lenganLain ?? null
      this.form.tungkal = this.neonatuskeperawatan?.tungkal ?? null
      this.form.tungkalLain = this.neonatuskeperawatan?.tungkalLain ?? null
      this.form.rekoil = this.neonatuskeperawatan?.rekoil ?? null
      this.form.rekoilLain = this.neonatuskeperawatan?.rekoilLain ?? null
      this.form.telapakKaki = this.neonatuskeperawatan?.telapakKaki ?? null

      // ekonomi, spiritual, kultural
      this.form.komunikasi = this.neonatuskeperawatan?.komunikasi ?? null
      this.form.komunikasiLain = this.neonatuskeperawatan?.komunikasiLain ?? null
      this.form.makananPokok = this.neonatuskeperawatan?.makananPokok ?? []
      this.form.makananPokokLain = this.neonatuskeperawatan?.makananPokokLain ?? null
      this.form.pantanganMakan = this.neonatuskeperawatan?.pantanganMakan ?? null
      this.form.pantanganMakanYa = this.neonatuskeperawatan?.pantanganMakanYa ?? null

      // skor nyeri
      this.form.ekspresiWajah = this.neonatuskeperawatan?.ekspresiWajah ?? 0
      this.form.menangis = this.neonatuskeperawatan?.menangis ?? 0
      this.form.polaNafas = this.neonatuskeperawatan?.polaNafas ?? 0
      this.form.skorLengan = this.neonatuskeperawatan?.skorLengan ?? 0
      this.form.skorKaki = this.neonatuskeperawatan?.skorKaki ?? 0
      this.form.keadaanRangsangan = this.neonatuskeperawatan?.keadaanRangsangan ?? 0
      this.form.skorNyeri = this.neonatuskeperawatan?.skorNyeri ?? 0

      this.setSkorNyeri()
    },

    setSkorNyeri () {
      const jml = parseInt(this.form.ekspresiWajah) + parseInt(this.form.menangis) + parseInt(this.form.polaNafas) +
      parseInt(this.form.skorLengan) + parseInt(this.form.skorKaki) + parseInt(this.form.keadaanRangsangan)
      this.form.skorNyeri = jml

      if (jml === 0) {
        this.kesimpulanNyeri = 'Tidak Nyeri'
      }
      else if (jml === 1) {
        this.kesimpulanNyeri = 'Tidak Nyaman'
      }
      else if (jml >= 2 && jml <= 4) {
        this.kesimpulanNyeri = 'Nyeri Ringan - sedang'
      }
      else if (jml >= 5 && jml <= 7) {
        this.kesimpulanNyeri = 'Nyeri sedang - berat'
      }
    },

    getData (pasien) {
      const params = { params: { norm: pasien?.norm } }

      return new Promise((resolve, reject) => {
        api.get('v1/simrs/pelayanan/neonatuskeperawatan/neonatuskeperawatan-by-norm', params)
          .then((resp) => {
            console.log('neonatuskeperawatan :', resp.data)
            if (resp.status === 200) {
              this.neonatuskeperawatan = resp.data ?? null
              this.initForm(pasien)
            }
            resolve(resp)
          })
          .catch((err) => {
            console.log(err)
            reject(err)
          })
      })
    },

    saveData (pasien) {
      this.loadingSave = true
      this.form.noreg = pasien?.noreg
      this.form.norm = pasien?.norm

      // console.log(this.form)
      return new Promise((resolve, reject) => {
        api.post('v1/simrs/pelayanan/neonatuskeperawatan/store', this.form)
          .then((resp) => {
            // console.log(resp)
            if (resp.status === 200) {
              this.neonatuskeperawatan = null
              // const storePasien = usePengunjungPoliStore()
              // const isi = resp.data
              // storePasien.injectDataPasien(pasien, isi, 'neonatuskeperawatan')
              this.neonatuskeperawatan = resp.data ?? null
              notifSuccess(resp)
              this.initForm(pasien)
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

    deleteData (pasien, id) {
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

    previewData (item) {
      this.preview = true
      this.form = item
    }

  }
})
