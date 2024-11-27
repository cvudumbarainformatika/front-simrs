/* eslint-disable no-unused-vars */
import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { usePengunjungRanapStore } from './pengunjung'
// eslint-disable-next-line no-unused-vars
import { notifErrVue, notifSuccess } from 'src/modules/utils'

export const useRuangKonsulDokterStore = defineStore('ruang-konsul-store', {
  state: () => ({
    items: [],
    meta: null,

    item: null,

    loading: false,
    loadingSave: false,

    form: {
      jawaban: 'Dengan Hormat, ' + '\n' + 'Sesuai Permintaan konsultasi pada Pemeriksaan pasien, kami dapati saat ini' + '\n' + '\n' + '\n' + 'Saran Tindakan medik / Pengobatan : ' + '\n'
    }

  }),
  // getters: {
  //   doubleCount: (state) => state.counter * 2
  // },
  actions: {
    /**
     * Mendapatkan data ruang konsul dokter yang ada di rumah sakit
     * @returns {Promise<void>}
     */
    async getRuangKonsulDokter () {
      this.loading = true
      try {
        const { data } = await api.get('v1/simrs/ranap/layanan/konsultasi/getdatarkd')
        console.log('resp rkd', data)

        this.meta = data
        this.items = data?.data ?? []
        this.loading = false
      }
      catch (error) {
        console.log(error)
      }
    },

    initReset (val) {
      this.form = {
        jawaban: val?.jawaban ?? this.form.jawaban ?? null
      }
    },

    async updateFlag (val) {
      const target = this.items.findIndex(x => x?.id === val?.id)
      if (target > -1) {
        if (this.items[target].flag === null || this.items[target].flag === '') {
          this.items[target].flag = '1'

          const payload = { id: val?.id }
          try {
            await api.post('v1/simrs/ranap/layanan/konsultasi/updateFlag', payload)
          }
          catch (error) {
            const target = this.items.findIndex(x => x?.id === val?.id && x?.flag === '1')
            if (target > -1) {
              this.items[target].flag = null
            }
          }
        }
      }

      if (val.jawaban) {
        this.initReset(val)
      }
    },

    // khusus save jawaban ranap
    async saveJawaban (val) {
      const target = this.items.findIndex(x => x?.id === val?.id)
      if (target > -1) {
        this.items[target].jawaban = val.jawaban
      }

      this.form.id = val?.id
      this.form.noreg = val?.noreg
      this.form.kelas_ruangan = val?.kunjunganranap?.kelas_ruangan
      this.form.kdgroup_ruangan = val?.kunjunganranap?.kdgroup_ruangan
      // this.form.kdruang = val?.kdruang !== 'POL014' ? val?.kunjunganranap?.rs5 : val?.kunjunganigd?.rs8
      this.form.kdruang = val?.kdruang
      this.form.kodesistembayar = val?.kunjunganranap?.kodesistembayar

      this.loadingSave = true
      console.log('this.form', this.form, val)

      return new Promise((resolve, reject) => {
        api.post('v1/simrs/ranap/layanan/konsultasi/updateJawaban', this.form)
          .then(resp => {
            if (resp.status === 200) {
              if (target > -1) {
                this.items[target].jawaban = resp.data.result?.jawaban
              }
              this.initReset(resp.data.result)
              this.loadingSave = false
              notifSuccess(resp)
            }
            resolve(resp)
          })
          .catch(err => {
            if (target > -1) {
              this.items[target].jawaban = null
            }
            this.loadingSave = false
            reject(err)
          })
      })
    }
  }
})
