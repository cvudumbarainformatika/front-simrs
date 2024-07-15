<template>
  <!-- <q-page> -->
  <q-page class="fit q-px-md q-pb-md absolute">
    <template v-if="store.pasien">
      <DetailsPasien />
    </template>
    <template v-else>
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
              />
              <thumbnail-view
                v-else
                key="thumbnail-view"
                :items="store.items"
                @details="(val)=>store.pasien=val"
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
    </template>
  </q-page>
  <!-- </q-page> -->
</template>

<script setup>
import HeaderComp from './comp/HeaderComp.vue'
import ThumbnailView from './comp/ThumbnailView.vue'

import { useListPendaftaranRanapStore } from 'src/stores/simrs/pendaftaran/ranap/listtunggu'
import { onMounted } from 'vue'
import ListPasien from './comp/ListPasien.vue'
import DetailsPasien from './comp/DetailsPasien.vue'

const store = useListPendaftaranRanapStore()

onMounted(() => {
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
