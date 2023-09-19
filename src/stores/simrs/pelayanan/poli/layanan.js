import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { usePengunjungPoliStore } from './pengunjung'
import { useInacbgPoli } from './inacbg'
import { notifSuccess } from 'src/modules/utils'
// import { api } from 'src/boot/axios'

export const useLayananPoli = defineStore('layanan-poli', {
  state: () => ({
    tab: 'Diagnosa',
    tabs: ['Diagnosa', 'Tindakan'],
    // diagnosa
    searchdiagnosa: '',
    listDiagnosa: [],
    listTindakan: [],
    loadingFormDiagnosa: false,
    formdiagnosa: {
      kddiagnosa: '',
      diagnosa: '',
      keterangan: '',
      kasus: 'Baru',
      tipediagnosa: 'Primer',
      dtd: ''
    },
    // tindakan
    searchtindakan: '',
    notaTindakans: [],
    notaTindakan: 'BARU',
    formtindakan: {
      kdtindakan: '',
      tindakan: '',
      biaya: 0,
      hargasarana: 0,
      tarif: 0,
      hargapelayanan: 0,
      jmltindakan: 1,
      subtotal: 0,
      // pelaksana: '',
      keterangan: ''
    },
    loadingFormTindakan: false

  }),
  // getters: {
  //   doubleCount: (state) => state.counter * 2
  // },
  actions: {

    async getDiagnosaDropdown() {
      const resp = await api.get('v1/simrs/pelayanan/listdiagnosa')
      if (resp.status === 200) {
        this.listDiagnosa = resp.data
      }
    },
    async getTindakanDropdown() {
      const resp = await api.get('v1/simrs/pelayanan/dialogtindakanpoli')
      console.log('list tindakan', resp)
      if (resp.status === 200) {
        this.listTindakan = resp.data
      }
    },

    setKode(val) {
      this.formdiagnosa.kddiagnosa = val
      const ada = this.listDiagnosa.length > 0
      if (ada) {
        const target = this.listDiagnosa.filter(x => x.kode === val)
        target.length
          ? this.formdiagnosa.diagnosa = target[0].keterangan
          : this.formdiagnosa.diagnosa = ''
        target.length
          ? this.formdiagnosa.dtd = target[0].dtd ? target[0].dtd : ''
          : this.formdiagnosa.dtd = ''
      }
    },

    setKdTindakan(val) {
      this.formtindakan.kdtindakan = val
      const ada = this.listTindakan.length > 0
      if (ada) {
        const target = this.listTindakan.filter(x => x.kdtindakan === val)
        target.length
          ? this.formtindakan.tindakan = target[0].tindakan
          : this.formtindakan.tindakan = ''
        target.length
          ? this.formtindakan.tarif = target[0].tarif
          : this.formtindakan.tarif = 0
        target.length
          ? this.formtindakan.hargasarana = target[0].sarana
          : this.formtindakan.sarana = 0
        target.length
          ? this.formtindakan.hargapelayanan = target[0].pelayanan
          : this.formtindakan.pelayanan = 0
        target.length
          ? this.formtindakan.biaya = (parseInt(target[0].pelayanan) + parseInt(target[0].sarana))
          : this.formtindakan.biaya = 0
        target.length
          ? this.formtindakan.subtotal = parseInt(this.formtindakan.biaya) * this.formtindakan.jumlah
          : this.formtindakan.subtotal = 0
      }

      console.log('setKdTindakana', this.formtindakan)
      return new Promise((resolve, reject) => {
        resolve()
      })
    },

    async simpanDiagnosa(pasien) {
      const form = this.formdiagnosa
      form.noreg = pasien?.noreg
      form.norm = pasien?.norm
      form.ruangan = pasien?.kodepoli
      console.log('sdiag', form)

      this.loadingFormDiagnosa = true
      try {
        const resp = await api.post('v1/simrs/pelayanan/simpandiagnosa', form)
        console.log(resp)
        if (resp.status === 200) {
          console.log('simpan diagnosa', resp)
          const storePasien = usePengunjungPoliStore()
          let isi = resp.data.result
          if (resp.data.result === 1) {
            form.rs3 = form.kddiagnosa
            form.rs4 = form.tipediagnosa
            form.rs6 = form.keterangan
            form.rs7 = form.kasus
            form.rs9 = form.dtd
            form.masterdiagnosa = { rs4: form.diagnosa }
            isi = form
          }
          isi.masterdiagnosa = { rs4: form.diagnosa }
          storePasien.injectDataPasien(pasien, isi, 'diagnosa')
          notifSuccess(resp)
          this.initReset()
          this.loadingFormDiagnosa = false

          if (resp.data.inacbg?.metadata?.code === 200) {
            const storeIna = useInacbgPoli()
            storeIna.setIna(resp.data.inacbg?.response)
          }

          return new Promise((resolve, reject) => {
            resolve()
          })
        }
        this.loadingFormDiagnosa = false
      } catch (error) {
        console.log(error)
        this.loadingFormDiagnosa = false
      }
    },

    async deleteDiagnosa(pasien, id) {
      const payload = { id }
      const resp = await api.post('v1/simrs/pelayanan/hapusdiagnosa', payload)
      if (resp.status === 200) {
        const storePasien = usePengunjungPoliStore()
        const storeIna = useInacbgPoli()
        storePasien.hapusDataDiagnosa(pasien, id)
        storeIna.getDataIna(pasien)
        notifSuccess(resp)
      }
    },

    editFormDiagnosa(val) {
      this.formdiagnosa = {
        id: val.id,
        kddiagnosa: val.rs3,
        diagnosa: val.masterdiagnosa?.rs4,
        keterangan: val.rs6,
        dtd: val.rs9,
        kasus: val.rs7,
        tipediagnosa: val.rs4
      }
      console.log('form', this.form)
      console.log('xxx', val)
    },

    // ==================================================================================== TINDAKAN =========================================================================

    async saveTindakan(pasien) {
      this.loadingFormTindakan = true

      const form = this.formtindakan
      form.noreg = pasien.noreg
      form.norm = pasien.norm
      form.kdpoli = pasien?.kodepoli
      form.kdsistembayar = pasien?.kodesistembayar
      form.nota = this.notaTindakan === 'BARU' || this.notaTindakan === '' ? '' : this.notaTindakan //
      try {
        const resp = await api.post('v1/simrs/pelayanan/simpantindakanpoli', form)
        console.log('simpan tindakan', resp)
        if (resp.status === 200) {
          const storePasien = usePengunjungPoliStore()
          const isi = resp?.data?.result
          isi.mastertindakan = { rs2: form.tindakan }
          storePasien.injectDataPasien(pasien, isi, 'tindakan')
          this.setNotas(resp?.data?.nota)
          notifSuccess(resp)
          this.loadingFormTindakan = false
          this.initReset('Tindakan')
        }
        this.loadingFormTindakan = false
      } catch (error) {
        this.loadingFormTindakan = false
      }
    },

    async getNota(pasien) {
      const params = {
        params: {
          noreg: pasien?.noreg
        }
      }

      const resp = await api.get('v1/simrs/pelayanan/notatindakan', params)
      console.log('notas', resp)
      if (resp.status === 200) {
        const arr = resp.data.map(x => x.nota)
        this.notaTindakans = arr.length ? arr : []
        this.notaTindakans.push('BARU')
        this.notaTindakan = this.notaTindakans[0]
      }
    },

    async hapusTindakan(pasien, id) {
      const payload = { id, noreg: pasien?.noreg }

      try {
        const resp = await api.post('v1/simrs/pelayanan/hapustindakanpoli', payload)
        console.log(resp)
        if (resp.status === 200) {
          const storePasien = usePengunjungPoliStore()
          storePasien.hapusDataTindakan(pasien, id)
          this.setNotas(resp?.data?.nota)
          notifSuccess(resp)
        }
      } catch (error) {
        console.log('hapus tindakan poli', error)
      }
    },

    setNotas(array) {
      const arr = array.map(x => x.nota)
      this.notaTindakans = arr.length ? arr : []
      this.notaTindakans.push('BARU')
      this.notaTindakan = this.notaTindakans[0]
    },

    initReset(x) {
      const tabbed = x ?? 'Diagnosa'
      return new Promise((resolve, reject) => {
        this.tab = tabbed
        this.tabs = ['Diagnosa', 'Tindakan']

        this.searchdiagnosa = ''
        this.formdiagnosa = {
          kddiagnosa: '',
          diagnosa: '',
          keterangan: '',
          kasus: 'Baru',
          tipediagnosa: 'Primer',
          dtd: ''
        }
        // tindakan
        this.searchtindakan = ''
        this.formtindakan = {
          kdtindakan: '',
          tindakan: '',
          biaya: 0,
          hargasarana: 0,
          tarif: 0,
          hargapelayanan: 0,
          jmltindakan: 1,
          subtotal: 0,
          // pelaksana: '',
          keterangan: ''
        }

        resolve()
      })
    }

  }
})
