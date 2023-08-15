import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifErr, notifSuccess, waitLoad } from 'src/modules/utils'

export const useAdminPegawaiStore = defineStore('admin_pegawai_store', {
  state: () => ({
    loading: false,
    pegawaies: [],
    pegawai: null,
    form: {},
    params: {
      q: '',
      page: 1,
      per_page: 10
    },
    meta: {},
    levels: ['admin', 'level 1', 'level 2', 'level 3'],
    level: ''

  }),
  actions: {
    // local related function

    // api related function

    getDataTable () {
      waitLoad('show')
      const params = { params: this.params }
      return new Promise((resolve, reject) => {
        api
          .get('v1/pegawai/index', params)
          .then((resp) => {
            waitLoad('done')
            // console.log(resp)
            if (resp.status === 200) {
              this.pegawaies = resp.data.data
              this.meta = resp.data.meta
              resolve(resp.data.data)
            }
          })
          .catch((err) => {
            waitLoad('done')
            reject(err)
          })
      })
    },
    userRegistration () {
      this.loading = true
      this.pegawai.name = this.pegawai.nama
      return new Promise((resolve, reject) => {
        api.post('v1/auth/register', this.pegawai)
          .then(resp => {
            this.loading = false
            notifSuccess(resp)
            this.pegawai = null
            resolve(resp)
          })
          .catch(err => {
            this.loading = false
            notifErr(err)
            resolve(err)
          })
      })
    }
  }
})
