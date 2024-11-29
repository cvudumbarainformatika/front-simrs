import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { usePengunjungIgdStore } from './pengunjung'
import { notifErr, notifSuccess } from 'src/modules/utils'

export const useAnamnesis = defineStore('anamnesis', {
  state: () => ({
    loadingForm: false,
    loadingHistory: false,
    tab: 'AnamnesisKeperawatan',
    tabs: [
      { name: 'Anamnesis Keperawatan', page: 'AnamnesisKeperawatan' },
      { name: 'Anamnesis Kebidanan', page: 'AnamnesisKebidanan' },
      { name: 'Penilaian Kajian Resiko Jatuh', page: 'PenilaianKajianResikoJatuh' }
    ],
    pilihnyerihilang: [],
    form: {
      keluhanutama: '',
      riwayatpenyakit: 'Tidak Ada',
      riwayatpenyakitsekarang: '',
      riwayatalergi: '',
      keteranganalergi: '',
      riwayatpengobatan: '',
      riwayatbepergian: 'Tidak',
      // baru
      riwayatpekerjaan: '',
      riwayatpenyakitkeluarga: 'Tidak Ada',
      skreeninggizi: 0,
      asupanmakan: 0,
      kondisikhusus: 'Tidak',
      skorkondisikhusus: 0,
      skor: 0,

      // baru skornyeri
      skornyeri: 0,
      keteranganscorenyeri: 'tidak ada nyeri',
      riwayatdemam: 'Tidak',
      berkeringat: 'Tidak',
      daerahwabah: '',
      obatjangkapanjang: 'Tidak',
      bbturun: 'Tidak',

      scroebps: 0,
      ketscorebps: '',

      scroenips: 0,
      ketscorenips: '',
      metode: 'nrt',

      penerjemah: 'Tidak',
      bahasaisyarat: 'Tidak',
      hamabatan: 'Tidak',
      kebutuhankomunikasidanedukasi: 'Normal',
      aktivitasmobilitas: 'Mandiri',
      aktivitasAlatBnatujalan: 'Tidak',
      selection: []

    },
    // nilai bps
    nilaiekspresiwajah: 0,
    nilaigerakantangan: 0,
    nilaikepatuhanventilasi: 0,

    // nilai nips
    nilaiekspresiwajahnips: 0,
    nilaimenangis: 0,
    nilaipolanafas: 0,
    nilailengan: 0,
    nilaikaki: 0,
    nilairangsangan: 0,

    alergis: ['Obat', 'Makanan', 'Udara', 'Lain-lain', 'Tidak ada Alergi'],
    selection: ['Tidak ada Alergi'],
    historys: [],
    historyMeta: null
  }),
  // getters: {
  //   doubleCount: (state) => state.counter * 2
  // },
  actions: {

    hitungNilaiSkor () {
      const skorKondKhusus = this.form.skorkondisikhusus
      const skor = parseInt(this.form.skreeninggizi) + parseInt(this.form.asupanmakan) + parseInt(skorKondKhusus)
      this.form.skor = skor
    },

    async saveData (pasien) {
      this.loadingForm = true
      this.form.norm = pasien ? pasien.norm : ''
      this.form.noreg = pasien ? pasien.noreg : ''

      this.hitungNilaiSkor()

      // console.log(this.form)

      try {
        const resp = await api.post('v1/simrs/igd/anamnesis/simpananamnesis', this.form)
        if (resp.status === 200) {
          // console.log('simpan anamnesis', resp)
          const storePasien = usePengunjungIgdStore()

          if (resp.data.result === 1) {
            this.form.rs4 = this.form.keluhanutama
          }
          const isi = resp.data.result[0]
          storePasien.injectDataPasien(pasien, isi, 'anamnesis')
          notifSuccess(resp)
          this.initReset()
          this.loadingForm = false
        }

        this.loadingForm = false
      }
      catch (error) {
        // console.log('anamnesis err', error)
        this.loadingForm = false
        notifErr(error)
      }
    },

    editForm (val) {
      this.form = {
        id: val?.id,
        keluhanutama: val?.rs4,
        riwayatpenyakit: val?.riwayatpenyakit,
        riwayatpenyakitsekarang: val?.riwayatpenyakitsekarang,
        selection: val?.riwayatalergi,
        keteranganalergi: val?.keteranganalergi,
        riwayatpengobatan: val?.riwayatpengobatan,
        riwayatpekerjaan: val?.riwayat_pekerjaan_yang_berhubungan_dengan_zat_berbahaya,
        // baru
        riwayatpenyakitkeluarga: val?.riwayatpenyakitkeluarga,
        skreeninggizi: val?.skreeninggizi,
        asupanmakan: val?.asupanmakan,
        kondisikhusus: val?.kondisikhusus,
        skor: val?.skor,
        keterangan_skor: val?.keterangan_skor,

        metode: val?.anamnesebps ? 'bps' : (val?.anamnesenips ? 'nips' : 'nrt'),
        // baru lagi metode scalanyeri
        skornyeri: isNaN(parseInt(val?.scorenyeri)) ? 0 : parseInt(val?.scorenyeri),
        keteranganscorenyeri: val?.keteranganscorenyeri,

        // baru lagi metode bps
        ekspresiwajah: val?.anamnesebps?.ekspresi_wajah,
        gerakantangan: val?.anamnesebps?.gerakan_tangan,
        kepatuhanventilasimekanik: val?.anamnesebps?.kepatuhan_ventilasi_mekanik,
        scroebps: val?.anamnesebps?.skor,
        ketscorebps: val?.anamnesebps?.keterangan_skor,

        // baru lagi metode nips
        ekspresiwajahnips: val?.anamnesenips?.ekspresi_wajah,
        menangis: val?.anamnesenips?.menangis,
        polanafas: val?.anamnesenips?.ekspresi_wajah,
        lengan: val?.anamnesenips?.lengan,
        kaki: val?.anamnesenips?.kaki,
        keadaanrangsangan: val?.anamnesenips?.keadaan_rangsangan,
        scroenips: val?.anamnesenips?.skor,
        ketscorenips: val?.anamnesenips?.ket_skor

      }
      // tambahan
      if (val?.anamnesetambahan[0]?.lokasi_nyeri !== null) this.form.lokasinyeri = val?.anamnesetambahan[0]?.lokasi_nyeri
      if (val?.anamnesetambahan[0]?.durasi_nyeri !== null) this.form.durasinyeri = val?.anamnesetambahan[0]?.durasi_nyeri
      if (val?.anamnesetambahan[0]?.durasi_nyeri !== null) this.form.penyebabnyeri = val?.anamnesetambahan[0]?.durasi_nyeri
      if (val?.anamnesetambahan[0]?.penyebab_nyeri !== null) this.form.frekwensinyeri = val?.anamnesetambahan[0]?.penyebab_nyeri
      if (val?.anamnesetambahan[0]?.nyeri_hilang !== null) this.form.nyerihilang = val?.anamnesetambahan[0]?.nyeri_hilang
      if (val?.anamnesetambahan[0]?.sebutkannyerihilang !== null) this.form.sebutkannyerihilang = val?.anamnesetambahan[0]?.sebutkannyerihilang
      if (val?.anamnesetambahan[0]?.aktifitas_mobilitas !== null) this.form.aktivitasmobilitas = val?.anamnesetambahan[0]?.aktifitas_mobilitas
      if (val?.anamnesetambahan[0]?.sebutkanperlubanuan !== null) this.form.sebutkanperlubanuan = val?.anamnesetambahan[0]?.sebutkanperlubanuan
      if (val?.anamnesetambahan[0]?.alat_bantu_jalan !== null) this.form.aktivitasAlatBnatujalan = val?.anamnesetambahan[0]?.alat_bantu_jalan
      if (val?.anamnesetambahan[0]?.sebutkanalatbantujalan !== null) this.form.sebutkanalatbantujalan = val?.anamnesetambahan[0]?.sebutkanalatbantujalan
      if (val?.anamnesetambahan[0]?.bicara !== null) this.form.kebutuhankomunikasidanedukasi = val?.anamnesetambahan[0]?.bicara
      if (val?.anamnesetambahan[0]?.sebutkankomunaksilainnya !== null) this.form.sebutkankomunaksilainnya = val?.anamnesetambahan[0]?.sebutkankomunaksilainnya
      if (val?.anamnesetambahan[0]?.penerjemah !== null) this.form.penerjemah = val?.anamnesetambahan[0]?.penerjemah
      if (val?.anamnesetambahan[0]?.sebutkanpenerjemah !== null) this.form.sebutkanpenerjemah = val?.anamnesetambahan[0]?.sebutkanpenerjemah
      if (val?.anamnesetambahan[0]?.bahasa_isyarat !== null) this.form.bahasaisyarat = val?.anamnesetambahan[0]?.bahasa_isyarat
      if (val?.anamnesetambahan[0]?.hambatan !== null) this.form.hamabatan = val?.anamnesetambahan[0]?.hambatan
      if (val?.anamnesetambahan[0]?.sebutkanhambatan !== null) this.form.sebutkanhambatan = val?.anamnesetambahan[0]?.sebutkanhambatan
      if (val?.anamnesetambahan[0]?.riwayat_demam !== null) this.form.riwayatdemam = val?.anamnesetambahan[0]?.riwayat_demam
      if (val?.anamnesetambahan[0]?.berkeringat_malam_hari !== null) this.form.berkeringat = val?.anamnesetambahan[0]?.berkeringat_malam_hari
      if (val?.anamnesetambahan[0]?.riwayat_bepergian !== null) this.form.riwayatbepergian = val?.anamnesetambahan[0]?.riwayat_bepergian
      if (val?.anamnesetambahan[0]?.riwayat_pemakaian_obat !== null) this.form.obatjangkapanjang = val?.anamnesetambahan[0]?.riwayat_pemakaian_obat
      if (val?.anamnesetambahan[0]?.riwayat_bb_turun !== null) this.form.bbturun = val?.anamnesetambahan[0]?.riwayat_bb_turun
      const kommatext = val?.riwayatalergi?.split(', ')
      this.selection = kommatext?.length ? kommatext : []
      const kommatextx = val?.anamnesetambahan[0]?.nyeri_hilang?.split(', ')
      this.pilihnyerihilang = kommatextx?.length ? kommatextx : []
    },
    copyForm (val) {
      this.form = {
        keluhanutama: val.keluhanutama,
        riwayatpenyakit: val.riwayatpenyakit,
        riwayatpenyakitsekarang: val.riwayatpenyakitsekarang,
        riwayatalergi: val.riwayatalergi,
        keteranganalergi: val.keteranganalergi,
        riwayatpengobatan: val.riwayatpengobatan,
        // baru
        riwayatpenyakitkeluarga: val.riwayatpenyakitkeluarga,
        skreeninggizi: val.skreeninggizi,
        asupanmakan: val.asupanmakan,
        kondisikhusus: val.kondisikhusus,
        skor: val.skor,
        skornyeri: isNaN(parseInt(val?.scorenyeri)) ? 0 : parseInt(val?.scorenyeri),
        keteranganscorenyeri: val?.keteranganscorenyeri
      }
      const kommatext = val?.riwayatalergi?.split(', ')
      this.selection = kommatext
      // console.log('form', this.form)
      // console.log('xxx', val)
    },

    setForm (key, val) {
      this.form[key] = val
    },

    setKeteranganSkornyeri (val) {
      if (val === 0) {
        this.form.keteranganscorenyeri = 'tidak ada nyeri'
      }
      else if (val > 0 && val <= 3) {
        this.form.keteranganscorenyeri = 'nyeri ringan'
      }
      else if (val > 3 && val <= 6) {
        this.form.keteranganscorenyeri = 'nyeri sedang'
      }
      else if (val > 6 && val <= 10) {
        this.form.keteranganscorenyeri = 'nyeri berat'
      }
    },

    async deleteData (pasien, id) {
      const payload = { id }
      try {
        const resp = await api.post('v1/simrs/igd/anamnesis/hapusanamnesis', payload)
        // console.log(resp)
        if (resp.status === 200) {
          const storePasien = usePengunjungIgdStore()
          storePasien.hapusDataAnamnesis(pasien, id)
          notifSuccess(resp)
        }
      }
      catch (error) {
        notifErr(error)
      }
    },

    async getHistory (norm) {
      this.loadingHistory = true
      const params = { params: { norm } }
      try {
        const resp = await api.get('v1/simrs/pelayanan/historyanamnesis', params)
        // console.log('history', resp)
        if (resp.status === 200) {
          if (resp.data?.length) {
            const arr = resp.data
            this.historyMeta = null
            this.historys = arr
          }
          else {
            this.historys = []
          }
        }
        this.loadingHistory = false
      }
      catch (error) {
        this.loadingHistory = false
        notifErr(error)
      }
    },
    async nextHistory (cursor) {
      this.loadingHistory = true
      const params = { params: { cursor } }
      try {
        const resp = await api.get('v1/simrs/pelayanan/historyanamnesis', params)
        // console.log('history', resp)
        if (resp.status === 200) {
          if (resp.data?.length) {
            const arr = resp.data
            this.historyMeta = null
            this.historys = arr
          }
          else {
            this.historys = []
          }
        }
        this.loadingHistory = false
      }
      catch (error) {
        this.loadingHistory = false
        notifErr(error)
      }
    },

    pilihHistory (val) {
      this.form = {
        keluhanutama: val.keluhanutama,
        riwayatpenyakit: val.riwayatpenyakit,
        riwayatpenyakitsekarang: val.riwayatpenyakitsekarang,
        riwayatalergi: val.riwayatalergi,
        keteranganalergi: val.keteranganalergi,
        riwayatpengobatan: val.riwayatpengobatan
      }
      const kommatext = val?.riwayatalergi?.split(', ')
      this.selection = kommatext
    },

    initReset () {
      this.form = null
      return new Promise((resolve, reject) => {
        this.form = {
          keluhanutama: '',
          riwayatpenyakit: 'Tidak Ada',
          riwayatpenyakitsekarang: '',
          selection: [],
          keteranganalergi: '',
          riwayatpengobatan: 'Tidak Ada',
          // baru
          riwayatpekerjaan: 'Tidak Ada',
          riwayatpenyakitkeluarga: 'Tidak Ada',
          skreeninggizi: 0,
          asupanmakan: 0,
          kondisikhusus: '',
          skor: 0,

          skorkondisikhusus: 0,
          riwayatbepergian: 'Tidak',

          // baru skornyeri
          skornyeri: 0,
          keteranganskornyeri: 'tidak ada nyeri',
          metode: 'nrt',
          nyerihilang: '',
          aktivitasmobilitas: 'Mandiri',
          aktivitasAlatBnatujalan: 'Tidak',
          kebutuhankomunikasidanedukasi: 'Normal',
          penerjemah: 'Tidak',
          bahasaisyarat: 'Tidak',
          hamabatan: 'Tidak',
          riwayatdemam: 'Tidak',
          berkeringat: 'Tidak',
          obatjangkapanjang: 'Tidak',
          bbturun: 'Tidak',
          pilihnyerihilang: []

        }
        this.selection = []

        resolve()
      })
    },

    keteranganSkorGizi (nilai) {
      const skor = nilai || 0
      if (skor < 2) {
        return 'tidak beresiko malnutrisi'
      }
      else {
        return 'Beresiko malnutrisi'
      }
    }

  }
})
