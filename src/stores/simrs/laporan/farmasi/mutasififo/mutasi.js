import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
// eslint-disable-next-line no-unused-vars
import { formatDouble } from 'src/modules/formatter'
import { notifErrVue } from 'src/modules/utils'

export const useLaporanMutasiFiFoFarmasiStore = defineStore('laporan_mutasi_fifo_farmasi', {
  state: () => ({
    loading: false,
    loadingNext: false,
    loadingDownload: false,
    items: [],
    meta: {},
    params: {
      q: '',
      per_page: 10,
      page: 1,
      bulan: date.formatDate(Date.now(), 'MM'),
      tahun: date.formatDate(Date.now(), 'YYYY'),
      kode_ruang: 'all',
      jenis: 'detail'
    },
    bulans: [
      { nama: 'January', value: '01' },
      { nama: 'February', value: '02' },
      { nama: 'Maret', value: '03' },
      { nama: 'April', value: '04' },
      { nama: 'Mei', value: '05' },
      { nama: 'Juni', value: '06' },
      { nama: 'Juli', value: '07' },
      { nama: 'Agustus', value: '08' },
      { nama: 'September', value: '09' },
      { nama: 'Oktober', value: '10' },
      { nama: 'November', value: '11' },
      { nama: 'Desember', value: '12' }
    ],
    gudangs: [
      { nama: 'Semua', value: 'all' },
      { nama: 'Gudang Farmasi ( Kamar Obat )', value: 'Gd-05010100' },
      { nama: 'Gudang Farmasi (Floor Stok)', value: 'Gd-03010100' }
    ],
    optionJenis: [
      { nama: 'Detail', value: 'detail' },
      { nama: 'Rekap', value: 'rekap' }
    ],
    total: 0,
    tTotal: 0,
    htotal: 0,
    htTotal: 0,
    fields: {

    }
  }),
  actions: {
    setParams (key, val) {
      this.params[key] = val
    },
    setSearch (payload) {
      console.log(this.params.q)
      // this.setParams('q', payload)
      this.items = []
      this.setParams('page', 1)
      this.getDataTable()
    },
    setPage (payload) {
      this.setParams('page', payload)
      this.getDataTable()
    },
    setPerPage (payload) {
      this.setParams('per_page', payload)
      this.setParams('page', 1)
      this.getDataTable()
    },
    refreshTable () {
      this.setParams('page', 1)
      this.getDataTable()
    },
    mapingItem (val, array) {
      val.forEach(it => {
        it.data = []
        if (it?.resepkeluarracikan.length) {
          it?.resepkeluarracikan.forEach(rac => {
            const index = this.params.jenis === 'rekap' ? it.resepkeluar.findIndex(a => a.kdobat === rac.kdobat) : it.resepkeluar.findIndex(a => a.kdobat === rac.kdobat && a.nopenerimaan === rac.nopenerimaan && a.noresep === rac.noresep)
            if (index >= 0) {
              const jum = parseFloat(it.resepkeluar[index].jumlah) + parseFloat(rac.jumlah)
              const sub = parseFloat(rac.harga) * jum
              it.resepkeluar[index].jumlah = jum
              it.resepkeluar[index].sub = sub
            }
            else it.resepkeluar.push(rac)
          })
        }
        if (it?.saldoawal.length) {
          it?.saldoawal.forEach(s => {
            if (s.sub === null) {
              let sub = 0
              if ((parseFloat(s.jumlah) > 0 && parseFloat(s.harga) > 0)) sub = s.jumlah * s.harga
              s.sub = sub
            }
            s.tgl = this.params.tahun + '-' + this.params.bulan + '-01 00:00:00'
            // if (isNaN(parseFloat(s.sub))) console.log('st', s, parseFloat(s.harga))
            const temp = {
              tgl: s.tgl,
              saldoawal: s,
              ket: 'Saldo Awal'
            }
            it.data.push(temp)
          })
        }

        const masuk = []
        it?.saldo?.forEach(sa => { masuk.push(sa) })
        it?.terima?.forEach(per => {
          const ada = masuk.findIndex(a => a.kdobat === per.kdobat && a.nopenerimaan === per.nopenerimaan)
          if (ada >= 0) {
            const jum = parseFloat(masuk[ada].jumlah) + parseFloat(per.jumlah)
            const sub = parseFloat(per.harga) * jum
            masuk[ada].jumlah = jum
            masuk[ada].sub = sub
          }
          else masuk.push(per)
        })
        it?.retur?.forEach(per => {
          const ada = masuk.findIndex(a => a.kdobat === per.kdobat && a.nopenerimaan === per.nopenerimaan)
          if (ada >= 0) {
            const jum = parseFloat(masuk[ada].jumlah) + parseFloat(per.jumlah)
            const sub = parseFloat(masuk[ada].harga) * jum
            masuk[ada].jumlah = jum
            masuk[ada].sub = sub
          }
          else masuk.push(per)
        })
        const res = it.resepkeluar
        res.forEach(res => {
          // const harga = it?.daftarharga?.find(a => a.kd_obat === res.kdobat && a.nopenerimaan === res.nopenerimaan)
          // const hargaSt = it?.saldoawal?.find(a => a.kdobat === res.kdobat && a.nopenerimaan === res.nopenerimaan)
          // if (harga) res.harga = harga.harga
          // else res.harga = hargaSt?.harga ?? 0
          // res.sub = res.jumlah * res.harga
          const temp = {
            tgl: res?.tgl ?? this.params.tahun + '-' + this.params.bulan + '-31 23:00:00',
            keluar: res,
            ket: this.params.jenis === 'detail' ? res?.header?.norm + ' ' + (res?.header?.datapasien?.rs2 ?? '') : 'Resep'
          }

          if (this.params.jenis === 'detail') it.data.push(temp)

          const adaPen = this.params.jenis === 'rekap' ? masuk.filter(a => a.kdobat === res.kdobat) : masuk.filter(a => a.kdobat === res.kdobat && (a.nopenerimaan === res.nopenerimaan || a.harga === res.harga))
          let diminta = res.jumlah
          let nilaiDiminta = res.sub
          if (adaPen.length) {
            let index = 0
            while (diminta > 0 && index < adaPen.length) {
              if (adaPen[index].jumlah >= diminta) {
                const sisa = adaPen[index].jumlah - diminta
                adaPen[index].jumlah = sisa
                diminta = 0

                const nilaiSisa = adaPen[index].sub - nilaiDiminta
                adaPen[index].sub = nilaiSisa
                nilaiDiminta = 0
              }
              else {
                const sisa = diminta - adaPen[index].jumlah
                diminta = sisa
                adaPen[index].jumlah = 0

                const nilaiSisa = adaPen[index].sub - nilaiDiminta
                nilaiDiminta = nilaiSisa
                adaPen[index].sub = 0

                index += 1
              }
              // console.log('if', adaPen[index], diminta)
            }
          }
          else {
            let index = 0
            while (diminta > 0 && index < masuk.length) {
              if (masuk[index].jumlah >= diminta) {
                const sisa = masuk[index].jumlah - diminta
                masuk[index].jumlah = sisa
                diminta = 0
                const nilaiSisa = masuk[index].sub - nilaiDiminta
                masuk[index].sub = nilaiSisa
                nilaiDiminta = 0
              }
              else {
                const sisa = diminta - masuk[index].jumlah
                diminta = sisa
                masuk[index].jumlah = 0

                const nilaiSisa = masuk[index].sub - nilaiDiminta
                nilaiDiminta = nilaiSisa
                masuk[index].sub = 0

                index += 1
              }
              // console.log('else', masuk[index])
            }
          }
        })
        if (this.params.jenis !== 'detail' && it?.resepkeluar?.length) {
          const raw = {
            tgl: it?.resepkeluar[0]?.tgl,
            harga: 0,
            jumlah: it?.resepkeluar?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0),
            sub: it?.resepkeluar?.reduce((a, b) => parseFloat(a) + parseFloat(b.sub), 0)
          }
          it.data.push({
            tgl: raw?.tgl,
            keluar: raw,
            ket: 'Resep'
          })
        }
        const pak = it.pemakaian
        pak.forEach(res => {
          const temp = {
            tgl: res?.tgl ?? this.params.tahun + '-' + this.params.bulan + '-31 23:00:00',
            keluar: res,
            ket: this.params.jenis === 'detail' ? (res?.ruangan?.uraian ?? '') : 'Ruangan'
          }
          // const harga = it?.daftarharga?.find(a => a.kd_obat === res.kdobat && a.nopenerimaan === res.nopenerimaan)
          // const hargaSt = it?.saldoawal?.find(a => a.kdobat === res.kdobat && a.nopenerimaan === res.nopenerimaan)
          // if (harga) res.harga = harga.harga
          // else res.harga = hargaSt?.harga ?? 0
          // res.sub = res.jumlah * res.harga

          if (this.params.jenis === 'detail') it.data.push(temp)

          const adaPen = masuk.filter(a => a.kdobat === res.kdobat && (a.nopenerimaan === res.nopenerimaan || a.harga === res.harga))
          let diminta = res.jumlah
          let nilaiDiminta = res.sub
          if (adaPen.length) {
            let index = 0
            while (diminta > 0 && index < adaPen.length) {
              if (adaPen[index].jumlah >= diminta) {
                const sisa = adaPen[index].jumlah - diminta
                adaPen[index].jumlah = sisa
                diminta = 0

                const nilaiSisa = adaPen[index].sub - nilaiDiminta
                adaPen[index].sub = nilaiSisa
                nilaiDiminta = 0
              }
              else {
                const sisa = diminta - adaPen[index].jumlah
                diminta = sisa
                adaPen[index].jumlah = sisa

                const nilaiSisa = adaPen[index].sub - nilaiDiminta
                nilaiDiminta = nilaiSisa
                adaPen[index].sub = 0
                index += 1
              }
              // console.log('if', adaPen[index], diminta)
            }
          }
          else {
            let index = 0
            while (diminta > 0 && index < masuk.length) {
              if (masuk[index].jumlah >= diminta) {
                const sisa = masuk[index].jumlah - diminta
                masuk[index].jumlah = sisa
                diminta = 0

                const nilaiSisa = masuk[index].sub - nilaiDiminta
                masuk[index].sub = nilaiSisa
                nilaiDiminta = 0
              }
              else {
                const sisa = diminta - masuk[index].jumlah
                diminta = sisa
                masuk[index].jumlah = sisa

                const nilaiSisa = masuk[index].sub - nilaiDiminta
                nilaiDiminta = nilaiSisa
                masuk[index].sub = 0

                index += 1
              }
              // console.log('else', masuk[index])
            }
          }
        })
        if (this.params.jenis !== 'detail' && it?.pemakaian?.length) {
          const raw = {
            tgl: it?.pemakaian[0]?.tgl,
            harga: 0,
            jumlah: it?.pemakaian?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0),
            sub: it?.pemakaian?.reduce((a, b) => parseFloat(a) + parseFloat(b.sub), 0)
          }
          it.data.push({
            tgl: raw?.tgl,
            keluar: raw,
            ket: 'Ruangan'
          })
        }

        it?.returpenjualan.forEach(res => {
          // const harga = it?.daftarharga?.find(a => a.kd_obat === res.kdobat && a.nopenerimaan === res.nopenerimaan)
          // const hargaSt = it?.saldoawal?.find(a => a.kdobat === res.kdobat && a.nopenerimaan === res.nopenerimaan)
          // if (harga) res.harga = harga.harga
          // else res.harga = hargaSt?.harga ?? 0
          // res.sub = res.jumlah * res.harga
          const temp = {
            tgl: res.tgl,
            masuk: res,
            ket: this.params.jenis === 'detail' ? 'retur dari ' + res?.header?.norm + ' ' + (res?.header?.datapasien?.rs2 ?? '') : 'Retur Penjualan'
          }
          if (this.params.jenis === 'detail') it.data.push(temp)
        })
        if (this.params.jenis !== 'detail' && it?.returpenjualan?.length) {
          const raw = {
            tgl: it?.returpenjualan[0]?.tgl,
            harga: 0,
            jumlah: it?.returpenjualan?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0),
            sub: it?.returpenjualan?.reduce((a, b) => parseFloat(a) + parseFloat(b.sub), 0)
          }
          it.data.push({
            tgl: raw?.tgl,
            masuk: raw,
            ket: 'Retur Penjualan'
          })
        }
        it?.penerimaanrinci.forEach(s => {
          const temp = {
            tgl: s.tgl,
            masuk: s,
            ket: this.params.jenis === 'detail' ? s?.pbf?.nama + ' ( ' + s?.jenissurat + ' : ' + s?.nomorsurat + ' ) ' : ' Penerimaan'
          }
          it.data.push(temp)
        })
        it.akhir = masuk.filter(f => f.jumlah !== 0)
        it.akhir.forEach(s => {
          s.tgl = this.params.tahun + '-' + this.params.bulan + '-31 23:59:50'
          const temp = {
            tgl: s.tgl,
            akhir: s,
            ket: 'Saldo Akhir'
          }
          it.data.push(temp)
        })
        const jumAk = it?.akhir?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0)
        const subAk = it?.akhir?.reduce((a, b) => parseFloat(a) + parseFloat(b.sub), 0)
        const jumAw = it?.saldoawal?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0)
        const subAw = it?.saldoawal?.reduce((a, b) => parseFloat(a) + parseFloat(b.sub), 0)
        const jumMs = it?.data?.filter(f => !!f.masuk)?.map(m => m.masuk)?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0)
        const subMs = it?.data?.filter(f => !!f.masuk)?.map(m => m.masuk)?.reduce((a, b) => parseFloat(a) + parseFloat(b.sub), 0)
        const jumKel = it?.data?.filter(f => !!f.keluar)?.map(m => m.keluar)?.reduce((a, b) => parseFloat(a) + parseFloat(b.jumlah), 0)
        const subKel = it?.data?.filter(f => !!f.keluar)?.map(m => m.keluar)?.reduce((a, b) => parseFloat(a) + parseFloat(b.sub), 0)
        const subt = {
          tgl: this.params.tahun + '-' + this.params.bulan + '-31 23:59:59',
          subtotal: {
            jumlah: jumAk,
            sub: subAk
          },
          subAw: {
            jumlah: jumAw,
            sub: subAw
          },
          subMs: {
            jumlah: jumMs,
            sub: subMs
          },
          subKel: {
            jumlah: jumKel,
            sub: subKel
          },
          ket: 'Subtotal Saldo Akhir'
        }
        if (this.params.jenis === 'detail') it?.data.push(subt)

        it?.data?.sort(function (a, b) {
          // Convert the date strings to Date objects
          const dateA = new Date(a.tgl)
          const dateB = new Date(b.tgl)

          // Subtract the dates to get a value that is either negative, positive, or zero
          return dateA - dateB
        })
        const index = array.findIndex(a => a.kd_obat === it.kd_obat)
        if (index >= 0) array[index] = it
        else array.push(it)
      })

      // array = val
      console.log('metani items', array)
    },
    getInitialData (val) {
      this.setParams('page', val)
      this.getDataTable()
      this.meta = {}
      this.items = []
    },
    setField () {
      if (this.params.jenis === 'rekap') {
        this.fields = {
          No: 'no',
          'Kode Obat': 'kd_obat',
          'Nama Obat': 'nama_obat',
          Satuan: 'satuan_k',
          'Kode Belanja': 'uraian50',
          Keterangan: 'ket',
          'Jumlah Saldo Awal': 'jumlSalAwal',
          'Nilai Saldo Awal': 'nilaiSalAwal',
          'Jumlah Masuk': 'jumlMasuk',
          'Nilai Masuk': 'nilaiMasuk',
          'Jumlah Keluar': 'jumlKeluar',
          'Nilai Keluar': 'nilaiKeluar',
          'Jumlah Saldo Akhir': 'jumlSalAkhir',
          'Nilai Saldo Akhir': 'nilaiSalAkhir'
        }
      }
      else {
        this.fields = {
          No: 'no',
          'Kode Obat': 'kd_obat',
          'Nama Obat': 'nama_obat',
          Satuan: 'satuan_k',
          Keterangan: 'ket',
          'Jumlah Saldo Awal': 'jumlSalAwal',
          'Harga Saldo Awal': 'harSalAwal',
          'Nilai Saldo Awal': 'nilaiSalAwal',
          'Tanggal Masuk': 'tglMasuk',
          'Jumlah Masuk': 'jumlMasuk',
          'Harga Masuk': 'harMasuk',
          'Nilai Masuk': 'nilaiMasuk',
          'Tanggal Keluar': 'tglKeluar',
          'Jumlah Keluar': 'jumlKeluar',
          'Harga Keluar': 'harKeluar',
          'Nilai Keluar': 'nilaiKeluar',
          'Jumlah Saldo Akhir': 'jumlSalAkhir',
          'Harga Saldo Akhir': 'harSalAkhir',
          'Nilai Saldo Akhir': 'nilaiSalAkhir'
        }
      }
    },
    cekNan (val) {
      return isNaN(parseFloat(val)) ? '' : val
    },
    async fetch () {
      this.setField()
      const param = { params: this.params }
      const data = []
      const resp = await api.get('v1/simrs/laporan/farmasi/pemakaian/get-mutasi', param)
      // .then(resp => {
      const items = []

      if (!resp?.data?.data?.length) return notifErrVue('Data tidak ditemukan')
      this.mapingItem(resp?.data?.data, items)
      items.forEach((item, i) => {
        console.log('item', item)
        if (item?.data?.length) {
          item?.data.forEach((dat, d) => {
            const ada = {}
            if (d === 0) {
              ada.no = i + 1
              ada.kd_obat = item?.kd_obat
              ada.nama_obat = item?.nama_obat
              ada.satuan_k = item?.satuan_k
              if (this.params.jenis === 'rekap') ada.uraian50 = item?.uraian50
            }
            if (this.params.jenis === 'rekap') {
              ada.ket = dat?.ket
              ada.jumlSalAwal = this.cekNan(formatDouble(parseFloat(dat?.saldoawal?.jumlah), 2))
              ada.nilaiSalAwal = this.cekNan(formatDouble(parseFloat(dat?.saldoawal?.sub), 2))
              ada.jumlMasuk = this.cekNan(formatDouble(parseFloat(dat?.masuk?.jumlah), 2))
              ada.nilaiMasuk = this.cekNan(formatDouble(parseFloat(dat?.masuk?.sub), 2))
              ada.jumlKeluar = this.cekNan(formatDouble(parseFloat(dat?.keluar?.jumlah), 2))
              ada.nilaiKeluar = this.cekNan(formatDouble(parseFloat(dat?.keluar?.sub), 2))
              ada.jumlSalAkhir = this.cekNan(formatDouble(parseFloat(dat?.akhir?.jumlah), 2))
              ada.nilaiSalAkhir = this.cekNan(formatDouble(parseFloat(dat?.akhir?.sub), 2))
            }
            else {
              ada.ket = dat?.ket
              ada.jumlSalAwal = this.cekNan(formatDouble(parseFloat(dat?.saldoawal?.jumlah ?? dat?.subAw?.jumlah), 2))
              ada.harSalAwal = this.cekNan(formatDouble(parseFloat(dat?.saldoawal?.harga), 2))
              ada.nilaiSalAwal = this.cekNan(formatDouble(parseFloat(dat?.saldoawal?.sub ?? dat?.subAw?.sub), 2))
              ada.tglMasuk = dat?.masuk?.tgl
              ada.jumlMasuk = this.cekNan(formatDouble(parseFloat(dat?.masuk?.jumlah ?? dat?.subMs?.jumlah), 2))
              ada.harMasuk = this.cekNan(formatDouble(parseFloat(dat?.masuk?.harga), 2))
              ada.nilaiMasuk = this.cekNan(formatDouble(parseFloat(dat?.masuk?.sub ?? dat?.subMS?.sub), 2))
              ada.tglKeluar = dat?.keluar?.tgl
              ada.jumlKeluar = this.cekNan(formatDouble(parseFloat(dat?.keluar?.jumlah ?? dat?.subKel?.jumlah), 2))
              ada.harKeluar = this.cekNan(formatDouble(parseFloat(dat?.keluar?.harga), 2))
              ada.nilaiKeluar = this.cekNan(formatDouble(parseFloat(dat?.keluar?.sub ?? dat?.subKel?.sub), 2))
              ada.jumlSalAkhir = this.cekNan(formatDouble(parseFloat(dat?.akhir?.jumlah ?? dat?.subtotal?.jumlah), 2))
              ada.harSalAkhir = this.cekNan(formatDouble(parseFloat(dat?.akhir?.harga), 2))
              ada.nilaiSalAkhir = this.cekNan(formatDouble(parseFloat(dat?.akhir?.sub ?? dat?.subtotal?.sub), 2))
            }
            data.push(ada)
          })
        }
        else {
          const temp = {}

          temp.no = i + 1
          temp.kd_obat = item?.kd_obat
          temp.nama_obat = item?.nama_obat
          data.push(temp)
        }
      })

      console.log('items', data)
      return data
      // })
    },
    startDownload () { this.loadingDownload = true },
    finishDownload () { this.loadingDownload = false },
    async getDataTable () {
      if (this.params.page === 1) this.loading = true
      else this.loadingNext = true
      const param = { params: this.params }
      await api.get('v1/simrs/laporan/farmasi/pemakaian/get-mutasi', param)
        .then(resp => {
          this.loading = false
          this.loadingNext = false
          // console.log('data tabel', resp.data)
          this.meta = resp.data?.meta
          // this.items = resp?.data?.data
          this.mapingItem(resp?.data?.data, this.items)
        })
        .catch(() => {
          this.loading = false
          this.loadingNext = false
        })
    }
  }
})
