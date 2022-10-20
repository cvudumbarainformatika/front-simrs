import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'

export const useTransaksiPermintaanForm = defineStore('form_transaksi_permintaan', {
  state: () => ({
    isOpen: true,
    loading: false,
    form: {
      tanggal: date.formatDate(Date.now(), 'YYYY-MM-DD')
    },
    tanggal: date.formatDate(Date.now(), 'DD MMMM YYYY'),
    penggunas: []
  }),
  actions: {
    setForm(key, val) {
      this.form[key] = val
    },
    newData() {},
    editData() {},

    setSearch(val) {},
    pilihPenanggungjawab(val) {},
    getPenggunas() {
      return new Promise((resolve) => {
        api.get('v1/pengguna/penanggungjawab').then((resp) => {
          console.log('pengguna permintaan', resp.data)
          if (resp.status === 200) {
            this.penggunas = resp.data
            resolve(resp)
          }
        })
      })
    }
  }
})
