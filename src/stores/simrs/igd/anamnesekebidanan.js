import { defineStore } from 'pinia'

export const useAnamneseKebidananStore = defineStore('anamnese-kebidanan-store', {
  state: () => ({
    loadingForm: false,
    selection: [],
    alergis: ['Obat', 'Makanan', 'Udara', 'Lain-lain', 'Tidak ada Alergi'],
    form: {
      skor: 0
    }
  }),
  actions: {
    keteranganSkorGizi (nilai) {
      const skor = nilai || 0
      if (skor < 2) {
        return 'tidak beresiko malnutrisi'
      }
      else {
        return 'Beresiko malnutrisi'
      }
    },
    setForm (key, val) {
      this.form[key] = val
    },
    hitungNilaiSkor () {
      const skorKondKhusus = this.form.kondisikhusus.trim().length === 0 ? 0 : 2
      const skor = parseInt(this.form.skreeninggizi) + parseInt(this.form.asupanmakan) + parseInt(skorKondKhusus)
      this.form.skor = skor
    }
  }
})
