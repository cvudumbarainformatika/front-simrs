import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifSuccess } from 'src/modules/utils'

export const useDispenStore = defineStore('dispen', {
  state: () => ({
    loading: false,
    isOpen: false,
    params: {
      q: null,
      per_page: 20,
      page: 1,
      flag: null,
      ruang: null
    },
    pegawais: [],
    form: {
      alasan: null,
      user_id: null,
      tanggal: new Date(),
      flag: 'DISPEN'
    },
    list: [],
    ruangan: [
      {
        id: 987654321,
        koderuangan: 'all',
        namaruang: 'Semua Ruangan'
      }
    ]

  }),
  // getters: {
  //   doubleCount: (state) => state.counter * 2
  // },
  actions: {
    async autocomplete () {
      const resp = await api.get('/v1/pegawai/absensi/autocomplete')
      console.log('autocomplete', resp)
      if (resp.status === 200) {
        // this.jenis_pegawai = resp.data.jenis_pegawai
        // this.jenis_pegawai.unshift({
        //   id: 987654321,
        //   kode_jenis: 'all',
        //   jenispegawai: 'Semua'
        // })
        this.ruangan = resp.data.ruangan
        this.ruangan.unshift(
          {
            id: 987654321,
            koderuangan: 'all',
            namaruang: 'Semua Ruangan'
          }
        )
        // this.ruanganPrint = this.ruangan
      }
    },
    setToday () {
      const tgl = new Date()
      const year = tgl.getFullYear()
      const month = ('0' + (tgl.getMonth() + 1)).slice(-2)
      const day = ('0' + (tgl.getDate())).slice(-2)
      const formatDb = year + '-' + month + '-' + day
      // const formatUniq = date.formatDate(tgl, 'YYMMDD')
      this.form.tanggal = formatDb
      // this.form.sampel_diambil = formatDb
      // this.uniqueId(formatUniq)
    },
    setForm(key, payload) {
      this.form[key] = payload
    },
    setIsOpen () {
      this.isOpen = !this.isOpen
    },
    searchPegawai() {
      this.params.page = 1
      this.getPegawai()
    },
    filterByFlag(val) {
      if (val !== 'all') {
        this.params.flag = val
      } else {
        delete this.params.flag
      }

      this.getPegawai()
    },
    filterByRuang(val) {
      if (val !== 'all') {
        this.params.ruang = val
      } else {
        delete this.params.ruang
      }

      // this.ruanganPrint = this.ruangan.filter(x => x.koderuangan === val)
      this.getPegawai()
    },
    async getPegawai() {
      this.loading = true
      const params = { params: this.params }
      try {
        const resp = await api.get('v1/dispen/pegawai', params)
        console.log('pegawai', resp)
        if (resp.status === 200) {
          this.pegawais = resp.data.data
          this.loading = false
        }
        this.loading = false
      } catch (error) {
        console.log('dispen', error)
        this.loading = false
      }
    },
    toList(val) {
      console.log('toList', val)
      this.list.push(val)
    },
    hapusList(index) {
      if (index > -1) { // only splice array when item is found
        this.list.splice(index, 1) // 2nd parameter means remove one item only
      }
    },
    async saveData() {
      this.loading = true

      const ids = this.list.map(x => x.user ? x.user.id : null)
      // console.log(ids)
      const formdata = new FormData()
      formdata.append('alasan', this.form.alasan)
      formdata.append('tanggal', this.form.tanggal)
      formdata.append('flag', this.form.flag)
      formdata.append('user_ids', ids)

      try {
        await api.post('/v1/dispen/store', formdata).then((resp) => {
          console.log('post dispen', resp)
          notifSuccess(resp)
          this.loading = false
          return new Promise((resolve, reject) => {
            resolve()
          })
        })
      } catch (error) {
        console.log('error')
        this.loading = false
      }
    },

    resetList() {
      this.list = []
      this.form.alasan = null
      this.setToday()
    }
  }
})
