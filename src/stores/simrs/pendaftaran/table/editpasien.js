import { defineStore } from 'pinia'
import { usePendaftaranPasienStore } from '../form/pasien/pasien'
import { findWithAttr } from 'src/modules/utils'
import { api } from 'src/boot/axios'

export const usePendaftaranEditPasienStore = defineStore('editPaseienPendaftaran', {
  state: () => ({
    loading: false,
    openEdit: false,
    pasien: usePendaftaranPasienStore()
  }),
  actions: {
    clearFormPasien() {
      this.pasien.clearForm()
    },
    openDialogEdit() {
      this.openEdit = !this.openEdit
    },
    editPasienIni(val) {
      console.log('store edit pasien', val)
      val.noka = val.nokabpjs
      this.pasien.form = val
      if (this.pasien.alamataDomisiliSama) {
        if ((!this.pasien.form.alamatdomisili ? true : this.pasien.form.alamatdomisili === '') && this.pasien.form.alamat) this.pasien.setForm('alamatdomisili', this.pasien.form.alamat)
        if ((!this.pasien.form.rtdomisili ? true : this.pasien.form.rtdomisili === '') && this.pasien.form.rt) this.pasien.setForm('rtdomisili', this.pasien.form.rt)
        if ((!this.pasien.form.rwdomisili ? true : this.pasien.form.rwdomisili === '') && this.pasien.form.rw) this.pasien.setForm('rwdomisili', this.pasien.form.rw)
        if ((!this.pasien.form.kodeposdomisili ? true : this.pasien.form.kodeposdomisili === '') && this.pasien.form.kodepos) this.pasien.setForm('kodeposdomisili', this.pasien.form.kodepos)
        if ((!this.pasien.form.negaradomisili ? true : this.pasien.form.negaradomisili === '') && this.pasien.form.negara) this.pasien.setForm('negaradomisili', this.pasien.form.negara)
        if ((!this.pasien.form.propinsidomisili ? true : this.pasien.form.propinsidomisili === '') && this.pasien.form.propinsi) this.pasien.setForm('propinsidomisili', this.pasien.form.propinsi)
        if ((!this.pasien.form.kodepropinsidomisili ? true : this.pasien.form.kodepropinsidomisili === '') && this.pasien.form.kodepropinsi) this.pasien.setForm('kodepropinsidomisili', this.pasien.form.kodepropinsi)
        if ((!this.pasien.form.kabupatenkotadomisili ? true : this.pasien.form.kabupatenkotadomisili === '') && this.pasien.form.kabupatenkota) this.pasien.setForm('kabupatenkotadomisili', this.pasien.form.kabupatenkota)
        if ((!this.pasien.form.kodekabupatenkotadomisili ? true : this.pasien.form.kodekabupatenkotadomisili === '') && this.pasien.form.kodekabupatenkota) this.pasien.setForm('kodekabupatenkotadomisili', this.pasien.form.kodekabupatenkota)
        if ((!this.pasien.form.kecamatandomisili ? true : this.pasien.form.kecamatandomisili === '') && this.pasien.form.kecamatan) this.pasien.setForm('kecamatandomisili', this.pasien.form.kecamatan)
        if ((!this.pasien.form.kodekecamatandomisili ? true : this.pasien.form.kodekecamatandomisili === '') && this.pasien.form.kodekecamatan) this.pasien.setForm('kodekecamatandomisili', this.pasien.form.kodekecamatan)
        if ((!this.pasien.form.kelurahandomisili ? true : this.pasien.form.kelurahandomisili === '') && this.pasien.form.kelurahan) this.pasien.setForm('kelurahandomisili', this.pasien.form.kelurahan)
        if ((!this.pasien.form.kodekelurahandomisili ? true : this.pasien.form.kodekelurahandomisili === '') && this.pasien.form.kodekelurahan) this.pasien.setForm('kodekelurahandomisili', this.pasien.form.kodekelurahan)
      }

      const tglLahir = val.tgllahir.split('-')
      this.pasien.setForm('barulama', 'lama')
      this.pasien.edit = true
      if (tglLahir.length) {
        this.pasien.tanggal.tahun = tglLahir[0]
        this.pasien.tanggal.bulan = tglLahir[1]
        this.pasien.tanggal.hari = tglLahir[2]
        this.pasien.setTanggalLahir()
      }

      // metani kode2 dan alamat -- start --
      // agama

      const indexAgama = findWithAttr(this.pasien.agamas, 'keterangan', val.agama)
      if (indexAgama >= 0) {
        this.pasien.display.kode = this.pasien.agamas[indexAgama].kode
        if (!val.kodemapagama) {
          this.pasien.setForm('kodemapagama', this.pasien.agamas[indexAgama].kodemapping)
        }
      }
      // pekerjaan
      const indexpekerjaan = findWithAttr(this.pasien.pekerjaans, 'pekerjaan', val.pekerjaan)
      if (indexpekerjaan >= 0) {
        this.pasien.display.pekerjaan = this.pasien.pekerjaans[indexpekerjaan].pekerjaan
      }
      // kelamin
      if (!val.kodekelamin) {
        if (!val.kd_kelamin) {
          const indexkelamin = findWithAttr(this.pasien.kelamins, 'kelamin', val.kelamin)
          if (indexkelamin >= 0) {
            this.pasien.setForm('kodekelamin', this.pasien.kelamins[indexkelamin].kode)
          }
        } else {
          this.pasien.setForm('kodekelamin', val.kd_kelamin)
        }
      }
      // telepon
      if (this.pasien.form.noteleponhp.length) {
        if (this.pasien.form.noteleponhp.charAt(0) !== '0') {
          if (this.pasien.form.noteleponhp.charAt(0) === '+' && this.pasien.form.noteleponhp.charAt(1) === '6' && this.pasien.form.noteleponhp.charAt(2) === '2') {
            const telp = '0' + this.pasien.form.noteleponhp.slice(3, this.pasien.form.noteleponhp.length)
            this.pasien.setForm('noteleponhp', telp)
          }
        }
      }
      // negara
      if (val.negara) {
        this.pasien.negaraSelected(val.negara)
        this.pasien.getProvinces().then(() => {
          if (val.kodepropinsi) {
            this.pasien.propinsiSelected(val.kodepropinsi)
            this.pasien.getKota().then(() => {
              if (val.kodekabupatenkota) {
                this.pasien.kabupatenSelected(val.kodekabupatenkota)
                this.pasien.getKec().then(() => {
                  if (val.kodekecamatan) {
                    this.pasien.kecamatanSelected(val.kodekecamatan)
                    this.pasien.getKels().then(() => {
                      if (val.kodekelurahan) {
                        this.pasien.kelurahanSelected(val.kodekelurahan)
                      }
                    })
                  }
                })
              }
            })
          }
        })
      }
      if (val.negaradomisili && !this.pasien.alamataDomisiliSama) {
        this.pasien.negaraDomisiliSelected(val.negaradomisili)
        this.pasien.getProvincesDomisili().then(() => {
          if (val.propinsidomisili) {
            this.pasien.propinsiDomisiliSelected(val.propinsidomisili)
            this.pasien.getKotaDomisili().then(() => {
              this.pasien.kabupatenDomisiliSelected(val.kabupatenkotadomisili)
              this.pasien.getKecDomisili().then(() => {
                if (val.kecamatandomisili) {
                  this.pasien.kecamatanDomisiliSelected(val.kecamatandomisili)
                  this.pasien.getKelsDomisili().then(() => {
                    if (val.kelurahandomisili) {
                      this.pasien.kelurahanDomisiliSelected(val.kelurahandomisili)
                    }
                  })
                }
              })
            })
          }
        })
      }
      // metani kode2 dan alamat -- end --
    },
    saveForm() {
      console.log('simpan', this.pasien.form)
      return new Promise(resolve => {
        api.post('v1/simrs/master/simpan-pasien', this.pasien.form)
          .then(resp => {
            console.log('simpan', resp)
            resolve(resp)
          })
      })
    }
  }
})
