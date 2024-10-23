import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'

export const registerJurnal = defineStore('register_jurnal', {
  state: () => ({
    loading: false,
    disabled: false,
    reqs: {
      q: '',
      page: 1,
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
    contrapost: [],
    spmup: [],
    spmgu: [],
    spjpanjar: [],
    nihil: [],
    pajakls: [],
    jurnals: []
  }),
  actions: {
    goToPage (val) {
      this.reqs.page = val
      this.getRegJurnal()
    },
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
            this.contrapost = resp.data.contrapost
            this.spmup = resp.data.spmup
            this.spmgu = resp.data.spmgu
            this.nihil = resp.data.nihil
            this.spjpanjar = resp.data.spjpanjar
            this.pajakls = resp.data.pajakls

            this.loading = false
            this.serahterima()
            resolve(resp.data)
          }
        }).catch(() => { this.loading = false })
      })
    },
    serahterima () {
      // DATA SERAHTERIMA SIASIK //
      const unikstp = this.stp.map((x) => x.noserahterimapekerjaan)
      const dataunikstp = unikstp.length ? [...new Set(unikstp)] : []
      const stp = []
      for (let i = 0; i < dataunikstp.length; i++) {
        const el = dataunikstp[i]
        const arr = this.stp

        const arrfilter = arr.filter((x) => x.noserahterimapekerjaan === el).map((x) => x)
        // console.log('coba', arrfilter)
        const unik50 = arrfilter.map((x) => x.koderek50)
        const unik50x = unik50.length ? [...new Set(unik50)] : []

        const beban = []
        for (let k = 0; k < unik50x.length; k++) {
          const es = unik50x[k]
          const arrs = arrfilter
          const el = {
            // beban
            kode: arrs.filter((x) => x.koderek50 === es)[0]?.kode_bast,
            uraian: arrs.filter((x) => x.koderek50 === es)[0]?.uraian_bast,
            debit: parseFloat(arrs.filter((x) => x.koderek50 === es)[0]?.nominalpembayaran),
            kredit: 0
          }
          beban.push(el)
          // console.log('unikkkkks', beban)
        }

        const utangstp = []
        for (let k = 0; k < unik50x.length; k++) {
          const es = unik50x[k]
          const arrs = arrfilter
          const el = {
            // beban
            kode: arrs.filter((x) => x.koderek50 === es)[0]?.kode_bastx,
            uraian: arrs.filter((x) => x.koderek50 === es)[0]?.uraian_bastx,
            debit: 0,
            kredit: parseFloat(arrs.filter((x) => x.koderek50 === es)[0]?.nominalpembayaran)
          }
          utangstp.push(el)
        }
        const obj = {
          tanggal: arr.filter((x) => x.noserahterimapekerjaan === el)[0]?.tgltrans,
          notrans: arr.filter((x) => x.noserahterimapekerjaan === el)[0]?.noserahterimapekerjaan,
          kegiatan: arr.filter((x) => x.noserahterimapekerjaan === el)[0]?.kegiatanblud,
          debit_1: beban,
          kredit_1: utangstp
        }
        stp.push(obj)
        // console.log('datastp', stp)
      }
      // const arr50 = []
      // for (let i = 0; i < this.stp.length; i++) {
      //   const el = this.stp
      //   const rinci = el[i].rinci.map((x) => {
      //     return {
      //       kode50: x.jurnal.kode50,
      //       uraian: x.jurnal.uraian50,
      //       kode_bast: x.jurnal.kode_bast,
      //       uraian_bast: x.jurnal.uraian_bast,
      //       kode_bastx: x.jurnal.kode_bastx,
      //       uraian_bastx: x.jurnal.uraian_bastx,
      //       nilai: parseFloat(x.nominalpembayaran)
      //     }
      //   })
      //   arr50.push(...rinci)
      //   const unik50 = rinci.map((s) => s.kode50)
      //   const unik = unik50.length ? [...new Set(unik50)] : []

      //   const kode50x = []
      //   for (let i = 0; i < unik.length; i++) {
      //     const el = unik[i]
      //     const ob = {
      //       koderek50: arr50.filter((x) => x.kode50 === el)[0]?.kode50,
      //       uraian50: arr50.filter((x) => x.kode50 === el)[0]?.uraian
      //     }
      //     kode50x.push(ob)
      //     // console.log('nilaaaaaaaai', ob.nilai)
      //   }
      //   const rincidebit = []
      //   for (let i = 0; i < unik.length; i++) {
      //     const el = unik[i]
      //     const ob = {

      //       kode: arr50.filter((x) => x.kode50 === el)[0]?.kode_bast,
      //       uraian: arr50.filter((x) => x.kode50 === el)[0]?.uraian_bast,

      //       debit: arr50.filter((x) => x.kode50 === el).map((x) => x.nilai).reduce((a, b) => a + b, 0),
      //       kredit: 0
      //     }
      //     rincidebit.push(ob)
      //     // console.log('nilaaaaaaaai', ob.nilai)
      //   }
      //   const rincikredit = []
      //   for (let i = 0; i < unik.length; i++) {
      //     const el = unik[i]
      //     const ob = {

      //       kode: arr50.filter((x) => x.kode50 === el)[0]?.kode_bastx,
      //       uraian: arr50.filter((x) => x.kode50 === el)[0]?.uraian_bastx,
      //       debit: 0,
      //       kredit: arr50.filter((x) => x.kode50 === el).map((x) => x.nilai).reduce((a, b) => a + b, 0)
      //     }
      //     rincikredit.push(ob)
      //     // console.log('nilaaaaaaaai', ob.nilai)
      //   }
      // console.log('arr50', kode50x)
      //   const obj = {
      //     tanggal: el[i].tgltrans,
      //     notrans: el[i].noserahterimapekerjaan,
      //     kegiatan: el[i].kegiatanblud,
      //     koderek50: kode50x.map((x) => x.koderek50),
      //     uraian50: kode50x.map((x) => x.uraian50),
      //     debit: rincidebit,
      //     kredit: rincikredit
      //   }
      //   stp.push(obj)
      // }

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

            kode: arr50bast.filter((x) => x.nobast === el)[0]?.kode_bast,
            uraian: arr50bast.filter((x) => x.nobast === el)[0]?.uraian_bast,

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

            kode: arr50bast.filter((x) => x.nobast === el)[0]?.kode_bastx,
            uraian: arr50bast.filter((x) => x.nobast === el)[0]?.uraian_bastx,
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

        const arrfilter = arr.filter((x) => x.nonpdls === el).map((x) => x)
        const bendpg = []
        for (let y = 0; y < arrfilter.length; y++) {
          const er = arrfilter[y]
          const cair1 = {
            // kas bendahara
            kode: er.kode_cair2,
            uraian: er.uraian_cair2,
            debit: parseFloat(er.total),
            kredit: 0
          }
          bendpg.push(cair1)
        }
        const blud = []
        for (let v = 0; v < arrfilter.length; v++) {
          const er = arrfilter[v]
          const cair1 = {
            // kas blud
            kode: er.kd_blud,
            uraian: er.ur_blud,
            debit: 0,
            kredit: parseFloat(er.total)
          }
          blud.push(cair1)
        }

        const belanja = []
        for (let y = 0; y < arrfilter.length; y++) {
          const er = arrfilter[y]
          const cair1 = {
            // Belanja
            kode: er.kode50,
            uraian: er.rincianbelanja,
            debit: parseFloat(er.total),
            kredit: 0
          }
          belanja.push(cair1)
        }
        const kcair1 = []
        for (let v = 0; v < arrfilter.length; v++) {
          const er = arrfilter[v]
          const cair1 = {
            // epsal
            kode: er.kode_cair1,
            uraian: er.uraian_cair1,
            debit: 0,
            kredit: parseFloat(er.total)
          }
          kcair1.push(cair1)
        }
        const cairx = []
        for (let y = 0; y < arrfilter.length; y++) {
          const er = arrfilter[y]
          const cair1 = {
            // utang / beban / aset
            kode: er.kode_cairx,
            uraian: er.uraian_cairx,
            debit: parseFloat(er.total),
            kredit: 0
          }
          cairx.push(cair1)
        }
        const kasbend = []
        for (let v = 0; v < arrfilter.length; v++) {
          const er = arrfilter[v]
          const cair1 = {
            // kas bendahara
            kode: er.kode_cair2,
            uraian: er.uraian_cair2,
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
          keterangan: 'Pencairan Tanpa BAST',
          koderek50: kode50x.map((x) => x.koderek50),
          uraian50: kode50x.map((x) => x.uraian50),
          // debit: rincidebit,
          // kredit: rincikredit,
          // debit
          debit_1: bendpg,
          // kredit
          kredit_1: blud,
          // debit
          debit_2: belanja,
          // kredit
          kredit_2: kcair1,
          // debit
          debit_3: cairx,
          // kredit
          kredit_3: kasbend
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

        const arrfilter = arr.filter((x) => x.nonpdls === el).map((x) => x)
        const bendpg = []
        for (let y = 0; y < arrfilter.length; y++) {
          const er = arrfilter[y]
          const cair1 = {
            // kas bendahara
            kode: er.kode_bastcair2,
            uraian: er.uraian_bastcair2,
            debit: parseFloat(er.total),
            kredit: 0
          }
          bendpg.push(cair1)
        }
        const blud = []
        for (let v = 0; v < arrfilter.length; v++) {
          const er = arrfilter[v]
          const cair1 = {
            // kas blud
            kode: er.kd_blud,
            uraian: er.ur_blud,
            debit: 0,
            kredit: parseFloat(er.total)
          }
          blud.push(cair1)
        }
        const belanja = []
        for (let y = 0; y < arrfilter.length; y++) {
          const er = arrfilter[y]
          const cair1 = {
            // Belanja
            kode: er.kode50,
            uraian: er.rincianbelanja,
            debit: parseFloat(er.total),
            kredit: 0
          }
          belanja.push(cair1)
        }
        const kcair1 = []
        for (let v = 0; v < arrfilter.length; v++) {
          const er = arrfilter[v]
          const cair1 = {
            // epsal
            kode: er.kode_bastcair1,
            uraian: er.uraian_bastcair1,
            debit: 0,
            kredit: parseFloat(er.total)
          }
          kcair1.push(cair1)
        }
        const cairx = []
        for (let y = 0; y < arrfilter.length; y++) {
          const er = arrfilter[y]
          const cair1 = {
            // utang / beban / aset
            kode: er.kode_bastcairx,
            uraian: er.uraian_bastcairx,
            debit: parseFloat(er.total),
            kredit: 0
          }
          cairx.push(cair1)
        }
        const kasbend = []
        for (let v = 0; v < arrfilter.length; v++) {
          const er = arrfilter[v]
          const cair1 = {
            // kas bendahara
            kode: er.kode_bastcair2,
            uraian: er.uraian_bastcair2,
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
          keterangan: 'Pencairan Dengan BAST',
          koderek50: kode50x.map((x) => x.koderek50),
          uraian50: kode50x.map((x) => x.uraian50),
          // debit
          debit_1: bendpg,
          // kredit
          kredit_1: blud,
          // debit
          debit_2: belanja,
          // kredit
          kredit_2: kcair1,
          // debit
          debit_3: cairx,
          // kredit
          kredit_3: kasbend
        }
        // console.log('hhhh', obj)
        cairstpz.push(obj)
        // console.log('cairstpz', cairstpz)
      }

      // DATA CONTRAPOST //
      const unikcp = this.contrapost.map((x) => x.nocontrapost)
      const dataunik = unikcp.length ? [...new Set(unikcp)] : []
      // eslint-disable-next-line no-unused-vars
      const cp = []

      for (let c = 0; c < dataunik.length; c++) {
        const el = dataunik[c]
        const arr = this.contrapost
        // console.log('arr', arr)

        // eslint-disable-next-line no-unused-vars
        const epsal = []
        const arrfilter = arr.filter((x) => x.nocontrapost === el).map((x) => x)
        for (let i = 0; i < arrfilter.length; i++) {
          const er = arrfilter[i]
          const el = {
            // epsal
            kode: er.kode_cair1,
            uraian: er.uraian_cair1,
            debit: parseFloat(er.nominalcontrapost),
            kredit: 0
          }
          epsal.push(el)
        }

        const belanja = []
        for (let i = 0; i < arrfilter.length; i++) {
          const er = arrfilter[i]
          const el = {
            // belanja
            kode: er.kode50,
            uraian: er.rincianbelanja,
            debit: 0,
            kredit: parseFloat(er.nominalcontrapost)
          }
          belanja.push(el)
        }

        const kasbend = []
        for (let i = 0; i < arrfilter.length; i++) {
          const er = arrfilter[i]
          const el = {
            // belanja
            kode: er.kode_cair2,
            uraian: er.uraian_cair2,
            debit: parseFloat(er.nominalcontrapost),
            kredit: 0
          }
          kasbend.push(el)
        }

        const bebanaset = []
        for (let i = 0; i < arrfilter.length; i++) {
          const er = arrfilter[i]
          const el = {
            // belanja
            kode: er.kode_cairx,
            uraian: er.uraian_cairx,
            debit: 0,
            kredit: parseFloat(er.nominalcontrapost)
          }
          bebanaset.push(el)
        }
        const obj = {
          tanggal: date.formatDate(arr.filter((x) => x.nocontrapost === el)[0]?.tglcontrapost, 'YYYY-MM-DD'),
          notrans: arr.filter((x) => x.nocontrapost === el)[0]?.nocontrapost,
          keterangan: 'Contrapost',
          kegiatan: arr.filter((x) => x.nocontrapost === el)[0]?.kegiatanblud,
          debit_1: epsal,
          kredit_1: belanja,
          debit_2: kasbend,
          kredit_2: bebanaset
        }
        cp.push(obj)
      }

      // DATA SPM UP //
      const dataspmup = []
      for (let i = 0; i < this.spmup.length; i++) {
        const arr = this.spmup

        const kasblud = []
        for (let k = 0; k < arr.length; k++) {
          const er = arr[i]
          const el = {
            kode: '1.1.01.04.01.0001',
            uraian: 'Kas di BLUD',
            debit: 0,
            kredit: parseFloat(er.jumlahspp)
          }
          kasblud.push(el)
        }
        const kasbend = []
        for (let k = 0; k < arr.length; k++) {
          const er = arr[i]
          const el = {
            kode: '1.1.01.03.01.0001',
            uraian: 'Kas di Bendahara Pengeluaran',
            debit: parseFloat(er.jumlahspp),
            kredit: 0
          }
          kasbend.push(el)
        }
        const obj = {
          tanggal: arr[i].tglSpm,
          notrans: arr[i].noSpm,
          keterangan: arr[i].uraianPekerjaan,
          debit_1: kasbend,
          kredit_1: kasblud
        }
        dataspmup.push(obj)
        // console.log('SPM UP', dataspmup)
      }

      // DATA SPM GU //
      const dataspmgu = []
      for (let i = 0; i < this.spmgu.length; i++) {
        const arr = this.spmgu

        const kasblud = []
        for (let k = 0; k < arr.length; k++) {
          const er = arr[i]
          const el = {
            kode: '1.1.01.04.01.0001',
            uraian: 'Kas di BLUD',
            debit: 0,
            kredit: parseFloat(er.jumlahspp)
          }
          kasblud.push(el)
        }
        const kasbend = []
        for (let k = 0; k < arr.length; k++) {
          const er = arr[i]
          const el = {
            kode: '1.1.01.03.01.0001',
            uraian: 'Kas di Bendahara Pengeluaran',
            debit: parseFloat(er.jumlahspp),
            kredit: 0
          }
          kasbend.push(el)
        }
        const obj = {
          tanggal: arr[i].tglSpm,
          notrans: arr[i].noSpm,
          keterangan: arr[i].uraianPekerjaan,
          debit_1: kasbend,
          kredit_1: kasblud
        }
        dataspmgu.push(obj)
        // console.log('SPM GU', dataspmgu)
      }

      // DATA SPJ PANJAR //
      const unikspj = this.spjpanjar.map((x) => x.nospjpanjar)
      const unikno = unikspj.length ? [...new Set(unikspj)] : []

      const spjpjr = []
      for (let i = 0; i < unikno.length; i++) {
        const el = unikno[i]
        const arr = this.spjpanjar
        const arrfilter = arr.filter((x) => x.nospjpanjar === el).map((x) => x)

        const belanja = []
        for (let x = 0; x < arrfilter.length; x++) {
          const er = arrfilter[x]
          const el = {
            kode: er.kode50,
            uraian: er.rincianbelanja50,
            debit: parseFloat(er.jumlahbelanjapanjar),
            kredit: 0
          }
          belanja.push(el)
        }

        const epsal = []
        for (let x = 0; x < arrfilter.length; x++) {
          const er = arrfilter[x]
          const el = {
            kode: er.kode_cair1,
            uraian: er.uraian_cair1,
            debit: 0,
            kredit: parseFloat(er.jumlahbelanjapanjar)
          }
          epsal.push(el)
        }

        const beban = []
        for (let x = 0; x < arrfilter.length; x++) {
          const er = arrfilter[x]
          const el = {
            kode: er.kode_cairx,
            uraian: er.uraian_cairx,
            debit: parseFloat(er.jumlahbelanjapanjar),
            kredit: 0
          }
          beban.push(el)
        }

        const kasbend = []
        for (let x = 0; x < arrfilter.length; x++) {
          const er = arrfilter[x]
          const el = {
            kode: er.kode_cair2,
            uraian: er.uraian_cair2,
            debit: 0,
            kredit: parseFloat(er.jumlahbelanjapanjar)
          }
          kasbend.push(el)
        }
        const obj = {
          tanggal: arr.filter((x) => x.nospjpanjar === el)[0].tglspjpanjar,
          notrans: arr.filter((x) => x.nospjpanjar === el)[0].nospjpanjar,
          kegiatan: arr.filter((x) => x.nospjpanjar === el)[0].kegiatanblud,
          debit_1: belanja,
          kredit_1: epsal,
          debit_2: beban,
          kredit_2: kasbend
        }

        spjpjr.push(obj)
      }

      // DATA PENGEMBALIAN NIHIL //
      const datanihil = []
      for (let i = 0; i < this.nihil.length; i++) {
        const arr = this.nihil

        const kasblud = []
        for (let k = 0; k < arr.length; k++) {
          const er = arr[i]
          const el = {
            kode: '1.1.01.04.01.0001',
            uraian: 'Kas di BLUD',
            debit: parseFloat(er.jmlpengembalianreal),
            kredit: 0
          }
          kasblud.push(el)
        }
        const kasbend = []
        for (let k = 0; k < arr.length; k++) {
          const er = arr[i]
          const el = {
            kode: '1.1.01.03.01.0001',
            uraian: 'Kas di Bendahara Pengeluaran',
            debit: 0,
            kredit: parseFloat(er.jmlpengembalianreal)
          }
          kasbend.push(el)
        }
        const obj = {
          tanggal: arr[i].tgltrans,
          notrans: arr[i].nopengembalian,
          keterangan: 'UP GU Nihil',
          debit_1: kasblud,
          kredit_1: kasbend
        }
        datanihil.push(obj)
        // console.log('nihil', datanihil)
      }

      // DATA PAJAK LS //
      const unikpajakls = this.pajakls.map((x) => x.nonpdls)
      const unpjakls = unikpajakls.length ? [...new Set(unikpajakls)] : []
      const pajakls = []
      for (let i = 0; i < unpjakls.length; i++) {
        const el = unpjakls[i]
        const arr = this.pajakls
        const arrfilter = arr.filter((x) => x.nonpdls === el).map((x) => x)

        const pph21x = []
        for (let x = 0; x < arrfilter.length; x++) {
          const er = arrfilter[x]
          const kas = {
            kode: '1.1.01.03.01.0001',
            uraian: 'Kas di Bendahara Pengeluaran',
            debit: parseFloat(er.pph21),
            kredit: 0
          }
          pph21x.push(kas)
        }
        const pph21y = []
        for (let x = 0; x < arrfilter.length; x++) {
          const er = arrfilter[x]
          const utang = {
            kode: '2.1.01.05.01.0001',
            uraian: 'Utang PPh 21',
            debit: 0,
            kredit: parseFloat(er.pph21)
          }
          pph21y.push(utang)
        }

        const pph21a = []
        for (let x = 0; x < arrfilter.length; x++) {
          const er = arrfilter[x]
          const kas = {
            kode: '2.1.01.05.01.0001',
            uraian: 'Utang PPh 21',
            debit: parseFloat(er.pph21),
            kredit: 0
          }
          pph21a.push(kas)
        }
        const pph21b = []
        for (let x = 0; x < arrfilter.length; x++) {
          const er = arrfilter[x]
          const utang = {
            kode: '1.1.01.03.01.0001',
            uraian: 'Kas di Bendahara Pengeluaran',
            debit: 0,
            kredit: parseFloat(er.pph21)
          }
          pph21b.push(utang)
        }

        const pph22x = []
        for (let x = 0; x < arrfilter.length; x++) {
          const er = arrfilter[x]
          const kas = {
            kode: '1.1.01.03.01.0001',
            uraian: 'Kas di Bendahara Pengeluaran',
            debit: parseFloat(er.pph22),
            kredit: 0
          }
          pph22x.push(kas)
        }
        const pph22y = []
        for (let x = 0; x < arrfilter.length; x++) {
          const er = arrfilter[x]
          const utang = {
            kode: '2.1.01.05.02.0001',
            uraian: 'Utang PPh 22',
            debit: 0,
            kredit: parseFloat(er.pph22)
          }
          pph22y.push(utang)
        }

        const pph22a = []
        for (let x = 0; x < arrfilter.length; x++) {
          const er = arrfilter[x]
          const kas = {
            kode: '2.1.01.05.02.0001',
            uraian: 'Utang PPh 22',
            debit: parseFloat(er.pph22),
            kredit: 0
          }
          pph22a.push(kas)
        }
        const pph22b = []
        for (let x = 0; x < arrfilter.length; x++) {
          const er = arrfilter[x]
          const utang = {
            kode: '1.1.01.03.01.0001',
            uraian: 'Kas di Bendahara Pengeluaran',
            debit: 0,
            kredit: parseFloat(er.pph22)
          }
          pph22b.push(utang)
        }

        const pph23x = []
        for (let x = 0; x < arrfilter.length; x++) {
          const er = arrfilter[x]
          const kas = {
            kode: '1.1.01.03.01.0001',
            uraian: 'Kas di Bendahara Pengeluaran',
            debit: parseFloat(er.pph23),
            kredit: 0
          }
          pph23x.push(kas)
        }
        const pph23y = []
        for (let x = 0; x < arrfilter.length; x++) {
          const er = arrfilter[x]
          const utang = {
            kode: '2.1.01.05.03.0001',
            uraian: 'Utang PPh 23',
            debit: 0,
            kredit: parseFloat(er.pph23)
          }
          pph23y.push(utang)
        }

        const pph23a = []
        for (let x = 0; x < arrfilter.length; x++) {
          const er = arrfilter[x]
          const kas = {
            kode: '2.1.01.05.03.0001',
            uraian: 'Utang PPh 23',
            debit: parseFloat(er.pph23),
            kredit: 0
          }
          pph23a.push(kas)
        }
        const pph23b = []
        for (let x = 0; x < arrfilter.length; x++) {
          const er = arrfilter[x]
          const utang = {
            kode: '1.1.01.03.01.0001',
            uraian: 'Kas di Bendahara Pengeluaran',
            debit: 0,
            kredit: parseFloat(er.pph23)
          }
          pph23b.push(utang)
        }

        const pph25x = []
        for (let x = 0; x < arrfilter.length; x++) {
          const er = arrfilter[x]
          const kas = {
            kode: '1.1.01.03.01.0001',
            uraian: 'Kas di Bendahara Pengeluaran',
            debit: parseFloat(er.pph25),
            kredit: 0
          }
          pph25x.push(kas)
        }
        const pph25y = []
        for (let x = 0; x < arrfilter.length; x++) {
          const er = arrfilter[x]
          const utang = {
            kode: '2.1.01.05.04.0001',
            uraian: 'Utang PPh 25',
            debit: 0,
            kredit: parseFloat(er.pph25)
          }
          pph25y.push(utang)
        }

        const pph25a = []
        for (let x = 0; x < arrfilter.length; x++) {
          const er = arrfilter[x]
          const kas = {
            kode: '2.1.01.05.04.0001',
            uraian: 'Utang PPh 25',
            debit: parseFloat(er.pph25),
            kredit: 0
          }
          pph25a.push(kas)
        }
        const pph25b = []
        for (let x = 0; x < arrfilter.length; x++) {
          const er = arrfilter[x]
          const utang = {
            kode: '1.1.01.03.01.0001',
            uraian: 'Kas di Bendahara Pengeluaran',
            debit: 0,
            kredit: parseFloat(er.pph25)
          }
          pph25b.push(utang)
        }

        const ppnpusatx = []
        for (let x = 0; x < arrfilter.length; x++) {
          const er = arrfilter[x]
          const kas = {
            kode: '1.1.01.03.01.0001',
            uraian: 'Kas di Bendahara Pengeluaran',
            debit: parseFloat(er.ppnpusat),
            kredit: 0
          }
          ppnpusatx.push(kas)
        }
        const ppnpusaty = []
        for (let x = 0; x < arrfilter.length; x++) {
          const er = arrfilter[x]
          const utang = {
            kode: '2.1.01.06.01.0001',
            uraian: 'Utang PPN Pusat',
            debit: 0,
            kredit: parseFloat(er.ppnpusat)
          }
          ppnpusaty.push(utang)
        }

        const ppnpusata = []
        for (let x = 0; x < arrfilter.length; x++) {
          const er = arrfilter[x]
          const kas = {
            kode: '2.1.01.06.01.0001',
            uraian: 'Utang PPN Pusat',
            debit: parseFloat(er.ppnpusat),
            kredit: 0
          }
          ppnpusata.push(kas)
        }
        const ppnpusatb = []
        for (let x = 0; x < arrfilter.length; x++) {
          const er = arrfilter[x]
          const utang = {
            kode: '1.1.01.03.01.0001',
            uraian: 'Kas di Bendahara Pengeluaran',
            debit: 0,
            kredit: parseFloat(er.ppnpusat)
          }
          ppnpusatb.push(utang)
        }

        const pasal4x = []
        for (let x = 0; x < arrfilter.length; x++) {
          const er = arrfilter[x]
          const kas = {
            kode: '1.1.01.03.01.0001',
            uraian: 'Kas di Bendahara Pengeluaran',
            debit: parseFloat(er.pasal4),
            kredit: 0
          }
          pasal4x.push(kas)
        }
        const pasal4y = []
        for (let x = 0; x < arrfilter.length; x++) {
          const er = arrfilter[x]
          const utang = {
            kode: '2.1.01.05.05.0001',
            uraian: 'Utang Pasal 4 Ayat 2',
            debit: 0,
            kredit: parseFloat(er.pasal4)
          }
          pasal4y.push(utang)
        }

        const pasal4a = []
        for (let x = 0; x < arrfilter.length; x++) {
          const er = arrfilter[x]
          const kas = {
            kode: '2.1.01.05.05.0001',
            uraian: 'Utang Pasal 4 Ayat 2',
            debit: parseFloat(er.pasal4),
            kredit: 0
          }
          pasal4a.push(kas)
        }
        const pasal4b = []
        for (let x = 0; x < arrfilter.length; x++) {
          const er = arrfilter[x]
          const utang = {
            kode: '1.1.01.03.01.0001',
            uraian: 'Kas di Bendahara Pengeluaran',
            debit: 0,
            kredit: parseFloat(er.pasal4)
          }
          pasal4b.push(utang)
        }

        const pajakdaerahx = []
        for (let x = 0; x < arrfilter.length; x++) {
          const er = arrfilter[x]
          const kas = {
            kode: '1.1.01.03.01.0001',
            uraian: 'Kas di Bendahara Pengeluaran',
            debit: parseFloat(er.pajakdaerah),
            kredit: 0
          }
          pajakdaerahx.push(kas)
        }
        const pajakdaerahy = []
        for (let x = 0; x < arrfilter.length; x++) {
          const er = arrfilter[x]
          const utang = {
            kode: '2.1.01.06.02.0001',
            uraian: 'Utang Pajak Daerah',
            debit: 0,
            kredit: parseFloat(er.pajakdaerah)
          }
          pajakdaerahy.push(utang)
        }

        const pajakdaeraha = []
        for (let x = 0; x < arrfilter.length; x++) {
          const er = arrfilter[x]
          const kas = {
            kode: '2.1.01.06.02.0001',
            uraian: 'Utang Pajak Daerah',
            debit: parseFloat(er.pajakdaerah),
            kredit: 0
          }
          pajakdaeraha.push(kas)
        }
        const pajakdaerahb = []
        for (let x = 0; x < arrfilter.length; x++) {
          const er = arrfilter[x]
          const utang = {
            kode: '1.1.01.03.01.0001',
            uraian: 'Kas di Bendahara Pengeluaran',
            debit: 0,
            kredit: parseFloat(er.pajakdaerah)
          }
          pajakdaerahb.push(utang)
        }

        const obj = {
          tanggal: arr.filter((x) => x.nonpdls === el)[0]?.tglpindahbuku,
          notrans: arr.filter((x) => x.nonpdls === el)[0]?.nonpdls,
          kegiatan: arr.filter((x) => x.nonpdls === el)[0]?.kegiatanblud,
          keterangan: 'Potongan Pajak',
          d_pjk: [pph21x, pph22x, pph23x, pph25x, ppnpusatx, pasal4x, pajakdaerahx],
          k_pjk: [pph21y, pph22y, pph23y, pph25y, ppnpusaty, pasal4y, pajakdaerahy],
          d_pjk1: [pph21a, pph22a, pph23a, pph25a, ppnpusata, pasal4a, pajakdaeraha],
          k_pjk1: [pph21b, pph22b, pph23b, pph25b, ppnpusatb, pasal4b, pajakdaerahb]
          // d_pjk1: [pph22x, pph22a],
          // k_pjk1: [pph22y, pph22b],
          // d_pjk2: [pph23x, pph23a],
          // k_pjk2: [pph23y, pph23b],
          // d_pjk3: [pph25x, pph25a],
          // k_pjk3: [pph25y, pph25b],
          // d_pjk4: [ppnpusatx, ppnpusata],
          // k_pjk4: [ppnpusaty, ppnpusatb],
          // d_pjk5: [pasal4x, pasal4a],
          // k_pjk5: [pasal4y, pasal4b],
          // d_pjk6: [pajakdaerahx, pajakdaeraha],
          // k_pjk6: [pajakdaerahy, pajakdaerahb]

        }
        pajakls.push(obj)
      }
      console.log('pajakls', pajakls)
      const gabungan = stp?.concat(
        bastfarm, cairnonstp,
        cairstpz, pajakls, cp, dataspmup,
        dataspmgu, spjpjr, datanihil
      )
      const sortByDate = (gabungan) =>
        gabungan.sort(({ tanggal: a }, { tanggal: b }) =>
          a < b ? -1 : a > b ? 1 : 0
        )
      const arrJurnal = sortByDate(gabungan)
      this.jurnals = arrJurnal
      console.log('data STP', this.jurnals)
    }
  }

})
