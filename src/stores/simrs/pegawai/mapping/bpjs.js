import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifErrVue, notifSuccess } from 'src/modules/utils'

export const useBpjsMappingDokter = defineStore('mapping-dokter-bpjs', {
  state: () => ({
    listdokter: [],
    pegawais: [],
    loadingListDikter: false,
    objDokter: null,
    searchResultKepeg: null,
    loadingSave: false,
    form: {
      nip: '',
      kddpjp: ''
    },
    ygsudahdimappings: []
  }),
  // getters: {
  //   doubleCount: (state) => state.counter * 2
  // },
  actions: {
    async getDokters() {
      this.loadingListDikter = true
      try {
        const resp = await api.get('v1/simrs/maping/simpegsimrs/listdokterbpjs')
        console.log('get dokter bpjs', resp)
        if (resp.status === 200) {
          this.listdokter = resp?.data?.result
          this.loadingListDikter = false
        }
        this.loadingListDikter = false
      } catch (error) {
        console.log(error)
        this.loadingListDikter = false
      }
    },
    async getSimpeg() {
      try {
        const resp = await api.get('v1/simrs/maping/simpegsimrs/pegawaisimpeg')
        console.log('pegawai', resp)
        if (resp.status === 200) {
          this.pegawais = resp?.data
        }
      } catch (error) {
        console.log(error)
      }
    },
    setObjDokter(val) {
      this.objDokter = val
    },
    async saveMapping() {
      const notValidNakes = this.objDokter === null || this.objDokter === ''
      const notValidNKepeg = this.searchResultKepeg === null || this.searchResultKepeg === ''
      if (notValidNakes) {
        notifErrVue('Maaf.... Pilih DOKTER Terlebih dahulu!')
      } else if (notValidNKepeg) {
        notifErrVue('Maaf.... Cari Data KEPEGAWAIAN Terlebih dahulu!')
      } else {
        this.loadingSave = true
        this.form.nip = this.searchResultKepeg?.nip
        this.form.kddpjp = this.objDokter?.kodedokter
        try {
          const resp = await api.post('v1/simrs/maping/simpegsimrs/simpanmapingbpjs', this.form)
          if (resp?.status === 200) {
            this.setDataTermapping(resp?.data?.result)
            notifSuccess(resp)
            this.loadingSave = false
            console.log(this.ygsudahdimappings)
            const target = this.pegawais?.filter(x => x.nip === this.searchResultKepeg?.nip)
            if (target.length) {
              target[0].kddpjp = this.objDokter?.kodedokter
            }
            this.objDokter = null
            this.searchResultKepeg = null
            this.form = {
              nip: '',
              kddpjp: ''
            }
          }
          this.loadingSave = false
        } catch (error) {
          console.log(error)

          this.loadingSave = false
        }
      }
    },
    async getDataTermapping(arr) {
      const resp = await api.get('v1/simrs/maping/simpegsimrs/datatermapingbpjs')
      if (resp.status === 200) {
        this.setDataTermapping(resp?.data)
      }
    },
    setDataTermapping(arr) {
      this.ygsudahdimappings = arr.length ? arr?.map(x => x.kddpjp) : []
    }
  }
})
