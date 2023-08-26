import { defineStore } from 'pinia'

export const usePenunjangPoli = defineStore('penunjang-poli', {
  state: () => ({
    tab: 'Laborat',
    tabs: ['Laborat', 'Radiologi', 'Cardio', 'EEG', 'Hemodialisa', 'USG', 'Thread Mill', 'Endoscope', 'Psikologi']
  }),
  actions: {

  }
})
