import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifSuccess } from 'src/modules/utils'

export const useAnamnesisRanapStore = defineStore('anamnesis-ranap-store', {
  state: () => ({
    form: {
      // ini untuk 4.1
      keluhanUtama: null,
      diagnosaMasuk: null,
      rwPenySkr: null,
      rwPenyDhl: null,
      rwPengobatan: null,
      rwPenyKlrg: null,
      rwPkrjDgZatBahaya: null,
      rwAlergi: [],
      ketRwAlergi: null,

      // kajianNyeri: 'Wong Baker Face Scale',
      // skorNyeri: 0,
      // keluhanNyeri: null,
      // ekspresiWajah: 0,
      // ekspresiWajahKet: null,
      // gerakanTangan: 0,
      // gerakanTanganKet: null,
      // kebutuhanVentilasi: 0,
      // kebutuhanVentilasiKet: null,

      keluhannyeri: {
        kajianNyeri: 'Wong Baker Face Scale',
        skorNyeri: 0,
        ket: null,
        form: null

      },

      sgd: { // skreening gizi dewasa
        bb: 0, // penurunan bb
        am: 0, // asupan makan
        kk: 0 // kondisi khusus
      },
      sgdSkor: 0,
      sgdKet: null

    },

    formKebidanan: {
      // ini untuk 4.2
      rwObsetri: null,
      rwRawat: null,
      rwOperasi: null,
      rwGynecology: [],
      rwKbJns: null,
      rwKbLama: null,
      rwKbKeluhan: null,

      // riwayat menstruasi
      menarche: null,
      siklusHari: null,
      siklus: null,
      lamaMens: 0,
      kondisiMens: [],
      hpht: 0,
      tglPerkPersalinan: null,
      // rw perkawinan
      rwKawinStatus: null,
      kawinKe: 1,
      nikahUmur: 0,
      // rw kehamilan, nifas
      g: null,
      p: null,
      ab: null,
      ah: null,
      anc: null,
      imunisasi: null,
      // list riwayat kehamilan
      riwayatKehamilans: [],
      // pola eliminisasi
      bab: 0,
      konsistensi: null,
      warna: null,
      keluhans: [],
      peristatikUsus: 0,
      flatus: null,
      bak: 0,
      keluhanBak: [],
      jmlBak: 0,
      warnaUrine: null,
      kateter: 'Tidak',
      kttHrKe: null,
      // skreening gizi pasien hamil/nifas / kebidanan
      sgk: {
        am: 0,
        bb: 0,
        hb: 0,
        metabolisme: 0,
        metabolismeKet: null
      },
      sgkSkor: 0,
      sgkKet: null
    },

    formNeoNatal: {
      // ini untuk 4.3
      rwOpname: null,
      g: null,
      p: null,
      a: null,
      usiaGestasi: null,
      sgIbu: null,

      rwObat: null,
      kebiasaanIbu: null,
      kebiasaanLain: null,
      rwPersalinan: null,
      ketuban: null,
      volume: null,

      rwTransDarah: null,
      reaksiTrans: null,
      rwImunisasi: null,

      crLahir: null,
      apgarScore: 0,
      volumeKetuban: 'Tidak Ada',
      warnaKetuban: null,
      pecahDini: null,

      golDarahIbu: null,
      golDarahAyah: null,
      golDarahBayi: null,

      skorNyeri: 0,
      keluhanNyeri: null,
      ekspresiWajah: 0,
      menangis: 0,
      polaNafas: 0,
      lengan: 0,
      kaki: 0,
      keadaanRangsangan: 0,

      sgn: {
        nm: 0, // nafsu makan
        km: 0, // kemampuan makan
        fs: 0, // faktor stress
        bb: 0 // persentil BB
      },
      sgnSkor: 0,
      sgnKet: null

    },

    formPediatrik: {
      // riwayat penyakit kelahiran
      anakKe: 1,
      jmlSaudara: 1,
      crKelahiran: null,
      umurKelahiran: 'Cukup Bulan',
      klainanBawaan: null,
      // riwayat Imunisasi
      rwImunisasi: [],
      // riwayat Tumbuh kembang
      gigiPertama: null,
      berjalan: null,
      membaca: null,
      duduk: null,
      bicara: null,

      sukaMknan: null,
      tdkSukaMknan: null,
      nafsuMkn: 'Baik',
      polaMakan: null,
      mknYgdiberikan: null,

      // polaTidur
      tidurSiang: null,
      tidurMalam: null,
      kebiasaanSblmMkn: null,
      nyeri: 'Tidak',

      mandiSendiri: 1,
      dimandikan: 1,
      gosokGigi: 1,
      keramas: 1,

      kbersihanKuku: 'Bersih',
      aktifitas: null,

      babFrekuensi: null,
      babKonsistensi: null,
      babWarna: null,
      babBau: null,

      bakFrekuensi: null,
      bakWarna: null,
      bakBau: null,
      meconium: 'Tidak Ada'

    },

    loadingSave: false,

    formRiwayatKehamilan: {},
    riwayatKehamilans: [],
    openDialogFormRiwayat: false,

    yaTidaks: ['Ya', 'Tidak'],
    adaTdk: ['Ada', 'Tidak Ada'],
    baikBuruks: ['Baik', 'Buruk'],
    alergis: ['Obat', 'Makanan', 'Udara', 'Lain-lain', 'Tidak Ada Alergi'],
    gynecologys: ['Infertilitas', 'Polip Servix', 'Infeksi Virus', 'Kanker Kandungan', ' PMS', 'Cervicitis Cronis', 'Endometriosis', 'Myoma', 'Perkosaan', 'Lain-lain'],
    kondisiMens: ['Dismenorhea', 'Spotting', 'Menorrhagia', 'Metrorhagia', 'Pre Menstruasi Syndrome'],
    sikluses: ['Teratur', 'Tidak teratur'],
    imunisasis: ['Ya', 'Tidak', 'TT I', 'TT II'],
    konsistensis: ['Cair', 'Keras', 'Lunak'],
    warnas: ['Merah', 'Hitam', 'Normal'],
    keluhans: ['Kembung', 'Sebah', 'Konstipasi', 'Diare'],
    keluhanBaks: ['Inkontensia', 'Retensi Urine', 'Disuria', 'Anuria'],
    warnaUrine: ['Jernih', 'Merah', 'Kekuningan'],
    kebiasaanIbus: ['Merokok', 'Minum Jamu', 'Minuman Beralkohol'],
    riwayatPersalinans: ['SC', 'Spontan Kepala / Bokong', 'VE', 'VORCEP'],
    ketubans: ['Jernih', 'Hiijau Encer / Kental', 'Meconium', 'Darah', 'Putih keruh'],
    volumes: ['Normal', 'Oligohidramnion', 'Polihidramnion', 'Tidak ada'],
    golDarahs: ['A', 'B', 'AB', 'O'],
    caraLahirs: ['Operasi Caesar', 'Spontan Kepala', 'Spontan Bokong'],

    caraKelahirans: ['Spontan'],
    umurKelahirans: ['Cukup Bulan', 'Kurang Bulan'],
    rwImunisasis: ['BCG', 'DPT', 'Polio', 'Campak', 'Hepatitis', 'PCV', 'Varicela', 'Typoid', 'Meningitis', 'Hepatitis', 'Rotavirus', 'HIB', 'MMR', 'Influenza', 'Pneumokokus', 'HPV', 'Tetanus', 'Zooster', 'Yellow Fever'],
    nafsuMakans: ['Baik', 'Mual', 'Muntah'],
    polaMakans: ['2x/hari', '3x/hari', 'lebih dari 3x/hari'],
    makananYgdiberikans: ['ASI', 'PASI', 'Bubur susu', 'Nasi Tim', 'Nasi'],
    kebiasaanSblMakans: ['Perlu mainan', 'DIbacakan cerita', 'Dengan benda-benda kesayangan'],
    aktifitasBermains: ['Sendiri', 'Dengan orang Tua', 'Dengan teman sebaya'],

    pilihanNyeris: [{ text: 'Wong Baker Face Scale', value: 'a' }, { text: 'Behavioral Pain Scale (BPS)', value: 'b' }],
    formNyeris: [
      {
        kode: 'ekspresiWajah',
        label: 'Ekspresi Wajah',
        values: [
          { text: 'Santai, tanpa ketegangan', skor: 1 },
          { text: 'Sedikit tegang, seperti dahi berkerut', skor: 2 },
          { text: 'Sangat tegang, mata tertutup rapat', skor: 3 },
          { text: 'Ekspresi menunjukkan nyeri parah, seperti menangis atau mengerutkan wajah', skor: 4 }
        ]
      },
      {
        kode: 'gerakanTangan',
        label: 'Gerakan Tangan',
        values: [
          { text: 'Tidak ada gerakan', skor: 1 },
          { text: 'Ada gerakan ringan, seperti mengerutkan atau menggerakkan telapak tangan tanpa arah ', skor: 2 },
          { text: 'Ada gerakan kuat, seperti menarik tangan atau berusaha melepas alat medis', skor: 3 },
          { text: 'Gerakan tidak terkendali, seperti upaya melarikan diri', skor: 4 }
        ]
      },
      {
        kode: 'kebutuhanVentilasi',
        label: 'Kepatuhan terhadap ventilasi mekanik',
        values: [
          { text: 'Toleran. tidak ada perlawanan', skor: 1 },
          { text: 'Sedikit tidak toleran, batuk sekali atau melawan sedikit', skor: 2 },
          { text: 'Sering batuk atau melawan ventilasi', skor: 3 },
          { text: 'Tidak toleran sama sekali, melawan ventilasi secara konstan', skor: 4 }
        ]
      }
    ],

    ekspresiWajahNeo: [
      { text: 'Santai', skor: 0 },
      { text: 'Meringis', skor: 1 }
    ],
    menangisNeo: [
      { text: 'Tidak Menangis', skor: 0 },
      { text: 'Merengek/Merintih', skor: 1 },
      { text: 'Menangis', skor: 2 }
    ],
    polaNafasNeo: [
      { text: 'Santai', skor: 0 },
      { text: 'Perubahan Pola Nafas', skor: 1 }
    ],
    lenganNeo: [
      { text: 'Santai', skor: 0 },
      { text: 'Fleksi/Extensi', skor: 1 }
    ],
    kakiNeo: [
      { text: 'Santai', skor: 0 },
      { text: 'Fleksi/Extensi', skor: 1 }
    ],
    keadaanRangsanganNeo: [
      { text: 'Tertidur/Bangun', skor: 0 },
      { text: 'Rewel', skor: 1 }
    ],

    sgn: {
      nm: {
        text: 'Nafsu Makan',
        pilihan: [
          { text: ' Nafsu Makan Baik', skor: 0 },
          { text: ' Intake Berkurang, Sisa Makan Lebih dari Setengah Pors', skor: 2 },
          { text: ' Tidak Ada Nafsu Makan Lebih dari 24 Jam', skor: 3 }
        ]
      },
      km: {
        text: 'Kemampuan Untuk Makan',
        pilihan: [
          { text: 'Tidak ada kesulitan makan, tidak diare atau muntah', skor: 0 },
          { text: 'Ada masalah makan, sering muntah dan diare ringan', skor: 1 },
          { text: 'Butuh bantuan untuk makan, muntah sedang dan atau diare 1-2 kali sehari', skor: 2 },
          { text: 'Tidak dapat makan secara oral, disfagia, muntah berat dan atau diare lebih dari sekali sehari', skor: 3 }
        ]
      },
      fs: {
        text: 'Faktor Stress',
        pilihan: [
          { text: 'Tidak ada', skor: 0 },
          { text: 'Pembedahan ringan atau infeksi', skor: 1 },
          { text: 'Penyakit kronik, bedah mayor, inflamatory bowl disease atau penyakit gastrointestina', skor: 2 },
          { text: 'Patah tulang, luka bakar, sepsis berat, penyakit malignansi', skor: 3 }
        ]
      },
      bb: {
        text: 'Persentil BB',
        pilihan: [
          { text: 'BB/TB sesuai standar', skor: 0 },
          { text: '90-99% BB/TB', skor: 1 },
          { text: '80-89% BB/TB', skor: 2 },
          { text: '<79% BB/TB', skor: 3 }
        ]
      }

    }

  }),
  // getters: {
  //   doubleCount: (state) => state.counter * 2
  // },
  actions: {

    initReset () {
      this.form = {
        // ini untuk 4.1
        keluhanUtama: null,
        diagnosaMasuk: null,
        rwPenySkr: null,
        rwPenyDhl: null,
        rwPengobatan: null,
        rwPenyKlrg: null,
        rwPkrjDgZatBahaya: null,
        rwAlergi: [],
        ketRwAlergi: null,

        // kajianNyeri: 'Wong Baker Face Scale',
        // skorNyeri: 0,
        // keluhanNyeri: null,
        // ekspresiWajah: 0,
        // ekspresiWajahKet: null,
        // gerakanTangan: 0,
        // gerakanTanganKet: null,
        // kebutuhanVentilasi: 0,
        // kebutuhanVentilasiKet: null,

        keluhannyeri: {
          kajianNyeri: 'Wong Baker Face Scale',
          skorNyeri: 0,
          ket: null,
          form: null

        },

        sgd: { // skreening gizi dewasa
          bb: 0, // penurunan bb
          am: 0, // asupan makan
          kk: 0 // kondisi khusus
        },
        sgdSkor: 0,
        sgdKet: null

      }

      const formNyeri = {}
      for (let i = 0; i < this.formNyeris.length; i++) {
        const el = this.formNyeris[i]
        formNyeri[el?.kode] = el?.values?.find(x => x.skor === 1)
      }
      this.form.keluhannyeri.form = formNyeri
      // console.log('el', el)

      this.formKebidanan = {
        // ini untuk 4.2
        rwObsetri: null,
        rwRawat: null,
        rwOperasi: null,
        rwGynecology: [],
        rwKbJns: null,
        rwKbLama: null,
        rwKbKeluhan: null,

        // riwayat menstruasi
        menarche: null,
        siklusHari: null,
        siklus: null,
        lamaMens: 0,
        kondisiMens: [],
        hpht: 0,
        tglPerkPersalinan: null,
        // rw perkawinan
        rwKawinStatus: null,
        kawinKe: 1,
        nikahUmur: 0,
        // rw kehamilan, nifas
        g: null,
        p: null,
        ab: null,
        ah: null,
        anc: null,
        imunisasi: null,
        // list riwayat kehamilan
        riwayatKehamilans: [],
        // pola eliminisasi
        bab: 0,
        konsistensi: null,
        warna: null,
        keluhans: [],
        peristatikUsus: 0,
        flatus: null,
        bak: 0,
        keluhanBak: [],
        jmlBak: 0,
        warnaUrine: null,
        kateter: 'Tidak',
        kttHrKe: null,
        // skreening gizi pasien hamil/nifas / kebidanan
        sgk: {
          am: 0,
          bb: 0,
          hb: 0,
          metabolisme: 0,
          metabolismeKet: null
        },
        sgkSkor: 0,
        sgkKet: null
      }

      this.formNeoNatal = {
        rwOpname: null,
        g: null,
        p: null,
        a: null,
        usiaGestasi: null,
        sgIbu: null,

        rwObat: null,
        kebiasaanIbu: null,
        kebiasaanLain: null,
        rwPersalinan: null,
        ketuban: null,
        volume: null,

        rwTransDarah: null,
        reaksiTrans: null,
        rwImunisasi: null,

        crLahir: null,
        apgarScore: 0,
        volumeKetuban: 'Tidak Ada',
        warnaKetuban: null,
        pecahDini: null,

        golDarahIbu: null,
        golDarahAyah: null,
        golDarahBayi: null,

        skorNyeri: 0,
        keluhanNyeri: null,
        ekspresiWajah: 0,
        menangis: 0,
        polaNafas: 0,
        lengan: 0,
        kaki: 0,
        keadaanRangsangan: 0,

        sgn: {
          nm: 0, // nafsu makan
          km: 0, // kemampuan makan
          fs: 0, // faktor stress
          bb: 0 // persentil BB
        },
        sgnSkor: 0,
        sgnKet: null

      }

      this.formPediatrik = {
        // riwayat penyakit kelahiran
        anakKe: 1,
        jmlSaudara: 1,
        crKelahiran: null,
        umurKelahiran: 'Cukup Bulan',
        klainanBawaan: null,
        // riwayat Imunisasi
        rwImunisasi: [],
        // riwayat Tumbuh kembang
        gigiPertama: null,
        berjalan: null,
        membaca: null,
        duduk: null,
        bicara: null,

        sukaMknan: null,
        tdkSukaMknan: null,
        nafsuMkn: 'Baik',
        polaMakan: null,
        mknYgdiberikan: null,

        // polaTidur
        tidurSiang: null,
        tidurMalam: null,
        kebiasaanSblmMkn: null,
        nyeri: 'Tidak',

        mandiSendiri: 1,
        dimandikan: 1,
        gosokGigi: 1,
        keramas: 1,

        kbersihanKuku: 'Bersih',
        aktifitas: null,

        babFrekuensi: null,
        babKonsistensi: null,
        babWarna: null,
        babBau: null,

        bakFrekuensi: null,
        bakWarna: null,
        bakBau: null,
        meconium: 'Tidak Ada'

      }

      this.hitungSkorSgd()
      this.hitungSkorSgk()
      this.hitungSkorSgn()
      this.hitungSkorNyeri('formNeoNatal')
      this.hitungSkorNyeri('form')
    },

    hitungSkorNyeri (jns) {
      let skor = 0
      if (jns === 'formNeoNatal') {
        skor = parseInt(this.formNeoNatal.ekspresiWajah) + parseInt(this.formNeoNatal.menangis) + parseInt(this.formNeoNatal.polaNafas) + parseInt(this.formNeoNatal.lengan) + parseInt(this.formNeoNatal.kaki) + parseInt(this.formNeoNatal.keadaanRangsangan)
        this.formNeoNatal.skorNyeri = skor
        this.setKeteranganSkornyeri(skor, 'formNeoNatal')
      }
      else if (jns === 'form') {
        if (this.form.keluhannyeri.kajianNyeri === 'Wong Baker Face Scale') {
          this.setKeteranganSkornyeri(this.form.keluhannyeri.skorNyeri, 'form')
        }
        else {
          // skor = parseInt(this.form.ekspresiWajah) + parseInt(this.form.gerakanTangan) + parseInt(this.form.kebutuhanVentilasi)
          skor = parseInt(this.form.keluhannyeri.form?.ekspresiWajah?.skor ?? 0) + parseInt(this.form.keluhannyeri.form?.gerakanTangan?.skor ?? 0) + parseInt(this.form.keluhannyeri.form?.kebutuhanVentilasi?.skor ?? 0)
          this.form.keluhannyeri.skorNyeri = skor
          this.setKeteranganSkornyeri(skor, 'form')
        }

        // console.log('bener')
      }
    },
    setKeteranganSkornyeri (val, jns) {
      let ket = null
      if (jns === 'formNeoNatal') {
        if (val === 0) ket = 'Tidak nyeri'
        else if (val > 0 && val < 2) ket = 'Tidak nyaman'
        else if (val >= 2 && val <= 4) ket = 'Nyeri Ringan - Sedang'
        else if (val >= 5 && val <= 7) ket = 'Nyeri Sedang - Berat'
        this.formNeoNatal.keluhanNyeri = ket
      }
      else if (jns === 'form') {
        if (this.form.keluhannyeri.kajianNyeri === 'Wong Baker Face Scale') {
          if (val === 0) ket = 'Tidak ada nyeri'
          else if (val > 0 && val <= 3) ket = 'Nyeri Ringan'
          else if (val > 3 && val <= 6) ket = 'Nyeri Sedang'
          else if (val > 6 && val <= 10) ket = 'Nyeri Berat'
          // this.form.keluhanNyeri = ket
          this.form.keluhannyeri.ket = ket
        }
        else {
          if (val === 0) ket = 'Tidak ada nyeri'
          else if (val > 0 && val <= 3) ket = 'Nyeri minimal atau tidak ada nyeri.'
          else if (val > 3 && val <= 6) ket = 'Nyeri ringan hingga sedang.'
          else if (val > 6 && val <= 9) ket = 'Nyeri sedang hingga berat.'
          else if (val > 9) ket = 'Nyeri berat hingga sangat berat.'
          this.form.keluhannyeri.ket = ket
        }
      }
    },

    hitungSkorSgd () {
      const skor = parseInt(this.form.sgd.bb) + parseInt(this.form.sgd.am) + parseInt(this.form.sgd.kk)
      this.form.sgdSkor = skor
      this.form.sgdKet = this.setSgdKet(skor)
    },
    hitungSkorSgk () {
      const skor = parseInt(this.formKebidanan.sgk.am) + parseInt(this.formKebidanan.sgk.bb) + parseInt(this.formKebidanan.sgk.hb) + parseInt(this.formKebidanan.sgk.metabolisme)
      this.formKebidanan.sgkSkor = skor
      this.formKebidanan.sgkKet = this.setSgdKet(skor)
      // console.log('wwooii', this.formKebidanan.sgkSkor)
    },
    hitungSkorSgn () {
      const skor = parseInt(this.formNeoNatal.sgn.am) + parseInt(this.formNeoNatal.sgn.km) + parseInt(this.formNeoNatal.sgn.fs) + parseInt(this.formNeoNatal.sgn.bb)
      this.formNeoNatal.sgnSkor = skor

      if (skor >= 0 && skor <= 3) this.formNeoNatal.sgnKet = 'tidak beresiko malnutrisi'
      else if (skor >= 4 && skor < 6) this.formNeoNatal.sgnKet = 'Beresiko Sedang Malnutrisi'
      else if (skor >= 6) this.formNeoNatal.sgnKet = 'Beresiko Tinggi Malnutrisi'
      // console.log('wwooii', this.formKebidanan.sgkSkor)
    },
    setSgdKet (nilai) {
      let ket = null
      const skor = nilai || 0
      if (skor < 2) {
        ket = 'tidak beresiko malnutrisi'
      }
      else {
        ket = 'Beresiko malnutrisi'
      }
      return ket
    },
    getRiwayatKehamilan (pasien) {
      const params = { params: { norm: pasien?.norm } }

      return new Promise((resolve, reject) => {
        api.get('v1/simrs/pelayanan/kandungan/riwayat-obsetri', params)
          .then((resp) => {
            console.log('rwyt kehamilan', resp)
            if (resp.status === 200) {
              this.riwayatKehamilans = resp.data
              this.initFormRiwayatKehamilan()
            }
            resolve(resp)
          })
          .catch((err) => {
            console.log(err)
            reject(err)
          })
      })
    },
    initFormRiwayatKehamilan (val) {
      this.formRiwayatKehamilan.pl = val ? val?.pl : null
      this.formRiwayatKehamilan.umurAnak = val ? val?.umurAnak : null
      this.formRiwayatKehamilan.kuAnak = val ? val?.kuAnak : null
      this.formRiwayatKehamilan.bbl = val ? val?.bbl : null
      this.formRiwayatKehamilan.riwayatKehamilan = val ? val?.riwayatKehamilan : null
    },
    saveRiwayatKehamilan (pasien) {
      this.formRiwayatKehamilan.noreg = pasien?.noreg
      this.formRiwayatKehamilan.norm = pasien?.norm
      return new Promise((resolve, reject) => {
        api.post('v1/simrs/pelayanan/kandungan/store-obsetri', this.formRiwayatKehamilan)
          .then((resp) => {
            if (resp.status === 200) {
              // this.getRiwayatObsetri(pasien)
              this.riwayatKehamilans.unshift(resp.data)
              this.initFormRiwayatKehamilan()
              notifSuccess(resp)
            }
            resolve(resp)
          })
          .catch((err) => {
            console.log(err)
            reject(err)
          })
      })
    },

    deleteRiwayatKehamilan (pasien, id) {
      const payload = { id }
      return new Promise((resolve, reject) => {
        api.post('v1/simrs/pelayanan/kandungan/delete-obsetri', payload)
          .then((resp) => {
            if (resp.status === 200) {
              const newArray = this.riwayatKehamilans.filter(obj => obj.id !== id)
              this.riwayatKehamilans = newArray
              notifSuccess(resp)
            }
            resolve(resp)
          })
          .catch((err) => {
            console.log(err)
            reject(err)
          })
      })
    },

    async saveForm (jnsKasus, pasien) {
      this.loadingSave = true
      const req = {
        noreg: pasien?.noreg ?? null,
        norm: pasien?.norm,
        form: this.form,
        formKebidanan: jnsKasus.gruping === '4.2' ? this.formKebidanan : null, // ini this.formKebidanan,
        formNeoNatal: jnsKasus.gruping === '4.3' ? this.formNeoNatal : null,
        formPediatrik: jnsKasus.gruping === '4.4' ? this.formPediatrik : null // ini this.formPediatrik
      }

      // console.log('form, jenis kasus', req, jnsKasus)

      try {
        const resp = await api.post('v1/simrs/ranap/layanan/anamnesis/simpananamnesis', req)
        console.log('resp', resp)
        if (resp.status === 200) {
          // xxx
        }
        this.loadingSave = false
      }
      catch (error) {
        console.log('error', error)
        this.loadingSave = false
      }
    }
  }
})
