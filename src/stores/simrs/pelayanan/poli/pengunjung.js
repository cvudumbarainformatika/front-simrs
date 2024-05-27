import { defineStore } from 'pinia'
import { Notify } from 'quasar'
import { api } from 'src/boot/axios'
import { dateDbFormat } from 'src/modules/formatter'
import { notifErrVue } from 'src/modules/utils'

export const usePengunjungPoliStore = defineStore('pengunjung-poli-store', {
  state: () => ({
    items: [],
    meta: null,
    loading: false,
    loadingIcare: false,
    loadingTerima: false,
    loadingTidakhadir: false,
    loadingCall: false,
    noreg: null,

    statuses: ['SEMUA', 'TERLAYANI', 'BELUM TERLAYANI'],
    params: {
      // tgl: dateDbFormat(new Date())
      // tgl: '2023-07-07',
      page: 1,
      q: '',
      status: '',
      to: dateDbFormat(new Date()),
      from: dateDbFormat(new Date()),
      per_page: 50,
      kodepoli: []
    },
    pageTindakan: false,
    filters: false,
    custom: false,
    loadingSaveGantiDpjp: false
  }),
  // getters: {
  //   doubleCount: (state) => state.counter * 2
  // },
  actions: {

    init (val) {
      // console.log('')
      this.params = val
      this.getData()
    },
    async sendPanggil (pasien, channel) {
      this.loadingCall = true
      const params = { noreg: pasien?.noreg, noantrian: pasien?.noantrian, kdpoli: pasien?.kodepoli, tglkunjungan: pasien?.tgl_kunjungan, channel }
      this.noreg = pasien?.noreg
      await api.post('v1/fordisplay/send_panggilan', params)
        .then((resp) => {
          // console.log('call', resp)
          this.loadingCall = false
          if (resp.status === 200) {
            // this.meta = resp.data
            // this.items = resp.data.data
            // coba
          }
        }).catch((err) => {
          console.log('call', err)
          this.loadingCall = false
        })
    },
    setPolis (val) {
      this.params.kodepoli = val
      this.getData()
    },
    async getData () {
      this.loading = true
      const params = { params: this.params }
      await api.get('/v1/simrs/rajal/poli/kunjunganpoli', params)
        .then((resp) => {
          console.log('kunjungan poli', resp)
          this.loading = false
          // if (resp.status === 200) {
          //   this.meta = resp.data
          //   this.items = resp.data.data
          // }
          // ini yang baru
          if (resp.status === 200) {
            this.meta = resp.data.table
            this.items = resp.data.table.data
            this.meta.total = resp?.data.total
          }
        }).catch((err) => {
          console.log(err)
          this.loading = false
        })
    },
    togglePageTindakan () {
      this.pageTindakan = !this.pageTindakan
    },
    setDate (val) {
      this.params.tgl = val
    },
    setQ (val) {
      this.params.page = 1
      this.params.q = val
      this.getData()
    },
    setTo (val) {
      this.params.to = val
    },
    setFrom (val) {
      this.params.from = val
    },
    setPeriodik (val) {
      this.params.page = 1
      const { to, from, status } = val
      this.params.to = to
      this.params.from = from
      this.params.status = status
      // console.log('periodik', this.params)
      this.getData()
    },
    filterData (val) {
      this.params.page = 1
      const { to, from, q, status } = val // status
      this.params.to = to
      this.params.from = from
      this.params.q = q
      this.params.status = status
      this.setCustom()
      this.getData()
      // console.log(val)
    },
    setPage (payload) {
      this.params.page = payload
      this.getData()
    },
    setPerPage (payload) {
      this.params.per_page = payload
      this.getData()
    },
    setFilters () {
      this.filters = !this.filters
    },
    setCustom () {
      this.custom = true
    },
    notCustom () {
      this.custom = false
    },

    async gantiDpjp (form, pasien) {
      // console.log(form)
      this.loadingSaveGantiDpjp = true
      try {
        const resp = await api.post('/v1/simrs/pelayanan/gantidpjp', form)
        // console.log(resp)
        if (resp.status === 200) {
          const findPasien = this.items.filter(x => x.rs1 === pasien?.rs1)
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
              const findPasien = this.items.filter(x => x === pasien)
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

    // inject pasien
    async setLayananSelesai (pasien) {
      this.loadingTerima = true
      // '' : 'Belum Terlayanani'
      // '1': 'Terlayani'
      // '2': 'Sudah diterima'
      // '3': Batal
      if (!pasien?.anamnesis.length) {
        this.loadingTerima = false
        return this.notifikasiError('Maaf, Anamnesis Harap Diisi Dahulu...')
      }
      if (!pasien?.diagnosa?.length) {
        this.loadingTerima = false
        return this.notifikasiError('Maaf, Diagnosa Harap Diisi Dahulu...')
      }
      // if (!pasien?.planning?.length) {
      //   return this.notifikasiError('Maaf, Planing Harap Diisi Dahulu...')
      // }
      const form = {
        noreg: pasien?.noreg
      }
      try {
        const resp = await api.post('v1/simrs/rajal/poli/flagfinish', form)
        // console.log('rsp ', form, resp)
        if (resp.status === 200) {
          const findPasien = this.items.filter(x => x === pasien)
          if (findPasien.length) {
            findPasien[0].status = '1'
          }
          this.loadingTerima = false
        }
      }
      catch (error) {
        console.log(error)
        this.loadingTerima = false
        // this.notifikasiError('Maaf.. Harap ulangi, Ada Kesalahan ')
      }
    },

    async setTerima (pasien) {
      this.loadingCall = false
      this.loadingTerima = true
      const form = { noreg: pasien?.noreg }
      this.noreg = pasien?.noreg
      this.togglePageTindakan()
      try {
        const resp = await api.post('v1/simrs/rajal/poli/terimapasien', form)
        // console.log('terima', resp)
        if (resp.status === 200) {
          const findPasien = this.items.filter(x => x?.rs1 === pasien?.noreg)
          if (findPasien.length) {
            findPasien[0].status = findPasien[0].status === '' ? '2' : findPasien[0].status

            // BARU
            findPasien[0].anamnesis = resp?.data?.anamnesis
            findPasien[0].datasimpeg = resp?.data?.datasimpeg
            findPasien[0].diagnosa = resp?.data?.diagnosa
            findPasien[0].diagnosakeperawatan = resp?.data?.diagnosakeperawatan
            findPasien[0].diagnosakebidanan = resp?.data?.diagnosakebidanan
            findPasien[0].diet = resp?.data?.diet
            findPasien[0].edukasi = resp?.data?.edukasi
            findPasien[0].fisio = resp?.data?.fisio
            findPasien[0].gambars = resp?.data?.gambars
            findPasien[0].laborats = resp?.data?.laborats
            findPasien[0].newapotekrajal = resp?.data?.newapotekrajal
            findPasien[0].ok = resp?.data?.ok
            findPasien[0].pemeriksaanfisik = resp?.data?.pemeriksaanfisik
            findPasien[0].penunjanglain = resp?.data?.penunjanglain
            findPasien[0].planning = resp?.data?.planning
            findPasien[0].radiologi = resp?.data?.radiologi
            findPasien[0].sharing = resp?.data?.sharing
            findPasien[0].taskid = resp?.data?.taskid
            findPasien[0].tindakan = resp?.data?.tindakan
            // BARU
            findPasien[0].laporantindakan = resp?.data?.laporantindakan
            findPasien[0].psikiatri = resp?.data?.psikiatri
            findPasien[0].neonatusmedis = resp?.data?.neonatusmedis
            findPasien[0].neonatuskeperawatan = resp?.data?.neonatuskeperawatan
            findPasien[0].pediatri = resp?.data?.pediatri
            findPasien[0].kandungan = resp?.data?.kandungan
            findPasien[0].dokumenluar = resp?.data?.dokumenluar
            findPasien[0].rs19 = resp?.data?.rs19
          }
          this.loadingTerima = false
          this.noreg = null
        }
      }
      catch (error) {
        console.log(error)
        this.loadingTerima = false
        this.noreg = null
        this.notifikasiError('Maaf.. Harap ulangi, Ada Kesalahan ')
      }

      await api.post('v1/simrs/rajal/poli/updatewaktubpjs', form)
    },

    async settidakdatang (pasien) {
      this.loadingTidakhadir = true
      this.loadingCall = false
      const form = { noreg: pasien?.noreg }
      this.noreg = pasien?.noreg

      try {
        await api.post('v1/simrs/rajal/poli/tidakhadir', form)

        this.loadingTidakhadir = false
        this.setinject(pasien?.noreg)
      }
      catch (error) {
        this.loadingTidakhadir = false
        this.hidden = false
        this.notifikasiError('Maaf.. Harap ulangi, Ada Kesalahan ')
      }
    },

    setinject (noreg) {
      const findPasien = this.items.filter(x => x.noreg === noreg)
      // console.log('wew', findPasien)
      if (findPasien.length) {
        const data = findPasien[0]
        data.status = '3'
      }
    },

    notifikasiError (msg) {
      Notify.create({
        message: msg,
        // icon: 'icon-eva-message-circle-outline',
        position: 'top',
        // color: 'negative',
        type: 'negative'
        // actions: [
        //   { label: 'Dismiss', color: 'yellow', handler: () => { /* console.log('wooow') */ } }
        // ]
      })
    },

    injectDataPasien (pasien, val, kode, arr) {
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
        }
        else {
          if (kode === 'diagnosa') {
            data[kode]?.push(val)
          }
          else if (kode === 'dokumenluar') {
            const trg = data[kode]
            if (trg) {
              data[kode] = []
              data[kode] = val
            }
          }
          else {
            data[kode]?.splice(0, 0, val)
          }
        }
      }
    },
    hapusDataAnamnesis (pasien, id) {
      const findPasien = this.items.filter(x => x === pasien)
      if (findPasien.length) {
        const data = findPasien[0].anamnesis
        const pos = data.findIndex(el => el.id === id)
        if (pos >= 0) { data.splice(pos, 1) }
      }
    },
    hapusDataPemeriksaanfisik (pasien, id) {
      const findPasien = this.items.filter(x => x === pasien)
      if (findPasien.length) {
        const data = findPasien[0].pemeriksaanfisik
        const pos = data.findIndex(el => el.id === id)
        if (pos >= 0) { data.splice(pos, 1) }
      }
    },
    hapusGambars (pasien, nama) {
      const findPasien = this.items.filter(x => x === pasien)
      if (findPasien.length) {
        const data = findPasien[0].gambars
        const pos = data.findIndex(el => el.gambar === nama)
        if (pos >= 0) { data.splice(pos, 1) }
      }
    },
    hapusDataDiagnosa (pasien, id) {
      const findPasien = this.items.filter(x => x === pasien)
      if (findPasien.length) {
        const data = findPasien[0].diagnosa
        const pos = data.findIndex(el => el.id === id)
        if (pos >= 0) { data.splice(pos, 1) }
      }
    },
    hapusDataTindakan (pasien, id) {
      const findPasien = this.items.filter(x => x === pasien)
      if (findPasien.length) {
        const data = findPasien[0].tindakan
        const pos = data.findIndex(el => el.id === id)
        if (pos >= 0) { data.splice(pos, 1) }
      }
    },
    hapusDataProsedur (pasien, id) {
      const findPasien = this.items.filter(x => x === pasien)
      if (findPasien.length) {
        const data = findPasien[0].prosedur
        const pos = data.findIndex(el => el.id === id)
        if (pos >= 0) { data.splice(pos, 1) }
      }
    },
    hapusDataLaborat (pasien, id) {
      const findPasien = this.items.filter(x => x === pasien)
      if (findPasien.length) {
        const data = findPasien[0].laborats
        const pos = data.findIndex(el => el.id === id)
        if (pos >= 0) { data.splice(pos, 1) }
      }
    },
    hapusDataLaboratBaru (pasien, id, databaru) {
      const findPasien = this.items.filter(x => x === pasien)
      if (findPasien.length) {
        findPasien[0].laborats = databaru
      }
    },
    hapusDataRadiologi (pasien, id) {
      const findPasien = this.items.filter(x => x === pasien)
      if (findPasien.length) {
        const data = findPasien[0]?.radiologi
        const pos = data.findIndex(el => el.id === id)
        if (pos >= 0) { data.splice(pos, 1) }
      }
    },
    hapusDataPenunjangLain (pasien, id) {
      const findPasien = this.items.filter(x => x === pasien)
      if (findPasien.length) {
        const data = findPasien[0]?.penunjanglain
        const pos = data.findIndex(el => el.id === id)
        if (pos >= 0) { data.splice(pos, 1) }
      }
    },
    hapusDataOk (pasien, id) {
      const findPasien = this.items.filter(x => x === pasien)
      if (findPasien.length) {
        const data = findPasien[0]?.ok
        const pos = data.findIndex(el => el.id === id)
        if (pos >= 0) { data.splice(pos, 1) }
      }
    },
    hapusDataFisio (pasien, id) {
      const findPasien = this.items.filter(x => x === pasien)
      if (findPasien.length) {
        const data = findPasien[0]?.fisio
        const pos = data.findIndex(el => el.id === id)
        if (pos >= 0) { data.splice(pos, 1) }
      }
    },
    hapusDataPlanning (pasien, id) {
      const findPasien = this.items.filter(x => x === pasien)
      if (findPasien.length) {
        const data = findPasien[0]?.planning
        const pos = data.findIndex(el => el.id === id)
        if (pos >= 0) { data.splice(pos, 1) }
      }
    },
    hapusDataDiet (pasien, id) {
      const findPasien = this.items.filter(x => x === pasien)
      if (findPasien.length) {
        const data = findPasien[0]?.diet
        const pos = data.findIndex(el => el.id === id)
        if (pos >= 0) { data.splice(pos, 1) }
      }
    },
    hapusDataEdukasi (pasien, id) {
      const findPasien = this.items.filter(x => x === pasien)
      if (findPasien.length) {
        const data = findPasien[0]?.edukasi
        const pos = data.findIndex(el => el.id === id)
        if (pos >= 0) { data.splice(pos, 1) }
      }
    },
    hapusDataDiagnosaKeperawatan (pasien, id) {
      const findPasien = this.items.filter(x => x === pasien)
      if (findPasien.length) {
        const data = findPasien[0].diagnosakeperawatan
        const pos = data.findIndex(el => el.id === id)
        if (pos >= 0) { data.splice(pos, 1) }
      }
    },
    hapusDataDiagnosaKebidanan (pasien, id) {
      const findPasien = this.items.filter(x => x === pasien)
      if (findPasien.length) {
        const data = findPasien[0].diagnosakebidanan
        const pos = data.findIndex(el => el.id === id)
        if (pos >= 0) { data.splice(pos, 1) }
      }
    },
    hapusDataLaporanTindakan (pasien, id) {
      const findPasien = this.items.filter(x => x === pasien)
      if (findPasien.length) {
        const data = findPasien[0].laporantindakan
        const pos = data.findIndex(el => el.id === id)
        if (pos >= 0) { data.splice(pos, 1) }
      }
    },
    hapusDataPsikiatri (pasien, id) {
      const findPasien = this.items.filter(x => x === pasien)
      if (findPasien.length) {
        const data = findPasien[0].psikiatri
        const pos = data.findIndex(el => el.id === id)
        if (pos >= 0) { data.splice(pos, 1) }
      }
    },
    hapusDataNeonatusmedis (pasien, id) {
      const findPasien = this.items.filter(x => x === pasien)
      if (findPasien.length) {
        const data = findPasien[0].neonatusmedis
        const pos = data.findIndex(el => el.id === id)
        if (pos >= 0) { data.splice(pos, 1) }
      }
    },
    hapusDataNeonatusKeperawatan (pasien, id) {
      const findPasien = this.items.filter(x => x === pasien)
      if (findPasien.length) {
        const data = findPasien[0].neonatuskeperawatan
        const pos = data.findIndex(el => el.id === id)
        if (pos >= 0) { data.splice(pos, 1) }
      }
    },
    hapusDataInjectan (pasien, id, key) {
      const findPasien = this.items.filter(x => x === pasien)
      if (findPasien.length) {
        const data = findPasien[0][key]
        const pos = data.findIndex(el => el.id === id)
        if (pos >= 0) { data.splice(pos, 1) }
      }
    },

    injectDokumenTindakan (pasien, res) {
      const findPasien = this.items.filter(x => x === pasien)
      if (findPasien?.length) {
        const tindakan = findPasien[0]?.tindakan
        const findTindakan = tindakan?.filter(x => x.id === res?.id)
        if (findTindakan?.length) {
          findTindakan[0].gambardokumens = []
          findTindakan[0].gambardokumens = res?.gambardokumens
        }
      }
    },
    getDataIcare (pasien) {
      this.loadingIcare = true
      // console.log('get data icare', pasien)
      const param = {
        params: {
          noka: pasien.noka,
          dpjp: pasien.kodedokterdpjp
        }
      }
      return new Promise(resolve => {
        api.get('v1/simrs/pelayanan/icare', param)
          .then(resp => {
            this.loadingIcare = false
            // console.log('resp icare', resp)
            if (resp?.data?.metadata?.code === '200' || resp?.data?.metadata?.code === 200) {
              resolve(resp.data)
            }
            else {
              notifErrVue(resp?.data?.metadata?.message)
              resolve(false)
            }
          })
          .catch(() => { this.loadingIcare = false })
      })
    }
  }
})
