import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { titleCase } from 'src/modules/formatter'
import { changeArrayIndex, notifCenterVue, notifErrVue, notifSuccess } from 'src/modules/utils'
import { useAuthStore } from 'src/stores/auth'
import { useTransaksiPermintaanForm } from './form'

export const useTransaksiPermintaanTable = defineStore('table_transaksi_permintaan', {
  state: () => ({
    loading: false,
    Finishloading: false,
    items: [],
    meta: {},
    mapGudang: [],
    columns: [],
    columnHide: [
      'id',
      'dari',
      'tujuan',
      'kode_satuan',
      'created_at',
      'updated_at',
      'jumlah_disetujui',
      'jumlah_distribusi',
      'no_penerimaan',
      'satuan_besar',
      'satuan_kecil',
      'isi',
      'permintaanruangan_id'
    ],
    form: {},
    nama: {
      satuan: 'barang belum dipilih',
      gudang: 'barang belum dipili'
    },
    depos: [],
    mapingDepos: [],
    loadingDepo: false,
    loadingTable: false,
    ruangs: [],
    minMaxPenggunas: [],
    stoks: [],
    barangHasStok: [],
    loadingHasStok: false,
    params: {
      q: '',
      page: 1,
      per_page: 10,
      order_by: 'id',
      sort: 'desc'
    }
  }),
  actions: {
    setForm(key, val) {
      this.form[key] = val
    },
    resetForm() {
      const store = useTransaksiPermintaanForm()
      const auth = useAuthStore()
      store.setForm('kode_pengguna', null)
      store.setForm('kode_ruang', auth.kode_ruang)
      store.setForm('kode_penanggungjawab', null)
      store.setForm('kode_rs', null)
      store.setForm('dari', null)
      store.setForm('tujuan', null)
      store.setForm('kode_satuan', null)
      store.setForm('alasan', '')
      store.setNoPermintaan()
      store.setNewReff()
      store.setNama('ruang', 'ruangan belum dipilih')
      store.setNama('pengguna', 'ruangan belum dipilih')
      store.setNama('penanggungjawab', 'ruangan belum dpilih')
      store.setNama('gudang', 'barang belum dipilih')
      store.setNama('satuan', 'barang belum dipilih')
      store.setForm('jumlah', '')
      store.barang = {}
      this.mapGudang = []
      // store.setNewReff()
    },
    resetInput() {
      const store = useTransaksiPermintaanForm()
      store.barang = {}
      store.setForm('jumlah', '')
      store.setForm('kode_rs', null)
      store.setForm('alasan', '')
      store.setNama('gudang', 'barang belum dipilih')
      store.setNama('satuan', 'barang belum dipilih')
    },
    resetAllData() {
      this.resetForm()
      this.resetInput()
      this.getDataTable()
    },
    setNama(key, val) {
      this.nama[key] = val
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
    assignForm(data) {
      // console.log('Assign Form', data)
      const store = useTransaksiPermintaanForm()
      const b = data.no_permintaan.split('/')
      store.nomor = b[0] + '-' + b[2]
      store.setForm('reff', data.reff)
      store.setForm('kode_penanggungjawab', data.kode_penanggungjawab)
      store.setForm('kode_pengguna', data.kode_pengguna)
      // store.setForm('no_permintaan', data.no_permintaan)

      // const peng = store.penggunas.filter((apem) => {
      //   return apem.kode === data.kode_pengguna
      // })
      // console.log('soucet', store.penggunas.length)
      // console.log('peng', peng)
      // const pj = store.penanggungjawabs.filter((data) => {
      //   return (
      //     data.level_3 === peng[0].level_3 &&
      // data.level_2 === peng[0].level_2 &&
      // data.level_1 === peng[0].level_1
      //   )
      // })
      // console.log('pj', pj)
      const detail = data.details[0]
      // const ruang = store.penggunaruangs.filter((apem) => {
      //   return apem.kode_pengguna === data.kode_pengguna
      // })
      // console.log('ruang', detail)

      // store.setForm('kode_penanggungjawab', pj[0].kode)
      store.setNama('penanggungjawab', data.pj.jabatan)
      store.setNama('pengguna', data.pengguna.jabatan)
      if (Object.keys(detail).length) {
        // console.log('Objeck key detail HAAAAADDIIIIRRRRR')
        store.setForm('tujuan', detail.tujuan)
        store.setForm('kode_ruang', detail.tujuan)
        store.setNama('ruang', detail.ruang.uraian)
      } else {
        store.setForm('tujuan', null)
        store.setNama('ruang', 'ruang tidak ditemukan')
      }
    },
    setColumns(payload) {
      const thumb = payload.map((x) => Object.keys(x))
      this.columns = thumb[0].sort()
      changeArrayIndex(this.columns, 'kode_rs', 'alasan')
      changeArrayIndex(this.columns, 'barangrs', 'alasan')
      changeArrayIndex(this.columns, 'satuan', 'alasan')
      changeArrayIndex(this.columns, 'jumlah', 'alasan')
      changeArrayIndex(this.columns, 'gudang', 'alasan')
      changeArrayIndex(this.columns, 'ruang', 'alasan')
      // console.log('set kolom', payload, this.columns)
      // pindah harga ke dekat jumlah / qty
      // this.pindah("harga", "qty");
      // this.pindah("satuan", "kode_satuan");
      // console.log('columns', this.columns)
    },

    // get data minMaxPengguna
    getMinMaxPengguna() {
      if (!this.minMaxPenggunas.length) {
        this.loading = true
        return new Promise(resolve => {
        // api.get('v1/minmaxpenggunastok/all')
          api.post('v1/minmaxpenggunastok/spesifik', this.form)
            .then(resp => {
              this.loading = false
              // console.log('minmaxpengguna', resp)
              this.minMaxPenggunas = resp.data
              resolve(resp)
            })
            .catch(() => {
              this.loading = false
            })
        })
      }
    },
    // get data stok
    getCurrentStok() {
      this.loadingHasStok = true
      this.barangHasStok = []
      return new Promise(resolve => {
        api.get('v1/stok/stok-depo')
          .then(resp => {
            // console.log('stok ada', Object.getPrototypeOf(resp.data).constructor.name)
            this.stoks = resp.data
            const kuncis = Object.keys(this.stoks)

            // console.log('stok ada', this.stoks)

            kuncis.forEach(key => {
              const barang = this.stoks[key]
              barang.nama = barang.barang ? barang.barang.nama : 'nama barang tidak ditemukan'
              barang.kode = barang.kode_rs
              barang.barang108 = barang.barang ? barang.barang.barang108 : 'kode 108 tidak ditemukan'
              barang.satuan = barang.barang ? barang.barang.satuan : 'satuan tidak ada'
              this.barangHasStok.push(barang)
              // console.log('barang aja', key)
            })

            this.loadingHasStok = false
            resolve(resp)
          })
          .catch(() => {
            this.loadingHasStok = false
          })
      })
    },
    // api related function
    deletesDetail(val) {
      // console.log('delete', val)
      const data = {
        id: val
      }
      this.loading = true
      return new Promise(resolve => {
        api.post('v1/transaksi/permintaanruangan/hapus-detail', data)
          .then(resp => {
            this.loading = false
            this.getDataTable().then(() => {
              resolve(resp)
            })
            notifSuccess(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    },
    // ambil data permintaan belum selesai
    getDataTable() {
      this.loadingTable = true
      this.mapGudang = []
      const params = { params: this.params }
      return new Promise((resolve, reject) => {
        api
          .get('v1/transaksi/permintaanruangan/draft', params)
          .then((resp) => {
            this.loadingTable = false
            // console.log('data ', resp)
            if (resp.data.message === 'completed') {
              notifCenterVue('data sudah disimpan dan dikunci, tidak diperkenannkan untuk diubah')
              resolve('completed')
              return
            }
            if (resp.status === 200) {
              if (resp.data.length) {
                const apem = resp.data
                this.setForm(apem[apem.length - 1])
                this.assignForm(apem[apem.length - 1])
                apem.forEach((data, i) => {
                  if (data) {
                    const mapKey = Object.keys(data.gudang)
                    mapKey.forEach((lupis) => {
                      const apem = this.depos.filter(x => { return x.kode === lupis })
                      this.setColumns(data.gudang[lupis])
                      this.mapGudang[i] = {
                        header: data,
                        gudang: apem.length ? titleCase(apem[0].nama) : 'Nama depo Tidak terlihat',
                        items: data.gudang[lupis]
                      }
                    })
                  }
                })
                // this.items = resp.data[0].details
                // this.setColumns(resp.data[0].details)
                // this.setForm(resp.data[0])
                // this.assignForm(resp.data[0])
                // const mapKey = Object.keys(resp.data[0].gudang)
                // mapKey.forEach((data, i) => {
                //   const apem = this.depos.filter(x => { return x.kode === data })
                //   console.log('depo', this.depos)
                //   console.log('map gudang', apem)
                //   this.mapGudang[i] = {
                //     gudang: titleCase(apem[0].nama),
                //     items: resp.data[0].gudang[data]
                //   }
                // console.log(resp.data[0].gudang[data])
                // })

                // console.log('ada', this.mapGudang)
                // console.log('gud', resp.data[0].gudang)
                resolve('ada')
              } else {
                // console.log('ambil baru')
                resolve('get new')
              }
              // this.meta = resp.data.meta
            }
          })
          .catch((err) => {
            this.loadingTable = false
            reject(err)
          })
      })
    },
    getDepo() {
      if (!this.depos.length) {
        this.loading = true
        return new Promise((resolve, reject) => {
          api
            .get('v1/gudang/depo')
            .then((resp) => {
              this.loading = false
              if (resp.status === 200) {
                const nama = resp.data.map(data => {
                  let temp = data.nama.split(' ')

                  if (temp.length > 2) {
                    for (let i = 0; i < temp.length; i++) {
                      temp[i] = temp[i].charAt(0)
                    }
                    data.noPer = temp.join('')
                    return data
                  } else {
                    temp = temp[1]
                  }
                  data.noPer = temp
                  return data
                })
                this.depos = resp.data
                console.log('nama', nama)
              // console.log('depo', resp.data)
              }
              resolve(resp)
            })
            .catch((err) => {
              this.loading = false
              reject(err)
            })
        })
      }
    },
    getRuang() {
      if (!this.ruangs.length) {
        this.loading = true
        return new Promise((resolve, reject) => {
          api
            .get('v1/ruang/all-ruang')
            .then((resp) => {
              this.loading = false
              // console.log('depo', resp)
              if (resp.status === 200) {
                this.ruangs = resp.data
              }
              resolve(resp)
            })
            .catch((err) => {
              this.loading = false
              reject(err)
            })
        })
      }
    },
    getMapingDepo() {
      if (!this.mapingDepos.length) {
        this.loadingDepo = true
        return new Promise((resolve, reject) => {
          api
            .get('v1/mapingdepo/barang')
            .then((resp) => {
              this.loadingDepo = false
              // console.log('mapingDepo', resp)
              if (resp.status === 200) {
                this.mapingDepos = resp.data
              }
              resolve(resp)
            })
            .catch((err) => {
              this.loadingDepo = false
              reject(err)
            })
        })
      }
    },
    selesaiInput() {
      this.Finishloading = true
      const data = { reff: this.params.reff }
      return new Promise((resolve, reject) => {
        api.post('v1/transaksi/permintaanruangan/selesai-input', data)
          .then(resp => {
            this.Finishloading = false
            notifSuccess(resp)
            this.resetForm()
            this.getDataTable().then(() => {
              resolve(resp)
            })
          })
          .catch(err => {
            this.Finishloading = false
            reject(err)
          })
      })
    },
    saveForm() {
      const store = useTransaksiPermintaanForm()
      if (store.form.jumlah <= 0 || store.form.jumlah === null) return notifErrVue('Jumlah Minta harus di isi')
      if (store.form.jumlah > store.barang.alokasi) return notifErrVue('Jumlah Minta tidak boleh melebihi jumlah alokasi')
      if (store.form.jumlah > (store.minMaxPenggunas.flag_minta === null ? (store.minMaxPenggunas.max_stok - store.barang.stokRuangan) : (store.minMaxPenggunas.minta - store.barang.stokRuangan))) return notifErrVue('Jumlah Minta tidak boleh melebihi maksimal ruangan')
      // remove null
      const formini = Object.keys(store.form)
      formini.forEach((data) => {
        if (store.form[data] === null) {
          delete store.form[data]
        }
      })

      const formtable = Object.keys(this.form)
      formtable.forEach((data) => {
        if (this.form[data] === null) {
          delete this.form[data]
        }
      })
      // merge object, setelah data yang null di buang
      const data = { ...store.form, ...this.form }
      // console.log('form', store.form)
      // console.log('table', this.form)
      // console.log('data', data)

      this.loading = true
      return new Promise((resolve, reject) => {
        api
          .post('v1/transaksi/permintaanruangan/store', data)
          .then((resp) => {
            this.loading = false
            notifSuccess(resp)
            this.resetInput()
            this.getDataTable().then(() => {
              resolve(resp)
            })
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    }
  }
})
