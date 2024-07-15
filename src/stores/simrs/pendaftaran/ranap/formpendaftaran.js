import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useFormPendaftaranRanapStore = defineStore('pendaftaran-ranap-store', {
  state: () => ({
    pasien: {
      barulama: 'baru',
      norm: null,
      kewarganegaraan: 'WNI',
      noktp: null,
      paspor: null,
      idsatset: null,
      nokabpjs: null,
      nama: null,
      ibukandung: null,
      tempatlahir: null,
      tanggallahir: null,
      kelamin: null,
      sapaan: null,
      pendidikan: null,
      agama: null,
      agamalain: null,
      suku: null,
      bahasa: null,
      bisabacatulis: null,
      statuspernikahan: null,
      pekerjaan: null,
      notelp: null,
      nohp: null,
      alamat: null,
      rt: null,
      rw: null,
      kelurahan: null,
      kecamatan: null,
      kota: null,
      propinsi: null,
      negara: null

    },
    kodeKtp: {
      prov: null, // 2 kode pertama
      kabKota: null, // 2 kode kedua
      kec: null, // 2 kode ketiga
      tglLahir: null, // khusu untuk perempuan ditambah 40 2 kode keempat
      blnLahir: null, //  2 kode kelima
      thnLahir: null, // 2 kode keenam
      kelamin: null // hasil dari parse tglLahir
    },
    paramWilayah: {
      kd_negara: null,
      kd_propinsi: null,
      kd_kotakabupaten: null,
      kd_kecamatan: null
    },
    statusPasiens: ['baru', 'lama'],
    kewarganegaran: ['WNI', 'WNA'],
    bisabacatulis: ['Ya', 'Tidak'],
    kelamins: [],
    sapaans: [],
    negaras: [],
    pendidikans: [],
    agamas: [],
    bahasas: [],
    statuspernikahans: [],
    pekerjaans: [],
    propinsies: [],
    kabupatens: [],
    kecamatans: [],
    kelurahans: []

  }),
  // getters: {
  //   doubleCount: (state) => state.counter * 2
  // },
  actions: {

    initForm () {
      const keys = Object.keys(this.pasien)
      for (let i = 0; i < keys.length; i++) {
        const el = keys[i]
        this.setForm(el, null)
      }

      this.pasien.barulama = 'baru'
      this.pasien.kewarganegaraan = 'WNI'
      this.pasien.noktp = 3574041305820002
      this.pasien.bisabacatulis = 'Ya'

      this.paramWilayah.kd_negara = '62'
    },

    setForm (key, val) {
      this.pasien[key] = val
    },
    async getKelamin () {
      // this.loading = true
      await api.get('v1/simrs/master/kelamin')
        .then(resp => {
          console.log('kelamin', resp.data)
          // this.loading = false
          this.kelamins = resp.data
          // this.autocompleteStore.setKelamin(resp.data)
        })
        .catch(() => {
          this.kelamins = [
            { nama: 'Perempuan', value: 'Perempuan' },
            { nama: 'Laki-laki', value: 'Laki-laki' }
          ]
          // this.loading = false
        })
    },

    async getSapaan () {
      // this.loading = true
      await api.get('v1/simrs/master/sapaan')
        .then(resp => {
          // this.loading = false
          console.log('sapaan', resp.data)
          this.sapaans = resp.data
        })
        .catch(() => {
          // this.loading = false
        })
    },

    async getNegara () {
      // this.loadingSelect = true
      const param = { params: this.paramWilayah }
      await api.get('v1/simrs/master/getnegara', param)
        .then((resp) => {
          console.log('negara', resp.data)
          // this.loadingSelect = false
          // )
          this.negaras = resp.data[0]
          if (this.pasien.kewarganegaraan === 'WNI') {
            this.pasien.negara = this.negaras[0].kd_negara
          }
          else {
            this.pasien.negara = null
          }

          // this.autocompleteStore.setNegara(resp.data[0])
        }).catch(() => {
          // this.loadingSelect = false
        })
    },

    async getPendidikan () {
      // this.loading = true
      await api.get('v1/simrs/master/pendidikan')
        .then(resp => {
          // this.loading = false
          this.pendidikans = resp.data
          // this.autocompleteStore.setPendidikan(resp.data)
        })
        .catch((err) => {
          // this.loading = false
          console.log('get pendidikan', err)
        })
    },
    async getAgama () {
      this.loading = true
      await api.get('v1/simrs/master/agama')
        .then(resp => {
          this.loading = false
          this.agamas = resp.data
          // this.autocompleteStore.setAgama(resp.data)
        })
        .catch(() => { this.loading = false })
    },
    async getBahasa () {
      this.loadingBahasa = true
      await api.get('v1/simrs/master/listbahasa')
        .then((resp) => {
          this.loadingBahasa = false
          console.log('bahasa', resp.data)
          this.bahasas = resp.data
          // this.autocompleteStore.setBahasa(resp.data)
          // return new Promise(resolve => { resolve(resp) })
        }).catch(() => {
          this.loadingBahasa = false
        })
    },
    async getStatusPernikahan () {
      this.loading = true
      await api.get('v1/simrs/master/statuspernikahan')
        .then(resp => {
          console.log('status pernikahan', resp.data)
          this.loading = false
          // this.autocompleteStore.setStatusPenikahan(resp.data)
          this.statuspernikahans = resp.data
        })
        .catch(() => { this.loading = false })
    },

    async getPekerjaan () {
      this.loading = true
      await api.get('v1/simrs/master/pekerjaan')
        .then(resp => {
          this.loading = false
          this.pekerjaans = resp.data
          // this.autocompleteStore.setPekerjaan(resp.data)
        })
        .catch(() => { this.loading = false })
    },
    async getProvinces () {
      this.loadingPropinsi = true
      const param = { params: this.paramWilayah }
      await api.get('v1/simrs/master/getpropinsi', param)
        .then((resp) => {
          this.loadingPropinsi = false

          this.propinsies = resp.data[0]
          // this.autocompleteStore.setPropinsi(resp.data[0])
          // if (this.pasien.propinsi !== null && this.propinsies.length > 0) {
          //   th
          // }
          return new Promise(resolve => { resolve(resp) })
        }).catch(() => {
          this.loadingPropinsi = false
        })
    },
    async getKota () {
      this.loadingKabupaten = true
      const param = { params: this.paramWilayah }
      await api.get('v1/simrs/master/getkotakabupaten', param)
        .then((resp) => {
          this.kabupatens = resp.data[0]
          this.loadingKabupaten = false
          return new Promise(resolve => { resolve(resp) })
        }).catch(() => {
          this.loadingKabupaten = false
        })
    },
    async getKec () {
      this.loadingKecamatan = true
      const param = { params: this.paramWilayah }
      await api.get('v1/simrs/master/getkecamatan', param)
        .then((resp) => {
          // )
          this.loadingKecamatan = false
          this.kecamatans = resp.data[0]
          return new Promise(resolve => { resolve(resp) })
        }).catch(() => {
          this.loadingKecamatan = false
        })
    },
    async getKels () {
      this.loadingKelurahan = true
      const param = { params: this.paramWilayah }
      await api.get('v1/simrs/master/getkelurahan', param)
        .then((resp) => {
          // )
          this.loadingKelurahan = false
          this.kelurahans = resp.data[0]
          return new Promise(resolve => { resolve(resp) })
        }).catch(() => {
          this.loadingKelurahan = false
        })
    }

  }
})
