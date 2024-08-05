import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import { dateDbFormat } from 'src/modules/formatter'
import { date } from 'quasar'
import { useFormPendaftaranRanapStore } from './formpendaftaran'
import { notifSuccessVue } from 'src/modules/utils'

export const useListPendaftaranRanapStore = defineStore('list-pendaftaran-ranap', {
  state: () => ({
    items: [],
    meta: null,
    loading: false,
    header: {
      periode: 'Hari ini'
    },
    params: {
      page: 1,
      per_page: 20,
      q: '',
      status: 'Semua',
      to: dateDbFormat(new Date()),
      from: dateDbFormat(new Date()),
      sort: 'terbaru',
      unit: 'igd'
    },

    periods: ['Hari ini', 'Minggu ini', 'Bulan ini', 'Custom'],
    sorting: ['terbaru', 'terlama'],
    statuses: ['Semua', 'Terlayani', 'Menunggu'],
    isViewList: false,
    pasien: null,
    dialogSend: false,
    cekPeserta: null,
    form: {
      noreglama: null,
      norm: null,
      jnsBayar: null,
      kodesistembayar: null,
      kategoriKasus: null,
      diagnosaAwal: null,

      nama_dokter: null,
      kd_dokter: null,
      kd_dokter_bpjs: null,

      // hakruang ,kelas untuk menentukan billing

      hakruang: null,
      isTitipan: 'Tidak',
      titipan: null,
      kamar: null,
      no_bed: null,
      kelas: null,
      kode_ruang: null,
      group: null,
      flag_ruang: null,
      hakKelasBpjs: null,
      indikatorPerubahanKelas: null
    },
    grupKamars: [],
    beds: [],
    loadingSend: false
  }),
  getters: {
    // doubleCount: (state) => state.counter * 2
  },
  actions: {
    getDataTable () {
      this.loading = true
      return new Promise((resolve, reject) => {
        api.get('/v1/simrs/pendaftaran/ranap/list-pendaftararan-ranap', {
          params: this.params
        }).then(res => {
          // console.log('res list tggu ranap', res)
          if (res.status === 200) {
            const total = res.data?.total
            const obj = res.data?.data
            const clone = (({ data, ...o }) => o)(obj)
            this.meta = clone
            this.meta.total = total
            this.items = obj?.data ?? []

            console.log('this.meta', this.meta)
            console.log('this.items', this.items)
          }
          this.loading = false
          resolve(res)
        }).catch(err => {
          console.log('err list tggu ranap', err)
          this.loading = false
          reject(err)
        })
      })
    },

    setPeriode (val) {
      this.header.periode = val
      if (val === 'Hari ini') {
        this.hariIni()
      }
      else if (val === 'Minggu ini') {
        this.mingguIni()
      }
      else if (val === 'Bulan ini') {
        this.bulanIni()
      }
    },

    setUrutan (val) {
      this.params.sort = val
      this.getDataTable()
    },

    setPage (val) {
      this.params.page = val
      this.getDataTable()
    },

    setStatus (val) {
      this.params.page = 1
      this.params.status = val
      this.getDataTable()
    },

    hariIni () {
      const cDate = new Date()
      this.params.to = dateDbFormat(cDate)
      this.params.from = dateDbFormat(cDate)
    },
    bulanIni () {
      const curr = new Date(), y = curr.getFullYear(), m = curr.getMonth()
      // const firstday = date.formatDate(curr, 'YYYY') + '-' + date.formatDate(curr, 'MM') + '-01'
      // const lastday = date.formatDate(curr, 'YYYY') + '-' + date.formatDate(curr, 'MM') + '-31'
      const firstday = curr.setFullYear(y, m, 1)
      const lastday = curr.setFullYear(y, m + 1, 0)
      this.params.to = dateDbFormat(firstday)
      this.params.from = dateDbFormat(lastday)
    },
    mingguIni () {
      const curr = new Date()
      const firstday = new Date(curr.setDate(curr.getDate() - curr.getDay()))
      const lastday = new Date(curr.setDate(curr.getDate() - curr.getDay() + 6))
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

    formFromDialogSend (val) {
      this.form = {
        noreglama: val.noreg ?? null,
        norm: val.norm ?? null,
        jnsBayar: val.groups ?? null,
        kodesistembayar: val.kodesistembayar ?? null,
        kategoriKasus: null,
        diagnosaAwal: null,

        nama_dokter: val?.dokter ?? null,
        kd_dokter: val?.kodedokter ?? null,
        kd_dokter_bpjs: null,

        // hakruang ,kelas untuk menentukan billing

        hakruang: val.koderuangan ?? null,
        isTitipan: 'Tidak',
        titipan: null,
        kamar: null,
        no_bed: null,
        kelas: null,
        kode_ruang: val.koderuangan ?? null,
        group: null,
        flag_ruang: null,
        hakKelasBpjs: null,
        indikatorPerubahanKelas: null
      }

      if (val.koderuangan || val.koderuangan !== null || val.koderuangan !== '') {
        this.pilihRuang(val.koderuangan)
      }
      if (val.kodedokter || val.kodedokter !== null || val.kodedokter !== '') {
        this.pilihDokter(val.kodedokter)
      }
    },

    async cekPesertaBpjs (by, no) {
      const params = { params: { by, no } }
      await api.get('v1/simrs/pendaftaran/ranap/cek-peserta-bpjs', params)
        .then(resp => {
          if (resp.data.metadata.code === '200') {
            this.cekPeserta = resp.data.result.peserta
            console.log('cekPesertaBpjs', this.cekPeserta)
          }
        })
        .catch(err => {
          console.log('cekPesertaBpjs', err)
        })
    },

    // pilih kamar masih salah
    pilihRuang (val) {
      const pendaftaran = useFormPendaftaranRanapStore()
      this.form.kamar = null
      const arr = pendaftaran.kamars
      const obj = arr.length ? arr.find(x => x.rs1 === val) : null
      console.log('pilihRuang', obj)
      const group = obj?.groups ?? null
      // const kodeRuang = obj?.rs1 ?? null
      const kelas = obj?.rs3 ?? null
      const flag = obj?.rs6 ?? null

      // this.form.kode_ruang = kodeRuang
      this.form.kelas = kelas
      this.form.flag_ruang = flag
      this.form.group = group

      this.form.kamar = null
      this.form.no_bed = null

      pendaftaran.showKamar()
        .then(() => {
          this.grupKamars = []
          this.beds = []
          const pilihan = pendaftaran.listKamars.find(x => x.groups === group)
          console.log('pilihan', pilihan)
          const kamarsx = pilihan?.kamars?.length
            ? pilihan?.kamars?.filter(x => {
              return x.rs6 === group && (x?.rs5 === `${group + kelas}` || x?.rs5 === '-')
            })
            : []
          console.log('kamars', this.kamars)
          const mapKamar = kamarsx?.length ? kamarsx?.map(x => x.rs1) : []
          const grup = [...new Set(mapKamar)]
          // grupKamar.value = grup
          console.log('grup', grup)
          // const thumb = []
          for (let i = 0; i < grup.length; i++) {
            const el = grup[i]

            this.grupKamars.push({
              label: el,
              value: el
            })
          }
        })
    },
    pilihKamar (val) {
      // console.log('pilihKamar', val)
      const pendaftaran = useFormPendaftaranRanapStore()
      const arr = pendaftaran.listKamars?.find(x => x?.groups === this.form.group)?.kamars || []
      // console.log('arr', arr)
      const lists = arr?.length ? arr?.filter(x => x.rs1 === val) : []
      console.log('lihatKamar', lists)
      this.form.no_bed = null
      this.beds = lists
    },

    pilihDokter (val) {
      const pendaftaran = useFormPendaftaranRanapStore()
      const arr = pendaftaran.dokters
      const obj = arr.length ? arr.find(x => x.kdpegsimrs === val) : null
      // console.log('pilihKamar', obj)
      this.form.nama_dokter = obj?.nama ?? null
      this.form.kd_dokter = obj?.kdpegsimrs ?? null
    },

    async mutasiPasien () {
      this.loadingSend = true
      this.form.hakKelasBpjs = this.cekPeserta?.hakKelas?.kode ?? null

      // console.log('mutasiPasien', this.form)
      const noreg = this.form.noreglama
      this.form.noreg = noreg
      await api.post('v1/simrs/pendaftaran/ranap/simpanpendaftaran-byigd', this.form)
        .then(resp => {
          console.log('Simpan Pendaftaran by igd', resp.data)
          this.loadingSend = false
          this.dialogSend = false
          if (resp.status === 200) {
            notifSuccessVue('Pasien success dimutasikan ')
            const findPasien = this.items.filter(x => x?.noreg === noreg)
            if (findPasien.length) findPasien[0].status_masuk = this.form.norm
            // this.initForm()
          }
        })
        .catch((err) => {
          this.loadingSend = false
          // const bag = err.response?.status === 422 ? err.response?.data?.errors : []
          // this.errors = bag
          console.log('err', err)
        })
    },
    async regPasien () {
      this.loadingSend = true
      this.form.hakKelasBpjs = this.cekPeserta?.hakKelas?.kode ?? null

      // console.log('mutasiPasien', this.form)
      // this.form.noreg = null
      await api.post('v1/simrs/pendaftaran/ranap/simpanpendaftaran-byspri', this.form)
        .then(resp => {
          console.log('Simpan Pendaftaran by igd', resp.data)
          this.loadingSend = false
          this.dialogSend = false
          if (resp.status === 200) {
            notifSuccessVue('Pasien success dimutasikan ')
            const findPasien = this.items.filter(x => x?.noreg === this.form.noreglama)

            const obj = { rs1: resp.data.noreg, rs22: '' }
            if (findPasien.length) findPasien[0].tunggu_ranap = obj
            // this.initForm()
          }
        })
        .catch((err) => {
          this.loadingSend = false
          // const bag = err.response?.status === 422 ? err.response?.data?.errors : []
          // this.errors = bag
          console.log('err', err)
        })
    }
  }
})
