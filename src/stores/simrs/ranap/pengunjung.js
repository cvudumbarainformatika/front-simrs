import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { dateDbFormat } from 'src/modules/formatter'
import { useAplikasiStore } from 'src/stores/app/aplikasi'

export const usePengunjungRanapStore = defineStore('pengunjung-ranap', {
  state: () => ({
    pasiens: [],
    meta: null,
    params: {
      page: 1,
      q: '',
      status: 'Belum Pulang',
      from: dateDbFormat(new Date()),
      to: dateDbFormat(new Date()),
      per_page: 100,
      koderuangan: null
    },
    periods: ['Hari Ini', 'Minggu Ini', 'Bulan Ini'],
    periode: 'Hari Ini',
    ruangans: [],
    ruangan: null,
    statuses: ['Belum Pulang', 'Pulang'],
    statusx: 'Belum Pulang',
    jeniskasus: [],
    jnsKasusPasien: null,
    loading: false,
    pageLayanan: false,
    loadingLayanan: false,
    pasien: null,
    nakes: null,
    nonNakes: null,

    berhakAkses: true,

    loadingSaveGantiDpjp: false
  }),

  // persist: true,

  actions: {
    async getData () {
      this.loading = true
      const params = { params: this.params }
      try {
        const resp = await api.get('v1/simrs/ranap/ruangan/kunjunganpasien', params)
        // console.log('kunjungan ranap', resp)
        if (resp.status === 200) {
          // this.meta = resp.data
          // this.pasiens = resp.data.data
          this.meta = resp.data?.data
          this.pasiens = resp.data?.data?.data
          this.meta.total = resp?.data?.total
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

      // this.persiapanInjectPasien(pasien)

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

    setPasien (pasien, data) {
      const findPasien = this.pasiens.filter(x => x?.noreg === pasien?.noreg)
      // this.pasiens[indexPasien] = data
      // // console.log('wew', this.pasiens[indexPasien])
      if (findPasien.length) {
        const datax = findPasien[0]
        datax.dataigd = data?.dataigd ?? null
        datax.newapotekrajal = data?.newapotekrajal ?? []
        datax.diagnosa = data?.diagnosa ?? []
        datax.anamnesis = data?.anamnesis ?? [] // wes
        datax.pemeriksaan = data?.pemeriksaan ?? [] // wes
        datax.penilaian = data?.penilaian ?? [] // wes
        datax.diagnosamedis = data?.diagnosamedis ?? []
        datax.tindakan = data?.tindakan ?? []
        datax.diagnosakeperawatan = data?.diagnosakeperawatan ?? []
        datax.diagnosakebidanan = data?.diagnosakebidanan ?? []
        datax.diagnosagizi = data?.diagnosagizi ?? []
        datax.cppt = data?.cppt ?? []
        datax.laborats = data?.laborats ?? []
        datax.laboratold = data?.laboratold ?? []
        datax.hasilradiologi = data?.hasilradiologi ?? []
        datax.radiologi = data?.radiologi ?? []
        datax.fisio = data?.fisio ?? []
        datax.operasi = data?.operasi ?? []
        // datax.operasi_ird = data?.operasi_ird ?? []
        datax.bankdarah = data?.bankdarah ?? []
        datax.apheresis = data?.apheresis ?? []
        datax.cathlab = data?.cathlab ?? []
        datax.penunjanglain = data?.penunjanglain ?? []
        datax.permintaanambulan = data?.permintaanambulan ?? []
        // datax.oksigen = data?.oksigen ?? []
        datax.perawatanjenazah = data?.perawatanjenazah ?? []
        datax.hais = data?.hais ?? []
        datax.konsultasi = data?.konsultasi ?? []
        datax.edukasi = data?.edukasi ?? []
        datax.dokumenluar = data?.dokumenluar ?? []
        datax.informconcern = data?.informconcern ?? []
        datax.dischargeplanning = data?.dischargeplanning ?? []
        datax.skriningdischargeplannings = data?.skriningdischargeplannings ?? []
        datax.summarydischargeplannings = data?.summarydischargeplannings ?? []
        datax.statuscovid = data?.statuscovid ?? []
        datax.procedure = data?.procedure ?? []
        datax.keterangantindakan = data?.keterangantindakan ?? []
        datax.planningdokter = data?.planningdokter ?? null

        // data sementara
        datax.diagnosaKeperawatanUlangSementara = []
      }
    },
    getRuangan () {
      return new Promise((resolve, reject) => {
        api.get('v1/simrs/ranap/ruangan/listruanganranap')
          .then(resp => {
            // console.log('ruangan ranap', resp)
            if (resp.status === 200) {
              const ruangs = resp.data
              this.ruangans = []
              // this.ruangans.push('SEMUA')

              // this.ruangan = this.ruangans.map(x => x.groups)

              // cari auth perawat
              const auth = useAplikasiStore()
              const user = auth?.user
              const nakes = auth?.user?.pegawai?.kdgroupnakes
              const ruanganPerawat = user?.pegawai?.ruangan?.kdmapping

              const kodenakes = ['1', '2', '3', '4', '5']

              // console.log('auth', kodenakes.filter(x => x?.includes(nakes)), user)
              if (user?.username !== 'sa') {
                console.log('bukan sa')
                if (kodenakes.filter(x => x?.includes(nakes))?.length === 0) {
                  console.log('bukan perawat')
                  this.berhakAkses = false
                  this.ruangans = []
                }
                else {
                  this.berhakAkses = true
                  // cari ruangan
                  if (nakes === '2' || nakes === '3') {
                    this.ruangans = ruangs?.filter(x => x.groups === ruanganPerawat)
                    console.log('ini nakes', this.ruangans)
                  }
                  else {
                    this.ruangans = ruangs
                  }
                }
              }
              else {
                this.berhakAkses = true
                this.ruangans = ruangs
              }
              // console.log('akhir', this.ruangans)
              // this.params.koderuangan = this.aksesRuangan()
            }
            resolve(resp)
          }).catch(err => {
            // console.log(err)
            reject(err)
          })
      })
    },

    aksesRuangan () {
      let ruang = null
      if (this.ruangans.length > 0) {
        if (this.ruangans.length === 1) {
          ruang = this.ruangans[0]?.groups
        }
        else if (this.ruangans?.length > 1) {
          this.ruangans.unshift('SEMUA')
          ruang = this.ruangans[0]
        }
      }
      else {
        ruang = null
      }

      return ruang
    },

    gantiRuangan () {
      // console.log('gnt ruangan', this.ruangan)
      // if (this.ruangan === 'SEMUA') {
      //   this.params.koderuangan = this.ruangans.map(x => x.groups)
      //   this.getData()
      // }
      // else {
      //   this.params.koderuangan = [this.ruangan ?? '']
      //   this.getData()
      // }
      this.params.page = 1
      this.params.koderuangan = this.ruangan
      this.getData()
    },

    initReset () {
      this.ruangan = this.aksesRuangan()
      this.params.page = 1
      this.params.koderuangan = this.ruangan
      this.params.q = ''
      this.params.status = 'Belum Pulang'
      this.params.to = dateDbFormat(new Date())
      this.params.from = dateDbFormat(new Date())
      this.params.per_page = 100

      this.getData()
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
      // console.log('jns kasus', resp.data)
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
      // console.log('ganti dpjp', form, pasien)
      this.loadingSaveGantiDpjp = true
      try {
        const resp = await api.post('/v1/simrs/ranap/ruangan/gantidpjp', form)
        // console.log(resp)
        if (resp.status === 200) {
          const findPasien = this.pasiens.filter(x => x.noreg === pasien?.noreg)
          if (findPasien.length) {
            const data = findPasien[0]
            // data.datasimpeg = resp?.data?.result?.datasimpeg
            data.dokter = resp?.data?.result?.datasimpeg?.nama
            data.kodedokter = resp?.data?.result?.datasimpeg?.kdpegsimrs
            data.kddokter = resp?.data?.result?.datasimpeg?.kdpegsimrs
            this.loadingSaveGantiDpjp = false
          }

          this.loadingSaveGantiDpjp = false
        }
        this.loadingSaveGantiDpjp = false
      }
      catch (error) {
        console.log(error)
        this.loadingSaveGantiDpjp = false
      }
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
        if (kode === 'kd_jeniskasus' ||
          kode === 'status' || kode === 'carakeluar' || kode === 'prognosis' ||
          kode === 'tindaklanjut' || kode === 'diagakhir' || kode === 'sebabkematian') {
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
        data[kode] = arr
      }
    },

    injectUpdatean (noreg, id, val, kode) {
      const findPasien = this.pasiens.filter(x => x?.noreg === noreg)
      if (findPasien.length) {
        const data = findPasien[0]
        const target = data[kode]?.find(x => x?.id === id)
        if (target) {
          Object.assign(target, val)
        }
      }
    },
    deleteInjectanNull (noreg, kode) {
      const findPasien = this.pasiens.filter(x => x.noreg === noreg)
      if (findPasien.length) {
        const data = findPasien[0]
        const target = data[kode]?.find(x => x?.id === null || x?.id === '' || x?.id === undefined || !('id' in x)) ?? null
        if (target) {
          data[kode]?.splice(data[kode]?.findIndex(x => x?.id === null), 1)
        }
      }
    },
    deleteInjectanNull2 (noreg, kode) {
      const findPasien = this.pasiens.filter(x => x.noreg === noreg)
      if (findPasien.length) {
        const data = findPasien[0]
        const target = data[kode]?.find(x => !('id' in x))
        if (target) {
          data[kode]?.splice(target, 1)
        }
      }
    },

    hapusDataInjectan (pasien, id, key) {
      // console.log('hapusDataInjectan', key, id, pasien)

      const findPasien = this.pasiens.filter(x => x?.noreg === pasien?.noreg)
      console.log('find pasien', findPasien)

      if (findPasien.length) {
        const data = findPasien[0][key]
        console.log('data', data)

        const pos = data.findIndex(el => el.id === id)
        if (pos >= 0) { data.splice(pos, 1) }
      }
    },

    async getNakes () {
      const resp = await api.get('/v1/simrs/master/pegawai/listnakes')
      // console.log('nakes', resp)

      if (resp.status === 200) {
        this.nakes = resp.data
      }
    },
    async getNonNakes () {
      const resp = await api.get('/v1/simrs/master/pegawai/listnonnakes')
      // console.log('non nakes', resp)

      if (resp.status === 200) {
        this.nonNakes = resp.data
      }
    }
  }
})
