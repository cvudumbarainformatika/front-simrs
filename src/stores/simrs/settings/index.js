import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifErrVue } from 'src/modules/utils'
// import { notifSuccess } from 'src/modules/utils'

export const useSettingsAplikasi = defineStore('settings_aplikasi', {
  state: () => ({
    items: [],
    pegawai: null,
    loading: false,
    currentApp: ''
  }),
  // getters: {
  //   doubleCount: (state) => state.counter * 2
  // },
  actions: {
    async getData() {
      this.loading = true
      await api.get('/v1/settings/appmenu/aplikasi').then(resp => {
        console.log('settings aplikasi :', resp)
        if (resp.status === 200) {
          this.items = resp.data
          console.log('setting ', this.items)
          this.loading = false
        }
        this.loading = false
      }).catch(e => {
        this.loading = false
      })
    },

    addNew(val) {
      this.items.unshift(val)
    },
    async saveNew(idx) {
      const params = this.items[idx]
      if (params.icon === null || params.icon === '') {
        return notifErrVue('Maaf, Icon belum dipilih!')
      }
      await api.post('/v1/settings/appmenu/aplikasi_store', params)
        .then((resp) => {
          console.log('post aplikasi store:', resp)
          this.getData()
          return new Promise((resolve, reject) => {
            resolve(resp)
          })
        })
    },
    deleteNew(idx) {
      this.items.splice(idx, 1)
    },
    changeAppIcon(idx, val) {
      return new Promise((resolve, reject) => {
        this.items[idx].icon = val
        resolve(val)
      })
    },
    changeMenuIcon(idx, men, val) {
      return new Promise((resolve, reject) => {
        this.items[idx].menus[men].icon = val
        resolve(val)
      })
    },

    addMenu(idx) {
      const menus = this.items[idx]
      const menu = {
        aplikasi_id: menus.id,
        menuId: 0,
        icon: null,
        link: 'kosong',
        nama: 'kosong',
        name: 'kosong',
        submenus: []
      }

      menus.menus.length > 0 ? menus.menus.unshift(menu) : menus.menus.push(menu)
      console.log('addMenu', menus)
    },

    setPegawai(val) {
      this.pegawai = val
    }
  }
})
