<template>
  <!-- <q-page> -->
  <q-page class="fit q-pa-md absolute">
    <template v-if="store.pasien">
      <!-- <DetailsPasien /> -->
      <page-layanan-rehabmedik :pasien="store.pasien" :key="store.pasien" v-model="store.bukaLayanan" @tutup="store.pasien=null" />
    </template>
    <template v-else>
      <div class="fit column relative-position">
        <div class="col-auto">
          <HeaderComp />
        </div>
        <div class="col full-height">
          <!-- <template v-if="store.lloading">
            <LoadingList
              v-for="i in 20"
              :key="i"
            />
          </template> -->
          <template v-if="store.items?.length > 0 || store.loading">
            <!-- <transition-group
              appear

              enter-active-class="animated fadeIn faster"
              leave-active-class="animated fadeOut faster"
            > -->
            <list-pasien
              v-if="!store.isViewList"
              :items="store.items"
              :loading="store.loading"
              @details="(val)=>bukaLayanan(val)"
            />
            <thumbnail-view
              v-else
              :items="store.items"
              @details="(val)=>bukaLayanan(val)"
            />
            <!-- </transition-group> -->
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

// import { useListPendaftaranRanapStore } from 'src/stores/simrs/pendaftaran/ranap/listtunggu'
import { defineAsyncComponent, onMounted } from 'vue'
import ListPasien from './comp/ListPasien.vue'
// import DetailsPasien from './comp/DetailsPasien.vue'
import { useKunjunganRehabmediStore } from 'src/stores/simrs/pelayanan/rehabmedik/kunjungan'

const store = useKunjunganRehabmediStore()

const PageLayananRehabmedik = defineAsyncComponent(() => import('./PageLayananRehabmedik.vue'))

onMounted(() => {
  store.getDataTable()
})

function bukaLayanan (val) {
  store.pasien = val
  store.bukaLayanan = true
}

</script>

<style lang="scss" scoped>

.scroll {
  scrollbar-width: none; /* untuk Firefox */
}

.scroll::-webkit-scrollbar {
  display: none; /* untuk Chrome, Safari, dan Opera */
}

</style>
