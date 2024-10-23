import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
// eslint-disable-next-line no-unused-vars
import { notifErr, notifErrVue, notifSuccess } from 'src/modules/utils'

export const postingJurnal = defineStore('posting_jurnal', {
  state: () => ({
    loading: false,
    loadingverif: false,
    dialogRinci: false,
    reqs: {
      q: '',
      jenis: '',
      notrans: '',
      bulan: date.formatDate(Date.now(), 'MM'),
      tahun: date.formatDate(Date.now(), 'YYYY')
    },
    bulans: [
      { nama: 'Januari', value: '01' },
      { nama: 'Februari', value: '02' },
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
    jenis: [
      { nama: 'Unposting', value: null },
      { nama: 'Posting', value: 1 }
    ],
    verif: '',
    rinci: {},
    getjurnals: [],
    hasilmaps: [],
    totaldebit: 0,
    totalkredit: 0
  }),
  actions: {
    openRinci (val) {
      // console.log('val', val)
      this.dialogRinci = true
      this.rinci = val
      this.reqs.notrans = val?.notrans
      this.verif = val?.verif
      this.totaldebit = val?.totaldebit
      this.totalkredit = val?.totalkredit
      console.log('value notrans', this.verif)
    },
    // search (val) {
    //   console.log('hasil search ', val)
    //   this.reqs.q = val
    //   if (!this.loading) this.getPostJurnal()
    // },

    getPostJurnal () {
      this.loading = true
      const params = { params: this.reqs }
      return new Promise((resolve) => {
        api.get('v1/akuntansi/registerjurnal/getjurnalpost', params).then((resp) => {
          console.log('getjurnal', resp.data)
          if (resp.status === 200) {
            this.getjurnals = []

            this.getjurnals = resp.data
            this.mapData()
            this.loading = false

            resolve(resp.data)
          }
        }).catch(() => { this.loading = false })
      })
    },
    // async getPostJurnal () {
    //   this.loading = true
    //   const params = { params: this.reqs }
    //   // return new Promise((resolve) => {
    //   try {
    //     const resp = await api.get('v1/akuntansi/registerjurnal/getjurnalpost', params)
    //     // .then((resp) => {
    //     console.log('getjurnal', resp.data)
    //     if (resp.status === 200) {
    //       this.getjurnals = []

    //       this.getjurnals = resp.data

    //       this.loading = false
    //       this.mapData()
    //       // resolve(resp.data)
    //     }
    //     this.loading = false
    //     // }).
    //   }
    //   catch (error) {
    //     // console.log(error)
    //     this.loading = false
    //   }
    //   // })
    // },
    mapData () {
      const uniknotrans = this.getjurnals.map((x) => x.notrans)
      const set = uniknotrans.length ? [...new Set(uniknotrans)] : []
      const jurnals = []
      for (let i = 0; i < set.length; i++) {
        const el = set[i]
        const arr = this.getjurnals

        const filter = arr.filter((x) => x.notrans === el).map((x) => x)
        const unikjenis = filter.map((x) => x.keterangan)
        const setket = unikjenis.length ? [...new Set(unikjenis)] : []
        const jurnal = []
        for (let x = 0; x < setket.length; x++) {
          const et = setket[x]
          const arrs = filter

          const obj = {
            tanggal: arrs.filter((x) => x.keterangan === et)[0]?.tanggal,
            notrans: arrs.filter((x) => x.keterangan === et)[0]?.notrans,
            keterangan: arrs.filter((x) => x.keterangan === et)[0]?.keterangan,
            kegiatan: arrs.filter((x) => x.keterangan === et)[0]?.kegiatan,
            nilai: arrs.filter((x) => x.keterangan === et)?.map((x) => parseFloat(x.debit))?.reduce((a, b) => a + b, 0),
            kode: arrs.filter((x) => x.keterangan === et)?.map((x) => x.kode),
            uraian: arrs.filter((x) => x.keterangan === et)?.map((x) => x.uraian),
            debit: arrs.filter((x) => x.keterangan === et)?.map((x) => parseFloat(x.debit)),
            kredit: arrs.filter((x) => x.keterangan === et)?.map((x) => parseFloat(x.kredit)),
            verif: arrs.filter((x) => x.keterangan === et)[0]?.verif,
            totaldebit: arrs.filter((x) => x.keterangan === et)?.map((x) => parseFloat(x.debit))?.reduce((a, b) => a + b, 0),
            totalkredit: arrs.filter((x) => x.keterangan === et)?.map((x) => parseFloat(x.kredit))?.reduce((a, b) => a + b, 0)
          }
          jurnal.push(obj)
        }
        jurnals.push(...jurnal)
      }
      const sortByDate = (jurnals) =>
        jurnals.sort(({ tanggal: a }, { tanggal: b }) =>
          a < b ? -1 : a > b ? 1 : 0
        )
      const arrJurnal = sortByDate(jurnals)
      this.hasilmaps = arrJurnal
      console.log('HASIL POSTING', this.hasilmaps)
    },
    async verifPosting (val, debit, kredit) {
      // console.log('valueeee', this.rinci.notrans)
      this.loadingverif = true
      if (debit !== kredit) {
        notifErrVue('Maaf Debit Dan Kredit Harus Balance')
        this.loadingverif = false
      }
      else {
        const notrans = { notrans: val?.notrans }
        try {
          const resp = await api.post('v1/akuntansi/registerjurnal/verifjurnal', notrans)
          if (resp.status === 200) {
            notifSuccess(resp)
            this.verif = '1'
            this.rinci = val
            // this.reqs.notrans = notrans
            // console.log('notrans', this.reqs.notrans)
            this.getPostJurnal()
            console.log('val e', this.rinci)
            this.dialogRinci = false
            this.loadingverif = false
          }
        }
        catch (error) {
          this.loadingverif = false
          notifErr(error)
        }
      }
    }
  }
})
