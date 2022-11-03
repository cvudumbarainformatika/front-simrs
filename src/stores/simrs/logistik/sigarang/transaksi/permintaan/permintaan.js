import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { titleCase } from 'src/modules/formatter'
import { changeArrayIndex, notifCenterVue, notifSuccess } from 'src/modules/utils'
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
      'permintaanruangan_id'
    ],
    form: {},
    nama: {
      satuan: 'barang belum dipilih',
      gudang: 'barang belum dipili'
    },
    depos: [],
    mapingDepos: [],
    ruangs: [],
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
      store.setForm('kode_pengguna', null)
      store.setForm('kode_penanggungjawab', null)
      store.setForm('kode_rs', null)
      store.setForm('dari', null)
      store.setForm('tujuan', null)
      store.setForm('kode_satuan', null)
      store.setForm('alasan', '')
      store.setNoPermintaan()
      store.setNewReff()
      store.setNama('ruang', 'pengguna belum dipilih')
      store.setNama('penanggungjawab', 'penngguna belum dpilih')
      store.setNama('gudang', 'barang belum dipilih')
      store.setNama('satuan', 'barang belum dipilih')
      store.setForm('jumlah', '')
      this.mapGudang = []
      // store.setNewReff()
    },
    resetInput() {
      const store = useTransaksiPermintaanForm()
      store.setForm('jumlah', '')
      store.setForm('kode_rs', null)
      store.setForm('alasan', '')
      store.setNama('gudang', 'barang belum dipilih')
      store.setNama('satuan', 'barang belum dipilih')
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
      console.log('Assign Form', data)
      const store = useTransaksiPermintaanForm()
      store.setForm('reff', data.reff)
      store.setForm('kode_penanggungjawab', data.kode_penanggungjawab)
      store.setForm('kode_pengguna', data.kode_pengguna)
      // store.setForm('no_permintaan', data.no_permintaan)

      const peng = store.penggunas.filter((apem) => {
        return apem.kode === data.kode_pengguna
      })
      console.log('soucet', store.penggunas.length)
      console.log('peng', peng)
      const pj = store.penanggungjawabs.filter((data) => {
        return (
          data.level_3 === peng[0].level_3 &&
      data.level_2 === peng[0].level_2 &&
      data.level_1 === peng[0].level_1
        )
      })
      console.log('pj', pj)
      const ruang = store.penggunaruangs.filter((apem) => {
        return apem.kode_pengguna === data.kode_pengguna
      })
      console.log('ruang', ruang)

      store.setForm('kode_penanggungjawab', pj[0].kode)
      store.setNama('penanggungjawab', pj[0].jabatan)
      if (ruang.length) {
        store.setForm('tujuan', ruang[0].kode_ruang)
        store.setNama('ruang', ruang[0].ruang.uraian)
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
      console.log('set kolom', payload, this.columns)
      // pindah harga ke dekat jumlah / qty
      // this.pindah("harga", "qty");
      // this.pindah("satuan", "kode_satuan");
      // console.log('columns', this.columns)
    },

    deletesData(val) {},
    // api related function
    // ambil data permintaan belum selesai
    getDataTable() {
      this.loading = true
      const params = { params: this.params }
      return new Promise((resolve, reject) => {
        api
          .get('v1/transaksi/permintaanruangan/draft', params)
          .then((resp) => {
            this.loading = false
            console.log('data ', resp)
            // console.log('data[0] ', resp.data.data[0])
            if (resp.data.message === 'completed') {
              console.log(resp)
              notifCenterVue('data sudah disimpan dan dikunci, tidak diperkenannkan untuk diubah')
              resolve('completed')
              return
            }
            if (resp.status === 200) {
              console.log('Detail length', resp.data)
              if (resp.data.length) {
                console.log('with detail', resp.data)
                const apem = resp.data
                this.setForm(apem[apem.length - 1])
                this.assignForm(apem[apem.length - 1])
                apem.forEach((data, i) => {
                  console.log('data', data)
                  if (data) {
                    const mapKey = Object.keys(data.gudang)
                    console.log('mapkey', mapKey)
                    mapKey.forEach((lupis) => {
                      const apem = this.depos.filter(x => { return x.kode === lupis })
                      this.setColumns(data.gudang[lupis])
                      console.log('LUPIS', data.gudang[lupis])
                      console.log('map gudang', apem)
                      this.mapGudang[i] = {
                        header: data,
                        gudang: titleCase(apem[0].nama),
                        items: data.gudang[lupis]
                      }
                    // console.log(resp.data[0].gudang[data])
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

                console.log('ada', this.mapGudang)
                // console.log('gud', resp.data[0].gudang)
                resolve('ada')
              } else {
                console.log('ambil baru')
                resolve('get new')
              }
              // this.meta = resp.data.meta
            }
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    },
    getDepo() {
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
              console.log('depo', resp.data)
            }
            resolve(resp)
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    },
    getRuang() {
      this.loading = true
      return new Promise((resolve, reject) => {
        api
          .get('v1/ruang/all-ruang')
          .then((resp) => {
            this.loading = false
            console.log('depo', resp)
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
    },
    getMapingDepo() {
      this.loading = true
      return new Promise((resolve, reject) => {
        api
          .get('v1/mapingdepo/maping')
          .then((resp) => {
            this.loading = false
            console.log('mapingDepo', resp)
            if (resp.status === 200) {
              this.mapingDepos = resp.data
            }
            resolve(resp)
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
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
            this.getDataTable()
            resolve(resp)
          })
          .catch(err => {
            this.Finishloading = false
            reject(err)
          })
      })
    },
    saveForm() {
      const store = useTransaksiPermintaanForm()
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
      console.log('form', store.form)
      console.log('table', this.form)
      console.log('data', data)

      this.loading = true
      return new Promise((resolve, reject) => {
        api
          .post('v1/transaksi/permintaanruangan/store', data)
          .then((resp) => {
            this.loading = false
            notifSuccess(resp)
            this.getDataTable()
            this.resetInput()
            resolve(resp)
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    }
  }
})
