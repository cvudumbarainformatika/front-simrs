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
          :disable="meta.prev_page===null"
          @click="emits('goTo',meta.current_page-1)"
        />
        <div class="q-px-sm">
          <div v-if="meta.total !==0">
            | <span class="q-px-sm">Hal <span class="text-negative text-weight-bold">{{ meta.current_page }}</span> dari {{ meta.last_page }} Hal</span> |
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
          :disable="meta.next_page===null"
          @click="emits('goTo',meta.current_page+1)"
        />
        <q-btn
          flat
          :color="textColor"
          icon="icon-mat-skip_next"
          size="sm"
          round
          :disable="meta.current_page===meta.last_page"
          @click="emits('goTo',meta.last_page)"
        />
      </div>
    </div>
    <div>{{ meta.total }} DATA DITEMUKAN</div>
  </div>
</template>

<script setup>
const emits = defineEmits(['goTo'])
defineProps({
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
</script>
