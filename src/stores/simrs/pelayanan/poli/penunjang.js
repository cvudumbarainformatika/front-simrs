import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { dateDbFormat, formatJam } from 'src/modules/formatter'

export const usePenunjangPoli = defineStore('penunjang-poli', {
  state: () => ({
    tab: 'Laborat',
    tabs: ['Laborat', 'Radiologi', 'Cardio', 'EEG', 'Hemodialisa', 'USG 4 Dimensi', 'Thread Mill', 'Endoscope', 'Psikologi'],
    // laborat
    caripemeriksaanlab: null,
    masterlaborat: [],
    loadingMasterLab: false,
    caripemeriksaanradiologi: '',
    masterradiologi: [],
    notalaborats: [],
    form: {
      // norm: '',
      // noreg: '',
      // kdpoli: '',
      // kdpemeriksaan: '',
      biayasarana: 0,
      biayalayanan: 0,
      jumlah: 1,
      pasienpuasa: 'Tidak',
      cito: 'Tidak',
      diagnosa_masalah: '',
      catatan: '',
      unitpengirim: '',
      asal_sumber_spesimen: '',
      lokasi_pengambilan_spesimen: '',
      jumlahspesimenklinis: 1,
      volumespesimenklinis: 0,
      metodepengambilanspesimen: '',
      tanggalpengambilanspesimen: dateDbFormat(new Date()),
      jampengambilanspesimen: formatJam(new Date()),
      kondisispesimen: '',
      metodepengirimanhasil: 'Penyerahan langsung', // || Dikirim via surel
      tanggalfiksasi: dateDbFormat(new Date()),
      jamfiksasi: dateDbFormat(new Date()),
      cairanfiksasi: 0, // ml
      volumecairanfiksasi: 0, // ml
      // petugas: ''
      details: []
    },
    loadingSaveLab: false,
    pemeriksaanslab: [],
    pemeriksaansradiologi: []
  }),
  actions: {
    // =============================================================================================================================================LABORAT
    async getMasterLaborat() {
      this.loadingMasterLab = true
      try {
        const resp = await api.get('v1/simrs/penunjang/laborat/dialoglaboratpoli')
        console.log('masterlaborat', resp)
        if (resp.status === 200) {
          const arr = resp.data
          const arr2 = arr.length > 0 ? arr.map(x =>
            ({
              gruper: x.gruper !== '' ? x.gruper : x.pemeriksaan,
              pemeriksaan: x.pemeriksaan,
              jenis: x.gruper !== '' ? 'PAKET' : 'NON-PAKET',
              biayapoliumum: parseInt(x.hargapelayananpoliumum) + parseInt(x.hargasaranapoliumum),
              biayapolispesialis: parseInt(x.hargapelayananpolispesialis) + parseInt(x.hargasaranapolispesialis),
              kode: x.kode,
              aslix: x
            })
          ) : []
          const groupped = this.groupBy(arr2, gruper => gruper.gruper)
          this.masterlaborat = groupped
          this.loadingMasterLab = false
          console.log('group pemeriksaan', groupped)
        }
        this.loadingMasterLab = false
      } catch (error) {
        this.loadingMasterLab = false
      }
    },
    groupBy(list, keyGetter) {
      const map = new Map()
      list.forEach((item) => {
        const key = keyGetter(item)
        const collection = map.get(key)
        if (!collection) {
          map.set(key, [item])
        } else {
          collection.push(item)
        }
      })
      const arr = Array.from(map, ([name, value]) => ({ name, value }))
      return arr
    },
    setCariLabNull() {
      this.caripemeriksaanlab = null
    },
    setForm(key, value) {
      this.form[key] = value
    },
    setDetails(pemeriksaan) {
      const thumb = []
      for (let i = 0; i < pemeriksaan?.value.length; i++) {
        const element = pemeriksaan?.value[i]
        this.form.biayalayanan = element?.aslix?.hargapelayananpolispesialis // ini bisa element?.aslix?.hargapelayananpoliumum
        this.form.biayasarana = element?.aslix?.hargasaranapolispesialis // ini bisa element?.aslix?.hargasaranapoliumum
        const obj = {
          kode: element?.aslix?.kode,
          gruper: element?.aslix.gruper
        }
        thumb.push(obj)
      }
      this.form.details = thumb
      return new Promise((resolve, reject) => {
        resolve()
      })
    },
    saveOrderLaborat(pasien) {
      this.form.norm = pasien?.norm
      this.form.noreg = pasien?.noreg

      console.log('save', this.form)
    }
    // =============================================================================================================================================LABORAT
  }
})
