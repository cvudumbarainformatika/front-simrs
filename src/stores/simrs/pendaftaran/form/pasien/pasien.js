import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import { findWithAttr, notifErrVue } from 'src/modules/utils'
import { date } from 'quasar'
import { usePendaftaranAutocompleteStore } from '../../autocomplete'

export const usePendaftaranPasienStore = defineStore('pendaftaran_pasien', {
  state: () => ({
    autocompleteStore: usePendaftaranAutocompleteStore(),
    loading: false,
    cariPasienDialog: false,
    alamataDomisiliSama: false,
    edit: true,
    params: {},
    paramWilayah: {
      kd_negara: '62',
      kd_propinsi: '',
      kd_kotakabupaten: '',
      kd_kecamatan: ''
    },
    paramWilayahDomisili: {
      kd_negara: '62',
      kd_propinsi: '',
      kd_kotakabupaten: '',
      kd_kecamatan: ''
    },
    wilayah: {
      kecamatan: {},
      kelurahan: {}
    },
    wilayahDomisili: {
      kecamatan: {},
      kelurahan: {}
    },
    tanggal: {
      tahun: '1900',
      bulan: '01',
      hari: '01'
    },
    form: {
      barulama: 'baru',
      noteleponhp: '',
      nomoridentitaslain: '',
      nokabpjs: '',
      gelardepan: '',
      gelarbelakang: '',
      noantrian: '',
      noteleponrumah: ''
    },
    display: {
      sapaan: 'Bpk.',
      agama: ''
    },
    jenisPasiens: [
      { nama: 'Baru', value: 'baru' },
      { nama: 'Lama', value: 'lama' }
    ],
    loadingNorm: false,
    loadingSelect: false,
    loadingPropinsi: false,
    loadingKabupaten: false,
    loadingKecamatan: false,
    loadingKelurahan: false,
    loadingSelectDomisili: false,
    loadingPropinsiDomisili: false,
    loadingKabupatenDomisili: false,
    loadingKecamatanDomisili: false,
    loadingKelurahanDomisili: false,
    propinsies: [],
    kabupatens: [],
    kecamatans: [],
    kelurahans: [],
    domisiliPropinsies: [],
    domisiliKabupatens: [],
    domisiliKecamatans: [],
    domisiliKelurahans: [],
    // autocomp
    statuspernikahans: [],
    pendidikans: [],
    pekerjaans: [],
    sapaans: [],
    kelamins: [],
    agamas: [],
    negaras: [],
    domisiliNegaras: [],
    // cek bpjs
    alert: false,
    alertMsg: {},
    loadingNik: false,
    loadingNoka: false,
    loadingFinger: false,
    // --
    noantrian: ''
  }),
  actions: {
    clearForm() {
      const nomorAntr = this.noantrian
      this.form = {
        barulama: 'baru',
        noteleponhp: '',
        nomoridentitaslain: '',
        nokabpjs: '',
        gelardepan: '',
        gelarbelakang: '',
        noantrian: '',
        noteleponrumah: ''
      }
      this.tanggal = {
        tahun: '1900',
        bulan: '01',
        hari: '01'
      }
      this.edit = true
      this.paramWilayah = {
        kd_negara: '62',
        kd_propinsi: '',
        kd_kotakabupaten: '',
        kd_kecamatan: ''
      }
      this.paramWilayahDomisili = {
        kd_negara: '62',
        kd_propinsi: '',
        kd_kotakabupaten: '',
        kd_kecamatan: ''
      }
      this.wilayah = {
        kecamatan: {},
        kelurahan: {}
      }
      this.wilayahDomisili = {
        kecamatan: {},
        kelurahan: {}
      }

      this.display = {
        sapaan: 'Bpk.',
        agama: ''
      }
      this.setNoAntrian(nomorAntr)
    },
    setForm(key, val) {
      this.form[key] = val
    },
    setNoAntrian(val) {
      console.log('antrian ', val)
      if (val) {
        const regex = /^\d+$/
        if (val.length > 1) {
          const txt = val.split('')
          let txtTr = 0
          txt.forEach((anu, i) => {
            if (!regex.test(anu)) {
              txtTr += 1
            }
          })
          const temp = parseInt(val.slice(txtTr, val.length))
          this.setForm('angkaantrean', temp)
          this.setForm('noantrian', val)
        }
      }
    },
    negaraSelected(val) {
      // cnoantriannst index = findWithAttr(this.negaras, 'kd_negara', val)
      // const propinsi = this.negaras[index]
      this.wilayah.kd_negara = val
      this.paramWilayah.kd_negara = val
      this.setForm('negara', val)
      if (this.alamataDomisiliSama) {
        this.setForm('negaradomisili', val)
      }
      // this.setForm('propinsi', propinsi.wilayah)

      // this.getProvinces()
    },
    clearNegara() {
      delete this.form.negara
      delete this.form.propinsi
      delete this.form.kodepropinsi
      delete this.form.kabupatenkota
      delete this.form.kodekabupatenkota
      delete this.form.kecamatan
      delete this.form.kodekecamatan
      delete this.form.kelurahan
      delete this.form.kodekelurahan
      delete this.form.kodepos
      if (this.alamataDomisiliSama) {
        delete this.form.negaradomisili
        delete this.form.propinsidomisili
        delete this.form.kodepropinsidomisili
        delete this.form.kabupatenkotadomisili
        delete this.form.kodekabupatenkotadomisili
        delete this.form.kecamatandomisili
        delete this.form.kodekecamatandomisili
        delete this.form.kelurahandomisili
        delete this.form.kodekelurahandomisili
        delete this.form.kodeposdomisili
      }

      this.wilayah.kd_negara = null
      this.wilayah.propinsi = null
      this.wilayah.kotakabupaten = null
      this.wilayah.kecamatan.kotakabupaten = null
      this.wilayah.kelurahan.kotakabupaten = null

      this.paramWilayah.kd_negara = null
      this.paramWilayah.kd_propinsi = null
      this.paramWilayah.kd_kotakabupaten = null
      this.paramWilayah.kd_kecamatan = null
      this.paramWilayah.kd_kelurahan = null

      this.propinsies = []
      this.kabupatens = []
      this.kecamatans = []
      this.kelurahans = []
    },
    propinsiSelected(val) {
      const index = findWithAttr(this.propinsies, 'propinsi', val)
      const propinsi = this.propinsies[index]
      this.wilayah.propinsi = val
      this.paramWilayah.kd_propinsi = val
      this.setForm('kodepropinsi', val)
      this.setForm('propinsi', propinsi.wilayah)
      if (this.alamataDomisiliSama) {
        this.setForm('kodepropinsidomisili', val)
        this.setForm('propinsidomisili', propinsi.wilayah)
      }

      // this.getKota()
    },
    clearPropinsi() {
      delete this.form.propinsi
      delete this.form.kodepropinsi
      delete this.form.kabupatenkota
      delete this.form.kodekabupatenkota
      delete this.form.kecamatan
      delete this.form.kodekecamatan
      delete this.form.kelurahan
      delete this.form.kodekelurahan
      delete this.form.kodepos
      if (this.alamataDomisiliSama) {
        delete this.form.propinsidomisili
        delete this.form.kodepropinsidomisili
        delete this.form.kabupatenkotadomisili
        delete this.form.kodekabupatenkotadomisili
        delete this.form.kecamatandomisili
        delete this.form.kodekecamatandomisili
        delete this.form.kelurahandomisili
        delete this.form.kodekelurahandomisili
        delete this.form.kodeposdomisili
      }

      this.wilayah.propinsi = null
      this.wilayah.kotakabupaten = null
      this.wilayah.kecamatan.kotakabupaten = null
      this.wilayah.kelurahan.kotakabupaten = null

      this.paramWilayah.kd_propinsi = null
      this.paramWilayah.kd_kotakabupaten = null
      this.paramWilayah.kd_kecamatan = null
      this.paramWilayah.kd_kelurahan = null

      this.kabupatens = []
      this.kecamatans = []
      this.kelurahans = []
    },
    kabupatenSelected(val) {
      const index = findWithAttr(this.kabupatens, 'kotakabupaten', val)
      const kabupaten = this.kabupatens[index]
      this.wilayah.kotakabupaten = val
      this.paramWilayah.kd_kotakabupaten = val
      this.setForm('kodekabupatenkota', val)
      this.setForm('kabupatenkota', kabupaten.wilayah)
      if (this.alamataDomisiliSama) {
        this.setForm('kodekabupatenkotadomisili', val)
        this.setForm('kabupatenkotadomisili', kabupaten.wilayah)
      }

      // this.getKec()
    },
    clearKabupaten() {
      delete this.form.kabupatenkota
      delete this.form.kodekabupatenkota
      delete this.form.kecamatan
      delete this.form.kodekecamatan
      delete this.form.kelurahan
      delete this.form.kodekelurahan
      delete this.form.kodepos
      if (this.alamataDomisiliSama) {
        delete this.form.kabupatenkotadomisili
        delete this.form.kodekabupatenkotadomisili
        delete this.form.kecamatandomisili
        delete this.form.kodekecamatandomisili
        delete this.form.kelurahandomisili
        delete this.form.kodekelurahandomisili
        delete this.form.kodeposdomisili
      }

      this.wilayah.kotakabupaten = null
      this.wilayah.kecamatan.kotakabupaten = null
      this.wilayah.kelurahan.kotakabupaten = null

      this.paramWilayah.kd_kotakabupaten = null
      this.paramWilayah.kd_kecamatan = null
      this.paramWilayah.kd_kelurahan = null

      this.kecamatans = []
      this.kelurahans = []
    },
    kecamatanSelected(val) {
      const index = findWithAttr(this.kecamatans, 'kotakabupaten', val)
      const kabupaten = this.kecamatans[index]
      this.wilayah.kecamatan.kotakabupaten = val
      this.paramWilayah.kd_kecamatan = val
      this.setForm('kodekecamatan', val)
      this.setForm('kecamatan', kabupaten.wilayah)
      if (this.alamataDomisiliSama) {
        this.setForm('kodekecamatandomisili', val)
        this.setForm('kecamatandomisili', kabupaten.wilayah)
      }
      // this.getKels()
    },
    clearKecamatan() {
      delete this.form.kecamatan
      delete this.form.kodekecamatan
      delete this.form.kelurahan
      delete this.form.kodekelurahan
      if (this.alamataDomisiliSama) {
        delete this.form.kecamatandomisili
        delete this.form.kodekecamatandomisili
        delete this.form.kelurahandomisili
        delete this.form.kodekelurahandomisili
      }

      this.wilayah.kecamatan.kotakabupaten = null
      this.wilayah.kelurahan.kotakabupaten = null

      this.paramWilayah.kd_kecamatan = null
      this.paramWilayah.kd_kelurahan = null

      this.kelurahans = []
    },
    kelurahanSelected(val) {
      const index = findWithAttr(this.kelurahans, 'kotakabupaten', val)
      const kabupaten = this.kelurahans[index]
      this.wilayah.kelurahan.kotakabupaten = val
      this.paramWilayah.kd_kelurahan = val
      this.setForm('kodekelurahan', val)
      this.setForm('kelurahan', kabupaten.wilayah)
      if (this.alamataDomisiliSama) {
        this.setForm('kodekelurahandomisili', val)
        this.setForm('kelurahandomisili', kabupaten.wilayah)
      }
    },
    clearKelurahan() {
      delete this.form.kelurahan
      delete this.form.kodekelurahan
      if (this.alamataDomisiliSama) {
        delete this.form.kelurahandomisili
        delete this.form.kodekelurahandomisili
      }

      this.wilayah.kelurahan.kotakabupaten = null

      this.paramWilayah.kd_kelurahan = null
    },

    negaraDomisiliSelected(val) {
      // const index = findWithAttr(this.negaras, 'kd_negara', val)
      // const propinsi = this.negaras[index]
      this.wilayahDomisili.kd_negara = val
      this.paramWilayahDomisili.kd_negara = val
      this.setForm('negaradomisili', val)
      // this.setForm('propinsi', propinsi.wilayah)

      // this.getProvinces()
    },
    clearNegaraDomisili() {
      delete this.form.negaradomisili
      delete this.form.propinsidomisili
      delete this.form.kodepropinsidomisili
      delete this.form.kabupatenkotadomisili
      delete this.form.kodekabupatenkotadomisili
      delete this.form.kecamatandomisili
      delete this.form.kodekecamatandomisili
      delete this.form.kelurahandomisili
      delete this.form.kodekelurahandomisili
      delete this.form.kodeposdomisili

      this.wilayahDomisili.kd_negara = null
      this.wilayahDomisili.propinsi = null
      this.wilayahDomisili.kotakabupaten = null
      this.wilayahDomisili.kecamatan.kotakabupaten = null
      this.wilayahDomisili.kelurahan.kotakabupaten = null

      this.paramWilayahDomisili.kd_negara = null
      this.paramWilayahDomisili.kd_propinsi = null
      this.paramWilayahDomisili.kd_kotakabupaten = null
      this.paramWilayahDomisili.kd_kecamatan = null
      this.paramWilayahDomisili.kd_kelurahan = null

      this.domisiliPropinsies = []
      this.domisiliKabupatens = []
      this.domisiliKecamatans = []
      this.domisiliKelurahans = []
    },
    propinsiDomisiliSelected(val) {
      const index = findWithAttr(this.domisiliPropinsies, 'propinsi', val)
      const propinsi = this.domisiliPropinsies[index]
      this.wilayahDomisili.propinsi = val
      this.paramWilayahDomisili.kd_propinsi = val
      this.setForm('kodepropinsidomisili', val)
      this.setForm('propinsidomisili', propinsi.wilayah)

      // this.getKota()
    },
    clearPropinsiDomisili() {
      delete this.form.propinsidomisili
      delete this.form.kodepropinsidomisili
      delete this.form.kabupatenkotadomisili
      delete this.form.kodekabupatenkotadomisili
      delete this.form.kecamatandomisili
      delete this.form.kodekecamatandomisili
      delete this.form.kelurahandomisili
      delete this.form.kodekelurahandomisili
      delete this.form.kodeposdomisili

      this.wilayahDomisili.propinsi = null
      this.wilayahDomisili.kotakabupaten = null
      this.wilayahDomisili.kecamatan.kotakabupaten = null
      this.wilayahDomisili.kelurahan.kotakabupaten = null

      this.paramWilayahDomisili.kd_propinsi = null
      this.paramWilayahDomisili.kd_kotakabupaten = null
      this.paramWilayahDomisili.kd_kecamatan = null
      this.paramWilayahDomisili.kd_kelurahan = null

      this.domisiliKabupatens = []
      this.domisiliKecamatans = []
      this.domisiliKelurahans = []
    },
    kabupatenDomisiliSelected(val) {
      const index = findWithAttr(this.domisiliKabupatens, 'kotakabupaten', val)
      const kabupaten = this.domisiliKabupatens[index]
      this.wilayahDomisili.kotakabupaten = val
      this.paramWilayahDomisili.kd_kotakabupaten = val
      this.setForm('kodekabupatenkotadomisili', val)
      this.setForm('kabupatenkotadomisili', kabupaten.wilayah)

      this.getKec()
    },
    clearKabupatenDomisili() {
      delete this.form.kabupatenkotadomisili
      delete this.form.kodekabupatenkotadomisili
      delete this.form.kecamatandomisili
      delete this.form.kodekecamatandomisili
      delete this.form.kelurahandomisili
      delete this.form.kodekelurahandomisili
      delete this.form.kodeposdomisili

      this.wilayahDomisili.kotakabupaten = null
      this.wilayahDomisili.kecamatan.kotakabupaten = null
      this.wilayahDomisili.kelurahan.kotakabupaten = null

      this.paramWilayahDomisili.kd_kotakabupaten = null
      this.paramWilayahDomisili.kd_kecamatan = null
      this.paramWilayahDomisili.kd_kelurahan = null

      this.domisiliKecamatans = []
      this.domisiliKelurahans = []
    },
    kecamatanDomisiliSelected(val) {
      const index = findWithAttr(this.domisiliKecamatans, 'kotakabupaten', val)
      const kabupaten = this.domisiliKecamatans[index]
      this.wilayahDomisili.kecamatan.kotakabupaten = val
      this.paramWilayahDomisili.kd_kecamatan = val
      this.setForm('kodekecamatandomisili', val)
      this.setForm('kecamatandomisili', kabupaten.wilayah)
      this.getKels()
    },
    clearKecamatanDomisili() {
      delete this.form.kecamatandomisili
      delete this.form.kodekecamatandomisili
      delete this.form.kelurahandomisili
      delete this.form.kodekelurahandomisili
      delete this.form.kodeposdomisili

      this.wilayahDomisili.kecamatan.kotakabupaten = null
      this.wilayahDomisili.kelurahan.kotakabupaten = null

      this.paramWilayahDomisili.kd_kecamatan = null
      this.paramWilayahDomisili.kd_kelurahan = null

      this.domisiliKelurahans = []
    },
    kelurahanDomisiliSelected(val) {
      const index = findWithAttr(this.domisiliKelurahans, 'kotakabupaten', val)
      const kabupaten = this.domisiliKelurahans[index]
      this.wilayahDomisili.kelurahan.kotakabupaten = val
      this.paramWilayahDomisili.kd_kelurahan = val
      this.setForm('kodekelurahandomisili', val)
      this.setForm('kelurahandomisili', kabupaten.wilayah)
    },
    clearKelurahanDomisili() {
      delete this.form.kelurahandomisili
      delete this.form.kodekelurahandomisili

      this.wilayahDomisili.kelurahan.kotakabupaten = null

      this.paramWilayahDomisili.kd_kelurahan = null
    },

    samakanAlamatDanDomisili(val) {
      if (val) {
        if (this.form.alamat) this.setForm('alamatdomisili', this.form.alamat)
        if (this.form.rt) this.setForm('rtdomisili', this.form.rt)
        if (this.form.rw) this.setForm('rwdomisili', this.form.rw)
        if (this.form.kodepos) this.setForm('kodeposdomisili', this.form.kodepos)
        if (this.form.negara) this.setForm('negaradomisili', this.form.negara)
        if (this.form.propinsi) this.setForm('propinsidomisili', this.form.propinsi)
        if (this.form.kodepropinsi) this.setForm('kodepropinsidomisili', this.form.kodepropinsi)
        if (this.form.kabupatenkota) this.setForm('kabupatenkotadomisili', this.form.kabupatenkota)
        if (this.form.kodekabupatenkota) this.setForm('kodekabupatenkotadomisili', this.form.kodekabupatenkota)
        if (this.form.kecamatan) this.setForm('kecamatandomisili', this.form.kecamatan)
        if (this.form.kodekecamatan) this.setForm('kodekecamatandomisili', this.form.kodekecamatan)
        if (this.form.kelurahan) this.setForm('kelurahandomisili', this.form.kelurahan)
        if (this.form.kodekelurahan) this.setForm('kodekelurahandomisili', this.form.kodekelurahan)

        this.domisiliPropinsies = this.propinsies
        this.domisiliKabupatens = this.kabupatens
        this.domisiliKecamatans = this.kecamatans
        this.domisiliKelurahans = this.kelurahans
      } else {
        if (this.form.alamatdomisili) delete this.form.alamatdomisili
        if (this.form.rtdomisili) delete this.form.rtdomisili
        if (this.form.rwdomisili) delete this.form.rwdomisili
        if (this.form.kodeposdomisili) delete this.form.kodeposdomisili
        if (this.form.negaradomisili) delete this.form.negaradomisili
        if (this.form.propinsidomisili) delete this.form.propinsidomisili
        if (this.form.kodepropinsidomisili) delete this.form.kodepropinsidomisili
        if (this.form.kabupatenkotadomisili) delete this.form.kabupatenkotadomisili
        if (this.form.kodekabupatenkotadomisili) delete this.form.kodekabupatenkotadomisili
        if (this.form.kecamatandomisili) delete this.form.kecamatandomisili
        if (this.form.kodekecamatandomisili) delete this.form.kodekecamatandomisili
        if (this.form.kelurahandomisili) delete this.form.kelurahandomisili
        if (this.form.kodekelurahandomisili) delete this.form.kodekelurahandomisili

        if (this.domisiliPropinsies.length) this.domisiliPropinsies = []
        if (this.domisiliKabupatens.length) this.domisiliKabupatens = []
        if (this.domisiliKecamatans.length) this.domisiliKecamatans = []
        if (this.domisiliKelurahans.length) this.domisiliKelurahans = []
      }
      console.log('form ', this.form)
    },
    setTanggalLahir() {
      const hariIni = Date.now()
      const tanggal = this.tanggal.tahun + '-' + this.tanggal.bulan + '-' + this.tanggal.hari
      const tahunini = parseInt(date.formatDate(hariIni, 'YYYY'))
      const bulahini = parseInt(date.formatDate(hariIni, 'MM'))
      const hariini = parseInt(date.formatDate(hariIni, 'DD'))

      const hariLahir = parseInt(this.tanggal.hari)
      const bulanLahir = parseInt(this.tanggal.bulan)
      const tahunLahir = parseInt(this.tanggal.tahun)
      const tglLahir = new Date(tanggal)

      const daysDiff = hariini - hariLahir
      const monthsDiff = bulahini - bulanLahir
      const yearsDiff = tahunini - tahunLahir

      this.form.umurhari = daysDiff < 0 ? parseInt(date.daysInMonth(tglLahir) - hariLahir + hariini) : daysDiff
      this.form.umurbln = (daysDiff < 0 && monthsDiff === 0) ? 11 : (monthsDiff < 0 ? 12 - bulanLahir + bulahini : monthsDiff)
      this.form.umurthn = (daysDiff < 0 && monthsDiff === 0) ? yearsDiff - 1 : (monthsDiff < 0 ? yearsDiff - 1 : yearsDiff)
      this.setForm('tgllahir', tanggal)
    },
    lahirHariIni() {
      const hariIni = Date.now()
      this.form.tgllahir = date.formatDate(hariIni, 'YYYY-MM-DD')
      this.tanggal.hari = date.formatDate(hariIni, 'DD')
      this.tanggal.bulan = date.formatDate(hariIni, 'MM')
      this.tanggal.tahun = date.formatDate(hariIni, 'YYYY')
      const tanggal = this.tanggal.tahun + '-' + this.tanggal.bulan + '-' + this.tanggal.hari
      this.form.umurthn = date.getDateDiff(new Date(this.form.tgllahir), new Date(tanggal), 'years')
      this.form.umurbln = date.getDateDiff(new Date(this.form.tgllahir), new Date(tanggal), 'months')
      this.form.umurhari = date.getDateDiff(new Date(this.form.tgllahir), new Date(tanggal), 'days')

      this.setForm('tgllahir', tanggal)
    },
    // initial data
    getInitialData() {
      this.setTanggalLahir()
      if (this.autocompleteStore.negaras.length) {
        this.negaras = this.autocompleteStore.negaras
      } else {
        this.getNegara()
      }

      if (this.autocompleteStore.domisiliNegaras.length) {
        this.domisiliNegaras = this.autocompleteStore.domisiliNegaras
      } else {
        this.getNegaraDomisili()
      }

      if (this.autocompleteStore.agamas.length) {
        this.domisiliNegaras = this.autocompleteStore.domisiliNegaras
        this.agamas = this.autocompleteStore.agamas
      } else {
        this.getAgama()
      }

      if (this.autocompleteStore.sapaans.length) {
        this.domisiliNegaras = this.autocompleteStore.domisiliNegaras
        this.sapaans = this.autocompleteStore.sapaans
      } else {
        this.getSapaan()
      }

      if (this.autocompleteStore.kelamins.length) {
        this.kelamins = this.autocompleteStore.kelamins
      } else {
        this.getKelamin()
      }

      if (this.autocompleteStore.pendidikans.length) {
        this.pendidikans = this.autocompleteStore.pendidikans
      } else {
        this.getPendidikan()
      }

      if (this.autocompleteStore.statuspernikahans.length) {
        this.statuspernikahans = this.autocompleteStore.statuspernikahans
      } else {
        this.getStatusPernikahan()
      }

      if (this.autocompleteStore.pekerjaans.length) {
        this.pekerjaans = this.autocompleteStore.pekerjaans
      } else {
        this.getPekerjaan()
      }
    },
    // api related functions
    async cekFingerBpjs(val) {
      this.loadingListRujukan = true
      await api.post('v1/simrs/pendaftaran/cekfingerprint', val)
        .then(resp => {
          this.loadingListRujukan = false
          this.listRujukanPcare = resp.data.result.rujukan ? resp.data.result.rujukan : []
          console.log('List rujukan p care', resp)
        })
        .catch(() => {
          this.loadingListRujukan = false
        })
    },
    async getPekerjaan() {
      this.loading = true
      await api.get('v1/simrs/master/pekerjaan')
        .then(resp => {
          this.loading = false
          this.pekerjaans = resp.data
          this.autocompleteStore.setPekerjaan(resp.data)
        })
        .catch(() => { this.loading = false })
    },
    async getStatusPernikahan() {
      this.loading = true
      await api.get('v1/simrs/master/statuspernikahan')
        .then(resp => {
          console.log('status pernikahan', resp.data)
          this.loading = false
          this.autocompleteStore.setStatusPenikahan(resp.data)
          this.statuspernikahans = resp.data
        })
        .catch(() => { this.loading = false })
    },
    async getPendidikan() {
      this.loading = true
      await api.get('v1/simrs/master/pendidikan')
        .then(resp => {
          this.loading = false
          this.pendidikans = resp.data
          this.autocompleteStore.setPendidikan(resp.data)
        })
        .catch(() => { this.loading = false })
    },
    async getKelamin() {
      this.loading = true
      await api.get('v1/simrs/master/kelamin')
        .then(resp => {
          this.loading = false
          this.kelamins = resp.data
          this.autocompleteStore.setKelamin(resp.data)
        })
        .catch(() => {
          this.kelamins = [
            { nama: 'Perempuan', value: 'Perempuan' },
            { nama: 'Laki-laki', value: 'Laki-laki' }
          ]
          this.loading = false
        })
    },
    async getSapaan() {
      this.loading = true
      await api.get('v1/simrs/master/sapaan')
        .then(resp => {
          this.loading = false
          this.sapaans = resp.data
          this.autocompleteStore.setSapaan(resp.data)
        })
        .catch(() => { this.loading = false })
    },
    async getAgama() {
      this.loading = true
      await api.get('v1/simrs/master/agama')
        .then(resp => {
          this.loading = false
          this.agamas = resp.data
          this.autocompleteStore.setAgama(resp.data)
        })
        .catch(() => { this.loading = false })
    },
    // api propinsi kebawah
    async getNegara () {
      this.loadingSelect = true
      const param = { params: this.paramWilayah }
      await api.get('v1/simrs/master/getnegara', param)
        .then((resp) => {
          this.loadingSelect = false
          // )
          this.negaras = resp.data[0]
          this.autocompleteStore.setNegara(resp.data[0])
        }).catch(() => {
          this.loadingSelect = false
        })
    },
    async getProvinces () {
      this.loadingPropinsi = true
      const param = { params: this.paramWilayah }
      await api.get('v1/simrs/master/getpropinsi', param)
        .then((resp) => {
          this.loadingPropinsi = false

          this.propinsies = resp.data[0]
          return new Promise(resolve => { resolve(resp) })
        }).catch(() => {
          this.loadingPropinsi = false
        })
    },
    async getKota () {
      this.loadingKabupaten = true
      const param = { params: this.paramWilayah }
      await api.get('v1/simrs/master/getkotakabupaten', param)
        .then((resp) => {
          this.kabupatens = resp.data[0]
          this.loadingKabupaten = false
          return new Promise(resolve => { resolve(resp) })
        }).catch(() => {
          this.loadingKabupaten = false
        })
    },
    async getKec () {
      this.loadingKecamatan = true
      const param = { params: this.paramWilayah }
      await api.get('v1/simrs/master/getkecamatan', param)
        .then((resp) => {
          // )
          this.loadingKecamatan = false
          this.kecamatans = resp.data[0]
          return new Promise(resolve => { resolve(resp) })
        }).catch(() => {
          this.loadingKecamatan = false
        })
    },
    async getKels () {
      this.loadingKelurahan = true
      const param = { params: this.paramWilayah }
      await api.get('v1/simrs/master/getkelurahan', param)
        .then((resp) => {
          // )
          this.loadingKelurahan = false
          this.kelurahans = resp.data[0]
          return new Promise(resolve => { resolve(resp) })
        }).catch(() => {
          this.loadingKelurahan = false
        })
    },
    async getNegaraDomisili () {
      this.loadingSelectDomisili = true
      const param = { params: this.paramWilayahDomisili }
      await api.get('v1/simrs/master/getnegara', param)
        .then((resp) => {
          this.loadingSelectDomisili = false
          this.domisiliNegaras = resp.data[0]
          this.autocompleteStore.setNegaraDomisili(resp.data[0])
        }).catch(() => {
          this.loadingSelectDomisili = false
        })
    },
    async getProvincesDomisili () {
      this.loadingPropinsiDomisili = true
      const param = { params: this.paramWilayahDomisili }
      await api.get('v1/simrs/master/getpropinsi', param)
        .then((resp) => {
          this.loadingPropinsiDomisili = false
          this.domisiliPropinsies = resp.data[0]
          return new Promise(resolve => { resolve(resp) })
        }).catch(() => {
          this.loadingPropinsiDomisili = false
        })
    },
    async getKotaDomisili () {
      this.loadingKabupatenDomisili = true
      const param = { params: this.paramWilayahDomisili }
      await api.get('v1/simrs/master/getkotakabupaten', param)
        .then((resp) => {
          this.domisiliKabupatens = resp.data[0]
          this.loadingKabupatenDomisili = false
          return new Promise(resolve => { resolve(resp) })
        }).catch(() => {
          this.loadingKabupatenDomisili = false
        })
    },
    async getKecDomisili () {
      this.loadingKecamatanDomisili = true
      const param = { params: this.paramWilayahDomisili }
      await api.get('v1/simrs/master/getkecamatan', param)
        .then((resp) => {
          // )
          this.loadingKecamatanDomisili = false
          this.domisiliKecamatans = resp.data[0]
          return new Promise(resolve => { resolve(resp) })
        }).catch(() => {
          this.loadingKecamatanDomisili = false
        })
    },
    async getKelsDomisili () {
      this.loadingKelurahanDomisili = true
      const param = { params: this.paramWilayahDomisili }
      await api.get('v1/simrs/master/getkelurahan', param)
        .then((resp) => {
          this.loadingKelurahanDomisili = false
          this.domisiliKelurahans = resp.data[0]
          return new Promise(resolve => { resolve(resp) })
        }).catch(() => {
          this.loadingKelurahanDomisili = false
        })
    },
    // cek bpjs
    cekPesertaByNik (val) {
      this.loadingNik = true
      return new Promise(resolve => {
        api.post('v1/simrs/bridgingbpjs/pendaftaran/cekpsertabpjsbynik', val)
          .then((resp) => {
            this.loadingNik = false
            console.log('Nik', resp.data)
            // this.alertMsg = resp.data.result
            // this.alert = true
            this.setForm('jenispeserta', resp.data.result.peserta.jenisPeserta.keterangan)
            this.setForm('hakkelas', resp.data.result.peserta.hakKelas.kode)
            this.setForm('kelas', resp.data.result.peserta.hakKelas.keterangan)
            console.log('no telep', this.form.noteleponhp)
            if (!this.form.noteleponhp) this.setForm('noteleponhp', resp.data.result.peserta.mr.noTelepon)
            resolve(resp.data.result)
          }).catch(() => {
            this.loadingNik = false
          })
      })
    },
    cekPesertaByNoka (val) {
      this.loadingNoka = true
      return new Promise(resolve => {
        api.post('v1/simrs/bridgingbpjs/pendaftaran/cekpsertabpjsbynoka', val)
          .then((resp) => {
            this.loadingNoka = false
            console.log('Noka', resp.data.result)
            // this.alert = true
            // this.alertMsg = resp.data.result
            const hasil = resp.data.result
            this.setForm('jenispeserta', hasil.peserta.jenisPeserta.keterangan)
            // this.setForm('jnspelayanan', hasil.pelayanan.kode)
            this.setForm('hakkelas', hasil.peserta.hakKelas.kode)
            this.setForm('kelas', hasil.peserta.hakKelas.keterangan)
            console.log('no telep', this.form.noteleponhp)
            if (!this.form.nik) this.setForm('nik', hasil.peserta.nik)
            if (!this.form.noteleponhp) this.setForm('noteleponhp', resp.data.result.peserta.mr.noTelepon)
            console.log('tgl lahir ', this.form.tgllahir)
            if (!this.form.tgllahir || this.form.tgllahir === '1900-01-01') {
              const lahir = hasil.peserta.tglLahir.split('-')
              if (lahir.length) {
                this.tanggal.tahun = lahir[0] ? lahir[0] : '1900'
                this.tanggal.bulan = lahir[1] ? lahir[1] : '01'
                this.tanggal.hari = lahir[2] ? lahir[2] : '01'

                this.setTanggalLahir()
              }
              console.log('lahir', lahir)
            }
            resolve(resp.data.result)
          }).catch(() => {
            this.loadingNoka = false
          })
      })
    },
    cekPesertaFinger (val) {
      this.loadingFinger = true
      return new Promise(resolve => {
        api.post('v1/simrs/bridgingbpjs/pendaftaran/cekfingerprint', val)
          .then((resp) => {
            this.loadingFinger = false
            console.log('finger', resp.data)
            // this.alert = true
            // this.alertMsg = resp.data.result
            resolve(resp.data)
          }).catch(() => {
            this.loadingFinger = false
          })
      })
    },

    cekDulu(evt, val) {
      console.log('cek dulu', evt.target.value)
      console.log('val', val)
      const cari = evt.target.value
      if (cari !== '' && this.form.barulama === 'baru') {
        this.loadingNorm = val === 'norm'
        this.loadingNik = val === 'nik'
        this.loadingNoka = val === 'noka'
        const param = {
          params: {
            q: cari,
            cek: val
          }
        }
        return new Promise(resolve => {
          api.get('v1/simrs/pendaftaran/cek-data-pasien', param)
            .then(resp => {
              this.loadingNorm = false
              this.loadingNik = false
              this.loadingNoka = false
              console.log('hasil cek', resp.data)
              resolve(resp)
            })
            .catch((err) => {
              const pasien = err.response.data.data
              console.log('error', pasien)
              if (val === 'norm') {
                notifErrVue('dan Noka : ' + pasien.rs46)
                notifErrVue('dengan NIK : ' + pasien.rs49)
                notifErrVue('atas nama : ' + pasien.rs2)
                notifErrVue('No Rm Sudah Ada ')
              } else if (val === 'nik') {
                notifErrVue('dan Noka : ' + pasien.rs46)
                notifErrVue('dengan No Rm : ' + pasien.rs1)
                notifErrVue('atas nama : ' + pasien.rs2)
                notifErrVue('NIK Sudah Ada ')
              } else if (val === 'noka') {
                notifErrVue('dan NIK : ' + pasien.rs49)
                notifErrVue('dengan No Rm : ' + pasien.rs1)
                notifErrVue('atas nama : ' + pasien.rs2)
                notifErrVue('Noka BPJS Sudah Ada ')
              }
              this.loadingNorm = false
              this.loadingNik = false
              this.loadingNoka = false
            })
        })
      }
    }
    // -------
  }
})
