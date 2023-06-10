import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import * as storage from 'src/modules/storage'
import { routerInstance } from 'src/boot/router'
import { notifErrVue, removeToken, waitLoad } from 'src/modules/utils'
import { useAplikasiStore } from '../app/aplikasi'
// import { useRouter } from 'vue-router'

const apps = useAplikasiStore()

export const useAuthStore = defineStore('auth', {
  state: () => ({
    state: () => ({
      token: localStorage.getItem('token') ? storage.getLocalToken() : null,
      user: localStorage.getItem('user') ? storage.getUser() : null
    }),
    currentUser: localStorage.getItem('user') ? storage.getUser() : null,
    loading: false,
    aplications: [],
    menus: [],
    role: '',
    foto: '',
    route: {},
    ruang: {},
    kode_ruang: null,
    depo: {}
  }),
  getters: {
    isAuth (state) {
      return state.token !== null || state.token !== undefined
    },
    getToken: () => storage.getLocalToken(),
    userGetter: () => storage.getUser() !== null || storage.getUser() !== undefined
  },
  actions: {
    // maping menu
    mapingMenu(val) {
      // ini sebagai catatan
      // console.log('prototype aplikasi', Object.getPrototypeOf(val.aplikasi).constructor.name === 'Object')
      // console.log('prototype menu', Object.getPrototypeOf(val.menus).constructor.name === 'Object')
      // console.log('prototype role', Object.getPrototypeOf(val.role).constructor.name === 'Array')
      // console.log('prototype submenu', Object.getPrototypeOf(val.submenu).constructor.name === 'Array')
      console.log('data menu', val)

      const aplKey = Object.keys(val.aplikasi)
      const menuKey = Object.keys(val.menus)
      console.log('submenu', menuKey)
      const apli = aplKey.map(key => {
        const temp = {}
        temp.aplikasi = val.aplikasi[key].aplikasi
        temp.id = val.aplikasi[key].id
        temp.color = val.aplikasi[key].color
        temp.url = val.aplikasi[key].url
        temp.keterangan = val.aplikasi[key].keterangan
        temp.julukan = val.aplikasi[key].julukan
        temp.singkatan = val.aplikasi[key].singkatan
        temp.icon = val.aplikasi[key].icon
        temp.nama = val.aplikasi[key].nama
        const menu = menuKey.map(menu => {
          if (val.aplikasi[key].id === val.menus[menu].aplikasi_id) {
            return val.menus[menu]
          } else { return false }
        })

        const menus = menu.filter(data => { return data !== false })
          .map(men => {
            if (Object.getPrototypeOf(men.submenus).constructor.name === 'Object') {
              const a = Object.keys(men.submenus)
              const b = []
              a.forEach(mbem => {
                b.push(men.submenus[mbem])
              })
              const c = {
                aplikasi_id: men.aplikasi_id,
                icon: men.icon,
                link: men.link,
                nama: men.nama,
                name: men.name,
                submenus: b
              }
              return c
            } else {
              return men
            }
          })
        temp.menus = menus
        // console.log('menus', menus)

        return temp
      })
      this.aplications = apli
      this.role = val.role[0].nama
      this.foto = val.foto
      this.ruang = val.ruang
      this.kode_ruang = val.kode_ruang
      this.depo = val.depo
      if (apli.length === 1) {
        this.menus = apli[0].menus
        const apem = {}
        switch (apli[0].aplikasi) {
          case 'sigarang':
            console.log('switch sigarang', apli[0].aplikasi)
            if (this.menus.length) {
              if (this.menus[0].submenus.length) {
                apem.link = this.menus[0].submenus[0].link
                apem.name = this.menus[0].submenus[0].name
                this.route = this.menus[0].submenus[0]
              }
            }
            break
          case 'pegawai':
            console.log('switch pegawai', apli[0].aplikasi)
            if (this.menus.length) {
              if (this.menus[0].submenus.length) {
                apem.link = this.menus[0].submenus[0].link
                this.route = this.menus[0].submenus[0]
              }
            }
            break
          case 'master':
            console.log('switch master', apli[0].aplikasi)
            if (this.menus.length) {
              if (this.menus[0].submenus.length) {
                apem.link = this.menus[0].submenus[0].link
                this.route = this.menus[0].submenus[0]
              }
            }
            break
          case 'pendaftaran':
            console.log('switch pendaftaran', apli[0].aplikasi)
            if (this.menus.length) {
              if (this.menus[0].submenus.length) {
                apem.link = this.menus[0].submenus[0].link
                this.route = this.menus[0].submenus[0]
              }
            }
            break

          default:
            // console.log('switch default', apli[0].aplikasi)
            this.route.link = '/admin/sso'
            // router.replace({ name: 'admin.sso' })
            break
        }
        // console.log('panjangnya cuma satu', apli)
      }
      // console.log('aplikasi', apli)
      // console.log('role', this.role)
    },
    mapingMenu2(val) {
      // ini sebagai catatan
      // console.log('prototype aplikasi', Object.getPrototypeOf(val.aplikasi).constructor.name === 'Object')
      // console.log('prototype menu', Object.getPrototypeOf(val.menus).constructor.name === 'Object')
      // console.log('prototype role', Object.getPrototypeOf(val.role).constructor.name === 'Array')
      // console.log('prototype submenu', Object.getPrototypeOf(val.submenu).constructor.name === 'Array')
      // console.log('data menu', val)

      const aplKey = Object.keys(val.aplikasi2)
      const menuKey = Object.keys(val.menus2)
      console.log('submenu', menuKey)
      const apli = aplKey.map(key => {
        const temp = {}
        temp.aplikasi = val.aplikasi2[key].aplikasi
        temp.id = val.aplikasi2[key].id
        temp.color = val.aplikasi2[key].color
        temp.url = val.aplikasi2[key].url
        temp.keterangan = val.aplikasi2[key].keterangan
        temp.julukan = val.aplikasi2[key].julukan
        temp.singkatan = val.aplikasi2[key].singkatan
        temp.icon = val.aplikasi2[key].icon
        temp.nama = val.aplikasi2[key].nama
        const menu = menuKey.map(menu => {
          if (val.aplikasi2[key].id === val.menus2[menu].aplikasi_id) {
            return val.menus2[menu]
          } else { return false }
        })

        const menus = menu.filter(data => { return data !== false })
          .map(men => {
            if (Object.getPrototypeOf(men.submenus).constructor.name === 'Object') {
              const a = Object.keys(men.submenus)
              const b = []
              a.forEach(mbem => {
                b.push(men.submenus[mbem])
              })
              const c = {
                aplikasi_id: men.aplikasi_id,
                icon: men.icon,
                link: men.link,
                nama: men.nama,
                name: men.name,
                submenus: b
              }
              return c
            } else {
              return men
            }
          })
        temp.menus = menus
        // console.log('menus', menus)

        return temp
      })
      this.aplications = apli
      this.role = val.role[0].nama
      this.foto = val.foto
      this.ruang = val.ruang
      this.kode_ruang = val.kode_ruang
      this.depo = val.depo
      if (apli.length === 1) {
        this.menus = apli[0].menus
        const apem = {}
        switch (apli[0].aplikasi) {
          case 'sigarang':
            // console.log('switch sigarang', apli[0].aplikasi)
            if (this.menus.length) {
              if (this.menus[0].submenus.length) {
                apem.link = this.menus[0].submenus[0].link
                apem.name = this.menus[0].submenus[0].name
                this.route = this.menus[0].submenus[0]
              }
            }
            break
          case 'pegawai':
            // console.log('switch pegawai', apli[0].aplikasi)
            if (this.menus.length) {
              if (this.menus[0].submenus.length) {
                apem.link = this.menus[0].submenus[0].link
                this.route = this.menus[0].submenus[0]
              }
            }
            break
          case 'master':
            console.log('switch master', apli[0].aplikasi)
            if (this.menus.length) {
              if (this.menus[0].submenus.length) {
                apem.link = this.menus[0].submenus[0].link
                this.route = this.menus[0].submenus[0]
              }
            }
            break

          default:
            // console.log('switch default', apli[0].aplikasi)
            this.route.link = '/admin/sso'
            // router.replace({ name: 'admin.sso' })
            break
        }
        // console.log('panjangnya cuma satu', apli)
      }
      // console.log('aplikasi', apli)
      // console.log('role', this.role)
    },

    //
    async login (payload) {
      this.loading = true
      waitLoad('show')
      try {
        // await api.post('/v2/login', payload).then(resp => {
        await api.post('/v1/login', payload).then(resp => {
          storage.setLocalToken(resp.data.token)
          storage.setUser(resp.data.user)
          // console.log('login', resp)
          const hdd = storage.getLocalToken()
          const hddUser = storage.getUser()
          if (hdd) {
            this.SET_TOKEN_USER(hdd, hddUser)
          }
          this.loading = false
          waitLoad('done')
          // this.mapingMenu2(resp.data)
        })
      } catch (error) {
        waitLoad('done')
        this.loading = false
        // console.log('err login', error.response)
        // notifErr(error.response)
      }
    },
    login2(payload) {
      this.loading = true
      waitLoad('show')
      return new Promise((resolve) => {
        api.post('/v1/login', payload)
          .then(resp => {
            console.log('login', resp)
            if (Object.keys(resp.data.aplikasi).length) {
              storage.setLocalToken(resp.data.token)
              storage.setUser(resp.data.user)
              const hdd = storage.getLocalToken()
              const hddUser = storage.getUser()
              if (hdd) {
                this.SET_TOKEN_USER(hdd, hddUser)
              }
              resolve(resp)
              this.mapingMenu2(resp.data)
            } else {
              notifErrVue('Anda tidak memiliki Akses')
            }
            this.loading = false
            waitLoad('done')
          }).catch(() => {
            this.loading = false
            waitLoad('done')
          })
      })
    },
    SET_TOKEN_USER (token, user) {
      storage.setHeaderToken(token)
      this.token = token
      this.user = user
      this.loading = false
      routerInstance.push('/')
    },
    REMOVE_LOKAL () {
      storage.deleteLocalToken()
      storage.deleteHeaderToken()
      storage.deleteUser()
      storage.deleteCurrentApp()
      storage.delAkses()
      storage.delApps()
      storage.delX()
      this.user = null
      this.token = ''
    },
    async getUser () {
      try {
        await api.get('/v1/me').then(resp => {
          console.log('me', resp)
          storage.setUser(resp.data.result)
          this.user = resp.data.result
          this.mapingMenu2(resp.data)
        })
      } catch (error) {
        removeToken()
      }
    },
    async getUserNew() {
      try {
        await api.get('/v1/authuser').then(resp => {
          // console.log('authuser', resp)
          if (resp.status === 200) {
            storage.setUser(resp.data.user)
            // storage.setApps(resp.data.apps)
            apps.setItems(resp.data.apps)
            apps.setAksesApps(resp.data.akses)
            // storage.setAkses(resp.data.akses)
          }
        })
      } catch (error) {
        removeToken()
      }
    },

    async logout () {
      waitLoad('show')
      try {
        await api.post('/v1/logout').then(resp => {
          this.REMOVE_LOKAL()
          routerInstance.replace('/login')
          waitLoad('done')
        })
      } catch (error) {
        console.log(error)
        waitLoad('done')
      }
    }
  }
})
