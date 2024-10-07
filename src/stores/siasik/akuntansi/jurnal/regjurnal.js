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
    datastp: []
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
            kode50: x.jurnal.kode_lra,
            uraian: x.jurnal.uraian_lra,
            kode_lo: x.jurnal.kode_lo,
            uraian_lo: x.jurnal.uraian_lo,
            kode_nrc: x.jurnal.kode_neraca1,
            uraian_nrc: x.jurnal.uraian_neraca1,
            kode_neraca: x.jurnal.kode_neraca2,
            uraian_neraca: x.jurnal.uraian_neraca2,
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
            kode_lo: arr50.filter((x) => x.kode50 === el)[0]?.kode_lo,
            uraian_lo: arr50.filter((x) => x.kode50 === el)[0]?.uraian_lo,
            kode_neraca: arr50.filter((x) => x.kode50 === el)[0]?.kode_nrc,
            uraian_neraca: arr50.filter((x) => x.kode50 === el)[0]?.uraian_nrc,
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
            kode_lo: null,
            uraian_lo: null,
            kode_neraca: arr50.filter((x) => x.kode50 === el)[0]?.kode_neraca,
            uraian_neraca: arr50.filter((x) => x.kode50 === el)[0]?.uraian_neraca,
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
        // const ri = el[i].rincianbast
        const rinci = el[i].rincianbast.map((x) => {
          return {
            kode50: x.masterobat.jurnal.kode_lra,
            uraian: x.masterobat.jurnal.uraian_lra,
            kode_lo: x.masterobat.jurnal.kode_lo,
            uraian_lo: x.masterobat.jurnal.uraian_lo,
            kode_nrc: x.masterobat.jurnal.kode_neraca1,
            uraian_nrc: x.masterobat.jurnal.uraian_neraca1,
            kode_neraca: x.masterobat.jurnal.kode_neraca2,
            uraian_neraca: x.masterobat.jurnal.uraian_neraca2,
            nilai: parseFloat(x.subtotal)
          }
        })
        arr50bast.push(...rinci)

        const unik50 = rinci.map((s) => s.kode50)
        const unik = unik50.length ? [...new Set(unik50)] : []
        console.log('nilaaaaaaaai', unik)
        const kode50x = []
        for (let i = 0; i < unik.length; i++) {
          const el = unik[i]
          const ob = {
            koderek50: arr50bast.filter((x) => x.kode50 === el)[0]?.kode50,
            uraian50: arr50bast.filter((x) => x.kode50 === el)[0]?.uraian
          }
          kode50x.push(ob)
          // console.log('nilaaaaaaaai', ob.nilai)
        }
        const rincidebit = []
        for (let i = 0; i < unik.length; i++) {
          const el = unik[i]
          const ob = {
            kode_lo: arr50bast.filter((x) => x.kode50 === el)[0]?.kode_lo,
            uraian_lo: arr50bast.filter((x) => x.kode50 === el)[0]?.uraian_lo,
            kode_neraca: null,
            uraian_neraca: null,
            debit: arr50bast.filter((x) => x.kode50 === el).map((x) => x.nilai).reduce((a, b) => a + b, 0),
            kredit: 0
          }
          rincidebit.push(ob)
          // console.log('nilaaaaaaaai', ob.nilai)
        }
        const rincikredit = []
        for (let i = 0; i < unik.length; i++) {
          const el = unik[i]
          const ob = {
            kode_lo: null,
            uraian_lo: null,
            kode_neraca: arr50bast.filter((x) => x.kode50 === el)[0]?.kode_neraca,
            uraian_neraca: arr50bast.filter((x) => x.kode50 === el)[0]?.uraian_neraca,
            debit: 0,
            kredit: arr50bast.filter((x) => x.kode50 === el).map((x) => x.nilai).reduce((a, b) => a + b, 0)
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
        console.log('rincibast', bastfarm)
      }

      const gabungan = stp?.concat(
        bastfarm
      )
      const sortByDate = (gabungan) =>
        gabungan.sort(({ tgl: a }, { tgl: b }) =>
          a < b ? -1 : a > b ? 1 : 0
        )
      const arrJurnal = sortByDate(gabungan)
      this.datastp = arrJurnal
      console.log('data STP', this.datastp)
    }
  }

})
