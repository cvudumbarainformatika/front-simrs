import { defineStore } from 'pinia'
import { Notify } from 'quasar'
import { api } from 'src/boot/axios'
import { dateDbFormat } from 'src/modules/formatter'

export const usePengunjungPoliStore = defineStore('pengunjung-poli-store', {
  state: () => ({
    items: [],
    meta: null,
    loading: false,
    loadingTerima: false,
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
      per_page: 100,
      kdpoli: ''
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
    async getData() {
      this.loading = true
      const params = { params: this.params }
      await api.get('/v1/simrs/rajal/poli/kunjunganpoli', params)
        .then((resp) => {
          console.log('kunjungan poli', resp)
          this.loading = false
          if (resp.status === 200) {
            this.meta = resp.data
            this.items = resp.data.data
          }
        }).catch((err) => {
          console.log(err)
          this.loading = false
        })
    },
    togglePageTindakan() {
      this.pageTindakan = !this.pageTindakan
    },
    setDate(val) {
      this.params.tgl = val
    },
    setQ(val) {
      this.params.page = 1
      this.params.q = val
      this.getData()
    },
    setTo(val) {
      this.params.to = val
    },
    setFrom(val) {
      this.params.from = val
    },
    setPeriodik(val) {
      this.params.page = 1
      const { to, from, status } = val
      this.params.to = to
      this.params.from = from
      this.params.status = status
      console.log('periodik', this.params)
      this.getData()
    },
    filterData(val) {
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
    setPage(payload) {
      this.params.page = payload
      this.getData()
    },
    setPerPage(payload) {
      this.params.per_page = payload
      this.getData()
    },
    setFilters() {
      this.filters = !this.filters
    },
    setCustom() {
      this.custom = !this.custom
    },

    async gantiDpjp(form, pasien) {
      // console.log(form)
      this.loadingSaveGantiDpjp = true
      try {
        const resp = await api.post('/v1/simrs/pelayanan/gantidpjp', form)
        console.log(resp)
        if (resp.status === 200) {
          const findPasien = this.items.filter(x => x === pasien)
          if (findPasien.length) {
            const data = findPasien[0]
            data.datasimpeg = resp?.data?.result?.datasimpeg
            data.dokter = resp?.data?.result?.datasimpeg?.nama
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

    // inject pasien
    async setLayananSelesai(pasien) {
      this.loadingTerima = true
      // '' : 'Belum Terlayanani'
      // '1': 'Terlayani'
      // '2': 'Sudah diterima'
      // '3': Batal
      if (!pasien?.anamnesis.length) {
        return this.notifikasiError('Maaf, Anamnesis Harap Diisi Dahulu...')
      }
      if (!pasien?.diagnosa?.length) {
        return this.notifikasiError('Maaf, Diagnosa Harap Diisi Dahulu...')
      }
      // if (!pasien?.planning?.length) {
      //   return this.notifikasiError('Maaf, Planing Harap Diisi Dahulu...')
      // }

      try {
        const resp = await api.post('v1/simrs/rajal/poli/flagfinish')
        if (resp.status === 200) {
          const findPasien = this.items.filter(x => x === pasien)
          if (findPasien.length) {
            findPasien[0].status = '1'
          }
          this.loadingTerima = false
        }
      } catch (error) {
        console.log(error)
        this.loadingTerima = false
        this.notifikasiError('Maaf.. Harap ulangi, Ada Kesalahan ')
      }
    },

    async setTerima(pasien) {
      this.loadingTerima = true
      const form = { noreg: pasien?.noreg }
      this.noreg = pasien?.noreg
      try {
        const resp = await api.post('v1/simrs/rajal/poli/terimapasien', form)
        if (resp.status === 200) {
          const findPasien = this.items.filter(x => x === pasien)
          if (findPasien.length) {
            findPasien[0].status = findPasien[0].status === '' ? '2' : findPasien[0].status
          }
          this.loadingTerima = false
          this.noreg = null
          this.togglePageTindakan()
        }
      } catch (error) {
        console.log(error)
        this.loadingTerima = false
        this.noreg = null
        this.notifikasiError('Maaf.. Harap ulangi, Ada Kesalahan ')
      }
    },

    notifikasiError(msg) {
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

    injectDataPasien(pasien, val, kode) {
      const findPasien = this.items.filter(x => x === pasien)
      if (findPasien.length) {
        const data = findPasien[0]
        const target = data[kode]?.find(x => x.id === val.id)
        if (target) {
          Object.assign(target, val)
        } else {
          if (kode === 'diagnosa') {
            data[kode]?.push(val)
          } else {
            data[kode]?.splice(0, 0, val)
          }
        }
        // if (kode === 'anamnesis') {
        //   const target = data.anamnesis.find(x => x.id === val.id)
        //   if (target) {
        //     Object.assign(target, val)
        //   } else {
        //     data.anamnesis.splice(0, 0, val)
        //   }
        // }
        // if (kode === 'gambars') {
        //   const target = data.gambars?.find(x => x.id === val.id)
        //   if (target) {
        //     Object.assign(target, val)
        //   } else {
        //     data.gambars.splice(0, 0, val)
        //   }
        // }
        // if (kode === 'pemeriksaanfisik') {
        //   const target = data.pemeriksaanfisik?.find(x => x.id === val.id)
        //   if (target) {
        //     Object.assign(target, val)
        //   } else {
        //     data.pemeriksaanfisik.splice(0, 0, val)
        //   }
        // }
        // if (kode === 'diagnosa') {
        //   const target = data.diagnosa?.find(x => x.id === val.id)
        //   if (target) {
        //     Object.assign(target, val)
        //   } else {
        //     data.diagnosa.splice(0, 0, val)
        //   }
        // }
        // if (kode === 'tindakan') {
        //   const target = data.tindakan?.find(x => x.id === val.id)
        //   if (target) {
        //     Object.assign(target, val)
        //   } else {
        //     data.tindakan.splice(0, 0, val)
        //   }
        // }
        // if (kode === 'laborats') {
        //   const target = data?.laborats?.find(x => x.id === val.id)
        //   if (target) {
        //     Object.assign(target, val)
        //   } else {
        //     data.laborats.splice(0, 0, val)
        //   }
        // }

        // if (kode === 'radiologi') {
        //   const target = data.radiologi?.find(x => x.id === val.id)
        //   if (target) {
        //     Object.assign(target, val)
        //   } else {
        //     data.radiologi.splice(0, 0, val)
        //   }
        // }
        // if (kode === 'penunjanglain') {
        //   const target = data?.penunjanglain?.find(x => x.id === val.id)
        //   if (target) {
        //     Object.assign(target, val)
        //   } else {
        //     data?.penunjanglain.splice(0, 0, val)
        //   }
        // }
        // if (kode === 'ok') {
        //   const target = data?.ok?.find(x => x.id === val.id)
        //   if (target) {
        //     Object.assign(target, val)
        //   } else {
        //     data?.ok.splice(0, 0, val)
        //   }
        // }
        // console.log('data ditemukan', data)
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
    hapusDataPemeriksaanfisik(pasien, id) {
      const findPasien = this.items.filter(x => x === pasien)
      if (findPasien.length) {
        const data = findPasien[0].pemeriksaanfisik
        const pos = data.findIndex(el => el.id === id)
        if (pos >= 0) { data.splice(pos, 1) }
      }
    },
    hapusGambars(pasien, nama) {
      const findPasien = this.items.filter(x => x === pasien)
      if (findPasien.length) {
        const data = findPasien[0].gambars
        const pos = data.findIndex(el => el.gambar === nama)
        if (pos >= 0) { data.splice(pos, 1) }
      }
    },
    hapusDataDiagnosa(pasien, id) {
      const findPasien = this.items.filter(x => x === pasien)
      if (findPasien.length) {
        const data = findPasien[0].diagnosa
        const pos = data.findIndex(el => el.id === id)
        if (pos >= 0) { data.splice(pos, 1) }
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
    hapusDataLaborat(pasien, id) {
      const findPasien = this.items.filter(x => x === pasien)
      if (findPasien.length) {
        const data = findPasien[0].laborats
        const pos = data.findIndex(el => el.id === id)
        if (pos >= 0) { data.splice(pos, 1) }
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
    hapusDataPenunjangLain(pasien, id) {
      const findPasien = this.items.filter(x => x === pasien)
      if (findPasien.length) {
        const data = findPasien[0]?.penunjanglain
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
    hapusDataPlanning(pasien, id) {
      const findPasien = this.items.filter(x => x === pasien)
      if (findPasien.length) {
        const data = findPasien[0]?.planning
        const pos = data.findIndex(el => el.id === id)
        if (pos >= 0) { data.splice(pos, 1) }
      }
    },
    hapusDataEdukasi(pasien, id) {
      const findPasien = this.items.filter(x => x === pasien)
      if (findPasien.length) {
        const data = findPasien[0]?.edukasi
        const pos = data.findIndex(el => el.id === id)
        if (pos >= 0) { data.splice(pos, 1) }
      }
    }
  }
})
