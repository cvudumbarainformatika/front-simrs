import { defineStore } from 'pinia'

export const useEditPenerimaanStore = defineStore('edit_penerimaan', {
  state: () => ({
    loading: false,
    isOpen: false,
    form: {
      nama: 'PENERIMAAN'
    }
  }),
  actions: {
    setOpen() {
      this.isOpen = !this.isOpen
    },
    assignForm(val, i) {
      console.log(val)
      // this.index = i
      // this.item = val
      // this.setForm('reff', val.reff)
      // this.setForm('kontrak', val.kontrak)
      // this.setForm('nomor', val.nomor)
      // this.setForm('tanggal', val.tanggal)
      // this.setForm('kode_perusahaan', val.kode_perusahaan)
      // this.getItemsDetail()
    }
  }
})
