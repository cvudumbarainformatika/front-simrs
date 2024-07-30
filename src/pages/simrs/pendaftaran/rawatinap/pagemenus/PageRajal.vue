<template>
  <!-- <q-page> -->
  <div class="fit">
    <!-- <template v-if="store.pasien">
      <DetailsPasien />
    </template> -->
    <!-- <template> -->
    <div class="fit column relative-position">
      <div class="col-auto">
        <HeaderComp />
      </div>
      <div class="col full-height">
        <template v-if="!store.loading">
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
                @send="(val)=>{
                  store.pasien = val
                  store.dialogSend = true
                }"
              />
              <thumbnail-view
                v-else
                key="thumbnail-view"
                :items="store.items"
                @details="(val)=>store.pasien=val"
                @send="(val)=>{
                  store.pasien = val
                  store.dialogSend = true
                }"
              />
            </transition-group>
          </template>
          <div
            v-else
            class="fit column flex-center"
          >
            <div class="text-h4 q-mb-xs">
              🏷️
            </div>
            <div class="text-grey-8">
              Data Tidak Ditemukan
            </div>
          </div>
        </template>
        <template v-else>
          <div
            class="fit column flex-center"
          >
            <q-spinner-bars color="grey-6" size="3em" />
            <div class="text-grey-8 q-mt-md">
              Harap Tunggu ...
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
    <!-- </template> -->

    <!-- send pasien -->
    <dialog-send-pasien v-model="store.dialogSend" :pasien="store.pasien" :key="store.pasien" />
  </div>
  <!-- </q-page> -->
</template>

<script setup>
import HeaderComp from './compRajal/HeaderComp.vue'
import ThumbnailView from './compRajal/ThumbnailView.vue'

import { useListPendaftaranRanapStore } from 'src/stores/simrs/pendaftaran/ranap/listtunggu'
import { defineAsyncComponent, onMounted } from 'vue'
import ListPasien from './compRajal/ListPasien.vue'
// import DetailsPasien from './compRajal/DetailsPasien.vue'

// eslint-disable-next-line no-unused-vars
const DetailsPasien = defineAsyncComponent(() => import('./compRajal/DetailsPasien.vue'))
const DialogSendPasien = defineAsyncComponent(() => import('./compRajal/DialogSendPasien.vue'))

const store = useListPendaftaranRanapStore()

onMounted(() => {
  store.params.unit = 'rajal'
  store.getDataTable()
})

</script>

<style lang="scss" scoped>

.scroll {
  scrollbar-width: none; /* untuk Firefox */
}

.scroll::-webkit-scrollbar {
  display: none; /* untuk Chrome, Safari, dan Opera */
}

</style>
