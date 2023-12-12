<template>
  <div class="row justify-between items-center q-pa-sm">
    <div class="row items-center">
      <div>
        <q-input
          placeholder="Cari Pasien ..."
          dense
          outlined
          dark
          color="white"
          style="min-width:200px"
        >
          <template #prepend>
            <q-icon name="icon-mat-search" />
          </template>
        </q-input>
      </div>
      <q-select
        v-model="store.periode"
        dense
        outlined
        dark
        color="white"
        :options="store.periods"
        label="Periode"
        class="q-ml-sm"
        emit-value
        map-options
        style="min-width: 150px;"
      />
      <q-select
        v-model="store.params.status"
        dense
        outlined
        dark
        color="white"
        :options="store.statuses"
        label="Status"
        class="q-ml-sm"
        emit-value
        map-options
        style="min-width: 150px;"
        @update:model-value="store.getData()"
      />
      <q-select
        v-model="store.ruangan"
        dense
        outlined
        dark
        color="white"
        :options="store.ruangans"
        label="Ruangan"
        class="q-ml-sm"
        emit-value
        map-options
        option-value="groups"
        option-label="groups_nama"
        style="min-width: 150px;"
        @update:model-value="store.gantiRuangan"
      />
    </div>
    <!-- <div>Ranap</div> -->
  </div>
</template>

<script setup>
import { usePengunjungRanapStore } from 'src/stores/simrs/ranap/pengunjung'
import { onMounted } from 'vue'
const store = usePengunjungRanapStore()

onMounted(() => {
  store.getRuangan().then(() => store.getData())
})
</script>
