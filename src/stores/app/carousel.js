import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifSuccess } from 'src/modules/utils'

export const useCarouselApp = defineStore('carousel', {
  state: () => ({
    items: [],
    meta: null,
    params: {
      q: '',
      page: 1,
      per_page: 4
    },
    carousels: [],
    tmpCarousels: [
      { id: 1, image: 'https://cdn.quasar.dev/img/mountains.jpg', title: 'Gambar 1', desc: 'desc' },
      { id: 2, image: 'https://cdn.quasar.dev/img/parallax1.jpg', title: 'Gambar 2', desc: 'desc' },
      { id: 3, image: 'https://cdn.quasar.dev/img/parallax2.jpg', title: 'Gambar 3', desc: 'desc' },
      { id: 4, image: 'https://cdn.quasar.dev/img/quasar.jpg', title: 'Gambar 4', desc: 'desc' }
    ],
    titleOn: false,
    loading: false,

    form: {
      image: null,
      title: null,
      desc: null
    }
  }),
  getters: {
    slides: (state) => {
      if (state.carousels.length === 0) {
        return state.tmpCarousels
      }
      return state.carousels
    }
  },
  actions: {
    setPage (payload) {
      console.log('setPage', payload)
      this.params.page = payload
      this.manageData()
    },
    setPerPage (payload) {
      this.params.per_page = payload
      this.params.page = 1
      this.manageData()
    },
    async getData () {
      this.loading = true
      await api.get('/v1/carousel').then(resp => {
        console.log(resp)
        this.carousels = resp.data.data
      })
      try {
        this.loading = false
      } catch (error) {
        this.loading = false
      }
    },
    async manageData () {
      this.loading = true
      const params = { params: this.params }
      await api.get('/v1/carousel/manage', params).then(resp => {
        console.log('manage', resp)
        this.items = resp.data.data
        this.meta = resp.data.meta
      })
      try {
        this.loading = false
      } catch (error) {
        this.loading = false
      }
    },

    addData() {
      this.form.image = null
      this.form.title = null
      this.form.desc = null
    },

    editItem(payload) {
      this.form.image = payload.image
      this.form.title = payload.title
      this.form.desc = payload.desc
    },

    async saveData(payload) {
      this.loading = true
      try {
        await api.post('/v1/carousel/store', payload, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((resp) => {
          console.log(resp)
          notifSuccess(resp)
          this.addData()
          this.manageData()
          this.loading = false
          return new Promise((resolve, reject) => {
            resolve()
          })
        })
      } catch (error) {
        this.loading = false
      }
    },
    async deleteItem(payload) {
      this.loading = true
      const params = {
        id: payload
      }
      try {
        await api.post('/v1/carousel/destroy', params).then((resp) => {
          notifSuccess(resp)
          this.manageData()
          this.loading = false
        })
      } catch (error) {
        this.loading = false
      }
    }
  },
  setTitleOn() {
    this.titleOn = !this.titleOn
  }
})
