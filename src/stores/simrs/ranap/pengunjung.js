import { defineStore } from 'pinia'
import { dateDbFormat } from 'src/modules/formatter'

export const usePengunjungStore = defineStore('pengunjung-ranap', {
  state: () => ({
    pasiens: [],
    params: {
      page: 1,
      q: '',
      status: '',
      to: dateDbFormat(new Date()),
      from: dateDbFormat(new Date()),
      per_page: 100,
      koderuangan: []
    }
  }),

  actions: {
    increment () {
      this.counter++
    }
  }
})
