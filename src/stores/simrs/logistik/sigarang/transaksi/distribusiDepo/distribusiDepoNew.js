import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { notifSuccess, uniqueId } from 'src/modules/utils'

export const useDistribusiDepoNewStore = defineStore('new_distribusi_depo_store', {
  state: () => ({
    loading: false,
    meta: {},
    items: [],
    columns: [],
    columnHide: ['id', 'created_at', 'updated_at'],
    form: {
      tanggal: date.formatDate(Date.now(), 'YYYY-MM-DD')
    },
    display: {
      tanggal: date.formatDate(Date.now(), 'DD MMMM YYYY')
    },
    params: {
      q: '',
      page: 1,
      per_page: 10,
      order_by: 'created_at',
      sort: 'asc'
    }
  }),
  actions: {
    setForm(key, val) {
      this.form[key] = val
    },
    // local table related function
    setSearch(val) {
      this.params.q = val
      this.getDataPenerimaan()
    },
    setOder(payload) {
      this.params.order_by = payload
      this.params.sort === 'desc'
        ? (this.params.sort = 'asc')
        : (this.params.sort = 'desc')
      this.getDataPenerimaan()
    },
    setPage(payload) {
      // console.log('setPage', payload)
      this.params.page = payload
      this.getDataPenerimaan()
    },
    setPerPage(payload) {
      this.params.per_page = payload
      this.params.page = 1
      this.getDataPenerimaan()
    },
    refreshTable() {
      this.params.page = 1
      this.getDataPenerimaan()
    },
    // data form related

    setColumns(payload) {
      this.columns = [
        'tanggal',
        'no_penerimaan',
        'no_distribusi',
        'kontrak',
        'faktur',
        'perusahaan',
        'aksi']
      // if (!payload) return
      // const thumb = payload.map((x) => Object.keys(x))
      // this.columns = thumb[0]
      // this.columns.sort()
      // this.columns.reverse()
      // console.log('columns', this.columns)
    },
    // initial data
    getInitialData() {
      this.getDataPenerimaan()
      // this.setNoDistribusi()
    },
    // this custom store
    setNoDistribusi() {
      this.setForm('no_distribusi', 'DSTRDP-' + uniqueId())
      this.setForm('reff', 'reff-' + uniqueId())
    },
    searchPerusahaan(val) {
      this.getDataPenerimaan()
    },
    setDepo() {
      this.items.forEach(item => {
        if (item.details.length) {
          item.details.forEach(det => {
            if (det.barangrs) {
              det.kode_depo = det.barangrs.kode_depo
              if (det.barangrs.depo) {
                det.depo = det.barangrs.depo.nama
                det.canSave = true
              } else {
                det.canSave = false
              }
            }
            det.stok_gudang = item.stokgudang.filter(st => st.kode_rs === det.kode_rs).map(x => x.sisa_stok).reduce((a, b) => a + b, 0)
            if (det.stok_gudang < det.qty) {
              det.hasStok = false
            } else {
              det.hasStok = true
            }
            // det.kode_depo = det.barangrs ? det.barangrs.kode_depo : '-'
            // det.depo = det.barangrs ? (det.barangrs.depo ? det.barangrs.depo.nama : '-') : '-'
          })
          const canSave = item.details.filter(x => x.canSave === false)
          const hasStok = item.details.filter(x => x.hasStok === false)
          item.canSave = !canSave.length
          item.hasStok = !hasStok.length
        }
        const temp = item.no_penerimaan.split('BAST')
        let dist = ''
        if (temp.length === 2) {
          // console.log('temp', temp)
          if (temp[0] === '') {
            dist = 'DSTRB' + temp[1]
          } else if (temp[1]) {
            const satu = temp[0].split('/')
            const dua = temp[1].split('/')
            dist = satu[2] + '/' + 'DSTRB' + dua[0] + '/' + dua[2] + '/' + dua[3]
          }
        } else if (temp.length === 1) {
          dist = 'DSTRB/' + temp[0]
        }
        item.no_distribusi = dist
        // item.reff = 'reff-' + uniqueId()
      })
    },
    // api related function
    getDataPenerimaan() {
      this.loading = true
      const params = { params: this.params }
      return new Promise((resolve, reject) => {
        api
          .get('v1/transaksi/distribusidepo/penerimaan', params)
          .then((resp) => {
            this.loading = false
            console.log('data table', resp.data)
            this.items = resp.data.data
            this.setColumns(resp.data)
            this.setDepo()
            this.meta = resp.data.meta
            resolve(resp)
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    },
    saveForm(val) {
      this.loading = true
      val.tanggal_distribusi = this.form.tanggal
      return new Promise(resolve => {
        api.post('v1/transaksi/distribusidepo/new-store', val)
          .then(resp => {
            this.loading = false
            notifSuccess(resp)
            console.log('simpan ', resp)
            // this.resetAllData()
            resolve(resp)
          }).catch(() => {
            this.resetAll()
            this.loading = false
          })
      })
    }
  }
})
