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
    propinsies: [],
    domisiliPropinsies: [],
    bahasas: [],
    hambatans: [],
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
    setAsalRujukan (val) {
      this.asalrujukans = val
    },
    setSistemBayar (val) {
      this.sistembayars1 = val
    },
    setPoli (val) {
      this.polis = val
    },
    setJenisKarcis (val) {
      this.jenisKarcises = val
    },
    setJenisKunjungan (val) {
      this.jenisKunjungans = val
    },
    setProsedur (val) {
      this.prosedurs = val
    },
    setAssesmen (val) {
      this.assesmens = val
    },
    setPenunjang (val) {
      this.penunjangs = val
    },
    // pasien
    setBahasa (val) {
      this.bahasas = val
    },
    setHamabatan (val) {
      this.hambatans = val
    },
    setNegara (val) {
      this.negaras = val
    },
    setNegaraDomisili (val) {
      this.domisiliNegaras = val
    },
    setPropinsi (val) {
      this.propinsies = val
    },
    setPropinsiDomisili (val) {
      this.domisiliPropinsies = val
    },
    setStatusPenikahan (val) {
      this.statuspernikahans = val
    },
    setPendidikan (val) {
      this.pendidikans = val
    },
    setPekerjaan (val) {
      this.pekerjaans = val
    },
    setSapaan (val) {
      this.sapaans = val
    },
    setKelamin (val) {
      this.kelamins = val
    },
    setAgama (val) {
      this.agamas = val
    }
  }
})
