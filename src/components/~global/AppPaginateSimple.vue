<template>
  <div
    class="row items-center justify-between q-pa-sm"
    :class="`${color} text-${textColor}`"
  >
    <div>
      <div class="row items-center">
        <q-btn
          flat
          :color="textColor"
          icon="icon-mat-skip_previous"
          size="sm"
          round
          :disable="meta.current_page===1"
          @click="emits('goTo',1)"
        />
        <q-btn
          flat
          :color="textColor"
          icon="icon-mat-chevron_left"
          size="sm"
          round
          :disable="meta.current_page===1"
          @click="emits('goTo',meta.current_page-1)"
        />
        <div class="q-px-sm">
          <div
            v-if="meta.total !==0"
            classs="row items-center"
          >
            | <span class="q-px-sm">Hal.  <span class="f-18 text-orange text-weight-bold">{{ meta.current_page }} </span> dari <span class="text-weight-bold">{{ lastPage }}</span> Total Halaman</span> |
          </div>
          <div v-else>
            Tidak Ada Data
          </div>
        </div>
        <q-btn
          flat
          :color="textColor"
          icon="icon-mat-chevron_right"
          size="sm"
          round
          :disable="meta.current_page===lastPage"
          @click="emits('goTo',meta.current_page+1)"
        />
        <q-btn
          flat
          :color="textColor"
          icon="icon-mat-skip_next"
          size="sm"
          round
          :disable="meta.current_page===lastPage"
          @click="emits('goTo',lastPage)"
        />
      </div>
    </div>
    <div class="q-pr-xl">
      <q-badge
        outline
        align="middle"
        color="orange"
        class="q-mr-xs f-20 text-weight-bold"
      >
        {{ meta.total }}
      </q-badge> TOTAL DATA DITEMUKAN
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const emits = defineEmits(['goTo'])
const props = defineProps({
  color: {
    type: String,
    default: 'bg-primary'
  },
  textColor: {
    type: String,
    default: 'white'
  },
  meta: {
    type: Object,
    default: null
  }
})

const lastPage = computed(() => {
  return Math.ceil(props.meta?.total / props.meta?.per_page)
})
</script>
