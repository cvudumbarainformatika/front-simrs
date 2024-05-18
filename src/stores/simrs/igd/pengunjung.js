import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { dateDbFormat } from 'src/modules/formatter'

export const usePengunjungIgdStore = defineStore('pengunjung-igd', {
  state: () => ({
    tab: 'Diagnosa Medik',
    tabs: ['Diagnosa Medik', 'Tindakan Medik'],
    items: [],
    loading: false,
    loadingSaveGantiDpjp: false,
    pasiens: [],
    meta: null,
    loadingIcare: false,
    loadingTerima: false,
    loadingTidakhadir: false,
    loadingCall: false,
    noreg: null,
    flagpelayanan: null,
    params: {
      q: '',
      page: 1,
      per_page: 10,
      to: dateDbFormat(new Date()),
      from: dateDbFormat(new Date()),
      status: ''
    },
    notaTindakans: [],
    notaTindakan: 'BARU',
    periods: ['Hari Ini', 'Minggu Ini', 'Bulan Ini', 'Tahun Ini'],
    periode: 'Hari Ini',
    pageLayanan: false
  }),
  actions: {
    setParams(key, val) {
      this.params[key] = val
    },
    goToPage(val) {
      this.params.page = val
      this.getData()
    },
    search(val) {
      this.params.q = val
      this.params.page = 1
      this.getData()
    },
    refresh(val) {
      this.params.page = 1
      this.getData()
    },
    async getData() {
      this.loading = true
      const params = { params: this.params }
      await api.get('v1/simrs/pendaftaran/igd/kunjunganpasienigd', params)
        .then(resp => {
          // console.log('kunjungan igd', resp?.data?.data)
          this.loading = false
          this.pasiens = resp?.data?.data
          this.items = resp?.data?.data
          this.meta = resp?.data
        })
        .catch(() => { this.loading = false })
    },
    async gantiDpjp(form, pasien) {
      // console.log(form)
      this.loadingSaveGantiDpjp = true
      try {
        const resp = await api.post('/v1/simrs/pelayanan/gantidpjp', form)
        if (resp.status === 200) {
          const findPasien = this.items.filter(x => x === pasien)
          if (findPasien.length) {
            const data = findPasien[0]
            data.datasimpeg = resp?.data?.result?.datasimpeg
            data.dokter = resp?.data?.result?.datasimpeg?.nama
            data.kodedokter = resp?.data?.result?.datasimpeg?.kdpegsimrs
            this.loadingSaveGantiDpjp = false
          }

          this.loadingSaveGantiDpjp = false
        }
        this.loadingSaveGantiDpjp = false
      } catch (error) {
        console.log(error)
        this.loadingSaveGantiDpjp = false
      }
    },
    setPeriodik(val) {
      // console.log('wew', val)
      this.params.page = 1
      const { to, from, status } = val
      this.params.to = to
      this.params.from = from
      this.params.status = status
      // console.log('periodik', to)
      this.getData()
    },
    setDate(val) {
      this.params.tgl = val
    },
    setQ(payload) {
      this.params.page = 1
      this.params.q = payload
      this.getLists()
    },
    setPerPage(payload) {
      console.log('sasa', payload)
      this.params.page = 1
      this.params.per_page = payload
      this.getLists()
    },
    setFilters() {
      this.filters = !this.filters
    },
    async setTerima(pasien) {
      this.loadingTerima = true
      const form = { noreg: pasien?.noreg }
      this.noreg = pasien?.noreg
      try {
        const resp = await api.post('v1/simrs/pelayanan/igd/terimapasien', form)
        console.log('terima', resp)
        if (resp.status === 200) {
          const wew = this.items.filter(x => x === pasien)
          // console.log('wew', wew)
          if (wew.length) {
            wew[0].flagpelayanan = '2'
          }
          this.loadingTerima = false
          this.noreg = null
        }
      } catch (error) {
        console.log(error)
        this.loadingTerima = false
        this.noreg = null
        this.notifikasiError('Maaf.. Harap ulangi, Ada Kesalahan ')
      }
    },
    async bukaLayanan(pasien) {
      // this.loadingCall = false
      this.loadingTerima = true
      // console.log('load1', this.loadingTerima)
      const form = { noreg: pasien?.noreg }
      this.noreg = pasien?.noreg
      this.togglePageTindakan()
      try {
        const resp = await api.post('v1/simrs/pelayanan/igd/terimapasien', form)
        // console.log('terima', resp)
        if (resp.status === 200) {
          const findPasien = this.items.filter(x => x?.rs1 === pasien?.noreg)
          if (findPasien.length) {
            // findPasien[0].status = findPasien[0].status === '' ? '2' : findPasien[0].status

            // BARU
            findPasien[0].anamnesis = resp?.data?.anamnesis
            findPasien[0].datasimpeg = resp?.data?.datasimpeg
            findPasien[0].diagnosa = resp?.data?.diagnosa
            findPasien[0].permintaanperawatanjenazah = resp?.data?.permintaanperawatanjenazah
            // findPasien[0].diagnosakebidanan = resp?.data?.diagnosakebidanan
            // findPasien[0].edukasi = resp?.data?.edukasi
            findPasien[0].fisio = resp?.data?.fisio
            // findPasien[0].gambars = resp?.data?.gambars
            findPasien[0].laborats = resp?.data?.laborats
            // findPasien[0].newapotekrajal = resp?.data?.newapotekrajal
            findPasien[0].ok = resp?.data?.ok
            // findPasien[0].pemeriksaanfisik = resp?.data?.pemeriksaanfisik
            findPasien[0].penunjanglain = resp?.data?.penunjanglain
            // findPasien[0].planning = resp?.data?.planning
            findPasien[0].radiologi = resp?.data?.radiologi
            // findPasien[0].sharing = resp?.data?.sharing
            // findPasien[0].taskid = resp?.data?.taskid
            findPasien[0].tindakan = resp?.data?.tindakan
            // BARU
            // findPasien[0].laporantindakan = resp?.data?.laporantindakan
            // findPasien[0].psikiatri = resp?.data?.psikiatri
            // findPasien[0].neonatusmedis = resp?.data?.neonatusmedis
            // findPasien[0].neonatuskeperawatan = resp?.data?.neonatuskeperawatan
            // findPasien[0].pediatri = resp?.data?.pediatri
            // findPasien[0].kandungan = resp?.data?.kandungan
            // findPasien[0].dokumenluar = resp?.data?.dokumenluar
          }
          this.loadingTerima = false
          // console.log('load2', this.loadingTerima)
          this.noreg = null
        }
      } catch (error) {
        console.log(error)
        this.loadingTerima = false
        this.noreg = null
        this.notifikasiError('Maaf.. Harap ulangi, Ada Kesalahan ')
      }
    },
    togglePageTindakan() {
      this.pageLayanan = !this.pageLayanan
    },
    injectDataPasien(pasien, val, kode, arr) {
      const findPasien = this.items.filter(x => x === pasien)
      // console.log('inject pasien', findPasien)
      if (findPasien.length) {
        const data = findPasien[0]
        const target = data[kode]?.find(x => x.id === val.id)
        // console.log('inject target pasien', target)
        // console.log('inject kode pasien', kode)
        // console.log('inject isi pasien', val)

        if (target) {
          Object.assign(target, val)
        } else {
          if (kode === 'diagnosa') {
            data[kode]?.push(val)
          } else if (kode === 'dokumenluar') {
            const trg = data[kode]
            if (trg) {
              data[kode] = []
              data[kode] = val
            }
          } else {
            data[kode]?.splice(0, 0, val)
          }
        }
      }
    },
    hapusDataAnamnesis(pasien, id) {
      const findPasien = this.items.filter(x => x === pasien)
      if (findPasien.length) {
        const data = findPasien[0].anamnesis
        const pos = data.findIndex(el => el.id === id)
        if (pos >= 0) { data.splice(pos, 1) }
      }
    },
    async getNota(pasien) {
      const params = {
        params: {
          noreg: pasien?.noreg
        }
      }

      const resp = await api.get('v1/simrs/pelayanan/notatindakan', params)
      if (resp.status === 200) {
        const arr = resp.data.map(x => x.nota)
        this.notaTindakans = arr.length ? arr : []
        console.log('notas', this.notaTindakans)
        this.notaTindakans.push('BARU')
        this.notaTindakan = this.notaTindakans[0]
      }
    },
    hapusDataTindakan(pasien, id) {
      const findPasien = this.items.filter(x => x === pasien)
      if (findPasien.length) {
        const data = findPasien[0].tindakan
        const pos = data.findIndex(el => el.id === id)
        if (pos >= 0) { data.splice(pos, 1) }
      }
    },
    hapusDataLaboratBaru(pasien, id, databaru) {
      const findPasien = this.items.filter(x => x === pasien)
      if (findPasien.length) {
        findPasien[0].laborats = databaru
      }
    },
    hapusDataRadiologi(pasien, id) {
      const findPasien = this.items.filter(x => x === pasien)
      if (findPasien.length) {
        const data = findPasien[0]?.radiologi
        const pos = data.findIndex(el => el.id === id)
        if (pos >= 0) { data.splice(pos, 1) }
      }
    },
    hapusDataOk(pasien, id) {
      const findPasien = this.items.filter(x => x === pasien)
      if (findPasien.length) {
        const data = findPasien[0]?.ok
        const pos = data.findIndex(el => el.id === id)
        if (pos >= 0) { data.splice(pos, 1) }
      }
    },
    hapusDataFisio(pasien, id) {
      const findPasien = this.items.filter(x => x === pasien)
      if (findPasien.length) {
        const data = findPasien[0]?.fisio
        const pos = data.findIndex(el => el.id === id)
        if (pos >= 0) { data.splice(pos, 1) }
      }
    },
    hapusDataPenunjangLain(pasien, id) {
      const findPasien = this.items.filter(x => x === pasien)
      if (findPasien.length) {
        const data = findPasien[0]?.penunjanglain
        const pos = data.findIndex(el => el.id === id)
        if (pos >= 0) { data.splice(pos, 1) }
      }
    }
  }
})
