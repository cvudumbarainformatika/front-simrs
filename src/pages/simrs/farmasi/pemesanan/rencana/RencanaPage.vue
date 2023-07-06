<template>
  <div
    class="fixed-top row no-wrap items-center justify-between q-mr-sm"
    style="z-index: 10;"
  >
    <div>No Perencanaan: </div>
    <div class="row items-center no-wrap">
      <app-input-date-human
        label="Tanggal"
        :filled="false"
      />
    </div>
    <div>
      <q-btn
        flat
        :icon="!style.componentfull?'icon-mat-open_in_full':'icon-mat-close_fullscreen'"
        round
        :color="style.componentfull?'green':'primary'"
        size="12px"
        class="q-ml-md"
        @click="style.setComponentFull"
      />
    </div>
  </div>
  <!-- perencanaan -->
  <div class="q-mt-lg q-pt-lg">
    rencana
  </div>
</template>
<script setup>
import { useStyledStore } from 'src/stores/app/styled'

const style = useStyledStore()
</script>
