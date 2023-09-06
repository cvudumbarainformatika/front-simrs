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
          :outline="path !== '/farmasi/penerimaan/penerimaan'"
          glossy
          push
          color="deep-orange"
          label="Penerimaan"
          size="md"
          @click="goTo('/farmasi/penerimaan/penerimaan')"
        />
        <q-btn
          :outline="path !== '/farmasi/penerimaan/penerimaanlangsung'"
          glossy
          push
          color="cyan"
          label="Penerimaan Langsung"
          size="md"
          @click="goTo('/farmasi/penerimaan/penerimaanlangsung')"
        />
        <q-btn
          :outline="path !== '/farmasi/penerimaan/listpenerimaan'"
          glossy
          push
          color="green"
          label="List Penerimaan"
          size="md"
          @click="goTo('/farmasi/penerimaan/listpenerimaan')"
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
