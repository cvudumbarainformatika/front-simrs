import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { titleCase } from 'src/modules/formatter'
import { findWithAttr, notifErrVue, notifSuccess } from 'src/modules/utils'

export const useVerifPermintaanRuangan = defineStore('verif_permintaan_ruangan', {
  state: () => ({
    loading: false,
    form: {},
    permintaans: [],
    loadingPermintaan: false,
    permintaan: {},
    depos: [],
    mapGudang: {},
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
      // console.log('payload', payload)
      this.columns = ['kode_rs', 'barangrs', 'satuan', 'ruang', 'stokDepo', 'alokasi', 'jumlah', 'jumlah_disetujui', 'alasan']
      // const thumb = payload.map((x) => Object.keys(x))
      // this.columns = thumb[0].sort()
      // changeArrayIndex(this.columns, 'kode_rs', 'alasan')
      // changeArrayIndex(this.columns, 'barangrs', 'alasan')
      // changeArrayIndex(this.columns, 'satuan', 'alasan')
      // changeArrayIndex(this.columns, 'jumlah', 'alasan')
      // changeArrayIndex(this.columns, 'gudang', 'alasan')
      // changeArrayIndex(this.columns, 'ruang', 'alasan')
      // pindah harga ke dekat jumlah / qty
      // this.pindah("harga", "qty");
      // this.pindah("satuan", "kode_satuan");
      // console.log('columns', this.columns)
    },
    permintaanSelected(val) {
      this.mapGudang = []
      this.permintaan = {}
      console.log('permintaan selected ', val)
      this.setForm('no_permintaan', val)
      const i = findWithAttr(this.permintaans, 'no_permintaan', val)
      if (i >= 0) {
        this.permintaan = this.permintaans[i]
        console.log('details', this.permintaan)
        this.setColumns(this.permintaan.details)
        // cari nama depo
        const apem = this.depos.filter((x) => {
          return x.kode === this.permintaan.details[0].dari
        })
        // map ke gudang
        this.mapGudang = {
          gudang: titleCase(apem[0].nama),
          items: this.permintaan.details
        }

        // const mapKey = Object.keys(this.permintaan.gudang)
        // mapKey.forEach((data, i) => {
        //   const apem = this.depos.filter((x) => {
        //     return x.kode === data
        //   })
        //   console.log('depo', this.depos)
        //   console.log('map gudang', apem)
        // this.mapGudang[i] = {
        //   gudang: titleCase(apem[0].nama),
        //   items: this.permintaan.gudang[data]
        // }
        //   // console.log(this.permintaan.gudang[data])
        // })
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
      this.permintaans = []
      this.loadingPermintaan = true
      return new Promise((resolve, reject) => {
        api
          .get('v1/transaksi/permintaanruangan/get-permintaan')
          .then((resp) => {
            this.loadingPermintaan = false
            console.log('permintaan ruangan', resp)
            this.permintaans = resp.data
            resolve(resp)
          })
          .then((err) => {
            this.loadingPermintaan = false
            reject(err)
          })
      })
    },
    // verivikasi permintaan
    saveForm() {
      let lanjut = false
      this.permintaan.details.forEach(data => {
        if (parseInt(data.jumlah_disetujui) <= 0 || data.jumlah_disetujui === null) {
          console.log('disetujui cek 0', data.jumlah_disetujui)
          notifErrVue('periksa kembali Jumlah disetujui')
          lanjut = false
        } else if (parseInt(data.jumlah_disetujui) > parseInt(data.jumlah)) {
          console.log('disetujui cek jumlah minta', data.jumlah_disetujui)
          notifErrVue('periksa kembali Jumlah disetujui')
          lanjut = false
        } else if (parseInt(data.jumlah_disetujui) > parseInt(data.alokasi)) {
          console.log('disetujui cek alokasi', data.jumlah_disetujui)
          notifErrVue('Jumlah di setujui tidak boleh melebihi jumlah alokasi')
          lanjut = false
        } else {
          console.log('disetujui else', data.jumlah_disetujui)
          lanjut = true
        }
      })
      if (lanjut) {
        this.loading = true
        const detail = this.permintaan.details.map(data => {
          const bar = { id: data.id, jumlah_disetujui: data.jumlah_disetujui }
          return bar
        })
        const data = {
          id: this.permintaan.id,
          status: 6,
          details: detail,
          tanggal_verif: date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss')
        }
        console.log('permintaan', data)
        return new Promise((resolve, reject) => {
          api.post('v1/transaksi/permintaanruangan/update-permintaan', data)
            .then(resp => {
              this.loading = false
              console.log(resp)
              this.form.no_permintaan = null
              this.permintaan = {}
              this.mapGudang = {}
              this.getPermintaan()
              notifSuccess(resp)
              resolve(resp)
            })
            .catch(err => {
              this.loading = false
              reject(err)
            })
        })
      }
    },
    tolakPermintaan() {
      const data = {
        id: this.permintaan.id,
        status: 20
      }
      console.log('data', data)
      this.loading = true
      return new Promise(resolve => {
        api.post('v1/transaksi/permintaanruangan/tolak-permintaan', data)
          .then(resp => {
            this.loading = false
            console.log(resp)
            this.form.no_permintaan = null
            this.permintaan = {}
            this.mapGudang = {}
            this.getPermintaan()
            notifSuccess(resp)
            resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    }
  }
})
