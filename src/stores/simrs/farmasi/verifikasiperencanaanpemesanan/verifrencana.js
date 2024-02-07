import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { filterDuplicateArrays, notifErrVue, notifSuccess } from 'src/modules/utils'

export const useVerifikasiRencanaPesanStore = defineStore('verifikasi_rencana_pemesanan', {
  state: () => ({
    isOpen: false,
    loading: false,
    loadingVerif: false,
    loadingSimpan: false,
    items: [],
    meta: {},
    params: {
      q: '',
      page: 1,
      per_page: 10,
      flag: ['1']
    },
    rencana: {}
  }),
  actions: {
    setOpen() {
      this.isOpen = true
    },
    setClose() {
      this.isOpen = false
    },
    setRencana(val) {
      this.rencana = val
    },
    delRencanan() {
      this.rencana = {}
    },
    setForm(key, val) {
      this.form[key] = val
    },
    setParams(key, val) {
      this.params[key] = val
    },
    setFlag(val) {
      // console.log('flag', val)
      this.setParams('flag', val)
      this.setParams('page', 1)
      this.getDataTable()
    },
    setSearch(val) {
      this.setParams('q', val)
      this.setParams('page', 1)
      this.getDataTable()
    },
    setPerPage(val) {
      this.setParams('per_page', val)
      this.setParams('page', 1)
      this.getDataTable()
    },
    setPage(val) {
      this.setParams('page', val)
      this.getDataTable()
    },
    refresh() {
      this.setParams('page', 1)
      this.getDataTable()
    },
    metaniItem() {
      this.items.forEach(item => {
        item?.rincian.forEach(rinci => {
          rinci.kd_obat = rinci.kdobat
          rinci.nama_obat = rinci?.mobat?.nama_obat

          rinci.totalStok = 0
          rinci.maxRs = 0
          rinci.minRs = 0
          rinci.stokRuangan = []
          if (rinci?.stok?.length) {
            rinci.totalStok = rinci?.stok?.map(x => parseFloat(x.jumlah)).reduce((a, b) => a + b, 0)
            const ru = filterDuplicateArrays(rinci?.stok?.map(x => x.kdruang))
            if (ru.length) {
              ru.forEach(r => {
                const stok = rinci?.stok?.filter(x => x.kdruang === r)
                if (stok.length) {
                  const temp = stok[0]
                  temp.stok = stok.map(x => parseFloat(x.jumlah)).reduce((a, b) => a + b, 0)
                  rinci.stokRuangan.push(temp)
                }
              })
            }
          }
          if (rinci?.minmax?.length) {
            rinci.maxRs = rinci?.minmax?.map(x => parseFloat(x.max)).reduce((a, b) => a + b, 0)
            rinci.minRs = rinci?.minmax?.map(x => parseFloat(x.min)).reduce((a, b) => a + b, 0)
          }
        })
      })
    },
    async getDataTable(val) {
      const param = { params: this.params }
      this.loading = !val
      await api.get('v1/simrs/farmasinew/list-verif', param)
        .then(resp => {
          this.loading = false
          console.log('rencana', resp.data)
          this.items = resp?.data?.data ?? resp.data
          this.meta = resp?.data?.data ? resp?.data : {}
          this.metaniItem()
        })
        .catch(() => { this.loading = false })
    },
    simpanObat(val) {
      console.log('Simpan Obat', val)
      if (!val?.jumlah_diverif) return notifErrVue('Jumlah Verif Tidak boleh kosong')
      this.loadingSimpan = true
      val.loading = true
      return new Promise(resolve => {
        api.post('v1/simrs/farmasinew/verif/verifpemesananrinci', val)
          .then(resp => {
            console.log('simpan obat', resp.data)
            this.loadingSimpan = false
            val.loading = false

            notifSuccess(resp)
            resolve(resp)
          })
          .catch(() => {
            this.loadingSimpan = false
            val.loading = false
          })
      })
    },
    selesaiVerif(val) {
      console.log('selesai verif', val)
      this.loadingVerif = true
      val.loading = true
      return new Promise(resolve => {
        api.post('v1/simrs/farmasinew/verif/verifpemesanheder', val)
          .then(resp => {
            console.log('simpan obat', resp.data)
            this.loadingVerif = false
            val.loading = false
            this.setClose()
            this.getDataTable(true)
            notifSuccess(resp)
            resolve(resp)
          })
          .catch(() => {
            this.loadingVerif = false
            val.loading = false
          })
      })
    }
  }
})
