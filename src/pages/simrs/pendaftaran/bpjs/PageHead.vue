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
          outline
          glossy
          color="pink"
          label="Antrian"
          icon-right="icon-mat-volume_up"
          size="md"
          @click="emits('togleDraw')"
        />
        <q-btn
          :outline="path!=='/pendaftaran/bpjs/pasien'"
          glossy
          push
          color="deep-orange"
          label="Master Pasien"
          size="md"
          @click="goTo('/pendaftaran/bpjs/pasien')"
        />
        <q-btn
          :outline="path!=='/pendaftaran/bpjs/kunjungan'"
          glossy
          push
          color="teal"
          label="List Pengunjung"
          size="md"
          @click="goTo('/pendaftaran/bpjs/kunjungan')"
        />
        <q-btn
          :outline="path!=='/pendaftaran/bpjs/listmjkn'"
          glossy
          push
          color="accent"
          label="List mJKN"
          size="md"
          @click="goTo('/pendaftaran/bpjs/listmjkn')"
        />
        <!-- <q-btn
          :outline="path!=='/pendaftaran/bpjs/konsulan'"
          glossy
          push
          color="cyan"
          label="List konsulan"
          size="md"
          @click="goTo('/pendaftaran/bpjs/konsulan')"
        /> -->
        <q-btn
          :outline="path!=='/pendaftaran/bpjs/listsharing'"
          glossy
          push
          color="indigo"
          label="List Sharing"
          size="md"
          @click="goTo('/pendaftaran/bpjs/listsharing')"
        />
        <q-btn
          :outline="path !== '/pendaftaran/bpjs/form'"
          glossy
          size="md"
          color="primary"
          label="Pasien Baru"
          @click="goTo('/pendaftaran/bpjs/form')"
        />
      </q-btn-group>
      <!-- <q-btn
        class="glossy q-mr-sm"
        round
        color="pink"
        icon="icon-mat-volume_up"
        size="sm"
        @click="emits('togleDraw')"
      >
        <q-tooltip
          anchor="bottom middle"
          self="top middle"
          :offset="[10, 10]"
        >
          <strong>Panggil</strong> <em>Antrian</em>
        </q-tooltip>
      </q-btn>
      <q-btn
        class="glossy q-mr-sm"
        round
        color="dark"
        icon="icon-mat-summarize"
        size="sm"
        @click="goTo('/pendaftaran/bpjs/pasien')"
      >
        <q-tooltip
          anchor="bottom middle"
          self="top middle"
          :offset="[10, 10]"
        >
          <strong>List</strong> <em>Data Pasien</em>
        </q-tooltip>
      </q-btn>
      <q-btn
        class="glossy q-mr-sm"
        size="sm"
        round
        color="primary"
        icon="icon-mat-supervisor_account"
        @click="goTo('/pendaftaran/bpjs/form')"
      >
        <q-tooltip
          anchor="bottom middle"
          self="top middle"
          :offset="[10, 10]"
        >
          <strong>Tambah</strong> <em>Pasien Baru</em>
        </q-tooltip>
      </q-btn> -->
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const emits = defineEmits(['togleDraw'])
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
