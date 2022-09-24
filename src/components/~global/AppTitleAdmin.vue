<template>
  <div class="row items-center justify-between title-page q-mb-md">
    <div class="flex items-center">
      <div class="icon q-mr-md">
        <q-icon
          name="icon-mat-dvr"
          size="lg"
        />
      </div>
      <div class="left">
        <div class="text-h6">
          {{ title }}
        </div>
        <div class="f-12">
          <span>{{ subtitle }}</span>
        </div>
      </div>
    </div>
    <!-- <div>
      <q-btn
        v-if="route.params.id"
        round
        elevated
        color="primary"
        icon="arrow_back"
        size="sm"
        @click="prev"
      >
        <q-tooltip>
          {{ tooltipPrev }}
        </q-tooltip>
      </q-btn>
      <q-btn
        v-else
        round
        elevated
        color="primary"
        icon="icon-mat-add"
        size="sm"
        :to="router.replace({path:to})"
      >
        <q-tooltip>
          {{ tooltipAdd }}
        </q-tooltip>
      </q-btn>
    </div> -->
  </div>
</template>

<script setup>
// import { useRoute, useRouter } from 'vue-router'

// const emits = defineEmits('prev')
defineProps({
  title: {
    type: String,
    default: 'Title'
  },
  subtitle: {
    type: String,
    default: 'Subtitle'
  },
  tooltipAdd: {
    type: String,
    default: 'Tambah Data'
  },
  tooltipPrev: {
    type: String,
    default: 'Kembali'
  },
  to: {
    type: String,
    default: ''
  }
})

// const router = useRouter()
// const route = useRoute()

// function prev() {
//   router.go(-1)
// }
</script>
