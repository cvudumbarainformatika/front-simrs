import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'

export const registerJurnal = defineStore('register_jurnal', {
  state: () => ({
    loading: false,
    disabled: false,
    reqs: {
      q: '',
      bulan: date.formatDate(Date.now(), 'MM'),
      tahun: date.formatDate(Date.now(), 'YYYY')
    },
    display: {
      sekarang: date.formatDate(Date.now(), 'DD MMMM YYYY')
    },
    bulans: [
      { nama: 'Januari', value: '01' },
      { nama: 'Februari', value: '02' },
      { nama: 'Maret', value: '03' },
      { nama: 'April', value: '04' },
      { nama: 'Mei', value: '05' },
      { nama: 'Juni', value: '06' },
      { nama: 'Juli', value: '07' },
      { nama: 'Agustus', value: '08' },
      { nama: 'September', value: '09' },
      { nama: 'Oktober', value: '10' },
      { nama: 'November', value: '11' },
      { nama: 'Desember', value: '12' }
    ],
    bastfarmasi: [],
    stp: [],
    cairnostp: [],
    cairstp: [],
    jurnals: []
  }),
  actions: {
    getRegJurnal () {
      this.loading = true
      const params = { params: this.reqs }
      return new Promise((resolve) => {
        api.get('v1/akuntansi/registerjurnal/regjurnal', params).then((resp) => {
          console.log('Register Jurnal', resp.data)
          if (resp.status === 200) {
            this.stp = resp.data.stp
            this.bastfarmasi = resp.data.bastfarmasi
            this.cairnostp = resp.data.cair_nostp
            this.cairstp = resp.data.cair_stp

            this.loading = false
            this.serahterima()
            resolve(resp.data)
          }
        }).catch(() => { this.loading = false })
      })
    },
    serahterima () {
      // DATA SERAHTERIMA SIASIK //
      const stp = []
      const arr50 = []
      for (let i = 0; i < this.stp.length; i++) {
        const el = this.stp
        const rinci = el[i].rinci.map((x) => {
          return {
            kode50: x.jurnal.kode50,
            uraian: x.jurnal.uraian50,
            kode_bast: x.jurnal.kode_bast,
            uraian_bast: x.jurnal.uraian_bast,
            kode_bastx: x.jurnal.kode_bastx,
            uraian_bastx: x.jurnal.uraian_bastx,
            nilai: parseFloat(x.nominalpembayaran)
          }
        })
        arr50.push(...rinci)
        const unik50 = rinci.map((s) => s.kode50)
        const unik = unik50.length ? [...new Set(unik50)] : []

        const kode50x = []
        for (let i = 0; i < unik.length; i++) {
          const el = unik[i]
          const ob = {
            koderek50: arr50.filter((x) => x.kode50 === el)[0]?.kode50,
            uraian50: arr50.filter((x) => x.kode50 === el)[0]?.uraian
          }
          kode50x.push(ob)
          // console.log('nilaaaaaaaai', ob.nilai)
        }
        const rincidebit = []
        for (let i = 0; i < unik.length; i++) {
          const el = unik[i]
          const ob = {

            kode_bast: arr50.filter((x) => x.kode50 === el)[0]?.kode_bast,
            uraian_bast: arr50.filter((x) => x.kode50 === el)[0]?.uraian_bast,

            debit: arr50.filter((x) => x.kode50 === el).map((x) => x.nilai).reduce((a, b) => a + b, 0),
            kredit: 0
          }
          rincidebit.push(ob)
          // console.log('nilaaaaaaaai', ob.nilai)
        }
        const rincikredit = []
        for (let i = 0; i < unik.length; i++) {
          const el = unik[i]
          const ob = {

            kode_bastx: arr50.filter((x) => x.kode50 === el)[0]?.kode_bastx,
            uraian_bastx: arr50.filter((x) => x.kode50 === el)[0]?.uraian_bastx,
            debit: 0,
            kredit: arr50.filter((x) => x.kode50 === el).map((x) => x.nilai).reduce((a, b) => a + b, 0)
          }
          rincikredit.push(ob)
          // console.log('nilaaaaaaaai', ob.nilai)
        }
        // console.log('arr50', kode50x)
        const obj = {
          tanggal: el[i].tgltrans,
          notrans: el[i].noserahterimapekerjaan,
          kegiatan: el[i].kegiatanblud,
          koderek50: kode50x.map((x) => x.koderek50),
          uraian50: kode50x.map((x) => x.uraian50),
          debit: rincidebit,
          kredit: rincikredit
        }
        stp.push(obj)
      }

      // DATA SERAHTERIMA FARMASI //
      const bastfarm = []
      const arr50bast = []
      for (let i = 0; i < this.bastfarmasi.length; i++) {
        const el = this.bastfarmasi
        // console.log('ll', el)
        const ri = el[i].rincianbast
        const rinci = ri.map((x) => {
          return {
            nobast: x.nobast,
            kode50: x.masterobat.jurnal.kode50,
            uraian: x.masterobat.jurnal.uraia50,
            kode_bast: x.masterobat.jurnal.kode_bast,
            uraian_bast: x.masterobat.jurnal.uraian_bast,
            kode_bastx: x.masterobat.jurnal.kode_bastx,
            uraian_bastx: x.masterobat.jurnal.uraian_bastx,
            nilai: parseFloat(x.subtotal)
          }
        })
        arr50bast.push(...rinci)
        // console.log('xnilai', arr50bast)
        const unik50 = rinci.map((s) => s.nobast)
        const unik = unik50.length ? [...new Set(unik50)] : []
        // console.log('unik', unik)
        const kode50x = []
        for (let i = 0; i < unik.length; i++) {
          const el = unik[i]
          const ob = {
            koderek50: arr50bast.filter((x) => x.nobast === el)[0]?.kode50,
            uraian50: arr50bast.filter((x) => x.nobast === el)[0]?.uraian
          }
          kode50x.push(ob)
          // console.log('nilaaaaaaaai', kode50x)
        }
        const rincidebit = []
        for (let i = 0; i < unik.length; i++) {
          const el = unik[i]
          const ob = {

            kode_bast: arr50bast.filter((x) => x.nobast === el)[0]?.kode_bast,
            uraian_bast: arr50bast.filter((x) => x.nobast === el)[0]?.uraian_bast,

            debit: arr50bast.filter((x) => x.nobast === el).map((x) => x.nilai).reduce((a, b) => a + b, 0),
            kredit: 0
          }
          rincidebit.push(ob)
          // console.log('nilaaaaaaaai', ob.nilai)
        }
        const rincikredit = []
        for (let i = 0; i < unik.length; i++) {
          const el = unik[i]
          const ob = {

            kode_bastx: arr50bast.filter((x) => x.nobast === el)[0]?.kode_bastx,
            uraian_bastx: arr50bast.filter((x) => x.nobast === el)[0]?.uraian_bastx,
            debit: 0,
            kredit: arr50bast.filter((x) => x.nobast === el).map((x) => x.nilai).reduce((a, b) => a + b, 0)
          }
          rincikredit.push(ob)
          // console.log('nilaaaaaaaai', ob.nilai)
        }
        const obj = {
          tanggal: el[i].tgl_bast,
          notrans: el[i].nobast,
          kegiatan: 'Pelayanan Farmasi',
          koderek50: kode50x.map((x) => x.koderek50),
          uraian50: kode50x.map((x) => x.uraian50),
          debit: rincidebit,
          kredit: rincikredit
        }
        bastfarm.push(obj)
        // console.log('rincibast', bastfarm)
      }

      // DATA PENCAIRAN TANPA STP //
      const uniks = this.cairnostp.map((x) => x.nonpdls)
      const unik = uniks.length ? [...new Set(uniks)] : []
      const cairnonstp = []
      // const arrcair = []
      for (let i = 0; i < unik.length; i++) {
        const el = unik[i]
        const arr = this.cairnostp

        const kode50x = []
        const kode50 = {
          koderek50: arr.filter((x) => x.nonpdls === el)?.map((x) => x.kode50),
          uraian50: arr.filter((x) => x.nonpdls === el)?.map((x) => x.rincianbelanja)
        }
        kode50x.push(kode50)

        const bendpg = []
        const bend = arr.filter((x) => x.nonpdls === el).map((x) => x)
        for (let y = 0; y < bend.length; y++) {
          const er = bend[y]
          const cair1 = {
            // kas bendahara
            kd_bend: er.kode_cair2,
            ur_bend: er.uraian_cair2,
            debit: parseFloat(er.total),
            kredit: 0
          }
          bendpg.push(cair1)
        }
        const blud = []
        const cairblud = arr.filter((x) => x.nonpdls === el).map((x) => x)
        for (let v = 0; v < cairblud.length; v++) {
          const er = cairblud[v]
          const cair1 = {
            // kas blud
            kd_blud: er.kd_blud,
            ur_blud: er.ur_blud,
            debit: 0,
            kredit: parseFloat(er.total)
          }
          blud.push(cair1)
        }
        const belanja = []
        const blj = arr.filter((x) => x.nonpdls === el).map((x) => x)
        for (let y = 0; y < blj.length; y++) {
          const er = blj[y]
          const cair1 = {
            // Belanja
            kd_belanja: er.kode50,
            urai_belanja: er.rincianbelanja,
            debit: parseFloat(er.total),
            kredit: 0
          }
          belanja.push(cair1)
        }
        const kcair1 = []
        const cairzx = arr.filter((x) => x.nonpdls === el).map((x) => x)
        for (let v = 0; v < cairzx.length; v++) {
          const er = cairzx[v]
          const cair1 = {
            // kas blud
            kode_cair1: er.kode_cair1,
            uraian_cair1: er.uraian_cair1,
            debit: 0,
            kredit: parseFloat(er.total)
          }
          kcair1.push(cair1)
        }
        const cairx = []
        const cairxs = arr.filter((x) => x.nonpdls === el).map((x) => x)
        for (let y = 0; y < cairxs.length; y++) {
          const er = cairxs[y]
          const cair1 = {
            // utang / beban / aset
            kode_cairx: er.kode_cairx,
            uraian_cairx: er.uraian_cairx,
            debit: parseFloat(er.total),
            kredit: 0
          }
          cairx.push(cair1)
        }
        const kasbend = []
        const cair2s = arr.filter((x) => x.nonpdls === el).map((x) => x)
        for (let v = 0; v < cair2s.length; v++) {
          const er = cair2s[v]
          const cair1 = {
            // kas bendahara
            kd_kasbend: er.kode_cair2,
            ur_kasbend: er.uraian_cair2,
            debit: 0,
            kredit: parseFloat(er.total)
          }
          kasbend.push(cair1)
        }
        // console.log('kredit', rincikredit)

        const obj = {
          tanggal: arr.filter((x) => x.nonpdls === el)[0]?.tglpindahbuku,
          notrans: arr.filter((x) => x.nonpdls === el)[0]?.nonpdls,
          kegiatan: arr.filter((x) => x.nonpdls === el)[0]?.kegiatanblud,
          koderek50: kode50x.map((x) => x.koderek50),
          uraian50: kode50x.map((x) => x.uraian50),
          // debit: rincidebit,
          // kredit: rincikredit,
          d_bendpg: bendpg,
          blud,
          belanja,
          kcair1,
          cairx,
          kasbend
        }
        // console.log('hhhh', obj)
        cairnonstp.push(obj)
        // console.log('hasil', cairnonstp)
      }

      // DATA PENCAIRAN DENGAN STP //
      const unikx = this.cairstp.map((x) => x.nonpdls)
      const unikz = unikx.length ? [...new Set(unikx)] : []
      const cairstpz = []
      // const arrcair = []
      for (let i = 0; i < unikz.length; i++) {
        const el = unikz[i]
        const arr = this.cairstp

        const kode50x = []
        const kode50 = {
          koderek50: arr.filter((x) => x.nonpdls === el)?.map((x) => x.kode50),
          uraian50: arr.filter((x) => x.nonpdls === el)?.map((x) => x.rincianbelanja)
        }
        kode50x.push(kode50)

        const bendpg = []
        const bend = arr.filter((x) => x.nonpdls === el).map((x) => x)
        for (let y = 0; y < bend.length; y++) {
          const er = bend[y]
          const cair1 = {
            // kas bendahara
            kd_bend: er.kode_bastcair2,
            ur_bend: er.uraian_bastcair2,
            debit: parseFloat(er.total),
            kredit: 0
          }
          bendpg.push(cair1)
        }
        const blud = []
        const cairblud = arr.filter((x) => x.nonpdls === el).map((x) => x)
        for (let v = 0; v < cairblud.length; v++) {
          const er = cairblud[v]
          const cair1 = {
            // kas blud
            kd_blud: er.kd_blud,
            ur_blud: er.ur_blud,
            debit: 0,
            kredit: parseFloat(er.total)
          }
          blud.push(cair1)
        }
        const belanja = []
        const blj = arr.filter((x) => x.nonpdls === el).map((x) => x)
        for (let y = 0; y < blj.length; y++) {
          const er = blj[y]
          const cair1 = {
            // Belanja
            kd_belanja: er.kode50,
            urai_belanja: er.rincianbelanja,
            debit: parseFloat(er.total),
            kredit: 0
          }
          belanja.push(cair1)
        }
        const kcair1 = []
        const cairzx = arr.filter((x) => x.nonpdls === el).map((x) => x)
        for (let v = 0; v < cairzx.length; v++) {
          const er = cairzx[v]
          const cair1 = {
            // kas blud
            kode_cair1: er.kode_bastcair1,
            uraian_cair1: er.uraian_bastcair1,
            debit: 0,
            kredit: parseFloat(er.total)
          }
          kcair1.push(cair1)
        }
        const cairx = []
        const cairxs = arr.filter((x) => x.nonpdls === el).map((x) => x)
        for (let y = 0; y < cairxs.length; y++) {
          const er = cairxs[y]
          const cair1 = {
            // utang / beban / aset
            kode_cairx: er.kode_bastcairx,
            uraian_cairx: er.uraian_bastcairx,
            debit: parseFloat(er.total),
            kredit: 0
          }
          cairx.push(cair1)
        }
        const kasbend = []
        const cair2s = arr.filter((x) => x.nonpdls === el).map((x) => x)
        for (let v = 0; v < cair2s.length; v++) {
          const er = cair2s[v]
          const cair1 = {
            // kas bendahara
            kd_kasbend: er.kode_bastcair2,
            ur_kasbend: er.uraian_bastcair2,
            debit: 0,
            kredit: parseFloat(er.total)
          }
          kasbend.push(cair1)
        }
        // console.log('kre bast', rincikredit)

        const obj = {
          tanggal: arr.filter((x) => x.nonpdls === el)[0]?.tglpindahbuku,
          notrans: arr.filter((x) => x.nonpdls === el)[0]?.nonpdls,
          kegiatan: arr.filter((x) => x.nonpdls === el)[0]?.kegiatanblud,
          koderek50: kode50x.map((x) => x.koderek50),
          uraian50: kode50x.map((x) => x.uraian50),
          d_bendpg: bendpg,
          blud,
          belanja,
          kcair1,
          cairx,
          kasbend
        }
        // console.log('hhhh', obj)
        cairstpz.push(obj)
        // console.log('cairstpz', cairstpz)
      }
      const gabungan = stp?.concat(
        bastfarm, cairnonstp, cairstpz
      )
      const sortByDate = (gabungan) =>
        gabungan.sort(({ tgl: a }, { tgl: b }) =>
          a < b ? -1 : a > b ? 1 : 0
        )
      const arrJurnal = sortByDate(gabungan)
      this.jurnals = arrJurnal
      console.log('data STP', this.jurnals)
    }
  }

})
