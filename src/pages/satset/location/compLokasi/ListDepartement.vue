<template>
  <q-list
    bordered
    padding
    separator
  >
    <q-item
      v-for="(item, i) in itemFilterred"
      :key="i"
    >
      <q-item-section avatar>
        <q-icon
          color="primary"
          name="icon-mat-display_settings"
        />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ item?.nama }}</q-item-label>
        <q-item-label caption>
          {{ item?.gruper }}
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
            @click="()=> {
              org.setItem(item)
              store.departement = item
              org.dialogRuangan = true
            }"
          />
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup>

import { useLocationSatsetStore } from 'src/stores/satset/location'
import { useOrganisasiStore } from 'src/stores/satset/organisasi'
import { computed } from 'vue'
// import { ref } from 'vue'

const store = useLocationSatsetStore()
const org = useOrganisasiStore()

const itemFilterred = computed(() => {
  const arr = [...org.items]

  if (org.search.length > 0) {
    return arr.filter(i => i?.nama?.toLowerCase().indexOf(org.search.toLowerCase()) > -1 || i?.gruper?.toLowerCase().indexOf(org.search.toLowerCase()) > -1)
  }

  return arr
})
</script>
