import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
// import { useKasirRajalListKunjunganStore } from '../../kasir/rajal/kunjungan'
import { notifSuccess, notifErrVue } from 'src/modules/utils'
import { LocalStorage } from 'quasar'
// eslint-disable-next-line no-unused-vars
import { usePermintaanEResepStore } from './eresep'
// import { dateFullFormat } from 'src/modules/formatter'

export const useTemplateEResepStore = defineStore('template_e_resep', {
  state: () => ({
    loading: false,
    loadingTemplate: false,
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
    items: [],
    templateSelected: null,
    templates: [],
    errorsOrder: [],
    expandedList: [],
    cariTemplate: null,
    // pembatasan oabat
    batases: [
      { depo: 'Gd-05010101', batas: 5 }, // rajal
      { depo: 'Gd-04010102', batas: 7 } // ranap
    ]
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
      const arr = this.items
      const racikans = arr.length ? arr.filter(x => x?.racikan === true) : []
      if (this.form?.racikan === true) {
        this.form.kodeobat = `racikan-${parseInt(racikans?.length) + parseInt(1)}`
        this.form.namaobat = `Racikan ${parseInt(racikans?.length) + parseInt(1)}`
      }
      // console.log('form', this.form, this.items)
      console.log('form', this.form, this.depo, this.dpPar)
      const batas = this.batases.find(f => f.depo === this.dpPar)
      if (batas) this.form.batas = batas?.batas
      else {
        if (this.form.batas) delete this.form.batas
      }

      this.items.push(this.form)
      return new Promise((resolve, reject) => {
        LocalStorage.set('template-eresep', JSON.stringify(this.items)) // simpan ke local storage (this.items)
        console.log('localstorage', JSON.parse(LocalStorage.getItem('template-eresep')))
        resolve(this.items)
      })
    },

    updateListItems () {
      return new Promise((resolve, reject) => {
        LocalStorage.set('template-eresep', JSON.stringify(this.items)) // simpan ke local storage (this.items)
        console.log('localstorage', JSON.parse(LocalStorage.getItem('template-eresep')))
        resolve(this.items)
      })
    },

    simpanTemplate (val) {
      // console.log('simpan template')
      this.loadingTemplate = true
      const payload = {
        nama: val,
        kodedepo: this.dpPar,
        items: this.items
      }

      return new Promise(resolve => {
        api.post('v1/simrs/penunjang/farmasinew/templateeresep/simpantemplate', payload)
          .then(resp => {
            this.loadingTemplate = false
            console.log('simpan template', resp)
            this.items = []
            this.updateListItems()
            const templates = [...this.templates]
            const cek = templates.find(x => x?.kodedepo === this.dpPar && x?.nama === val)
            if (!cek) {
              templates.push(resp?.data)
            }
            else {
              const index = templates.findIndex(x => x?.kodedepo === this.dpPar && x?.nama === val)
              templates[index] = resp?.data
            }
            this.templates = templates
            this.selectTemplate(resp?.data)
            resolve(resp)
          })
          .catch((err) => {
            console.log('err', err)
            this.loadingTemplate = false
          })
      })
    },

    deleteTemplate (val) {
      console.log('delete template', val)
      const payload = {
        id: val?.id
      }

      return new Promise(resolve => {
        api.post('v1/simrs/penunjang/farmasinew/templateeresep/delete', payload)
          .then(resp => {
            console.log('delete template', resp)
            this.templates = this.templates.filter(x => x?.id !== val?.id)
            this.selectTemplate()
            resolve(resp)
          })
          .catch((err) => {
            console.log('err', err)
          })
      })
    },

    async getTemplates (val) {
      const params = { params: { kodedepo: val } }
      // return new Promise(resolve => {
      const resp = await api.get('v1/simrs/penunjang/farmasinew/templateeresep/gettemplate', params)
      // console.log('get templates', resp)
      if (resp.status === 200) {
        this.templates = resp.data
        // pembatasan obat
        this.templates.forEach(ite => {
          const batas = this.batases.find(f => f.depo === ite.kodedepo)
          if (batas) this.setBatasan(ite, batas?.batas)
        })
        console.log('templates', this.templates)
      }
      // })
    },
    setBatasan (ite, batas) {
      ite?.rincian.forEach(ri => {
        ri.batas = batas
      })
      const non = ite?.rincian.filter(f => f?.jenis_perbekalan?.toLowerCase() === 'obat')
      const rac = ite?.rincian.filter(f => f?.kodeobat?.toLowerCase().includes('racik'))
      const tot = non.length + rac.length
      console.log('rincian', non, rac, tot)
      if (tot > batas) {
        ite.bisaOrder = false
        ite.errorBatas = 'Pembatasan Jumlah Obat, Maksimal ' + batas
      }
    },

    selectTemplate (val) {
      // console.log('select template', val)
      this.templateSelected = null
      this.templateSelected = val
      this.items = []
      this.items = val?.rincian ?? []
      this.errorsOrder = []
      this.expandedList = []
      this.updateListItems()
    },

    setRacikan (key, val) {
      this.racikan[key] = val
    },

    kirimOrder (payload, pasien) {
      console.log('payload', payload)

      this.errorsOrder = []
      this.loadingTemplate = true
      return new Promise((resolve, reject) => {
        // api.post('v1/simrs/farmasinew/depo/cek-template-resep', payload)
        api.post('v1/simrs/penunjang/farmasinew/templateeresep/order', payload)
          .then(resp => {
            console.log('kirim order', resp)
            notifSuccess(resp)
            const res = resp?.data?.data
            const eresep = usePermintaanEResepStore()
            eresep?.setListResep(res)
            eresep.pasien.newapotekrajal.push(res)
            this.loadingTemplate = false
            resolve(resp)
          })
          .catch((err) => {
            this.loadingTemplate = false
            console.log('err response', err)
            const items = err.response.data.items
            const racikan = items?.filter(x => x?.racikan !== false && x?.isError === true)
            const nonRacikan = items?.filter(x => x?.racikan === false && x?.isError === true)

            const grouped = racikan.length ? this.groupByx(racikan, x => x?.racikan) : []
            // const groupArr = Array.from(grouped, ([name, value]) => ({ name, value }))
            // console.log('racikan', grouped)
            // console.log('non racikan', nonRacikan)
            // const errors = [...grouped, ...nonRacikan]
            const errors = {
              racikan: grouped,
              nonRacikan
            }
            console.log('err', errors)
            this.expandedList = errors?.racikan?.length ? errors.racikan.map(x => x?.koderacikan) : []
            this.errorsOrder = errors
            reject(err)
          })
      })
    },

    groupByx (list, keyGetter) {
      const map = new Map()
      list.forEach((item) => {
        const key = keyGetter(item)
        const collection = map.get(key)
        if (!collection) {
          map.set(key, [item])
        }
        else {
          collection.push(item)
        }
      })
      const arr = Array.from(map, ([koderacikan, rincian]) => ({ koderacikan, rincian }))
      return arr
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
    }

  }
})
