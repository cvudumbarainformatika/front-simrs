<template>
  <div class="row full-width q-pa-xs items-center">
    <div class="col-auto q-mr-sm">
      <app-input-date
        :model="from"
        label="dari tanggal"
        outlined
        dark
        @set-model="emits('setFrom',$event)"
      />
    </div>
    <div class="col-auto q-mr-sm">
      s/d
    </div>
    <div class="col-auto q-mr-sm">
      <app-input-date
        :model="to"
        label="sampai tanggal"
        outlined
        dark
        @set-model="emits('setTo',$event)"
      />
    </div>
    <!-- <div class="col-auto q-mr-sm">
      <q-option-group
        v-model="toFlag"
        :options="flagOptions"
        color="primary"
        class="q-ml-sm"
        dense
        type="checkbox"
        inline
      />
    </div> -->
  </div>
</template>
<script setup>
// import { ref, computed } from 'vue'
// emits
const emits = defineEmits(['setFrom', 'setTo', 'setFlag'])
// props
defineProps({
  from: { type: String, default: '' },
  to: { type: String, default: '' },
  flag: { type: Array, default: () => [] }
})

// flag
// const flagOptions = ref([
//   { label: 'Disiapkan', value: '2' },
//   { label: 'Dibuatkan resep', value: '3' }
// ])
// const toFlag = computed({
//   get () {
//     return props.flag
//   },
//   set (newVal) {
//     emits('setFlag', newVal)
//   }
// })
</script>
