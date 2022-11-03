import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { titleCase } from 'src/modules/formatter'
import { changeArrayIndex, findWithAttr, notifErrVue } from 'src/modules/utils'

export const useVerifPermintaanRuangan = defineStore('verif_permintaan_ruangan', {
  state: () => ({
    loading: false,
    form: {},
    permintaans: [],
    permintaan: {},
    depos: [],
    mapGudang: [],
    columns: [],
    columnHide: [
      'id',
      'dari',
      'tujuan',
      'kode_satuan',
      'created_at',
      'updated_at',
      'permintaanruangan_id'
    ],
    params: {
      q: '',
      page: 1,
      per_page: 10,
      order_by: 'id',
      sort: 'desc'
    }
  }),
  actions: {
    // local related function
    setForm(key, payload) {
      this.form[key] = payload
    },
    setParam(key, val) {
      this.params[key] = val
    },
    setPage(payload) {
      // console.log('setPage', payload)
      this.params.page = payload
      // this.getDataTable()
    },
    setPerPage(payload) {
      this.params.per_page = payload
      this.params.page = 1
      // this.getDataTable()
    },
    refreshTable() {
      this.params.page = 1
      // this.getDataTable()
    },
    setSearch(val) {
      this.params.q = val
      // this.getDataTable()
    },
    setOder(payload) {
      this.params.order_by = payload
      this.params.sort === 'desc'
        ? (this.params.sort = 'asc')
        : (this.params.sort = 'desc')
      // this.getDataTable()
    },
    setColumns(payload) {
      console.log('payload', payload)
      const thumb = payload.map((x) => Object.keys(x))
      this.columns = thumb[0].sort()
      changeArrayIndex(this.columns, 'kode_rs', 'alasan')
      changeArrayIndex(this.columns, 'barangrs', 'alasan')
      changeArrayIndex(this.columns, 'satuan', 'alasan')
      changeArrayIndex(this.columns, 'jumlah', 'alasan')
      changeArrayIndex(this.columns, 'gudang', 'alasan')
      changeArrayIndex(this.columns, 'ruang', 'alasan')
      // pindah harga ke dekat jumlah / qty
      // this.pindah("harga", "qty");
      // this.pindah("satuan", "kode_satuan");
      // console.log('columns', this.columns)
    },
    permintaanSelected(val) {
      console.log('permintaan selected ', val)
      this.setForm('no_permintaan', val)
      const i = findWithAttr(this.permintaans, 'no_permintaan', val)
      if (i >= 0) {
        this.permintaan = this.permintaans[i]
        // console.log('details', this.permintaan.details)
        this.setColumns(this.permintaan.details)
        const mapKey = Object.keys(this.permintaan.gudang)
        mapKey.forEach((data, i) => {
          const apem = this.depos.filter((x) => {
            return x.kode === data
          })
          console.log('depo', this.depos)
          console.log('map gudang', apem)
          this.mapGudang[i] = {
            gudang: titleCase(apem[0].nama),
            items: this.permintaan.gudang[data]
          }
          // console.log(this.permintaan.gudang[data])
        })
        console.log('map gudang all', this.mapGudang)
      } else {
        notifErrVue('Permintaan tidak ditemukan')
      }
    },
    // api related function
    // ambil data depo
    getDepo() {
      this.loading = true
      return new Promise((resolve, reject) => {
        api
          .get('v1/gudang/depo')
          .then((resp) => {
            this.loading = false
            console.log('depo', resp)
            if (resp.status === 200) {
              this.depos = resp.data
            }
            resolve(resp)
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    },
    // ambil permintaan yang sudah selesai

    getPermintaan() {
      this.loading = true
      return new Promise((resolve, reject) => {
        api
          .get('v1/transaksi/permintaanruangan/get-permintaan')
          .then((resp) => {
            this.loading = false
            console.log('permintaan ruangan', resp)
            this.permintaans = resp.data
            resolve(resp)
          })
          .then((err) => {
            this.loading = false
            reject(err)
          })
      })
    }
  }
})
