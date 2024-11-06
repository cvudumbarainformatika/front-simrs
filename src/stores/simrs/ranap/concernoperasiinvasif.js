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
      diagnosis: null,
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
      ttdPetugas: null,
      ttdPasien: null,

      hubunganDgPasien: 'Diri Sendiri',
      keluarga: null,
      nama: null,
      lp: null,
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
      kdSaksiRs: null,
      saksiPasien: null,
      ygMenyatakan: null,
      setuju: 'Iya'
    },
    dokters: [],
    perawats: [],
    nonNakes: [],

    loadingOrder: false,
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
    loading: false

  }),
  // getters: {
  //   doubleCount: (state) => state.counter * 2
  // },
  actions: {

    async saveData (pasien) {
      if (!pasien?.kodedokter) {
        return notifErrVue('kode Dokter masih kosong, silahkan tutup dulu pasien ini kemudian tekan tombol refresh di pojok kanan atas')
      }
      this.loadingOrder = true

      this.form.noreg = pasien?.noreg
      this.form.norm = pasien?.norm
      this.form.kodepoli = pasien?.kodepoli
      this.form.kodesistembayar = pasien?.kodesistembayar
      this.form.kdgroup_ruangan = pasien?.kdgroup_ruangan
      this.form.kelas_ruangan = pasien?.kelas_ruangan

      console.log('form', this.form)

      const storeRanap = usePengunjungRanapStore()
      storeRanap.injectDataPasien(pasien?.noreg, this.form, 'konsultasi')

      try {
        const resp = await api.post('v1/simrs/ranap/layanan/konsultasi/simpandata', this.form)
        console.log('save permintaan konsultasi', resp.data)
        if (resp.status === 200) {
          storeRanap.deleteInjectanNull2(pasien?.noreg, 'konsultasi')
          const isi = resp?.data?.result
          storeRanap.injectDataPasien(pasien?.noreg, isi, 'konsultasi')
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

    async hapusPermintaan (pasien, id) {
      this.loadingHapus = true

      if (!id) {
        return notifErrVue('Tidak dapat dihapus')
      }

      const payload = { noreg: pasien?.noreg, id }
      try {
        const resp = await api.post('v1/simrs/ranap/layanan/konsultasi/hapusdata', payload)
        this.loadingHapus = false
        // console.log(resp)
        if (resp.status === 200) {
          // const storePasien = usePengunjungPoliStore()
          const storeRanap = usePengunjungRanapStore()
          // storePasien.hapusDataFisio(pasien, id)
          storeRanap.hapusDataInjectan(pasien, id, 'konsultasi')
          notifSuccess(resp)
        }
      }
      catch (error) {
        this.loadingHapus = false
        // console.log(error)
      }
    },

    initReset () {
      const hariIni = date.formatDate(Date.now(), 'YYYY-MM-DD')
      this.form = {
        tanggal: hariIni,
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
        kdSaksiRs: null,
        saksiPasien: null,
        ygMenyatakan: null,
        setuju: 'Iya'
      }

      const pengunjung = usePengunjungRanapStore()
      this.dokters = pengunjung?.nakes?.filter(x => x?.kdgroupnakes === '1') ?? []
      this.perawats = pengunjung?.nakes?.filter(x => x?.kdgroupnakes === '2' || x?.kdgroupnakes === '3') ?? []
      this.nonNakes = pengunjung?.nonNakes

      return new Promise((resolve, reject) => {
        resolve()
      })
    }
  }
})
