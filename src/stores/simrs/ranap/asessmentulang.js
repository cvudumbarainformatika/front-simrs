import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { useAnamnesisRanapStore } from './anamnesis'
// eslint-disable-next-line no-unused-vars
import { usePengunjungRanapStore } from './pengunjung'
import { usePemeriksaanUmumRanapStore } from './pemeriksaanumum'
import { usePenilaianRanapStore } from './penilaian'

export const useAsessmentUlangRanapStore = defineStore('asesment-ulang-ranap-store', {
  state: () => ({

    items: [],
    previousData: null,
    loadingSave: false,

    form: {
      asessment: null,
      diagnosa: null,
      laboratorium: null,
      radiologi: null,
      terapi: null,
      plann: null,
      instruksi: null
    }

  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
    // async getData (pasien) {
    //   const resp = await api.get(`v1/simrs/ranap/layanan/cppt/listcppt?noreg=${pasien?.noreg}`)
    //   console.log('data cppt', resp)
    //   if (resp.status === 200) {
    //     this.items = resp.data
    //     const pengunjung = usePengunjungRanapStore()
    //     for (let i = 0; i < resp?.data?.length; i++) {
    //       const isi = resp?.data[i]
    //       pengunjung?.injectDataPasien(pasien?.noreg, isi, 'cppt')
    //     }
    //   }
    // },

    getCppt (cppt) {
      this.items = cppt ?? []
    },

    getPreviousForm (pasien) {
      const dataAwal = {
        anamnesis: pasien?.anamnesis.length ? pasien.anamnesis[0] : null,
        pemeriksaan: pasien?.pemeriksaan.length ? pasien.pemeriksaan[0] : null,
        penilaian: pasien?.penilaian?.length ? pasien.penilaian[0] : null

      }
      const storeAnamnesis = useAnamnesisRanapStore()
      const storePemeriksaan = usePemeriksaanUmumRanapStore()
      const storePenilaian = usePenilaianRanapStore()
      const cekTerbaru = this.items?.length ? this.items[0] : null
      let dataSebelumnya = null
      if (!cekTerbaru) {
        dataSebelumnya = dataAwal
        storeAnamnesis.initReset(dataAwal?.anamnesis)
        storePemeriksaan.initReset(dataAwal?.pemeriksaan)
        storePenilaian.initReset(pasien, dataAwal?.penilaian)
      }
      else {
        dataSebelumnya = cekTerbaru
        storeAnamnesis.initReset(dataSebelumnya?.anamnesis)
        storePemeriksaan.initReset(dataSebelumnya?.pemeriksaan)
        storePenilaian.initReset(pasien, dataSebelumnya?.penilaian)
      }
      this.previousData = dataSebelumnya
      // if (cekTerbaru) dataSebelumnya = cekTerbaru
      console.log('data terbaru', dataSebelumnya)
      console.log('pasien', pasien)
    },

    // editForm (item) {
    //   console.log('edit', item)
    //   const storeAnamnesis = useAnamnesisRanapStore()
    //   storeAnamnesis.initReset(item.anamnesis)
    // },

    saveCppt (pasien, jnsKasus) {
      this.loadingSave = true
      const kasusKep = jnsKasus?.gruping

      const storeAnamnesis = useAnamnesisRanapStore()
      storeAnamnesis.form.id = null
      let formDefault = storeAnamnesis.form
      if (kasusKep === '4.1') {
        formDefault = storeAnamnesis.form
      }
      if (kasusKep === '4.2' || kasusKep === '4.3' || kasusKep === '4.4') {
        formDefault.skreeninggizi = null
        formDefault.keluhannyeri = null
      }

      const anamnesis = {
        noreg: pasien?.noreg ?? null,
        norm: pasien?.norm,
        kdruang: pasien?.kdruangan,
        id: null,
        form: formDefault,
        formKebidanan: kasusKep === '4.2' ? this.formKebidanan : null, // ini this.formKebidanan,
        formNeoNatal: kasusKep === '4.3' ? this.formNeoNatal : null,
        formPediatrik: kasusKep === '4.4' ? this.formPediatrik : null // ini this.formPediatrik
      }

      const storePemeriksaan = usePemeriksaanUmumRanapStore()
      storePemeriksaan.form.id = null
      let frm = storePemeriksaan.form
      if (kasusKep === '4.1') {
        frm = storePemeriksaan.form
      }
      if (kasusKep === '4.2' || kasusKep === '4.3' || kasusKep === '4.4') {
        frm.skreeninggizi = null
        frm.keluhannyeri = null
      }

      const pemeriksaan = {
        noreg: pasien?.noreg ?? null,
        norm: pasien?.norm,
        kdruang: pasien?.kdruangan,
        id: null,
        form: frm,
        formKebidanan: kasusKep === '4.2' ? this.formKebidanan : null, // ini this.formKebidanan,
        formNeonatal: kasusKep === '4.3' ? this.formNeonatal : null,
        formPediatrik: kasusKep === '4.4' ? this.formPediatrik : null // ini this.formPediatrik
      }

      const storePenilaian = usePenilaianRanapStore()
      storePenilaian.form.id = null
      const penilaian = {
        barthel: null,
        norton: (storePenilaian.nortons.grupings?.includes(kasusKep)) ? storePenilaian.formNorton : null,
        humpty_dumpty: (storePenilaian.humptys.grupings?.includes(kasusKep) && (storePenilaian.usia < 18)) ? storePenilaian.formHumpty : null,
        morse_fall: (storePenilaian.morses.grupings?.includes(kasusKep) && (storePenilaian.usia >= 18 && storePenilaian.usia < 60)) ? storePenilaian.formMorse : null,
        ontario: (storePenilaian.ontarios.grupings?.includes(kasusKep) && (storePenilaian.usia >= 60)) ? storePenilaian.formOntario : null,
        kdruang: pasien?.kdruangan ?? null,
        noreg: pasien?.noreg,
        norm: pasien?.norm,
        id: null
      }

      const payload = {
        anamnesis,
        pemeriksaan,
        penilaian,
        noreg: pasien?.noreg ?? null,
        norm: pasien?.norm,
        kdruang: pasien?.kdruangan,
        id: null,
        form: this.form
      }

      console.log('form', payload)
      // console.log('form pemeriksaan', pemeriksaan)

      return new Promise((resolve, reject) => {
        api.post('v1/simrs/ranap/layanan/cppt/savecppt', payload)
          .then((resp) => {
            console.log('data cppt', resp)
            if (resp.status === 200) {
              this.items = resp.data?.result
              this.form.asessment = null
              this.form.plann = null
              this.form.instruksi = null
              this.form.laboratorium = null
              this.form.terapi = null
              this.form.radiologi = null
              this.form.diagnosa = null
              const pasienRanap = usePengunjungRanapStore()
              pasienRanap.injectDataArray(pasien?.noreg, resp.data.result, 'cppt')
            }
            this.loadingSave = false
            resolve(resp)
          })
          .catch((err) => {
            this.loadingSave = false
            console.log(err)
            reject(err)
          })
      })
    }
  }
})
