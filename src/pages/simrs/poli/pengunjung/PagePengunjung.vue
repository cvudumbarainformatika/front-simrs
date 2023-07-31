<template>
  <q-page
    ref="pageRef"
    class="column full-height q-pa-xs"
  >
    <div
      class="col-auto fixed-top"
      :style="`z-index:1000; ${!style.componentfull?'margin-top:50px;':''}`"
    >
      <div class="">
        <q-toolbar class="bg-primary text-white">
          <q-btn
            flat
            round
            dense
            icon="icon-mat-personal_injury"
            class="q-mr-sm"
          />

          <q-toolbar-title>
            <div class="f-14 ">
              My Pasien
            </div>
            <div class="f-10">
              Daftar Pengunjung di Ruangan Ini
            </div>
          </q-toolbar-title>

          <q-btn
            flat
            round
            dense
            :icon="style.componentfull?'icon-mat-close_fullscreen':'icon-mat-open_in_full'"
            size="sm"
            @click="style.setComponentFull"
          />
        </q-toolbar>
      </div>
    </div>
    <q-card
      square
      class="col-grow scroll"
      :style="`height: ${!style.componentfull? h-10:h+40}px;`"
    >
      <list-pengunjung
        :key="store.items"
        :items="store.items"
      />
    </q-card>
  </q-page>
</template>

<script setup>
import { useStyledStore } from 'src/stores/app/styled'
import { usePengunjungPoliStore } from 'src/stores/simrs/pelayanan/poli/pengunjung'
import { onMounted, ref } from 'vue'
import ListPengunjung from './comp/ListPengunjung.vue'

const style = useStyledStore()
const store = usePengunjungPoliStore()
const pageRef = ref()
const h = ref(0)
onMounted(() => {
  store.getData()
  h.value = pageRef.value.$el.clientHeight
})
</script>
