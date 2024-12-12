<template>
  <div class="row items-center justify-between title-page q-mb-md">
    <div class="flex items-center">
      <!-- <div class="q-mr-md">
        <div class="f-16 text-weight-bold">
          Laporan AKUNTANSI
        </div>
      </div> -->
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
          :outline="path!=='/laporan/anggaran/rka'"
          glossy
          size="md"
          color="lime-7"
          label="RKA"
          @click="goTo('/laporan/anggaran/rka')"
        />
        <q-btn
          :outline="path!=='/laporan/anggaran/rba'"
          glossy
          size="md"
          color="primary"
          label="RBA"
          @click="goTo('/laporan/anggaran/rba')"
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

function goTo (val) {
  console.log('sasa', val)
  router.push({ path: val, replace: true })
}

</script>
