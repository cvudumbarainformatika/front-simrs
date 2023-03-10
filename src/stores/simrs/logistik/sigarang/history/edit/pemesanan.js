import { defineStore } from 'pinia'

export const useEditPemesananStore = defineStore('edit_pemesanan', {
  state: () => ({
    isOpen: false,
    index: null,
    loading: false,
    item: {},
    form: {
      nama: 'PEMESANAN'
    }
  }),
  /* catatan:
  * barang yang sudah diterima ada penerimaan tidak bisa di edit
  * no pemesanan, kontrak yang sudah ada penerimaan tidak bisa di edit
  */
  actions: {
    setForm(key, val) {
      this.form[key] = val
    },
    setOpen() {
      this.isOpen = !this.isOpen
    },
    assignForm(val, i) {
      console.log(val)
      this.index = i
      this.item = val
      this.setForm('reff', val.reff)
      this.setForm('kontrak', val.kontrak)
      this.setForm('nomor', val.nomor)
      this.setForm('tanggal', val.tanggal)
      this.setForm('kode_perusahaan', val.kode_perusahaan)
    }
  }

})
