<template>
  <div class="top">
    <div
      v-if="sun"
      class="row anak items-center"
    >
      <div class="col text-center">
        m
      </div>
    </div>

    <div v-if="!data">
      <!-- color="red" -->
      <q-avatar
        text-color="white"
        dense
        size="24px"
        icon="icon-mat-close"
      />
    </div>
    <div v-if="data">
      <div
        v-if="data.kategory"
        class="row"
      >
        <div v-if="data.terlambat==='no'">
          <q-avatar
            :style="`background-color: ${data.kategory.warna};`"
            text-color="white"
            size="24px"
            flat
            dense
            icon="icon-mat-done_all"
          />
        </div>
        <div v-if="data.terlambat==='yes'">
          <!-- text-color="white" -->
          <q-avatar
            :style="`color: ${data.kategory.warna};`"
            color="orange"
            size="24px"
            dense
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
          class="chip-able"
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
          class="chip-able"
          dense
          square
        >
          <div class="f-12 text-center">
            {{ data.libur.flag }}
          </div>
        </q-chip>
      </div>
    </div>
  </div>
</template>
<script setup>
import { date } from 'quasar'
import { computed } from 'vue'

const props = defineProps({
  data: { type: Object, default: () => {} },
  tgl: { type: String, default: date.formatDate(Date.now(), 'YYYY/MM/DD') }
})
const sun = computed(() => {
  let day = false
  // if (props.data) {
  // }
  day = date.formatDate(props.tgl, 'dddd') === 'Minggu'
  // console.log('day', day)
  return day
})
</script>
<style lang="scss" scoped>
.top{
  position: relative;
  .anak{
    position: absolute;
    top: -16px;
    left: -4px;
    border-radius: 50%;
    background: $red;
    width: 14px;
    height: 14px;
    color: white;
    padding-bottom: 1px;
    padding-right: 1px;
  }
}
</style>
