import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifErrVue } from 'src/modules/utils'

export const usePerbaikanDataFarmasiStore = defineStore('perbaikan_data_farmasi', {
  state: () => ({
    loading: false,
    loadingFix: false,
    loadingFixOpname: false,
    loadingGetData: false,
    items: [],
    semuas: [],
    bermasalahs: [],
    tidakBermasalahs: [],
    meta: { total: 2700 },
    params: {
      q: '',
      page: 1,
      tahun: '2024',
      bulan: '06',
      per_page: 100,
      pilihan: 'semua'
    },
    form: {},
    gudangs: [
      { nama: 'Gudang Farmasi ( Kamar Obat )', kode: 'Gd-05010100' },
      { nama: 'Gudang Farmasi (Floor Stok)', kode: 'Gd-03010100' },
      { nama: 'Floor Stock 1 (AKHP)', kode: 'Gd-03010101' },
      { nama: 'Depo Rawat inap', kode: 'Gd-04010102' },
      { nama: 'Depo OK', kode: 'Gd-04010103' },
      { nama: 'Depo Rawat Jalan', kode: 'Gd-05010101' },
      { nama: 'Depo IGD', kode: 'Gd-02010104' }
    ],
    /// detail seections gudang
    openMutasi: false,
    loadingMutasi: false,
    detailMutasis: [],
    loadingFixMutasi: false,
    /// detail seections depo
    openResep: false,
    loadingResep: false,
    detailReseps: [],
    loadingFixResep: false,

    // Perbaikan Harga
    openHarga: false,
    loadingHarga: false,
    detailHargas: {},
    loadingFixHarga: false,

    // Pecah Nomor
    loadingPecah: false,

    // ganti Nomor
    loadingGanti: false
  }),
  actions: {
    setParams (key, val) {
      this.params[key] = val
    },
    setForm (key, val) {
      this.form[key] = val
    },
    async getLists () {
      this.loading = true
      this.items = []
      this.params.perbaiki = 'tidak'

      const params = {
        ...this.params
      }

      const resp = await api.post('/v1/simrs/farmasinew/stok/fr-perbaikan-data-depo', params)
      console.log(resp?.data)
      if (resp.status === 200) {
        const data = resp.data?.kdobat
        data.forEach(item => {
          if (item?.data.status === 200) {
            item.opnameJml = item?.data?.data?.cekOpname?.jmlSesuai
            item.opnameTrx = item?.data?.data?.cekOpname?.noperSesuai
            item.trxSesuai = !!(item?.data?.data?.eksekusi?.gaKtm === false || item?.data?.data?.eksekusi?.gaKtm?.length === 0)
            item.trxLebih = item?.data?.data?.penKur?.length === 0
            item.trxKurang = item?.data?.data?.penLeb?.length === 0
            // console.log('item', item)
          }
        })
        this.semuas = data
        if (this.params.pilihan === 'semua') this.items = this.semuas
        else if (this.params.pilihan === 'bermasalah') this.items = this.semuas.filter(item => (item.trxSesuai === false || item.trxLebih === false || item.trxKurang === false || item.opnameJml === false || item.opnameTrx === false))
        else if (this.params.pilihan === 'tidak') this.items = this.semuas.filter(item => (item.trxSesuai === true && item.trxLebih === true && item.trxKurang === true && item.opnameJml === true && item.opnameTrx === true))
        this.meta.total = resp.data?.total
        this.meta.page = resp.data?.page
      }
      // this.items = data
      // this.meta = meta
      this.loading = false
    },
    async getDetailMutasi (kode) {
      this.loadingMutasi = true
      this.items = []
      const params = {
        ...this.params
      }

      params.kdobat = kode
      const resp = await api.post('/v1/simrs/farmasinew/stok/fr-data-mutasi', params)
      console.log('resp', resp?.data)

      if (resp.status === 200) {
        this.detailMutasis = resp?.data?.data ?? []
      }
      this.loadingMutasi = false
    },
    async getDetailResep (kode) {
      this.loadingResep = true
      this.items = []
      const params = {
        ...this.params
      }

      params.kdobat = kode
      const resp = await api.post('/v1/simrs/farmasinew/stok/fr-data-resep', params)
      console.log('resp', resp?.data)

      if (resp.status === 200) {
        this.detailReseps = resp?.data?.data ?? []
        this.loadingResep = false
      }
      else {
        this.loadingResep = false
      }
    },
    ambilUlangData (data) {
      const params = {
        ...this.params
      }
      params.kdobat = data
      params.perbaiki = 'tidak'
      console.log('data', params, data)
      this.getData(params).then(resp => {
        console.log('resp ambil ulang', resp)
      })
    },
    autoFixMutasi (kode) {
      this.loadingFixMutasi = true
      this.items = []
      const params = {
        ...this.params
      }

      params.kdobat = kode
      params.perbaiki = 'ya'

      this.getData(params).then(resp => {
        console.log('resp auto fix', resp)

        this.loadingFixMutasi = false
        this.getDetailMutasi(kode)
        this.ambilUlangData(kode)
      }).catch(() => {
        this.loadingFixMutasi = false
      })
    },
    autoFixReseps (kode) {
      this.loadingFixResep = true
      this.items = []
      const params = {
        ...this.params
      }

      params.kdobat = kode.obat
      params.tipe = kode.tipe
      params.perbaiki = 'ya'
      // params.perbaiki = 'tidak'
      console.log('auto fix resep', kode, params)

      this.getData(params).then(resp => {
        console.log('resp auto fix', resp)

        this.loadingFixResep = false
        this.getDetailResep(kode)
        this.ambilUlangData(kode)
      }).catch(() => {
        this.loadingFixResep = false
      })
    },
    getData (data) {
      this.loadingGetData = true
      return new Promise((resolve, reject) => {
        api.post('/v1/simrs/farmasinew/stok/fr-perbaikan-data', data).then(resp => {
          this.loadingGetData = false
          const item = this.items.find(f => f.kd_obat === data?.kdobat)
          const sem = this.semuas.find(f => f.kd_obat === data?.kdobat)
          if (item) {
            item.data.data = resp?.data
            item.opnameJml = item?.data?.data?.cekOpname?.jmlSesuai
            item.opnameTrx = item?.data?.data?.cekOpname?.noperSesuai
            item.trxSesuai = !!(item?.data?.data?.eksekusi?.gaKtm === false || item?.data?.data?.eksekusi?.gaKtm?.length === 0)
            item.trxLebih = item?.data?.data?.penKur?.length === 0
            item.trxKurang = item?.data?.data?.penLeb?.length === 0
          }
          if (sem) {
            sem.data.data = resp?.data
            sem.opnameJml = sem?.data?.data?.cekOpname?.jmlSesuai
            sem.opnameTrx = sem?.data?.data?.cekOpname?.noperSesuai
            sem.trxSesuai = !!(sem?.data?.data?.eksekusi?.gaKtm === false || sem?.data?.data?.eksekusi?.gaKtm?.length === 0)
            sem.trxLebih = sem?.data?.data?.penKur?.length === 0
            sem.trxKurang = sem?.data?.data?.penLeb?.length === 0
          }
          console.log('resp get data', resp?.data, item)
          resolve(resp?.data)
        })
          .catch((err) => {
            this.loadingGetData = false
            reject(err)
          })
      })
    },
    perbaikanDataOpname (kode) {
      const item = this.items.find(f => f.kd_obat === kode)
      const opname = item?.data?.data?.cekOpname?.opname
      if (opname?.length <= 0) return notifErrVue('Data opname kosong')
      const payload = opname
      if (!payload) return notifErrVue('Data opname kosong gagal ditemukan, di list obat silahkan cek di halaman depan')
      console.log('resp opname', payload)
      this.loadingFixOpname = true
      return new Promise(resolve => {
        api.post('/v1/simrs/farmasinew/stok/fr-perbaikan-data-opname', payload).then(resp => {
          this.loadingFixOpname = false
          console.log('resp opname', resp?.data)
          item.data.data.cekOpname.opname = resp?.data?.data
          this.ambilUlangData(kode)
          resolve(resp)
        })
          .catch(() => {
            this.loadingFixOpname = false
          })
      })
    },
    getPerbaikanHarga (payload) {
      console.log('get perbaikan harga', payload)
      const form = {
        kdobat: payload.kd_obat,
        kdruang: this.params.kdruang,
        no_permintaan: payload.no_permintaan,
        nopenerimaan: payload.nopenerimaan
      }
      this.loadingHarga = true
      return new Promise(resolve => {
        api.post('/v1/simrs/farmasinew/stok/fr-get-perbaikan-harga', form)
          .then(resp => {
            this.loadingHarga = false
            console.log('resp harga', resp?.data)
            this.detailHargas = resp?.data?.data
            this.detailHargas.id = null
            this.detailHargas.reference = []
            if (this.detailHargas?.awal?.length) {
              this.detailHargas?.awal?.forEach(f => {
                this.detailHargas.reference.push(f)
              })
            }
            if (this.detailHargas?.penerimaan?.length) {
              this.detailHargas?.penerimaan?.forEach(f => {
                f.tglpenerimaan = f.header.tglpenerimaan
                this.detailHargas.reference.push(f)
              })
            }
            resolve(resp)
          })
          .catch(() => {
            this.loadingHarga = false
          })
      })
    },
    simpanPerbaikanHarga (item) {
      console.log('simpan perbaikan harga', item)
      this.loadingFixHarga = true
      return new Promise(resolve => {
        api.post('/v1/simrs/farmasinew/stok/fr-simpan-perbaikan-harga', item)
          .then(resp => {
            this.loadingFixHarga = false
            this.ambilUlangData(item.kd_obat)
            resolve(resp)
          })
          .catch(() => {
            this.loadingFixHarga = false
          })
      })
    },
    simpanPecahNomor (item) {
      console.log('simpan pecah nomor', item)
      this.loadingPecah = true
      return new Promise(resolve => {
        api.post('/v1/simrs/farmasinew/stok/fr-simpan-pecah-nomor', item)
          .then(resp => {
            this.loadingPecah = false
            this.getDetailResep(item.kdobat)
            this.getDetailMutasi(item.kdobat)
            this.ambilUlangData(item.kdobat)
            resolve(resp)
          })
          .catch(() => {
            this.loadingPecah = false
          })
      })
    },
    gantiNomor (item) {
      console.log('ganti nomor', item)
      this.loadingGanti = true
      return new Promise(resolve => {
        api.post('/v1/simrs/farmasinew/stok/fr-ganti-nomor', item)
          .then(resp => {
            this.loadingGanti = false
            this.getDetailResep(item.kdobat)
            this.getDetailMutasi(item.kdobat)
            this.ambilUlangData(item.kdobat)
            resolve(resp)
          })
          .catch(() => {
            this.loadingGanti = false
          })
      })
    }
  }
})
