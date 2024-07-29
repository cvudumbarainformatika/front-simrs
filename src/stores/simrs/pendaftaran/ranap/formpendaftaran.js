import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useFormPendaftaranRanapStore = defineStore('pendaftaran-ranap-store', {
  state: () => ({
    pasien: {
      barulama: 'baru',
      norm: null,
      kewarganegaraan: 'WNI',
      noktp: null,
      paspor: null,
      idsatset: null,
      nokabpjs: null,
      nama: null,
      ibukandung: null,
      tempatlahir: null,
      tanggallahir: null,
      kelamin: null,
      kd_kelamin: null,
      sapaan: null,
      pendidikan: null,
      kd_pendidikan: null,
      agama: null,
      kd_agama: null,
      agamalain: null,
      suku: null,
      bahasa: null,
      bisabacatulis: null,
      statuspernikahan: null,
      pekerjaan: null,
      kd_pekerjaan: null,
      notelp: null,
      nohp: null,
      alamat: null,
      // WNI
      rt: null,
      rw: null,
      kelurahan: null,
      kecamatan: null,
      kota: null,
      propinsi: null,
      negara: null,
      kodepos: null,

      // WNA
      country: null,
      city: null,
      region: null,

      // domisili
      alamatDomisili: null,
      rtDomisili: null,
      rwDomisili: null,
      kelurahanDomisili: null,
      kecamatanDomisili: null,
      kotaDomisili: null,
      propinsiDomisili: null,
      negaraDomisili: null,
      kodeposDomisili: null,

      // registrasi
      asalrujukan: null,
      jnsBayar: null,
      kodesistembayar: null,
      kategoriKasus: null,
      diagnosaAwal: null,

      // hakruang ,kelas untuk menentukan billing

      hakruang: null,
      isTitipan: 'Tidak',
      titipan: null,
      kamar: null,
      no_bed: null,
      kelas: null,
      kode_ruang: null,
      group: null,
      flag_ruang: null,
      hakKelasBpjs: null,
      indikatorPerubahanKelas: null,

      // biaya
      biaya_admin: 0,
      biaya_kamar: 0,

      // dokter
      nama_dokter: null,
      kd_dokter: null,
      kd_dokter_bpjs: null,

      nama_penanggungjawab: null,
      notelp_penanggungjawab: null,

      // ini numpang gak usah di insert ke database
      usia: null

    },

    kodeKtp: {
      prov: null, // 2 kode pertama
      kabKota: null, // 2 kode kedua
      kec: null, // 2 kode ketiga
      tglLahir: null, // khusu untuk perempuan ditambah 40 2 kode keempat
      blnLahir: null, //  2 kode kelima
      thnLahir: null, // 2 kode keenam
      kelamin: null // hasil dari parse tglLahir
    },
    paramWilayah: {
      kd_negara: null,
      kd_propinsi: null,
      kd_kotakabupaten: null,
      kd_kecamatan: null,
      kd_kelurahan: null
    },

    paramWilayahDomisili: {
      kd_negara: null,
      kd_propinsi: null,
      kd_kotakabupaten: null,
      kd_kecamatan: null,
      kd_kelurahan: null
    },
    statusPasiens: ['Baru', 'Lama'],
    kewarganegaran: ['WNI', 'WNA'],
    bisabacatulis: ['Ya', 'Tidak'],
    titipans: ['Ya', 'Tidak'],
    kelamins: [],
    sapaans: [],
    negaras: [],
    pendidikans: [],
    agamas: [],
    bahasas: [],
    statuspernikahans: [],
    pekerjaans: [],
    propinsies: [],
    kabupatens: [],
    kecamatans: [],
    kelurahans: [],

    countrys: [],
    domisiliSama: true,
    cekPeserta: null,
    openDialogPeserta: false,

    asalrujukans: [],
    // hakruangs: [],
    allSistemBayars: [],
    sistembayars: [],
    jnsSistemBayars: [],
    kamars: [],
    tarifs: [],
    dokters: [],
    listKamars: [],
    categories: [],
    openDialogShowKamar: false,
    loadingShowKamar: false,
    openDialogCariPasien: false,

    errors: []

  }),
  // getters: {
  //   doubleCount: (state) => state.counter * 2
  // },
  actions: {

    initForm () {
      this.errors = []
      const keys = Object.keys(this.pasien)
      for (let i = 0; i < keys.length; i++) {
        const el = keys[i]
        this.setForm(el, null)
      }

      this.pasien.barulama = 'Baru'
      this.pasien.kewarganegaraan = 'WNI'
      // this.pasien.noktp = 3574041305820002
      this.pasien.bisabacatulis = 'Ya'
      this.pasien.isTitipan = 'Tidak'

      this.paramWilayah.kd_negara = '62'

      this.cekPeserta = null
      this.openDialogPeserta = false
    },

    setFormFromServer (val) {
      this.errors = []
      this.pasien = {
        barulama: val.baru ?? 'Baru',
        norm: val.norm ?? null,
        kewarganegaraan: 'WNI',
        noktp: val.nik ?? null,
        paspor: null,
        idsatset: null,
        nokabpjs: val.nokabpjs ?? null,
        nama: val.nama ?? null,
        ibukandung: val.namaibukandung ?? null,
        tempatlahir: val.templahir ?? null,
        tanggallahir: val.tgllahir ?? null,
        kelamin: val.kelamin ?? null,
        sapaan: val.spaan ?? null,
        pendidikan: val.pendidikan ?? null,
        agama: val.agama ?? null,
        agamalain: null,
        suku: val.suku ?? null,
        bahasa: val.bahasa ?? null,
        bisabacatulis: val.bacatulis ?? 'Ya',
        statuspernikahan: val.statuspernikahan ?? null,
        pekerjaan: val.pekerjaan ?? null,
        // kd_pekerjaan: val.kd_pekerjaan ?? null,
        notelp: val.noteleponrumah ?? null,
        nohp: val.noteleponhp ?? null,

        alamat: val.alamat ?? null,
        // WNI
        rt: val.rt ?? null,
        rw: val.rw ?? null,

        kelurahan: null,
        kecamatan: null,
        kota: null,
        propinsi: null,
        negara: null,
        kodepos: val.kodepos ?? null,

        // WNA
        country: null,
        city: null,
        region: null,

        // domisili
        alamatDomisili: val.alamatdomisili ?? null,
        rtDomisili: val.rtdomisili ?? null,
        rwDomisili: val.rwdomisili ?? null,

        kelurahanDomisili: null,
        kecamatanDomisili: null,
        kotaDomisili: null,
        propinsiDomisili: null,
        negaraDomisili: null,
        kodeposDomisili: val.kodeposdomisili ?? null,

        // registrasi
        asalrujukan: null,
        jnsBayar: null,
        kodesistembayar: null,
        kategoriKasus: null,
        diagnosaAwal: null,

        // hakruang ,kelas untuk menentukan billing
        kamar: null,
        kelas: null,
        kode_ruang: null,
        flag_ruang: null,
        hakKelasBpjs: null,
        indikatorPerubahanKelas: null,

        // biaya
        biaya_admin: 0,
        biaya_kamar: 0,

        // dokter
        nama_dokter: null,
        kd_dokter: null,
        kd_dokter_bpjs: null,

        nama_penanggungjawab: null,
        notelp_penanggungjawab: null

      }

      this.paramWilayah = {
        kd_negara: val.negara ?? '62',
        kd_propinsi: val.kodepropinsi ?? null,
        kd_kotakabupaten: val.kodekabupatenkota ?? null,
        kd_kecamatan: val.kodekecamatan ?? null,
        kd_kelurahan: val.kodekelurahan ?? null
      }
      this.paramWilayahDomisili = {
        kd_negara: val.negaradomisili ?? '62',
        kd_propinsi: val.propinsidomisili ?? null,
        kd_kotakabupaten: val.kabupatenkotadomisili ?? null,
        kd_kecamatan: val.kecamatandomisili ?? null,
        kd_kelurahan: val.kelurahandomisili ?? null
      }

      if (val.alamat === val.alamatdomisili) {
        this.domisiliSama = true
      }
      else {
        this.domisiliSama = false
      }

      console.log('form', this.pasien)
      this.openDialogCariPasien = false
      return new Promise((resolve, reject) => {
        resolve()
      })
    },

    async cekPesertaBpjs (by, no) {
      const params = { params: { by, no } }
      await api.get('v1/simrs/pendaftaran/ranap/cek-peserta-bpjs', params)
        .then(resp => {
          if (resp.data.metadata.code === '200') {
            this.cekPeserta = resp.data.result.peserta
            this.openDialogPeserta = true
            console.log('cekPesertaBpjs', this.cekPeserta)
          }
        })
        .catch(err => {
          console.log('cekPesertaBpjs', err)
        })
    },
    setForm (key, val) {
      this.pasien[key] = val
    },
    async getKelamin () {
      // this.loading = true
      await api.get('v1/simrs/master/kelamin')
        .then(resp => {
          console.log('kelamin', resp.data)
          // this.loading = false
          this.kelamins = resp.data
          // this.autocompleteStore.setKelamin(resp.data)
        })
        .catch(() => {
          this.kelamins = [
            { nama: 'Perempuan', value: 'Perempuan' },
            { nama: 'Laki-laki', value: 'Laki-laki' }
          ]
          // this.loading = false
        })
    },

    async getSapaan () {
      // this.loading = true
      await api.get('v1/simrs/master/sapaan')
        .then(resp => {
          // this.loading = false
          console.log('sapaan', resp.data)
          this.sapaans = resp.data
        })
        .catch(() => {
          // this.loading = false
        })
    },

    async getNegara () {
      // this.loadingSelect = true
      const param = { params: this.paramWilayah }
      await api.get('v1/simrs/master/getnegara', param)
        .then((resp) => {
          console.log('negara', resp.data)
          // this.loadingSelect = false
          // )
          this.negaras = resp.data[0]
          if (this.pasien.kewarganegaraan === 'WNI') {
            this.paramWilayah.kd_negara = this.negaras[0].kd_negara
            this.paramWilayahDomisili.kd_negara = this.negaras[0].kd_negara
            this.pasien.negara = this.negaras[0].wilayah
            this.pasien.negaraDomisili = this.negaras[0].wilayah
          }
          else {
            this.pasien.negara = null
          }

          // this.autocompleteStore.setNegara(resp.data[0])
        }).catch(() => {
          // this.loadingSelect = false
        })
    },

    async getPendidikan () {
      // this.loading = true
      await api.get('v1/simrs/master/pendidikan')
        .then(resp => {
          console.log('pendidikan', resp.data)
          // this.loading = false
          this.pendidikans = resp.data
          // this.autocompleteStore.setPendidikan(resp.data)
        })
        .catch((err) => {
          // this.loading = false
          console.log('get pendidikan', err)
        })
    },
    async getAgama () {
      this.loading = true
      await api.get('v1/simrs/master/agama')
        .then(resp => {
          console.log('agama', resp.data)
          this.loading = false
          this.agamas = resp.data
          // this.autocompleteStore.setAgama(resp.data)
        })
        .catch(() => { this.loading = false })
    },
    async getBahasa () {
      this.loadingBahasa = true
      await api.get('v1/simrs/master/listbahasa')
        .then((resp) => {
          this.loadingBahasa = false
          console.log('bahasa', resp.data)
          this.bahasas = resp.data
          // this.autocompleteStore.setBahasa(resp.data)
          // return new Promise(resolve => { resolve(resp) })
        }).catch(() => {
          this.loadingBahasa = false
        })
    },
    async getStatusPernikahan () {
      this.loading = true
      await api.get('v1/simrs/master/statuspernikahan')
        .then(resp => {
          console.log('status pernikahan', resp.data)
          this.loading = false
          // this.autocompleteStore.setStatusPenikahan(resp.data)
          this.statuspernikahans = resp.data
        })
        .catch(() => { this.loading = false })
    },

    async getPekerjaan () {
      this.loading = true
      await api.get('v1/simrs/master/pekerjaan')
        .then(resp => {
          console.log('pekerjaan', resp.data)
          this.loading = false
          this.pekerjaans = resp.data
          // this.autocompleteStore.setPekerjaan(resp.data)
        })
        .catch(() => { this.loading = false })
    },
    async getProvinces () {
      this.loadingPropinsi = true
      const param = { params: this.paramWilayah }
      await api.get('v1/simrs/master/getpropinsi', param)
        .then((resp) => {
          this.loadingPropinsi = false

          this.propinsies = resp.data[0]
          // this.autocompleteStore.setPropinsi(resp.data[0])
          // if (this.pasien.propinsi !== null && this.propinsies.length > 0) {
          //   th
          // }
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
          console.log('kecamatan', resp.data[0])
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
          console.log('kelurahan', resp.data[0])
          this.loadingKelurahan = false
          this.kelurahans = resp.data[0]
          return new Promise(resolve => { resolve(resp) })
        }).catch(() => {
          this.loadingKelurahan = false
        })
    },

    async getAsalRujukan () {
      this.loading = true
      await api.get('v1/simrs/master/listasalrujukan')
        .then(resp => {
          this.loading = false
          this.asalrujukans = resp.data
          // this.autocompleteStore.setAsalRujukan(resp.data)
          console.log('asal rujukan', resp.data)
        })
        .catch(() => {
          this.loading = false
        })
    },

    // async getHakRuang () {
    //   this.loading = true
    //   await api.get('v1/simrs/master/hakruang')
    //     .then(resp => {
    //       this.loading = false
    //       this.hakruangs = resp.data
    //       // this.autocompleteStore.setAsalRujukan(resp.data)
    //       console.log('hak ruang', resp.data)
    //     })
    //     .catch(() => {
    //       this.loading = false
    //     })
    // },

    // async getJnsSistemBayar () {
    //   this.loading = true
    //   await api.get('v1/simrs/master/sistembayar')
    //     .then(resp => {
    //       this.loading = false
    //       this.jnssistembayars = resp.data
    //       // this.autocompleteStore.setSistemBayar(resp.data)
    //       console.log('jenis sistem bayar', resp.data)
    //     })
    //     .catch(() => {
    //       this.loading = false
    //     })
    // },
    async getSistemBayar () {
      this.loading = true
      await api.get('v1/simrs/master/allsistembayar')
        .then(resp => {
          console.log('allsistembayar', resp.data)
          this.loading = false
          this.allSistemBayars = resp.data
          // mapping sistembayar
          const all = resp.data
          this.jnsSistemBayars = all.length ? all.filter(a => a.hidden === '') : []
          // console.log('aljnsl', this.jnsSistemBayars)
          this.filterSistemBayars('all')
        })
        .catch(() => {
          this.loading = false
        })
    },

    filterSistemBayar (kode) {
      const all = this.allSistemBayars
      let sb = []
      if (all.length > 0) {
        if (kode !== 'all') {
          sb = all.length ? all.filter(a => a.groups === kode) : []
        }
        else {
          sb = all.length ? all.filter(a => a.groups !== '') : []
        }
        this.sistembayars = sb
      }
    },

    async getKamar () {
      this.loading = true
      await api.get('v1/simrs/master/kamar')
        .then(resp => {
          console.log('kamar', resp.data)
          this.loading = false
          this.kamars = resp.data
        })
        .catch(() => {
          this.loading = false
        })
    },

    async getMasterTarif () {
      this.loading = true
      await api.get('v1/simrs/master/gettigapuluhtarif')
        .then(resp => {
          console.log('master tarif', resp.data)
          this.tarifs = resp.data
          // this.loading = false
          // this.kamars = resp.data
        })
        .catch(() => {
          this.loading = false
        })
    },

    async getDokter () {
      this.loading = true
      await api.get('v1/simrs/master/nakes/dokter')
        .then(resp => {
          console.log('dokter', resp.data)
          this.loading = false
          this.dokters = resp.data

          return new Promise((resolve, reject) => {
            resolve(resp)
          })
        })
        .catch(() => {
          this.loading = false
        })
    },

    async showKamar () {
      this.loadingShowKamar = true
      await api.get('v1/simrs/master/listviewkamar')
        .then(resp => {
          console.log('show kamar', resp.data)
          this.loadingShowKamar = false
          this.listKamars = resp.data
        })
        .catch(() => {
          this.loadingShowKamar = false
        })
    },

    async getJenisKasus () {
      // this.loadingShowKamar = true
      await api.get('v1/simrs/master/jeniskasus')
        .then(resp => {
          console.log('jenis kasus', resp.data)
          // this.loadingShowKamar = false
          this.categories = resp.data
        })
        .catch(() => {
          // this.loadingShowKamar = false
        })
    },
    async simpanPasien () {
      this.errors = []
      this.pasien.kd_negara = this.paramWilayah.kd_negara
      this.pasien.kd_propinsi = this.paramWilayah.kd_propinsi
      this.pasien.kd_kotakabupaten = this.paramWilayah.kd_kotakabupaten
      this.pasien.kd_kecamatan = this.paramWilayah.kd_kecamatan
      this.pasien.kd_kelurahan = this.paramWilayah.kd_kelurahan

      this.pasien.kd_negara_dom = this.paramWilayahDomisili.kd_negara
      this.pasien.kd_propinsi_dom = this.paramWilayahDomisili.kd_propinsi
      this.pasien.kd_kotakabupaten_dom = this.paramWilayahDomisili.kd_kotakabupaten
      this.pasien.kd_kecamatan_dom = this.paramWilayahDomisili.kd_kecamatan
      this.pasien.kd_kelurahan_dom = this.paramWilayahDomisili.kd_kelurahan

      console.log('pasien', this.pasien)

      // const payload = {
      //   barulama: 'baru',
      //   norm: '000084',
      //   noktp: '3574034606530002'
      // }

      await api.post('v1/simrs/pendaftaran/ranap/simpanpendaftaran-byform', this.pasien)
        .then(resp => {
          console.log('jenis kasus', resp.data)
        })
        .catch((err) => {
          const bag = err.response?.status === 422 ? err.response?.data?.errors : []
          this.errors = bag
          console.log('err', err.response.status)
        })
    }

  }
})
