import { defineStore } from 'pinia'

export const useSpeechStore = defineStore('speech', {
  state: () => ({
    isLoading: false,
    name: '',
    selectedVoice: 0,
    synth: window.speechSynthesis,
    voiceList: [],
    utterance: new window.SpeechSynthesisUtterance()
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
    setLoading (val) {
      this.isLoading = val
    },
    setVoiceList (val) {
      this.voiceList = val
    }
  }
})
