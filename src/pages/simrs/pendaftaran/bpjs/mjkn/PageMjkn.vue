<template>
  <div class="column full-height">
    <div
      class="col-auto fixed-top"
      style="z-index:1"
    >
      <HeaderComp
        :tanggal="store.params.tgl"
        :search="store.params.q"
        :per-page="store.params.per_page"
        @fullscreen="style.setComponentFull"
        @set-tanggal="(val)=>store.setDate(val)"
        @set-search="store.setQ"
        @set-row="store.setPerPage"
      />
    </div>
    <div
      class="col full-height"
      style="padding-bottom: 60px; padding-top:60px"
    >
      <ListKunjungan
        :key="store.items"
        :items="store.items"
        :loading="store.loading"
        :loading-send="store.loadingSend"
        :rm="Rm"
        @kirim-poli="kirimPoli"
      />
    </div>
    <div class="fixed-bottom">
      <BottomComp
        v-if="store.meta !==null"
        :key="store.meta"
        :meta="store.meta"
        @go-to="store.setPage"
      />
    </div>
  </div>
</template>

<script setup>
import HeaderComp from './comp/HeaderComp.vue'
import ListKunjungan from './comp/ListKunjungan.vue'
import BottomComp from './comp/BottomComp.vue'
import { useStyledStore } from 'src/stores/app/styled'
import { useListBpjsAntrianStore } from 'src/stores/simrs/pendaftaran/mjkn/lists'
import { onMounted, onUnmounted, ref } from 'vue'
import { findWithAttr } from 'src/modules/utils'
import { usePendaftaranPasienStore } from 'src/stores/simrs/pendaftaran/form/pasien/pasien'
import { useRegistrasiPasienBPJSStore } from 'src/stores/simrs/pendaftaran/form/bpjs/registrasibpjs'
import { routerInstance } from 'src/boot/router'

const style = useStyledStore()
const store = useListBpjsAntrianStore()
const pasien = usePendaftaranPasienStore()
const regis = useRegistrasiPasienBPJSStore()
const Rm = ref('')
function kirimPoli(val) {
  // val.noreg = ''
  // console.log('kirim poli ', val)
  if (!val.noreg) {
    Rm.value = val.norm
    console.log('kirim poli ', val)
    store.getPasien(val.norm).then(resp => {
      if (resp.length === 1) {
        pilihPasienIni(resp[0])
      } else {
        const index = findWithAttr(resp, 'norm', val.norm)
        if (index >= 0) {
          pilihPasienIni(resp[index])
        }
      }
    })
  }
}
// eslint-disable-next-line no-unused-vars
function pilihPasienIni(val) {
  if (val === '' || val === null || val === undefined || !val) return
  val.noka = val.nokabpjs
  pasien.form = val
  if (pasien.alamataDomisiliSama) {
    if ((!pasien.form.alamatdomisili ? true : pasien.form.alamatdomisili === '') && pasien.form.alamat) pasien.setForm('alamatdomisili', pasien.form.alamat)
    if ((!pasien.form.rtdomisili ? true : pasien.form.rtdomisili === '') && pasien.form.rt) pasien.setForm('rtdomisili', pasien.form.rt)
    if ((!pasien.form.rwdomisili ? true : pasien.form.rwdomisili === '') && pasien.form.rw) pasien.setForm('rwdomisili', pasien.form.rw)
    if ((!pasien.form.kodeposdomisili ? true : pasien.form.kodeposdomisili === '') && pasien.form.kodepos) pasien.setForm('kodeposdomisili', pasien.form.kodepos)
    if ((!pasien.form.negaradomisili ? true : pasien.form.negaradomisili === '') && pasien.form.negara) pasien.setForm('negaradomisili', pasien.form.negara)
    if ((!pasien.form.propinsidomisili ? true : pasien.form.propinsidomisili === '') && pasien.form.propinsi) pasien.setForm('propinsidomisili', pasien.form.propinsi)
    if ((!pasien.form.kodepropinsidomisili ? true : pasien.form.kodepropinsidomisili === '') && pasien.form.kodepropinsi) pasien.setForm('kodepropinsidomisili', pasien.form.kodepropinsi)
    if ((!pasien.form.kabupatenkotadomisili ? true : pasien.form.kabupatenkotadomisili === '') && pasien.form.kabupatenkota) pasien.setForm('kabupatenkotadomisili', pasien.form.kabupatenkota)
    if ((!pasien.form.kodekabupatenkotadomisili ? true : pasien.form.kodekabupatenkotadomisili === '') && pasien.form.kodekabupatenkota) pasien.setForm('kodekabupatenkotadomisili', pasien.form.kodekabupatenkota)
    if ((!pasien.form.kecamatandomisili ? true : pasien.form.kecamatandomisili === '') && pasien.form.kecamatan) pasien.setForm('kecamatandomisili', pasien.form.kecamatan)
    if ((!pasien.form.kodekecamatandomisili ? true : pasien.form.kodekecamatandomisili === '') && pasien.form.kodekecamatan) pasien.setForm('kodekecamatandomisili', pasien.form.kodekecamatan)
    if ((!pasien.form.kelurahandomisili ? true : pasien.form.kelurahandomisili === '') && pasien.form.kelurahan) pasien.setForm('kelurahandomisili', pasien.form.kelurahan)
    if ((!pasien.form.kodekelurahandomisili ? true : pasien.form.kodekelurahandomisili === '') && pasien.form.kodekelurahan) pasien.setForm('kodekelurahandomisili', pasien.form.kodekelurahan)
  }
  // if (val.nik !== '') {
  //   const form = { nik: val.nik, tglsep: regis.form.tglsep }
  //   pasien.cekPesertaByNik(form).then(resp => {
  //     if (Object.keys(resp.provUmum).length) {
  //       const rujukan = {
  //         kode: resp.provUmum.kdProvider,
  //         nama: resp.provUmum.nmProvider
  //       }
  //       regis.ppkRujukans.push(rujukan)
  //       regis.display.kode = rujukan.kode
  //       regis.setForm('ppkRujukan', rujukan.kode)
  //     }
  //   })
  // } else
  if (val.noka !== '') {
    console.log('noka', val.noka === undefined)
    const form = { noka: val.noka, tglsep: regis.form.tglsep }
    pasien.cekPesertaByNoka(form).then(resp => {
      pasien.alert = true
      pasien.alertMsg = resp
      console.log('cek noka', resp)
      if (resp.peserta.provUmum) {
        const rujukan = {
          kode: resp.peserta.provUmum.kdProvider,
          nama: resp.peserta.provUmum.nmProvider
        }
        regis.ppkRujukans.push(rujukan)
        regis.display.kode = rujukan.kode
        regis.setForm('ppkRujukan', rujukan.kode)
      }
    })
  }

  const tglLahir = val.tgllahir.split('-')
  pasien.setForm('barulama', 'lama')
  if (tglLahir.length) {
    pasien.tanggal.tahun = tglLahir[0]
    pasien.tanggal.bulan = tglLahir[1]
    pasien.tanggal.hari = tglLahir[2]
    pasien.setTanggalLahir()
  }
  console.log('pasien terpilih', val)
  routerInstance.push({
    path: '/pendaftaran/bpjs/form',
    replace: true
  })
}
onMounted(() => {
  store.getLists()
})

onUnmounted(() => {
  store.setTglAwal()
})
</script>
