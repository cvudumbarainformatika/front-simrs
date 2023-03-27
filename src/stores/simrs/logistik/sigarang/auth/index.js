import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import * as storage from 'src/modules/storage'
import { routerInstance } from 'src/boot/router'
import { waitLoad } from 'src/modules/utils'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    state: () => ({
      token: localStorage.getItem('token') ? storage.getLocalToken() : null,
      user: localStorage.getItem('user') ? storage.getUser() : null,
      loading: false
    })
  }),
  getters: {
    isAuth (state) {
      return state.token !== null || state.token !== undefined
    },
    getToken: () => storage.getLocalToken(),
    userGetter: () => storage.getUser()
  },
  actions: {
    login1 (data) {
      this.loading = true
      waitLoad('show')
      return new Promise((resolve, reject) => {
        api.post('v1/auth/login', data).then(resp => {
          // console.log(resp.data)
          storage.setLocalToken(resp.data.access_token)
          storage.setUser(resp.data.user)
          const hdd = storage.getLocalToken()
          const hddUser = storage.getUser()
          if (hdd) {
            this.SET_TOKEN_USER(hdd, hddUser)
          }
          this.loading = false
          waitLoad('done')
          resolve(resp)
        }).catch(err => {
          this.loading = false
          waitLoad('done')
          reject(err)
        })
      })
    },
    async login (payload) {
      this.loading = true
      waitLoad('show')
      try {
        await api.post('v1/auth/login', payload).then(resp => {
          // console.log(resp.data)
          storage.setLocalToken(resp.data.access_token)
          storage.setUser(resp.data.user)
          const hdd = storage.getLocalToken()
          const hddUser = storage.getUser()
          if (hdd) {
            this.SET_TOKEN_USER(hdd, hddUser)
          }
          this.loading = false
          waitLoad('done')
        })
      } catch (error) {
        waitLoad('done')
        this.loading = false
      }
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
      this.user = null
      this.token = ''
    },
    async getUser () {
      await api.get('v1/user/profile').then(resp => {
        console.log('me k', resp.data)
        storage.setUser(resp.data)
        this.user = resp.data
      })
    },

    async logout () {
      waitLoad('show')
      try {
        await api.post('v1/auth/logout').then(resp => {
          this.REMOVE_LOKAL()
          routerInstance.replace('/login')
          waitLoad('done')
        })
      } catch (error) {
        console.log('error ', error)
        waitLoad('done')
      }
    }
  }
})
