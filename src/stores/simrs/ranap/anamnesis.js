import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { notifSuccess } from 'src/modules/utils'
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { usePengunjungRanapStore } from './pengunjung'

export const useAnamnesisRanapStore = defineStore('anamnesis-ranap-store', {
  state: () => ({

    items: {
      ranap: [],
      igd: []
    },
    loading: false,
    form: {
      // ini untuk 4.1
      id: null,
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

      skreeninggizi: {
        form: null,
        skor: 0,
        ket: null
      }

    },

    formKebidanan: {
      // ini untuk 4.2
      rwObsetri: null,
      rwRawat: null,
      rwOperasi: null,
      rwGynecology: [],
      rwGynecologyLain: null,
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
      keluhannyeri: {
        kajianNyeri: 'Wong Baker Face Scale',
        skorNyeri: 0,
        ket: null,
        form: null
      },

      skreeninggizi: {
        form: null,
        skor: 0,
        ket: null
      }

      // sgk: {
      //   am: 0,
      //   bb: 0,
      //   hb: 0,
      //   metabolisme: 0,
      //   metabolismeKet: null
      // },
      // sgkSkor: 0,
      // sgkKet: null
    },

    formNeoNatal: {
      // ini untuk 4.3
      crMasuk: null,
      asalMasuk: null,
      penanggungJawab: null,
      noHpPj: null,
      alamatPj: null,
      hubPj: null,

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
      rhDarahBayi: null,
      rhDarahIbu: null,
      rhDarahAyah: null,

      // skorNyeri: 0,
      // keluhanNyeri: null,
      // ekspresiWajah: 0,
      // menangis: 0,
      // polaNafas: 0,
      // lengan: 0,
      // kaki: 0,
      // keadaanRangsangan: 0,

      keluhannyeri: {
        skorNyeri: 0,
        ket: null,
        form: null
      },

      skreeninggizi: {
        form: null,
        skor: 0,
        ket: null
      },

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
      anakKe: 0,
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
      meconium: 'Tidak Ada',

      skreeninggizi: {
        form: null,
        skor: 0,
        ket: null
      },

      keluhannyeri: {
        kajianNyeri: 'Wong Baker Face Scale',
        skorNyeri: 0,
        ket: null,
        form: null
      }

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

    caraMasuks: ['Menggunakan Inkubator', 'Covis', 'Infant Wamer', 'Digendong', 'Box Bayi'],
    asalMasuks: ['IGD', 'Poliklinik', 'Rujukan dr spesialis/RS Luar/Bisan/Klinik', 'OK', 'VK'],
    kebiasaanIbus: ['Merokok', 'Minum Jamu', 'Minuman Beralkohol'],
    hubPj: ['Ayah', 'Ibu', 'Saudara'],
    riwayatPersalinans: ['SC', 'Spontan Kepala / Bokong', 'VE', 'VORCEP'],
    ketubans: ['Jernih', 'Hiijau Encer / Kental', 'Meconium', 'Darah', 'Putih keruh'],
    volumes: ['Normal', 'Oligohidramnion', 'Polihidramnion', 'Tidak ada'],
    golDarahs: ['A', 'B', 'AB', 'O'],
    rhesus: ['Positif +', 'Negatif -'],
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
    formGizis: [
      {
        kode: 'bb',
        label: 'Apakah Ada Penurunan Berat badan yang tidak diinginkan selama 6 Bulan terakhir ?',
        values: [
          { text: 'Iya', skor: 2 },
          { text: 'Tidak', skor: 0 }
        ]
      },
      {
        kode: 'am',
        label: 'Apakah Asupan Makan berkurang karena tidak nafsu makan ?',
        values: [
          { text: 'Iya', skor: 1 },
          { text: 'Tidak', skor: 0 }
        ]
      },
      {
        kode: 'kk',
        label: 'Apakah pasien memiliki diagnosa khusus / kondisi khusus ?',
        values: [
          { text: 'Iya', skor: 2 },
          { text: 'Tidak', skor: 0 }
        ]
      }

    ],

    formGiziObgyns: [
      {
        kode: 'am',
        label: 'Apakah asupan makan berkurang karena tidak nafsu makan?',
        values: [
          { text: 'Iya', skor: 1 },
          { text: 'Tidak', skor: 0 }
        ]
      },
      {
        kode: 'bb',
        label: 'Apakah ada pertambahan BB yang kurang atau lebih selama kehamilan?',
        values: [
          { text: 'Iya', skor: 2 },
          { text: 'Tidak', skor: 0 }
        ]
      },
      {
        kode: 'hb',
        label: 'Nilai Hb < 10 g/dl atau HCT 30%',
        values: [
          { text: 'Iya', skor: 1 },
          { text: 'Tidak', skor: 0 }
        ]
      },
      {
        kode: 'metabolisme',
        label: 'Ada gangguan metabolisme / kondisi khusus. (Penyakit tertentu)',
        values: [
          { text: 'Iya', skor: 1 },
          { text: 'Tidak', skor: 0 }
        ],
        keterangan: null
      }
    ],

    formNyeriNeonatals: [
      {
        kode: 'ekspresiWajah',
        label: 'Ekspresi Wajah',
        values: [
          { text: 'Santai', skor: 0 },
          { text: 'Meringis', skor: 1 }
        ]
      },
      {
        kode: 'menangis',
        label: 'Menangis',
        values: [
          { text: 'Tidak Menangis', skor: 0 },
          { text: 'Merengek/Merintih', skor: 1 },
          { text: 'Menangis', skor: 2 }
        ]
      },
      {
        kode: 'polaNafas',
        label: 'Pola Nafas',
        values: [
          { text: 'Santai', skor: 0 },
          { text: 'Perubahan Pola Nafas', skor: 1 }
        ]
      },
      {
        kode: 'lengan',
        label: 'Lengan',
        values: [
          { text: 'Santai', skor: 0 },
          { text: 'Fleksi/Extensi', skor: 1 }
        ]
      },
      {
        kode: 'kaki',
        label: 'Kaki',
        values: [
          { text: 'Santai', skor: 0 },
          { text: 'Fleksi/Extensi', skor: 1 }
        ]
      },
      {
        kode: 'keadaanRangsangan',
        label: 'Keadaan Rangsangan',
        values: [
          { text: 'Tertidur/Bangun', skor: 0 },
          { text: 'Rewel', skor: 1 }
        ]
      }
    ],

    formGiziNeonatals: [
      {
        kode: 'nm',
        label: 'Nafsu Makan',
        values: [
          { text: ' Nafsu Makan Baik', skor: 0 },
          { text: ' Intake Berkurang, Sisa Makan Lebih dari Setengah Pors', skor: 2 },
          { text: ' Tidak Ada Nafsu Makan Lebih dari 24 Jam', skor: 3 }
        ]
      },
      {
        kode: 'km',
        label: 'Kemampuan Untuk Makan',
        values: [
          { text: 'Tidak ada kesulitan makan, tidak diare atau muntah', skor: 0 },
          { text: 'Ada masalah makan, sering muntah dan diare ringan', skor: 1 },
          { text: 'Butuh bantuan untuk makan, muntah sedang dan atau diare 1-2 kali sehari', skor: 2 },
          { text: 'Tidak dapat makan secara oral, disfagia, muntah berat dan atau diare lebih dari sekali sehari', skor: 3 }
        ]
      },
      {
        kode: 'fs',
        label: 'Faktor Stress',
        values: [
          { text: 'Tidak ada', skor: 0 },
          { text: 'Pembedahan ringan atau infeksi', skor: 1 },
          { text: 'Penyakit kronik, bedah mayor, inflamatory bowl disease atau penyakit gastrointestina', skor: 2 },
          { text: 'Patah tulang, luka bakar, sepsis berat, penyakit malignansi', skor: 3 }
        ]
      },
      {
        kode: 'bb',
        label: 'Persentil BB',
        values: [
          { text: 'BB/TB sesuai standar', skor: 0 },
          { text: '90-99% BB/TB', skor: 1 },
          { text: '80-89% BB/TB', skor: 2 },
          { text: '<79% BB/TB', skor: 3 }
        ]
      }

    ],

    formGiziPediatrik: [
      {
        kode: 'tk',
        label: ['Apakah pasien tampak kurus?'],
        values: [
          { text: 'Ya', skor: 1 },
          { text: 'Tidak', skor: 0 }
        ]
      },
      {
        kode: 'bb',
        label: ['Apakah terdapat penurunan BB selama 1 bulan terakhir?', 'Berdasarkan penilaian objektif data BB bila ada satu penilaian subjektif orang tua pasien', 'Untuk bayi < 1 tahun berat badan tidak naik selama 3 bulan terakhir'],
        values: [
          { text: 'Ya', skor: 2 },
          { text: 'Tidak', skor: 0 }
        ]
      },
      {
        kode: 'kk',
        label: ['Apakah terdapat salah satu dari kondisi ini?', 'Diare >= 5 kali/hari dan/atau muntah > 3 kali/hari dalam seminggu terakhir', 'Asupan makanan berkurang selama satu minggu terakhir'],
        values: [
          { text: 'Ya', skor: 1 },
          { text: 'Tidak', skor: 0 }
        ]
      },
      {
        kode: 'penyakit',
        label: ['Apakah terdapat penyakit atau keadaan yang mengakibatkan pasien beresiko malnutrisi? (Diare kronis, HIV, PJB, Hepato, Ginjal, Stoma, Lain-lain)'],
        values: [
          { text: 'Ya', skor: 2 },
          { text: 'Tidak', skor: 0 }
        ]
      }

    ]

    // sgn: {
    //   nm: {
    //     text: 'Nafsu Makan',
    //     pilihan: [
    //       { text: ' Nafsu Makan Baik', skor: 0 },
    //       { text: ' Intake Berkurang, Sisa Makan Lebih dari Setengah Pors', skor: 2 },
    //       { text: ' Tidak Ada Nafsu Makan Lebih dari 24 Jam', skor: 3 }
    //     ]
    //   },
    //   km: {
    //     text: 'Kemampuan Untuk Makan',
    //     pilihan: [
    //       { text: 'Tidak ada kesulitan makan, tidak diare atau muntah', skor: 0 },
    //       { text: 'Ada masalah makan, sering muntah dan diare ringan', skor: 1 },
    //       { text: 'Butuh bantuan untuk makan, muntah sedang dan atau diare 1-2 kali sehari', skor: 2 },
    //       { text: 'Tidak dapat makan secara oral, disfagia, muntah berat dan atau diare lebih dari sekali sehari', skor: 3 }
    //     ]
    //   },
    //   fs: {
    //     text: 'Faktor Stress',
    //     pilihan: [
    //       { text: 'Tidak ada', skor: 0 },
    //       { text: 'Pembedahan ringan atau infeksi', skor: 1 },
    //       { text: 'Penyakit kronik, bedah mayor, inflamatory bowl disease atau penyakit gastrointestina', skor: 2 },
    //       { text: 'Patah tulang, luka bakar, sepsis berat, penyakit malignansi', skor: 3 }
    //     ]
    //   },
    //   bb: {
    //     text: 'Persentil BB',
    //     pilihan: [
    //       { text: 'BB/TB sesuai standar', skor: 0 },
    //       { text: '90-99% BB/TB', skor: 1 },
    //       { text: '80-89% BB/TB', skor: 2 },
    //       { text: '<79% BB/TB', skor: 3 }
    //     ]
    //   }

    // }

  }),
  // getters: {
  //   doubleCount: (state) => state.counter * 2
  // },
  actions: {

    async getData (pasien) {
      this.loading = true
      const params = {
        params: {
          noreg: pasien?.noreg
        }
      }
      try {
        const resp = await api.get('v1/simrs/ranap/layanan/anamnesis/list', params)
        console.log('resp anamnesis', resp)
        if (resp.status === 200) {
          this.items = resp.data
          this.PISAH_DATA_RANAP_IGD(resp.data, pasien)
        }
        this.loading = false
      }
      catch (error) {
        this.loading = false
      }
    },

    initReset (data) {
      // console.log('data init reset', data)

      this.form = {
        // ini untuk 4.1
        id: data?.id ?? null,
        keluhanUtama: data?.keluhanUtama ?? null,
        diagnosaMasuk: null,
        rwPenySkr: data?.riwayatpenyakitsekarang ?? null,
        rwPenyDhl: data?.riwayatpenyakit ?? null,
        rwPengobatan: data?.riwayatpengobatan ?? null,
        rwPenyKlrg: data?.riwayatpenyakitkeluarga ?? null,
        rwPkrjDgZatBahaya: data?.riwayat_pekerjaan_yang_berhubungan_dengan_zat_berbahaya ?? null,
        rwAlergi: data?.riwayatalergi ?? [],
        ketRwAlergi: data?.keteranganalergi ?? null,

        keluhannyeri: {
          kajianNyeri: data?.keluhannyeri?.dewasa?.kajianNyeri ?? 'Wong Baker Face Scale',
          skorNyeri: data?.keluhannyeri?.dewasa?.skorNyeri ?? 0,
          ket: data?.keluhannyeri?.dewasa?.ket ?? null,
          form: null
        },

        skreeninggizi: {
          form: null,
          skor: data?.skreeninggizi?.dewasa?.skor ?? 0,
          ket: data?.keluhannyeri?.dewasa?.ket ?? null
        }

      }

      const formNyeri = {}
      for (let i = 0; i < this.formNyeris.length; i++) {
        const el = this.formNyeris[i]
        formNyeri[el?.kode] = el?.values?.find(x => x?.skor === data?.keluhannyeri?.dewasa?.form[el.kode]?.skor) ?? null
      }
      this.form.keluhannyeri.form = formNyeri

      const formGizi = {}
      for (let i = 0; i < this.formGizis.length; i++) {
        const el = this.formGizis[i]
        formGizi[el?.kode] = el?.values?.find(x => x?.skor === data?.skreeninggizi?.dewasa?.form[el.kode]?.skor) ?? el?.values?.find(x => x?.skor === 0) ?? null
      }
      this.form.skreeninggizi.form = formGizi

      this.formKebidanan = {
        // ini untuk 4.2
        rwObsetri: null,
        rwRawat: null,
        rwOperasi: null,
        rwGynecology: [],
        rwGynecologyLain: null,
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
        // sgk: {
        //   am: 0,
        //   bb: 0,
        //   hb: 0,
        //   metabolisme: 0,
        //   metabolismeKet: null
        // },
        // sgkSkor: 0,
        // sgkKet: null
        skreeninggizi: {
          form: null,
          skor: data?.skreeninggizi?.kebidanan?.skor ?? 0,
          ket: data?.keluhannyeri?.kebidanan?.ket ?? null
        },

        keluhannyeri: {
          kajianNyeri: data?.keluhannyeri?.kebidanan?.kajianNyeri ?? 'Wong Baker Face Scale',
          skorNyeri: data?.keluhannyeri?.kebidanan?.skorNyeri ?? 0,
          ket: data?.keluhannyeri?.kebidanan?.ket ?? null,
          form: null
        }
      }

      if (data?.kebidanan) {
        Object.keys(this.formKebidanan).forEach(key => {
          if (key !== 'keluhannyeri' && key !== 'skreeninggizi') {
            this.formKebidanan[key] = data?.kebidanan[key]
          }
        })
      }

      const kebidananNyeri = {}
      for (let i = 0; i < this.formNyeris.length; i++) {
        const el = this.formNyeris[i]
        kebidananNyeri[el?.kode] = el?.values?.find(x => x?.skor === data?.keluhannyeri?.kebidanan?.form[el.kode]?.skor) ?? el?.values?.find(x => x.skor === 1) ?? null
      }
      this.formKebidanan.keluhannyeri.form = kebidananNyeri

      const formGiziObgyn = {}
      for (let i = 0; i < this.formGiziObgyns.length; i++) {
        const el = this.formGiziObgyns[i]
        formGiziObgyn[el?.kode] = el?.values?.find(x => x?.skor === data?.skreeninggizi?.kebidanan?.form[el.kode]?.skor) ?? el?.values?.find(x => x?.skor === 0) ?? null
      }
      this.formKebidanan.skreeninggizi.form = formGiziObgyn

      // console.log('kebidanan', this.formKebidanan)

      this.formNeoNatal = {
        crMasuk: null,
        asalMasuk: null,
        penanggungJawab: null,
        noHpPj: null,
        alamatPj: null,
        hubPj: null,

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
        rhDarahBayi: null,
        rhDarahIbu: null,
        rhDarahAyah: null,

        // skorNyeri: 0,
        // keluhanNyeri: null,
        // ekspresiWajah: 0,
        // menangis: 0,
        // polaNafas: 0,
        // lengan: 0,
        // kaki: 0,
        // keadaanRangsangan: 0,

        keluhannyeri: {
          skorNyeri: data?.keluhannyeri?.kebidanan?.skorNyeri ?? 0,
          ket: data?.keluhannyeri?.kebidanan?.ket ?? null,
          form: null
        },

        skreeninggizi: {
          form: null,
          skor: 0,
          ket: null
        }

        // sgn: {
        //   nm: 0, // nafsu makan
        //   km: 0, // kemampuan makan
        //   fs: 0, // faktor stress
        //   bb: 0 // persentil BB
        // },
        // sgnSkor: 0,
        // sgnKet: null

      }

      if (data?.neonatal) {
        Object.keys(this.formNeoNatal).forEach(key => {
          if (key !== 'keluhannyeri' && key !== 'skreeninggizi') {
            this.formNeoNatal[key] = data?.neonatal[key]
          }
        })
      }

      const neonatalNyeri = {}
      for (let i = 0; i < this.formNyeriNeonatals.length; i++) {
        const el = this.formNyeriNeonatals[i]
        neonatalNyeri[el?.kode] = el?.values?.find(x => x?.skor === data?.keluhannyeri?.neonatal?.form[el.kode]?.skor) ?? el.values?.find(x => x?.skor === 0) ?? null
      }
      this.formNeoNatal.keluhannyeri.form = neonatalNyeri

      const neonatalGizi = {}
      for (let i = 0; i < this.formGiziNeonatals.length; i++) {
        const el = this.formGiziNeonatals[i]
        neonatalGizi[el?.kode] = el?.values?.find(x => x?.skor === data?.skreeninggizi?.neonatal?.form[el.kode]?.skor) ?? el.values?.find(x => x?.skor === 0) ?? null
      }
      this.formNeoNatal.skreeninggizi.form = neonatalGizi

      // console.log('formNeoNatal', this.formNeoNatal)

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
        meconium: 'Tidak Ada',

        skreeninggizi: {
          form: null,
          skor: 0,
          ket: null
        },

        keluhannyeri: {
          kajianNyeri: 'Wong Baker Face Scale',
          skorNyeri: 0,
          ket: null,
          form: null
        }

      }

      if (data?.pediatrik) {
        Object.keys(this.formPediatrik).forEach(key => {
          if (key !== 'keluhannyeri' && key !== 'skreeninggizi') {
            this.formPediatrik[key] = data?.pediatrik[key]
          }
        })
      }

      const formNyeriPediatrik = {}
      for (let i = 0; i < this.formNyeris.length; i++) {
        const el = this.formNyeris[i]
        formNyeriPediatrik[el?.kode] = el?.values?.find(x => x?.skor === data?.keluhannyeri?.pediatrik?.form[el.kode]?.skor) ?? el?.values?.find(x => x.skor === 1) ?? null
      }
      this.formPediatrik.keluhannyeri.form = formNyeriPediatrik

      // console.log('el', this.form.keluhannyeri.form)
      // if (data?.skreeninggizi?.dewasa === null || data?.skreeninggizi?.dewasa === undefined) {
      const formGiziPedia = {}
      for (let i = 0; i < this.formGiziPediatrik.length; i++) {
        const el = this.formGiziPediatrik[i]
        formGiziPedia[el?.kode] = el?.values?.find(x => x?.skor === data?.skreeninggizi?.pediatrik?.form[el.kode]?.skor) ?? el?.values?.find(x => x?.skor === 0) ?? null
      }
      this.formPediatrik.skreeninggizi.form = formGiziPedia

      // console.log('gizi pediatrik', this.formPediatrik)

      this.hitungSkorSgd()
      this.hitungSkorSgk()
      this.hitungSkorSgn()
      this.hitungSkorSgp()
      this.hitungSkorNyeri('formNeoNatal')
      this.hitungSkorNyeri('form')
      this.hitungSkorNyeri('kebidanan')
      this.hitungSkorNyeri('pediatrik')
    },

    hitungSkorNyeri (jns) {
      let skor = 0
      if (jns === 'formNeoNatal') {
        for (let i = 0; i < this.formNyeriNeonatals.length; i++) {
          const el = this.formNyeriNeonatals[i]
          skor += parseInt(this.formNeoNatal?.keluhannyeri?.form[el?.kode]?.skor)
        }

        this.formNeoNatal.keluhannyeri.skorNyeri = skor
        // console.log('oooi', skor)

        this.setKeteranganSkornyeri(skor, 'formNeoNatal')
      }
      else if (jns === 'form' || jns === 'kebidanan' || jns === 'pediatrik') {
        const frm = jns === 'form' ? this.form : (jns === 'kebidanan' ? this.formKebidanan : this.formPediatrik)
        if (frm.keluhannyeri.kajianNyeri === 'Wong Baker Face Scale') {
          this.setKeteranganSkornyeri(frm.keluhannyeri.skorNyeri, jns)
          // frm.keluhannyeri.form = null
        }
        else {
          skor = parseInt(frm.keluhannyeri.form?.ekspresiWajah?.skor ?? 0) + parseInt(frm.keluhannyeri.form?.gerakanTangan?.skor ?? 0) + parseInt(frm.keluhannyeri.form?.kebutuhanVentilasi?.skor ?? 0)
          frm.keluhannyeri.skorNyeri = skor
          this.setKeteranganSkornyeri(skor, jns)
        }
      }
    },
    // hitungWongBakerFaceScale (jns) {
    //   let skor = 0
    // },
    setKeteranganSkornyeri (val, jns) {
      let ket = null
      if (jns === 'formNeoNatal') {
        if (val === 0) ket = 'Tidak nyeri'
        else if (val > 0 && val < 2) ket = 'Tidak nyaman'
        else if (val >= 2 && val <= 4) ket = 'Nyeri Ringan - Sedang'
        else if (val >= 5 && val <= 7) ket = 'Nyeri Sedang - Berat'
        this.formNeoNatal.keluhannyeri.ket = ket
      }
      else if (jns === 'form' || jns === 'kebidanan' || jns === 'pediatrik') {
        const frm = jns === 'form' ? this.form : (jns === 'kebidanan' ? this.formKebidanan : this.formPediatrik)
        if (frm.keluhannyeri.kajianNyeri === 'Wong Baker Face Scale') {
          if (val === 0) ket = 'Tidak ada nyeri'
          else if (val > 0 && val <= 3) ket = 'Nyeri Ringan'
          else if (val > 3 && val <= 6) ket = 'Nyeri Sedang'
          else if (val > 6) ket = 'Nyeri Berat'
          // frm.keluhanNyeri = ket
          frm.keluhannyeri.ket = ket
        }
        else {
          if (val === 0) ket = 'Tidak ada nyeri'
          else if (val > 0 && val <= 3) ket = 'Nyeri minimal atau tidak ada nyeri.'
          else if (val > 3 && val <= 6) ket = 'Nyeri ringan hingga sedang.'
          else if (val > 6 && val <= 9) ket = 'Nyeri sedang hingga berat.'
          else if (val > 9) ket = 'Nyeri berat hingga sangat berat.'
          frm.keluhannyeri.ket = ket
        }
      }
    },

    hitungSkorSgd () {
      const skor = parseInt(this.form.skreeninggizi.form.bb.skor) + parseInt(this.form.skreeninggizi.form.am.skor) + parseInt(this.form.skreeninggizi.form.kk.skor)
      this.form.skreeninggizi.skor = skor
      this.form.skreeninggizi.ket = this.setSgdKet(skor)
      // this.form.sgdSkor = skor
      // this.form.sgdKet = this.setSgdKet(skor)
    },
    hitungSkorSgk () {
      const skor = parseInt(this.formKebidanan?.skreeninggizi?.form?.am?.skor) + parseInt(this.formKebidanan?.skreeninggizi?.form?.bb?.skor) + parseInt(this.formKebidanan?.skreeninggizi?.form?.hb?.skor) + parseInt(this.formKebidanan?.skreeninggizi?.form?.metabolisme?.skor)
      this.formKebidanan.skreeninggizi.skor = skor
      this.formKebidanan.skreeninggizi.ket = this.setSgdKet(skor)
      // console.log('wwooii', this.formKebidanan.sgkSkor)
    },
    hitungSkorSgn () {
      // const skor = parseInt(this.formNeoNatal.sgn.am) + parseInt(this.formNeoNatal.sgn.km) + parseInt(this.formNeoNatal.sgn.fs) + parseInt(this.formNeoNatal.sgn.bb)
      // this.formNeoNatal.sgnSkor = skor
      let skor = 0
      for (let i = 0; i < this.formGiziNeonatals.length; i++) {
        const el = this.formGiziNeonatals[i]
        skor += parseInt(this.formNeoNatal?.skreeninggizi?.form[el.kode]?.skor)
      }

      this.formNeoNatal.skreeninggizi.skor = skor

      if (skor >= 0 && skor <= 3) this.formNeoNatal.skreeninggizi.ket = 'Tidak Beresiko Malnutrisi'
      else if (skor >= 4 && skor < 6) this.formNeoNatal.skreeninggizi.ket = 'Beresiko Sedang Malnutrisi'
      else if (skor >= 6) this.formNeoNatal.skreeninggizi.ket = 'Beresiko Tinggi Malnutrisi'
      // console.log('wwooii', this.formKebidanan.sgkSkor)
    },
    hitungSkorSgp () {
      let skor = 0
      for (let i = 0; i < this.formGiziPediatrik.length; i++) {
        const el = this.formGiziPediatrik[i]
        skor += parseInt(this.formPediatrik?.skreeninggizi?.form[el.kode]?.skor)
      }

      this.formPediatrik.skreeninggizi.skor = skor

      if (skor < 2) this.formPediatrik.skreeninggizi.ket = 'Tidak Beresiko Malnutrisi'
      else if (skor >= 2) this.formPediatrik.skreeninggizi.ket = 'Beresiko Malnutrisi'
      // console.log('wwooii', this.formKebidanan.sgkSkor)
    },
    setSgdKet (nilai) {
      let ket = null
      const skor = nilai || 0
      if (skor < 2) {
        ket = 'Tidak Beresiko Malnutrisi'
      }
      else {
        ket = 'Beresiko Malnutrisi'
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

    // KHUSUS KEPERAWATAN
    async saveForm (jnsKasus, pasien) {
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
      // eslint-disable-next-line no-unused-vars
      const req = {
        noreg: pasien?.noreg ?? null,
        norm: pasien?.norm,
        kdruang: pasien?.kdruangan,
        id: this.form.id,
        form: formDefault,
        awal: '1',
        formKebidanan: kasusKep === '4.2' ? this.formKebidanan : null, // ini this.formKebidanan,
        formNeoNatal: kasusKep === '4.3' ? this.formNeoNatal : null,
        formPediatrik: kasusKep === '4.4' ? this.formPediatrik : null // ini this.formPediatrik
      }

      const timeStamp = Date.now()
      const auth = useAplikasiStore()
      const pushSementara = {
        id: this.form.id,
        noreg: pasien?.noreg,
        norm: pasien?.norm,
        kdruang: pasien?.kdruangan,
        nakes: auth?.user?.pegawai?.kdgroupnakes,
        tgl: date.formatDate(timeStamp, 'YYYY-MM-DD HH:mm:ss'),
        petugas: { nama: auth?.user?.nama }

      }

      const pengunjung = usePengunjungRanapStore()
      pengunjung.injectDataPasien(pasien?.noreg, pushSementara, 'anamnesis')

      // console.log('form, jenis kasus', req)

      try {
        const resp = await api.post('v1/simrs/ranap/layanan/anamnesis/simpananamnesis', req)
        console.log('resp', resp)
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
      // console.log('auth', jns)

      const igd = arr?.filter(x => x?.kdruang === 'POL014') ?? []
      const ranap = arr?.filter(x => x?.kdruang !== 'POL014' && x?.nakes === jns && x?.awal === '1') ?? []

      const isianKeperawatan = arr?.filter(x => x?.kdruang !== 'POL014' && x?.nakes !== '1' && x?.awal === '1') ?? []

      this.items.igd = igd
      this.items.ranap = ranap

      // const pengunjung = usePengunjungRanapStore()
      console.log('items', this.items, ranap)

      // baru ada penyesuaian nakes
      let form = null
      const dokter = (jns === '1' || jns === 1)
      if (dokter) {
        if (ranap.length) { form = ranap[0] }
        else { form = isianKeperawatan.length ? isianKeperawatan[0] : null }
      }
      else {
        form = ranap.length ? ranap[0] : null
      }

      if (form) ranap.length ? form.id = ranap[0].id : form.id = null
      // const isianList = ranap.length ? ranap[0] : null

      // if (isianList) {
      //   pengunjung.injectDataPasien(pasien?.noreg, isianList, 'anamnesis')
      //   pengunjung.deleteInjectanNull(pasien?.noreg, 'anamnesis')
      // }
      this.initReset(form)
      if (dokter) this.form.keluhannyeri = null
      if (dokter) this.form.skreeninggizi = null
    },
    SPLICE_ITEMS_RANAP (arr) {
      const idx = arr?.findIndex(x => x.id === null)
      this.items.ranap = arr.splice(1, idx)
    }
  }
})
