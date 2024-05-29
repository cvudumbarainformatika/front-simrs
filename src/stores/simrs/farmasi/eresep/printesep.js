import { defineStore } from 'pinia'

export const usePrintEresepStore = defineStore('print_e_resep', {
  state: () => ({
    resep: null
  }),
  persist: true,
  actions: {
    setResep (val) {
      const res = val
      console.log(res)
      res.listRacikan = []
      if (res?.permintaanracikan?.length) {
        res?.permintaanracikan.forEach(key => {
          key.jumlahresep = key.jumlah
          key.jumlahobat = Math.ceil(key.jumlah)
          key.harga = (parseFloat(key?.jumlahobat) * parseFloat(key?.harga_jual)) + parseFloat(key?.r)
          const namaracikan = key?.namaracikan
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
              jumlahdibutuhkan: key?.jumlahdibutuhkan,
              satuan_racik: key?.satuan_racik,
              rincian: [key]
            }
            res.listRacikan.push(temp)
          }
        })
      }
      this.resep = res
    }
  }
})
