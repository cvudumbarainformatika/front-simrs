import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { dateDbFormat, dateFullFormat, formatJam } from 'src/modules/formatter'

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
    notalaborat: null,
    form: {
      // norm: '',
      // noreg: '',
      // kdpoli: '',
      // kdpemeriksaan: '',
      biaya_sarana: 0,
      biaya_layanan: 0,
      jumlah: 1,
      puasa_pasien: 'Tidak',
      prioritas_pemeriksaan: 'Tidak',
      diagnosa_masalah: '',
      catatan_permintaan: '',
      unit_pengirim: '',
      asal_sumber_spesimen: '',
      lokasi_pengambilan_spesimen: '',
      jumlah_spesimen_klinis: 1,
      volume_spesimen_klinis: 0,
      metode_pengambilan_spesimen: '',
      tanggalpengambilanspesimen: dateDbFormat(new Date()),
      jampengambilanspesimen: formatJam(new Date()),
      waktu_pengambilan_spesimen: dateFullFormat(new Date()),
      kondisi_spesimen: '',
      metode_pengiriman_hasil: 'Penyerahan langsung', // || Dikirim via surel
      tanggalfiksasi: dateDbFormat(new Date()),
      jamfiksasi: dateDbFormat(new Date()),
      waktu_fiksasi_spesimen: dateFullFormat(new Date()),
      cairan_fiksasi: 0, // ml
      volume_cairan_fiksasi: 0, // ml
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
        // console.log('masterlaborat', resp)
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

    async getNota(pasien) {
      const payload = { params: { noreg: pasien?.noreg } }
      const resp = await api.get('v1/simrs/penunjang/laborat/getnota', payload)
      // console.log('notalaborat', resp)
      if (resp.status === 200) {
        const arr = resp.data.map(x => x.nota)
        this.notalaborats = arr.length ? arr : []
        this.notalaborats.push('BARU')
        this.notalaborat = this.notalaborats[0]
      }
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
        this.form.biaya_layanan = element?.aslix?.hargapelayananpolispesialis // ini bisa element?.aslix?.hargapelayananpoliumum
        this.form.biaya_sarana = element?.aslix?.hargasaranapolispesialis // ini bisa element?.aslix?.hargasaranapoliumum
        const obj = {
          kode: element?.aslix?.kode,
          gruper: element?.aslix.gruper
        }
        thumb.push(obj)
        console.log('thumb', this.form)
      }
      this.form.details = thumb
      return new Promise((resolve, reject) => {
        resolve()
      })
    },
    async saveOrderLaborat(pasien) {
      this.form.norm = pasien?.norm
      this.form.noreg = pasien?.noreg
      this.form.waktu_pengambilan_spesimen = this.form.tanggalpengambilanspesimen + ' ' + this.form.jampengambilanspesimen
      this.form.waktu_fiksasi_spesimen = this.form.tanggalfiksasi + ' ' + this.form.jamfiksasi
      this.form.nota = this.notalaborat
      if (this.form.prioritas_pemeriksaan === 'Iya' || this.form.prioritas_pemeriksaan === 'iya') {
        this.form.biaya_layanan = this.percentage(this.form.biaya_layanan)
        this.form.biaya_sarana = this.percentage(this.form.biaya_sarana)
      }

      this.form.kdsistembayar = pasien?.kodesistembayar
      // console.log('save', this.form)
      try {
        const resp = await api.post('v1/simrs/penunjang/laborat/simpanpermintaanlaborat', this.form)
        console.log('save', resp)
      } catch (error) {
        console.log('save laborat', error)
      }
    },

    percentage(val) {
      if (!isNaN(val)) {
        const hasil = val + (val * 25 / 100)
        return hasil
      }
      return 0
    }
    // =============================================================================================================================================LABORAT
  }

})
