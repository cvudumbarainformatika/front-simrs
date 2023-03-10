import { defineStore } from 'pinia'
import { changeArrayIndex, notifErrVue } from 'src/modules/utils'

export const useDetailHistoryTable = defineStore('detail_history', {
  state: () => ({
    isOpen: false,
    header: {},
    items: [],
    params: {
      q: '',
      page: 1,
      per_page: 5,
      order_by: 'created_at',
      sort: 'desc'
    },
    columns: [],
    columnHide: [
      'id',
      'uuid',
      'transaksi_gudang_id',
      'status',
      'pemesanan_id',
      'permintaanruangan_id',
      'distribusi_depo_id',
      'penerimaan_id',
      'kode_satuan',
      'kode_perusahaan',
      'reff',
      'details',
      'flag_siasik',
      'nama_barang',
      'barang108',
      'kode_108',
      'kode_50',
      'qty_kecil',
      'satuan_besar',
      'satuan_kecil',
      'isi',
      'harga',
      'sub_total',
      'created_at',
      'updated_at'
    ]
  }),
  getters: {
    getterColumns (state) {
      return state.columns.filter((el) => !state.columnHide.includes(el))
    }
  },
  actions: {
    setOpen () {
      this.isOpen = !this.isOpen
    },

    setColumns (payload, nama) {
      console.log('NAMA', nama)
      if (nama === 'PEMESANAN' || nama === 'PENERIMAAN') {
        const thumb = payload.map((x) => Object.keys(x))
        console.log('thumb', thumb)
        this.columns = thumb[0]
        if (thumb.length) {
          this.columns.sort()
          // changeArrayIndex(this.columns, 'kode_rs', 'harga')
          changeArrayIndex(this.columns, 'uraian_108', 'merk')
          changeArrayIndex(this.columns, 'uraian_50', 'merk')
          changeArrayIndex(this.columns, 'barangrs', 'kode_rs')
          // changeArrayIndex(this.columns, 'barangrs', 'kode_rs')
          // changeArrayIndex(this.columns, 'no_penerimaan', 'distribusi_depo_id')
        } else {
          notifErrVue('tidak ada data details')
        }
      }
      if (nama === 'PERMINTAAN RUANGAN') {
        this.columns = [
          'kode_rs',
          'barangrs',
          'kode_108',
          'barang108',
          'satuan',
          'gudang',
          'ruang',
          'jumlah',
          'jumlah_disetujui',
          'jumlah_distribusi',
          'alasan'
        ]
      }
      if (nama === 'PENERIMAAN RUANGAN') {
        this.columns = [
          'kode_rs',
          'barangrs',
          'kode_108',
          'barang108',
          'satuan',
          'jumlah'
        ]
      }
      if (nama === 'DISTRIBUSI DEPO') {
        this.columns = [
          'kode_rs',
          'barangrs',
          'kode_108',
          'barang108',
          'satuan',
          'jumlah'
        ]
      }
      if (nama === 'PEMAKAIAN RUANGAN' || nama === 'BARANG RUSAK') {
        this.columns = [
          'kode_rs',
          'barangrs',
          'kode_108',
          'barang108',
          'satuan',
          'jumlah'
        ]
      }
    },
    setData (data) {
      console.log('detail ', data)
      this.header = data
      this.setColumns(data.details, data.nama)
      this.items = data.details
      console.log('details', data)
    }
  }
})
