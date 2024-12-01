import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'

export const useLaporanOperasionalStore = defineStore('Laporan_Operasional', {
  state: () => ({
    loading: false,
    dialogCetak: false,
    reqs: {
      q: '',
      tgl: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      tglx: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      tahun: date.formatDate(Date.now(), 'YYYY'),
      levelberapa: '',
      jenislo: ''
    },
    display: {
      dari: date.formatDate(Date.now(), 'DD MMMM YYYY'),
      sampai: date.formatDate(Date.now(), 'DD MMMM YYYY'),
      sekarang: date.formatDate(Date.now(), 'DD MMMM YYYY')
    },
    jenis: [
      { nama: 'PP71', value: '1' },
      { nama: 'PSAP 13', value: '2' }
    ],
    level: [
      { nama: 'Akun', value: '1' },
      { nama: 'Kelompok', value: '2' },
      { nama: 'Jenis', value: '3' },
      { nama: 'Objek', value: '4' },
      { nama: 'Rincian Objek', value: '5' },
      { nama: 'SubRincian Objek', value: '6' }
    ],
    pendjasalayanan: [
      { kode: '4.1.04.16.02.0001', uraian: 'Pendapatan BLUD dari Jasa Layanan' }
    ],
    pendhasilkerjasama: [
      { kode: '4.1.04.16.04.0001', uraian: 'Pendapatan BLUD dari Hasil Kerja Sama dengan Pihak Lain' }
    ],
    pendhibah: [
      { kode: '4.1.04.16.03.0001', uraian: 'Pendapatan BLUD dari Hibah Terikat' },
      { kode: '4.1.04.16.03.0002', uraian: 'Pendapatan BLUD dari Hibah Tidak Terikat' }
    ],
    pendjasagiro: [
      { kode: '4.1.04.16.06.0001', uraian: 'Pendapatan BLUD dari Jasa Giro' },
      { kode: '4.1.04.16.06.0002', uraian: 'Pendapatan BLUD dari Pendapatan Bunga' }
    ],
    pendusahalain: [
      { kode: '4.1.04.16.06.0006', uraian: 'Pendapatan BLUD dari Pengembangan Usaha' }
    ],
    bebanpersediaan: [
      { kode: '8.1.02.01', uraian: 'Beban Barang' }
    ],
    bebanjasa: [
      { kode: '8.1.02.02', uraian: 'Beban Jasa' }
    ],
    bebanpemeliharaan: [
      { kode: '8.1.02.03', uraian: 'Beban Pemeliharaan' }
    ],
    bebanperdin: [
      { kode: '8.1.02.04', uraian: 'Beban Perjalanan Dinas' }
    ],
    bebanpenyusutan: [
      { kode: '8.1.08.01', uraian: 'Beban Penyusutan Peralatan dan Mesin' },
      { kode: '8.1.08.02', uraian: 'Beban Penyusutan Gedung dan Bangunan' },
      { kode: '8.1.08.03', uraian: 'Beban Penyusutan Jalan, Jaringan dan Irigasi' },
      { kode: '8.1.08.04', uraian: 'Beban Penyusutan Aset Tetap Lainnya' },
      { kode: '8.1.08.05', uraian: 'Beban Penyusutan Aset Lainnya - Kemitraan dengan Pihak Ketiga' },
      { kode: '8.1.08.07', uraian: 'Beban Penyusutan Aset Lainnya - Aset Lain - Lain' }
    ],
    bebanamortisasi: [
      { kode: '8.1.02.06', uraian: 'Beban Amortisasi Aset Lainnya - Aset Tidak Berwujud' }
    ],
    bebanpenyisihanpiutang: [
      { kode: '8.1.07.01', uraian: 'Beban Penyisihan Piutang Pajak Daerah' },
      { kode: '8.1.07.02', uraian: 'Beban Penyisihan Piutang Retribusi Daerah' },
      { kode: '8.1.07.03', uraian: 'Beban Penyisihan Piutang Hasil Pengelolaan Kekayaan Daerah yang Dipisahkan' },
      { kode: '8.1.07.04', uraian: 'Beban Penyisihan Piutang Lain - Lain PAD yang Sah' },
      { kode: '8.1.07.05', uraian: 'Beban Penyisihan Piutang Transfer Pemerintah Pusat' },
      { kode: '8.1.07.06', uraian: 'Beban Penyisihan Piutang Transfer Antar Daerah' },
      { kode: '8.1.07.07', uraian: 'Beban Penyisihan Piutang Lainnya' }
    ],
    datapendapatans: [],
    databebans: [],
    hasilpendapatan: [],
    hasilbeban: [],

    psaprealisasipendapatan: [],
    psaprealisasipendapatanx: [],
    psapbebanpegawai: [],
    psapbebanlain: [],
    psappenjualanaset: [],
    psapkerugian: [],
    psapnonope: [],
    psappendapatanluarbiasa: [],
    bebanluarbiasa: [],

    psappendapatan: [],
    psapbeban: [],
    psapnonoperasional: [],
    psapbebanluarbiasa: []
  }),
  actions: {
    setParameter (key, val) {
      this.reqs[key] = val
    },
    // emptyForm () {
    //   this.reqs.levelberapa = ''
    // },

    getDataLap () {
      this.loading = true
      const params = { params: this.reqs }
      return new Promise((resolve) => {
        api.get('v1/laporan/lapoperasional/getlo', params).then((resp) => {
          console.log('data LO', resp.data)
          if (resp.status === 200) {
            // this.hasilpendapatan = []
            // this.hasilbeban = []
            // this.psappendapatan = []
            // this.psapbeban = []
            // this.psapnonoperasional = []
            // this.psapbebanluarbiasa = []

            this.datapendapatans = resp.data.pendapatan
            this.databebans = resp.data.beban

            this.psaprealisasipendapatan = resp.data.psaprealisasipendapatan
            this.psaprealisasipendapatanx = resp.data.psaprealisasipendapatanx
            this.psapbebanpegawai = resp.data.psapbebanpegawai
            this.psapbebanlain = resp.data.psapbebanlain
            this.psappenjualanaset = resp.data.psappenjualanaset
            this.psapkerugian = resp.data.psapkerugian
            this.psapnonope = resp.data.psapnonoperasional
            this.psappendapatanluarbiasa = resp.data.psappendapatanluarbiasa
            this.bebanluarbiasa = resp.data.psapbebanluarbiasa
            this.mapData()

            this.loading = false
            resolve(resp.data)
          }
        }).catch(() => { this.loading = false })
      })
    },
    mapData () {
      const pendapatan = this.datapendapatans
      const kode6 = []
      const kode5 = []
      const kode4 = []
      const kode3 = []
      const kode2 = []
      const kode1 = []
      for (let i = 0; i < pendapatan.length; i++) {
        const el = pendapatan[i]
        const nilaip = el?.penyesuaian.map(x => parseFloat(x.totalpenyesuaian)).reduce((a, b) => a + b, 0)
        // console.log('nilaip', nilaip)
        const obj6 = {
          kode: el?.kode6,
          uraian: el?.uraian,
          nilai: parseFloat(el?.subtotal) + parseFloat(nilaip)
        }
        const obj5 = {
          kode: el?.kode5,
          uraian: el?.lvl5?.uraian,
          nilai: parseFloat(el?.subtotal) + parseFloat(nilaip)
        }
        const obj4 = {
          kode: el?.kode4,
          uraian: el?.lvl4?.uraian,
          nilai: parseFloat(el?.subtotal) + parseFloat(nilaip)
        }
        const obj3 = {
          kode: el?.kode3,
          uraian: el?.lvl3?.uraian,
          nilai: parseFloat(el?.subtotal) + parseFloat(nilaip)
        }
        const obj2 = {
          kode: el?.kode2,
          uraian: el?.lvl2?.uraian,
          nilai: parseFloat(el?.subtotal) + parseFloat(nilaip)
        }
        const obj1 = {
          kode: el?.kode1,
          uraian: el?.lvl1?.uraian,
          nilai: parseFloat(el?.subtotal) + parseFloat(nilaip)
        }
        // console.log('obj1', obj1)
        kode6.push(obj1, obj2, obj3, obj4, obj5, obj6)
        kode5.push(obj1, obj2, obj3, obj4, obj5)
        kode4.push(obj1, obj2, obj3, obj4)
        kode3.push(obj1, obj2, obj3)
        kode2.push(obj1, obj2)
        kode1.push(obj1)
      }

      const beban = this.databebans
      const beban6 = []
      const beban5 = []
      const beban4 = []
      const beban3 = []
      const beban2 = []
      const beban1 = []

      for (let i = 0; i < beban.length; i++) {
        const el = beban[i]
        const obj6 = {
          kode: el?.kode6,
          uraian: el?.uraian,
          nilai: parseFloat(el?.subtotalx)
        }
        beban6.push(obj6)
      }

      const fil5 = beban.map((x) => x.kode5)
      const unik5 = fil5.length ? [...new Set(fil5)] : []
      for (let i = 0; i < unik5.length; i++) {
        const el = unik5[i]
        const obj = {
          kode: beban.filter((x) => x.kode5 === el)[0].kode5,
          uraian: beban.filter((x) => x.kode5 === el).map((x) => x.lvl5)[0]?.uraian,
          nilai: beban.filter((x) => x.kode5 === el)?.map((x) => parseFloat(x.subtotalx)).reduce((a, b) => a + b, 0)
        }
        beban5.push(obj)
      }

      const fil4 = beban.map((x) => x.kode4)
      const unik4 = fil4.length ? [...new Set(fil4)] : []
      for (let i = 0; i < unik4.length; i++) {
        const el = unik4[i]
        const obj = {
          kode: beban.filter((x) => x.kode4 === el)[0].kode4,
          uraian: beban.filter((x) => x.kode4 === el).map((x) => x.lvl4)[0]?.uraian,
          nilai: beban.filter((x) => x.kode4 === el)?.map((x) => parseFloat(x.subtotalx)).reduce((a, b) => a + b, 0)
        }
        beban4.push(obj)
      }

      const fil3 = beban.map((x) => x.kode3)
      const unik3 = fil3.length ? [...new Set(fil3)] : []
      for (let i = 0; i < unik3.length; i++) {
        const el = unik3[i]
        const obj = {
          kode: beban.filter((x) => x.kode3 === el)[0].kode3,
          uraian: beban.filter((x) => x.kode3 === el).map((x) => x.lvl3)[0]?.uraian,
          nilai: beban.filter((x) => x.kode3 === el)?.map((x) => parseFloat(x.subtotalx)).reduce((a, b) => a + b, 0)
        }
        beban3.push(obj)
      }

      const fil2 = beban.map((x) => x.kode2)
      const unik2 = fil2.length ? [...new Set(fil2)] : []
      for (let i = 0; i < unik2.length; i++) {
        const el = unik2[i]
        const obj = {
          kode: beban.filter((x) => x.kode2 === el)[0].kode2,
          uraian: beban.filter((x) => x.kode2 === el).map((x) => x.lvl2)[0]?.uraian,
          nilai: beban.filter((x) => x.kode2 === el)?.map((x) => parseFloat(x.subtotalx)).reduce((a, b) => a + b, 0)
        }
        beban2.push(obj)
      }

      const fil1 = beban.map((x) => x.kode1)
      const unik1 = fil1.length ? [...new Set(fil1)] : []
      for (let i = 0; i < unik1.length; i++) {
        const el = unik1[i]
        const obj = {
          kode: beban.filter((x) => x.kode1 === el)[0].kode1,
          uraian: beban.filter((x) => x.kode1 === el).map((x) => x.lvl1)[0]?.uraian,
          nilai: beban.filter((x) => x.kode1 === el)?.map((x) => parseFloat(x.subtotalx)).reduce((a, b) => a + b, 0)
        }
        beban1.push(obj)
      }

      beban6.push(...beban1, ...beban2, ...beban3, ...beban4, ...beban5)
      const sortBeban6 = (beban6) =>
        beban6.sort(({ kode: a }, { kode: b }) =>
          a < b ? -1 : a > b ? 1 : 0
        )
      const level6 = sortBeban6(beban6)
      console.log('level6', level6)

      beban5.push(...beban1, ...beban2, ...beban3, ...beban4)
      const sortBeban5 = (beban5) =>
        beban5.sort(({ kode: a }, { kode: b }) =>
          a < b ? -1 : a > b ? 1 : 0
        )
      const level5 = sortBeban5(beban5)
      console.log('level5', level5)

      beban4.push(...beban1, ...beban2, ...beban3)
      const sortBeban4 = (beban4) =>
        beban4.sort(({ kode: a }, { kode: b }) =>
          a < b ? -1 : a > b ? 1 : 0
        )
      const level4 = sortBeban4(beban4)
      console.log('level4', level4)

      beban3.push(...beban1, ...beban2)
      const sortBeban3 = (beban3) =>
        beban3.sort(({ kode: a }, { kode: b }) =>
          a < b ? -1 : a > b ? 1 : 0
        )
      const level3 = sortBeban3(beban3)
      console.log('level3', level3)

      beban2.push(...beban1)
      const sortBeban2 = (beban2) =>
        beban2.sort(({ kode: a }, { kode: b }) =>
          a < b ? -1 : a > b ? 1 : 0
        )
      const level2 = sortBeban2(beban2)
      console.log('level2', level2)

      const psappendapatan = []
      const realpostingotom = this.psaprealisasipendapatan
      const realju = this.psaprealisasipendapatanx
      const gabung = realpostingotom.concat(realju)

      // PSAP 13 DATA PENDAPATAN JASA LAYANAN //
      const filterjs = this.pendjasalayanan?.map((x) => x.kode)
      const filpagujs = gabung.filter(x => filterjs.includes(x.kode)).map((x) => x.kode)
      const unikfilpagujs = filpagujs.length ? [...new Set(filpagujs)] : []
      const realisasi = realpostingotom.filter(x => filterjs.includes(x.kode)).map((x) => parseFloat(x.realisasi)).reduce((a, b) => a + b, 0).toFixed(2)
      const realisasix = realju.map((x) => parseFloat(x.realisasix)).reduce((a, b) => a + b, 0).toFixed(2)
      const jasalayanan = {
        kode: unikfilpagujs[0],
        uraian: 'Pendapatan Jasa Layanan dari Masyarakat',
        realisasi: isNaN(parseFloat(realisasi - realisasix)) ? parseFloat(0).toFixed(2) : parseFloat(realisasi - realisasix)
      }

      // PSAP 13 DATA PENDAPATAN KERJA SAMA //
      const filterks = this.pendhasilkerjasama?.map((x) => x.kode)
      const filks = gabung.filter(x => filterks.includes(x.kode)).map((x) => x.kode)
      const unikfilks = filks.length ? [...new Set(filks)] : []
      const realks = realju.filter(x => filks.includes(x.kode)).map((x) => parseFloat(x.realisasix)).reduce((a, b) => a + b, 0).toFixed(2)
      const hslkerjasama = {
        kode: unikfilks[0],
        uraian: 'Pendapatan Hasil Kerja Sama',
        realisasi: isNaN(parseFloat(realks)) ? parseFloat(0).toFixed(2) : parseFloat(realks)
      }

      // PSAP 13 DATA PENDAPATAN HIBAH //
      const filterhb = this.pendhibah?.map((x) => x.kode)
      const filhb = gabung.filter(x => filterhb.includes(x.kode)).map((x) => x.kode)
      const unikfilhb = filhb.length ? [...new Set(filhb)] : []
      const realhb = realju.filter(x => filhb.includes(x.kode)).map((x) => parseFloat(x.realisasix)).reduce((a, b) => a + b, 0).toFixed(2)
      const hslhibah = {
        kode: unikfilhb,
        uraian: 'Pendapatan Hibah',
        realisasi: isNaN(parseFloat(realhb)) ? parseFloat(0).toFixed(2) : parseFloat(realhb)
      }

      // PSAP 13 DATA PENDAPATAN JASA GIRO //
      const filtergiro = this.pendjasagiro.map((x) => x.kode)
      const filgiro = gabung.filter(x => filtergiro.includes(x.kode)).map((x) => x.kode)
      const unikgiro = filgiro.length ? [...new Set(filgiro)] : []
      const realgiro = realju.filter(x => filgiro.includes(x.kode)).map((x) => parseFloat(x.realisasix)).reduce((a, b) => a + b, 0).toFixed(2)
      const hslgiro = {
        kode: unikgiro,
        uraian: 'Pendapatan Jasa Giro / Bunga Bank',
        realisasi: isNaN(parseFloat(realgiro)) ? parseFloat(0).toFixed(2) : parseFloat(realgiro)
      }

      // PSAP 13 DATA PENDAPATAN USAHA LAINNYA //
      const filterlainya = this.pendusahalain.map((x) => x.kode)
      const fillainnya = gabung.filter(x => filterlainya.includes(x.kode)).map((x) => x.kode)
      const uniklainnya = fillainnya.length ? [...new Set(fillainnya)] : []
      const reallainnya = realju.filter(x => fillainnya.includes(x.kode)).map((x) => parseFloat(x.realisasix)).reduce((a, b) => a + b, 0).toFixed(2)
      const hsllainnya = {
        kode: uniklainnya,
        uraian: 'Pendapatan Usaha Lainnya',
        realisasi: isNaN(parseFloat(reallainnya)) ? parseFloat(0).toFixed(2) : parseFloat(reallainnya)
      }
      psappendapatan.push(jasalayanan, hslkerjasama, hslhibah, hslgiro, hsllainnya)

      const bebanpsap = []
      const bpegawai = this.psapbebanpegawai
      for (let i = 0; i < bpegawai.length; i++) {
        const el = bpegawai.map((x) => {
          return {
            kode: x.kode,
            uraian: x.uraian,
            realisasi: parseFloat(x.realisasi)
          }
        })

        bebanpsap.push(...el)
      }

      const bebanlain = this.psapbebanlain
      const filla = this.bebanpersediaan?.map((x) => x.kode)
      const kodeuniks = bebanlain.filter(x => filla.includes(x.kode)).map((x) => x.kode)
      const uniks = kodeuniks.length ? [...new Set(kodeuniks)] : []
      const realisasipersed = bebanlain.filter(x => filla.includes(x.kode)).map((x) => parseFloat(x.realisasi)).reduce((a, b) => a + b, 0)
      const psappersediaan = {
        kode: uniks,
        uraian: 'Beban Persediaan',
        realisasi: realisasipersed
      }

      const fillb = this.bebanjasa?.map((x) => x.kode)
      const kodeuniksb = bebanlain.filter(x => fillb.includes(x.kode)).map((x) => x.kode)
      const unikskode = kodeuniksb.length ? [...new Set(kodeuniksb)] : []
      const realisasijasa = bebanlain.filter(x => fillb.includes(x.kode)).map((x) => parseFloat(x.realisasi)).reduce((a, b) => a + b, 0)
      const psapjasa = {
        kode: unikskode,
        uraian: 'Beban Jasa',
        realisasi: realisasijasa
      }
      const fillc = this.bebanpemeliharaan?.map((x) => x.kode)
      const kodeuniksc = bebanlain.filter(x => fillc.includes(x.kode)).map((x) => x.kode)
      const unikskodec = kodeuniksc.length ? [...new Set(kodeuniksc)] : []
      const realisasipemeliharaan = bebanlain.filter(x => fillc.includes(x.kode)).map((x) => parseFloat(x.realisasi)).reduce((a, b) => a + b, 0)
      const psappemeliharaan = {
        kode: unikskodec,
        uraian: 'Beban Pemeliharaan',
        realisasi: realisasipemeliharaan
      }
      const filld = this.bebanperdin?.map((x) => x.kode)
      const kodeuniksd = bebanlain.filter(x => filld.includes(x.kode)).map((x) => x.kode)
      const unikskoded = kodeuniksd.length ? [...new Set(kodeuniksd)] : []
      const realisasiperdin = bebanlain.filter(x => filld.includes(x.kode)).map((x) => parseFloat(x.realisasi)).reduce((a, b) => a + b, 0)
      const psapperdin = {
        kode: unikskoded,
        uraian: 'Beban Perjalanan Dinas',
        realisasi: realisasiperdin
      }
      const fille = this.bebanpenyusutan?.map((x) => x.kode)
      const kodeunikse = bebanlain.filter(x => fille.includes(x.kode)).map((x) => x.kode)
      const unikskodee = kodeunikse.length ? [...new Set(kodeunikse)] : []
      const realisasipenyusutan = bebanlain.filter(x => fille.includes(x.kode)).map((x) => parseFloat(x.realisasi)).reduce((a, b) => a + b, 0)
      const psappenyusutan = {
        kode: unikskodee,
        uraian: 'Beban Penyusutan',
        realisasi: realisasipenyusutan
      }
      const fillf = this.bebanamortisasi?.map((x) => x.kode)
      const kodeuniksf = bebanlain.filter(x => fillf.includes(x.kode)).map((x) => x.kode)
      const unikskodef = kodeuniksf.length ? [...new Set(kodeuniksf)] : []
      const realisasiamortisasi = bebanlain.filter(x => fillf.includes(x.kode)).map((x) => parseFloat(x.realisasi)).reduce((a, b) => a + b, 0)
      const psapamortisasi = {
        kode: unikskodef,
        uraian: 'Beban Amortisasi',
        realisasi: realisasiamortisasi
      }
      const fillg = this.bebanamortisasi?.map((x) => x.kode)
      const kodeuniksg = bebanlain.filter(x => fillg.includes(x.kode)).map((x) => x.kode)
      const unikskodeg = kodeuniksg.length ? [...new Set(kodeuniksg)] : []
      const realisasipenyisihan = bebanlain.filter(x => fillg.includes(x.kode)).map((x) => parseFloat(x.realisasi)).reduce((a, b) => a + b, 0)
      const psapapenyisihan = {
        kode: unikskodeg,
        uraian: 'Beban Penyisihan Piutang',
        realisasi: realisasipenyisihan
      }

      bebanpsap.push(psappersediaan, psapjasa, psappemeliharaan, psapperdin,
        psappenyusutan, psapamortisasi, psapapenyisihan)

      const nonoperasional = []
      const pjualaset = []
      const penjualanasset = this.psappenjualanaset
      for (let i = 0; i < penjualanasset.length; i++) {
        const el = penjualanasset.map((x) => {
          return {
            kode: x.kode,
            uraian: 'Surplus/Defisit Penjualan Aset Non Lancar',
            realisasi: parseFloat(x.realisasi)
          }
        })
        pjualaset.push(...el)
      }

      const psapkerugian = []
      const kerugian = this.psapkerugian
      for (let i = 0; i < kerugian.length; i++) {
        const el = kerugian.map((x) => {
          return {
            kode: x.kode,
            uraian: '(Kerugian) Penurunan Nilai Aset',
            realisasi: parseFloat(x.realisasi)
          }
        })
        psapkerugian.push(...el)
      }
      // const psapnonoper = []
      const nonoper = this.psapnonope
      const objnonoper = {
        kode: nonoper.map((x) => x.kode),
        uraian: 'Surplus/Defisit dari Kegiatan Non Operasional Lainnya',
        realisasi: nonoper.map((x) => parseFloat(x.realisasi)).reduce((a, b) => a + b, 0)
      }
      nonoperasional.push(...pjualaset, ...psapkerugian, objnonoper)

      const bebanluarbiasa = []
      const pendluarbiasa = this.psappendapatanluarbiasa
      for (let i = 0; i < pendluarbiasa.length; i++) {
        const el = pendluarbiasa.map((x) => {
          return {
            kode: x.kode,
            uraian: 'Pendapatan Luar Biasa',
            realisasi: parseFloat(x.realisasi)
          }
        })
        bebanluarbiasa.push(...el)
      }

      const bbluarbiasa = this.bebanluarbiasa
      const objbebanlb = {
        kode: bbluarbiasa.map((x) => x.kode),
        uraian: 'Beban Luar Biasa',
        realisasi: bbluarbiasa.map((x) => parseFloat(x.realisasi)).reduce((a, b) => a + b, 0)
      }
      bebanluarbiasa.push(objbebanlb)

      if (this.reqs.levelberapa === 6) {
        this.hasilpendapatan = kode6
        this.hasilbeban = beban6
      }
      else if (this.reqs.levelberapa === 5) {
        this.hasilpendapatan = kode5
        this.hasilbeban = beban5
      }
      else if (this.reqs.levelberapa === 4) {
        this.hasilpendapatan = kode4
        this.hasilbeban = beban4
      }
      else if (this.reqs.levelberapa === 3) {
        this.hasilpendapatan = kode3
        this.hasilbeban = beban3
      }
      else if (this.reqs.levelberapa === 2) {
        this.hasilpendapatan = kode2
        this.hasilbeban = beban2
      }
      else if (this.reqs.jenislo === 2) {
        this.psappendapatan = psappendapatan
        this.psapbeban = bebanpsap
        this.psapnonoperasional = nonoperasional
        this.psapbebanluarbiasa = bebanluarbiasa
        console.log('psappendapatan', this.psappendapatan)
        console.log('psapbeban', this.psapbeban)
        console.log('nonoperasional', this.psapnonoperasional)
        console.log('psapbbluarbiasa', this.psapbebanluarbiasa)
      }
      else {
        this.hasilpendapatan = kode1
        this.hasilbeban = beban1
      }
    }
  }
})
