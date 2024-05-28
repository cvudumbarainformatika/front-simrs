import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { useAplikasiStore } from 'src/stores/app/aplikasi'

export const useKartuStokFarmasiStore = defineStore('kartu_stok_farmasi', {
  state: () => ({
    meta: null,
    items: [],
    params: {
      q: '',
      bulan: '01',
      tahun: 2024,
      per_page: 50,
      page: 1,
      koderuangan: null
    },
    loading: false,
    dialogRinci: false,
    item: null
  }),
  actions: {
    async getData () {
      const app = useAplikasiStore()
      const user = app?.user
      this.params.koderuangan = user?.kdruangansim
      this.loading = true
      const params = { params: this.params }
      const resp = await api.get('v1/simrs/farmasinew/kartustok/listobat', params)
      if (resp.status === 200) {
        this.loading = false
        this.meta = resp.data
        this.items = resp.data.data
        // console.log('kjkjsdfs', this.items)
        console.log('kjkjsdfs', resp)
      }
      else {
        this.loading = false
      }
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
