import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifSuccess } from 'src/modules/utils'

export const useMasterDiagnosaKeperawatan = defineStore('master-diagnosa-keperawatan', {
  state: () => ({
    items: [],
    loadingList: false,
    loadingsave: false,
    form: {
      kode: '',
      nama: ''
    },
    errorsForm: null,
    editedForm: false
  }),
  // getters: {
  //   doubleCount: (state) => state.counter * 2
  // },
  actions: {
    async saveData() {
      this.loadingsave = true
      this.editedForm = false
      try {
        const resp = await api.post('v1/simrs/master/diagnosakeperawatan/store', this.form)
        // console.log(resp)
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
      } catch (error) {
        console.log(error)
        this.loadingsave = false
      }
    },

    async getData() {
      this.loadingList = true
      const resp = await api.get('v1/simrs/master/diagnosakeperawatan/getall')
      // console.log(resp)
      if (resp.status === 200) {
        this.items = resp?.data?.result
      }
      this.loadingList = false
    },

    editForm(val) {
      this.editedForm = true
      this.form = val
    },

    async deleteItem(id) {
      const payload = { id }
      try {
        const resp = await api.post('v1/simrs/master/diagnosakeperawatan/delete', payload)
        // console.log(resp)
        if (resp.status === 200) {
          notifSuccess(resp)
          const findItem = this.items.filter(x => x.id === id)
          if (findItem.length) {
            const pos = this.items.findIndex(el => el.id === id)
            if (pos >= 0) { this.items.splice(pos, 1) }
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    resetForm() {
      this.form = null
      return new Promise((resolve, reject) => {
        this.form = {
          kode: null,
          nama: null
        }

        resolve()
      })
    }
  }
})
