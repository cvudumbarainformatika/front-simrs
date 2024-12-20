import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'

export const useNeracaStore = defineStore('Neraca_Akuntansi', {
  state: () => ({
    loading: false,
    dialogCetak: false,
    exportExcel: false,
    loadingDownload: false,
    reqs: {
      q: '',
      page: 1,
      tgl: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      tglx: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      tahun: date.formatDate(Date.now(), 'YYYY')
    },
    display: {
      dari: date.formatDate(Date.now(), 'DD MMMM YYYY'),
      sampai: date.formatDate(Date.now(), 'DD MMMM YYYY'),
      sekarang: date.formatDate(Date.now(), 'DD MMMM YYYY')
    },
    reqpersediaan: [
      { uraian: 'Penyisihan Piutang', kode: '1.1.10' },
      { uraian: 'Persediaan', kode: '1.1.12' }
    ],
    reqinves: [
      { uraian: 'Investasi Jangka Panjang Non Permanen', kode: '1.2.01' },
      { uraian: 'Investasi Jangka Panjang Permanen', kode: '1.2.02' }
    ],
    reqasettetap: [
      { uraian: 'Tanah', kode: '1.3.01' },
      { uraian: 'Peralatan dan Mesin', kode: '1.3.02' },
      { uraian: 'Gedung dan Bangunan', kode: '1.3.03' },
      { uraian: 'Jalan, Jaringan, dan Irigasi', kode: '1.3.04' },
      { uraian: 'aset Tetap Lainnya', kode: '1.3.05' },
      { uraian: 'Konstruksi Dalam Pengerjaan', kode: '1.3.06' },
      { uraian: 'Akumulasi Penyusutan', kode: '1.3.07' },
      { uraian: 'aset Konsesi Jasa', kode: '1.3.08' },
      { uraian: 'Akumulasi Penyusutan aset Konsesi Jasa', kode: '1.3.09' }
    ],
    reqasetlain: [
      { uraian: 'aset Tidak Berwujud', kode: '1.5.03' },
      { uraian: 'aset Lain - lain', kode: '1.5.04' },
      { uraian: 'Akumulasi Amortisasi aset Tidak Berwujud', kode: '1.5.05' },
      { uraian: 'Akumulasi Penyusutan aset Lainnya', kode: '1.5.06' }
    ],
    reqekuitas: [
      { uraian: 'Ekuitas', kode: '3.1.01' },
      { uraian: 'RK PPKD', kode: '3.1.03' }
    ],
    requtngjgkpanjang: [
      { uraian: 'Utang kepada Pemerintah Pusat', kode: '2.2.01' },
      { uraian: 'Utang kepada Lembaga Keuangan Bank (LKB)', kode: '2.2.02' },
      { uraian: 'Utang kepada Lembaga Keuangan Bukan Bank (LKBB)', kode: '2.2.03' },
      { uraian: 'Utang kepada Masyarakat', kode: '2.2.04' },
      { uraian: 'Kewajiban Konsesi Jasa', kode: '2.2.05' }
    ],
    requtang: [
      { uraian: 'Pendapatan Diterima Dimuka', kode: '2.1.05' },
      { uraian: 'Utang Belanja', kode: '2.1.06' },
      { uraian: 'Utang Jangka Pendek Lainnya', kode: '2.1.07' }
    ],
    setarakas: [],
    retribusi: [],
    piutang: [],
    piutanglain: [],
    penyisihanpiutang: [],
    persediaan: [],
    // investasi: [],
    aset: [],
    asetlainnya: [],
    utang: [],
    // utangjkpanjang: [],
    // ekuitas: [],

    objsetarakas: [],
    objretribusi: [],
    objpiutang: [],
    objpenyisihan: [],
    objpersediaan: [],
    objinvestasi: [],
    objasettetap: [],
    objasetlainnya: [],
    objutang: [],
    objutangjkpanjang: [],
    objekuitas: []
  }),
  actions: {
    setParameter (key, val) {
      this.reqs[key] = val
    },
    getDataNeraca () {
      this.loading = true
      const params = { params: this.reqs }
      return new Promise((resolve) => {
        api.get('v1/akuntansi/neraca/getneraca', params).then((resp) => {
          console.log('getData NERACA', resp?.data)
          if (resp.status === 200) {
            this.setarakas = resp.data?.setarakas
            this.piutang = resp.data?.piutang
            this.piutanglain = resp.data?.piutanglain
            this.persediaan = resp.data?.persediaan
            // this.investasi = resp.data?.investasi
            this.aset = resp.data?.aset
            this.asetlainnya = resp.data?.asetlainnya
            this.utang = resp.data?.utang
            // this.utangjkpanjang = resp.data?.utangjkpanjang
            // this.ekuitas = resp.data?.ekuitas
            // const coba = this.asetlainnya.map((x) => x.kodex)
            // const unik = coba.length ? [...new Set(coba)] : []
            // console.log('set', unik)

            const objsetarakas = []
            for (let i = 0; i < this.setarakas.length; i++) {
              const el = this.setarakas[i]
              const saldoawal = el?.saldoawal.map((x) => parseFloat(x.saldo)).reduce((a, b) => a + b, 0)
              const jurnal = el?.jurnalotom.map((x) => parseFloat(x.totaljurnal)).reduce((a, b) => a + b, 0)
              const penyesuaian = el?.penyesuaianx.map((x) => parseFloat(x.totalpenyesuaian)).reduce((a, b) => a + b, 0)
              const obj = {
                kode: el.kodeall3,
                uraian: el.uraian,
                nilai: saldoawal + jurnal + penyesuaian
              }
              objsetarakas.push(obj)
            }

            const objretri = []
            for (let i = 0; i < this.retribusi.length; i++) {
              const el = this.retribusi[i]
              const saldoawal = el?.saldoawal.map((x) => parseFloat(x.saldo)).reduce((a, b) => a + b, 0)
              const jurnal = el?.jurnalotom.map((x) => parseFloat(x.totaljurnal)).reduce((a, b) => a + b, 0)
              const penyesuaian = el?.penyesuaianx.map((x) => parseFloat(x.totalpenyesuaian)).reduce((a, b) => a + b, 0)
              const retribusi = {
                kode: '1.1.04',
                uraian: 'Piutang Retribusi Daerah',
                nilai: saldoawal + jurnal + penyesuaian
              }
              objretri.push(retribusi)
            }
            const objretribusi = {
              kode: '1.1.04',
              uraian: 'Piutang Retribusi Daerah',
              nilai: objretri.map((x) => x.nilai).reduce((a, b) => a + b, 0)
            }

            const objx = []
            for (let i = 0; i < this.piutang.length; i++) {
              const el = this.piutang[i]
              const saldoawal = el?.saldoawal.map((x) => parseFloat(x.saldo)).reduce((a, b) => a + b, 0)
              const jurnal = el?.jurnalotom.map((x) => parseFloat(x.totaljurnal)).reduce((a, b) => a + b, 0)
              const penyesuaian = el?.penyesuaianx.map((x) => parseFloat(x.totalpenyesuaian)).reduce((a, b) => a + b, 0)
              const piutang = {
                kode: '1.1.06.16',
                uraian: 'Piutang Pendapatan BLUD',
                nilai: saldoawal + jurnal + penyesuaian
              }
              objx.push(piutang)
            }
            for (let i = 0; i < this.piutanglain.length; i++) {
              const el = this.piutanglain[i]
              const saldoawal = el?.saldoawal.map((x) => parseFloat(x.saldo)).reduce((a, b) => a + b, 0)
              const jurnal = el?.jurnalotom.map((x) => parseFloat(x.totaljurnal)).reduce((a, b) => a + b, 0)
              const penyesuaian = el?.penyesuaianx.map((x) => parseFloat(x.totalpenyesuaian)).reduce((a, b) => a + b, 0)
              const obj = {
                kode: '1.1.06.00',
                uraian: 'Piutang Pendapatan lain-lain',
                nilai: saldoawal + jurnal + penyesuaian
              }
              objx.push(obj)
            }
            const objpiutang = []
            const set = objx.map((x) => x.kode)
            const setunik = set.length ? [...new Set(set)] : []
            for (let i = 0; i < setunik.length; i++) {
              const el = setunik[i]
              const obj = {
                kode: objx.filter((x) => x.kode === el)[0]?.kode,
                uraian: objx.filter((x) => x.kode === el)[0]?.uraian,
                nilai: objx.filter((x) => x.kode === el).map((x) => x.nilai).reduce((a, b) => a + b, 0)
              }
              objpiutang.push(obj)
            }

            // const objp = []
            // for (let i = 0; i < this.penyisihanpiutang.length; i++) {
            //   const el = this.penyisihanpiutang[i]
            //   const saldoawal = el?.saldoawal.map((x) => parseFloat(x.saldo)).reduce((a, b) => a + b, 0)
            //   const jurnal = el?.jurnalotom.map((x) => parseFloat(x.totaljurnal)).reduce((a, b) => a + b, 0)
            //   const penyesuaian = el?.penyesuaianx.map((x) => parseFloat(x.totalpenyesuaian)).reduce((a, b) => a + b, 0)
            //   const penyisihan = {
            //     kode: '1.1.10',
            //     uraian: 'Penyisihan Piutang',
            //     nilai: saldoawal + jurnal + penyesuaian
            //   }
            //   objp.push(penyisihan)
            // }
            // const objpenyisihan = {
            //   kode: '1.1.10',
            //   uraian: 'Penyisihan Piutang',
            //   nilai: objp.map((x) => x.nilai).reduce((a, b) => a + b, 0)
            // }

            const objpersediaan = []
            const setpersedian = this.reqpersediaan.map((x) => x.kode)
            const filpersediaan = this.aset.filter(x => setpersedian.includes(x.kodex)).map((x) => x.kodex)
            const setunikpersd = filpersediaan.length ? [...new Set(filpersediaan)] : []
            for (let i = 0; i < setunikpersd.length; i++) {
              const el = setunikpersd[i]
              const saldoawal = this.aset.filter((x) => x.kodex === el).map((x) => x.saldoawal.map((x) => parseFloat(x.saldo)).reduce((a, b) => a + b, 0)).reduce((a, b) => a + b, 0)
              const jurnal = this.aset.filter((x) => x.kodex === el).map((x) => x.jurnalotom.map((x) => parseFloat(x.totaljurnal)).reduce((a, b) => a + b, 0)).reduce((a, b) => a + b, 0)
              const penyesuaian = this.aset.filter((x) => x.kodex === el).map((x) => x.penyesuaianx.map((x) => parseFloat(x.totalpenyesuaian)).reduce((a, b) => a + b, 0)).reduce((a, b) => a + b, 0)

              const persediaan = {
                kode: this.aset.filter((x) => x.kodex === el)[0]?.kodex,
                uraian: this.aset.filter((x) => x.kodex === el).map((x) => x.kode3)[0]?.uraian,
                nilai: saldoawal + jurnal + penyesuaian
              }
              objpersediaan.push(persediaan)
            }
            console.log('persed', objpersediaan)

            // const objpersediaan = {
            //   kode: '1.1.12',
            //   uraian: 'Persediaan',
            //   nilai: objp.map((x) => x.nilai).reduce((a, b) => a + b, 0)
            // }

            const objinv = []
            const setinv = this.reqinves.map((x) => x.kode)
            const filinves = this.aset.filter(x => setinv.includes(x.kodex)).map((x) => x.kodex)
            const setunikinves = filinves.length ? [...new Set(filinves)] : []
            for (let i = 0; i < setunikinves.length; i++) {
              const el = setunikinves[i]
              const saldoawal = this.aset.filter((x) => x.kodex === el).map((x) => x.saldoawal.map((x) => parseFloat(x.saldo)).reduce((a, b) => a + b, 0)).reduce((a, b) => a + b, 0)
              const jurnal = this.aset.filter((x) => x.kodex === el).map((x) => x.jurnalotom.map((x) => parseFloat(x.totaljurnal)).reduce((a, b) => a + b, 0)).reduce((a, b) => a + b, 0)
              const penyesuaian = this.aset.filter((x) => x.kodex === el).map((x) => x.penyesuaianx.map((x) => parseFloat(x.totalpenyesuaian)).reduce((a, b) => a + b, 0)).reduce((a, b) => a + b, 0)

              const investasi = {
                kode: this.aset.filter((x) => x.kodex === el)[0]?.kodex,
                uraian: this.aset.filter((x) => x.kodex === el).map((x) => x.kode3)[0]?.uraian,
                nilai: saldoawal + jurnal + penyesuaian
              }
              objinv.push(investasi)
            }
            const objinvestasi = {
              kode: '1.2',
              uraian: 'Investasi Jangka Panjang',
              nilai: objinv.map((x) => x.nilai).reduce((a, b) => a + b, 0)
            }

            const objasettetap = []
            const setaset = this.reqasettetap.map((x) => x.kode)
            const filasetttp = this.aset.filter(x => setaset.includes(x.kodex)).map((x) => x.kodex)
            const setunikaset = filasetttp.length ? [...new Set(filasetttp)] : []
            for (let i = 0; i < setunikaset.length; i++) {
              const el = setunikaset[i]
              const saldoawal = this.aset.filter((x) => x.kodex === el).map((x) => x.saldoawal.map((x) => parseFloat(x.saldo)).reduce((a, b) => a + b, 0)).reduce((a, b) => a + b, 0)
              const jurnal = this.aset.filter((x) => x.kodex === el).map((x) => x.jurnalotom.map((x) => parseFloat(x.totaljurnal)).reduce((a, b) => a + b, 0)).reduce((a, b) => a + b, 0)
              const penyesuaian = this.aset.filter((x) => x.kodex === el).map((x) => x.penyesuaianx.map((x) => parseFloat(x.totalpenyesuaian)).reduce((a, b) => a + b, 0)).reduce((a, b) => a + b, 0)

              const obj = {
                kode: this.aset.filter((x) => x.kodex === el)[0]?.kodex,
                uraian: this.aset.filter((x) => x.kodex === el).map((x) => x.kode3)[0]?.uraian,
                nilai: saldoawal + jurnal + penyesuaian
              }
              objasettetap.push(obj)
            }

            const objasetlainnya = []
            const setasetlain = this.reqasetlain.map((x) => x.kode)
            const filasetlain = this.aset.filter(x => setasetlain.includes(x.kodex)).map((x) => x.kodex)
            const setunikasetlain = filasetlain.length ? [...new Set(filasetlain)] : []
            for (let i = 0; i < setunikasetlain.length; i++) {
              const el = setunikasetlain[i]
              const saldoawal = this.aset.filter((x) => x.kodex === el).map((x) => x.saldoawal.map((x) => parseFloat(x.saldo)).reduce((a, b) => a + b, 0)).reduce((a, b) => a + b, 0)
              const jurnal = this.aset.filter((x) => x.kodex === el).map((x) => x.jurnalotom.map((x) => parseFloat(x.totaljurnal)).reduce((a, b) => a + b, 0)).reduce((a, b) => a + b, 0)
              const penyesuaian = this.aset.filter((x) => x.kodex === el).map((x) => x.penyesuaianx.map((x) => parseFloat(x.totalpenyesuaian)).reduce((a, b) => a + b, 0)).reduce((a, b) => a + b, 0)

              const obj = {
                kode: this.aset.filter((x) => x.kodex === el)[0]?.kodex,
                uraian: this.aset.filter((x) => x.kodex === el).map((x) => x.kode3)[0]?.uraian,
                nilai: saldoawal + jurnal + penyesuaian
              }
              objasetlainnya.push(obj)
            }

            const objutang = []
            const setutang = this.requtang.map((x) => x.kode)
            const filtutang = this.utang.filter(x => setutang.includes(x.kodex)).map((x) => x.kodex)
            const setunikutang = filtutang.length ? [...new Set(filtutang)] : []

            for (let i = 0; i < setunikutang.length; i++) {
              const el = setunikutang[i]
              const saldoawal = this.utang.filter((x) => x.kodex === el).map((x) => x.saldoawal.map((x) => parseFloat(x.saldo)).reduce((a, b) => a + b, 0)).reduce((a, b) => a + b, 0)
              const jurnal = this.utang.filter((x) => x.kodex === el).map((x) => x.jurnalotom.map((x) => parseFloat(x.totaljurnal)).reduce((a, b) => a + b, 0)).reduce((a, b) => a + b, 0)
              const penyesuaian = this.utang.filter((x) => x.kodex === el).map((x) => x.penyesuaianx.map((x) => parseFloat(x.totalpenyesuaian)).reduce((a, b) => a + b, 0)).reduce((a, b) => a + b, 0)

              const obj = {
                kode: this.utang.filter((x) => x.kodex === el)[0]?.kodex,
                uraian: this.utang.filter((x) => x.kodex === el).map((x) => x.kode3)[0]?.uraian,
                nilai: saldoawal + jurnal + penyesuaian
              }
              objutang.push(obj)
            }

            const objutangjkpanjang = []
            const setutangpjg = this.requtngjgkpanjang.map((x) => x.kode)
            const filtutangjgk = this.utang.filter(x => setutangpjg.includes(x.kodex)).map((x) => x.kodex)
            const setunikutangpjg = filtutangjgk.length ? [...new Set(filtutangjgk)] : []
            for (let i = 0; i < setunikutangpjg.length; i++) {
              const el = setunikutangpjg[i]
              const saldoawal = this.utang.filter((x) => x.kodex === el).map((x) => x.saldoawal.map((x) => parseFloat(x.saldo)).reduce((a, b) => a + b, 0)).reduce((a, b) => a + b, 0)
              const jurnal = this.utang.filter((x) => x.kodex === el).map((x) => x.jurnalotom.map((x) => parseFloat(x.totaljurnal)).reduce((a, b) => a + b, 0)).reduce((a, b) => a + b, 0)
              const penyesuaian = this.utang.filter((x) => x.kodex === el).map((x) => x.penyesuaianx.map((x) => parseFloat(x.totalpenyesuaian)).reduce((a, b) => a + b, 0)).reduce((a, b) => a + b, 0)

              const obj = {
                kode: this.utang.filter((x) => x.kodex === el)[0]?.kodex,
                uraian: this.utang.filter((x) => x.kodex === el).map((x) => x.kode3)[0]?.uraian,
                nilai: saldoawal + jurnal + penyesuaian
              }
              objutangjkpanjang.push(obj)
            }
            const k = '2.2.01'
            const jkp = objutangjkpanjang.filter(x => x.kode === k)
            const jkplain = objutangjkpanjang.filter(x => x.kode !== k)
            const nilaijkplainnya = jkplain.map((x) => parseFloat(x.nilai)).reduce((a, b) => a + b, 0)
            const objjkplain = {
              kode: '2.2.99',
              uraian: 'Utang Jangka Panjang Lainnya',
              nilai: nilaijkplainnya
            }
            const hasiljkp = jkp.concat(objjkplain)
            // console.log('sksksksks', hasiljkp)

            const objekuitas = []
            const setekuitas = this.reqekuitas.map((x) => x.kode)
            const filtekuitas = this.utang.filter(x => setekuitas.includes(x.kodex)).map((x) => x.kodex)
            const setekuitasx = filtekuitas.length ? [...new Set(filtekuitas)] : []
            for (let i = 0; i < setekuitasx.length; i++) {
              const el = setekuitasx[i]
              const saldoawal = this.utang.filter((x) => x.kodex === el).map((x) => x.saldoawal.map((x) => parseFloat(x.saldo)).reduce((a, b) => a + b, 0)).reduce((a, b) => a + b, 0)
              const jurnal = this.utang.filter((x) => x.kodex === el).map((x) => x.jurnalotom.map((x) => parseFloat(x.totaljurnal)).reduce((a, b) => a + b, 0)).reduce((a, b) => a + b, 0)
              const penyesuaian = this.utang.filter((x) => x.kodex === el).map((x) => x.penyesuaianx.map((x) => parseFloat(x.totalpenyesuaian)).reduce((a, b) => a + b, 0)).reduce((a, b) => a + b, 0)

              const obj = {
                kode: this.utang.filter((x) => x.kodex === el)[0]?.kodex,
                uraian: this.utang.filter((x) => x.kodex === el)[1].uraian,
                nilai: saldoawal + jurnal + penyesuaian
              }
              objekuitas.push(obj)
            }
            console.log('12121212', objekuitas)
            // const objekekuitas = []
            // const ek = '3.1.01'
            // const ekuitas = objekuitas.filter(x => x.kode === ek)
            // const nilaiekuitas = ekuitas.map((x) => parseFloat(x.nilai)).reduce((a, b) => a + b, 0).toFixed(2)
            // const ekuitasx = {
            //   kode: objekuitas.filter(x => x.kode === ek)[0].kode,
            //   uraian: objekuitas.filter(x => x.kode === ek)[0].uraian,
            //   nilai: nilaiekuitas
            // }
            // console.log('xsxs', ekuitasx)
            // const ekuitasrk = objekuitas.filter(x => x.kode !== ek)

            // const nilaiekuitasrk = ekuitasrk.map((x) => parseFloat(x.nilai)).reduce((a, b) => a + b, 0).toFixed(2)
            // const ekuitasppkd = {
            //   kode: '3.1.03',
            //   uraian: 'R/K PPKD',
            //   nilai: nilaiekuitasrk
            // }
            // objekekuitas.push(ekuitasx, ekuitasppkd)

            // const hasilekuitas = ekuitasx.concat(ekuitasRk)

            this.objsetarakas = objsetarakas
            this.objretribusi = objretribusi
            this.objpiutang = objpiutang
            // this.objpenyisihan = objpenyisihan
            this.objpersediaan = objpersediaan
            this.objinvestasi = objinvestasi
            this.objasettetap = objasettetap
            this.objasetlainnya = objasetlainnya
            this.objutang = objutang
            this.objutangjkpanjang = hasiljkp
            this.objekuitas = objekuitas

            // console.log('objekuitas', this.objekuitas)
            this.loading = false
            resolve(resp)
          }
        }).catch(() => { this.loading = false })
      })
    }
  }
})
