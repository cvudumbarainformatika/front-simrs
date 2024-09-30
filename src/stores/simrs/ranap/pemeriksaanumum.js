import { defineStore } from 'pinia'
// eslint-disable-next-line no-unused-vars
import { api } from 'src/boot/axios'
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { usePengunjungRanapStore } from './pengunjung'
import { notifSuccess } from 'src/modules/utils'

export const usePemeriksaanUmumRanapStore = defineStore('pemeriksaan-umum-ranap-store', {
  state: () => ({

    items: {
      ranap: [],
      igd: []
    },
    loadingSave: false,
    form: {
      // ini untuk 4.1

      // pemeriksaan umum
      keadaanUmum: null,
      bb: 0,
      tb: 0,
      nadi: 0,
      suhu: 0,
      sistole: 0,
      diastole: 0,
      pernapasan: 0,
      spo: 0,
      tkKesadaran: 0,
      tkKesadaranKet: 'Sadar Baik/Alert',

      sosial: null,
      spiritual: null,
      statusPsikologis: 'Tidak ada kelainan',
      ansuransi: 'Ada',
      // edukasi: [
      //   { label: 'Apakah pasien / keluarga tahu mengenai penyakit dan perawatannya?', value: null },
      //   { label: 'Apakah membutuhkan edukasi?', value: null }
      // ],
      edukasi: {},
      ketEdukasi: '',

      // kultural
      penyebabSakit: null,
      komunikasi: 'Normal',
      makananPokok: 'Nasi',
      makananPokokLain: null,
      pantanganMkanan: 'Tidak'

      // pemeriksaan fisik
    },

    formKebidanan: {
      nyeri: 'Normal',
      lochea: 'Normal',
      proteinUrin: null,
      // anatomi
      mata: null,
      leher: null,
      dada: null,
      putingMenonjol: null,
      hiperpigmentasi: null,
      kolostrum: null,
      konsistensiPayudara: null,
      nyeriTekan: null,
      benjolan: null,
      abdomen: null,
      anoGenital: null,
      ekstremitasTungkai: null,

      hmlInspeksi: null,
      hmlTfuPuka: null,
      hmlTfuPuki: null,
      hmlTfuPresentasi: null,
      hmlNyeri: null,
      hmlOsborn: null,
      hmlCekung: null,
      hmlAusDenyut: null,
      hmlAusTeratur: null,
      hmlHisFrekuensi: null,
      hmlHisIntensitas: null,
      hmlVgnBentuk: null,
      hmlVgnJml: null,
      hmlVgnKtuban: null,
      hmlVgnToucher: null,

      nfsTfu: null,
      nfsUterus: null,
      nfsVgnBentuk: null,
      nfsVgnJml: null,
      nfsVgnLochea: null,
      nfsVgnLuka: null,
      nfsVgnDrjLuka: null,
      nfsVgnLukaPost: null,

      gynecologiPalpasi: null,
      gynecologiInsVgn: null,
      gynecologiInsPortio: null,
      gynecologiInsVgnToucher: null

    },

    formNeonatal: {
      lila: 0,
      lida: 0,
      lirut: 0,

      grkBayi: null,
      uub: null,
      kejang: null,
      refleks: null,
      tngsBayi: null,

      pssMata: null,
      bsrPupil: null,
      klpkMata: 'TAK',
      konjungtiva: null,
      sklera: 'TAK',

      pendengaran: 'TAK',

      penciuman: 'TAK',
      warnaKlt: null,
      denyutNadi: null,
      sirkulasi: null,
      pulsasi: null,

      polaNafas: null,
      jnsPernafasan: null,
      irmNapas: null,
      retraksi: null,
      airEntri: null,
      merintih: null,
      suaraNapas: null,

      mulut: null,
      lidah: null,
      oesofagus: null,
      abdomen: null,
      bab: null,
      warnaBab: null,

      warnaUrine: null,
      bak: null,

      laki: null,
      perempuan: null,

      vernicKasesosa: null,
      lanugo: null,
      warnaIntegument: null,
      turgor: null,
      kulit: null,

      lengan: null,
      tungkai: null,
      rekoilTelinga: null,
      grsTlpkKaki: null,

      apgarScores: {},
      apgarScore: 0,
      apgarKet: null

    },

    formPediatrik: {
      lila: 0,
      lida: 0,
      lirut: 0,
      lilengtas: 0,

      glasgow: {},
      glasgowSkor: 0,
      glasgowKet: null
    },

    frmEdukasis: [
      {
        kode: 'tahuPenanganan',
        label: 'Apakah pasien / keluarga tahu mengenai penyakit dan perawatannya?',
        values: [
          { value: 'Ya' },
          { value: 'Tidak' }
        ]
      },
      {
        kode: 'butuhEdukasi',
        label: 'Apakah membutuhkan edukasi?',
        values: [
          { value: 'Ya' },
          { value: 'Tidak' }
        ]
      }
    ],

    frmApgarScores: [
      {
        kode: 'appearances',
        label: 'Appearance (Warna Kulit)',
        values: [
          { value: 0, label: 'Seluruh tubuh bayi berwarna biru atau pucat.' },
          { value: 1, label: 'Tubuh bayi berwarna merah muda, tetapi tangan dan kaki berwarna biru (sianosis akrosianosis).' },
          { value: 2, label: 'Seluruh tubuh bayi berwarna merah muda (normal).' }
        ]
      },
      {
        kode: 'pulses',
        label: 'P – Pulse (Denyut Jantung)',
        values: [
          { value: 0, label: 'Tidak ada denyut jantung.' },
          { value: 1, label: 'Denyut jantung kurang dari 100 bpm.' },
          { value: 2, label: 'Denyut jantung 100 bpm atau lebih.' }
        ]
      },
      {
        kode: 'grimaces',
        label: 'Grimace (Respons terhadap rangsangan atau refleks)',
        values: [
          { value: 0, label: 'Tidak ada respons terhadap rangsangan.' },
          { value: 1, label: 'Respons minimal (misalnya, meringis atau gerakan kecil) terhadap rangsangan.' },
          { value: 2, label: 'Menangis, batuk, atau menarik diri dari rangsangan (respons aktif).' }
        ]
      },
      {
        kode: 'activitys',
        label: 'Activity (Tonus Otot)',
        values: [
          { value: 0, label: 'Bayi lesu atau tidak bergerak.' },
          { value: 1, label: 'Gerakan lengan dan kaki sedikit, tonus otot rendah.' },
          { value: 2, label: 'Gerakan aktif, tonus otot baik.' }
        ]
      },
      {
        kode: 'respirations',
        label: 'Respiration (Pernapasan)',
        values: [
          { value: 0, label: 'Tidak ada pernapasan (apnea).' },
          { value: 1, label: 'Pernapasan lambat atau tidak teratur, menangis lemah.' },
          { value: 2, label: 'Pernapasan baik, bayi menangis keras.' }
        ]
      }
    ],

    frmGlasgows: [
      {
        kode: 'eye',
        label: 'Eye',
        values: [
          { value: 4, label: 'Membuka mata secara spontan.' },
          { value: 3, label: 'Membuka mata sebagai respon terhadap perintah suara.' },
          { value: 2, label: 'Membuka mata sebagai respon terhadap rangsangan nyeri.' },
          { value: 1, label: 'Tidak ada respon.' }
        ]
      },
      {
        kode: 'motorik',
        label: 'Motorik',
        values: [
          { value: 6, label: 'Mengikuti perintah.' },
          { value: 5, label: 'Menarik diri dari nyeri (lokalisasi nyeri).' },
          { value: 4, label: 'Menarik anggota tubuh dari rangsangan nyeri (withdrawal).' },
          { value: 3, label: 'Respon fleksi abnormal (dekortikasi).' },
          { value: 2, label: 'Respon ekstensi abnormal (deserebrasi).' },
          { value: 2, label: 'Tidak ada respon motorik.' }
        ]
      },
      {
        kode: 'verbal',
        label: 'Verbal',
        values: [
          { value: 5, label: 'Berorientasi, berbicara dengan jelas.' },
          { value: 4, label: 'Bingung, tetapi masih bisa berbicara.' },
          { value: 3, label: 'Mengucapkan kata-kata yang tidak sesuai (disorientasi parah).' },
          { value: 2, label: 'Mengeluarkan suara yang tidak dimengerti (misalnya, geraman).' },
          { value: 2, label: 'Tidak ada respon verbal.' }
        ]
      }
    ],

    keadaanUmums: ['Baik', 'Sedang', 'Lemah'],
    optionsTingkatkesadaran: [
      { value: 0, label: 'Sadar Baik/Alert' }, // 248234008
      { value: 1, label: 'Berespon denga kata-kata / Voice' }, // 300202002
      { value: 2, label: 'Hanya berespons jika dirangsang nyeri / Pain' }, // 450847001
      { value: 3, label: 'Pasien tidak sadar / Unresponsive' }, // 422768004
      { value: 4, label: 'Gelisah atau bingung' }, // 130987000
      { value: 5, label: 'Acute Confusional States' } // 2776000
    ],
    statusPsikologis: [
      { value: 'Tidak ada kelainan', label: 'Tidak ada kelainan' },
      { value: 'Cemas', label: 'Cemas' },
      { value: 'Takut', label: 'Takut' },
      { value: 'Marah', label: 'Marah' },
      { value: 'Sedih', label: 'Sedih' },
      { value: 'Lain-lain', label: 'Lain-lain' }
    ],
    penyebabs: ['Hukuman', 'Ujian', 'Takdir', 'Buatan Orang Lain', 'Keturunan'],
    komunikasi: ['Normal', 'Introvert', 'Extrovert'],
    makanans: ['Nasi', 'Selain Nasi'],
    yaTidaks: ['Ya', 'Tidak'],
    adaTidaks: ['Ada', 'Tidak Ada'],
    normals: ['Normal', 'Abnormal'],
    proteinUrins: ['INA', '+', '>++'],
    matas: ['Pandangan Kabur', 'Icteric', 'Konjungtiva Anemis'], // lain-lain
    lehers: ['Bendungan vena jugularis', 'Struma'],
    dadas: ['Teratur', 'Tidak Teratur'],
    konsistensis: ['Lembek', 'Padat', 'Keras'],
    abdomens: ['Membesar', 'Kembung', 'Nyeri Tekan', 'Bekas Operasi'],
    anogenitals: ['Hemoroid', 'Varises'],
    ekstremitas: ['Simetris', 'Tidak Simetris'],
    inspeksis: ['Membesar dengan arah memanjang', 'Melebar', 'Pelebaran Vena', 'Linea Alba', 'Line Nigra', 'Striae Lidivae', 'Striae Albican', 'Luka Bekas Operasi'],
    presentasis: ['Kepala', 'Bokong'],
    intensitas: ['Lemah', 'Sedang', 'Kuat'],
    bentuks: ['lendir Darah', 'Darah'],
    jumlahs: ['<250 cc', '250-500 cc', '>500 cc'],
    kontraksis: ['Lemah', 'Keras', 'Tidak Ada'],
    locheas: ['Rubra', 'Sanguinolenta', 'Serosa', 'Alba'],
    lukas: ['Utuh', 'Ruptur', 'Episiotomi'],
    derajats: ['1', '2', '3', '4', 'Lain-lain'],
    // appearances: [{ value: 0, label: 'Seluruh tubuh bayi berwarna biru atau pucat.' },
    //   { value: 1, label: 'Tubuh bayi berwarna merah muda, tetapi tangan dan kaki berwarna biru (sianosis akrosianosis).' },
    //   { value: 2, label: 'Seluruh tubuh bayi berwarna merah muda (normal).' }],
    // pulses: [{ value: 0, label: 'Tidak ada denyut jantung.' },
    //   { value: 1, label: 'Denyut jantung kurang dari 100 bpm.' },
    //   { value: 2, label: 'Denyut jantung 100 bpm atau lebih.' }],
    // grimaces: [{ value: 0, label: 'Tidak ada respons terhadap rangsangan.' },
    //   { value: 1, label: 'Respons minimal (misalnya, meringis atau gerakan kecil) terhadap rangsangan.' },
    //   { value: 2, label: 'Menangis, batuk, atau menarik diri dari rangsangan (respons aktif).' }],
    // activitys: [{ value: 0, label: 'Bayi lesu atau tidak bergerak.' },
    //   { value: 1, label: 'Gerakan lengan dan kaki sedikit, tonus otot rendah.' },
    //   { value: 2, label: 'Gerakan aktif, tonus otot baik.' }],
    // respirations: [{ value: 0, label: 'Tidak ada pernapasan (apnea).' },
    //   { value: 1, label: 'Pernapasan lambat atau tidak teratur, menangis lemah.' },
    //   { value: 2, label: 'Pernapasan baik, bayi menangis keras.' }],

    // neonatal anatomy
    aktifs: ['Aktif', 'Tidak Aktif'],
    uubs: ['Datar', 'Cekung', 'Tegang', 'Membonjol'],
    refleks: ['Moro', 'Menelan', 'Hisap', 'Babinski', 'Rooting'],
    tngsBayis: ['Kuat', 'Melengking'],
    posisiMatas: ['Simetris', 'Asimetris'],
    pupils: ['Isokor', 'Anisokor'],
    klpkMatas: ['TAK', 'Edema', 'Cekung'],
    konjungtivas: ['TAK', 'Anemis', 'Konjungtivitis'],
    skleras: ['TAK', 'Ikterik', 'Pendarahan'],
    pendengarans: ['TAK', 'Asimetris', 'Serumen', 'Keluar Cairan', 'Tidak Ada Lubang Drum'],
    penciumans: ['TAK', 'Asimetris', 'Pengeluaran Cairan'],
    warnaKulits: ['Kemerahan', ' Sianosis....', 'Pucat'],
    denyutNadis: ['Teratur', 'Tidak Teratur'],
    sirkulasis: ['Akral Hangat', 'Akral Dingin'],
    pulsasis: ['Palpitasi', 'Ederma Lokasi ...', 'Kuat', 'Lemah', 'Mur-mur'],
    polaNafas: ['Normal', 'Bradipnea', 'Tachipnea'],
    jnsPernafasans: ['Pernapasan Dada', 'Pernapasan Perut', 'Alat bantu napas, ...'],
    iramaNapas: ['Teratur', 'Tidak Teratur'],
    retraksis: ['Tidak Ada', 'Ringan', 'Sedang', 'Berat'],
    airEntris: ['Udara Masuk', 'Penurunan Udara Masuk', 'Tidak Ada Udara Masuk'],
    merintihs: ['Tidak Ada', 'Terdengar dengan Stetoskop', 'Terdengar Tanpa Stetoskop'],
    suaraNapas: ['Veskuler', 'Wheezing', 'Ronchi', 'Stridor'],
    muluts: ['Tidak Ada Kelainan', 'Simetris', 'Asimetris', 'Mucosa Mulut Kering', 'Bibir Pucat'],
    lidahs: ['Tidak Ada Kelainan', 'Kotor', 'Gerakan Asimetris'],
    oesofagus: ['Tidak Ada Kelainan'],
    abdomensAnatomy: ['Supel', 'Asites', 'Tegang', 'Bising Usus ... x/menit'],
    babs: ['Normal', 'Konstipasi', 'Melena', 'Colostomy', 'Diare', 'Frekuensi:..../hari', 'Meco pertama, tgl/jam......'],
    warnaFeses: ['Kuning', 'Dempul', 'Coklat', 'Hijau'],
    warnaUrines: ['Jernih', 'Kuning', 'Kuning Pekat'],
    baks: ['Normal', 'Hematuri', 'Urin Menetes', 'Sakit', 'Tidak Sakit', 'Oliguri', 'BAK Pertama, tgl/jam......'],
    lakilakis: ['Normal', 'Hipospedia', 'Epispedia', 'Fimosis', 'Hidrokel'],
    perempuans: ['Normal', 'Keputihan', 'Vagina Skintag'],

    lanugos: ['Tidak ada', 'Banyak', 'Tipis', 'Bercak-Bercak Tanpa Lanugo', 'Sebagian Besar Tanpa Lanugo'],
    warnas: ['Pucat', 'Ikterik', 'Sianosis', 'Normal'],
    turgors: ['Baik', 'Sedang', 'Buruk'],
    kulits: ['Normal', 'Rash/Kemerahan', 'Lesi', 'Luka', 'Memar', 'Plechi', 'Bula'],
    lengans: ['Fleksi', 'Ekstensi', 'Pergerakan Aktif', 'Pergerakan Tidak Aktif'],
    tungkals: ['Fleksi', 'Ekstensi', 'Pergerakan Aktif', 'Pergerakan Tidak Aktif'],
    rekoilTelingas: ['Rekoil Lambat', 'Rekoil Cepat', 'Rekoil Segera'],
    grsTelapakKakis: ['Tipis', 'Garis Transversal Anterior', 'Garis 2/3 Anterior', 'Seluruh Telapak Kaki']

  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {

    initReset (data) {
      this.form = {
        // ini untuk 4.1

        // pemeriksaan umum
        id: null,
        keadaanUmum: null,
        bb: 0,
        tb: 0,
        nadi: 0,
        suhu: 0,
        sistole: 0,
        diastole: 0,
        pernapasan: 0,
        spo: 0,
        tkKesadaran: 0,
        tkKesadaranKet: 'Sadar Baik/Alert',

        sosial: null,
        spiritual: null,
        statusPsikologis: 'Tidak ada kelainan',
        ansuransi: 'Ada',
        edukasi: {},
        ketEdukasi: null,

        // kultural
        penyebabSakit: null,
        komunikasi: 'Normal',
        makananPokok: 'Nasi',
        makananPokokLain: null,
        pantanganMkanan: 'Tidak'

        // pemeriksaan fisik
      }

      if (data) this.setForm('form', data, ['edukasi'], null)
      if (data?.edukasi) this.setAnotherForm(this.frmEdukasis, data, 'edukasi', 'form')

      this.formKebidanan = {
        nyeri: 'Normal',
        lochea: 'Normal',
        proteinUrin: null,
        // anatomi
        mata: null,
        leher: null,
        dada: null,
        putingMenonjol: null,
        hiperpigmentasi: null,
        kolostrum: null,
        konsistensiPayudara: null,
        nyeriTekan: null,
        benjolan: null,
        abdomen: null,
        anoGenital: null,
        ekstremitasTungkai: null,

        hmlInspeksi: null,
        hmlTfuPuka: null,
        hmlTfuPuki: null,
        hmlTfuPresentasi: null,
        hmlNyeri: null,
        hmlOsborn: null,
        hmlCekung: null,
        hmlAusDenyut: null,
        hmlAusTeratur: null,
        hmlHisFrekuensi: null,
        hmlHisIntensitas: null,
        hmlVgnBentuk: null,
        hmlVgnJml: null,
        hmlVgnKtuban: null,
        hmlVgnToucher: null,

        nfsTfu: null,
        nfsUterus: null,
        nfsVgnBentuk: null,
        nfsVgnJml: null,
        nfsVgnLochea: null,
        nfsVgnLuka: null,
        nfsVgnDrjLuka: null,
        nfsVgnLukaPost: null,

        gynecologiPalpasi: null,
        gynecologiInsVgn: null,
        gynecologiInsPortio: null,
        gynecologiInsVgnToucher: null

      }
      if (data?.kebidanan) this.setForm('formKebidanan', data, [], 'kebidanan')

      // console.log('formKebidanan: ', this.formKebidanan)

      this.formNeonatal = {
        lila: 0,
        lida: 0,
        lirut: 0,

        grkBayi: null,
        uub: null,
        kejang: null,
        refleks: null,
        tngsBayi: null,

        pssMata: null,
        bsrPupil: null,
        klpkMata: 'TAK',
        konjungtiva: null,
        sklera: 'TAK',

        pendengaran: 'TAK',

        penciuman: 'TAK',
        warnaKlt: null,
        denyutNadi: null,
        sirkulasi: null,
        pulsasi: null,

        polaNafas: null,
        jnsPernafasan: null,
        irmNapas: null,
        retraksi: null,
        airEntri: null,
        merintih: null,
        suaraNapas: null,

        mulut: null,
        lidah: null,
        oesofagus: null,
        abdomen: null,
        bab: null,
        warnaBab: null,

        warnaUrine: null,
        bak: null,

        laki: null,
        perempuan: null,

        vernicKasesosa: null,
        lanugo: null,
        warnaIntegument: null,
        turgor: null,
        kulit: null,

        lengan: null,
        tungkai: null,
        rekoilTelinga: null,
        grsTlpkKaki: null,

        apgarScores: {},
        apgarScore: 0,
        apgarKet: null
      }

      if (data?.neonatal) this.setForm('formNeonatal', data, ['apgarScores'], 'neonatal')
      const apggar = {}
      for (let i = 0; i < this.frmApgarScores.length; i++) {
        const el = this.frmApgarScores[i]
        apggar[el.kode] = el?.values?.find(x => x?.value === data?.neonatal?.apgarScores?.[el?.kode]?.value) ?? el?.values?.find(x => x?.value === 2) ?? null
      }

      this.formNeonatal.apgarScores = apggar

      console.log('formNeonatal: ', this.formNeonatal)

      this.formPediatrik = {
        lila: 0,
        lida: 0,
        lirut: 0,
        lilengtas: 0,

        glasgow: {},
        glasgowSkor: 0,
        glasgowKet: null
      }

      if (data?.pediatrik) this.setForm('formPediatrik', data, ['glasgow'], 'pediatrik')
      const glass = {}
      for (let i = 0; i < this.frmGlasgows.length; i++) {
        const el = this.frmGlasgows[i]
        glass[el.kode] = el?.values?.find(x => x?.value === data?.pediatrik?.glasgow?.[el?.kode]?.value) ?? null
      }
      this.formPediatrik.glasgow = glass

      this.hitungSkorApgar()
      this.hitungSkorGlasgow()
    },

    setForm (frm, data, $except = [], responseName) {
      // set form
      // console.groupCollapsed('[setForm]')
      // console.log(`frm: ${frm}`)
      // console.log('data: ', data)
      // console.log('$except: ', $except)
      const datax = responseName ? data[responseName] : data

      if (data?.id) {
        const keys = Object.keys(this[frm])
        // console.log('keys:', keys)
        for (const key of keys) {
          if (!$except.includes(key)) {
            // console.log(`set form ${frm}.${key} = ${data[key]}`)
            this[frm][key] = datax[key] ?? null
          }
        }
      }
      // console.groupEnd()
    },

    setAnotherForm (arr, data, key, frm) {
      let isData = null
      if (key === 'edukasi') isData = JSON.parse(data[key]) ?? null
      else isData = data[key]
      console.log('isData: ', isData)

      if (isData) {
        console.groupCollapsed('[setAnotherForm]')
        console.log(`arr: ${arr}`)
        console.log('data: ', isData)

        const frmX = {}
        for (let i = 0; i < arr.length; i++) {
          const el = arr[i]
          frmX[el.kode] = el?.values?.find(x => x?.value === isData[el?.kode]?.value) ?? el?.values?.find(x => x?.value === 'Tidak') ?? null
        }
        this[frm][key] = frmX

        console.log('frmX: ', this.form)
        console.groupEnd()
      }
    },
    hitungSkorApgar () {
      let skor = 0
      let ket = null
      // skor = parseInt(this.formNeonatal?.appearance?.value ?? 0) + parseInt(this.formNeonatal?.pulse?.value ?? 0) + parseInt(this.formNeonatal?.grimace?.value ?? 0) + parseInt(this.formNeonatal?.activity?.value ?? 0) + parseInt(this.formNeonatal?.respiration?.value ?? 0)
      for (let i = 0; i < this.frmApgarScores.length; i++) {
        const el = this.frmApgarScores[i]
        skor += parseInt(this.formNeonatal?.apgarScores[el?.kode]?.value ?? 0)
      }
      if (skor >= 0 && skor <= 3) ket = 'Kondisi bayi kritis dan membutuhkan tindakan medis segera seperti resusitasi atau tindakan darurat lainnya.'
      else if (skor >= 4 && skor <= 6) ket = 'Bayi membutuhkan pemantauan dan mungkin memerlukan intervensi, seperti bantuan pernapasan atau oksigen.'
      else if (skor >= 7) ket = 'Kondisi bayi umumnya baik. Bayi dalam keadaan sehat dan mungkin hanya memerlukan observasi rutin.'
      this.formNeonatal.apgarScore = skor
      this.formNeonatal.apgarKet = ket
    },
    hitungSkorGlasgow () {
      let skor = 0
      let ket = null
      // skor = parseInt(this.formNeonatal?.appearance?.value ?? 0) + parseInt(this.formNeonatal?.pulse?.value ?? 0) + parseInt(this.formNeonatal?.grimace?.value ?? 0) + parseInt(this.formNeonatal?.activity?.value ?? 0) + parseInt(this.formNeonatal?.respiration?.value ?? 0)
      for (let i = 0; i < this.frmGlasgows.length; i++) {
        const el = this.frmGlasgows[i]
        skor += parseInt(this.formPediatrik?.glasgow[el?.kode]?.value ?? 0)
      }
      if (skor >= 13 && skor <= 15) ket = 'Cedera kepala ringan.'
      else if (skor >= 12 && skor <= 9) ket = 'Cedera kepala sedang.'
      else if (skor <= 8 && skor >= 3) ket = 'Cedera kepala berat (biasanya dianggap sebagai koma).'
      this.formPediatrik.glasgowSkor = skor
      this.formPediatrik.glasgowKet = ket
    },

    async saveForm (jnsKasus, pasien) {
      // console.log('jnsKasus', jnsKasus, pasien)

      this.loadingSave = true
      const kasusKep = jnsKasus?.gruping
      let formDefault = this.form
      if (kasusKep === '4.1') {
        formDefault = this.form
      }
      if (kasusKep === '4.2' || kasusKep === '4.3' || kasusKep === '4.4') {
        formDefault.skreeninggizi = null
        formDefault.keluhannyeri = null
      }
      const req = {
        id: this.form.id,
        noreg: pasien?.noreg ?? null,
        norm: pasien?.norm,
        kdruang: pasien?.kdruangan,
        form: formDefault,
        formKebidanan: kasusKep === '4.2' ? this.formKebidanan : null, // ini this.formKebidanan,
        formNeonatal: kasusKep === '4.3' ? this.formNeonatal : null,
        formPediatrik: kasusKep === '4.4' ? this.formPediatrik : null // ini this.formPediatrik
      }

      // const timeStamp = Date.now()
      const auth = useAplikasiStore()
      const pushSementara = {
        id: this.form?.id ?? null,
        noreg: pasien?.noreg,
        norm: pasien?.norm,
        kdruang: pasien?.kdruangan ?? null,
        ruangan: pasien?.ruangan ?? null,
        nakes: auth?.user?.pegawai?.kdgroupnakes,
        petugas: { nama: auth?.user?.nama }

      }

      // console.log('push frm sementara', pushSementara)

      const pengunjung = usePengunjungRanapStore()
      pengunjung.injectDataPasien(pasien?.noreg, pushSementara, 'pemeriksaan')

      console.log('form, jenis kasus', req, jnsKasus)

      try {
        const resp = await api.post('v1/simrs/ranap/layanan/pemeriksaan/simpan', req)
        console.log('simpan pemeriksaan', resp)
        if (resp.status === 200) {
          notifSuccess(resp)
          const result = resp?.data?.result
          if (result.length) this.PISAH_DATA_RANAP_IGD(result, pasien)
        }
        this.loadingSave = false
      }
      catch (error) {
        console.log('error', error)
        this.SPLICE_ITEMS_RANAP(this.items.ranap)
        this.loadingSave = false
      }
    },

    PISAH_DATA_RANAP_IGD (arr, pasien) {
      const auth = useAplikasiStore()
      const jns = auth?.user?.pegawai?.kdgroupnakes

      const igd = arr?.filter(x => x?.kdruang === 'POL014') ?? []
      const ranap = arr?.filter(x => x?.kdruang !== 'POL014' && x?.nakes === jns) ?? []

      this.items.igd = igd
      this.items.ranap = ranap

      console.log('items', this.items)

      const pengunjung = usePengunjungRanapStore()

      const form = ranap.length ? ranap[0] : null
      if (form) {
        pengunjung.injectDataPasien(pasien?.noreg, form, 'pemeriksaan')
        pengunjung.deleteInjectanNull(pasien?.noreg, 'pemeriksaan')
      }
      this.initReset(form)
    },

    SPLICE_ITEMS_RANAP (arr) {
      const idx = arr?.findIndex(x => x.id === null)
      this.items.ranap = arr.splice(1, idx)
    }

  }
})
