<template>
  <div class="row items-center justify-between title-page q-mb-md ">
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

    <div class="row items-center bg-grey-3">
      <q-btn-group outline>
        <q-btn
          :outline="path!=='/gudang/farmasi/rencanapemesanan/rencana'"
          glossy
          push
          color="deep-orange"
          label="Rencana Pemesanan"
          size="md"
          @click="goTo('/gudang/farmasi/rencanapemesanan/rencana')"
        />
        <q-btn
          :outline="path!=='/gudang/farmasi/rencanapemesanan/listrencanapesanan'"
          glossy
          push
          color="green"
          label="List Rencana Pemesanan"
          size="md"
          @click="goTo('/gudang/farmasi/rencanapemesanan/listrencanapesanan')"
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
