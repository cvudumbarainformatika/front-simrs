<script setup>
import { useStyledStore } from 'src/stores/app/styled'
import ListPengunjung from './comp/ListPengunjung.vue'

const style = useStyledStore()
</script>

<template>
  <q-page
    ref="pageRef"
    class="column full-height full-width"
  >
    <div
      class="col-auto fixed-top"
      :style="`z-index:1000; ${!style.componentfull?'margin-top:50px;':''}`"
    >
      <div class="bg-primary text-white">
        <q-toolbar>
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
      class="col-grow"
      :style="`max-height: ${!style.componentfull? h-60:h+40}px; overflow:hidden`"
    >
      <list-pengunjung />
    </q-card>
  </q-page>
</template>
