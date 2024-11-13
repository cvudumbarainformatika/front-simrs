import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifErrVue } from 'src/modules/utils'

export const usePerbaikanHargaFarmasiStore = defineStore('perbaikan_harga_farmasi', {
  state: () => ({
    loading: false,
    loadingSimpan: false,
    isOpen: false,
    items: [],
    meta: {},
    data: [],
    columns: ['kd_obat', 'nama_obat', 'stok', 'opname', 'mutasi', 'resep', 'racikan', 'retur', 'mutasi_keluar', 'status', 'act'],
    colunmHide: [],
    params: {
      kdruang: 'Gd-03010101',
      q: 'masker',
      page: 1,
      per_page: 10,
      tahun: '2024',
      bulan: '06'
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
      this.setParams('page', 1)
      this.getData()
    },
    setSearch (payload) {
      this.setParams('page', 1)
      this.setParams('q', payload)
      this.getData()
    },
    metaniData (data) {
      console.log('data', data)

      if (this.items?.length) {
        this.items?.forEach(item => {
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

          let bedaStok = false
          let bedaMutasi = false
          let bedaMutasikeluar = false
          let bedaOpname = false
          let bedaRracikan = false
          let bedaResep = false
          let bedaRetur = false
          stok?.forEach(st => {
            const trm = st?.nopenerimaan?.includes('awal') ? (awal?.find(a => a.kdobat === item.kdobat && a.nopenerimaan === st.nopenerimaan)) : (penerimaan?.find(a => a.kdobat === st.kdobat && a.nopenerimaan === st.nopenerimaan))
            if (trm) {
              if (trm.harga !== st.harga) bedaStok = true
            }
          })
          mutasi?.forEach(st => {
            const trm = st?.nopenerimaan?.includes('awal') ? (awal?.find(a => a.kdobat === st.kdobat && a.nopenerimaan === st.nopenerimaan)) : (penerimaan?.find(a => a.kdobat === st.kdobat && a.nopenerimaan === st.nopenerimaan))
            if (trm) {
              if (trm?.harga !== st.harga) bedaMutasi = true
            }
          })
          mutasikeluar?.forEach(st => {
            const trm = st?.nopenerimaan?.includes('awal') ? (awal?.find(a => a.kdobat === st.kdobat && a.nopenerimaan === st.nopenerimaan)) : (penerimaan?.find(a => a.kdobat === st.kdobat && a.nopenerimaan === st.nopenerimaan))
            if (trm) {
              if (trm?.harga !== st.harga) bedaMutasikeluar = true
            }
          })
          opname?.forEach(st => {
            const trm = st?.nopenerimaan?.includes('awal') ? (awal?.find(a => a.kdobat === st.kdobat && a.nopenerimaan === st.nopenerimaan)) : (penerimaan?.find(a => a.kdobat === st.kdobat && a.nopenerimaan === st.nopenerimaan))
            if (trm) {
              if (trm?.harga !== st.harga) bedaOpname = true
            }
          })
          racikan?.forEach(st => {
            const trm = st?.nopenerimaan?.includes('awal') ? (awal?.find(a => a.kdobat === st.kdobat && a.nopenerimaan === st.nopenerimaan)) : (penerimaan?.find(a => a.kdobat === st.kdobat && a.nopenerimaan === st.nopenerimaan))
            if (trm) {
              if (trm?.harga !== st.harga) bedaRracikan = true
            }
          })
          resep?.forEach(st => {
            const trm = st?.nopenerimaan?.includes('awal') ? (awal?.find(a => a.kdobat === st.kdobat && a.nopenerimaan === st.nopenerimaan)) : (penerimaan?.find(a => a.kdobat === st.kdobat && a.nopenerimaan === st.nopenerimaan))
            if (trm) {
              if (trm?.harga !== st.harga) bedaResep = true
            }
          })
          retur?.forEach(st => {
            const trm = st?.nopenerimaan?.includes('awal') ? (awal?.find(a => a.kdobat === st.kdobat && a.nopenerimaan === st.nopenerimaan)) : (penerimaan?.find(a => a.kdobat === st.kdobat && a.nopenerimaan === st.nopenerimaan))
            if (trm) {
              if (trm?.harga !== st.harga) bedaRetur = true
            }
          })
          item.beda = [
            bedaStok,
            bedaMutasi,
            bedaMutasikeluar,
            bedaOpname,
            bedaRracikan,
            bedaResep,
            bedaRetur

          ]
        })
      }
    },
    async getData () {
      this.loading = true
      try {
        const resp = await api.post('/v1/simrs/farmasinew/cekdata/get-obat', this.params)
        console.log('resp', resp?.data)
        this.items = resp.data?.data?.data ?? resp?.data
        this.meta = resp.data?.data?.meta ?? resp?.data
        this.metaniData(resp?.data?.data)
        // this.data = resp?.data?.data
      }
      catch (err) {
        notifErrVue(err, 'Gagal mengambil data perbaikan harga')
      }
      finally {
        this.loading = false
      }
    },
    async getDataDetail (payload) {
      this.loading = true
      try {
        const resp = await api.post('/v1/simrs/farmasinew/stok/fr-get-perbaikan-harga-detail', payload)
        this.dataDetail = resp.data.data
      }
      catch (err) {
        notifErrVue(err, 'Gagal mengambil data perbaikan harga detail')
      }
      finally {
        this.loading = false
      }
    },
    async simpanPerbaikanHarga (item) {
      this.loading = true
      try {
        const resp = await api.post('/v1/simrs/farmasinew/stok/fr-simpan-perbaikan-harga', item)
        console.log('resp', resp)
        notifErrVue('success', 'Berhasil menyimpan perbaikan harga')
        this.getData(this.params)
      }
      catch (err) {
        notifErrVue(err, 'Gagal menyimpan perbaikan harga')
      }
      finally {
        this.loading = false
      }
    }
  }
})
