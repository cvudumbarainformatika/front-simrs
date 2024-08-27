<template>
  <div class="fit">
    <div class="fit column relative-position">
      <div class="col-auto">
        <HeaderComp />
      </div>
      <div class="col full-height">
        <template v-if="store.items?.length > 0">
          <transition-group
            appear

            enter-active-class="animated fadeIn faster"
            leave-active-class="animated fadeOut faster"
          >
            <list-pasien
              v-if="!store.isViewList"
              key="list-pasien"
              :items="store.items"
              :loading="store.loading"
              @details="(val)=>store.pasien=val"
              @spri="(val)=>{
                store.pasien = val
                store.dialogSpri = true
              }"
              @cetak-gelang="(val)=>{
                store.pasien = val
                store.dialogCetakGelang = true
              }"
              @buat-sep="(val)=>{
                sep.edited = false
                store.pasien = val
                store.dialogSep = true
              }"
              @edit-sep="(val)=>{
                sep.edited = true
                store.pasien = val
                // store.dialogSep = true
                console.log('val from list', val);
                if (!val?.sep) {
                  return notifErrVue('sep Tidak ditemukan !')
                }
                store.dialogSep = true
                sep.cariSep(val)

              }"
              @hapus-sep="(val)=>{
                hapusSep(val)
              }"
              @sep-manual="(val)=>{
                store.pasien = val
                store.dialogSepManual= true
              }"
              @cetak-sep="(val)=>{
                store.pasien = val
                store.dialogCetakSep = true
              }"
            />
            <thumbnail-view
              v-else
              key="thumbnail-view"
              :items="store.items"
              @details="(val)=>store.pasien=val"
              @spri="(val)=>{
                store.pasien = val
                store.dialogSpri = true
              }"
              @cetak-gelang="(val)=>{
                store.pasien = val
                store.dialogCetakGelang = true
              }"
              @buat-sep="(val)=>{
                sep.edited = false
                store.pasien = val
                store.dialogSep = true
              }"
              @edit-sep="(val)=>{
                sep.edited = true
                store.pasien = val
                // store.dialogSep = true
                console.log('val from list', val);
                if (!val?.sep) {
                  return notifErrVue('sep Tidak ditemukan !')
                }
                store.dialogSep = true
                sep.cariSep(val)

              }"
              @hapus-sep="(val)=>{
                hapusSep(val)
              }"

              @sep-manual="(val)=>{
                store.pasien = val
                store.dialogSepManual= true
              }"
              @cetak-sep="(val)=>{
                store.pasien = val
                store.dialogCetakSep = true
              }"
            />
          </transition-group>
        </template>
        <template v-else>
          <div v-if="store.loading" class="fit column flex-center ">
            <q-spinner-bars color="grey-6" size="3em" />
            <div class="text-grey-8 q-mt-md">
              Harap Tunggu ...
            </div>
          </div>
          <div
            class="fit column flex-center"
            v-else
          >
            <div class="text-h4 q-mb-xs">
              🏷️
            </div>
            <div class="text-grey-8">
              Data Tidak Ditemukan
            </div>
          </div>
        </template>
      </div>
      <div class="absolute-bottom z-top">
        <app-paginate-simple
          v-if="store.meta"
          :key="store.meta"
          :meta="store.meta"
          color="bg-grey-8"
          @go-to="store.setPage"
        />
      </div>
    </div>

    <!-- dialog spri-->
    <dialog-spri
      v-model="store.dialogSpri"
      :pasien="store.pasien"
      :key="store.pasien"
    />
    <dialog-cetak-gelang
      v-model="store.dialogCetakGelang"
      :pasien="store.pasien"
      :key="store.pasien"
    />
    <dialog-sep
      v-model="store.dialogSep"
      :pasien="store.pasien"
      :key="store.pasien"
    />
    <dialog-sep-manual
      v-model="store.dialogSepManual"
      :pasien="store.pasien"
      :key="store.pasien"
    />
    <dialog-cetak-sep
      v-model="store.dialogCetakSep"
      :pasien="store.pasien"
    />
  </div>
</template>

<script setup>
import { useListHistoryPendaftaranRanapStore } from 'src/stores/simrs/pendaftaran/ranap/history'
import { defineAsyncComponent, onMounted } from 'vue'
import ListPasien from './compHistory/ListPasien.vue'
import { useFormPendaftaranRanapStore } from 'src/stores/simrs/pendaftaran/ranap/formpendaftaran'
import { useBuatSepRanapStore } from 'src/stores/simrs/pendaftaran/ranap/buatsep'
import { notifErrVue } from 'src/modules/utils'
import { useQuasar } from 'quasar'

const HeaderComp = defineAsyncComponent(() => import('./compHistory/HeaderComp.vue'))
// const ListPasien = defineAsyncComponent(() => import('./compHistory/ListPasien.vue'))
const ThumbnailView = defineAsyncComponent(() => import('./compHistory/ThumbnailView.vue'))
const DialogSpri = defineAsyncComponent(() => import('./compHistory/DialogSpri.vue'))
const DialogCetakGelang = defineAsyncComponent(() => import('./compHistory/DialogCetakGelang.vue'))
const DialogSep = defineAsyncComponent(() => import('./compHistory/DialogSep.vue'))
const DialogSepManual = defineAsyncComponent(() => import('./compHistory/DialogSepManual.vue'))
const DialogCetakSep = defineAsyncComponent(() => import('./compHistory/DialogCetakSep.vue'))

const store = useListHistoryPendaftaranRanapStore()
const pendaftaran = useFormPendaftaranRanapStore()
const sep = useBuatSepRanapStore()

onMounted(() => {
  sep.dokters = pendaftaran?.dokters
  store.getRuangan()
  store.getDataTable()
})

const $q = useQuasar()

function hapusSep (val) {
  // console.log(val)
  $q.dialog({
    title: '<span class="text-red">Peringatan<em>!</em></span>',
    message: '<em>Apakah anda yakin ?</em> <span class="text-red">Akan Hapus NO. SEP  </span> <strong>' + val?.sep + '</strong>',
    html: true,
    cancel: true,
    persistent: true
  }).onOk(() => {
    // console.log('OK')
    sep.hapusSep(val)
  }).onCancel(() => {
    // console.log('Cancel')
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}

</script>
