import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useReportAbsensiStore = defineStore('report_absensi', {
  state: () => ({
    items: [],
    prints: [],
    meta: {},
    item: {},
    total: 0,
    loading: false,
    loadingDialog: false,
    params: {
      periode: null,
      q: '',
      page: 1,
      per_page: 20,
      order_by: 'id',
      sort: 'desc'
    },
    defaultColumn: ['nama', 'status', 'IJIN', 'SAKIT', 'DL', 'DSPEN', 'CUTI', 'A',
      'masuk',
      'hari', 'kurang', 'per-t'],
    columns: ['nama', 'status', 'IJIN', 'SAKIT', 'DL', 'DSPEN', 'CUTI', 'A',
      'masuk',
      'hari', 'kurang', 'per-t'],
    columnHide: ['id', 'masuk'],
    jenis_pegawai: [
      {
        id: 987654321,
        kode_jenis: 'all',
        jenispegawai: 'Semua'
      }
    ],
    ruangan: [
      {
        id: 987654321,
        koderuangan: 'all',
        namaruang: 'Semua Ruangan'
      }
    ],
    ruanganPrint: [],
    jumlahProta: 0,
    protas: [],
    rincian: false,

    settingsTable: {
      imageTampil: true,
      fontSize: 11,
      tampilNip: true
    }
  }),

  getters: {
    getterColumns (state) {
      return state.columns.filter((el) => !state.columnHide.includes(el))
    }
  },

  actions: {
    setPeriode(val) {
      this.params.periode = val
      this.getDataTable()
    },
    filterByFlag(val) {
      if (val !== 'all') {
        this.params.flag = val
      } else {
        delete this.params.flag
      }

      this.getDataTable()
    },
    filterByRuang(val) {
      if (val !== 'all') {
        this.params.ruang = val
      } else {
        delete this.params.ruang
      }

      this.ruanganPrint = this.ruangan.filter(x => x.koderuangan === val)
      this.getDataTable()
    },
    setSearch (val) {
      this.params.q = val
    },
    setFilterBy (val) {
      this.params.filter_by = val
    },
    enterSearch(val) {
      this.params.q = val
      this.getDataTable()
    },
    setOder (payload) {
      this.params.order_by = payload
      this.params.sort === 'desc' ? this.params.sort = 'asc' : this.params.sort = 'desc'
      this.getDataTable()
    },
    setPage (payload) {
      console.log('setPage', payload)
      this.params.page = payload
      this.getDataTable()
    },
    setPerPage (payload) {
      this.params.per_page = payload
      this.params.page = 1
      this.getDataTable()
    },
    setColumns (payload) {
      // if (payload) {
      //   const thumb = payload.map(x => Object.keys(x))
      //   this.columns = thumb[0]
      // }
      console.log('column change :', payload)
      if (payload === 'default') {
        this.columns = []
        this.columns = this.defaultColumn
      } else {
        this.columns = []
        for (let index = 0; index < payload; index++) {
          this.columns[index] = index < 9 ? '0' + (index + 1) : (index + 1).toString()
        }
        this.columns.unshift('nama')
      }
    },

    refreshTable() {
      this.params.page = 1
      this.getDataTable()
    },
    async getDataTable () {
      this.total = 0
      this.loading = true
      const params = { params: this.params }
      const resp = await api.get('/v1/pegawai/absensi/report', params)
      console.log('items', resp)
      if (resp.status === 200) {
        this.items = resp.data.data
        this.meta = resp.data
        // this.setColumns(resp.data.data)
        this.loading = false
      }
      this.loading = false
      // this.getTotalTable()
    },
    async autocomplete () {
      const resp = await api.get('/v1/pegawai/absensi/autocomplete')
      console.log('autocomplete', resp)
      if (resp.status === 200) {
        this.jenis_pegawai = resp.data.jenis_pegawai
        this.jenis_pegawai.unshift({
          id: 987654321,
          kode_jenis: 'all',
          jenispegawai: 'Semua'
        })
        this.ruangan = resp.data.ruangan
        this.ruangan.unshift(
          {
            id: 987654321,
            koderuangan: 'all',
            namaruang: 'Semua Ruangan'
          }
        )
        this.ruanganPrint = this.ruangan
      }
    },
    async prota(periode) {
      const params = {
        params: {
          periode
        }
      }
      const resp = await api.get('/v1/pegawai/absensi/prota', params)
      console.log('prota', resp)
      if (resp.status === 200) {
        this.jumlahProta = resp.data.length
        this.protas = resp.data
      }
    },
    async getDataPrint(periode) {
      this.loadingDialog = true
      const params = { params: this.params }
      const resp = await api.get('/v1/pegawai/absensi/print', params)
      console.log('prints', resp)
      if (resp.status === 200) {
        this.prints = resp.data
        this.loadingDialog = false
      }
      this.loadingDialog = false
    },

    setSettings(key, value) {
      this.settingsTable[key] = value
    }
  }
})
