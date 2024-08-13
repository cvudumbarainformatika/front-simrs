<template>
  <q-dialog
    persistent
    :maximized="true"
    transition-show="slide-left"
    transition-hide="slide-right"
  >
    <q-card class="column">
      <div class="col-auto">
        <q-bar class="bg-primary text-white">
          <q-space />

          <q-btn
            v-close-popup
            dense
            flat
            icon="icon-mat-close"
          >
            <q-tooltip class="bg-white text-primary">
              Tutup
            </q-tooltip>
          </q-btn>
        </q-bar>

        <div class="q-px-md q-py-sm">
          <div class="f-14 text-weight-bold">
            Lokasi {{ store.item.nama }}
          </div>
          <div class="caption">
            Dibawah Naungan {{ store.item.desc }}
          </div>
        </div>
      </div>

      <q-separator />
      <div class="col full-height scroll">
        <component
          :is="layout"
        />
      </div>
    </q-card>

    <!-- dialogFormRuangan -->
    <DialogFormRuangan v-model="store.dialogFormRuangan" />
  </q-dialog>
</template>

<script setup>
import { useLocationSatsetStore } from 'src/stores/satset/location'
import DialogFormRuangan from './DialogFormRuangan.vue'
import PagePoli from './contents/PagePoli.vue'
import PageRanapDua from './contents/PageRanapDua.vue'
import { computed } from 'vue'

const store = useLocationSatsetStore()
const layouts = {
  default: PagePoli,
  PagePoli,
  PageRanapDua
}
const defaultLayout = 'PagePoli'
const layout = computed(() => layouts[store.item.comp] || defaultLayout)
// const comp = computed(() => {
//   const content = store.item.content
//   if (content === 'poli') {
//     return shallowRef(defineAsyncComponent(() => import('./contents/PagePoli.vue')))
//   }

//   return shallowRef(defineAsyncComponent(() => import('./contents/PagePoli.vue')))
// })
</script>
