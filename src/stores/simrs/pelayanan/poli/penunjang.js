import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { dateDbFormat, formatJam } from 'src/modules/formatter'

export const usePenunjangPoli = defineStore('penunjang-poli', {
  state: () => ({
    tab: 'Laborat',
    tabs: ['Laborat', 'Radiologi', 'Cardio', 'EEG', 'Hemodialisa', 'USG 4 Dimensi', 'Thread Mill', 'Endoscope', 'Psikologi'],
    // laborat
    caripemeriksaanlab: '',
    masterlaborat: [],
    loadingMasterLab: false,
    caripemeriksaanradiologi: '',
    masterradiologi: [],
    form: {
      norm: '',
      noreg: '',
      nama: '',
      nik: '',
      tanggallahir: '',
      jeniskelamin: '',
      jam: formatJam(new Date()),
      tanggal: dateDbFormat(new Date()),
      pasienpuasa: 'Tidak',
      cito: 'Tidak',
      dokterpengirim: '',
      // notelpdokter: '',
      unitpengirim: '',
      // diagnosa: '',
      catatan: ''
      // asalspesimenklinis: 5,
      // lokasispesimen: '',
      // jumlahspesimen: '',
      // volumespesimen:
    },
    pemeriksaanslab: [],
    pemeriksaansradiologi: []
  }),
  actions: {
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
    saveOrderLaborat(pasien) {
      console.log(pasien)
    }
  }
})
