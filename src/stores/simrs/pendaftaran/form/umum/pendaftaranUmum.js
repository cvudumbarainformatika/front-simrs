import { defineStore } from 'pinia'
import { axios } from 'boot/axios'

export const usePendaftaranPasienUmumStore = defineStore('pendaftaran_pasien_umum', {
  state: () => ({
    loading: false,
    params: {},
    form: {
      sapaan: 'Bpk.',
      barulama: 'baru'
    },
    sapaans: [
      { nama: 'Bpk', value: 'Bpk.' },
      { nama: 'Ibu', value: 'Ibu.' },
      { nama: 'Sdr', value: 'Sdr.' },
      { nama: 'Sdri', value: 'Sdri.' },
      { nama: 'Tn', value: 'Tn.' },
      { nama: 'Ny', value: 'Ny.' },
      { nama: 'An', value: 'An.' },
      { nama: 'By', value: 'By.' },
      { nama: 'Nn', value: 'Nn.' }
    ],
    jenisPasiens: [
      { nama: 'Baru', value: 'baru' },
      { nama: 'Lama', value: 'lama' }
    ],
    kelamins: [
      { nama: '-', value: '-' },
      { nama: 'Perempuan', value: 'Perempuan' },
      { nama: 'Laki-laki', value: 'Laki-laki' }
    ],
    agamas: [
      { nama: '-', value: '-' },
      { nama: 'Islam', value: 'Islam' },
      { nama: 'Kristen', value: 'Kristen' },
      { nama: 'Katolik', value: 'Katolik' },
      { nama: 'Hindu', value: 'Hindu' },
      { nama: 'Budha', value: 'Budha' }
    ],
    pendidikans: [
      { nama: '-', value: '-' },
      { nama: 'Tidak Tahu', value: 'Tidak Tahu' },
      { nama: 'SD', value: 'SD' },
      { nama: 'SLTP', value: 'SLTP' },
      { nama: 'SLTA', value: 'SLTA' },
      { nama: 'Diploma 1', value: 'Diploma 1' },
      { nama: 'Diploma 2', value: 'Diploma 2' },
      { nama: 'Diploma 3', value: 'Diploma 3' },
      { nama: 'Strata 1', value: 'Strata 1' },
      { nama: 'Strata 2', value: 'Strata 2' },
      { nama: 'Strata 3', value: 'Strata 3' }
    ],
    sukus: [
      { nama: '-', value: '-' },
      { nama: 'Jawa', value: 'Jawa' },
      { nama: 'Madura', value: 'Madura' },
      { nama: 'Tionghoa', value: 'Tionghoa' },
      { nama: 'Batak', value: 'Batak' },
      { nama: 'Bugis', value: 'Bugis' },
      { nama: 'Dayak', value: 'Dayak' },
      { nama: 'Lain-lain', value: 'Lain-lain' }
    ],
    loadingSelect: false,
    api_wilayah: 'https://globalbudged.github.io/api-wilayah-indonesia/static/api',
    propinsies: [],
    kabupatens: [],
    kecamatans: [],
    kelurahans: []
  }),
  actions: {
    setForm(key, val) {
      this.form[key] = val
    },

    // api propinsi kebawah
    async getProvinces (id) {
      await axios.get(`${this.api_wilayah}/provinces.json`)
        .then((resp) => {
          // console.log(resp)
          this.propinsies = resp.data
          return resp.data.name
        }).catch(err => {
          console.log(err)
        })
    },
    async getKota (val) {
      this.loadingSelect = true
      if (this.propinsies.length > 0) {
        // console.log('jika data array provinsi ada')
        let temp = []
        temp = this.propinsies.filter(v => v.name.toLowerCase() === val.toLowerCase())
        if (temp.length > 0) {
          const tempId = temp[0].id
          await axios.get(`${this.api_wilayah}/regencies/${tempId}.json`)
            .then((resp) => {
              // console.log('resp', resp)
              this.kabupatens = resp.data
              // console.log('kotas', this.kotas)
              this.loadingSelect = false
            }).catch(err => {
              console.log(err)
              this.loadingSelect = false
            })
        }
      }
      this.loadingSelect = false
    },
    async getKec (val) {
      this.loadingSelect = true
      if (this.kabupatens.length > 0) {
        // console.log('jika data array provinsi ada')
        let temp = []
        temp = this.kabupatens.filter(v => v.name.toLowerCase() === val.toLowerCase())
        if (temp.length > 0) {
          const tempId = temp[0].id
          await axios.get(`${this.api_wilayah}/districts/${tempId}.json`)
            .then((resp) => {
              // console.log('resp', resp)
              this.kecamatans = resp.data
              // console.log('kec', this.kecamatans)
              this.loadingSelect = false
            }).catch(err => {
              console.log(err)
              this.loadingSelect = false
            })
        }
      }
      this.loadingSelect = false
    },
    async getKels (val) {
      this.loadingSelect = true
      if (this.kecamatans.length > 0) {
        let temp = []
        temp = this.kecamatans.filter(v => v.name.toLowerCase() === val.toLowerCase())
        if (temp.length > 0) {
          const tempId = temp[0].id
          await axios.get(`${this.api_wilayah}/villages/${tempId}.json`)
            .then((resp) => {
              // console.log('resp', resp)
              this.kelurahans = resp.data
              this.loadingSelect = false
              // console.log('kec', this.kels)
            }).catch(err => {
              console.log(err)
              this.loadingSelect = false
            })
        }
      }
      this.loadingSelect = false
    },
    // api related functions
    anu() {}
  }
})
