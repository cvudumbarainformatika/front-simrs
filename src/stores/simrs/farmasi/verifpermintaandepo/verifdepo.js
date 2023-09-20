import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useVerifPermintaanDepoStore = defineStore('verif_permintaan_depo', {
  state: () => ({
    loading: false,
    loadingCariPermintaan: false,
    items: [],
    meta: { from: 1 },
    params: {
      page: 1,
      q: '',
      per_page: 10,
      no_permintaan: '',
      kdgudang: ''
    },
    form: {},
    disp: { no_permintaan: '' },
    terpilih: {},
    columns: [
      'obat',
      'stok',
      'jumlah',
      'centang'
    ]
  }),
  actions: {
    setForm(key, val) {
      this.form[key] = val
    },
    setParams(key, val) {
      this.params[key] = val
    },
    permintaanSelected(val) {
      this.disp.no_permintaan = val
      const temp = this.items.filter(a => a.no_permintaan === val)
      if (temp.length) {
        const item = temp[0]
        this.terpilih = item
        console.log('item', item)
      }
    },
    cariPermintaan(val) {
      const needle = val.toLowerCase()
      const arr = 'no_permintaan'
      let opt = []

      const splits = arr.split('-')
      const multiFilter = (data = [], filterKeys = [], value = '') =>
        data.filter((item) =>
          filterKeys.some(
            (key) =>
              item[key].toString().toLowerCase().includes(value.toLowerCase()) &&
                item[key]
          )
        )
      const filteredData = multiFilter(this.items, splits, needle)
      opt = filteredData
      if (opt.length <= 0) {
        this.setParams('no_permintaan', val)
        this.getPermintaanDepo()
        // console.log('opt', 'ga ada')
      }
      // console.log('opt', opt)
      // console.log('val', val)
    },

    getInitialData() {
      this.getPermintaanDepo()
    },
    getPermintaanDepo() {
      this.loadingCariPermintaan = true
      const param = { params: this.params }
      return new Promise(resolve => {
        api.get('v1/simrs/farmasinew/gudang/distribusi/listpermintaandepo', param)
          .then(resp => {
            this.loadingCariPermintaan = false
            console.log('list PErmintaan depo', resp.data)
            this.items = resp.data
            resolve(resp)
          })
          .catch(() => { this.loadingCariPermintaan = false })
      })
    }
  }
})
