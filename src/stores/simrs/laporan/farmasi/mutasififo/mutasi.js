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
      No: 'no',
      'Kode Obat': 'kd_obat',
      'Nama Obat': 'nama_obat',
      'Jumlah Saldo Awal': 'jmlSalA'
    }
  }),
  actions: {
    setParams (key, val) {
      this.params[key] = val
    },
    setSearch (payload) {
      console.log(this.params.q)
      // this.setParams('q', payload)
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
            const index = this.params.jenis === 'rekap' ? it.resepkeluar.findIndex(a => a.kdobat === rac.kdobat && a.nopenerimaan === rac.nopenerimaan) : it.resepkeluar.findIndex(a => a.kdobat === rac.kdobat && a.nopenerimaan === rac.nopenerimaan && a.noresep === rac.noresep)
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
          const harga = it?.daftarharga?.find(a => a.kd_obat === res.kdobat && a.nopenerimaan === res.nopenerimaan)
          const hargaSt = it?.saldoawal?.find(a => a.kdobat === res.kdobat && a.nopenerimaan === res.nopenerimaan)
          if (harga) res.harga = harga.harga
          else res.harga = hargaSt?.harga ?? 0
          res.sub = res.jumlah * res.harga
          const temp = {
            tgl: res?.tgl ?? this.params.tahun + '-' + this.params.bulan + '-31 23:00:00',
            keluar: res,
            ket: this.params.jenis === 'detail' ? res?.header?.norm + ' ' + (res?.header?.datapasien?.rs2 ?? '') : 'resep'
          }
          it.data.push(temp)
          const adaPen = masuk.filter(a => a.kdobat === res.kdobat && (a.nopenerimaan === res.nopenerimaan || a.harga === res.harga))
          let diminta = res.jumlah
          if (adaPen.length) {
            let index = 0
            while (diminta > 0 && index < adaPen.length) {
              if (adaPen[index].jumlah >= diminta) {
                const sisa = adaPen[index].jumlah - diminta
                adaPen[index].jumlah = sisa
                adaPen[index].sub = adaPen[index].jumlah * adaPen[index].harga
                diminta = 0
              }
              else {
                const sisa = diminta - adaPen[index].jumlah
                diminta = sisa
                adaPen[index].jumlah = 0
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
                // masuk[index].jumlah -= diminta
                masuk[index].sub = masuk[index].jumlah * masuk[index].harga
                diminta = 0
              }
              else {
                const sisa = diminta - masuk[index].jumlah
                diminta = sisa
                masuk[index].jumlah = 0
                index += 1
              }
              // console.log('else', masuk[index])
            }
          }
        })
        const pak = it.pemakaian
        pak.forEach(res => {
          const temp = {
            tgl: res?.tgl ?? this.params.tahun + '-' + this.params.bulan + '-31 23:00:00',
            keluar: res,
            ket: this.params.jenis === 'detail' ? (res?.ruangan?.uraian ?? '') : 'ruangan'
          }
          const harga = it?.daftarharga?.find(a => a.kd_obat === res.kdobat && a.nopenerimaan === res.nopenerimaan)
          const hargaSt = it?.saldoawal?.find(a => a.kdobat === res.kdobat && a.nopenerimaan === res.nopenerimaan)
          if (harga) res.harga = harga.harga
          else res.harga = hargaSt?.harga ?? 0
          res.sub = res.jumlah * res.harga
          it.data.push(temp)
          const adaPen = masuk.filter(a => a.kdobat === res.kdobat && (a.nopenerimaan === res.nopenerimaan || a.harga === res.harga))
          let diminta = res.jumlah
          if (adaPen.length) {
            let index = 0
            while (diminta > 0 && index < adaPen.length) {
              if (adaPen[index].jumlah >= diminta) {
                const sisa = adaPen[index].jumlah - diminta
                adaPen[index].jumlah = sisa
                adaPen[index].sub = adaPen[index].jumlah * adaPen[index].harga
                diminta = 0
              }
              else {
                const sisa = diminta - adaPen[index].jumlah
                diminta = sisa
                adaPen[index].jumlah = sisa
                adaPen[index].sub = adaPen[index].jumlah * adaPen[index].harga
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
                // masuk[index].jumlah -= diminta
                masuk[index].sub = masuk[index].jumlah * masuk[index].harga
                diminta = 0
              }
              else {
                const sisa = diminta - masuk[index].jumlah
                diminta = sisa
                masuk[index].jumlah = sisa
                masuk[index].sub = masuk[index].jumlah * masuk[index].harga

                index += 1
              }
              // console.log('else', masuk[index])
            }
          }
        })
        it?.returpenjualan.forEach(res => {
          const harga = it?.daftarharga?.find(a => a.kd_obat === res.kdobat && a.nopenerimaan === res.nopenerimaan)
          const hargaSt = it?.saldoawal?.find(a => a.kdobat === res.kdobat && a.nopenerimaan === res.nopenerimaan)
          if (harga) res.harga = harga.harga
          else res.harga = hargaSt?.harga ?? 0
          res.sub = res.jumlah * res.harga
          const temp = {
            tgl: res.tgl,
            masuk: res,
            ket: this.params.jenis === 'detail' ? 'retur dari ' + res?.header?.norm + ' ' + (res?.header?.datapasien?.rs2 ?? '') : 'retur penjualan'
          }
          it.data.push(temp)
        })
        it?.penerimaanrinci.forEach(s => {
          const temp = {
            tgl: s.tgl,
            masuk: s,
            ket: s?.pbf?.nama + ' ( ' + s?.jenissurat + ' : ' + s?.nomorsurat + ' ) '
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
        const subt = {
          tgl: this.params.tahun + '-' + this.params.bulan + '-31 23:59:59',
          subtotal: {
            jumlah: jumAk,
            sub: subAk
          },
          ket: 'Subtotal Saldo Akhir'
        }
        it?.data.push(subt)

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

    async fetch () {
      const param = { params: this.params }
      const data = []
      const resp = await api.get('v1/simrs/laporan/farmasi/pemakaian/get-mutasi', param)
      // .then(resp => {
      const items = []

      if (!resp?.data?.data?.length) return notifErrVue('Data tidak ditemukan')
      this.mapingItem(resp?.data?.data, items)
      items.forEach((item, i) => {
        console.log('item', item)

        const temp = {}

        temp.no = i + 1
        temp.kd_obat = item?.kd_obat
        temp.nama_obat = item?.nama_obat

        data.push(temp)
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
