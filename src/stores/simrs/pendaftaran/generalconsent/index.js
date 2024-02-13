import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { dateDbFormat } from 'src/modules/formatter'
// eslint-disable-next-line no-unused-vars
import { notifErrVue } from 'src/modules/utils'
import { useListKunjunganBpjsStore } from 'src/stores/simrs/pendaftaran/kunjungan/bpjs/lists'
import { useAplikasiStore } from 'src/stores/app/aplikasi'

export const useGeneralConsentStore = defineStore('general_consent', {
  state: () => ({
    items: [],
    loading: false,

    form: {
      tanggal: dateDbFormat(new Date()),
      petugas: null,
      nama: null,
      norm: null,
      alamat: null,
      nohp: null,
      hubunganpasien: 'Diri Sendiri',
      ttdpasien: null,
      ttdpetugas: null,
      nikpetugas: null
    },

    options: ['Diri Sendiri', 'Ayah Kandung', 'Ibu Kandung', 'Kakak Kandung', 'Adik Kandung', 'Paman', 'Kakek', 'Cucu', 'Saudara']
  }),
  // getters: {
  //   doubleCount: (state) => state.counter * 2
  // },
  actions: {
    async getData() {
      this.loading = true
      try {
        const resp = await api.get('/v1/simrs/pendaftaran/generalconscent/mastergeneralconsent')
        console.log('master general consent', resp)
        if (resp.status === 200) {
          this.items = resp.data
          this.loading = false
        }
        this.loading = false
      } catch (error) {
        this.loading = false
      }
    },

    setForm(frm, val) {
      this.form[frm] = val
    },
    resetFORM() {
      this.form = {}
      const columns = [
        'tanggal',
        'petugas',
        'nama',
        'norm',
        'alamat',
        'nohp',
        'hubunganpasien',
        'ttdpasien',
        'ttdpetugas'
      ]
      for (let i = 0; i < columns.length; i++) {
        this.setForm(columns[i], null)
      }
      this.setForm('tanggal', dateDbFormat(new Date()))
    },
    saveGeneralConsentPasien(pegawai) {
      if (!this.form.ttdpasien) {
        notifErrVue('Maaf tanda tangan pasien Belum Ada')
        return
      }
      if (!this.form.norm) {
        notifErrVue('Maaf NORM pasien KOSONG !!!')
        return
      }
      if (!pegawai.nik) {
        notifErrVue('Maaf !, NIK Petugas Tidak Boleh KOSONG !!!')
        return
      }
      // console.log('save general cons', pegawai)
      this.form.nikpetugas = pegawai?.nik
      // console.log('save general cons', this.form)
      return new Promise((resolve, reject) => {
        api.post('/v1/simrs/pendaftaran/generalconscent/simpangeneralcontent', this.form)
          .then(resp => {
            console.log(resp)
            this.form.ttdpasien = resp.data?.ttdpasien
            this.form.ttdpetugas = resp.data?.ttdpetugas

            // inject data pasien
            const listpasien = useListKunjunganBpjsStore()
            const target = listpasien.items?.filter(x => x.norm === resp?.data?.norm)
            if (target.length) {
              target[0].ttdpasien = resp.data?.ttdpasien
            }

            // inject data pegawai
            const app = useAplikasiStore()
            const user = app?.user?.pegawai

            user.ttdpegawai = resp.data?.ttdpetugas

            // console.log(user)

            resolve(resp)
          }).catch(err => {
            console.log('save general cons', err)
            reject(err)
          })
      })
    }
  }
})
