<template>
  <div class="column">
    <div class="row justify-between items-center q-pa-sm bg-primary text-white">
      <div class="kiri row q-gutter-sm">
        <q-input
          v-model="store.params.q"
          outlined
          dark
          color="white"
          dense
          placeholder="Cari Departement / Bagian"
          debounce="500"
          style="min-width: 250px;"
        >
          <template
            v-if="store.params.q"
            #append
          >
            <q-icon
              name="icon-mat-close"
              size="xs"
              class="cursor-pointer"
              @click.stop.prevent="store.params.q = ''"
            />
          </template>
          <template #prepend>
            <q-icon
              size="sm"
              name="icon-mat-search"
            />
          </template>
        </q-input>
      </div>
      <div class="kanan">
        <q-btn
          icon="icon-mat-add"
          flat
          color="light"
          round
          size="sm"
          @click="store.dialogTambah = !store.dialogTambah"
        >
          <q-tooltip>Tambah Data</q-tooltip>
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useOrganisasiStore } from 'src/stores/satset/organisasi'
const store = useOrganisasiStore()
</script>
