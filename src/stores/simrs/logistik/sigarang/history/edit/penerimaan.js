import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { findWithAttr } from 'src/modules/utils'
import { useHistoryTable } from 'src/stores/simrs/logistik/sigarang/history/table'

export const useEditPenerimaanStore = defineStore('edit_penerimaan', {
  state: () => ({
    loading: false,
    loadingNoPenerimaan: false,
    loadingDetailPemesanan: false,
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
      this.setForm('id', val.id)
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
      this.cariPesanan()
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
            const jumlahNomorPenerimaan = resp.data.jumlah
            console.log('jumlah nomor penerimaan', resp)
            const temp = val.split('SP-')
            if (jumlahNomorPenerimaan > 0) {
              this.form.no_penerimaan = temp[0] + 'BAST-' + temp[1] + '-' + jumlahNomorPenerimaan
            } else {
              this.form.no_penerimaan = temp[0] + 'BAST-' + temp[1]
            }
            console.log('val', temp)
          })
      } catch (a) {
        this.loadingNoPenerimaan = false
      }
    },
    cariPesanan() {
      this.loadingDetailPemesanan = true
      const temp = this.form
      // temp.detail = this.item.details
      console.log('temp', temp)
      const params = { params: temp }
      return new Promise(resolve => {
        api.get('v1/transaksi/penerimaan/cari-detail-pesanan', params)
          .then(resp => {
            this.loadingDetailPemesanan = false
            console.log('pesanan', resp.data)
            const detailPesanan = resp.data
            console.log('detail', detailPesanan)
            resolve(resp.data)
            this.item.details.map(det => {
              det.dipesan = detailPesanan.filter(a => a.kode_rs === det.kode_rs).map(y => y.qty).reduce((m, n) => m + n, 0)

              return det
            })
            console.log('item', this.item)
          })
          .catch(() => { this.loadingDetailPemesanan = false })
      })
    },
    simpanHeader() {
      console.log('simpan header', this.form)
    }
  }
})
