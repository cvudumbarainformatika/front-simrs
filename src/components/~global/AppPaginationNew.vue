<template>
  <q-card
    bordered
    flat
  >
    <div class="row items-center q-pa-sm">
      <div
        v-if="details && total !== 0"
        class="col-md-6 col-xs-12"
      >
        Hal. <strong>{{ meta.current_page }}</strong> dari <strong>{{ lastPage }}</strong>
        halaman dan <strong>{{ total }}</strong> data keseluruhan
      </div>
      <div
        v-else
        class="col-md-6 col-xs-12"
      >
        <q-skeleton type="text" />
      </div>
      <div :class="!details?'col-12':'col-md-6 col-xs-12'">
        <div class="flex items-center justify-end">
          <q-btn
            :disable="meta.current_page===1"
            flat
            round
            color="primary"
            icon="icon-mat-skip_previous"
            size="sm"
            @click="emits('first')"
          />
          <q-btn
            :disable="!meta.prev_page_url"
            flat
            round
            color="primary"
            icon="icon-mat-chevron_left"
            size="sm"
            @click="emits('prev')"
          />
          <div class="bold q-pa-xs">
            {{ meta.current_page }}  {{ lastPage? `/ ${lastPage}`: '' }}
          </div>
          <q-btn
            :disable="!meta.next_page_url"
            flat
            round
            color="primary"
            icon="icon-mat-chevron_right"
            size="sm"
            @click="emits('next')"
          />
          <q-btn
            v-if="total !== 0"
            :disable="meta.current_page === lastPage"
            flat
            round
            color="primary"
            icon="icon-mat-skip_next"
            size="sm"
            @click="emits('last', lastPage)"
          />
          <q-skeleton
            v-else
            size="14px"
            type="circle"
          />
        </div>
      </div>
    </div>
  </q-card>
</template>

<script setup>
import { computed } from 'vue'

const lastPage = computed(() => {
  return Math.ceil(props.total / props.meta.per_page)
})

const props = defineProps({
  meta: {
    type: Object,
    default: () => {}
  },
  total: {
    type: Number,
    default: 0
  },
  details: {
    type: Boolean,
    default: true
  }
})
const emits = defineEmits(['next', 'first', 'prev', 'last'])

</script>

<style lang="scss" scoped>
.table__control {
  display: flex;
  align-items: center;
  font-size: 12px !important;
}
</style>
