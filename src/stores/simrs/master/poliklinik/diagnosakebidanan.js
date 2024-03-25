/* eslint-disable no-unused-vars */
import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifSuccess } from 'src/modules/utils'

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

    intervensi: [],
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
      this.isIntervensi = !this.isIntervensi
      this.diagnosa = val
    },

    addGroupIntervensi(val) {
      this.groupIntervensis.push(val)
    }

  }
})
