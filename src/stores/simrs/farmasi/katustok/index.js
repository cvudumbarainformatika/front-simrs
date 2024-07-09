import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { useAplikasiStore } from 'src/stores/app/aplikasi'

export const useKartuStokFarmasiStore = defineStore('kartu_stok_farmasi', {
  state: () => ({
    meta: null,
    items: [],
    params: {
      q: '',
      bulan: '05',
      tahun: 2024,
      rowsPerPage: 20,
      page: 1,
      koderuangan: null,
      // koderuangan: 'Gd-05010100' // ini gudang
      // koderuangan: 'Gd-05010101' // ini depo rajal
      // koderuangan: 'R-0301009' // ini poli dalam
      // sortBy: 'nama_onbat',
      // descending: false
      rowsNumber: 0
    },
    loading: false,
    dialogRinci: false,
    item: null,
    exportExcel: false
  }),
  actions: {
    async getData () {
      this.loading = true
      const params = { params: this.params }
      const resp = await api.get('v1/simrs/farmasinew/kartustok/listobat', params)
      if (resp.status === 200) {
        this.loading = false
        this.meta = resp.data
        this.items = resp.data.data
        this.params.rowsNumber = resp.data.total
        // console.log('kjkjsdfs', this.items)
        // if (this.items.length) {
        //   this.items.forEach(it => {
        //     if (it?.distribusipersiapan?.length) {
        //       it?.distribusipersiapan.forEach(per => {
        //         const nore = per?.rinci?.find(ri => ri.nopermintaan === per.nopermintaan)
        //         per.noresep = nore?.noresep ?? ''
        //         // console.log('per', per)
        //       })
        //     }
        //   })
        // }
        console.log('kjkjsdfs ', resp?.data)
        this.loading = false
      }
      else {
        this.loading = false
      }
    },

    async onRequest (props) {
      console.log('props', props)
      this.params.page = props?.pagination?.page ?? 1
      this.params.rowsPerPage = props?.pagination?.rowsPerPage ?? 20
      await this.getData()
    },

    getInitialData () {
      const app = useAplikasiStore()
      const user = app?.user
      return new Promise((resolve, reject) => {
        this.params.koderuangan = user?.kdruangansim
        resolve(user)
      })
    },
    setTahun (val) {
      this.params.tahun = val
    },

    goToPage (val) {
      this.params.page = val
      this.getData()
    },

    setDialogRinci () {
      this.dialogRinci = !this.dialogRinci
    },
    setItem (val) {
      this.item = val
      this.dialogRinci = true
    }

  }
})
