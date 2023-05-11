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
    deleteNew(idx) {
      this.items.splice(idx, 1)
    },
    deleteNewMenu(idx) {
      this.items[idx.i].menus.splice(idx.n, 1)
    },
    deleteNewSubMenu(idx) {
      this.items[idx.i].menus[idx.n].submenus.splice(idx.x, 1)
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
      if (menus.length) {
        const key0 = Object.keys(menus.menus[0])
        const temp = key0.filter(a => a === 'menuId')
        if (temp.length) {
          notifErrVue('isi dulu baru tambah baru')
        } else {
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
        }
      } else {
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
      }
    },
    addSubMenu(idx) {
      const menus = this.items[idx.i].menus[idx.n]
      console.log(menus)
      if (menus.submenus.length) {
        const key0 = Object.keys(menus.submenus[0])
        const temp = key0.filter(a => a === 'submenuId')
        console.log('temp', temp)
        if (temp.length) {
          notifErrVue('isi dulu baru tambah baru')
        } else {
          const menu = {
            menu_id: menus.id,
            submenuId: 0,
            icon: null,
            link: 'kosong',
            nama: 'kosong',
            name: 'kosong'
          }

          menus.submenus.length > 0 ? menus.submenus.unshift(menu) : menus.submenus.push(menu)
        }
      } else {
        const menu = {
          menu_id: menus.id,
          submenuId: 0,
          icon: null,
          link: 'kosong',
          nama: 'kosong',
          name: 'kosong'
        }

        menus.submenus.length > 0 ? menus.submenus.unshift(menu) : menus.submenus.push(menu)
      }
      console.log('addSubMenu', menus)
    },

    setPegawai(val) {
      this.pegawai = val
    },
    // api related function
    async saveNew(idx) {
      const params = this.items[idx]
      delete params.id
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
    editApp(val) {
      const form = val.item
      console.log('form', form)
      this.loading = true
      return new Promise(resolve => {
        api.post('v1/settings/appmenu/aplikasi_store', form)
          .then(resp => {
            this.loading = false
            this.getData()
            resolve(resp.data)
          })
          .catch(() => { this.loading = false })
      })
    },
    saveNewMenu(val) {
      console.log('new menu', val)
      const menu = val.menu
      const key = Object.keys(menu)
      const kosong = key.filter(a => menu[a] === 'kosong')
      console.log('key', key, 'kosong', kosong)
      if (menu.aplikasi_id && menu.icon && !kosong.length) {
        this.loading = true
        return new Promise(resolve => {
          api.post('v1/settings/appmenu/menu-store', menu)
            .then(resp => {
              this.loading = false
              this.getData()
              resolve(resp.data)
            }).catch(() => { this.loading = false })
        })
      } else {
        if (!menu.icon) notifErrVue('Icon belum ada')
        kosong.forEach(anu => {
          notifErrVue(anu + ' masih kosong')
        })
      }
    },
    saveEditMenu(val) {
      console.log('edit menu', val)
      const menu = val.menu
      this.loading = true
      return new Promise(resolve => {
        api.post('v1/settings/appmenu/menu-store', menu)
          .then(resp => {
            this.loading = false
            this.getData()
            resolve(resp.data)
          }).catch(() => { this.loading = false })
      })
    },
    saveNewSubMenu(val) {
      console.log('new sub menu', val)
      const sub = val.sub
      const key = Object.keys(sub)
      const kosong = key.filter(a => sub[a] === 'kosong')
      // console.log('key', key, 'kosong', kosong)
      if (sub.menu_id && !kosong.length) {
        this.loading = true
        return new Promise(resolve => {
          api.post('v1/settings/appmenu/submenu-store', sub)
            .then(resp => {
              this.loading = false
              this.getData()
              resolve(resp.data)
            }).catch(() => { this.loading = false })
        })
      } else {
        kosong.forEach(anu => {
          notifErrVue(anu + ' masih kosong')
        })
      }
    },
    saveEditSubMenu(val) {
      console.log('edit sub menu', val)
      const sub = val.sub
      this.loading = true
      return new Promise(resolve => {
        api.post('v1/settings/appmenu/submenu-store', sub)
          .then(resp => {
            this.loading = false
            this.getData()
            resolve(resp.data)
          }).catch(() => { this.loading = false })
      })
    }
  }
})
