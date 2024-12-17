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
          :outline="path!=='/laporan/akuntansi/bukubesar'"
          glossy
          size="md"
          color="primary"
          label="BUKU BESAR"
          @click="goTo('/laporan/akuntansi/bukubesar')"
        />
        <q-btn
          :outline="path!=='/laporan/akuntansi/lra'"
          glossy
          size="md"
          color="primary"
          label="LRA"
          @click="goTo('/laporan/akuntansi/lra')"
        />
        <q-btn
          :outline="path!=='/laporan/akuntansi/lo'"
          glossy
          size="md"
          color="primary"
          label="LO"
          @click="goTo('/laporan/akuntansi/lo')"
        />
        <q-btn
          :outline="path!=='/laporan/akuntansi/lpsal'"
          glossy
          size="md"
          color="primary"
          label="LPSAL"
          @click="goTo('/laporan/akuntansi/lpsal')"
        />
        <q-btn
          :outline="path!=='/laporan/akuntansi/lpe'"
          glossy
          size="md"
          color="primary"
          label="LPE"
          @click="goTo('/laporan/akuntansi/lpe')"
        />
        <q-btn
          :outline="path!=='/laporan/akuntansi/neraca'"
          glossy
          size="md"
          color="primary"
          label="Neraca"
          @click="goTo('/laporan/akuntansi/neraca')"
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
