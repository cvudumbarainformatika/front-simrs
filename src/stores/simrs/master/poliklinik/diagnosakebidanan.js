/* eslint-disable no-unused-vars */
import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifErrVue, notifSuccess } from 'src/modules/utils'

export const useMasterDiagnosaKebidanan = defineStore('master-diagnosa-kebidanan', {
  state: () => ({
    items: [],
    loadingList: false,
    loadingsave: false,
    form: {
      kode: '',
      nama: ''
    },
    errorsForm: null,
    editedForm: false,
    isIntervensi: false,
    diagnosa: null,

    intervensi: null,
    groupIntervensis: []
  }),
  actions: {
    saveDiagnosa() {
      this.loadingsave = true
      this.editedForm = false
      return new Promise((resolve, reject) => {
        api.post('v1/simrs/master/diagnosakebidanan/store', this.form)
          .then((resp) => {
            if (resp.status === 200) {
              notifSuccess(resp)
              const ada = this.items.filter(x => x.id === resp?.data?.result?.id)
              if (!ada.length) {
                this.items?.splice(0, 0, resp.data.result)
              }
              this.resetForm()
            } else if (resp.status === 201) {
              this.errorsForm = resp?.data?.message
            }
            this.loadingsave = false
          })
          .catch(err => {
            console.log('err', err.response.data)
            this.loadingsave = false
          })
      })
    },
    async getData() {
      this.loadingList = true
      const resp = await api.get('v1/simrs/master/diagnosakebidanan/getall')
      console.log('master diagnosa kebidanan', resp)
      if (resp.status === 200) {
        this.items = resp?.data?.result
      }
      this.loadingList = false
    },

    setIntervensi(val) {
      this.diagnosa = null
      this.groupIntervensis = []
      this.isIntervensi = !this.isIntervensi
      this.diagnosa = val
      if (val !== null) {
        const arr = this.diagnosa?.intervensis
        const arr2 = arr.length ? arr.map(x => x.group) : []
        const unique = arr2.length ? this.removeDuplicates(arr2) : []
        this.groupIntervensis = unique.length ? unique.map(x => {
          return { group: x, kode: this.diagnosa.kode }
        }) : []
        console.log(this.groupIntervensis)
      }
    },

    removeDuplicates(data) {
      return [...new Set(data)]
    },

    addGroupIntervensi(val) {
      return new Promise((resolve, reject) => {
        const cek = this.groupIntervensis.filter(x => x.group === val)
        if (!cek.length) {
          const obj = {
            kode: this.diagnosa?.kode,
            group: val
          }
          this.groupIntervensis.push(obj)
        } else {
          notifErrVue('Maaf , Group intervensi sudah ada!')
        }
        resolve()
      })
    },

    saveIntervensi(group, row) {
      const form = {
        group,
        nama: row?.nama ?? this.intervensi,
        kode: this.diagnosa?.kode
      }
      if (row?.id) {
        form.id = row?.id
      }

      console.log(form)
      return new Promise((resolve, reject) => {
        api.post('v1/simrs/master/diagnosakebidanan/storeintervensi', form)
          .then((resp) => {
            if (resp.status === 200) {
              notifSuccess(resp)

              const ada = this.diagnosa?.intervensis?.filter(x => x.id === row?.id)
              console.log('ada', this.diagnosa)
              if (!ada.length) {
                this.diagnosa?.intervensis?.push(resp?.data?.result)
              }
              this.intervensi = null
            }
          })

          .catch(error => {
            console.log(error)
            reject(error)
          })
      })
    },
    async deleteIntervensi(id) {
      const payload = { id }
      try {
        const resp = await api.post('v1/simrs/master/diagnosakebidanan/deleteintervensi', payload)
        // console.log(resp)
        if (resp.status === 200) {
          notifSuccess(resp)
          const findItem = this.diagnosa?.intervensis?.filter(x => x.id === id)
          if (findItem.length) {
            const pos = this.diagnosa?.intervensis?.findIndex(el => el.id === id)
            if (pos >= 0) { this.diagnosa?.intervensis.splice(pos, 1) }
          }
        }
      } catch (error) {
        console.log(error)
      }
    }

  }
})
