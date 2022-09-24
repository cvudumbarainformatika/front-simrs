import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifSuccess } from 'src/modules/utils'

export const useAppStore = defineStore('app', {
  state: () => ({
    logo: null,
    header: {
      phone: '0812-3766-0656',
      link_fb: 'https://facebook.com',
      link_instagram: 'https://instagram.com',
      link_youtube: 'https://instagram.com',
      title: 'Title Header',
      desc: 'Deskripsi Website',
      email: null,
      link_map: null
    },

    section_one: {
      point_1: {
        title: null,
        data: []
      },
      point_2: {
        title: null,
        data: []
      },
      image: null
    },

    section_two: [],
    section_three: [],
    tmp_section_three: [
      { nama: 'Dr. Anonymous', jabatan: 'Direktur Utama', image: null },
      { nama: 'Dr. Anonymous', jabatan: 'Direktur Medis', image: null },
      { nama: 'Dr. Anonymous', jabatan: 'Direktur Non Medis', image: null }
    ],
    themes: [],

    loading: false,

    leftDrawerOpen: true,
    rightDrawerOpen: false,
    visible: false

  }),
  getters: {
    stafs: (state) => {
      if (state.section_three.length === 0) {
        return state.tmp_section_three
      }
      return state.section_three
    }
  },
  actions: {
    changeVisible(x) {
      this.visible = x
    },
    openRight() {
      this.leftDrawerOpen = !this.leftDrawerOpen
      if (this.leftDrawerOpen === true) {
        this.rightDrawerOpen = false
      } else if (this.leftDrawerOpen === false) {
        this.rightDrawerOpen = true
      }
    },
    async getAppHeader() {
      this.loading = true
      try {
        await api.get('/v1/header').then((resp) => {
          console.log(resp)
          if (resp.status === 200) {
            this.header.title = resp.data.title
            this.header.desc = resp.data.desc
            this.header.alamat = resp.data.alamat
            this.header.phone = resp.data.phone
            this.header.link_fb = resp.data.link_fb
            this.header.link_instagram = resp.data.link_instagram
            this.header.link_youtube = resp.data.link_youtube
            this.header.link_map = resp.data.link_map
            this.header.email = resp.data.email

            this.logo = resp.data.logo

            // sections
            this.section_one = resp.data.section_one
            this.section_two = resp.data.section_two
            this.section_three = resp.data.staf
            this.themes = resp.data.themes
          }
          this.loading = false
        })
      } catch (error) {
        this.loading = false
      }
    },
    async setTheme(i, val) {
      this.themes[i].value = val
      this.loading = true
      const params = { themes: this.themes }
      try {
        await api.post('/v1/app/store_themes', params).then((resp) => {
          console.log('themes_post', resp)
          notifSuccess(resp)
          this.getAppHeader()
          this.loading = false
          return new Promise((resolve, reject) => {
            resolve()
          })
        })
      } catch (error) {
        this.loading = false
      }
    },
    async updateLogo(file) {
      this.loading = true
      try {
        await api.post('/v1/header/store_logo', file, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((resp) => {
          console.log(resp)
          notifSuccess(resp)
          this.getAppHeader()
          this.loading = false
        })
      } catch (error) {
        this.loading = false
      }
    },

    async onSubmit() {
      this.loading = true
      try {
        await api.post('/v1/header/store', this.header).then((resp) => {
          console.log(resp)
          notifSuccess(resp)
          this.getAppHeader()
          this.loading = false
        })
      } catch (error) {
        this.loading = false
      }
    },

    /*
    ==============================================================================
    SECTION ONE
    ==============================================================================
  **/

    async uploadImageSectionOne(file) {
      this.loading = true
      if (file) {
        this.section_one.image = file
      }
      const formData = new FormData()
      formData.append('image', this.section_one.image)
      formData.append('point_1_title', this.section_one.point_1.title)
      for (let i = 0; i < this.section_one.point_1.data.length; i++) {
        formData.append('point_1_data[]', this.section_one.point_1.data[i])
      }
      formData.append('point_2_title', this.section_one.point_2.title)
      for (let i = 0; i < this.section_one.point_2.data.length; i++) {
        formData.append('point_2_data[]', this.section_one.point_2.data[i])
      }
      try {
        await api.post('/v1/app/store_image_section_one', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((resp) => {
          console.log('section_one_post', resp)
          notifSuccess(resp)
          this.getAppHeader()
          this.loading = false
        })
      } catch (error) {
        this.loading = false
      }
    },

    pushListSectionOne(x) {
      if (x === 1) {
        this.section_one.point_1.data.push('ini data baru')
      } else {
        this.section_one.point_2.data.push('ini data baru')
      }
    },

    removeListSectionOne(x, i) {
      if (x === 1) {
        this.section_one.point_1.data.splice(i, 1)
      } else {
        this.section_one.point_2.data.splice(i, 1)
      }
    },

    /*
    ==============================================================================
    SECTION TWO
    ==============================================================================
  **/

    async setSectionTwo() {
      this.loading = true
      const params = { section_two: this.section_two }
      try {
        await api.post('/v1/app/store_section_two', params).then((resp) => {
          console.log('section_two_post', resp)
          notifSuccess(resp)
          this.getAppHeader()
          this.loading = false
        })
      } catch (error) {
        this.loading = false
      }
    },
    /*
    ==============================================================================
    SECTION THREE STAFF
    ==============================================================================
  **/

    async setStaf(form) {
      this.loading = true
      try {
        await api.post('/v1/app/store_staf', form, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((resp) => {
          console.log('staf_post', resp)
          notifSuccess(resp)
          this.getAppHeader()
          this.loading = false
          return new Promise((resolve, reject) => {
            resolve()
          })
        })
      } catch (error) {
        this.loading = false
      }
    },
    async removeStaf(form) {
      this.loading = true
      try {
        await api.post('/v1/app/remove_staf', form).then((resp) => {
          // console.log('staf_remove', resp)
          notifSuccess(resp)
          this.getAppHeader()
          this.loading = false
        })
      } catch (error) {
        this.loading = false
      }
    }

  }

})
