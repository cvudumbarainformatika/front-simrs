import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { useKasirRajalListKunjunganStore } from '../../kasir/rajal/kunjungan'
import { notifErrVue, notifSuccess } from 'src/modules/utils'
import { Dialog } from 'quasar'
import { dateFullFormat } from 'src/modules/formatter'

export const usePermintaanEResepStore = defineStore('permintaan_e_resep', {
  state: () => ({
    loading: false,
    loadingSigna: false,
    loadingObat: false,
    loadingkirim: false,
    loadingHapus: false,
    obatId: null,
    namaRacikan: false,
    form: {
      keterangan: '-',
      jumlah_diminta: 1,
      tiperesep: 'normal'
    },
    listPemintaanSementara: [],
    signas: [],
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
      tiperacikan: 'DTD',
      dosisobat: 1,
      dosismaksimum: 1 // dosis resep
    },
    tipeRacikan: [
      { label: 'DTD', value: 'DTD' },
      { label: 'non-DTD', value: 'non-DTD' }
    ],
    satuanRaciks: ['Bungkus', 'Kapsul', 'Pot'],
    counterRacikan: 1,
    listRacikan: [],
    listRincianRacikan: [],
    resepPasien: []
    // section racikan end---
  }),
  actions: {
    setForm(key, val) {
      this.form[key] = val
    },
    setRacikan(key, val) {
      this.racikan[key] = val
    },
    setPasien() {
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
    resetForm() {
      this.namaObat = null
      const tagihanrs = this.form?.tagihanrs ?? 0
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
      console.log('jenis resep', jenisresep)
      this.form = {
        keterangan: '-',
        jumlah_diminta: 1,
        tiperesep,
        tagihanrs,
        kodeincbg,
        uraianinacbg,
        tarifina,
        kdruangan
      }
      if (jenisresep === 'Racikan') {
        this.setForm('jenisresep', jenisresep)
        this.setForm('aturan', aturan)
        this.setForm('konsumsi', konsumsi)
        this.setForm('namaracikan', namaracikan)
        this.setForm('jumlahdibutuhkan', jumlahdibutuhkan)
        this.setForm('tiperacikan', tiperacikan)
        this.setForm('keterangan', keterangan)
        this.setForm('keteranganx', '-')
        if (tiperacikan === 'DTD') {
          this.setForm('jumlah', 1)
          this.setForm('dosisobat', 1)
          this.setForm('dosismaksimum', 1)
        } else {
          this.setForm('jumlah', 1)
        }
      }
      this.setPasien()
    },
    resetObat() {
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
    resetRacikan() {
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
    hapusList(obat) {
      if (obat?.namaracikan) {
        const racikan = this.listRacikan.filter(a => a.namaracikan === obat?.namaracikan)
        if (racikan?.length) {
          if (racikan[0]?.rincian.length > 1) {
            const index = racikan[0]?.rincian?.findIndex(x => x.id === obat?.id)
            if (index >= 0)racikan[0]?.rincian.splice(index, 1)
          } else {
            const index = this.listRacikan.findIndex(x => x.namaracikan === obat?.namaracikan)
            if (index >= 0) this.listRacikan.splice(index, 1)
          }
        }
        const index = this?.pasien?.newapotekrajal?.permintaanracikan.findIndex(x => x.id === obat?.id)
        if (index >= 0) this?.pasien?.newapotekrajal?.permintaanracikan.splice(index, 1)
        console.log('new', index)
      } else {
        const index = this.listPemintaanSementara.findIndex(x => x.id === obat?.id)
        if (index >= 0) this.listPemintaanSementara.splice(index, 1)
        const indexp = this?.pasien?.newapotekrajal?.permintaanresep.findIndex(x => x.id === obat?.id)
        if (indexp >= 0) this?.pasien?.newapotekrajal?.permintaanresep.splice(indexp, 1)
        console.log('new', indexp)
      }
      console.log('pasien', this?.pasien?.newapotekrajal)
    },
    setList(key) {
      key.harga = (parseFloat(key?.jumlah) * parseFloat(key?.hargajual)) + parseFloat(key?.r)
      this.listPemintaanSementara.push(key)
    },
    setListArray(array) {
      array.forEach(arr => {
        this.setList(arr)
      })
    },
    setListRacikan(key) {
      key.harga = (parseFloat(key?.jumlah) * parseFloat(key?.harga_jual)) + parseFloat(key?.r)
      const namaracikan = key?.namaracikan
      const adaList = this.listRacikan.filter(list => list.namaracikan === namaracikan)
      if (adaList.length) {
        adaList[0].rincian.push(key)
        const harga = adaList[0].rincian.map(a => a?.harga).reduce((a, b) => a + b, 0) ?? 0
        adaList[0].harga = harga
      } else {
        const temp = {
          namaracikan: key?.namaracikan,
          harga: key?.harga,
          aturan: key?.aturan,
          keterangan: key?.keterangan,
          tiperacikan: key?.tiperacikan,
          konsumsi: key?.konsumsi,
          jumlahracikan: key?.jumlahdibutuhkan,
          rincian: [key]
        }
        this.listRacikan.push(temp)
      }
      this.listRincianRacikan.push(key)
      console.log('list racikan', this.listRacikan)

      this.tipeRacikan = [
        { label: 'DTD', value: 'DTD', disable: true },
        { label: 'non-DTD', value: 'non-DTD', disable: true }
      ]
    },
    setListRacikanArray(array) {
      array.forEach(arr => {
        this.setListRacikan(arr)
      })
    },
    setNoreseps(reseps) {
      this.noreseps = []
      reseps.forEach(resep => {
        this.noreseps.unshift(resep?.noresep)
      })
      this.noreseps.unshift('BARU')
    },
    setResep(val) {
      this.setForm('noresep', '')
      this.listRacikan = []
      this.listPemintaanSementara = []
      if (val === '') {
        this.indexRacikan = -1
        return
      }
      const reseps = this.pasien?.newapotekrajal
      const resep = reseps.find(x => x.noresep === val)
      this.indexRacikan = reseps.findIndex(x => x.noresep === val)
      if (resep?.flag === '') {
        this.setForm('tiperesep', resep?.tiperesep ?? 'normal')
        this.setForm('noresep', val)
        if (resep?.permintaanresep?.length) this.setListArray(resep?.permintaanresep)
        if (resep?.permintaanracikan?.length) this.setListRacikanArray(resep?.permintaanracikan)
      } else {
        if (resep?.flag !== '') this.setListResep(resep)
      }
      console.log('set resep', val, resep)
    },
    setListResep(resep) {
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
          } else {
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
    cariObat(val) {
      const depo = this.depos.filter(pa => pa.jenis === this.depo)
      console.log('depo', this?.depo, depo)
      if (depo.length) {
        this.dpPar = depo[0]?.value
      } else return notifErrVue('depo tujuan tidak ditemukan')
      const param = {
        groups: this?.pasien?.groups,
        kdruang: this.dpPar,
        q: val
      }
      // console.log('obat', val, filtObat)
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
    async getSigna() {
      this.loadingSigna = true
      await api.get('v1/simrs/farmasinew/depo/get-signa')
        .then(resp => {
          this.loadingSigna = false
          console.log('signa', resp?.data)
          this.signas = resp?.data
        })
        .catch(() => { this.loadingSigna = false })
    },
    getBillRajal(val) {
      this.setForm('kdruangan', val?.kodepoli)
      const kunjRajal = useKasirRajalListKunjunganStore()
      const param = { noreg: val?.noreg }
      kunjRajal.getBill(param).then(resp => {
        this.setForm('tagihanrs', resp?.data?.totalall)
        console.log('bill', resp?.data)
        // console.log('form', this.form)
      })
    },
    getBillRanap(val) {
      this.setForm('kdruangan', val?.kdruangan)
      if (!!this.form.dokter && !this.dokters.length) this.cariDokter(this.form.dokter)
    },
    getBillIgd(val) {
      this.setForm('kdruangan', val?.kodepoli)
      if (!!this.form.dokter && !this.dokters.length) this.cariDokter(this.form.dokter)
    },
    cariSimulasi(val) {
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
    async getNomor() {
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
    simpanObat(payload) {
      const form = payload
      console.log('payload', form)
      this.loading = true
      return new Promise(resolve => {
        api.post('v1/simrs/farmasinew/depo/pembuatanresep', this.form)
          .then(resp => {
            this.loading = false
            console.log('simpan ', resp?.data)
            if (resp.status === 202) {
              this.openDialog(resp?.data)
            } else {
              notifSuccess(resp)
              if (!this.form.noresep || this.form.noresep === '') {
                this.noreseps.push(resp?.data?.nota)
                this.noresep = resp?.data?.nota
              }
              this.resetForm()
              this.setForm('noresep', resp?.data?.nota)
              if (resp?.data?.rinci !== 0) {
                this.setList(resp?.data?.rinci)
              }
              if (resp?.data?.rincidtd !== 0) {
                this.setListRacikan(resp?.data?.rincidtd)
              }
              if (resp?.data?.rincinondtd !== 0) {
                this.setListRacikan(resp?.data?.rincinondtd)
              }

              this.setForm('lanjuTr', '')
              resolve(resp)
            }
          })
          .catch(() => {
            this.loading = false
          })
      })
    },
    async selesaiResep() {
      this.loadingkirim = true
      await api.post('v1/simrs/farmasinew/depo/kirimresep', this.form)
        .then(resp => {
          console.log(resp?.data)
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
          this.tipeRacikan = [
            { label: 'DTD', value: 'DTD', disable: false },
            { label: 'non-DTD', value: 'non-DTD', disable: false }
          ]
          // if (this.pasien?.newapotekrajal) {
          //   this.setListResep(this.pasien?.newapotekrajal)
          //   this.pasien.newapotekrajal.flag = '1'
          // } else {
          // }
        })
        .catch(() => { this.loadingkirim = false })
    },
    async hapusObat(val) {
      console.log('hapusObat', val)
      this.loadingHapus = true
      this.obatId = val?.id
      this.namaRacikan = val?.namaracikan ?? false
      await api.post('v1/simrs/farmasinew/depo/hapus-permintaan-obat', val)
        .then(resp => {
          console.log('resp', resp?.data)
          // hapus list
          this.hapusList(resp?.data?.obat)

          this.loadingHapus = false
          this.obatId = null
          notifSuccess(resp)
        })
        .catch(() => {
          this.loadingHapus = false
          this.obatId = null
        })
    },
    openDialog(val) {
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
