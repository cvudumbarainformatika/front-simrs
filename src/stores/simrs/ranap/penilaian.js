import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { usePengunjungRanapStore } from './pengunjung'
import { notifSuccess } from 'src/modules/utils'

export const usePenilaianRanapStore = defineStore('penilaian-ranap-store', {
  state: () => ({
    usia: 0,
    items: {
      ranap: [],
      igd: []
    },

    form: null,

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
            console.log('mster penilaian', resp)

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

    initReset (pasien, data) {
      const ageInMonth = this.calculateAgeInMonths(pasien?.tglLahir ?? null)
      const usia = Math.floor(ageInMonth / 12)
      this.usia = usia

      this.form = {
        id: data?.id ?? null
      }

      // const barthels = []
      const formBarthel = {}
      // if (this.barthels?.form?.length > 0) {
      for (let i = 0; i < this.barthels?.form?.length; i++) {
        const el = this.barthels.form[i]
        if (data?.barthel) {
          formBarthel[el.kode] = el?.categories?.find(item => item.skor === data?.barthel[el.kode]?.skor) ?? el.categories[el.categories.length - 1] ?? null
        }
        else {
          formBarthel[el.kode] = el.categories[el.categories.length - 1] ?? null
        }
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
      let formHumpty = {}
      if (data?.humpty_dumpty) {
        formHumpty = { ...data?.humpty_dumpty }

        Object.keys(formHumpty).forEach(key => {
          // console.log('key humpty', key)
          formHumpty[key] = this.humptys?.form?.find(x => x.kode === key)?.categories?.find(x => x?.skor === formHumpty[key]?.skor) ?? null
        })
        // console.log('formHumpty', formHumpty)
      }
      else {
        for (let i = 0; i < this.humptys?.form?.length; i++) {
          const el = this.humptys.form[i]
          if (el.kode === 'usia') {
            formHumpty.usia = el.categories?.find(x => x?.skor === cat || x.skor === cat?.toString()) ?? null
          }
          else if (el.kode === 'kelamin') {
            formHumpty.kelamin = el.categories?.find(x => x?.label === pasien?.kelamin) ?? null
          }
          else {
            formHumpty[el.kode] = el.categories[el.categories.length - 1] ?? null
          }
        }
      }
      this.formHumpty = formHumpty
      // console.log('formHumpty', this.formHumpty)

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
      // console.log('arr', arr)

      const totalSkor = arr.reduce((a, b) => a + b?.skor, 0) ?? 0

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
        label: ket ?? null,
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

    async saveData (jnsKasus, pasien) {
      console.groupCollapsed('[setDataForm]')
      const frm = {
        barthel: (this.barthels.grupings?.includes(jnsKasus)) ? this.formBarthel : null,
        norton: (this.nortons.grupings?.includes(jnsKasus)) ? this.formNorton : null,
        humpty_dumpty: (this.humptys.grupings?.includes(jnsKasus) && (this.usia < 18)) ? this.formHumpty : null,
        morse_fall: (this.morses.grupings?.includes(jnsKasus) && (this.usia >= 18 && this.usia < 60)) ? this.formMorse : null,
        ontario: (this.ontarios.grupings?.includes(jnsKasus) && (this.usia >= 60)) ? this.formOntario : null,
        kdruang: pasien?.kdruangan ?? null,
        noreg: pasien?.noreg,
        norm: pasien?.norm,
        id: this.form?.id ?? null
      }
      console.log('ooi: ', this.humptys.grupings?.includes(jnsKasus))
      console.log('ooi2: ', jnsKasus, this.humptys.grupings?.includes(jnsKasus))

      console.log('form: ', frm)

      // const timeStamp = Date.now()
      const auth = useAplikasiStore()
      const pushSementara = {
        id: this.form?.id ?? null,
        noreg: pasien?.noreg,
        norm: pasien?.norm,
        kdruang: pasien?.kdruangan ?? null,
        ruangan: pasien?.ruangan ?? null,
        nakes: auth?.user?.pegawai?.kdgroupnakes,
        petugas: { nama: auth?.user?.nama }

      }

      // console.log('push frm sementara', pushSementara)

      const pengunjung = usePengunjungRanapStore()
      pengunjung.injectDataPasien(pasien?.noreg, pushSementara, 'penilaian')

      console.log('form, jenis kasus', frm, jnsKasus)

      try {
        const resp = await api.post('v1/simrs/ranap/layanan/pemeriksaan/penilaian/simpan', frm)
        console.log('simpan penilaian', resp)
        if (resp.status === 200) {
          notifSuccess(resp)
          const result = resp?.data?.result
          if (result.length) this.PISAH_DATA_RANAP_IGD(result, pasien)
        }
        this.loadingSave = false
      }
      catch (error) {
        console.log('error', error)
        // this.SPLICE_ITEMS_RANAP(this.items.ranap)
        this.loadingSave = false
      }

      console.groupEnd()
    },

    PISAH_DATA_RANAP_IGD (arr, pasien) {
      const auth = useAplikasiStore()
      const jns = auth?.user?.pegawai?.kdgroupnakes

      const igd = arr?.filter(x => x?.kdruang === 'POL014') ?? []
      const ranap = arr?.filter(x => x?.kdruang !== 'POL014' && x?.group_nakes === jns) ?? []

      this.items.igd = igd
      this.items.ranap = ranap

      console.log('items', this.items)

      const pengunjung = usePengunjungRanapStore()

      const form = ranap.length ? ranap[0] : null
      if (form) {
        pengunjung.injectDataPasien(pasien?.noreg, form, 'penilaian')
        pengunjung.deleteInjectanNull(pasien?.noreg, 'penilaian')
      }
      this.initReset(pasien, form)
    }

  }
})
