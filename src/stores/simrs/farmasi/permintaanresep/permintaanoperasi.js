import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { filterDuplicateArrays, notifSuccess } from 'src/modules/utils'

export const useResepPermintaanOperasiStore = defineStore('resep_permintaan_operasi', {
  state: () => ({
    loading: false,
    loadingSimpan: false,
    loadingSelesai: false,
    loadingHapus: false,
    isOpen: false,
    belums: [],
    sudahs: [],
    filteredSudahs: [],
    form: {
      obats: []
    },
    rincBelId: [],
    rincSudId: [],
    params: {
      noreg: '',
      from: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      to: date.formatDate(Date.now(), 'YYYY-MM-DD')

    },
    // noreseps
    noreseps: [],
    noresep: ''
  }),
  actions: {
    setForm (key, val) {
      this.form[key] = val
    },
    setParams (key, val) {
      this.params[key] = val
      console.log('params', key, val)
    },
    refresh () {
      // console.log('params', this.params)
      this.getData()
    },
    resetParams () {
      this.params = {
        noreg: '',
        from: date.formatDate(Date.now(), 'YYYY-MM-DD'),
        to: date.formatDate(Date.now(), 'YYYY-MM-DD')

      }
    },
    setPasien (val) {
      console.log('pasien', val)
      this.setForm('noreg', val?.rs1)
      this.setForm('norm', val?.kunjunganrajal?.masterpasien?.rs1 ?? val?.kunjunganranap.masterpasien?.rs1)
      this.setForm('groupsistembayar', val?.groupsistembayar ?? val?.sistembayar?.groups)
      this.setForm('sistembayar', val?.kodesistembayar ?? val?.sistembayar?.rs1)
      this.setParams('noreg', val?.rs1)
    },
    setResep (val) {
      if (val === 'BARU') {
        this.setForm('noresep', '')
        // this.setParams('noresep', '')
        this.filteredSudahs = []
      }
      else {
        this.setForm('noresep', val)
        // this.setParams('noresep', val)
        this.filteredSudahs = this.sudahs.filter(a => a.noresep === val)
      }
    },
    setValues () {
      this.rincBelId = []
      this.rincSudId = []
      const noreseps = []
      if (this.belums?.length) {
        this.belums?.forEach(item => {
          if (item?.rinci?.length && item?.flag === '2') {
            item?.rinci?.forEach(rin => {
              rin.checked = false
              if (rin?.noresep === '') this.rincBelId.push(rin?.id)
            })
          }
        })
      }
      if (this.sudahs?.length) {
        this.sudahs?.forEach(item => {
          if (item?.noresep !== '') noreseps.unshift(item?.noresep)
        })
      }
      this.noreseps = filterDuplicateArrays(noreseps)
      // if (!this.sudahs?.length) {
      //   this.noresep = 'BARU'
      //   this.setForm('noresep', '')
      // }
      // else {
      //   this.noresep = this.noreseps[0] ?? 'BARU'
      // }
      this.noreseps.unshift('BARU')
      this.setResep(this.noresep)
      // console.log('belum', this.rincBelId, 'sudah', this.rincSudId)
    },
    async getData (val) {
      if (!val) this.loading = true
      this.belums = []
      const param = { params: this.params }
      await api.get('v1/simrs/penunjang/farmasinew/obatoperasi/get-permintaan-for-dokter', param)
        .then(resp => {
          this.loading = false
          this.belums = resp?.data?.belum
          this.sudahs = resp?.data?.sudah
          this.setValues()
          console.log('permintaan ok', resp?.data)
        })
        .catch(() => { this.loading = false })
    },
    async simpan () {
      this.loadingSimpan = true
      this.form.param = this.params
      await api.post('v1/simrs/penunjang/farmasinew/obatoperasi/simpan-resep', this.form)
        .then(resp => {
          this.loadingSimpan = false
          notifSuccess(resp)
          if (resp?.data.noresep) this.setForm('noresep', resp?.data.noresep)
          this.setForm('obats', [])
          this.getData(true)
          console.log('Simpan resep', resp?.data)
        })
        .catch(() => { this.loadingSimpan = false })
    },
    async selesai (item) {
      this.loadingSelesai = true
      item.loading = true
      await api.post('v1/simrs/penunjang/farmasinew/obatoperasi/selesai-resep', item)
        .then(resp => {
          this.loadingSelesai = false
          item.loading = false
          notifSuccess(resp)
          this.getData()
          console.log('Simpan resep', resp?.data)
        })
        .catch(() => {
          this.loadingSelesai = false
          item.loading = false
        })
    },
    async hapusObat (item) {
      item.loading = true
      this.loadingHapus = true
      await api.post('v1/simrs/penunjang/farmasinew/obatoperasi/batal-obat-resep', item)
        .then(resp => {
          item.loading = false
          this.filteredSudahs = []
          this.noresep = 'BARU'
          this.loadingHapus = false
          notifSuccess(resp)
          this.getData(true)
          const index = this.sudahs.findIndex(a => a.id === item.id)
          if (index >= 0) this.sudahs.splice(index, 1)
          console.log('Simpan resep', resp?.data, index)
        })
        .catch(() => {
          this.loadingHapus = false
          item.loading = false
        })
    }
  }
})
