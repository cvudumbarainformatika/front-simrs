import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { dateDbFormat } from 'src/modules/formatter'

export const usePengunjungPoliStore = defineStore('pengunjung-poli-store', {
  state: () => ({
    items: [],
    meta: null,
    loading: false,

    params: {
      // tgl: dateDbFormat(new Date())
      // tgl: '2023-07-07',
      page: 1,
      q: '',
      to: dateDbFormat(new Date()),
      from: dateDbFormat(new Date()),
      per_page: 100
    },
    pageTindakan: false,
    filters: false
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
    },
    setTo(val) {
      this.params.to = val
    },
    setFrom(val) {
      this.params.from = val
    },
    setPeriodik(val) {
      this.params.page = 1
      const { to, from } = val
      this.params.to = to
      this.params.from = from
      console.log('periodik', to)
      this.getData()
    },
    filterData(val) {
      this.params.page = 1
      const { to, from, q } = val // status
      this.params.to = to
      this.params.from = from
      this.params.q = q
      this.getData()
    },
    setPage(payload) {
      this.params.page = payload
      this.getData()
    },
    setFilters() {
      this.filters = !this.filters
    },
    // inject pasien

    injectDataPasien(pasien, val, kode) {
      const findPasien = this.items.filter(x => x === pasien)
      if (findPasien.length) {
        const data = findPasien[0]
        if (kode === 'anamnesis') {
          const target = data.anamnesis.find(x => x.id === val.id)
          if (target) {
            Object.assign(target, val)
          } else {
            // data.anamnesis.push(val)
            data.anamnesis.splice(0, 0, val)
          }
        }
        if (kode === 'gambars') {
          const target = data.gambars?.find(x => x.id === val.id)
          if (target) {
            Object.assign(target, val)
          } else {
            // data.gambars.push(val)
            data.gambars.splice(0, 0, val)
          }
        }
        if (kode === 'pemeriksaanfisik') {
          const target = data.pemeriksaanfisik?.find(x => x.id === val.id)
          if (target) {
            Object.assign(target, val)
          } else {
            // data.pemeriksaanfisik.push(val)
            data.pemeriksaanfisik.splice(0, 0, val)
          }
        }
        if (kode === 'diagnosa') {
          const target = data.diagnosa?.find(x => x.id === val.id)
          if (target) {
            Object.assign(target, val)
          } else {
            // data.diagnosa.push(val)
            data.diagnosa.splice(0, 0, val)
          }
        }
        if (kode === 'tindakan') {
          const target = data.tindakan?.find(x => x.id === val.id)
          if (target) {
            Object.assign(target, val)
          } else {
            data.tindakan.splice(0, 0, val)
          }
        }
        if (kode === 'laborats') {
          const target = data?.laborats?.find(x => x.id === val.id)

          // console.log('data laborat ditemukan', target)
          if (target) {
            Object.assign(target, val)
          } else {
            data.laborats.splice(0, 0, val)
          }
        }

        if (kode === 'radiologi') {
          const target = data.radiologi?.find(x => x.id === val.id)
          if (target) {
            Object.assign(target, val)
          } else {
            data.radiologi.splice(0, 0, val)
          }
        }
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
    }
  }
})
