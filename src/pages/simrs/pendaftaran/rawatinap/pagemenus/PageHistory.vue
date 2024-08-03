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
            />
            <thumbnail-view
              v-else
              key="thumbnail-view"
              :items="store.items"
              @details="(val)=>store.pasien=val"
              @spri="(val)=>{
                store.pasien = val
                store.dialogSend = true
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
    />
  </div>
</template>

<script setup>
import { useListHistoryPendaftaranRanapStore } from 'src/stores/simrs/pendaftaran/ranap/history'
import { defineAsyncComponent, onMounted } from 'vue'
import ListPasien from './compHistory/ListPasien.vue'

const HeaderComp = defineAsyncComponent(() => import('./compHistory/HeaderComp.vue'))
// const ListPasien = defineAsyncComponent(() => import('./compHistory/ListPasien.vue'))
const ThumbnailView = defineAsyncComponent(() => import('./compHistory/ThumbnailView.vue'))
const DialogSpri = defineAsyncComponent(() => import('./compHistory/DialogSpri.vue'))

const store = useListHistoryPendaftaranRanapStore()

onMounted(() => {
  store.getDataTable()
})

</script>
