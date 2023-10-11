<template>
  <!--  distribusi langsung sekalian saja, tabelnya jadi satu.
        antara transaksi dan form nya.
        jadikan satu tabel saja.
        biar simple juga melihatnya
         -->
  <div>
    <q-card>
      <q-card-section>
        <div class="f-14 text-weight-bold">
          Distribusi Langsung {{ ruang }}
        </div>
        <div class="title-desc">
          Halaman Distribusi Langsung {{ ruang }}
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="row items-center">
          <div class="col-3">
            Nomor Distribusi
          </div>
          <div class="col-4">
            <app-input
              ref="refDist"
              v-model="store.form.no_distribusi"
              label="Nomor Distribusi"
              outlined
              :rules="[
                val=> val!=='no/DSTL/' + date.formatDate(Date.now(), 'MM') + '/' + date.formatDate(Date.now(), 'YYYY') || 'Harap diganti'
              ]"
            />
          </div>
        </div>
        <div class="row items-center q-mt-sm">
          <div class="col-3">
            Tanggal Distribusi
          </div>
          <div class="col-4">
            <div class="col-md-6 col-xs-12">
              <app-input-date
                ref="refTempo"
                :model="store.form.tanggal"
                icon="icon-mat-event"
                outlined
                label="Tempo"
                @set-model="setModel"
              />
            </div>
          </div>
        </div>
        <div class="row items-center q-mt-sm">
          <div class="col-3">
            Ruangan Tujuan
          </div>
          <div class="col-4">
            <app-autocomplete-new
              ref="refRuangan"
              label="Ruangan"
              :model="store.form.ruang_tujuan"
              option-value="kode"
              option-label="uraian"
              autocomplete="uraian"
              outlined
              debounce="500"
              :source="store.ruangs"
              :loading="store.loadingRuang"
              @on-select="ruangSelected"
              @clear="ruangCleared"
            />
            <!-- @buang="store.getRuangs" -->
          </div>
        </div>
        <div class="row items-center q-my-sm">
          <div class="col-3">
            Petugas Depo
          </div>
          <div class="col-9">
            {{ auth.user? auth.user.nama:'tekan f5 karena nama anda belum terbaca' }}
          </div>

          <!-- {{ store.form }} -->
        </div>
        <div class="row items-center">
          <div class="col-3">
            Pilih Tipe Barang
          </div>
          <div class="col-4">
            <app-autocomplete-new
              v-model="store.params.tipe"
              label="pilih tipe barang"
              autocomplete="nama"
              option-label="nama"
              option-value="value"
              outlined
              :disable="store.loadingStokDepo"
              :loading="store.loadingStokDepo"
              :source="store.options"
              @on-select="tipeSelected"
            />
          </div>
        </div>
        <div class="row justify-end">
          <app-btn
            v-if="store.params.tipe==='basah'"
            class="q-mr-md"
            color="deep-purple"
            label="Distribusikan Semua bahan basah"
            :loading="store.loading"
            :disable="store.loading"
            @click="distribusikanBasah"
          />
          <!-- <app-btn
            label="Distribusikan"
            :loading="store.loading"
            :disable="store.loading"
            @click="selesai"
          /> -->
        </div>
      </q-card-section>
    </q-card>
    <FormBasah
      @simpan-list="simpanList"
    />
    <!-- <FormKering
      v-if="store.tipe==='kering'"
      @simpan-list="simpanList"
    /> -->
  </div>
</template>
<script setup>
import { date, Dialog } from 'quasar'
import FormBasah from './FormBasah.vue'
// import FormKering from './FormKering.vue'
import { useTransaksiDistribusiLangsung } from 'src/stores/simrs/logistik/sigarang/transaksi/distribusilangsung/distribusilangsung'
import { computed, ref } from 'vue'
import { notifErrVue } from 'src/modules/utils'
import { useAplikasiStore } from 'src/stores/app/aplikasi'

const store = useTransaksiDistribusiLangsung()

const auth = useAplikasiStore()
store.getInitialData()
const ruang = computed(() => {
  const depo = auth.user.depo ? auth.user.depo.nama : false
  if (depo) {
    return depo
  } else {
    return ''
  }
})
const tipeSelected = val => {
  // console.log(val)
  store.setParam('tipe', val)
  store.getDataTable()
}
const setModel = val => {
  const temp = new Date(val)
  const jam = date.formatDate(Date.now(), 'HH')
  const min = date.formatDate(Date.now(), 'mm')
  const det = date.formatDate(Date.now(), 'ss')
  temp.setHours(jam)
  temp.setMinutes(min)
  temp.setSeconds(det)
  const indTime = date.formatDate(temp, 'YYYY-MM-DD HH:mm:ss')

  store.setForm('tanggal', indTime)
  // console.log('tanggal', indTime)
}
const ruangSelected = val => {
  store.setForm('ruang_tujuan', val)
  // console.log('runag', val)
}
const ruangCleared = val => {
  store.setForm('ruang_tujuan', null)
  // console.log('runag', val)
}
const refDist = ref(null)
const refRuangan = ref(null)
// const valid=ref(false)
const simpanList = val => {
  console.log('simpan list', val)
  console.log('form', store.form)
  refRuangan.value.$refs.refAuto.validate()
  refDist.value.$refs.refInput.validate()
  if (refRuangan.value.$refs.refAuto.validate() && refDist.value.$refs.refInput.validate()) {
    store.formIsValid = true
    store.saveList(val)
  } else {
    notifErrVue('perhatikan nomor distribusi dan ruangan tujuan')
  }
}
function distribusikanBasah() {
  console.log('form', store.form)
  refRuangan.value.$refs.refAuto.validate()
  refDist.value.$refs.refInput.validate()
  if (refRuangan.value.$refs.refAuto.validate() && refDist.value.$refs.refInput.validate()) {
    store.formIsValid = true
    Dialog.create({
      title: 'Konfirmasi',
      message: 'Apakah semua barang basah akan langsung di distribusikan sampai habis?',
      ok: {
        push: true,
        'no-caps': true,
        label: 'Habiskan',
        color: 'warning'
      },
      cancel: {
        push: true,
        color: 'dark',
        'no-caps': true
      }
    })
      .onOk(() => {
        store.habiskanBahanBasah().then(() => {
          refRuangan.value.$refs.refAuto.resetValidation()
          refDist.value.$refs.refInput.resetValidation()
        })
      })
  } else {
    notifErrVue('perhatikan nomor distribusi dan ruangan tujuan')
  }
}
// function selesai() {
//   store.selesai().then(() => {
//     refRuangan.value.$refs.refAuto.resetValidation()
//     refDist.value.$refs.refInput.resetValidation()
//   })
// }
// watch(() => auth.user, (data) => {
// console.log('watch', data)
//   store.setForm('pegawai_id', data.pegawai_id)
// })
</script>
