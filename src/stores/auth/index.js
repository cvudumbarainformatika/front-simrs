import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import * as storage from 'src/modules/storage'
import { routerInstance } from 'src/boot/router'
import { removeToken, waitLoad } from 'src/modules/utils'
import { useAplikasiStore } from '../app/aplikasi'
// import { chatChannel } from 'src/modules/localsocket'
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
    depo: {},
    mode: 'qr',

    // baru
    onlineUsers: []
  }),
  getters: {
    isAuth (state) {
      return state.token !== null || state.token !== undefined
    },
    getToken: () => storage.getLocalToken(),
    userGetter: () => storage.getUser() !== null || storage.getUser() !== undefined
  },
  actions: {
    loginQr(payload) {
      this.loading = true
      return new Promise((resolve, reject) => {
        api.post('/v1/login-qr', payload).then(resp => {
          storage.setLocalToken(resp.data.token)
          storage.setUser(resp.data.user)
          localStorage.setItem('activeTime', new Date())
          const hdd = storage.getLocalToken()
          const hddUser = storage.getUser()
          if (hdd && hddUser) {
            this.SET_TOKEN_USER(hdd, hddUser)
          }
          resolve(resp)
        })
          .catch(error => {
            console.log('err loginQr', error.response)
            reject(error)
          })
      })
    },
    login (payload) {
      this.loading = true
      // waitLoad('show')
      return new Promise((resolve, reject) => {
        api.post('/v1/login', payload)
          .then(resp => {
            storage.setLocalToken(resp.data.token)
            storage.setUser(resp.data.user)
            localStorage.setItem('activeTime', new Date())
            // console.log('login', resp)
            const hdd = storage.getLocalToken()
            const hddUser = storage.getUser()
            if (hdd && hddUser) {
              this.SET_TOKEN_USER(hdd, hddUser)
            }
            resolve(resp)
          })
          .catch((error) => {
            console.log(error)
            this.loading = false
            reject(error)
          })
      })
    },
    SET_TOKEN_USER (token, auth) {
      storage.setHeaderToken(token)
      this.token = token
      this.user = auth
      // send to channel

      this.loading = false
      routerInstance.push({ path: '/' })
      setTimeout(() => {
        this.loading = false
      }, 2000)
    },
    REMOVE_LOKAL () {
      storage.clearStore()
      storage.deleteLocalToken()
      storage.deleteHeaderToken()
      storage.deleteUser()
      storage.deleteCurrentApp()
      storage.delAkses()
      storage.delApps()
      storage.delX()
      storage.delAutoPend()
      this.user = null
      this.token = ''
    },
    async getUser () {
      try {
        await api.get('/v1/me').then(resp => {
          // console.log('me', resp)
          storage.setUser(resp.data.result)
          this.user = resp.data.result
          this.mapingMenu2(resp.data)
        })
      } catch (error) {
        removeToken()
      }
    },
    async getUserNew() {
      this.loading = true

      await api.get('/v1/authuser').then(resp => {
        if (resp.status === 200) {
          this.loading = false
          const hdd = storage.setUser(resp?.data?.user)
          if (hdd) {
            this.currentUser = resp?.data?.user
          }

          const user = resp?.data?.user
          const aplikasi = resp?.data?.apps
          const akses = resp?.data?.akses
          apps.setUser(user)
          apps.setItems(aplikasi)
          apps.setAksesApps(akses)

          // --- ada user yang tidak update datanya
          // const stringnya1 = localStorage.getItem('aplikasiX')
          // if (stringnya1 === null) {
          //   const temp = {
          //     items: [],
          //     aksesApps: [],
          //     aksesMenus: [],
          //     aksesSubs: [],
          //     currentApp: null,
          //     user: {},
          //     gudangs: [],
          //     polis: [],
          //     ruangs: [],
          //     depos: [
          //       { nama: 'Floor Stock 1 (AKHP)', value: 'Gd-03010101' },
          //       { nama: 'Depo Rawat inap', value: 'Gd-04010102' },
          //       { nama: 'Depo OK', value: 'Gd-04010103' },
          //       { nama: 'Depo Rawat Jalan', value: 'Gd-05010101' },
          //       { nama: 'Depo IGD', value: 'Gd-02010104' }
          //     ]
          //   }
          //   localStorage.setItem('aplikasiX', JSON.stringify(temp))
          // }

          // const stringnya = localStorage.getItem('aplikasiX')
          // console.log('the app', stringnya)

          // if (stringnya !== null) {
          //   const localAppss = JSON.parse(localStorage.getItem('aplikasiX'))

          //   console.log('the app yes', localAppss)
          //   if (!Object.keys(localAppss?.user).length) {
          //     localAppss.user = user
          //     localStorage.setItem('aplikasiX', JSON.stringify(localAppss))
          //   }
          //   if (!localAppss?.items.length) {
          //     localAppss.items = aplikasi
          //     localStorage.setItem('aplikasiX', JSON.stringify(localAppss))
          //   }
          //   if (!localAppss?.aksesApps.length) {
          //     localAppss.aksesApps = akses
          //     localStorage.setItem('aplikasiX', JSON.stringify(localAppss))
          //   }
          // }
          // else {
          //   const key = ['items', 'aksesApps', 'aksesMenus', 'aksesSubs', 'currentApp', 'user', 'gudangs', 'polis', 'ruangs', 'depos']
          //   const temp = {}
          //   key.forEach(a => {
          //     temp[a] = apps[a]
          //   })
          //   const jsonnya = JSON.stringify(temp)
          //   console.log('else nya', temp, jsonnya)
          //   // localStorage.setItem('aplikasiX', JSON.stringify(temp))
          //   console.log('the app no', temp)
          // }
          // --- ada user yang tidak update datanya end
        }
      })
        .catch(() => {
          removeToken()
          this.loading = false
        })
    },

    logout () {
      waitLoad('show')
      // try {

      this.REMOVE_LOKAL()
      setTimeout(() => {
        routerInstance.replace('/login')
        waitLoad('done')
      }, 200)

      // } catch (error) {
      //   console.log(error)
      //   waitLoad('done')
      // }
    }
  }
})
