import { defineStore } from 'pinia'
import { date } from 'quasar'

export const useExtraAbsensiLiburStore = defineStore('extra_absensi_libur', {
  state: () => ({
    loading: false,
    isOpen: false,
    form: {},
    params: {
      q: '',
      page: 1,
      per_page: 10,
      order_by: 'created_at',
      sort: 'desc',
      tahun: date.formatDate(new Date(), 'YYYY')
    }
  }),
  actions: {
    resetFORM() {
      this.form = {}
      const columns = ['prota_id', 'user_id', 'tanggal']
      for (let i = 0; i < columns.length; i++) {
        this.setForm(columns[i], null)
      }
    },
    setParam(key, payload) {
      this.params[key] = payload
    },
    setOpen() {
      this.isOpen = !this.isOpen
    },
    setForm(key, payload) {
      this.form[key] = payload
    }
  }
})
