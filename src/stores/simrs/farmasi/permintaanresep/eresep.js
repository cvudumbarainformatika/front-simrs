import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { useKasirRajalListKunjunganStore } from '../../kasir/rajal/kunjungan'
import { notifErrVue, notifSuccess } from 'src/modules/utils'

export const usePermintaanEResepStore = defineStore('permintaan_e_resep', {
  state: () => ({
    loading: false,
    loadingSigna: false,
    loadingObat: false,
    loadingkirim: false,
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
    depo: '',
    tipeReseps: [
      { label: 'Normal', value: 'normal' },
      { label: 'PRB', value: 'prb' },
      { label: 'Iter', value: 'iter' }
    ],
    // section racikan ---
    racikanOpen: false,
    racikanTambah: false,
    racikan: {
      jenisresep: 'Racikan',
      namaracikan: '-',
      keteranganx: '-',
      jumlah: 1,
      jenisracikan: 'DTD',
      dosisobat: 1,
      dosismaksimum: 1 // dosis resep
    },
    tipeRacikan: [
      { label: 'DTD', value: 'DTD' },
      { label: 'non-DTD', value: 'non-DTD' }
    ],
    counterRacikan: 1,
    listRacikan: [],
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
      const jen = this.racikan?.jenisracikan ?? '-'
      const nam = this.racikan?.namaracikan ?? '-'
      this.racikan = {
        jenisresep: 'Racikan',
        namaracikan: nam,
        keteranganx: '-',
        jumlah: 1,
        jenisracikan: jen,
        dosisobat: 1,
        dosismaksimum: 1 // dosis resep
      }
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
          nama: key?.namaracikan,
          harga: key?.harga,
          aturan: key?.aturan,
          keterangan: key?.keterangan,
          jenisracikan: key?.tiperacikan,
          jumlahracikan: key?.jumlahdibutuhkan,
          rician: [key]
        }
        this.listRacikan.push(temp)
      }
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
    setListResep(resep) {
      if (!resep.listRacikan) resep.listRacikan = []
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
              nama: arr?.namaracikan,
              harga: arr?.harga,
              aturan: arr?.aturan,
              keterangan: arr?.keterangan,
              jenisracikan: arr?.tiperacikan,
              jumlahracikan: arr?.jumlahdibutuhkan,
              rician: [arr]
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
        kdruang: this.dpPar
      }
      const filtObat = this.nonFilteredObat.filter(nfil => nfil?.namaobat.toLowerCase().includes(val?.toLowerCase()))
      if (filtObat?.length > 10) {
        this.Obats = filtObat
      } else {
        this.Obats = filtObat
        console.log('obat', val, this.namaObat)
        this.loadingObat = true
        const params = { params: param }
        return new Promise(resolve => {
          api.get('v1/simrs/farmasinew/depo/lihatstokobateresepBydokter', params)
            .then(resp => {
              this.loadingObat = false
              this.nonFilteredObat = resp.data?.dataobat
              this.Obats = this.nonFilteredObat.filter(nfil => nfil?.namaobat.toLowerCase().includes(val?.toLowerCase()))
              console.log(resp.data)
              resolve(resp)
            })
            .catch(() => {
              this.loadingObat = false
              this.Obats = []
            })
        })
      }
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
            console.log(resp)
            if (resp?.data?.rinci !== 0) {
              this.setList(resp?.data?.rinci)
            }
            if (resp?.data?.simpandtd !== 0) {
              this.setListRacikan(resp?.data?.simpandtd)
            }
            if (resp?.data?.simpannondtd !== 0) {
              this.setListRacikan(resp?.data?.simpandtd)
            }
            this.resetForm()
            this.setForm('noresep', resp?.data?.nota)
            resolve(resp)
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
          // console.log(resp?.data)
          // this.setForm('namaracikan', resp?.data)
          this.loadingkirim = false
          this.listPemintaanSementara = []
          this.listRacikan = []
          this.tipeRacikan = [
            { label: 'DTD', value: 'DTD', disable: false },
            { label: 'non-DTD', value: 'non-DTD', disable: false }
          ]
          notifSuccess(resp)
          this.setListResep(this.pasien?.newapotekrajal)
          this.pasien.newapotekrajal.flag = '1'
        })
        .catch(() => { this.loadingkirim = false })
    }
  }
})