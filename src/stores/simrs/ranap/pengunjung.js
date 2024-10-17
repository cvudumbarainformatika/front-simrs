import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { dateDbFormat } from 'src/modules/formatter'

export const usePengunjungRanapStore = defineStore('pengunjung-ranap', {
  state: () => ({
    pasiens: [],
    meta: null,
    params: {
      page: 1,
      q: '',
      status: 'Belum Pulang',
      to: dateDbFormat(new Date()),
      from: dateDbFormat(new Date()),
      per_page: 100,
      koderuangan: ['SEMUA']
    },
    periods: ['Hari Ini', 'Minggu Ini', 'Bulan Ini'],
    periode: 'Hari Ini',
    ruangans: ['SEMUA'],
    ruangan: 'SEMUA',
    statuses: ['Belum Pulang', 'Pulang'],
    statusx: 'Belum Pulang',
    jeniskasus: [],
    jnsKasusPasien: null,
    loading: false,
    pageLayanan: false,
    loadingLayanan: false,
    pasien: null
  }),

  persist: true,

  actions: {
    async getData () {
      this.loading = true
      const params = { params: this.params }
      try {
        const resp = await api.get('v1/simrs/ranap/ruangan/kunjunganpasien', params)
        // console.log('ranap', resp)
        if (resp.status === 200) {
          this.meta = resp.data
          this.pasiens = resp.data.data
          this.loading = false
        }
        this.loading = false
        // // console.log(resp)
      }
      catch (error) {
        // console.log(error)
        this.loading = false
      }
    },

    goToPage (val) {
      this.params.page = val
      this.getData()
    },
    refresh () {
      this.params.page = 1
      this.getData()
    },
    bukaLayanan (val, pasien) {
      this.pageLayanan = val
      this.loadingLayanan = true
      const form = { noreg: pasien?.noreg }

      this.persiapanInjectPasien(pasien)

      return new Promise((resolve, reject) => {
        api.post('v1/simrs/ranap/ruangan/bukalayanan', form)
          .then(resp => {
            // console.log('ranap', resp)
            this.loadingLayanan = false
            // if (resp.status === 200) {
            this.setPasien(pasien, resp.data)
            const indexPasien = this.pasiens.findIndex(x => x.noreg === pasien.noreg)

            const jnsKasus = this.pasiens[indexPasien]?.kd_jeniskasus

            if (this.jeniskasus.length && jnsKasus) {
              this.jnsKasusPasien = this.jeniskasus.find(x => x.kode === jnsKasus) ?? null
            }

            resolve(this.pasiens[indexPasien])
          })
          .catch(err => {
            // console.log('error buka layanan', err)
            this.loadingLayanan = false
            reject(err)
          })
      })
    },

    persiapanInjectPasien (pasien) {
      const findPasien = this.pasiens.filter(x => x?.noreg === pasien?.noreg)
      if (findPasien.length) {
        // const datax = findPasien[0]

        // datax.diagnosamedis = []
        // datax.anamnesis = []
        // datax.pemeriksaan = []
        // datax.penilaian = []
        // datax.tindakan = []
        // datax.diagnosakeperawatan = []
        // datax.cppt = []
        // datax.laborats = []
        // datax.radiologi = []
        // datax.fisio = []
        // datax.operasi = []
      }
    },

    setPasien (pasien, data) {
      const findPasien = this.pasiens.filter(x => x?.noreg === pasien?.noreg)
      // this.pasiens[indexPasien] = data
      // // console.log('wew', this.pasiens[indexPasien])
      if (findPasien.length) {
        const datax = findPasien[0]
        datax.newapotekrajal = data?.newapotekrajal ?? []
        datax.diagnosa = data?.diagnosa ?? []
        datax.anamnesis = data?.anamnesis ?? [] // wes
        datax.pemeriksaan = data?.pemeriksaan ?? [] // wes
        datax.penilaian = data?.penilaian ?? [] // wes
        datax.diagnosamedis = data?.diagnosamedis ?? []
        datax.tindakan = data?.tindakan ?? []
        datax.diagnosakeperawatan = data?.diagnosakeperawatan ?? []
        datax.cppt = data?.cppt ?? []
        datax.laborats = data?.laborats ?? []
        datax.radiologi = data?.radiologi ?? []
        datax.fisio = data?.fisio ?? []
        datax.operasi = data?.operasi ?? []
      }
    },
    getRuangan () {
      return new Promise((resolve, reject) => {
        api.get('v1/simrs/ranap/ruangan/listruanganranap')
          .then(resp => {
            // console.log('ruangan ranap', resp)
            if (resp.status === 200) {
              this.ruangans = resp.data
              this.ruangans.push('SEMUA')
              this.params.koderuangan = this.ruangans.map(x => x.groups)
            }
            resolve(resp)
          }).catch(err => {
            // console.log(err)
            reject(err)
          })
      })
    },

    gantiRuangan () {
      // console.log('gnt ruangan', this.ruangan)
      if (this.ruangan === 'SEMUA') {
        this.params.koderuangan = this.ruangans.map(x => x.groups)
        this.getData()
      }
      else {
        this.params.koderuangan = [this.ruangan]
        this.getData()
      }
    },
    gantiPeriode (val) {
      if (val === 'Hari Ini') {
        this.hariIni()
      }
      else if (val === 'Minggu Ini') {
        this.mingguIni()
      }
      else if (val === 'Bulan Ini') {
        this.bulanIni()
      }
      this.getData()
    },
    hariIni () {
      const cDate = new Date()
      this.params.to = dateDbFormat(cDate)
      this.params.from = dateDbFormat(cDate)
    },
    mingguIni () {
      const curr = new Date()
      const firstday = new Date(curr.setDate(curr.getDate() - curr.getDay()))
      const lastday = new Date(curr.setDate(curr.getDate() - curr.getDay() + 6))
      this.params.to = dateDbFormat(firstday)
      this.params.from = dateDbFormat(lastday)
    },
    bulanIni () {
      const curr = new Date()
      const firstday = date.formatDate(curr, 'YYYY') + '-' + date.formatDate(curr, 'MM') + '-01'
      const lastday = date.formatDate(curr, 'YYYY') + '-' + date.formatDate(curr, 'MM') + '-31'
      this.params.to = dateDbFormat(firstday)
      this.params.from = dateDbFormat(lastday)
    },

    tahunIni () {
      const curr = new Date()
      const firstday = date.formatDate(curr, 'YYYY') + '-01' + '-01'
      const lastday = date.formatDate(curr, 'YYYY') + '-12' + '-31'
      this.params.to = dateDbFormat(firstday)
      this.params.from = dateDbFormat(lastday)
    },
    async getJenisKasus () {
      const resp = await api.get('v1/simrs/ranap/ruangan/listjeniskasus')
      console.log('jns kasus', resp.data)
      if (resp.status === 200) {
        this.jeniskasus = resp.data
      }
    },
    async gantiJenisKasus (val, pasien) {
      console.log('ganti jns kasus', val, pasien)
      const form = {
        noreg: pasien?.noreg,
        kd_jeniskasus: val?.kode
      }

      const resp = await api.post('v1/simrs/ranap/ruangan/gantijeniskasus', form)
      if (resp.status === 200) {
        const noreg = pasien?.noreg
        const isi = resp.data?.kd_jeniskasus
        this.jnsKasusPasien = val
        this.injectDataPasien(noreg, isi, 'kd_jeniskasus')
        // console.log('result', pasien)
      }
    },

    async gantiDpjp (form, pasien) {
      // console.log(form)
      // this.loadingSaveGantiDpjp = true
      // try {
      //   const resp = await api.post('/v1/simrs/pelayanan/gantidpjp', form)
      //   // console.log(resp)
      //   if (resp.status === 200) {
      //     const findPasien = this.items.filter(x => x.rs1 === pasien?.rs1)
      //     if (findPasien.length) {
      //       const data = findPasien[0]
      //       data.datasimpeg = resp?.data?.result?.datasimpeg
      //       data.dokter = resp?.data?.result?.datasimpeg?.nama
      //       data.kodedokter = resp?.data?.result?.datasimpeg?.kdpegsimrs
      //       this.loadingSaveGantiDpjp = false
      //     }

      //     this.loadingSaveGantiDpjp = false
      //   }
      //   this.loadingSaveGantiDpjp = false
      // }
      // catch (error) {
      //   console.log(error)
      //   this.loadingSaveGantiDpjp = false
      // }
    },

    gantiMemo (form, pasien) {
      // console.log(form)
      return new Promise((resolve, reject) => {
        api.post('/v1/simrs/pelayanan/gantimemo', form)
          .then(resp => {
            // console.log(resp)
            if (resp.status === 200) {
              const findPasien = this.pasiens.filter(x => x.noreg === pasien?.noreg)
              if (findPasien.length) {
                const data = findPasien[0]
                data.memodiagnosa = resp?.data?.result?.diagnosa
              }
            }
            resolve(resp)
          }).catch(err => {
            console.log(err)
          })
      })
    },

    injectDataPasien (noreg, val, kode, arr) {
      const findPasien = this.pasiens.filter(x => x.noreg === noreg)
      // console.log('inject pasien', findPasien)
      if (findPasien.length) {
        const data = findPasien[0]
        // data[kode] = val
        if (kode === 'kd_jeniskasus') {
          data[kode] = val
        }
        else {
          const target = data[kode]?.find(x => x.id === val?.id) ?? null
          // console.log('inject target pasien', target, kode, val, data)
          // console.log('inject kode pasien', kode)
          // console.log('inject isi pasien', val)

          if (target) {
            Object.assign(target, val)
          }
          else {
            data[kode]?.splice(0, 0, val)
            // data[kode].push(val)
          }
        }
      }
    },

    injectDataArray (noreg, arr, kode) {
      const findPasien = this.pasiens.filter(x => x?.noreg === noreg)
      // console.log('inject pasien', findPasien)
      if (findPasien.length) {
        const data = findPasien[0]

        // const target = data[kode]?.find(x => x.id === val?.id) ?? null
        // console.log('inject target pasien', target, kode, val, data)
        // console.log('inject kode pasien', kode)
        // console.log('inject isi pasien', val)

        data[kode] = arr
      }
    },
    deleteInjectanNull (noreg, kode) {
      const findPasien = this.pasiens.filter(x => x.noreg === noreg)
      if (findPasien.length) {
        const data = findPasien[0]
        const target = data[kode]?.find(x => x?.id === null) ?? null
        if (target) {
          data[kode]?.splice(data[kode]?.findIndex(x => x?.id === null), 1)
        }
      }
    },

    hapusDataInjectan (pasien, id, key) {
      console.log('hapusDataInjectan', key, id, pasien)

      const findPasien = this.pasiens.filter(x => x?.noreg === pasien?.noreg)
      console.log('find pasien', findPasien)

      if (findPasien.length) {
        const data = findPasien[0][key]
        console.log('data', data)

        const pos = data.findIndex(el => el.id === id)
        if (pos >= 0) { data.splice(pos, 1) }
      }
    }
  }
})
