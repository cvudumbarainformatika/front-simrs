import { defineStore } from 'pinia'
import { usePendaftaranPasienStore } from '../form/pasien/pasien'

export const usePendaftaranEditPasienStore = defineStore('editPaseienPendaftaran', {
  state: () => ({
    loading: false,
    openEdit: false,
    pasien: usePendaftaranPasienStore()
  }),
  actions: {
    openDialogEdit() {
      this.openEdit = !this.openEdit
    },
    editPasienIni(val) {
      // console.log('store edit pasien', val)
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
    },
    saveForm() {
      console.log('simpan', this.pasien.form)
    }
  }
})
