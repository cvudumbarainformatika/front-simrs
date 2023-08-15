import { defineStore } from 'pinia'

export const usePendaftaranAutocompleteStore = defineStore('pendaftaranAutocomplete', {
  state: () => ({
    loading: false,
    // pasien
    statuspernikahans: [],
    pendidikans: [],
    pekerjaans: [],
    sapaans: [],
    kelamins: [],
    agamas: [],
    negaras: [],
    domisiliNegaras: [],
    // bpjs
    asalrujukans: [],
    sistembayars1: [],
    polis: [],
    jenisKarcises: [],
    jenisKunjungans: [],
    prosedurs: [],
    assesmens: [],
    penunjangs: []
  }),
  persist: true,
  actions: {
    // bpjs
    setAsalRujukan(val) {
      this.asalrujukans = val
    },
    setSistemBayar(val) {
      this.sistembayars1 = val
    },
    setPoli(val) {
      this.polis = val
    },
    setJenisKarcis(val) {
      this.jenisKarcises = val
    },
    setJenisKunjungan(val) {
      this.jenisKunjungans = val
    },
    setProsedur(val) {
      this.prosedurs = val
    },
    setAssesmen(val) {
      this.assesmens = val
    },
    setPenunjang(val) {
      this.penunjangs = val
    },
    // pasien
    setNegara(val) {
      this.negaras = val
    },
    setNegaraDomisili(val) {
      this.domisiliNegaras = val
    },
    setStatusPenikahan(val) {
      this.statuspernikahans = val
    },
    setPendidikan(val) {
      this.pendidikans = val
    },
    setPekerjaan(val) {
      this.pekerjaans = val
    },
    setSapaan(val) {
      this.sapaans = val
    },
    setKelamin(val) {
      this.kelamins = val
    },
    setAgama(val) {
      this.agamas = val
    }
  }
})
