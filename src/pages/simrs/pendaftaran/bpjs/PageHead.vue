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
          BPJS || JKN
        </div>
        <div class="f-12">
          <span>Pasien Baru JKN / BPJS</span>
        </div>
      </div>
    </div>

    <div class="row items-center">
      <q-btn
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
      </q-btn>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const emits = defineEmits(['togleDraw'])

function goTo(val) {
  router.push({ path: val, replace: true })
}

</script>
