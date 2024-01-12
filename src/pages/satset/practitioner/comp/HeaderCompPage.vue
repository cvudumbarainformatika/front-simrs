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
          placeholder="Cari Practitioner"
          debounce="500"
          style="min-width: 250px;"
          clearable
          @keyup.enter="enterSearch"
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
        <q-select
          v-model="store.params.status"
          dense
          outlined
          dark
          color="white"
          :options="options"
          style="width:200px;"
          @update:model-value="store.whereStatus"
        />
      </div>
      <div class="kanan">
        .
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePractitionerStore } from 'src/stores/satset/practitioner'
import { ref } from 'vue'

const store = usePractitionerStore()

const options = ref(['Semua', 'Terkoneksi', 'Belum Terkoneksi'])

function enterSearch(evt) {
  const val = evt?.target?.value
  store.searchData(val)
}
</script>
