import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { useKasirRajalListKunjunganStore } from '../../kasir/rajal/kunjungan'
import { notifErrVue, notifSuccess } from 'src/modules/utils'
import { Dialog, date } from 'quasar'
import { dateFullFormat } from 'src/modules/formatter'

export const useDuplicateEResepStore = defineStore('duplicate_e_resep', {
  state: () => ({
    loading: false,
    loadingSigna: false,
    loadingSaveSigna: false,
    loadingObat: false,
    loadingkirim: false,
    loadingHapus: false,
    obatId: null,
    namaRacikan: false,
    form: [{
      signa: '',
      keterangan: '',
      jumlah_diminta: 1,
      tiperesep: 'normal'
    }],
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
    pasien: null,
    indexRacikan: -1,
    depo: '',
    tipeReseps: [
      { label: 'Normal', value: 'normal' },
      { label: 'PRB', value: 'prb' },
      { label: 'Iter', value: 'iter' }
    ],
    noresep: '',
    noreseps: [],
    // section racikan ---
    racikanOpen: false,
    racikanTambah: false,
    racikan: {
      jenisresep: 'Racikan',
      namaracikan: '-',
      keteranganx: '-',
      jumlah: 1,
      tiperacikan: 'non-DTD',
      dosisobat: 1,
      dosismaksimum: 1 // dosis resep
    },
    tipeRacikan: [
      { label: 'DTD', value: 'DTD', disable: false },
      { label: 'non-DTD', value: 'non-DTD', disable: false }
    ],
    tipeRacikanT: [
      { label: 'DTD', value: 'DTD', disable: true },
      { label: 'non-DTD', value: 'non-DTD', disable: true }
    ],
    satuanRaciks: ['Bungkus', 'Kapsul', 'Pot'],
    counterRacikan: 1,
    listRacikan: [],
    listRincianRacikan: [],
    resepPasien: [],
    historys: [],
    statusCopied: [],
    statusCopiedRacik: [],
    messageCopied: [],
    kodeObat: []
    // section racikan end---
  }),
  actions: {
    setForm (key, val) {
      this.form[key] = val
    },
    setRacikan (key, val) {
      this.racikan[key] = val
    },
    setPasien () {
      const val = this?.pasien
      const temp = val?.diagnosa?.map(x => x?.rs3 + ' - ' + x?.masterdiagnosa?.rs4)
      const diag = temp?.length ? temp.join(', ') : '-'
      this.setForm('noreg', val.noreg)
      this.setForm('norm', val.norm)
      this.setForm('groupsistembayar', val.groups)
      this.setForm('sistembayar', val.kodesistembayar ?? val?.kdsistembayar)
      this.setForm('dokter', val.kodedokter)
      this.setForm('diagnosa', diag ?? '-')
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
      this.setPasien()
    },
    resetObat () {
      const tagihanrs = this.form?.tagihanrs ?? 0
      const kodeincbg = this.form?.kodeincbg ?? '-'
      const uraianinacbg = this.form?.uraianinacbg ?? '-'
      const tarifina = this.form?.tarifina ?? 0
      const tiperesep = this.form?.tiperesep ?? 'normal'
      this.form = {
        keterangan: '-',
        jumlah_diminta: 1,
        tiperesep,
        tagihanrs,
        kodeincbg,
        uraianinacbg,
        tarifina
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
    cariObat (val, obat) {
      let kdobatArray = ''
      if (obat.length) {
        kdobatArray = obat.map(item => item?.kdobat)
      }

      const depo = this.depos.filter(pa => pa.jenis === this.depo)

      if (depo.length) {
        this.dpPar = depo[0]?.value
      }
      else return notifErrVue('depo tujuan tidak ditemukan')
      const param = {
        groups: this?.pasien?.groups,
        kdruang: this.dpPar,
        q: kdobatArray,
        tiperesep: this.form.tiperesep
      }

      this.loadingObat = true
      const params = { params: param }
      return new Promise(resolve => {
        api.get('v1/simrs/pelayanan/lihatstokobateresepBydokter', params)
          .then(resp => {
            this.loadingObat = false
            this.nonFilteredObat = resp.data?.dataobat
            this.Obats = val?.length ? this.nonFilteredObat.filter(nfil => nfil?.namaobat.toLowerCase().includes(val?.toLowerCase())) : this.nonFilteredObat
            // console.log('hasil', this.nonFilteredObat, this.Obats)

            this.simpanCopyResep(val, resp.data?.dataobat)
            resolve(resp)
          })
          .catch(() => {
            this.loadingObat = false
            this.Obats = []
          })
      })
      // }
    },

    cariObat2 (val) {
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
    async getSigna () {
      this.loadingSigna = true
      await api.get('v1/simrs/farmasinew/depo/get-signa')
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
    getBillRajal (val) {
      this.setForm('kdruangan', val?.kodepoli)
      const kunjRajal = useKasirRajalListKunjunganStore()
      const param = { noreg: val?.noreg }
      kunjRajal.getBill(param).then(resp => {
        this.setForm('tagihanrs', resp?.data?.totalall)
        // console.log('bill', resp?.data)
        // console.log('form', this.form)
      })
    },
    getBillRanap (val) {
      this.setForm('kdruangan', val?.kdruangan)
      // if (!!this.form?.dokter && !this.dokters?.length) this.cariDokter(this.form?.dokter)
    },
    getBillIgd (val) {
      this.setForm('kdruangan', val?.kodepoli)
      // if (!!this.form?.dokter && !this.dokters?.length) this.cariDokter(this.form?.dokter)
    },
    getBillOk (val) {
      this.setForm('kdruangan', val?.kdruangan)
      // if (!!this.form?.dokter && !this.dokters?.length) this.cariDokter(this.form?.dokter)
    },
    cariSimulasi (val) {
      this.setForm('kodeincbg', '-')
      this.setForm('uraianinacbg', '-')
      this.setForm('tarifina', 0)
      // this.loadingSimulasi = true
      // const param = {
      //   params: { noreg: val }
      // }
      // return new Promise(resolve => {
      //   api.get('v1/simrs/pelayanan/carisimulasi', param)
      //     .then(resp => {
      //       this.loadingSimulasi = false
      //       console.log('cri simulasi', resp)
      //       const tarif = resp?.data?.response?.cbg?.base_tariff ?? (resp?.data?.response?.cbg?.tariff ?? 0)
      //       this.setForm('kodeincbg', resp?.data?.response?.cbg?.code ?? '-')
      //       this.setForm('uraianinacbg', resp?.data?.response?.cbg?.description ?? '-')
      //       this.setForm('tarifina', tarif ?? '-')

      //       resolve(resp)
      //     })
      //     .catch(() => {
      //       this.loadingSimulasi = false
      //     })
      // })
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
            this.statusCopiedRacik = []
            this.statusCopied = []
          }
          else {
            this.statusCopiedRacik = []
            this.statusCopied = []
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

    // BARU
    simpanCopyResep (val, obat) {
      // // const res = val?.rincian
      // // const racik = val?.permintaanracikan

      // const transformedData = val?.rincian.map(item => ({

      //   aturan: item?.aturan,
      //   diagnosa: val?.diagnosa,
      //   dokter: val?.dokter?.kdpegsimrs,
      //   forkit: item?.forkit,
      //   fornas: item?.fornas,
      //   generik: item?.generik,
      //   groupsistembayar: val?.sistembayar?.groups,
      //   jumlah_diminta: item?.jumlah,
      //   jumlahdosis: item?.jumlah,
      //   kandungan: item?.kandungan,
      //   kdruangan: val?.ruangan,
      //   keterangan: item?.keterangan,
      //   kode50: item?.kode50,
      //   kode108: item?.kode108,
      //   kodedepo: val?.depo,
      //   kodeincbg: val?.diagnosa,
      //   kodeobat: item?.kdobat,
      //   konsumsi: item?.konsumsi,
      //   noreg: item?.noreg,
      //   norm: val?.norm,
      //   satuan_kcl: item?.mobat?.satuan_k,
      //   sistembayar: val?.sistembayar?.rs1,
      //   stokalokasi: val?.norm,
      //   tagihanrs: val?.tagihanrs,
      //   tarifina: val?.tarifina,
      //   uraian50: item?.uraian50,
      //   uraian108: item?.uraian108,
      //   uraianinacbg: val?.uraianinacbg,
      //   iter_jml: val?.iter_jml,
      //   tiperesep: val?.tiperesep
      // }))

      // //   if (store.form.tiperesep === 'iter') {
      // //     store.setForm('iter_jml', val?.iter_jml)
      // //   }

      // //   if (val?.tiperesep !== store.form.tiperesep) {
      // //     store.setForm('tiperesep', store.form.tiperesep)
      // //     notifErrVue('Maaf tipe resep berbeda...!')
      // //   }
      // //   else {
      // //     store.setForm('tiperesep', val?.tiperesep)
      // //     const form = store.form
      // //     await store.simpanCopyResep(form, indexform, indexlist, tipe)
      // //   }
      // // }

      // // this.setForm('aturan', transformedData)

      // // Assuming setForm is a method that takes two arguments: the key and the value;

      // for (const key in transformedData) {
      //   // eslint-disable-next-line no-prototype-builtins
      //   if (transformedData.hasOwnProperty(key)) {
      //     this.setForm(key, transformedData[key])
      //   }
      // }
      // // console.log(this.form)

      // // for (const [indexform, res] of resep.entries()) {
      // //   this.setForm('aturan', res?.aturan)
      // //   this.setForm('diagnosa', val?.diagnosa)
      // //   this.setForm('dokter', val?.dokter?.kdpegsimrs)
      // //   this.setForm('forkit', '')
      // //   this.setForm('fornas', '')
      // //   this.setForm('generik', '')
      // //   this.setForm('groupsistembayar', val?.sistembayar?.groups)
      // //   this.setForm('jumlah_diminta', res?.jumlah)
      // //   this.setForm('jumlahdosis', res?.jumlah)
      // //   this.setForm('kandungan', res?.kandungan)
      // //   this.setForm('kdruangan', val?.ruangan)
      // //   this.setForm('keterangan', res?.keterangan)
      // //   this.setForm('kode50', res?.kode50)
      // //   this.setForm('kode108', res?.kode108)
      // //   this.setForm('kodedepo', val?.depo)
      // //   this.setForm('kodeincbg', val?.diagnosa)
      // //   this.setForm('kodeobat', res?.kdobat)
      // //   this.setForm('konsumsi', res?.konsumsi)
      // //   this.setForm('noreg', res?.noreg)
      // //   this.setForm('norm', val?.norm)
      // //   this.setForm('satuan_kcl', res?.mobat?.satuan_k)
      // //   this.setForm('sistembayar', val?.sistembayar?.rs1)
      // //   this.setForm('stokalokasi', val?.norm)
      // //   this.setForm('tagihanrs', val?.tagihanrs)
      // //   this.setForm('tarifina', val?.tarifina)
      // //   this.setForm('uraian50', res?.uraian50)
      // //   this.setForm('uraian108', res?.uraian108)
      // //   this.setForm('uraianinacbg', val?.uraianinacbg)

      // //   // if (this.form.tiperesep === 'iter') {
      // //   //   this.setForm('iter_jml', val?.iter_jml)
      // //   // }

      // //   // if (val?.tiperesep !== this.form.tiperesep) {
      // //   //   this.setForm('tiperesep', this.form.tiperesep)
      // //   //   notifErrVue('Maaf tipe resep berbeda...!')
      // //   // }
      // //   // else {
      // //   //   this.setForm('tiperesep', val?.tiperesep)
      // //   // }
      // //   console.log(indexform)
      // //   console.log('form', this.form)
      // // }

      // // const resep = this?.pasien?.newapotekrajal?.find(val => val.noresep === this.form?.noresep)
      // // if (resep) {
      // //   if (resep?.flag !== '') this.form.noresep = ''
      // // }

      // // console.log('obat', this?.pasien?.newapotekrajal)

      console.log('resep', val)
      const resep = val?.rincian
      // const racik = val?.rincianracik
      const kirimResep = []
      const kirimRacik = []
      // console.log('racikan', racik)
      if (resep.length) {
        resep.forEach(res => {
          // console.log('non racikan', res)
          // console.log('50', res?.uraian50)
          // console.log('108', res?.uraian108)
          if (parseFloat(res.alokasi) < parseFloat(res.jumlah)) return
          const temp = {
            noresep: '',
            aturan: res?.aturan,
            diagnosa: val?.diagnosa,
            dokter: val?.dokter?.kdpegsimrs,
            forkit: res?.forkit,
            fornas: res?.fornas,
            generik: res?.generik,
            groupsistembayar: val?.sistembayar?.groups,
            jumlah_diminta: res?.jumlah,
            jumlahdosis: res?.jumlah,
            jumlah: res?.jumlah,
            kandungan: res?.kandungan,
            kdruangan: val?.ruangan,
            keterangan: res?.keterangan,
            kode50: res?.kode50,
            kode108: res?.kode108,
            kodedepo: val?.depo,
            kodeincbg: val?.diagnosa,
            kodeobat: res?.kdobat,
            konsumsi: res?.konsumsi,
            noreg: res?.noreg,
            norm: val?.norm,
            satuan_kcl: res?.mobat?.satuan_k,
            sistembayar: val?.sistembayar?.rs1,
            stokalokasi: val?.norm,
            tagihanrs: val?.tagihanrs,
            tarifina: val?.tarifina,
            uraian50: res?.uraian50,
            uraian108: res?.uraian108,
            uraianinacbg: val?.uraianinacbg,
            iter_jml: val?.iter_jml,
            tiperesep: val?.tiperesep,
            jenisresep: 'nonRacikan',
            tiperacikan: ''
          }
          kirimResep.push(temp)
        })
      }
      // if (racik.length) {
      //   racik.forEach(rac => {
      //     // console.log('racikan', rac)
      //     if (!rac?.kosong) {
      //       if (rac.rincian.length) {
      //         rac.rincian.forEach(rinc => {
      //           const temp = {
      //             noreg: rinc?.noreg,
      //             tiperacikan: rinc?.tiperacikan,
      //             namaracikan: rinc?.namaracikan,
      //             kdobat: rinc?.kdobat,
      //             jumlahMinta: rinc?.jumlah,
      //             satuan_racik: rinc?.satuan_racik,
      //             harga_beli: rinc?.hargapokok,
      //             hpp: rinc?.hargapokok,
      //             harga_jual: rinc?.hargajual,
      //             nilai_r: rinc?.r,
      //             user: apps?.user?.pegawai?.kdpegsimrs
      //           }
      //           kirimRacik.push(temp)
      //         })
      //       }
      //     }
      //   })
      // }
      const head = {
        noreg: val?.noreg,
        noresep_asal: val?.noresep,
        tiperesep: 'iter',
        iter_expired: val?.iter_expired,
        norm: val?.norm,
        tgl_permintaan: val?.tgl_permintaan,
        tgl: date.formatDate(Date.now(), 'YYYY-MM-DD'),
        ruangan: val?.ruangan,
        dokter: val?.dokter?.kdpegsimrs,
        depo: val?.depo,
        sistembayar: val?.sistembayar?.rs1,
        diagnosa: val?.diagnosa,
        kodeincbg: val?.diagnosa,
        uraianinacbg: val?.uraianinacbg,
        tarifina: val?.tarifina,
        tagihanrs: val?.tagihanrs,
        flag: '3',
        tgl_kirim: date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss')
      }
      const data = {
        head, kirimResep, kirimRacik, groupsistembayar: val?.sistembayar?.groups, kddepo: val?.depo
      }

      this.loading = true
      return new Promise((resolve, reject) => {
        api.post('v1/simrs/pelayanan/copiresep', data)
          .then(resp => {
            this.loading = false
            console.log('simpan ', resp?.data.map(item => item?.nota))
            notifSuccess(resp)

            const nota = resp?.data.map(item => item?.nota)
            this.noreseps.push(nota[0])
            this.noresep = nota[0]

            const newapotekrajal = resp?.data.map(item => item?.newapotekrajal)
            this.pasien.newapotekrajal = newapotekrajal
            this.indexRacikan = this.pasien.newapotekrajal.findIndex(x => x.noresep === nota[0])

            // this.resetForm()
            // this.setForm('noresep', resp?.data?.nota)

            // this.setForm('lanjuTr', '')
            resolve(resp)
            // // this.cariObat2()
            // // const key = `${indexlist}-${indexform}`

            // // if (tipe === 'racik') {
            // //   this.statusCopiedRacik[key] = true
            // // }
            // // else {
            // //   this.statusCopied[key] = true
            // // }
          })
          .catch(error => {
            this.resetForm()
            console.error('Error in simpanCopyResep:', error)
            this.loading = false
            // const key = `${indexlist}-${indexform}`

            // if (tipe === 'racik') {
            //   this.statusCopiedRacik[key] = false
            // }
            // else {
            //   this.statusCopied[key] = false
            // }

            // this.messageCopied[key] = error?.response?.data?.message
            reject(error)
          })
      })
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
