<template>
  <div class="row items-center justify-between title-page q-mb-md">
    <div class="flex items-center">
      <div class="icon q-mr-md">
        <q-icon
          name="icon-mat-transfer_within_a_station"
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
    <div>
      <q-btn
        v-if="route.params.page==='' || !route.params.page"
        rounded
        elevated
        color="primary"
        icon="icon-mat-add"
        :label="labelAdd"
        size="sm"
        @click="goTo"
      >
        <q-tooltip>
          {{ tooltipAdd }}
        </q-tooltip>
      </q-btn>
      <q-btn
        v-else
        rounded
        elevated
        color="dark"
        icon="icon-mat-arrow_back"
        :label="labelBack"
        size="sm"
        @click="prev"
      >
        <q-tooltip>
          {{ tooltipPrev }}
        </q-tooltip>
      </q-btn>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'

// const emits = defineEmits('prev')
const props = defineProps({
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
  },
  params: {
    type: String,
    default: 'form'
  },
  labelAdd: {
    type: String,
    default: 'Data Baru'
  },
  labelBack: {
    type: String,
    default: 'Kembali Ke Table'
  }

})

const router = useRouter()
const route = useRoute()
console.log('apptitleadmin', route)

function prev () {
  router.replace({ path: props.to })
}

function goTo () {
  router.replace({ name: 'lab.permintaan-luar', params: { page: 'form' } })
}
</script>
