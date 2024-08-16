<template>
  <q-list
    bordered
    padding
    separator
  >
    <q-item
      v-for="(item, i) in items"
      :key="i"
    >
      <q-item-section avatar>
        <q-icon
          color="primary"
          name="icon-mat-display_settings"
        />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ item.nama }}</q-item-label>
        <q-item-label caption>
          {{ item.desc }}
        </q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-item-label caption>
          <q-btn
            label="connect"
            flat
            dense
            class="q-px-md"
            size="md"
            color="primary"
            @click="store.setItem(item)"
          />
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup>
import { useLocationSatsetStore } from 'src/stores/satset/location'
import { ref } from 'vue'

const store = useLocationSatsetStore()

const items = ref([
  { nama: 'Ruangan Polikliknik', desc: 'Instalasi Rawat Jalan', content: 'poli', comp: 'PagePoli' },
  { nama: 'Ruangan Rawat Inap', desc: 'Instalasi Rawat Inap', content: 'ranap', comp: 'PageRanapDua' },
  { nama: 'Ruangan Laboratorium', desc: 'Laboratorium', content: 'laborat', comp: 'PageLaborat' },
  { nama: 'Ruangan Radiologi', desc: 'Radiologi', content: 'radiologi', comp: 'PageRadiologi' },
  { nama: 'Ruangan Farmasi', desc: 'Farmasi', content: 'farmasi', comp: 'PageFarmasi' }
])
</script>
