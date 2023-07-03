<template>
  <div class="bg-primary text-white">
    <q-bar style="height:50px">
      <div
        v-if="meta !== null"
        class="cursor-pointer"
      >
        <div
          v-if="meta.total !==0 && !loading"
          class="f-10"
        >
          Hal. <strong>{{ meta.current_page }}</strong> dari <strong>{{ meta.last_page }}</strong>
          halaman dan <strong>{{ meta.total }}</strong> data keseluruhan
        </div>
      </div>
      <div v-else>
        <q-skeleton
          type="text"
          width="100px"
        />
      </div>
      <q-space />
      <div class="q-mr-xl">
        <div class="flex items-center justify-end">
          <q-btn
            :disable="meta.current_page===1"
            flat
            round
            color="grey-2"
            icon="icon-mat-skip_previous"
            size="sm"
            @click="emits('first')"
          />
          <q-btn
            :disable="!meta.prev_page_url"
            flat
            round
            color="grey-2"
            icon="icon-mat-chevron_left"
            size="sm"
            @click="emits('prev')"
          />
          <div class="q-pa-lg f-10">
            {{ meta.current_page }}  {{ lastPage? `/ ${lastPage}`: '' }}
          </div>
          <q-btn
            :disable="!meta.next_page_url"
            flat
            round
            color="grey-2"
            icon="icon-mat-chevron_right"
            size="sm"
            @click="emits('next')"
          />
          <q-btn
            v-if="meta.total !== 0"
            :disable="meta.current_page === lastPage"
            flat
            round
            color="grey-2"
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
    </q-bar>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const lastPage = computed(() => {
  return Math.ceil(props.meta.total / props.meta.per_page)
})
const props = defineProps({
  meta: {
    type: Object,
    default: null
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['next', 'first', 'prev', 'last'])
</script>
