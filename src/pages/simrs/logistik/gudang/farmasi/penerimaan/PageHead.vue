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

    <div class="row items-center bg-grey-3">
      <q-btn-group outline>
        <q-btn
          :outline="path !== '/gudang/farmasi/penerimaan/penerimaan'"
          glossy
          push
          color="deep-orange"
          label="List Pemesanan"
          size="md"
          @click="goTo('/gudang/farmasi/penerimaan/penerimaan')"
        />
        <q-btn
          :outline="path !== '/gudang/farmasi/penerimaan/pemfakturan'"
          glossy
          push
          color="orange"
          label="Pemfakturan"
          size="md"
          @click="goTo('/gudang/farmasi/penerimaan/pemfakturan')"
        />
        <q-btn
          :outline="path !== '/gudang/farmasi/penerimaan/penerimaanlangsung'"
          glossy
          push
          color="cyan"
          label="Penerimaan Langsung"
          size="md"
          @click="goTo('/gudang/farmasi/penerimaan/penerimaanlangsung')"
        />
        <q-btn
          :outline="path !== '/gudang/farmasi/penerimaan/listpenerimaan'"
          glossy
          push
          color="green"
          label="List Penerimaan"
          size="md"
          @click="goTo('/gudang/farmasi/penerimaan/listpenerimaan')"
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
  router.push({ path: val, replace: true })
}

</script>
