import { defineStore } from 'pinia'

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
    ]
  }),
  actions: {
    setForm(key, val) {
      this.form[key] = val
    }
  }
})
