<template>
  <div v-if="!data">
    <q-btn
      color="red"
      dense
      round
      icon="icon-mat-close"
    />
  </div>
  <div v-if="data">
    <div
      v-if="data.kategory"
      class="row"
    >
      <div v-if="data.terlambat==='no'">
        <q-btn
          :style="`background-color: ${data.kategory.warna};`"
          color="white"
          flat
          dense
          round
          icon="icon-mat-done_all"
        />
      </div>
      <div v-if="data.terlambat==='yes'">
        <q-btn
          color="orange"
          dense
          round
          icon="icon-mat-done"
        />
      </div>
    </div>
    <div
      v-if="data.prota"
      class="row"
    >
      <q-chip
        color="red"
        text-color="white"
        class="chip"
        dense
        square
      >
        <div class="f-12">
          {{ data.prota.nama }}
        </div>
      </q-chip>
    </div>
    <div
      v-if="data.libur"
      class="row"
    >
      <q-chip
        color="info"
        text-color="white"
        class="chip"
        dense
        square
      >
        <div class="f-12 text-center">
          {{ data.libur.flag }}
        </div>
      </q-chip>
    </div>
  </div>
</template>
<script setup>
defineProps({
  data: {
    type: Object,
    default: () => {}
  }
})
</script>
