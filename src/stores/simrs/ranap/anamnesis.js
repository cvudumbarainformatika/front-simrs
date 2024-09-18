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

      kajianNyeri: 'Wong Baker Face Scale',
      skorNyeri: 0,
      keluhanNyeri: null,
      ekspresiWajah: null,
      ekspresiWajahKet: null,
      gerakanTangan: null,
      gerakanTanganKet: null,
      kebutuhanVentilasi: null,
      kebutuhanVentilasiKet: null,
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
      apgarScore: null,
      volumeKetuban: 'Tidak Ada',
      warnaKektuban: null,
      pecahDini: null,

      golDarahIbu: null,
      golDarahAyah: null,
      golDarahBayi: null

    },

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
    kebiasaanIbus: ['Merokok', 'Minum Jamu', 'Minuman Beralkohol', 'Dll'],
    riwayatPersalinans: ['SC', 'Spontan Kepala / Bokong', 'VE', 'VORCEP'],
    ketubans: ['Jernih', 'Hiijau Encer / Kental', 'Meconium', 'Darah', 'Putih keruh', 'Lain-lain'],
    volumes: ['Normal', 'Oligohidramnion', 'Polihidramnion', 'Tidak ada'],
    golDarahs: ['A', 'B', 'AB', 'O'],
    caraLahirs: ['Operasi Caesar', 'Spontan Kepala', 'Spontan Bokong'],

    pilihanNyeris: [{ text: 'Wong Baker Face Scale', value: 'a' }, { text: 'Behavioral Pain Scale (BPS)', value: 'b' }],
    ekspresiWajah: [
      { text: 'Santai, tanpa ketegangan', value: '1' },
      { text: 'Sedikit tegang, seperti dahi berkerut', value: '2' },
      { text: 'Sangat tegang, mata tertutup rapat', value: '3' },
      { text: 'Ekspresi menunjukkan nyeri parah, seperti menangis atau mengerutkan wajah', value: '4' }
    ],
    gerakanTangan: [
      { text: 'Tidak ada gerakan', value: '1' },
      { text: 'Ada gerakan ringan, seperti mengerutkan atau menggerakkan telapak tangan tanpa arah ', value: '2' },
      { text: 'Ada gerakan kuat, seperti menarik tangan atau berusaha melepas alat medis', value: '3' },
      { text: 'Gerakan tidak terkendali, seperti upaya melarikan diri', value: '4' }
    ],
    kebutuhanVentilasi: [
      { text: 'Toleran. tidak ada perlawanan', value: '1' },
      { text: 'Sedikit tidak toleran, batuk sekali atau melawan sedikit', value: '2' },
      { text: 'Sering batuk atau melawan ventilasi', value: '3' },
      { text: 'Tidak toleran sama sekali, melawan ventilasi secara konstan', value: '4' }
    ]
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

        kajianNyeri: 'Wong Baker Face Scale',
        skorNyeri: 0,
        keluhanNyeri: null,
        ekspresiWajah: null,
        ekspresiWajahKet: null,
        gerakanTangan: null,
        gerakanTanganKet: null,
        kebutuhanVentilasi: null,
        kebutuhanVentilasiKet: null,
        sgd: { // skreening gizi dewasa
          bb: 0, // penurunan bb
          am: 0, // asupan makan
          kk: 0 // kondisi khusus
        },
        sgdSkor: 0,
        sgdKet: null

      }

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

      this.setKeteranganSkornyeri(0)
      this.hitungSkorSgd()
      this.hitungSkorSgk()
    },
    setKeteranganSkornyeri (val) {
      if (val === 0) {
        this.form.keluhanNyeri = 'tidak ada nyeri'
      }
      else if (val > 0 && val <= 3) {
        this.form.keluhanNyeri = 'nyeri ringan'
      }
      else if (val > 3 && val <= 6) {
        this.form.keluhanNyeri = 'nyeri sedang'
      }
      else if (val > 6 && val <= 10) {
        this.form.keluhanNyeri = 'nyeri berat'
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
    }
  }
})
