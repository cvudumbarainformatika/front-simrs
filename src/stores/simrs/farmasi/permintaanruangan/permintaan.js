import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { notifErrVue, notifSuccess } from 'src/modules/utils'
import { useListPermintaanRuanganStore } from './listpermintaan'

export const useFarmasiPermintaanRuanganStore = defineStore('farmasi_permintaan_ruangan', {
  state: () => ({
    loading: false,
    loadingKunci: false,
    loadingObat: false,
    loadingMax: false,
    loadingRuang: false,
    params: {
      kdgudang: '',
      kddepo: '',
      nama_obat: ''
    },
    form: {
      tgl_permintaan: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      status_obat: 'non-konsinyasi',
      no_permintaan: '',
      dari: '',
      tujuan: ''
    },
    disp: {
      tgl_permintaan: date.formatDate(Date.now(), 'DD MMMM YYYY')
    },
    floor: [ // racikan / floor stok
      { kode: 'Gd-03010101' },
      { kode: 'Gd-04010101' }
    ],
    gudangs: [
      { nama: 'Gudang Farmasi ( Kamar Obat )', value: 'Gd-05010100' },
      { nama: 'Gudang Farmasi (Floor Stok)', value: 'Gd-03010100' }
    ],
    depos: [
      { nama: 'Floor Stock 1 (AKHP)', value: 'Gd-03010101' },
      { nama: 'Floor Stock 2 (Obat)', value: 'Gd-04010101' },
      { nama: 'Depo Rawat inap', value: 'Gd-04010102' },
      { nama: 'Depo OK', value: 'Gd-04010103' },
      { nama: 'Depo Rawat Jalan', value: 'Gd-05010101' }
    ],
    ruangans: [],
    stokDewe: [],
    obats: [

    ],
    details: [
    ]
  }),
  actions: {
    setForm(key, val) {
      this.form[key] = val
    },
    setDisp(key, val) {
      this.disp[key] = val
    },
    setParam(key, val) {
      this.params[key] = val
    },
    clearForm() {
      const dari = this.form.dari
      const tujuan = this.form.tujuan
      this.form = {
        tgl_permintaan: date.formatDate(Date.now(), 'YYYY-MM-DD'),
        status_obat: 'non-konsinyasi',
        no_permintaan: '',
        dari,
        tujuan
      }
    },
    obatSelected(val) {
      this.setForm('kdobat', val)
      this.setForm('jumlah_minta', 0)
      console.log('obat ', val)
      const anu = this.obats.filter(a => a.kd_obat === val)
      if (anu.length) {
        const obat = anu[0]
        console.log('obat ketemu', obat)
        this.setForm('stok_alokasi', obat.stokalokasi)
        console.log('form', this.form)
        if (this.form.dari) {
          const aMax = obat.minmax.filter(a => a.kd_obat === val && a.kd_ruang === this.form.dari)
          if (aMax.length) {
            const max = aMax[0]
            this.setForm('mak_stok', max.max)
          } else {
            this.setForm('mak_stok', null)
          }
        }
      }
      if (this.form.dari) {
        const dar = this.stokDewe.filter(a => a.kdobat === val && a.kdruang === this.form.dari)
        if (dar.length) {
          const stok = dar[0]
          this.setForm('stok', stok.jumlah)
        } else {
          this.setForm('stok', 0)
        }
      } else {
        notifErrVue('Depo belum dipilih')
      }
    },
    clearObat() {
      this.setForm('kdobat', null)
      this.setForm('stok_alokasi', 0)
      this.setForm('mak_stok', 0)
      this.setForm('jumlah_minta', 0)
    },
    cariObat(val) {
      console.log('cari obat ', val)
      this.setParam('nama_obat', val)
      if (this.params.kdgudang) {
        this.getListObat()
      } else {
        notifErrVue('gudang belum dipilih')
      }
    },
    getInitialData() {
      this.getRuangan()
    },
    selesaiDanKunci(val) {
      this.kunci(this.form.no_permintaan)
    },
    kunci(val) {
      const data = {
        no_permintaan: val
      }
      this.loadingKunci = true
      return new Promise(resolve => {
        api.post('v1/simrs/farmasinew/depo/kuncipermintaan', data)
          .then(resp => {
            this.loadingKunci = false
            console.log('kunci permintaan ', resp)
            notifSuccess(resp)
            const list = useListPermintaanRuanganStore()
            list.ambilPermintaan()
            this.details = []
            this.getListObat()
            this.clearForm()
            resolve(resp)
          })
          .catch(() => { this.loadingKunci = false })
      })
    },
    getListObat() {
      this.loadingObat = true
      const param = { params: this.params }
      return new Promise(resolve => {
        api.get('v1/simrs/farmasinew/depo/lihatstokgudang', param)
          .then(resp => {
            this.loadingObat = false
            console.log('stok gudang', resp)
            if (resp.data.obat) {
              this.obats = resp.data.obat
            }
            if (resp.data.stokdewe) {
              this.stokDewe = resp.data.stokdewe
            }
            resolve(resp)
          }).catch(() => {
            this.loadingObat = false
          })
      })
    },
    getRuangan() {
      this.loadingRuang = true
      return new Promise(resolve => {
        api.get('v1/ruang/ruang')
          .then(resp => {
            this.loadingRuang = false
            console.log('ruang', resp.data)
            this.ruangans = resp?.data
            resolve(resp)
          })
          .catch(() => {
            this.loadingRuang = false
          })
      })
    },
    simpan() {
      this.loading = true
      return new Promise(resolve => {
        api.post('v1/simrs/farmasinew/depo/simpanpermintaandepo', this.form)
          .then(resp => {
            this.loading = false
            console.log('simpan permintaan depo', resp.data)

            if (resp.data.notrans) {
              this.setForm('no_permintaan', resp.data.notrans)
            }
            if (resp.data.rinci) {
              const rinc = resp.data.rinci
              if (rinc.kdobat) {
                const anu = this.obats.filter(a => a.kd_obat === rinc.kdobat)
                if (anu.length) {
                  const obat = anu[0]
                  rinc.nama_obat = obat.nama_obat
                }
                const adaDetail = this.details.filter(ob => ob.kdobat === rinc.kdobat)
                if (adaDetail.length) {
                  const data = adaDetail[0]
                  if (data) {
                    Object.assign(data, rinc)
                  }
                } else {
                  this.details.push(rinc)
                }
              }
            }
            this.clearObat()
            this.getListObat()
            resolve(resp)
          })
          .catch(() => { this.loading = false })
      })
    },
    simpanMintaMax(val) {
      this.loadingMax = true
      return new Promise(resolve => {
        api.post('v1/simrs/farmasinew/simpanminta', val)
          .then(resp => {
            this.loadingMax = false
            console.log('max', resp.data)
            notifSuccess(resp)
            this.getListObat()
            resolve(resp)
          }).catch(() => { this.loadingMax = false })
      })
    }
  }
})
