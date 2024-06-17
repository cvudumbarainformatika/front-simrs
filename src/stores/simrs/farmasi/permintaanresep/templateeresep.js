import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
// import { useKasirRajalListKunjunganStore } from '../../kasir/rajal/kunjungan'
import { notifErrVue, notifSuccess } from 'src/modules/utils'
import { Dialog, LocalStorage } from 'quasar'
import { dateFullFormat } from 'src/modules/formatter'

export const useTemplateEResepStore = defineStore('template_e_resep', {
  state: () => ({
    loading: false,
    loadingSigna: false,
    loadingSaveSigna: false,
    loadingObat: false,
    loadingkirim: false,
    loadingHapus: false,
    obatId: null,
    namaRacikan: false,
    form: {
      signa: '',
      keterangan: '',
      jumlah_diminta: 1,
      tiperesep: 'normal'
    },
    listPemintaanSementara: [],
    signas: [],
    fromSigna: { signa: '', jumlah: 1 },
    depos: [
      { nama: 'Floor Stock 1 (AKHP)', value: 'Gd-03010101', jenis: 't' },
      { nama: 'Depo Rawat inap', value: 'Gd-04010102', jenis: 'rnp' },
      { nama: 'Depo OK', value: 'Gd-04010103', jenis: 'ok' },
      { nama: 'Depo Rawat Jalan', value: 'Gd-05010101', jenis: 'rjl' },
      { nama: 'Depo IGD', value: 'Gd-02010104', jenis: 'igd' }
    ],
    nonFilteredObat: [],
    dpPar: '',
    Obats: [],
    filtObats: [],
    namaObat: null,
    signa: null,
    pasien: null,
    indexRacikan: -1,
    depo: '',
    tipeReseps: [
      { label: 'Normal', value: 'normal' },
      { label: 'PRB', value: 'prb' },
      { label: 'Iter', value: 'iter' }
    ],
    // section racikan ---
    formRacik: null,
    racikan: {
      jenisresep: 'Racikan',
      namaracikan: '-',
      keteranganx: '-',
      jumlah: 1,
      tiperacikan: 'DTD',
      dosisobat: 1,
      dosismaksimum: 1 // dosis resep
    },
    tipeRacikan: [
      { label: 'NON DTD', value: 'non-DTD', disable: false },
      { label: 'DTD', value: 'DTD', disable: false }
    ],
    tipeRacikanT: [
      { label: 'DTD', value: 'DTD', disable: true },
      { label: 'non-DTD', value: 'non-DTD', disable: true }
    ],
    satuanRaciks: ['Bungkus', 'Kapsul', 'Pot'],
    counterRacikan: 1,
    // section racikan end---

    // section save to local storage
    items: []
  }),
  actions: {

    async getSigna (val) {
      this.loadingSigna = true
      const params = {
        params: {
          q: val ?? ''
        }
      }
      await api.get('v1/simrs/master/signa/get-signa-autocomplete', params)
        .then(resp => {
          this.loadingSigna = false
          // console.log('signa', resp?.data)
          this.signas = resp?.data
        })
        .catch(() => { this.loadingSigna = false })
    },
    seveSigna () {
      this.loadingSaveSigna = true
      return new Promise(resolve => {
        api.post('v1/simrs/master/signa/store-signa', this.fromSigna)
          .then(resp => {
            this.loadingSaveSigna = false
            console.log('resp save signa', resp)
            notifSuccess(resp)
            this.fromSigna = { signa: '', jumlah: 1 }
            this.signas.push(resp?.data?.data)
            resolve(resp.data)
          })
          .catch(() => {
            this.loadingSaveSigna = false
          })
      })
    },
    setForm (key, val) {
      this.form[key] = val
    },
    initItems () {
      this.items = []
      this.items = JSON.parse(LocalStorage.getItem('template-eresep')) ?? []
    },
    saveListItems () {
      this.items.push(this.form)
      return new Promise((resolve, reject) => {
        LocalStorage.set('template-eresep', JSON.stringify(this.items)) // simpan ke local storage (this.items)
        console.log('localstorage', JSON.parse(LocalStorage.getItem('template-eresep')))
        resolve(this.items)
      })
    },
    setRacikan (key, val) {
      this.racikan[key] = val
    },
    setPasien () {
      // this.cariSimulasi(val?.noreg)
      // if (this?.depo === 'rjl') this.getBillRajal(val)
      // if (this?.depo === 'rnp') this.getBillRanap(val)
      // if (this?.depo === 'igd') this.getBillIgd(val)
    },
    resetForm () {
      this.namaObat = null
      const tagihanrs = this.form?.tagihanrs ?? 0
      const iterExpired = this.form?.iter_expired ?? ''
      const iterJml = this.form?.iter_jml ?? ''
      const kodeincbg = this.form?.kodeincbg ?? '-'
      const uraianinacbg = this.form?.uraianinacbg ?? '-'
      const tarifina = this.form?.tarifina ?? 0
      const tiperesep = this.form?.tiperesep ?? 'normal'
      const jenisresep = this.form?.jenisresep ?? '-'
      const kdruangan = this.form?.kdruangan ?? '-'

      const aturan = this.form?.aturan ?? '-'
      const konsumsi = this.form?.konsumsi ?? '-'
      const namaracikan = this.form?.namaracikan ?? '-'
      const jumlahdibutuhkan = this.form?.jumlahdibutuhkan ?? '-'
      const tiperacikan = this.form?.tiperacikan ?? 'DTD'
      const keterangan = this.form?.keterangan ?? '-'
      const satuanRacik = this.form?.satuan_racik ?? '-'
      // console.log('jenis resep', jenisresep)
      this.form = {
        keterangan: '-',
        jumlah_diminta: 1,
        tiperesep,
        tagihanrs,
        kodeincbg,
        uraianinacbg,
        tarifina,
        jenisresep,
        kdruangan
      }
      this.setForm('iter_expired', iterExpired)
      this.setForm('iter_jml', iterJml)
      if (jenisresep === 'Racikan') {
        this.setForm('aturan', aturan)
        this.setForm('konsumsi', konsumsi)
        this.setForm('namaracikan', namaracikan)
        this.setForm('jumlahdibutuhkan', jumlahdibutuhkan)
        this.setForm('tiperacikan', tiperacikan)
        this.setForm('keterangan', keterangan)
        this.setForm('satuan_racik', satuanRacik)
        this.setForm('keteranganx', '-')
        if (tiperacikan === 'DTD') {
          this.setForm('jumlah', 1)
          this.setForm('dosisobat', 1)
          this.setForm('dosismaksimum', 1)
        }
        else {
          this.setForm('jumlah', 1)
        }
      }
      // this.setPasien()
    },
    resetObat () {
      const tiperesep = this.form?.tiperesep ?? 'normal'
      this.form = {
        keterangan: '-',
        jumlah_diminta: 1,
        tiperesep
      }

      this.setPasien()
    },
    resetRacikan () {
      const jen = this.racikan?.tiperacikan ?? '-'
      const nam = this.racikan?.namaracikan ?? '-'
      this.racikan = {
        jenisresep: 'Racikan',
        namaracikan: nam,
        keteranganx: '-',
        jumlah: 1,
        tiperacikan: jen,
        dosisobat: 1,
        dosismaksimum: 1 // dosis resep
      }
    },
    hapusList (obat) {
      const resep = this?.pasien?.newapotekrajal?.find(val => val.noresep === obat?.noresep)
      if (obat?.namaracikan) {
        // const racikan = this?.listRacikan?.filter(a => a.namaracikan === obat?.namaracikan)
        const racikan = this?.listRacikan?.find(a => a.namaracikan === obat?.namaracikan)
        // console.log('rac', racikan)
        // if (racikan?.length) {
        if (racikan) {
          // if (racikan[0]?.rincian?.length > 1) {
          //   const index = racikan[0]?.rincian?.findIndex(x => x.id === obat?.id)
          //   if (index >= 0)racikan[0]?.rincian?.splice(index, 1)
          if (racikan?.rincian?.length > 1) {
            const index = racikan?.rincian?.findIndex(x => x.id === obat?.id)
            if (index >= 0)racikan?.rincian?.splice(index, 1)
          }
          else {
            const index = this?.listRacikan?.findIndex(x => x.namaracikan === obat?.namaracikan)
            if (index >= 0) this?.listRacikan?.splice(index, 1)
          }
        }

        const indexLis = this?.listRincianRacikan?.findIndex(x => x.id === obat?.id)
        if (indexLis >= 0) this?.listRincianRacikan?.splice(indexLis, 1)
        console.log('indexLis', indexLis)

        const index = resep?.permintaanracikan?.findIndex(x => x.id === obat?.id)
        if (index >= 0) resep?.permintaanracikan?.splice(index, 1)
        // console.log('new', index)
      }
      else {
        const index = this?.listPemintaanSementara?.findIndex(x => x.id === obat?.id)
        if (index >= 0) this?.listPemintaanSementara?.splice(index, 1)
        const indexp = resep?.permintaanresep?.findIndex(x => x.id === obat?.id)
        if (indexp >= 0) resep?.permintaanresep?.splice(indexp, 1)
        // console.log('new', indexp)
      }
      if (resep?.permintaanracikan.length <= 0 && resep?.permintaanresep.length <= 0) {
        this.noresep = 'BARU'
        const indexres = this?.noreseps?.findIndex(a => a === obat?.noresep)
        if (indexres >= 0) this?.noreseps?.splice(indexres, 1)
      }
      console.log('pasien hapus obat', resep)
    },
    setList (key) {
      key.harga = (parseFloat(key?.jumlah) * parseFloat(key?.hargajual)) + parseFloat(key?.r)
      this.listPemintaanSementara.push(key)
    },
    setListArray (array) {
      array.forEach(arr => {
        this.setList(arr)
      })
    },
    setListRacikan (key) {
      // console.log('set list racikan', key)
      key.harga = (parseFloat(key?.jumlah) * parseFloat(key?.harga_jual)) + parseFloat(key?.r)
      // const adaRin = this.listRincianRacikan?.find(ri => ri.id === key.id && ri.namaracikan === this.form.namaracikan)
      // if (adaRin) this.listRincianRacikan?.push(key)
      // console.log('adaRin', adaRin)

      // const pasResRac = this.pasien.newapotekrajal.find(a => a.noresep === key.noresep)
      // const adaRacRin = this.pasResRac?.permintaanracikan?.find(ri => ri.id === key.id)
      // if (!adaRacRin) pasResRac.permintaanracikan?.push(key)

      const namaracikan = key?.namaracikan
      const adaList = this.listRacikan.find(list => list.namaracikan === namaracikan)
      if (adaList) {
        const adaLiRin = adaList.rincian.find(ri => ri.id === key.id)
        if (!adaLiRin) adaList.rincian.push(key)

        const harga = adaList.rincian.map(a => a?.harga).reduce((a, b) => a + b, 0) ?? 0
        adaList.harga = harga
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
          jumlahracikan: key?.jumlahdibutuhkan,
          rincian: [key]
        }
        const adaLi = this.listRacikan.find(ri => ri.id === key.id)
        if (!adaLi) this.listRacikan.push(temp)
      }

      // console.log('list racikan', this.listRacikan)
      // console.log('list rincian racikan', this.listRincianRacikan)
      const rac = this.listRacikan.find(x => x.namaracikan === this.form.namaracikan)
      this.listRincianRacikan = rac?.rincian ?? []
      // this.tipeRacikan = [
      //   { label: 'DTD', value: 'DTD', disable: true },
      //   { label: 'non-DTD', value: 'non-DTD', disable: true }
      // ]
    },
    setListRacikanArray (array) {
      array.forEach(arr => {
        this.setListRacikan(arr)
      })
    },
    setNoreseps (reseps) {
      this.noreseps = []
      reseps?.forEach(resep => {
        this.noreseps.unshift(resep?.noresep)
      })
      this.noreseps.unshift('BARU')
    },
    setResep (val) {
      this.setForm('noresep', '')
      this.listRacikan = []
      this.listPemintaanSementara = []

      if (val === '' || val === 'BARU') {
        this.indexRacikan = -1
        return
      }
      const reseps = this.pasien?.newapotekrajal

      const resep = reseps.find(x => x.noresep === val)
      // console.log('resep', resep)
      this.setForm('iter_expired', resep?.iter_expired ?? '')
      this.setForm('iter_jml', resep?.iter_jml ?? '')
      this.indexRacikan = reseps.findIndex(x => x.noresep === val)
      if (resep?.flag === '') {
        this.setForm('tiperesep', resep?.tiperesep ?? 'normal')
        this.setForm('noresep', val)
        if (resep?.permintaanresep?.length) this.setListArray(resep?.permintaanresep)
        if (resep?.permintaanracikan?.length) this.setListRacikanArray(resep?.permintaanracikan)
      }
      else {
        if (resep?.flag !== '') this.setListResep(resep)
      }
      // console.log('set resep', val, resep, this.form)
    },
    setListResep (resep) {
      resep.listRacikan = []
      if (resep?.permintaanracikan?.length) {
        const rac = resep?.permintaanracikan
        rac.forEach(arr => {
          arr.harga = (parseFloat(arr?.jumlah) * parseFloat(arr?.harga_jual)) + parseFloat(arr?.r)
          const namaracikan = arr?.namaracikan
          const adaList = resep?.listRacikan?.filter(list => list.namaracikan === namaracikan)
          if (adaList?.length) {
            adaList[0].rincian.push(arr)
            const harga = adaList[0].rincian.map(a => a?.harga).reduce((a, b) => a + b, 0) ?? 0
            adaList[0].harga = harga
          }
          else {
            const temp = {
              namaracikan: arr?.namaracikan,
              harga: arr?.harga,
              aturan: arr?.aturan,
              keterangan: arr?.keterangan,
              tiperacikan: arr?.tiperacikan,
              konsumsi: arr?.konsumsi,
              jumlahracikan: arr?.jumlahdibutuhkan,
              rincian: [arr]
            }
            resep.listRacikan.push(temp)
          }
        })
      }
      if (resep?.permintaanresep?.length) {
        resep?.permintaanresep.forEach(arr => {
          arr.harga = (parseFloat(arr?.jumlah) * parseFloat(arr?.hargajual)) + parseFloat(arr?.r)
        })
      }
    },
    cariObat (val) {
      const depo = this.depos.filter(pa => pa.jenis === this.depo)
      // console.log('depo', this?.depo, depo)
      if (depo.length) {
        this.dpPar = depo[0]?.value
      }
      else return notifErrVue('depo tujuan tidak ditemukan')
      const param = {
        groups: this?.pasien?.groups,
        kdruang: this.dpPar,
        q: val,
        tiperesep: this.form.tiperesep
      }

      this.loadingObat = true
      const params = { params: param }
      return new Promise(resolve => {
        api.get('v1/simrs/farmasinew/depo/lihatstokobateresepBydokter', params)
          .then(resp => {
            this.loadingObat = false
            this.nonFilteredObat = resp.data?.dataobat
            this.Obats = val?.length ? this.nonFilteredObat.filter(nfil => nfil?.namaobat.toLowerCase().includes(val?.toLowerCase())) : this.nonFilteredObat
            // console.log('hasil', this.nonFilteredObat, this.Obats)

            resolve(resp)
          })
          .catch(() => {
            this.loadingObat = false
            this.Obats = []
          })
      })
      // }
    },

    cariSimulasi (val) {
      this.setForm('kodeincbg', '-')
      this.setForm('uraianinacbg', '-')
      this.setForm('tarifina', 0)
    },
    async getNomor () {
      const param = {
        params: {
          noresep: this.form?.noresep
        }
      }
      await api.get('v1/simrs/farmasinew/depo/conterracikan', param)
        .then(resp => {
          // console.log(resp?.data)
          this.setForm('namaracikan', resp?.data)
        })
    },
    simpanObat (payload) {
      // const form = payload
      console.log('payload', this.form)
      const resep = this?.pasien?.newapotekrajal?.find(val => val.noresep === this.form?.noresep)
      if (resep) {
        if (resep?.flag !== '') this.form.noresep = ''
      }
      console.log('obat', this?.pasien?.newapotekrajal)
      console.log('resep', resep)
      this.loading = true
      return new Promise(resolve => {
        api.post('v1/simrs/farmasinew/depo/pembuatanresep', this.form)
          .then(resp => {
            this.loading = false
            console.log('simpan ', resp?.data)
            if (resp.status === 202) {
              this.openDialog(resp?.data)
            }
            else {
              notifSuccess(resp)

              if (!this.form.noresep || this.form.noresep === '' || this.noresep !== resp?.data?.nota) {
                this.noreseps.push(resp?.data?.nota)
                this.noresep = resp?.data?.nota
              }
              this.pasien.newapotekrajal = resp?.data?.newapotekrajal
              this.indexRacikan = this.pasien.newapotekrajal.findIndex(x => x.noresep === resp?.data?.nota)

              this.resetForm()
              this.setForm('noresep', resp?.data?.nota)

              this.setForm('lanjuTr', '')
              resolve(resp)
            }
            this.cariObat()
          })
          .catch(() => {
            this.loading = false
          })
      })
    },
    async selesaiResep () {
      console.log('selesai', this.form)
      this.loadingkirim = true
      if (!this.form.noresep || this.form.noresep === '') {
        if (this.noresep) this.setForm('noresep', this.noresep)
        else return notifErrVue('nomor resep tidak terekam, silahkan pilih nomor resep yang akan dikirim')
      }
      await api.post('v1/simrs/farmasinew/depo/kirimresep', this.form)
        .then(resp => {
          console.log('selesai', resp?.data)
          // this.setForm('namaracikan', resp?.data)
          this.loadingkirim = false
          notifSuccess(resp)

          this.setListResep(resp?.data?.data)
          const res = resp?.data?.data
          const reseps = this.pasien?.newapotekrajal
          const index = reseps.findIndex(x => x.noresep === res?.noresep)
          if (index >= 0) {
            this.pasien.newapotekrajal[index] = res
            this.indexRacikan = index
          }
          this.listPemintaanSementara = []
          this.listRacikan = []
        })
        .catch((err) => {
          if (err?.response?.data?.message?.includes('simrs/events?auth_key=simrs_key_harry141312&auth_') || err?.response?.data?.message?.includes('https://apijkn.bpjs-kesehatan.go.id')) {
            const reseps = this.pasien?.newapotekrajal
            const index = reseps.findIndex(x => x.noresep === this.form.noresep)
            if (index >= 0) {
              this.pasien.newapotekrajal[index] = []
              this.indexRacikan = index
            }
            this.listPemintaanSementara = []
            this.listRacikan = []
          }
          this.form.noresep = ''
          this.loadingkirim = false
        })
    },
    async hapusObat (val) {
      // console.log('hapusObat', val)
      this.loadingHapus = true
      this.obatId = val?.id
      this.namaRacikan = val?.namaracikan ?? false
      await api.post('v1/simrs/farmasinew/depo/hapus-permintaan-obat', val)
        .then(resp => {
          console.log('resp hapus', resp?.data)
          // hapus list
          this.hapusList(resp?.data?.obat)
          this.pasien.newapotekrajal = resp?.data?.newapotekrajal
          this.indexRacikan = this.pasien.newapotekrajal.findIndex(x => x.noresep === resp?.data?.obat?.noresep)

          this.loadingHapus = false
          this.obatId = null
          this.cariObat()
          notifSuccess(resp)
        })
        .catch(() => {
          this.loadingHapus = false
          this.obatId = null
        })
    },
    async getHistory (norm) {
      console.log(norm)
      this.loadingHistory = true
      const params = { params: { norm } }
      try {
        const resp = await api.get('v1/simrs/pelayanan/listresepbynorm', params)
        console.log('history', resp)
        if (resp.status === 200) {
          if (resp.data?.length) {
            const arr = resp.data
            this.historyMeta = null
            this.historys = arr
          }
          else {
            this.historys = []
          }
        }
        this.loadingHistory = false
      }
      catch (error) {
        this.loadingHistory = false
        // notifErr(error)
      }
    },
    openDialog (val) {
      Dialog.create({
        title: 'Konfirmasi',
        message: `Obat yang diberikan tgl ${dateFullFormat(val?.cek?.hasil[0]?.tgl)} yang direncakan untuk konsumsi selama ${val?.cek?.total} hari, baru dikonsumsi ${val?.cek?.selisih} hari. Apakah Akan tetal dilanjutkan?`,
        ok: {
          push: true,
          label: 'Lanjutkan',
          'no-caps': true,
          color: 'primary'
        },
        cancel: {
          push: true,
          label: 'Batal',
          'no-caps': true,
          color: 'dark'
        }
      })
        .onOk(() => {
          this.setForm('lanjuTr', '1')
          this.simpanObat()
        })
    }
  }
})
