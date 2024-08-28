<template>
  <q-page class="absolute fit bg-grey-3 q-pa-sm" style="overflow: hidden;">
    <div class="fit column">
      <div class="col-auto ng-red">
        <HeaderPage />
      </div>
      <div v-if="store.loading || store.items.length === 0" class="col full-height">
        <div class="column full-height flex-center">
          <div v-if="store.loading">
            <app-loading />
          </div>
          <div v-else>
            <div>Data Tidak ditemukan</div>
          </div>
        </div>
      </div>
      <div v-else class="col full-height scroll">
        <ListPage />
      </div>
      <div class="col-auto">
        <FooterPage />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useMappingTindakanStore } from 'src/stores/simrs/rekammedik/mapping'
import { defineAsyncComponent, onMounted } from 'vue'

const HeaderPage = defineAsyncComponent(() => import('./comp/HeaderPage.vue'))
const FooterPage = defineAsyncComponent(() => import('./comp/FooterPage.vue'))
const ListPage = defineAsyncComponent(() => import('./comp/ListPage.vue'))

const store = useMappingTindakanStore()

onMounted(() => {
  store.getTindakans()
})

</script>
