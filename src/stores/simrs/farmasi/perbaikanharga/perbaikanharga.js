import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { dateDbFormat } from 'src/modules/formatter'
import { notifErrVue, notifSuccess } from 'src/modules/utils'

export const usePerbaikanHargaFarmasiStore = defineStore('perbaikan_harga_farmasi', {
  state: () => ({
    loading: false,
    loadingSimpan: false,
    isOpen: false,
    items: [],
    semuas: [],
    meta: {},
    data: [],
    columns: ['kd_obat', 'nama_obat', 'stok', 'opname', 'mutasi', 'resep', 'racikan', 'retur', 'mutasi_keluar', 'status', 'act'],
    colunmHide: [],
    params: {
      kdruang: '',
      q: '',
      page: 1,
      per_page: 100,
      tahun: '2024',
      bulan: '06',
      pilihan: 'semua'
    },
    gudangs: [
      { nama: 'Gudang Farmasi ( Kamar Obat )', kode: 'Gd-05010100' },
      { nama: 'Gudang Farmasi (Floor Stok)', kode: 'Gd-03010100' },
      { nama: 'Floor Stock 1 (AKHP)', kode: 'Gd-03010101' },
      { nama: 'Depo Rawat inap', kode: 'Gd-04010102' },
      { nama: 'Depo OK', kode: 'Gd-04010103' },
      { nama: 'Depo Rawat Jalan', kode: 'Gd-05010101' },
      { nama: 'Depo IGD', kode: 'Gd-02010104' }
    ]
  }),
  actions: {
    setParams (payload, value) {
      this.params[payload] = value
    },
    setPage (payload) {
      this.setParams('page', payload)
      this.getData()
    },
    setPerPage (payload) {
      this.setParams('per_page', payload)
      this.setParams('page', 1)
      this.getData()
    },
    refreshTable () {
      this.getData()
    },
    setSearch (payload) {
      this.setParams('page', 1)
      this.setParams('q', payload)
      this.getData()
    },
    metaniData (data) {
      console.log('data', data)

      if (this.semuas?.length) {
        this.semuas?.forEach(item => {
          item.beda = false
          const penerimaan = data?.penerimaan?.filter(a => a.kdobat === item.kd_obat) ?? []
          const awal = data?.awal?.filter(a => a.kdobat === item.kd_obat) ?? []
          const stok = data?.stok?.filter(a => a.kdobat === item.kd_obat) ?? []
          const mutasi = data?.mutasi?.filter(a => a.kdobat === item.kd_obat) ?? []
          const mutasikeluar = data?.mutasikeluar?.filter(a => a.kdobat === item.kd_obat) ?? []
          const opname = data?.opname?.filter(a => a.kdobat === item.kd_obat) ?? []
          const racikan = data?.racikan?.filter(a => a.kdobat === item.kd_obat) ?? []
          const resep = data?.resep?.filter(a => a.kdobat === item.kd_obat) ?? []
          const retur = data?.retur?.filter(a => a.kdobat === item.kd_obat) ?? []
          item.data = {
            stok,
            mutasi,
            mutasikeluar,
            opname,
            racikan,
            resep,
            retur,
            penerimaan,
            awal
          }

          item.stok = stok?.reduce((a, b) => a + parseFloat(b.jumlah), 0) ?? 0
          item.mutasi = mutasi?.reduce((a, b) => a + parseFloat(b.jumlah), 0) ?? 0
          item.mutasi_keluar = mutasikeluar?.reduce((a, b) => a + parseFloat(b.jumlah), 0) ?? 0
          item.opname = opname?.reduce((a, b) => a + parseFloat(b.jumlah), 0) ?? 0
          item.racikan = racikan?.reduce((a, b) => a + parseFloat(b.jumlah), 0) ?? 0
          item.resep = resep?.reduce((a, b) => a + parseFloat(b.jumlah), 0) ?? 0
          item.retur = retur?.reduce((a, b) => a + parseFloat(b.jumlah), 0) ?? 0

          stok?.forEach(st => {
            const trm = st?.nopenerimaan?.includes('awal') ? (awal?.find(a => a.kdobat === item.kdobat && a.nopenerimaan === st.nopenerimaan)) : (penerimaan?.find(a => a.kdobat === st.kdobat && a.nopenerimaan === st.nopenerimaan))
            if (trm) {
              if (trm.harga !== st.harga) st.beda = true
              if (dateDbFormat(st?.tglpenerimaan) !== (dateDbFormat(trm?.tglpenerimaan ?? trm?.tglpenerimaan))) st.beda = true // ini belum tentu ada header
            }
          })
          mutasi?.forEach(st => {
            const trm = st?.nopenerimaan?.includes('awal') ? (awal?.find(a => a.kdobat === st.kdobat && a.nopenerimaan === st.nopenerimaan)) : (penerimaan?.find(a => a.kdobat === st.kdobat && a.nopenerimaan === st.nopenerimaan))
            if (trm) {
              if (trm?.harga !== st.harga) {
                st.beda = true
                item.beda = true
              }
              if (dateDbFormat(st?.tglpenerimaan) !== (dateDbFormat(trm?.tglpenerimaan ?? trm?.tglpenerimaan))) {
                st.beda = true
                item.beda = true
              }
            }
          })
          mutasikeluar?.forEach(st => {
            const trm = st?.nopenerimaan?.includes('awal') ? (awal?.find(a => a.kdobat === st.kdobat && a.nopenerimaan === st.nopenerimaan)) : (penerimaan?.find(a => a.kdobat === st.kdobat && a.nopenerimaan === st.nopenerimaan))
            if (trm) {
              if (trm?.harga !== st.harga) {
                st.beda = true
                item.beda = true
              }
            }
          })
          opname?.forEach(st => {
            const trm = st?.nopenerimaan?.includes('awal') ? (awal?.find(a => a.kdobat === st.kdobat && a.nopenerimaan === st.nopenerimaan)) : (penerimaan?.find(a => a.kdobat === st.kdobat && a.nopenerimaan === st.nopenerimaan))
            if (trm) {
              if (trm?.harga !== st.harga) {
                st.beda = true
                item.beda = true
              }
            }
          })
          racikan?.forEach(st => {
            const trm = st?.nopenerimaan?.includes('awal') ? (awal?.find(a => a.kdobat === st.kdobat && a.nopenerimaan === st.nopenerimaan)) : (penerimaan?.find(a => a.kdobat === st.kdobat && a.nopenerimaan === st.nopenerimaan))
            if (trm) {
              if (trm?.harga !== st.harga) {
                st.beda = true
                item.beda = true
              }
            }
          })
          resep?.forEach(st => {
            const trm = st?.nopenerimaan?.includes('awal') ? (awal?.find(a => a.kdobat === st.kdobat && a.nopenerimaan === st.nopenerimaan)) : (penerimaan?.find(a => a.kdobat === st.kdobat && a.nopenerimaan === st.nopenerimaan))
            if (trm) {
              if (trm?.harga !== st.harga) {
                st.beda = true
                item.beda = true
              }
            }
          })
          retur?.forEach(st => {
            const trm = st?.nopenerimaan?.includes('awal') ? (awal?.find(a => a.kdobat === st.kdobat && a.nopenerimaan === st.nopenerimaan)) : (penerimaan?.find(a => a.kdobat === st.kdobat && a.nopenerimaan === st.nopenerimaan))
            if (trm) {
              if (trm?.harga !== st.harga) {
                st.beda = true
                item.beda = true
              }
            }
          })
        })
        if (this.params.pilihan === 'semua') {
          this.items = this.semuas
        }
        else if (this.params.pilihan === 'bermasalah') {
          this.items = this.semuas.filter(fi => fi.beda === true)
        }
        else if (this.params.pilihan === 'tidak') {
          this.items = this.semuas.filter(fi => !fi.beda === true)
        }
        console.log('items', this.items)
      }
    },
    metaniSatuData (data) {
      const kode = data?.kode[0]
      const item = this.semuas.find(f => f.kd_obat === kode)
      console.log('data', data, item, kode)
      if (item) {
        item.beda = false
        const penerimaan = data?.penerimaan?.filter(a => a.kdobat === item.kd_obat) ?? []
        const awal = data?.awal?.filter(a => a.kdobat === item.kd_obat) ?? []
        const stok = data?.stok?.filter(a => a.kdobat === item.kd_obat) ?? []
        const mutasi = data?.mutasi?.filter(a => a.kdobat === item.kd_obat) ?? []
        const mutasikeluar = data?.mutasikeluar?.filter(a => a.kdobat === item.kd_obat) ?? []
        const opname = data?.opname?.filter(a => a.kdobat === item.kd_obat) ?? []
        const racikan = data?.racikan?.filter(a => a.kdobat === item.kd_obat) ?? []
        const resep = data?.resep?.filter(a => a.kdobat === item.kd_obat) ?? []
        const retur = data?.retur?.filter(a => a.kdobat === item.kd_obat) ?? []
        item.data = {
          stok,
          mutasi,
          mutasikeluar,
          opname,
          racikan,
          resep,
          retur,
          penerimaan,
          awal
        }

        item.stok = stok?.reduce((a, b) => a + parseFloat(b.jumlah), 0) ?? 0
        item.mutasi = mutasi?.reduce((a, b) => a + parseFloat(b.jumlah), 0) ?? 0
        item.mutasi_keluar = mutasikeluar?.reduce((a, b) => a + parseFloat(b.jumlah), 0) ?? 0
        item.opname = opname?.reduce((a, b) => a + parseFloat(b.jumlah), 0) ?? 0
        item.racikan = racikan?.reduce((a, b) => a + parseFloat(b.jumlah), 0) ?? 0
        item.resep = resep?.reduce((a, b) => a + parseFloat(b.jumlah), 0) ?? 0
        item.retur = retur?.reduce((a, b) => a + parseFloat(b.jumlah), 0) ?? 0

        stok?.forEach(st => {
          const trm = st?.nopenerimaan?.includes('awal') ? (awal?.find(a => a.kdobat === item.kdobat && a.nopenerimaan === st.nopenerimaan)) : (penerimaan?.find(a => a.kdobat === st.kdobat && a.nopenerimaan === st.nopenerimaan))
          if (trm) {
            if (trm.harga !== st.harga) st.beda = true
            if (dateDbFormat(st?.tglpenerimaan) !== (dateDbFormat(trm?.tglpenerimaan ?? trm?.tglpenerimaan))) st.beda = true // ini belum tentu ada header
          }
        })
        mutasi?.forEach(st => {
          const trm = st?.nopenerimaan?.includes('awal') ? (awal?.find(a => a.kdobat === st.kdobat && a.nopenerimaan === st.nopenerimaan)) : (penerimaan?.find(a => a.kdobat === st.kdobat && a.nopenerimaan === st.nopenerimaan))
          if (trm) {
            if (trm?.harga !== st.harga) {
              st.beda = true
              item.beda = true
            }
            if (dateDbFormat(st?.tglpenerimaan) !== (dateDbFormat(trm?.tglpenerimaan ?? trm?.tglpenerimaan))) {
              st.beda = true
              item.beda = true
            }
          }
        })
        mutasikeluar?.forEach(st => {
          const trm = st?.nopenerimaan?.includes('awal') ? (awal?.find(a => a.kdobat === st.kdobat && a.nopenerimaan === st.nopenerimaan)) : (penerimaan?.find(a => a.kdobat === st.kdobat && a.nopenerimaan === st.nopenerimaan))
          if (trm) {
            if (trm?.harga !== st.harga) {
              st.beda = true
              item.beda = true
            }
          }
        })
        opname?.forEach(st => {
          const trm = st?.nopenerimaan?.includes('awal') ? (awal?.find(a => a.kdobat === st.kdobat && a.nopenerimaan === st.nopenerimaan)) : (penerimaan?.find(a => a.kdobat === st.kdobat && a.nopenerimaan === st.nopenerimaan))
          if (trm) {
            if (trm?.harga !== st.harga) {
              st.beda = true
              item.beda = true
            }
          }
        })
        racikan?.forEach(st => {
          const trm = st?.nopenerimaan?.includes('awal') ? (awal?.find(a => a.kdobat === st.kdobat && a.nopenerimaan === st.nopenerimaan)) : (penerimaan?.find(a => a.kdobat === st.kdobat && a.nopenerimaan === st.nopenerimaan))
          if (trm) {
            if (trm?.harga !== st.harga) {
              st.beda = true
              item.beda = true
            }
          }
        })
        resep?.forEach(st => {
          const trm = st?.nopenerimaan?.includes('awal') ? (awal?.find(a => a.kdobat === st.kdobat && a.nopenerimaan === st.nopenerimaan)) : (penerimaan?.find(a => a.kdobat === st.kdobat && a.nopenerimaan === st.nopenerimaan))
          if (trm) {
            if (trm?.harga !== st.harga) {
              st.beda = true
              item.beda = true
            }
          }
        })
        retur?.forEach(st => {
          const trm = st?.nopenerimaan?.includes('awal') ? (awal?.find(a => a.kdobat === st.kdobat && a.nopenerimaan === st.nopenerimaan)) : (penerimaan?.find(a => a.kdobat === st.kdobat && a.nopenerimaan === st.nopenerimaan))
          if (trm) {
            if (trm?.harga !== st.harga) {
              st.beda = true
              item.beda = true
            }
          }
        })

        const item2 = this.items.find(f => f.kd_obat === item.kd_obat)
        console.log('item2', item2)
      }
    },
    getData (val) {
      const param = val || this.params
      this.loading = true
      return new Promise((resolve, reject) => {
        api.post('/v1/simrs/farmasinew/cekdata/get-obat', param)
          .then(resp => {
            this.loading = false
            if (parseInt(this.params.per_page) === 1) this.metaniSatuData(resp?.data?.data)
            else {
              this.items = resp.data?.data?.data ?? resp?.data
              this.semuas = resp.data?.data?.data ?? resp?.data
              this.meta = resp.data?.data?.meta ?? resp?.data
              if (this.params?.kdruang) this.metaniData(resp?.data?.data)
            }
            // console.log('resp', resp?.data)
            resolve(resp)
          // this.data = resp?.data?.data
          }).catch(err => {
            this.loading = false
            reject(err)
          })
      })
    },

    async simpanPerbaikanHarga (item) {
      const param = this.params
      this.loading = true
      item.item.loading = true
      try {
        const resp = await api.post('/v1/simrs/farmasinew/cekdata/simpan-perbaikan-harga-dua', item)
        console.log('resp simpan', resp)
        notifSuccess(resp)
        const perPage = this.params.per_page
        const page = this.params.page
        this.params.page = 1
        this.params.per_page = 1
        this.params.q = item?.item?.kdobat
        this.getData(param).then(() => {
          this.params.per_page = perPage
          this.params.page = page
          this.params.q = ''
        })
      }
      catch (err) {
        notifErrVue(err, 'Gagal menyimpan perbaikan harga')
      }
      finally {
        item.item.loading = false
        this.loading = false
      }
    },
    async simpanPerbaikanHargaArray (item) {
      console.log(' simpan array', item)
      const param = this.params
      // this.loading = true
      item.row['loading' + item.loading] = true
      try {
        const resp = await api.post('/v1/simrs/farmasinew/cekdata/simpan-perbaikan-harga-array', item)
        console.log('resp simpan array', resp)
        notifSuccess(resp)
        const perPage = this.params.per_page
        const page = this.params.page
        this.params.page = 1
        this.params.per_page = 1
        this.params.q = item?.kd_obat
        this.getData(param).then(() => {
          this.params.per_page = perPage
          this.params.page = page
          this.params.q = ''
        })
      }
      catch (err) {
        notifErrVue(err, 'Gagal menyimpan perbaikan harga')
      }
      finally {
        item.row['loading' + item.loading] = false
        // this.loading = false
      }
    }
  }
})
