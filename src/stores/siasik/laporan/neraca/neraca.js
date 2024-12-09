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
    setarakas: [],
    retribusi: [],
    piutang: [],
    piutanglain: [],
    penyisihanpiutang: [],
    persediaan: [],
    investasi: [],
    asettetap: [],
    asetlainnya: [],
    utang: [],
    utangjkpanjang: [],
    ekuitas: [],

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
            this.investasi = resp.data?.investasi
            this.asettetap = resp.data?.asettetap
            this.asetlainnya = resp.data?.asetlainnya
            this.utang = resp.data?.utang
            this.utangjkpanjang = resp.data?.utangjkpanjang
            this.ekuitas = resp.data?.ekuitas

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

            const objp = []
            for (let i = 0; i < this.penyisihanpiutang.length; i++) {
              const el = this.penyisihanpiutang[i]
              const saldoawal = el?.saldoawal.map((x) => parseFloat(x.saldo)).reduce((a, b) => a + b, 0)
              const jurnal = el?.jurnalotom.map((x) => parseFloat(x.totaljurnal)).reduce((a, b) => a + b, 0)
              const penyesuaian = el?.penyesuaianx.map((x) => parseFloat(x.totalpenyesuaian)).reduce((a, b) => a + b, 0)
              const penyisihan = {
                kode: '1.1.10',
                uraian: 'Penyisihan Piutang',
                nilai: saldoawal + jurnal + penyesuaian
              }
              objp.push(penyisihan)
            }
            const objpenyisihan = {
              kode: '1.1.10',
              uraian: 'Penyisihan Piutang',
              nilai: objp.map((x) => x.nilai).reduce((a, b) => a + b, 0)
            }

            const objps = []
            for (let i = 0; i < this.persediaan.length; i++) {
              const el = this.persediaan[i]
              const saldoawal = el?.saldoawal.map((x) => parseFloat(x.saldo)).reduce((a, b) => a + b, 0)
              const jurnal = el?.jurnalotom.map((x) => parseFloat(x.totaljurnal)).reduce((a, b) => a + b, 0)
              const penyesuaian = el?.penyesuaianx.map((x) => parseFloat(x.totalpenyesuaian)).reduce((a, b) => a + b, 0)
              const persediaan = {
                kode: '1.1.12',
                uraian: 'Persediaan',
                nilai: saldoawal + jurnal + penyesuaian
              }
              objps.push(persediaan)
            }
            const objpersediaan = {
              kode: '1.1.12',
              uraian: 'Persediaan',
              nilai: objp.map((x) => x.nilai).reduce((a, b) => a + b, 0)
            }

            const objinv = []
            for (let i = 0; i < this.investasi.length; i++) {
              const el = this.investasi[i]
              const saldoawal = el?.saldoawal.map((x) => parseFloat(x.saldo)).reduce((a, b) => a + b, 0)
              const jurnal = el?.jurnalotom.map((x) => parseFloat(x.totaljurnal)).reduce((a, b) => a + b, 0)
              const penyesuaian = el?.penyesuaianx.map((x) => parseFloat(x.totalpenyesuaian)).reduce((a, b) => a + b, 0)
              const investasi = {
                kode: '1.2',
                uraian: 'Investasi Jangka Panjang',
                nilai: saldoawal + jurnal + penyesuaian
              }
              objinv.push(investasi)
            }
            const objinvestasi = {
              kode: '1.2',
              uraian: 'Investasi Jangka Panjang',
              nilai: objp.map((x) => x.nilai).reduce((a, b) => a + b, 0)
            }

            const objasettetap = []
            const setaset = this.asettetap.map((x) => x.kodex)
            const setunikaset = setaset.length ? [...new Set(setaset)] : []
            for (let i = 0; i < setunikaset.length; i++) {
              const el = setunikaset[i]
              const saldoawal = this.asettetap.filter((x) => x.kodex === el).map((x) => x.saldoawal.map((x) => parseFloat(x.saldo)).reduce((a, b) => a + b, 0)).reduce((a, b) => a + b, 0)
              const jurnal = this.asettetap.filter((x) => x.kodex === el).map((x) => x.jurnalotom.map((x) => parseFloat(x.totaljurnal)).reduce((a, b) => a + b, 0)).reduce((a, b) => a + b, 0)
              const penyesuaian = this.asettetap.filter((x) => x.kodex === el).map((x) => x.penyesuaianx.map((x) => parseFloat(x.totalpenyesuaian)).reduce((a, b) => a + b, 0)).reduce((a, b) => a + b, 0)

              const obj = {
                kode: this.asettetap.filter((x) => x.kodex === el)[0]?.kodex,
                uraian: this.asettetap.filter((x) => x.kodex === el).map((x) => x.kode3)[0]?.uraian,
                nilai: saldoawal + jurnal + penyesuaian
              }
              objasettetap.push(obj)
            }

            const objasetlainnya = []
            const setasetlain = this.asetlainnya.map((x) => x.kodex)
            const setunikasetlain = setasetlain.length ? [...new Set(setasetlain)] : []
            for (let i = 0; i < setunikasetlain.length; i++) {
              const el = setunikasetlain[i]
              const saldoawal = this.asetlainnya.filter((x) => x.kodex === el).map((x) => x.saldoawal.map((x) => parseFloat(x.saldo)).reduce((a, b) => a + b, 0)).reduce((a, b) => a + b, 0)
              const jurnal = this.asetlainnya.filter((x) => x.kodex === el).map((x) => x.jurnalotom.map((x) => parseFloat(x.totaljurnal)).reduce((a, b) => a + b, 0)).reduce((a, b) => a + b, 0)
              const penyesuaian = this.asetlainnya.filter((x) => x.kodex === el).map((x) => x.penyesuaianx.map((x) => parseFloat(x.totalpenyesuaian)).reduce((a, b) => a + b, 0)).reduce((a, b) => a + b, 0)

              const obj = {
                kode: this.asetlainnya.filter((x) => x.kodex === el)[0]?.kodex,
                uraian: this.asetlainnya.filter((x) => x.kodex === el).map((x) => x.kode3)[0]?.uraian,
                nilai: saldoawal + jurnal + penyesuaian
              }
              objasetlainnya.push(obj)
            }

            const objutang = []
            const setutang = this.utang.map((x) => x.kodex)
            const setunikutang = setutang.length ? [...new Set(setutang)] : []
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
            const setutangpjg = this.utangjkpanjang.map((x) => x.kodex)
            const setunikutangpjg = setutangpjg.length ? [...new Set(setutangpjg)] : []
            for (let i = 0; i < setunikutangpjg.length; i++) {
              const el = setunikutangpjg[i]
              const saldoawal = this.utangjkpanjang.filter((x) => x.kodex === el).map((x) => x.saldoawal.map((x) => parseFloat(x.saldo)).reduce((a, b) => a + b, 0)).reduce((a, b) => a + b, 0)
              const jurnal = this.utangjkpanjang.filter((x) => x.kodex === el).map((x) => x.jurnalotom.map((x) => parseFloat(x.totaljurnal)).reduce((a, b) => a + b, 0)).reduce((a, b) => a + b, 0)
              const penyesuaian = this.utangjkpanjang.filter((x) => x.kodex === el).map((x) => x.penyesuaianx.map((x) => parseFloat(x.totalpenyesuaian)).reduce((a, b) => a + b, 0)).reduce((a, b) => a + b, 0)

              const obj = {
                kode: this.utangjkpanjang.filter((x) => x.kodex === el)[0]?.kodex,
                uraian: this.utangjkpanjang.filter((x) => x.kodex === el).map((x) => x.kode3)[0]?.uraian,
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

            const objekuitas = []
            const setekuitas = this.ekuitas.map((x) => x.kodex)
            const setekuitasx = setekuitas.length ? [...new Set(setekuitas)] : []
            for (let i = 0; i < setekuitasx.length; i++) {
              const el = setekuitasx[i]
              const saldoawal = this.ekuitas.filter((x) => x.kodex === el).map((x) => x.saldoawal.map((x) => parseFloat(x.saldo)).reduce((a, b) => a + b, 0)).reduce((a, b) => a + b, 0)
              const jurnal = this.ekuitas.filter((x) => x.kodex === el).map((x) => x.jurnalotom.map((x) => parseFloat(x.totaljurnal)).reduce((a, b) => a + b, 0)).reduce((a, b) => a + b, 0)
              const penyesuaian = this.ekuitas.filter((x) => x.kodex === el).map((x) => x.penyesuaianx.map((x) => parseFloat(x.totalpenyesuaian)).reduce((a, b) => a + b, 0)).reduce((a, b) => a + b, 0)

              const obj = {
                kode: this.ekuitas.filter((x) => x.kodex === el)[0]?.kodex,
                uraian: this.ekuitas.filter((x) => x.kodex === el).map((x) => x.kode3)[0]?.uraian,
                nilai: saldoawal + jurnal + penyesuaian
              }
              objekuitas.push(obj)
            }
            const objekekuitas = []
            const ek = '3.1.03'
            const ekuitas = objekuitas.filter(x => x.kode !== ek)
            const nilaiekuitas = ekuitas.map((x) => parseFloat(x.nilai)).reduce((a, b) => a + b, 0).toFixed(2)
            const ekuitasx = {
              kode: '3.1.01',
              uraian: 'Ekuitas',
              nilai: nilaiekuitas
            }

            const ekuitasrk = objekuitas.filter(x => x.kode === ek)
            const nilaiekuitasrk = ekuitasrk.map((x) => parseFloat(x.nilai)).reduce((a, b) => a + b, 0).toFixed(2)
            const ekuitasppkd = {
              kode: '3.1.03',
              uraian: 'R/K PPKD',
              nilai: nilaiekuitasrk
            }
            objekekuitas.push(ekuitasx, ekuitasppkd)
            // const hasilekuitas = ekuitasx.concat(ekuitasRk)

            this.objsetarakas = objsetarakas
            this.objretribusi = objretribusi
            this.objpiutang = objpiutang
            this.objpenyisihan = objpenyisihan
            this.objpersediaan = objpersediaan
            this.objinvestasi = objinvestasi
            this.objasettetap = objasettetap
            this.objasetlainnya = objasetlainnya
            this.objutang = objutang
            this.objutangjkpanjang = hasiljkp
            this.objekuitas = objekekuitas

            console.log('objekuitas', this.objekuitas)
            this.loading = false
            resolve(resp)
          }
        }).catch(() => { this.loading = false })
      })
    }
  }
})
