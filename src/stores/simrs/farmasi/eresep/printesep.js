import { defineStore } from 'pinia'

export const usePrintEresepStore = defineStore('print_e_resep', {
  state: () => ({
    resep: null
  }),
  persist: true,
  actions: {
    customRound (num) {
      // Pisahkan bagian integer dan bagian desimal
      const integerPart = Math.floor(num)
      const decimalPart = num - integerPart

      if (decimalPart <= 0.5 && decimalPart > 0) {
        // Jika bagian desimal kurang dari atau sama dengan 0.5
        return integerPart + 0.5
      }
      else {
        // Jika bagian desimal lebih dari 0.5
        return Math.ceil(num)
      }
    },
    setResep (val) {
      const res = val

      res.listRacikan = []
      let nilaiR = 0
      if (res?.permintaanracikan?.length) {
        res?.permintaanracikan.forEach(key => {
          nilaiR = parseFloat(key?.r)
          key.jumlahobatAwal = parseFloat(key?.jumlahobat)
          key.jumlahresepAwal = parseFloat(key?.jumlahresep)
          key.jumlahdibutuhkanAwal = key?.jumlahdibutuhkan

          const racikankeluar = res?.rincianracik?.find(rac => rac?.namaracikan === key?.namaracikan && rac?.kdobat === key?.kdobat)
          console.log('racik', key, racikankeluar)
          if (racikankeluar) {
            key.jumlah = parseFloat(racikankeluar.jumlah)
            key.harga_jual = parseFloat(racikankeluar?.harga_jual)
            key.jumlahdibutuhkan = parseFloat(racikankeluar?.jumlahdibutuhkan)
          }
          key.jumlahresep = key.jumlah
          if (parseInt(key?.mobat?.kelompok_psikotropika) === 1) {
            key.jumlahobat = this.customRound(key.jumlah)
          }
          else key.jumlahobat = Math.ceil(key.jumlah)
          const namaracikan = key?.namaracikan
          key.harga = (parseFloat(key?.jumlahobat) * parseFloat(key?.harga_jual))// + parseFloat(key?.r)

          key.groupsistembayar = val?.sistembayar?.groups
          const adaList = res.listRacikan.filter(list => list.namaracikan === namaracikan)
          if (adaList.length) {
            adaList[0].rincian.push(key)
            const harga = adaList[0].rincian.map(a => a?.harga).reduce((a, b) => a + b, 0) ?? 0
            adaList[0].harga = harga
          }
          else {
            const temp = {
              namaracikan: key?.namaracikan,
              harga: key?.harga,
              aturan: key?.aturan,
              keterangan: key?.keterangan,
              tiperacikan: key?.tiperacikan,
              konsumsi: key?.konsumsi,
              satuan_racik: key?.satuan_racik,
              jumlahdibutuhkan: key?.jumlahdibutuhkan,
              jumlahdibutuhkanAwal: key?.jumlahdibutuhkanAwal,
              etiket: false,
              rincian: [key]
            }
            res.listRacikan.push(temp)
          }
        })
      }
      if (res.listRacikan.length) {
        res.listRacikan.forEach(a => {
          a.harga += nilaiR
        })
      }
      if (res?.permintaanresep?.length) {
        res?.permintaanresep.forEach(key => {
          key.jumlahAwal = parseFloat(key?.jumlah)
          const keluar = res?.rincian?.find(ri => ri.kdobat === key.kdobat)
          // console.log('permintaan', keluar)
          if (keluar) {
            key.jumlah = parseFloat(keluar?.jumlah)
            key.hargajual = parseFloat(keluar?.harga_jual)
          }
          // if (key.jumlahAwal !== key.jumlah) console.log('jumlah', key.jumlahAwal, key.jumlah)
          key.groupsistembayar = val?.sistembayar?.groups
          key.harga = (parseFloat(key?.jumlah) * parseFloat(key?.hargajual)) + parseFloat(key?.r)

          key.etiket = false
        })
      }
      let obat = 0
      if (parseInt(res.flag) <= 2) obat = res?.permintaanresep?.map(m => m.harga).reduce((a, b) => a + b, 0) ?? 0
      else obat = res?.permintaanresep?.filter(f => f.done).map(m => m.harga).reduce((a, b) => a + b, 0) ?? 0
      const rac = res?.listRacikan?.map(m => m.harga).reduce((a, b) => a + b, 0) ?? 0
      res.subtotal = obat + rac
      this.resep = res
      // console.log('print', res)
    }
  }
})
