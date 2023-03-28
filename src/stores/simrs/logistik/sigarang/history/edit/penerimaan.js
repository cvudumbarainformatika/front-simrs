import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { findWithAttr } from 'src/modules/utils'
import { useHistoryTable } from 'src/stores/simrs/logistik/sigarang/history/table'

export const useEditPenerimaanStore = defineStore('edit_penerimaan', {
  state: () => ({
    loading: false,
    loadingNoPenerimaan: false,
    isOpen: false,
    form: {
      nama: 'PENERIMAAN'
    },
    item: {},
    table: useHistoryTable()

  }),
  actions: {
    setOpen() {
      this.isOpen = !this.isOpen
    },
    setForm(key, val) {
      this.form[key] = val
    },
    assignForm(val, i) {
      const index = findWithAttr(this.table.items, 'id', val.id)
      this.item = val
      console.log('assign', index, i, val)
      this.item = val
      this.setForm('reff', val.reff)
      this.setForm('kontrak', val.kontrak)
      this.setForm('nomor', val.nomor)
      this.setForm('no_penerimaan', val.no_penerimaan)
      this.setForm('tanggal', val.tanggal)
      this.setForm('kode_perusahaan', val.kode_perusahaan)
      this.setForm('pengirim', val.pengirim)
      this.setForm('surat_jalan', val.surat_jalan)
      this.setForm('tanggal_surat', val.tanggal_surat)
      this.setForm('faktur', val.faktur)
      this.setForm('tempo', val.tempo)
      // this.getItemsDetail()
    },

    // api related function

    async getJumlahNomorPenerimaan(val) {
      const params = {
        params: { nomor: val }
      }
      this.loadingNoPenerimaan = true
      try {
        await api.get('v1/transaksi/penerimaan/jumlah-penerimaan', params)
          .then(resp => {
            this.loadingNoPenerimaan = false
            this.form.jumlahNomorPenerimaan = resp.data.jumlah
            console.log('jumlah nomor penerimaan', resp)
            const temp = val.split('sp')
            console.log('val', temp)
          })
      } catch (a) {
        this.loadingNoPenerimaan = false
      }
    }
  }
})
