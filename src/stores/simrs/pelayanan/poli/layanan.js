import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { usePengunjungPoliStore } from './pengunjung'
import { notifSuccess } from 'src/modules/utils'
// import { api } from 'src/boot/axios'

export const useLayananPoli = defineStore('layanan-poli', {
  state: () => ({
    tab: 'Diagnosa',
    tabs: ['Diagnosa', 'Tindakan'],
    // diagnosa
    searchdiagnosa: '',
    listDiagnosa: [],
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
    formtindakan: {
      tindakan: '',
      tarif: 0,
      jumlah: 1,
      subtotal: 0,
      pelaksana: '',
      keterangan: ''
    },

    inacbg: {
      code: '',
      tarifIna: 0,
      tarifRs: 0
    }
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
            // 'rs1' => $request->noreg,
            // 'rs2' => $request->norm,
            // 'rs3' => $request->kddiagnosa,
            // 'rs4' => $request->tipediagnosa,
            // 'rs6' => $request->keterangan ?? '',
            // 'rs7' => $request->kasus,
            // 'rs8'  => auth()->user()->pegawai_id,
            // 'rs9' => $request->dtd ?? '',
            // 'rs10' => '',
            // 'rs12' => date('Y-m-d'),
            // 'rs13' => $request -> ruangan
            // form.rs1 = form.noreg
            // form.rs2 = form.norm
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
        storePasien.hapusDataDiagnosa(pasien, id)
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

    initReset() {
      return new Promise((resolve, reject) => {
        this.tab = 'Diagnosa'
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
          tindakan: '',
          tarif: 0,
          jumlah: 1,
          subtotal: 0,
          pelaksana: '',
          keterangan: ''
        }

        resolve()
      })
    }

  }
})
