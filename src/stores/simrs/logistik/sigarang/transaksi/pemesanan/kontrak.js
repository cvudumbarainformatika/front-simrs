import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import { changeArrayIndex, waitLoad } from 'src/modules/utils'

export const useKontrakPemensananStore = defineStore('kontrak_pemesanan', {
  state: () => ({
    items: [],
    meta: {},
    item: {},
    loading: false,
    getNew: false,
    params: {
      q: '',
      page: 1,
      per_page: 10,
      order_by: 'id',
      sort: 'desc'
    },
    columns: [],
    columnHide: ['id',
      'hidden',
      'kodeperusahaan',
      'tgltrans',
      'kodepptk',
      'kodekegiatanblud',
      'kegiatanblud',
      'kode50',
      'uraianpekerjaan',
      'nilaikegiatan',
      'namasuplier',
      'kodemapingrs',
      'flag',
      'nokontrak',
      'userentry',
      'tglentry',
      'program',
      'kegiatan'
    ]
  }),
  getters: {
    getterColumns (state) {
      return state.columns.filter((el) => !state.columnHide.includes(el))
    }
  },
  actions: {
    // local table related function
    setSearch (val) {
      this.params.q = val
      this.params.page = 1
      this.getNew = true
      this.getDataTable()
    },
    setOder (payload) {
      this.params.order_by = payload
      this.params.sort === 'desc'
        ? (this.params.sort = 'asc')
        : (this.params.sort = 'desc')
      this.getNew = true
      this.getDataTable()
    },
    setPage (payload) {
      // console.log('setPage', payload)
      this.params.page = payload
      this.getNew = true
      this.getDataTable()
    },
    setPerPage (payload) {
      this.params.per_page = payload
      this.params.page = 1
      this.getNew = true
      this.getDataTable()
    },
    setColumns (payload) {
      const thumb = payload.map((x) => Object.keys(x))
      this.columns = thumb[0]
      changeArrayIndex(this.columns, 'nokontrakx', 'namaperusahaan')
      // console.log('columns', this.columns)
    },

    refreshTable () {
      this.params.page = 1
      this.getNew = true
      this.getDataTable()
    },

    // api related function

    // ambil
    getDataTable () {
      if (!this.items.length || this.getNew) {
        waitLoad('show')
        // const params = { params: this.params }
        return new Promise((resolve, reject) => {
          api
          // .get('v1/siasik/paged-kontrak-aktif', params)
            .post('v1/siasik/paged-kontrak-aktif', this.params)
            .then((resp) => {
              waitLoad('done')
              // console.log(resp)
              if (resp.status === 200) {
                this.items = resp.data.data
                this.meta = resp.data.meta
                this.setColumns(resp.data.data)
                this.getNew = false
                resolve(resp.data.data)
              }
            })
            .catch((err) => {
              this.getNew = false
              waitLoad('done')
              reject(err)
            })
        })
      }
    }
  }
})
