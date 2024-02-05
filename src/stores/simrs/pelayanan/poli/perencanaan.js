import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { dateDbFormat } from 'src/modules/formatter'
import { notifErrVue, notifInfVue, notifSuccess } from 'src/modules/utils'
import { usePengunjungPoliStore } from './pengunjung'

export const usePerencanaanPoliStore = defineStore('perencanaan-poli', {
  state: () => ({
    plannings: [],
    poli: [],
    plann: '',
    loadingSaveKonsul: false,
    loadingSaveKontrol: false,
    loadingSaveSelesai: false,
    loadingHapus: false,
    loadingNoka: false,
    formKonsul: {
      kdSaran: '3',
      noreg_lama: '',
      norm: '',
      tgl_kunjungan: '',
      tgl_rencana_konsul: dateDbFormat(new Date()),
      kdpoli_asal: '',
      kdpoli_tujuan: '',
      kddokter_asal: ''
    },
    formKontrol: {
      noreg_lama: '',
      norm: '',
      tgl_kunjungan: '',
      tglrencanakunjungan: dateDbFormat(new Date()),
      kdpoli_asal: '',
      kdpoli_tujuan: '',
      kddokter_asal: ''
    },
    formRsLain: {
      norm: '',
      noka: '',
      nosep: '',
      tglrujukan: '',
      tglrencanakunjungan: '',
      ppkdirujuk: '',
      ppkdirujukx: '',
      jenispelayanan: '2',
      catatan: '',
      diagnosarujukan: '',
      tiperujukan: '',
      polirujukan: '',
      namapolirujukan: ''
    },
    formPrb: {
      norm: '',
      noka: '',
      nosep: '',
      tglrujukan: '',
      tglrencanakunjungan: '',
      ppkdirujuk: '',
      ppkdirujukx: '',
      namapolirujukan: '',
      jenispelayanan: '2',
      catatan: '',
      diagnosarujukan: '',
      tiperujukan: '',
      polirujukan: ''
    },
    formRanap: {
      kdSaran: '3',
      noka: '',
      noreg: '',
      norm: '',
      kodedokterdpjp: '',
      kddokter: '',
      dokter: '',
      tglrencanakontrol: '',
      tanggaloperasi: '',
      tglrencanakunjungan: '',
      tglupdate: '',
      jenistindakan: null,
      icd9: null,
      kodepolibpjs: '',
      polibpjs: '',
      keterangan: '',
      kdunit: '',
      kdruang: '',
      kdruangtujuan: '',
      kontakpasien: '',
      nama: '',
      kelamin: '',
      tgllahir: '',
      status: 'Tidak',
      planing: 'Rawat Inap'

    },
    editRanap: false,
    editRsLain: false,
    perujuk: null,
    loadingSave: false,
    jadwalDpjps: [],
    listSeps: [],
    loadingJadwalDokter: false,
    loadingListSep: false,
    openDialogSep: false,
    paramListSep: {
      noka: '',
      tglawal: dateDbFormat(new Date()),
      tglakhir: dateDbFormat(new Date())
    },
    // icd 9
    optionsIcd9: [],
    loadingIcd: false,
    // tindakans
    loadingTind: false,
    optionsJenisTindakan: []
  }),
  // getters: {
  //   doubleCount: (state) => state.counter * 2
  // },
  actions: {
    resetForm() {
      this.editRanap = false
      this.editRsLain = false
      this.formKonsul = {
        kdSaran: '3',
        noreg_lama: '',
        norm: '',
        tgl_kunjungan: '',
        tgl_rencana_konsul: dateDbFormat(new Date()),
        kdpoli_asal: '',
        kdpoli_tujuan: '',
        kddokter_asal: ''
      }
      this.formKontrol = {
        noreg_lama: '',
        norm: '',
        tgl_kunjungan: '',
        tglrencanakunjungan: dateDbFormat(new Date()),
        kdpoli_asal: '',
        kdpoli_tujuan: '',
        kddokter_asal: ''
      }
      this.formRsLain = {
        norm: '',
        noka: '',
        nosep: '',
        tglrujukan: '',
        tglrencanakunjungan: '',
        ppkdirujuk: '',
        ppkdirujukx: '',
        jenispelayanan: '2',
        catatan: '',
        diagnosarujukan: '',
        tiperujukan: '',
        polirujukan: '',
        namapolirujukan: ''
      }
      this.formPrb = {
        norm: '',
        noka: '',
        nosep: '',
        tglrujukan: '',
        tglrencanakunjungan: '',
        ppkdirujuk: '',
        ppkdirujukx: '',
        namapolirujukan: '',
        jenispelayanan: '2',
        catatan: '',
        diagnosarujukan: '',
        tiperujukan: '',
        polirujukan: ''
      }
      this.formRanap = {
        kdSaran: '3',
        noka: '',
        noreg: '',
        norm: '',
        kodedokterdpjp: '',
        kddokter: '',
        dokter: '',
        tglrencanakontrol: '',
        tanggaloperasi: '',
        tglrencanakunjungan: '',
        tglupdate: '',
        jenistindakan: null,
        icd9: null,
        kodepolibpjs: '',
        polibpjs: '',
        keterangan: '',
        kdunit: '',
        kdruang: '',
        kdruangtujuan: '',
        kontakpasien: '',
        nama: '',
        kelamin: '',
        tgllahir: '',
        status: 'Tidak',
        planing: 'Rawat Inap'

      }
    },
    async getMasterPlanning() {
      const resp = await api.get('v1/simrs/pelayanan/mpalningrajal')
      if (resp.status === 200) {
        this.plannings = resp?.data
      }
      // // console.log('master plann', resp)
    },
    async getMasterPoli() {
      const resp = await api.get('v1/simrs/pelayanan/mpoli')
      if (resp.status === 200) {
        this.poli = resp?.data
      }
      // // console.log('master poli', resp)
    },

    setFormKonsul(key, val) {
      this.formKonsul[key] = val
    },
    setFormKontrol(key, val) {
      this.formKontrol[key] = val
    },
    async saveKonsul(pasien) {
      this.loadingSaveKonsul = true
      // // console.log(pasien)
      this.formKonsul.norm = pasien?.norm
      this.formKonsul.noreg_lama = pasien?.noreg
      this.formKonsul.noreg = pasien?.noreg
      this.formKonsul.tgl_kunjungan = pasien?.tgl_kunjungan
      this.formKonsul.kdpoli_asal = pasien?.kodepoli
      this.formKonsul.kodepoli = pasien?.kodepoli
      this.formKonsul.kddokter_asal = pasien?.kodedokter
      this.formKonsul.kodesistembayar = pasien?.kodesistembayar
      this.formKonsul.planing = 'Konsultasi'
      const url = this.formKonsul.kdSaran === '6' ? 'v1/simrs/pelayanan/simpanplaningpasien' : 'v1/simrs/rajal/poli/konsulpoli'

      // const resp = await api.post('v1/simrs/pelayanan/simpanplaningpasien', this.formKonsul)
      await api.post(url, this.formKonsul)
        .then(resp => {
          // console.log('url', url)
          // console.log('resp', resp)
          if (resp.status === 200) {
            const storePasien = usePengunjungPoliStore()
            const isi = resp?.data?.result
            if (isi.length) {
              isi.forEach(anu => {
                storePasien.injectDataPasien(pasien, anu, 'planning')
              })
            }
            notifSuccess(resp)
            this.loadingSaveKonsul = false
            Promise.resolve(resp?.data)
          }
          this.loadingSaveKonsul = false
        })
        .catch(() => {
        // // console.log(error)
          this.loadingSaveKonsul = false
        })
    },
    getjadwalDokterDpjp(pasien, tgl) {
      this.jadwalDpjps = []
      this.loadingJadwalDokter = true
      // this.formKontrol.kodedokterdpjp = pasien?.kodedokterdpjp
      // // console.log('get jadwal dokter')
      const form = {
        poliTujuan: pasien?.kodepolibpjs,
        tglrencanakontrol: tgl || this.formKontrol.tglrencanakunjungan
      }
      this.setFormKontrol('kodedokterdpjp', null)
      return new Promise(resolve => {
        api.post('v1/simrs/rajal/poli/jadwal', form)
          .then(resp => {
            this.loadingJadwalDokter = false
            // // console.log(resp.data)
            if (resp?.data?.metadata?.code === '200' || resp?.data?.metadata?.code === 200) {
              this.jadwalDpjps = resp?.data?.result
              if (this.jadwalDpjps.length) {
                const ada = this.jadwalDpjps.filter(a => a.kodedokter === parseInt(pasien?.kodedokterdpjp))
                // // console.log('ada', ada)
                if (ada.length) {
                  this.setFormKontrol('kodedokterdpjp', ada[0].kodedokter)
                }
              }
            } else {
              this.setFormKontrol('kodedokterdpjp', null)
            }
            resolve(resp.data)
          })
          .catch(() => {
            this.loadingJadwalDokter = false
          })
      })
    },
    initFormKontrol(pasien) {
      this.formKontrol.nosep = pasien?.sep
      this.formKontrol.tgllahir = pasien?.tgllahir
      this.formKontrol.kelamin = pasien?.kelamin
      this.formKontrol.nama = pasien?.nama
      this.formKontrol.norm = pasien?.norm
      this.formKontrol.noka = pasien?.noka
      this.formKontrol.noreg = pasien?.noreg
      this.formKontrol.tgl_kunjungan = pasien?.tgl_kunjungan
      this.formKontrol.kdpoli_tujuan = pasien?.kodepoli
      this.formKontrol.kodepolibpjs = pasien?.kodepolibpjs
      this.formKontrol.dokter = pasien?.datasimpeg?.nama
      this.formKontrol.kodesistembayar = pasien?.kodesistembayar
      this.formKontrol.planing = 'Kontrol'
      // this.listSeps.push(pasien?.sep)
      // console.log('form kontrol', this.formKontrol)
    },
    getListSep(pasien) {
      this.loadingListSep = true
      this.paramListSep.noka = pasien?.noka
      const param = { params: this.paramListSep }
      return new Promise(resolve => {
        api.get('v1/simrs/pelayanan/cari-sep', param)
          .then(resp => {
            this.loadingListSep = false
            // console.log('resp his', resp?.data)
            // console.log('resp meta', resp?.data?.metadata?.code)
            this.listSeps = resp?.data?.result?.histori ?? []
            if (parseInt(resp?.data?.metadata?.code) !== 200) {
              notifInfVue(resp?.data?.metadata?.message)
            }
            resolve(resp)
          })
          .catch(() => {
            this.loadingListSep = false
          })
      })
    },
    async saveKontrol(pasien) {
      this.loadingSaveKontrol = true
      // // console.log(pasien)
      // console.log('form kontrol', this.formKontrol)

      await api.post('v1/simrs/pelayanan/simpanplaningpasien', this.formKontrol)
        .then(resp => {
          this.loadingSaveKontrol = false
          if (resp?.data?.metadata?.code) {
            if (parseInt(resp?.data?.metadata?.code) !== 200) {
              notifErrVue('Balasan bpjs : ' + resp?.data?.metadata?.message)
            }
          }
          // console.log(resp.data)
          if (resp?.status === 200) {
            const storePasien = usePengunjungPoliStore()
            const isi = resp?.data?.result
            if (isi.length) {
              isi.forEach(anu => {
                storePasien.injectDataPasien(pasien, anu, 'planning')
              })
            }
            notifSuccess(resp)
          }
        })
        .catch(() => {
          this.loadingSaveKontrol = false
        })
    },
    async saveSelesai(pasien) {
      this.loadingSaveSelesai = true
      // // console.log(pasien)
      const form = {}
      form.norm = pasien?.norm
      form.noreg_lama = pasien?.noreg
      form.noreg = pasien?.noreg
      form.tgl_kunjungan = pasien?.tgl_kunjungan
      form.kdpoli_asal = pasien?.kodepoli
      form.kddokter_asal = pasien?.kodedokter
      form.kodesistembayar = pasien?.kodesistembayar
      form.planing = 'Selesai'

      try {
        const resp = await api.post('v1/simrs/pelayanan/simpanplaningpasien', form)
        // // console.log(resp)
        if (resp.status === 200) {
          const storePasien = usePengunjungPoliStore()
          const isi = resp?.data?.result
          storePasien.injectDataPasien(pasien, isi, 'planning')
          notifSuccess(resp)
          this.loadingSaveSelesai = false
        }
        this.loadingSaveSelesai = false
      } catch (error) {
        // // console.log(error)
        this.loadingSaveSelesai = false
      }
    },

    async hapusItem(pasien, item) {
      this.loadingHapus = true
      const payload = { noreg: pasien?.noreg, id: item?.id, plan: item.rs4 }
      try {
        const resp = await api.post('v1/simrs/pelayanan/hapusplaningpasien', payload)
        // // console.log(resp)
        if (resp.status === 200) {
          this.loadingHapus = false
          const storePasien = usePengunjungPoliStore()
          storePasien.hapusDataPlanning(pasien, item?.id)
          notifSuccess(resp)
        }
      } catch (error) {
        this.loadingHapus = false
        // // console.log(error)
      }
    },
    // ===================================================================================================
    cekPesertaByNoka (val) {
      this.loadingNoka = true
      return new Promise(resolve => {
        api.post('v1/simrs/bridgingbpjs/pendaftaran/cekpsertabpjsbynoka', val)
          .then((resp) => {
            this.loadingNoka = false
            // console.log('Noka', resp.data.result)

            this.perujuk = resp?.data?.result

            resolve(resp?.data?.result)
          }).catch(() => {
            this.loadingNoka = false
          })
      })
    },
    // ====================================================================================================================================================RUmah sakit lain
    async saveRsLain(pasien) {
      const diag = pasien?.diagnosa?.length ? pasien.diagnosa[0].masterdiagnosa?.rs1 : false
      if (!diag) {
        return notifErrVue('Pasien tidak bisa di rujuk karena belum ada Diagnosa')
      }
      this.formRsLain.diagnosarujukan = pasien?.diagnosa?.length ? pasien.diagnosa[0].masterdiagnosa?.rs1 : '-'
      this.formRsLain.norm = pasien?.norm
      this.formRsLain.noreg = pasien?.noreg
      this.formRsLain.planing = 'Rumah Sakit Lain'
      this.formRsLain.kodesistembayar = pasien?.kodesistembayar
      this.loadingSave = true
      const url = this.editRsLain ? 'v1/simrs/pelayanan/update-planning-pasien' : 'v1/simrs/pelayanan/simpanplaningpasien'
      try {
        const resp = await api.post(url, this.formRsLain)
        // // console.log('save rs lain', resp)
        if (resp.status === 200) {
          const storePasien = usePengunjungPoliStore()
          const isi = resp?.data?.result ?? false
          if (isi) {
            storePasien.injectDataPasien(pasien, isi, 'planning')
            notifSuccess(resp)
          } else {
            if (resp?.data?.metadata?.code) {
              notifErrVue('Balasan bpjs : ' + resp?.data?.metadata?.message)
            } else {
              notifErrVue('Tidak ada Respon dari server')
            }
          }
          this.loadingSave = false
          this.editRsLain = false
        }
        this.loadingSave = false
      } catch (error) {
        // // console.log(error)
        this.loadingSave = false
      }
    },
    async saveRujukBalik(pasien) {
      const diag = pasien?.diagnosa?.length ? pasien.diagnosa[0].masterdiagnosa?.rs1 : false
      if (!diag) {
        return notifErrVue('Pasien tidak bisa di rujuk karena belum ada Diagnosa')
      }
      this.formPrb.diagnosarujukan = pasien?.diagnosa?.length ? pasien.diagnosa[0].masterdiagnosa?.rs1 : '-'
      this.formPrb.norm = pasien?.norm
      this.formPrb.noreg = pasien?.noreg
      this.formPrb.planing = 'Rumah Sakit Lain'
      this.formPrb.kodesistembayar = pasien?.kodesistembayar
      this.loadingSave = true
      try {
        const resp = await api.post('v1/simrs/pelayanan/simpanplaningpasien', this.formPrb)
        // // console.log('save rs lain', resp)
        if (resp.status === 200) {
          const storePasien = usePengunjungPoliStore()
          const isi = resp?.data?.result ?? false
          if (isi) {
            storePasien.injectDataPasien(pasien, isi, 'planning')
            notifSuccess(resp)
          } else {
            notifErrVue('Update Info Rujuk Balik Gagal')
          }
          this.loadingSave = false
        }
        this.loadingSave = false
      } catch (error) {
        // // console.log(error)
        this.loadingSave = false
      }
    },
    initPasien(pasien) {
      this.formRsLain.diagnosarujukan = pasien?.diagnosa?.length ? pasien.diagnosa[0].masterdiagnosa?.rs1 : '-'
      this.formPrb.diagnosarujukan = pasien?.diagnosa?.length ? pasien.diagnosa[0].masterdiagnosa?.rs1 : '-'
      this.formRsLain.diagnosa = pasien?.diagnosa?.length ? pasien.diagnosa[0].masterdiagnosa?.rs1 + ' ' + pasien.diagnosa[0].masterdiagnosa?.rs4 : '-'
      this.formPrb.diagnosa = pasien?.diagnosa?.length ? pasien.diagnosa[0].masterdiagnosa?.rs1 + ' ' + pasien.diagnosa[0].masterdiagnosa?.rs4 : '-'

      this.formRsLain.kodepoli = pasien?.kodepoli
      this.formPrb.kodepoli = pasien?.kodepoli
      this.formRsLain.kelamin = pasien?.kelamin
      this.formPrb.kelamin = pasien?.kelamin
      this.formRsLain.nama = pasien?.nama
      this.formPrb.nama = pasien?.nama
      this.formRsLain.norm = pasien?.norm
      this.formPrb.norm = pasien?.norm
      this.formRsLain.noka = pasien?.noka
      this.formPrb.noka = pasien?.noka
      this.formRsLain.nosep = pasien?.sep
      this.formPrb.nosep = pasien?.sep
      this.formRsLain.norujukan = pasien?.norujukan
      this.formPrb.norujukan = pasien?.norujukan
      this.formRsLain.tglrujukan = dateDbFormat(new Date())
      this.formPrb.tglrujukan = dateDbFormat(new Date())
      this.formRsLain.tglrencanakunjungan = dateDbFormat(new Date())
      this.formPrb.tglrencanakunjungan = dateDbFormat(new Date())
      this.formRsLain.tiperujukan = '0'
      this.formRsLain.tipefaskes = '2'
      this.formPrb.tiperujukan = '2'
      this.formPrb.tipefaskes = '1'
    },
    initPasienRanap(pasien) {
      this.formRanap.kdSaran = pasien?.kdSaran
      this.formRanap.norm = pasien?.norm
      this.formRanap.noka = pasien?.noka
      this.formRanap.noreg = pasien?.noreg
      this.formRanap.kodedokterdpjp = pasien?.datasimpeg?.kddpjp
      this.formRanap.kddokter = pasien?.datasimpeg?.kdpegsimrs
      this.formRanap.dokter = pasien?.datasimpeg?.nama
      this.formRanap.tglrencanakunjungan = dateDbFormat(new Date())
      this.formRanap.tglrencanakontrol = dateDbFormat(new Date())
      this.formRanap.tanggaloperasi = dateDbFormat(new Date())
      this.formRanap.tglupdate = dateDbFormat(new Date())
      this.formRanap.kodepolibpjs = pasien?.kodepolibpjs
      this.formRanap.polibpjs = pasien?.polibpjs
      this.formRanap.kdunit = pasien?.kdunit
      this.formRanap.kontakpasien = pasien?.nohp
      this.formRanap.nama = pasien?.nama_panggil
      this.formRanap.kelamin = pasien?.kelamin
      this.formRanap.tgllahir = pasien?.tgllahir
      this.formRanap.kdruang = pasien?.kodepoli
      this.formRanap.kodesistembayar = pasien?.kodesistembayar
      this.formRanap.jenisoperasi = 'Elektif'
      // this.formRanap.kdruangtujuan= pasien?.
      // this.formRanap.keterangan= pasien?.
      // this.formRanap.jenistindakan= pasien?.
      // this.formRanap.icd9= pasien?.
    },
    setFormRsLain(key, val) {
      this.formRsLain[key] = val
    },
    // ==================================================
    setFormPrb(key, val) {
      this.formPrb[key] = val
    },

    // ====================================================================================================================================================RUmah sakit lain
    setFormRanap(key, val) {
      this.formRanap[key] = val
    },
    async saveRanap(pasien) {
      this.formRanap.tglrencanakontrol = this.formRanap.tglrencanakunjungan
      this.loadingSave = true
      const url = this.editRanap ? 'v1/simrs/pelayanan/update-planning-pasien' : 'v1/simrs/pelayanan/simpanplaningpasien'

      try {
        const resp = await api.post(url, this.formRanap)
        // // console.log('ranap', resp)
        if (resp.status === 200) {
          const storePasien = usePengunjungPoliStore()
          const isi = resp?.data?.result ?? false
          if (isi) {
            storePasien.injectDataPasien(pasien, isi, 'planning')
            notifSuccess(resp)
          } else {
            notifInfVue('Update Grid Rawat Inap gagal, gagal mendapatkan data respon dari server')
          }
          this.loadingSave = false
          this.editRanap = false
        }
        this.loadingSave = false
      } catch (error) {
        // // console.log(error)
        this.loadingSave = false
      }
    },
    async cariTindakan(val) {
      if (val.length < 3) {
        return
      }
      this.loadingTind = true
      const params = {
        params: {
          tindakan: val
        }
      }
      // await api.get('v1/simrs/pelayanan/dialogtindakanpoli', params).then(response => {
      await api.get('v1/simrs/pelayanan/dialogoperasi', params).then(response => {
        this.loadingTind = false
        const code = response?.status
        if (code === 200) {
          this.optionsJenisTindakan = response?.data
        }
        // console.log('resp jenisT', this.optionsJenisTindakan)
      }).catch(() => {
        this.loadingTind = false
      })
    },
    async cariIcd9(val) {
      if (val.length < 3) {
        return
      }
      this.loadingIcd = true
      const params = {
        params: {
          q: val
        }
      }
      await api.get('v1/simrs/ranap/ruangan/mastericd9', params)
        .then(response => {
          this.loadingIcd = false
          if (response?.data.length) {
            this.optionsIcd9 = response?.data
          }
        })
        .catch(() => {
          this.loadingIcd = false
        })
    }
  }
})
