import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { useListKunjunganBpjsStore } from './lists'
import { notifSuccess } from 'src/modules/utils'

export const useSepBpjsStore = defineStore('sep_bpjs', {
  state: () => ({
    loading: false,
    isOpen: false
  }),
  actions: {
    setOpen() {
      this.isOpen = !this.isOpen
    },
    async getSep(val) {
      this.loading = true
      console.log('form', val)
      await api.post('v1/simrs/bridgingbpjs/pendaftaran/re-createsep', val)
        .then(resp => {
          const list = useListKunjunganBpjsStore()
          list.getLists()
          this.loading = false
          console.log('sep', resp.data.data)
          val.sep = resp.data?.data?.ins?.rs8
          notifSuccess(resp)
          Promise(resolve => { resolve(resp) })
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
})
