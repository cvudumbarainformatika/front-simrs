import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifSuccess } from 'src/modules/utils'

export const useMasterPemeriksaanFisik = defineStore('master-pemeriksaan-fisik', {
  state: () => ({
    items: [],
    selected: null,
    loadingSave: false,
    multiLokalis: [],
    masterpoli: [],
    form: {
      nama: '',
      icon: '',
      lokalis: ''
    },

    formImg: {
      nama: '',
      mpemeriksaanfisik_id: ''
    },
    isFromImg: false

  }),
  actions: {
    async getMasterPoli() {
      const resp = await api.get('v1/simrs/master/listmasterpoli')
      console.log('poli', resp)
      if (resp.status === 200) {
        this.masterpoli = resp.data
      }
    },
    async simpanMaster() {
      // console.log(this.form)
      history.loadingSave = true
      try {
        const resp = await api.post('v1/simrs/master/pemeriksaanfisik/simpanmasterpemeriksaan', this.form)
        if (resp.status === 200) {
          this.items.push(resp?.data?.result)
          notifSuccess(resp)
          this.loadingSave = false
          this.initReset()
        }
        this.loadingSave = false
      } catch (error) {
        console.log(error)
        this.loadingSave = false
      }
    },

    setForm(key, val) {
      this.form[key] = val
    },

    async getData() {
      const resp = await api.get('v1/simrs/master/pemeriksaanfisik/data')
      console.log('get mpemeriksaan fisik', resp)
      if (resp.status === 200) {
        this.items = resp.data
      }
    },

    selectedItem(item) {
      this.multiLokalis = []
      this.isFromImg = false
      this.form = item
      const arr = item?.lokalis?.split('||')
      const found = this.masterpoli?.filter(item => arr.includes(item?.kodepoli))
      console.log('founds', found)
      this.multiLokalis = found
    },

    addImg(item) {
      this.isFromImg = true
      this.formImg.mpemeriksaanfisik_id = item?.id
      this.formImg.nama = item?.nama
    },

    uploadImages(file) {
      const files = file
      console.log('store upload image', files)
      const data = new FormData()
      for (let i = 0; i < files.length; i++) {
        const images = files[i]
        data.append(`images[${i}]`, images)
      }
      data.append('mpemeriksaanfisik_id', this.formImg.mpemeriksaanfisik_id)
      return new Promise((resolve, reject) => {
        api.post('v1/simrs/master/pemeriksaanfisik/uploads', data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then(res => {
            console.log('uploads', res)
            const objIndex = this.items.findIndex(obj => obj.id === res?.data?.result?.id)
            if (objIndex > -1) {
              this.items[objIndex] = res?.data?.result
            }
            notifSuccess(res)
            resolve(res)
          }).catch(err => {
            console.log('upload err', err)
          })
      })
    },

    async deleteImg(obj) {
      const payload = { mpemeriksaanfisik_id: obj.itemid, id: obj.id }
      const resp = await api.post('v1/simrs/master/pemeriksaanfisik/deletetemplate', payload)
      console.log('delete template', resp)
      if (resp.status === 200) {
        const objIndex = this.items.findIndex(obj => obj.id === resp?.data?.result?.id)
        if (objIndex > -1) {
          this.items[objIndex] = resp?.data?.result
        }
        notifSuccess(resp)
      }
    },
    initReset() {
      this.form = null
      return new Promise((resolve, reject) => {
        this.form = {
          nama: '',
          icon: '',
          lokalis: ''
        }

        this.multiLokalis = []

        resolve()
      })
    }
  }
})
