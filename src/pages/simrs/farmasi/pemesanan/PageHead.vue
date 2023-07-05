<template>
  <div class="row items-center justify-between title-page q-mb-md">
    <div class="flex items-center">
      <div class="icon q-mr-md">
        <q-icon
          name="icon-mat-next_plan"
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

    <div class="row items-center">
      <q-btn-group outline>
        <q-btn
          :outline="path!=='/pendaftaran/umum/pasien'"
          glossy
          push
          color="deep-orange"
          label="Rencana Pemesanan"
          size="md"
          @click="goTo('/pendaftaran/umum/pasien')"
        />
        <q-btn
          :outline="path!=='/pendaftaran/umum/kunjungan'"
          glossy
          push
          color="green"
          label="Pemesanan"
          size="md"
          @click="goTo('/pendaftaran/umum/kunjungan')"
        />
      </q-btn-group>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// const emits = defineEmits(['togleDraw'])
defineProps({
  title: {
    type: String,
    default: null
  },
  subtitle: {
    type: String,
    default: null
  },
  path: {
    type: String,
    default: null
  }
})

function goTo(val) {
  router.push({ path: val, replace: true })
}

</script>
