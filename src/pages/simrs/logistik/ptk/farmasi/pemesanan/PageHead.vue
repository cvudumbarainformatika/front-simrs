<template>
  <div class="row items-center justify-between title-page q-mb-md">
    <div class="flex items-center">
      <div class="icon q-mr-md">
        <q-icon
          name="icon-mat-verified_user"
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
          :outline="path!=='/ptk/farmasi/pemesanan/pesanan'"
          glossy
          push
          color="deep-orange"
          label="Pemesanan"
          size="md"
          @click="goTo('/ptk/farmasi/pemesanan/pesanan')"
        />
        <q-btn
          :outline="path!=='/ptk/farmasi/pemesanan/listpesanan'"
          glossy
          push
          color="green"
          label="List Pemesanan"
          size="md"
          @click="goTo('/ptk/farmasi/pemesanan/listpesanan')"
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
