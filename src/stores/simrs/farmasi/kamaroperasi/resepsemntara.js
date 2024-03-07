import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifErrVue, notifSuccess } from 'src/modules/utils'
import { Dialog } from 'quasar'
import { dateFullFormat } from 'src/modules/formatter'

export const usePersiapanOperasiStore = defineStore('resep_sementara', {
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
      kodeobat: '',
      keterangan: '-',
      jumlah_minta: 1,
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
    namaObat: null,
    pasien: null,
    indexRacikan: -1,
    depo: '',
    tipeReseps: [
      { label: 'Normal', value: 'normal' },
      { label: 'PRB', value: 'prb' },
      { label: 'Iter', value: 'iter' }
    ],
    nopermintaan: '',
    nopermintaans: [],
    listSudah: null,
    listBelum: null,
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
      //  console.log('xxx', val)
      this.setForm('noreg', val?.kunjunganranap?.rs1 ?? val?.kunjunganrajal?.rs1)
      this.setForm('norm', val?.kunjunganranap?.masterpasien?.rs1 ?? val?.kunjunganrajal?.masterpasien?.rs1)
      this.setForm('groupsistembayar', val?.sistembayar?.groups)
      this.setForm('sistembayar', val?.sistembayar?.rs1)
      this.setForm('dokter', val?.dokter?.kdpegsimrs)
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
      const satuanRacik = this.form?.satuan_racik ?? '-'
      // console.log('jenis resep', jenisresep)
      this.form = {

        kodeobat: '',
        keterangan: '-',
        jumlah_minta: 1,
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
        this.setForm('satuan_racik', satuanRacik)
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
        jumlah_minta: 1,
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
    hapusList(data) {
      console.log('data', data)
      if (!data?.head) {
        console.log('not data head')
        const index = this.listBelum?.rinci.findIndex(x => x.id === data?.obat?.id)
        if (index >= 0) this.listBelum?.rinci.splice(index, 1)
        const indexp = this?.pasien?.permintaanobatoperasi?.rinci.findIndex(x => x.id === data?.obat?.id)
        if (indexp >= 0) this?.pasien?.permintaanobatoperasi?.rinci.splice(indexp, 1)
        console.log('new', indexp)
      } else {
        const indehead = this?.pasien?.permintaanobatoperasi?.findIndex(x => x.nopermintaan === data?.head?.nopermintaan)
        if (indehead >= 1) this?.pasien?.permintaanobatoperasi.splice(indehead, 1)
        const indexper = this.nopermintaans.findIndex(noper => noper === data?.nota)
        if (indexper >= 1) {
          this.nopermintaans.splice(indexper, 1)
          this.nopermintaan = 'BARU'
          this.setForm('nopermintaan', '')
        }
        this.listBelum = null
        console.log('data head', indehead, indexper)
      }

      console.log('pasien', this?.pasien?.permintaanobatoperasi)
    },
    setList(key) {
      // key.harga = (parseFloat(key?.jumlah) * parseFloat(key?.hargajual)) + parseFloat(key?.r)
      if (this.listBelum) {
        this.listBelum?.rinci.push(key)
        console.log('set list', key, this.listBelum?.rinci)
      }
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
    setNopermintaan(reseps) {
      this.nopermintaans = []
      reseps?.forEach(resep => {
        this.nopermintaans.unshift(resep?.nopermintaan)
      })
      this.nopermintaans.unshift('BARU')
    },
    setResep(val) {
      this.setForm('nopermintaan', '')
      this.listSudah = null
      this.listBelum = null
      if (val === '') {
        this.indexRacikan = -1
        return
      }
      const reseps = this.pasien?.permintaanobatoperasi
      const resep = reseps.find(x => x.nopermintaan === val)
      if (resep?.flag === '') {
        this.setForm('nopermintaan', val)
        this.listBelum = resep
      } else {
        if (resep?.flag !== '') this.listSudah = resep
      }
      console.log('set resep', val, resep)
    },
    cariObat(val) {
      const depo = this.depos.filter(pa => pa.jenis === this.depo)
      // console.log('depo', this?.depo, depo)
      if (depo.length) {
        this.dpPar = depo[0]?.value
      } else return notifErrVue('depo tujuan tidak ditemukan')
      const param = {
        groups: this?.pasien?.sistembayar?.groups,
        kdruang: this.dpPar,
        q: val,
        tiperesep: this.form.tiperesep
      }
      // console.log('obat', val, filtObat)
      this.loadingObat = true
      const params = { params: param }
      return new Promise(resolve => {
        api.get('v1/simrs/penunjang/farmasinew/obatoperasi/get-obat-persiapan', params)
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
    simpanObat(payload) {
      this.loading = true
      return new Promise(resolve => {
        api.post('v1/simrs/penunjang/farmasinew/obatoperasi/simpan-permintaan', this.form)
          .then(resp => {
            console.log('simpan obat', resp.data)
            this.loading = false
            this.cariObat()
            if (resp.status === 202) {
              this.openDialog(resp?.data)
            } else {
              notifSuccess(resp)
              if (!this.form.nopermintaan || this.form.nopermintaan === '') {
                this.nopermintaans.splice(0, 1)
                this.nopermintaans.unshift(resp?.data?.nota)
                this.nopermintaans.unshift('BARU')
                this.nopermintaan = resp?.data?.nota
                this.listBelum = resp?.data?.heder
                this.listBelum.rinci = []
              }
              this.resetForm()
              this.setForm('nopermintaan', resp?.data?.nota)

              if (resp?.data?.rinci) {
                this.setList(resp?.data?.rinci)
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
      await api.post('v1/simrs/penunjang/farmasinew/obatoperasi/selesai-obat-permintaan', this.form)
        .then(resp => {
          console.log(resp?.data)
          // this.setForm('namaracikan', resp?.data)
          this.loadingkirim = false
          notifSuccess(resp)

          const res = resp?.data?.data
          const reseps = this.pasien?.permintaanobatoperasi
          const index = reseps.findIndex(x => x.nopermintaan === res?.nopermintaan)
          if (index >= 0) {
            this.pasien.permintaanobatoperasi[index] = res
          } else {
            this.pasien.permintaanobatoperasi.push(res)
          }
          this.listBelum = null
          this.listSudah = res
        })
        .catch(() => { this.loadingkirim = false })
    },
    async hapusObat(val) {
      console.log('hapusObat', val)
      this.loadingHapus = true
      this.obatId = val?.id
      this.namaRacikan = val?.namaracikan ?? false
      await api.post('v1/simrs/penunjang/farmasinew/obatoperasi/hapus-obat-permintaan', val)
        .then(resp => {
          this.cariObat()
          console.log('resp', resp?.data)
          // hapus list
          this.hapusList(resp?.data)

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
