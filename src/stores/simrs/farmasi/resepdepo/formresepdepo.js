import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'

export const useResepDepoFarmasiStore = defineStore('resep_depo_farmasi_setore', {
  state: () => ({
    isOpen: false,
    loading: false,
    loadingCari: false,
    form: {
      tanggal: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      resep_masuk: date.formatDate(Date.now(), 'HH:mm'),
      resep_keluar: date.formatDate(Date.now(), 'HH:mm')
    },
    params: {
      nama: '',
      nik: '',
      norm: '',
      noreg: '',
      nosep: ''
    },
    notas: [],
    nota: '',
    pasien: {
      // agama: 'Islam',
      // alamat: 'DSN MASJID 01/03 SUMBERLELE - KRAKSAAN KEL Sumberlele RT 001 RW 003 Kraksaan KAB. PROBOLINGGO JAWA TIMUR',
      // datasimpeg: { id: 1085, nip: '091601141649', nik: '3578262808560001', nama: 'dr. UTOYO SUNARYO, Sp.S', kelamin: 'Laki-Laki' },
      // dokter: 'Utoyo Sunaryo, dr. Sp.S',
      // dokterdpjp: 'dr. Utoyo Sunaryo, Sp. S',
      // groups: '1',
      // jenispasien: 'lama',
      // kdunit: null,
      // kelamin: 'Laki-laki',
      // kodedokter: '2',
      // kodedokterdpjp: '14947',
      // kodepoli: 'POL019',
      // kodepolibpjs: 'SAR',
      // kodesistembayar: 'BPJS2',
      // nama: 'Tn.  JABIR ',
      // nama_panggil: 'JABIR',
      // nktp: '3513140205060005',
      // nohp: '085233710265',
      // noka: '0003562652237',
      // noreg: '91582/11/2023/J',
      // norm: '257460',
      // norujukan: '132815011123Y001464',
      // panggil_antrian: 'Poli Syaraf',
      // pendidikan: 'SMU',
      // poli: 'Poli Peny. Saraf',
      // polibpjs: 'SARAF',
      // rs1: '91582/11/2023/J',
      // rs4: '',
      // rs9: '2',
      // sep: '1327R0011123V009230',
      // sistembayar: 'BPJS JAMKESMAS',
      // status: '1',
      // suku: 'Jawa',
      // templahir: 'PROBOLINGGO',
      // tgl_kunjungan: '2023-12-01 08:41:51',
      // tgllahir: '2006-05-02',
      // usia: '17 Tahun 7 Bulan 26 Hari'
    },

    floor: [ // racikan / floor stok
      { kode: 'Gd-03010101' },
      { kode: 'Gd-04010101' }
    ],
    obats: [],
    obatTerpilih: null
  }),
  actions: {
    setForm(key, val) {
      this.form[key] = val
    },
    setParams(key, val) {
      this.params[key] = val
    },
    setPasien(val) {
      console.log('pasien', val)
      if (val) this.pasien = val
      this.isOpen = false
    },
    obatSelected(val) {
      this.setForm('kdobat', val)
      const obat = this.obats.filter(a => a.kdobat === val)
      console.log('obat', obat)
      if (obat.length) {
        // this.obatTerpilih = obat[0]
        this.setForm('satuan_bsr', obat[0].satuan_b)
        this.setForm('satuan_kcl', obat[0].satuan_k)
      }
    },

    clearObat() {
      this.setForm('kdobat', null)
      this.obatTerpilih = null
    },
    getDataObat(val) {
      this.loadingCari = true
      const params = { params: val }
      return new Promise(resolve => {
        api.get('v1/simrs/farmasinew/depo/lihatstokobateresep', params)
          .then(resp => {
            this.loadingCari = false
            this.obats = resp.data?.dataobat
            console.log(resp.data)
            resolve(resp)
          })
          .catch(() => { this.loadingCari = false })
      })
    },
    cariPaseian() {}
  }
})
