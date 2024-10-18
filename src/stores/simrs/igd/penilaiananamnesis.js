import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifErr, notifSuccess } from 'src/modules/utils'
import { usePengunjungIgdStore } from './pengunjung'
import { useAplikasiStore } from 'src/stores/app/aplikasi'

export const usePenilaianAnamnesisIgd = defineStore('penilaian_anamnesis_igd', {
  state: () => ({
    loadingForm: false,
    loadingHistory: false,
    items: [],
    skortotal: '',
    usia: 0,
    formpenilaians: {},
    humpty_dumpty: [],
    morse_fall: [],
    // form: {
    //   id: '',
    //   noreg: '',
    //   norm: '',
    //   barthel: '',
    //   norton: '',
    //   ontario: {},
    //   morse_fall: {},
    //   humpty_dumpty: {},
    //   kdruang: ''
    // },
    form: null,
    humptys: [],
    formHumpty: null,
    formMorse: null,
    formOntario: null
  }),
  actions: {
    async masterpenilaian () {
      this.loadingHistory = true
      try {
        const resp = await api.get('v1/simrs/master/penilaian')
        if (resp.status === 200) {
          if (resp.data?.length) {
            // this.items = resp.data
            // this.caripenilaian(this.usia, this.items)
            const arr = resp.data
            this.getGroupArray(arr)
            // this.caripenilaian(this.usia)
          }
          else {
            this.items = []
          }
        }
        this.loadingHistory = false
      }
      catch (error) {
        this.loadingHistory = false
        notifErr(error)
      }
    },
    getGroupArray (arr) {
      // this.barthels = arr?.find(item => item.kode === 'barthel') ?? null
      // this.nortons = arr?.find(item => item.kode === 'norton') ?? null
      this.humptys = arr?.find(item => item.kode === 'humpty_dumpty') ?? null
      this.morses = arr?.find(item => item.kode === 'morse_fall') ?? null
      this.ontarios = arr?.find(item => item.kode === 'ontario') ?? null
    },
    async saveDatax (pasien) {
      // console.log('noreg', pasien.noreg)
      this.loadingForm = true
      this.form.noreg = pasien ? pasien.noreg : ''
      this.form.norm = pasien ? pasien.norm : ''
      this.form.kdruang = 'POL014'

      try {
        const resp = await api.post('v1/simrs/ranap/layanan/pemeriksaan/penilaian/simpan', this.form)
        if (resp.status === 200) {
          const storePasien = usePengunjungIgdStore()
          const isix = resp.data.result
          const isi = isix[isix.length - 1]

          storePasien.injectDataPasien(pasien, isi, 'penilaiananamnesis')
          notifSuccess(resp)
          this.initResetx()
          this.loadingForm = false
        }
        this.loadingForm = false
      }
      catch (error) {
        this.loadingForm = false
        notifErr(error)
      }
    },
    caripenilaian (usia, itemform) {
      console.log('dadadaada', itemform)
      const usiaarr = usia.split(' ')
      const usiatahun = usiaarr[0]

      if (usiatahun <= 18) {
        // eslint-disable-next-line no-unused-vars
        const tampungsementara = itemform.find(({ kode }) => kode === 'humpty_dumpty')
        this.form.ontario = null
        this.form.morse_fall = null

        // const kodejudul = tampungsementara.kode
        // const descjudul = tampungsementara.desc
        // const parameter = itemform
        // const hasil
        // parameter.forEach(form => {
        //   const kodeparams = form?.kode
        //   const labelparams = form?.label
        //   const kategori = form?.categories
        //   const hasils = []
        //   kategori.forEach(isi => {
        //     // console.log('isi', isi)
        //     const hasil = {
        //       kodeparams,
        //       deskripsi: labelparams,
        //       kodeisian: isi?.label,
        //       skor: isi?.skor
        //     }

        //     hasils.push(hasil)
        //   })
        //   this.formpenilaians = hasils
        //   console.log('hasil', this.formpenilaians)
        // })
        let cat = 4
        if (usia <= 3) cat = 4
        else if (usia > 3 && usia <= 7) cat = 3
        else if (usia > 7 && usia <= 12) cat = 2
        // eslint-disable-next-line no-unused-vars
        else if (usia >= 13) cat = 1

        let formHumpty = {}

        // if (parameter?.humpty_dumpty) {
        formHumpty = { ...this.humptys }
        console.log('formHumptys', formHumpty)

        Object.keys(formHumpty).forEach(key => {
          console.log('key humpty', key)
          formHumpty[key] = this.humptys?.form?.find(x => x.kode === key)?.categories?.find(x => x?.skor === formHumpty[key]?.skor) ?? null
          console.log('formHumpty', formHumpty[key])
        })

        // }
        // else {
        //   for (let i = 0; i < this.humptys?.form?.length; i++) {
        //     const el = this.humptys.form[i]
        //     if (el.kode === 'usia') {
        //       formHumpty.usia = el.categories?.find(x => x?.skor === cat || x.skor === cat?.toString()) ?? null
        //     }
        //     else if (el.kode === 'kelamin') {
        //       formHumpty.kelamin = el.categories?.find(x => x?.label === pasien?.kelamin) ?? null
        //     }
        //     else {
        //       formHumpty[el.kode] = el.categories[el.categories.length - 1] ?? null
        //     }
        //   }
        // }
        this.formHumpty = formHumpty
        console.log('sa', this.formHumpty)
      }
      else if (usiatahun > 18 && usiatahun <= 60) {
        this.formpenilaians = itemform.find(({ kode }) => kode === 'morse_fall')
        this.form.ontario = null
        this.form.humpty_dumpty = null
      }
      else {
        this.formpenilaians = itemform.find(({ kode }) => kode === 'ontario')
        this.form.morse_fall = null
        this.form.humpty_dumpty = null
      }
      this.formpenilaians.form.forEach(x => {
        this.form[this.formpenilaians.kode][x.kode] = {}
        if (x?.submenu?.length > 0) {
          x?.submenu?.forEach(y => {
            this.form[this.formpenilaians.kode][x.kode][y.kode] = {}
          })
        }
      })
    },
    setForm (key, val) {
      this.form[key] = val
    },
    initResetx () {
      this.form = null
      return new Promise((resolve, reject) => {
        this.form = {
          noreg: '',
          norm: '',
          barthel: '',
          norton: '',
          ontario: {},
          morse_fall: {},
          humpty_dumpty: {},
          kdruang: ''
        }
        this.selection = []

        resolve()
      })
    },
    async deleteData (pasien, id) {
      const payload = { id }
      try {
        const resp = await api.post('v1/simrs/ranap/layanan/pemeriksaan/penilaian/hapus', payload)
        // console.log(resp)
        if (resp.status === 200) {
          const storePasien = usePengunjungIgdStore()
          storePasien.hapusDataPenilaian(pasien, id)
          notifSuccess(resp)
        }
      }
      catch (error) {
        notifErr(error)
      }
    },
    initReset (pasien, data) {
      const usia = this.usia

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
        console.log('formHumpty', formHumpty)
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

      // this.hitungSkorBarthel()
      // this.hitungSkorNorton()
      this.hitungSkorHumpty()
      this.hitungSkorMorse()
      this.hitungSkorOntario()
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

      const rwytJth = ['riwayatJth_a', 'riwayatJth_b']
      let gbng1 = arr.filter((xx) => rwytJth.includes(xx)).map(x => this.formOntario[x]).reduce((a, b) => a + b?.skor, 0)
      gbng1 >= 6 ? gbng1 = 6 : gbng1 = 0

      const mental = ['statusMental_a', 'statusMental_b', 'statusMental_c']
      let gbng2 = arr.filter((xx) => mental.includes(xx)).map(x => this.formOntario[x]).reduce((a, b) => a + b?.skor, 0)
      gbng2 >= 14 ? gbng2 = 14 : gbng2 = 0

      const pnglihatan = ['penglihatan_a', 'penglihatan_b', 'penglihatan_c']
      const gbng3 = arr.filter((xx) => pnglihatan.includes(xx)).map(x => this.formOntario[x]).reduce((a, b) => a + b?.skor, 0) >= 1 ? 1 : 0
      // gbng3 >= 1 ? gbng3 = 1 : gbng3 = 0

      const kemih = ['berkemih_a']
      let gbng4 = arr.filter((xx) => kemih.includes(xx)).map(x => this.formOntario[x]).reduce((a, b) => a + b?.skor, 0)
      gbng4 >= 2 ? gbng4 = 2 : gbng4 = 0

      // console.log('arr gabung', gbng3)
      // console.log('arr ontario 2', skor2)
      console.log('arr', arr)

      const elim = ['transfertk', 'mobilitas']
      // const skor1 = arr.filter((l) => (elim.every(y => !l.toLowerCase().includes(y.toLowerCase())))).map(key => this.formOntario[key]).reduce((a, b) => a + b?.skor, 0)
      let skor2 = elim.map(key => this.formOntario[key]).reduce((a, b) => a + b?.skor, 0)

      if (skor2 >= 0 && skor2 <= 3) {
        skor2 = 0
      }
      else if (skor2 >= 4 && skor2 <= 6) {
        skor2 = 7
      }

      const totalSkor = (gbng1 + gbng2 + gbng3 + gbng4) + (skor2)

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
    async saveData (pasien) {
      console.groupCollapsed('[setDataForm]')
      const frm = {
        // barthel: (this.barthels.grupings) ? this.formBarthel : null,
        // norton: (this.nortons.grupings) ? this.formNorton : null,
        humpty_dumpty: (this.humptys.grupings && (this.usia < 18)) ? this.formHumpty : null,
        morse_fall: (this.morses.grupings && (this.usia >= 18 && this.usia < 60)) ? this.formMorse : null,
        ontario: (this.ontarios.grupings && (this.usia >= 60)) ? this.formOntario : null,
        kdruang: 'POL014',
        noreg: pasien?.noreg,
        norm: pasien?.norm,
        awal: '1',
        id: this.form?.id ?? null
      }
      // console.log('ooi: ', this.humptys.grupings)
      // console.log('ooi2: ', jnsKasus, this.humptys.grupings)

      // console.log('form: ', frm)

      // const timeStamp = Date.now()
      const auth = useAplikasiStore()
      const pushSementara = {
        id: this.form?.id ?? null,
        noreg: pasien?.noreg,
        norm: pasien?.norm,
        kdruang: 'POL014',
        ruangan: pasien?.ruangan ?? null,
        nakes: auth?.user?.pegawai?.kdgroupnakes,
        petugas: { nama: auth?.user?.nama }

      }

      // console.log('push frm sementara', pushSementara)

      const pengunjung = usePengunjungIgdStore()
      pengunjung.injectDataPasien(pasien?.noreg, pushSementara, 'penilaiananamnesis')

      // console.log('form, jenis kasus', frm, jnsKasus)

      try {
        const resp = await api.post('v1/simrs/ranap/layanan/pemeriksaan/penilaian/simpan', frm)
        console.log('simpan penilaian', resp)
        if (resp.status === 200) {
          notifSuccess(resp)
          const result = resp?.data?.result
          const pengunjung = usePengunjungIgdStore()
          const isi = result[result.length - 1]
          pengunjung.injectDataPasien(pasien, isi, 'penilaiananamnesis')
          // storePasien.injectDataPasien(pasien, isi, 'penilaiananamnesis')
        }
        this.loadingSave = false
      }
      catch (error) {
        console.log('error', error)
        // this.SPLICE_ITEMS_RANAP(this.items.ranap)
        this.loadingSave = false
      }

      console.groupEnd()
    }
  }
})
