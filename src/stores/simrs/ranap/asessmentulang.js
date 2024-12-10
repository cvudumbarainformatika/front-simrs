import { defineStore } from 'pinia'
// eslint-disable-next-line no-unused-vars
import { api } from 'src/boot/axios'
import { useAnamnesisRanapStore } from './anamnesis'
// eslint-disable-next-line no-unused-vars
import { usePengunjungRanapStore } from './pengunjung'
import { usePemeriksaanUmumRanapStore } from './pemeriksaanumum'
import { usePenilaianRanapStore } from './penilaian'
import { useDiagnosaKeperawatan } from '../pelayanan/poli/diagnosakeperawatan'
import { useDiagnosaKebidananStore } from '../pelayanan/poli/diagnosakebidanan'
import { getNewLine } from 'src/modules/formatter'

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
      instruksi: null,
      // tambahan
      o_sambung: null,
      s_sambung: null
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

    getPreviousForm (pasien, nakes) {
      const dataAwal = {
        anamnesis: pasien?.anamnesis.length
          ? pasien.anamnesis?.filter((a) => a?.kdruang !== 'POL014')?.length
            ? pasien.anamnesis?.filter((a) => a?.kdruang !== 'POL014')[0]
            : null
          : null,
        pemeriksaan: pasien?.pemeriksaan.length
          ? pasien.pemeriksaan?.filter((a) => a?.kdruang !== 'POL014')?.length
            ? pasien.pemeriksaan?.filter((a) => a?.kdruang !== 'POL014')[0]
            : null
          : null,
        penilaian: pasien?.penilaian?.length
          ? pasien.penilaian?.filter((a) => a?.kdruang !== 'POL014')?.length
            ? pasien.penilaian?.filter((a) => a?.kdruang !== 'POL014')[0]
            : null
          : null

      }
      const storeAnamnesis = useAnamnesisRanapStore()
      const storePemeriksaan = usePemeriksaanUmumRanapStore()
      const storePenilaian = usePenilaianRanapStore()
      const cekTerbaru = this.items?.length
        ? this.items?.filter((a) => a?.nakes === nakes)?.length
          ? this.items?.filter((a) => a?.nakes === nakes)[0]
          : null
        : null
      let dataSebelumnya = null

      console.log('cek asessment terbaru', cekTerbaru)

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

      console.log('data sebelumnya', dataSebelumnya)

      // untuk diagnosa keperawatan
      if (nakes === '2') {
        this.initDiagnosaKeperawatan(dataSebelumnya)
        this.form.asessment = dataSebelumnya?.asessment
        this.form.plann = dataSebelumnya?.plann
        this.form.instruksi = dataSebelumnya?.instruksi
        this.form.o_sambung = dataSebelumnya?.o_sambung
        this.form.s_sambung = dataSebelumnya?.s_sambung
      }
      else if (nakes === '1') {
        // this.initDiagnosaMedisToText(pasien?.diagnosamedis)
        this.initMemoDiagnosaToText(pasien?.memodiagnosa)
        this.form.o_sambung = dataSebelumnya?.o_sambung
        this.form.plann = null
        this.form.instruksi = null
      }
      else if (nakes === '3') {
        this.initDiagnosaKebidanan(dataSebelumnya)
        this.form.asessment = dataSebelumnya?.asessment
        this.form.plann = dataSebelumnya?.plann
        this.form.instruksi = dataSebelumnya?.instruksi
        this.form.o_sambung = dataSebelumnya?.s_sambung
      }
      else {
        this.form.asessment = null
        this.form.plann = null
        this.form.instruksi = null
        this.form.o_sambung = null
        this.form.s_sambung = null
      }

      // if (cekTerbaru) dataSebelumnya = cekTerbaru
      // console.log('data terbaru', dataSebelumnya)
      // console.log('pasien', pasien)
    },

    initDiagnosaMedisToText (diag) {
      const diagnosa = diag?.length ? diag?.filter(x => x?.rs13 !== 'POL014') : []
      const text = diagnosa.length ? diagnosa.map(x => '* ' + x?.rs3 + ' - ' + x?.masterdiagnosa?.rs4).join('\n') : null
      // console.log('diagnosa', diagnosa)

      this.form.asessment = text
    },
    initMemoDiagnosaToText (diag) {
      // const diagnosa = diag?.length ? diag?.filter(x => x?.rs13 !== 'POL014') : []
      const text = getNewLine(diag)
      // console.log('diagnosa', diagnosa)

      this.form.asessment = text
    },

    initDiagnosaKeperawatan (dataSebelumnya) {
      const storeDiagnosaKeperawatan = useDiagnosaKeperawatan()
      const diagnosKep = dataSebelumnya?.asessment?.replace(/\n/g, '')
      // console.log('data sebelumnya', diagnosKep)
      const masterDiagnosaKep = storeDiagnosaKeperawatan.diagnosas
      const splitAssessment = diagnosKep?.split('- ')
      const cariDiagnosaKep = masterDiagnosaKep.filter(row => splitAssessment?.some(value => value?.includes(row?.nama)))
      if (cariDiagnosaKep.length) storeDiagnosaKeperawatan.selectDiagnosa = cariDiagnosaKep

      // cari intervensi
      const intervensiKep = dataSebelumnya?.instruksi?.replace(/\n/g, '')
      let splitIntervensi = intervensiKep?.split('- ')

      const plannKep = dataSebelumnya?.plann?.replace(/\n/g, '')
      const splitIPlann = plannKep?.split('- ')

      splitIntervensi = splitIntervensi?.concat(splitIPlann)
      const masterIntervensiKep = cariDiagnosaKep.length ? cariDiagnosaKep.map(x => x?.intervensis)?.flat() : []
      // const masterPlannKep = cariDiagnosaKep.length ? cariDiagnosaKep.map(x => x?.intervensis)?.flat() : []

      const cariIntervensiKep = masterIntervensiKep.filter(row => splitIntervensi?.some(value => value?.includes(row?.nama)))

      // const splitIntervensi = intervensiKep?.split('- ')
      const intervensis = cariIntervensiKep.length ? cariIntervensiKep.map(x => x?.id + '||' + x?.mdiagnosakeperawatan_kode) : []

      // console.log('splitIntervensi', splitIntervensi)
      // console.log('cariIntervensiKep', intervensis)
      if (cariIntervensiKep.length) storeDiagnosaKeperawatan.selectIntervensis = intervensis
    },

    initDiagnosaKebidanan (dataSebelumnya) {
      const storeDiagnosaKebidanan = useDiagnosaKebidananStore()
      const diagnosKep = dataSebelumnya?.asessment?.replace(/\n/g, '')
      // console.log('data sebelumnya', diagnosKep)
      const masterDiagnosaKep = storeDiagnosaKebidanan.diagnosas
      const splitAssessment = diagnosKep?.split('- ')
      const cariDiagnosaKep = masterDiagnosaKep.filter(row => splitAssessment?.some(value => value?.includes(row?.nama)))
      if (cariDiagnosaKep.length) storeDiagnosaKebidanan.selectDiagnosa = cariDiagnosaKep

      // cari intervensi
      const intervensiKep = dataSebelumnya?.instruksi?.replace(/\n/g, '')
      let splitIntervensi = intervensiKep?.split('- ')

      const plannKep = dataSebelumnya?.plann?.replace(/\n/g, '')
      const splitIPlann = plannKep?.split('- ')

      splitIntervensi = splitIntervensi?.concat(splitIPlann)
      const masterIntervensiKep = cariDiagnosaKep.length ? cariDiagnosaKep.map(x => x?.intervensis)?.flat() : []
      // const masterPlannKep = cariDiagnosaKep.length ? cariDiagnosaKep.map(x => x?.intervensis)?.flat() : []

      const cariIntervensiKep = masterIntervensiKep.filter(row => splitIntervensi?.some(value => value?.includes(row?.nama)))

      // const splitIntervensi = intervensiKep?.split('- ')
      const intervensis = cariIntervensiKep.length ? cariIntervensiKep.map(x => x?.id + '||' + x?.mdiagnosakeperawatan_kode) : []

      // console.log('splitIntervensi', splitIntervensi)
      // console.log('cariIntervensiKep', intervensis)
      if (cariIntervensiKep.length) storeDiagnosaKebidanan.selectIntervensis = intervensis
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
      // if (kasusKep === '4.1') {
      formDefault = storeAnamnesis.form
      // }
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
        formKebidanan: kasusKep === '4.2' ? storeAnamnesis.formKebidanan : null, // ini storeAnamnesis.formKebidanan,
        formNeoNatal: kasusKep === '4.3' ? storeAnamnesis.formNeoNatal : null,
        formPediatrik: kasusKep === '4.4' ? storeAnamnesis.formPediatrik : null // ini storeAnamnesis.formPediatrik
      }

      const storePemeriksaan = usePemeriksaanUmumRanapStore()
      storePemeriksaan.form.id = null
      let frm = storePemeriksaan.form
      // if (kasusKep === '4.1') {
      frm = storePemeriksaan.form
      // }
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
        // formKebidanan: kasusKep === '4.2' ? this.formKebidanan : null, // ini this.formKebidanan,
        // formNeonatal: kasusKep === '4.3' ? this.formNeonatal : null,
        // formPediatrik: kasusKep === '4.4' ? this.formPediatrik : null // ini this.formPediatrik
        formKebidanan: kasusKep === '4.2' ? storePemeriksaan.formKebidanan : null, // ini storePemeriksaan.formKebidanan,
        formNeonatal: kasusKep === '4.3' ? storePemeriksaan.formNeonatal : null,
        formPediatrik: kasusKep === '4.4' ? storePemeriksaan.formPediatrik : null // ini storePemeriksaan.formPediatrik
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
        form: this.form,
        kdgroup_ruangan: pasien?.kdgroup_ruangan,
        kelas_ruangan: pasien?.kelas_ruangan,
        kodesistembayar: pasien?.kodesistembayar
      }

      // console.log('form', payload)
      // console.log('form pemeriksaan', pemeriksaan)

      return new Promise((resolve, reject) => {
        api.post('v1/simrs/ranap/layanan/cppt/savecppt', payload)
          .then((resp) => {
            // console.log('data cppt', resp)
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
    },

    async deleteData (pasien, id) {
      const payload = { id }
      return new Promise((resolve, reject) => {
        api.post('v1/simrs/ranap/layanan/cppt/deletecppt', payload)
          .then((resp) => {
            const storeRanap = usePengunjungRanapStore()
            storeRanap.hapusDataInjectan(pasien, id, 'cppt')
            resolve(resp)
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  }
})
