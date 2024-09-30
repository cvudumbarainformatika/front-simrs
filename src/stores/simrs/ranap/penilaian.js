import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const usePenilaianRanapStore = defineStore('penilaian-ranap-store', {
  state: () => ({

    barthels: [],
    formBarthel: null,

    nortons: [],
    formNorton: null,

    humptys: [],
    formHumpty: null,

    morses: [],
    formMorse: null,

    ontarios: [],
    formOntario: null,

    yaTidaks: ['Ya', 'Tidak'],
    adaTidaks: ['Ada', 'Tidak Ada']

  }),
  getters: {
    // doubleCount: (state) => state.counter * 2
  },
  actions: {

    getMaster () {
      return new Promise((resolve, reject) => {
        api.get('v1/simrs/master/penilaian')
          .then(resp => {
            console.log('resp', resp)

            if (resp.status === 200) {
              const arr = resp.data
              this.getGroupArray(arr)
            }
            resolve(resp.data)
          }).catch(err => {
            console.log('err', err)

            reject(err)
          })
      })
    },

    getGroupArray (arr) {
      this.barthels = arr?.find(item => item.kode === 'barthel') ?? null
      this.nortons = arr?.find(item => item.kode === 'norton') ?? null
      this.humptys = arr?.find(item => item.kode === 'humpty_dumpty') ?? null
      this.morses = arr?.find(item => item.kode === 'morse_fall') ?? null
      this.ontarios = arr?.find(item => item.kode === 'ontario') ?? null
    },

    calculateAgeInMonths (birthdate, day) {
      if (!birthdate) return 0 // !birthdate return null
      const today = day ?? new Date()
      const birthdateObj = new Date(birthdate)

      // Menghitung jumlah bulan antara tanggal lahir dan tanggal saat ini
      const months = today.getFullYear() * 12 + today.getMonth() -
        birthdateObj.getFullYear() * 12 - birthdateObj.getMonth()
      return months
    },

    initReset (pasien) {
      const ageInMonth = this.calculateAgeInMonths(pasien?.tglLahir ?? null)
      const usia = Math.floor(ageInMonth / 12)

      // const barthels = []
      const formBarthel = {}
      // if (this.barthels?.form?.length > 0) {
      for (let i = 0; i < this.barthels?.form?.length; i++) {
        const el = this.barthels.form[i]
        formBarthel[el.kode] = el.categories[el.categories.length - 1]
      }
      // formBarthel['kode'] = usia
      this.formBarthel = formBarthel

      // norton
      const formNorton = {}
      for (let i = 0; i < this.nortons?.form?.length; i++) {
        const el = this.nortons.form[i]
        formNorton[el.kode] = el.categories[0]
        // this.formNorton = { ...this.formNorton, [el?.kode]: el.categories[el.categories.length - 1] }
      }
      this.formNorton = formNorton

      let cat = 4
      if (usia <= 3) cat = 4
      else if (usia > 3 && usia <= 7) cat = 3
      else if (usia > 7 && usia <= 12) cat = 2
      else if (usia >= 13) cat = 1

      // console.log('humptys', this.humptys)
      // console.log('humptys pasien', pasien?.kelamin)
      const formHumpty = {}
      for (let i = 0; i < this.humptys?.form?.length; i++) {
        const el = this.humptys.form[i]
        if (el.kode === 'usia') {
          formHumpty.usia = el.categories?.find(x => x?.skor === cat || x.skor === cat?.toString())
        }
        else if (el.kode === 'kelamin') {
          formHumpty.kelamin = el.categories?.find(x => x?.label === pasien?.kelamin) ?? null
        }
        else {
          formHumpty[el.kode] = el.categories[el.categories.length - 1]
        }
      }
      this.formHumpty = formHumpty

      // morse-fall
      const formMorse = {}
      for (let i = 0; i < this.morses?.form?.length; i++) {
        const el = this.morses.form[i]
        formMorse[el.kode] = el.categories[0]
      }
      this.formMorse = formMorse

      // ontario
      const formOntario = {}
      for (let i = 0; i < this.ontarios?.form?.length; i++) {
        const el = this.ontarios.form[i]
        if (el.submenu.length) {
          for (let n = 0; n < el.submenu.length; n++) {
            const sub = el.submenu[n]
            formOntario[sub.kode] = sub.categories?.find(x => x?.skor === 0)
          }
        }
        else {
          formOntario[el.kode] = el.categories?.find(x => x?.skor === 0)
        }
      }
      this.formOntario = formOntario

      // console.log('formOntario', this.formOntario)

      this.hitungSkorBarthel()
      this.hitungSkorNorton()
      this.hitungSkorHumpty()
      this.hitungSkorMorse()
      this.hitungSkorOntario()
    },

    hitungSkorBarthel () {
      let ket = null
      let result = {
        label: ket,
        skor: 0
      }

      this.formBarthel.skorBarthel = result

      // console.log('formBarthel', this.formBarthel)

      const arr = Object.keys(this.formBarthel).map(key => this.formBarthel[key])
      const totalSkor = arr.reduce((a, b) => a + b?.skor, 0)

      if (totalSkor >= 0 && totalSkor <= 4) {
        ket = 'Ketergantungan Total'
      }
      else if (totalSkor >= 5 && totalSkor <= 8) {
        ket = 'Ketergantungan Berat'
      }
      else if (totalSkor >= 9 && totalSkor <= 11) {
        ket = 'Ketergantungan Sedang'
      }
      else if (totalSkor >= 12 && totalSkor <= 19) {
        ket = 'Ketergantungan Ringan'
      }
      else if (totalSkor === 20) {
        ket = 'Mandiri'
      }
      else if (isNaN(totalSkor) || totalSkor > 20) {
        ket = 'Belum Ada Skor'
      }

      result = {
        label: ket,
        skor: totalSkor
      }

      this.formBarthel.skorBarthel = result

      // console.log('formBarthel2', this.formBarthel)
    },
    hitungSkorNorton () {
      let ket = null
      let result = {
        skor: 0,
        label: ket
      }

      this.formNorton.skorNorton = result
      const arr = Object.keys(this.formNorton).map(key => this.formNorton[key])
      const totalSkor = arr.reduce((a, b) => a + b?.skor, 0)

      if (totalSkor >= 14) {
        ket = 'Risiko kecil'
      }
      else if (totalSkor >= 12 && totalSkor <= 13) {
        ket = 'Risiko sedang'
      }
      else if (totalSkor < 12) {
        ket = 'peningkatan risiko 50x lebih besar terjadinya ulkus dekubitus'
      }

      result = {
        skor: totalSkor,
        label: ket
      }
      this.formNorton.skorNorton = result
    },

    hitungSkorHumpty () {
      let ket = null
      let kuning = false
      let result = {
        skor: 0,
        label: ket,
        kuning: false
      }

      this.formHumpty.skorHumpty = result
      const arr = Object.keys(this.formHumpty).map(key => this.formHumpty[key])
      const totalSkor = arr.reduce((a, b) => a + b?.skor, 0)

      if (totalSkor >= 6 && totalSkor <= 11) {
        ket = 'Risiko rendah'
        kuning = false
      }
      else if (totalSkor >= 12) {
        ket = 'Risiko tinggi'
        kuning = true
      }
      result = {
        skor: totalSkor,
        label: ket,
        kuning
      }
      this.formHumpty.skorHumpty = result
    },
    hitungSkorMorse () {
      let ket = null
      let kuning = false
      let result = {
        skor: 0,
        label: ket,
        kuning: false
      }

      this.formMorse.skorMorse = result
      const arr = Object.keys(this.formMorse).map(key => this.formMorse[key])
      const totalSkor = arr.reduce((a, b) => a + b?.skor, 0)

      if (totalSkor >= 45) {
        ket = 'Risiko tinggi'
        kuning = true
      }
      else if (totalSkor >= 25 && totalSkor <= 44) {
        ket = 'Risiko sedang'
        kuning = false
      }
      else if (totalSkor < 25) {
        ket = 'Risiko rendah'
        kuning = false
      }
      result = {
        skor: totalSkor,
        label: ket,
        kuning
      }
      this.formMorse.skorMorse = result
    },
    hitungSkorOntario () {
      let ket = null
      let kuning = false
      let result = {
        skor: 0,
        label: ket,
        kuning: false
      }

      this.formOntario.skorOntario = result
      // const arr = Object.keys(this.formOntario).map(key => this.formOntario[key])
      const arr = Object.keys(this.formOntario)
      const elim = ['transfertk', 'mobilitas']
      const skor1 = arr.filter((l) => (elim.every(y => !l.toLowerCase().includes(y.toLowerCase())))).map(key => this.formOntario[key]).reduce((a, b) => a + b?.skor, 0)
      let skor2 = elim.map(key => this.formOntario[key]).reduce((a, b) => a + b?.skor, 0)
      // console.log('arr ontario', skor1)
      // console.log('arr ontario 2', skor2)
      // console.log('arr', arr)
      if (skor2 >= 0 && skor2 <= 3) {
        skor2 = 3
      }
      else if (skor2 >= 4 && skor2 <= 6) {
        skor2 = 7
      }

      const totalSkor = skor1 + skor2

      if (totalSkor >= 17) {
        ket = 'Risiko tinggi'
        kuning = true
      }
      else if (totalSkor >= 6 && totalSkor <= 16) {
        ket = 'Risiko sedang'
        kuning = false
      }
      else if (totalSkor < 6) {
        ket = 'Risiko rendah'
        kuning = false
      }
      result = {
        skor: totalSkor,
        label: ket,
        kuning
      }
      this.formOntario.skorOntario = result
      // console.log('result ontario', this.formOntario)
    },

    saveData () {
      console.groupCollapsed('[setDataForm]')
      const form = {
        barthel: this.formBarthel ?? null,
        norton: this.formNorton ?? null,
        humpty_dumpty: this.formHumpty ?? null,
        morse_fall: this.formMorse ?? null,
        ontario: this.formOntario ?? null
      }

      console.log('form: ', form)
      console.groupEnd()
    }

  }
})
