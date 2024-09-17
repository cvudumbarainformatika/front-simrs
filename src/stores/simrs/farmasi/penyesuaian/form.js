import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'

export const usePenyesuaianFarmasiStore = defineStore('form_penyesuaian_farmasi', {
  state: () => ({
    loading: false,
    loadingGetObat: false,
    loadingGetRinci: false,
    loadingGetTr: false,
    form: {
      kdruang: '',
      tgl_penyesuaian: date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss')
    },
    params: {
      kdobat: '',
      tglopname: '',
      kdruang: ''
    },
    obats: [],
    trans: {},
    rinci: []
  }),
  actions: {
    setForm (key, val) {
      this.form[key] = val
    },
    setparams (key, val) {
      this.params[key] = val
    },
    // hitung saldo awal
    hitungSaldoAwal (arr) { return arr?.reduce((x, y) => parseFloat(x) + parseFloat(y.jumlah), 0) },
    // mutasi masuk
    hitungPenerimaan (arr) {
      const terimalangsung = arr?.filter((x) => x.jenis_penerimaan !== 'Pesanan' && x.kunci === '1')
      const jmlterimalangsung = terimalangsung?.reduce((x, y) => parseFloat(x) + parseFloat(y.jml_terima_k), 0)

      const terimafaktur = arr?.filter((x) => x.jenis_penerimaan === 'Pesanan' && x.kunci === '1' && x.jenissurat === 'Faktur')
      const jmlterimafaktur = terimafaktur?.reduce((x, y) => parseFloat(x) + parseFloat(y.jml_terima_k), 0)

      const totalJml = jmlterimalangsung + jmlterimafaktur
      return totalJml
    },
    hitungMutasiMasuk (arr) {
      return arr?.reduce((x, y) => parseFloat(x) + parseFloat(y.jml), 0)
    },
    returResep (arr) { return arr?.reduce((x, y) => parseFloat(x) + parseFloat(y.jumlah_retur), 0) },
    hitungPenyesuaianMasuk (arr) {
      const penye = arr?.map(m => m?.ssw)
      const masuk = []
      penye?.forEach(e => {
        const anu = e?.filter(f => f.penyesuaian > 0)
        if (anu.length) {
          anu.forEach(s => {
            masuk.push(s)
          })
        }
      })
      return masuk?.reduce((x, y) => parseFloat(x) + parseFloat(y.penyesuaian), 0)
    },
    hitungReturDistribusi (arr) {
      if (this.params.kdruang === 'Gd-04010103') {
        return arr?.reduce((x, y) => parseFloat(x) + parseFloat(y.retur), 0)
      }
      else return 0
    },
    // hitung mutasi keluar
    hitungMutasiKeluar (arr) { return arr?.reduce((x, y) => parseFloat(x) + parseFloat(y.jml), 0) },
    hitungResepKeluar (arr, dist) {
      const resepkeluar = arr?.reduce((x, y) => parseFloat(x) + parseFloat(y.jumlah), 0)
      return resepkeluar
    },
    hitungResepRacikanKeluar (arr) {
      const resepkeluar = arr?.reduce((x, y) => parseFloat(x) + parseFloat(y.jumlah), 0)
      console.log('racikan', resepkeluar)
      return resepkeluar
    },
    hitungPenyesuaianKeluar (arr) {
      const penye = arr?.map(m => m.ssw)
      const keluar = []
      penye?.forEach(e => {
        const anu = e?.filter(f => f.penyesuaian < 0)
        if (anu.length) {
          anu.forEach(s => {
            keluar.push(s)
          })
        }
      })
      return keluar?.reduce((x, y) => parseFloat(x) + parseFloat(-y.penyesuaian), 0)
    },
    hitungDistribusi (arr) {
      if (this.params.kdruang === 'Gd-04010103') {
        const dsitribusi = arr?.reduce((x, y) => parseFloat(x) + parseFloat(y.keluar), 0)
        return dsitribusi
      }
      else return 0
    },
    hitungBarangRusak (arr) {
      const gudang = ['Gd-05010100', 'Gd-03010100']
      if (gudang.includes(this.params.kdruang)) return arr?.reduce((x, y) => parseFloat(x) + parseFloat(y.jumlah), 0)
      else return 0
    },
    // hitung total
    hitungTotal (row) {
      const awal = this.hitungSaldoAwal(row?.saldoawal)
      const masuk = this.hitungPenerimaan(row?.penerimaanrinci) + this.hitungMutasiMasuk(row?.mutasimasuk) + this.returResep(row?.returpenjualan) +
      this.hitungPenyesuaianMasuk(row?.stok) + this.hitungReturDistribusi(row?.persiapanretur)
      const keluar = this.hitungMutasiKeluar(row?.mutasikeluar) + this.hitungResepKeluar(row?.this.resepkeluar, row?.distribusipersiapan) +
      this.hitungResepRacikanKeluar(row?.resepkeluarracikan) + this.hitungPenyesuaianKeluar(row?.stok) + this.hitungDistribusi(row?.distribusipersiapan) +
      this.hitungBarangRusak(row?.barangrusak)
      // console.log('hit tot', awal, masuk, keluar)
      const total = awal + masuk - keluar
      return total
    },
    // stok seakrang
    stokSekarang (arr) {
      return arr?.stok?.reduce((x, y) => parseFloat(x) + parseFloat(y.jumlah), 0)
    },
    metaniObat () {
      // console.log('sebelum metani', this.obats)

      this.obats.forEach(ob => {
        ob.sAawal = this.hitungSaldoAwal(ob?.saldoawal)
        // masuk
        ob.masuk = this.hitungPenerimaan(ob?.penerimaanrinci) + this.hitungMutasiMasuk(ob?.mutasimasuk) + this.returResep(ob?.returpenjualan) +
        this.hitungPenyesuaianMasuk(ob?.stok) + this.hitungReturDistribusi(ob?.persiapanretur)
        // keluar
        ob.keluar = this.hitungMutasiKeluar(ob?.mutasikeluar) + this.hitungResepKeluar(ob?.resepkeluar, ob?.distribusipersiapan) +
        this.hitungResepRacikanKeluar(ob?.resepkeluarracikan) + this.hitungPenyesuaianKeluar(ob?.stok) + this.hitungDistribusi(ob?.distribusipersiapan) +
        this.hitungBarangRusak(ob?.barangrusak)
        // const total = ob.sAawal + ob.masuk - ob.keluar
        ob.sAkhir = ob.sAawal + ob.masuk - ob.keluar
        // ob.sAkhir = this.hitungTotal(ob)
        // console.log('ob', ob)
        ob.sSekarang = this.stokSekarang(ob)
      })
      // console.log('habis metani', this.obats)
    },
    getObat (val) {
      this.obats = []
      this.loadingGetObat = true
      const param = {
        params: {
          q: val,
          kdruang: this.params.kdruang
        }
      }
      return new Promise(resolve => {
        api.get('v1/simrs/farmasinew/penyesuaian/get-obat', param)
          .then(resp => {
            this.loadingGetObat = false
            this.obats = resp?.data
            if (this.obats.length) this.metaniObat()
            resolve(resp)
          })
          .catch(() => {
            this.loadingGetObat = false
          })
      })
    },
    getTransaksi () {
      const param = { params: this.params }
      this.loadingGetTr = true
      return new Promise(resolve => {
        api.get('v1/simrs/farmasinew/penyesuaian/transaksi', param)
          .then(resp => {
            this.loadingGetTr = false
            console.log('tr', resp?.data)
          })
          .catch(() => {
            this.loadingGetTr = false
          })
      })
    },
    getRincianTransaksi () {},
    simpan () {
      this.loading = true
      return new Promise(resolve => {
        // jam di tgl_penyesuaian ditambahkan di back end
        api.post('v1', this.form)
          .then(resp => {
            this.loading = false
            console.log('sudah simpan', resp)
            resolve(resp)
          })
          .catch(() => {
            this.loading = false
          })
      })
    }
  }
})
