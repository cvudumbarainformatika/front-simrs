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
        <!-- <q-btn
          outline
          glossy
          color="pink"
          label="Antrian"
          icon-right="icon-mat-volume_up"
          size="md"
          @click="emits('togleDraw')"
        /> -->
        <q-btn
          :outline="path!=='/pendaftaran/homecare/pasien'"
          glossy
          push
          color="deep-orange"
          label="Master  Pasien"
          size="md"
          @click="goTo('/pendaftaran/homecare/pasien')"
        />
        <q-btn
          :outline="path!=='/pendaftaran/homecare/kunjungan'"
          glossy
          push
          color="teal"
          label="List Pengunjung"
          size="md"
          @click="goTo('/pendaftaran/homecare/kunjungan')"
        />
        <q-btn
          :outline="path !== '/pendaftaran/homecare/form'"
          glossy
          size="md"
          color="primary"
          label="From Pendaftaran"
          @click="goTo('/pendaftaran/homecare/form')"
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
