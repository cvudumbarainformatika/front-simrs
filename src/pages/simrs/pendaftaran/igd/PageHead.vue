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
          :outline="path !== '/pendaftaran/igd/form'"
          glossy
          size="md"
          color="primary"
          label="Pasien Baru"
          @click="goTo('/pendaftaran/igd/form')"
        />
        <q-btn
          :outline="path!=='/pendaftaran/igd/kunjungan'"
          glossy
          push
          color="teal"
          label="List Pengunjung"
          size="md"
          @click="goTo('/pendaftaran/igd/kunjungan')"
        />
        <q-btn
          :outline="path!=='/pendaftaran/bpjs/pasien'"
          glossy
          push
          color="deep-orange"
          label="Master  Pasien"
          size="md"
          @click="goTo('/pendaftaran/igd/pasien')"
        />
        <!-- <q-btn
          :outline="path!=='/pendaftaran/bpjs/listmjkn'"
          glossy
          push
          color="accent"
          label="List mJKN"
          size="md"
          @click="goTo('/pendaftaran/bpjs/listmjkn')"
        /> -->
        <!-- <q-btn
          :outline="path!=='/pendaftaran/bpjs/konsulan'"
          glossy
          push
          color="cyan"
          label="List konsulan"
          size="md"
          @click="goTo('/pendaftaran/bpjs/konsulan')"
        /> -->
        <!-- <q-btn
          :outline="path!=='/pendaftaran/bpjs/listsharing'"
          glossy
          push
          color="indigo"
          label="List Sharing"
          size="md"
          @click="goTo('/pendaftaran/bpjs/listsharing')"
        /> -->
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
  console.log('sasa', val)
  router.push({ path: val, replace: true })
}

</script>
