<template>
  <q-list separator bordered>
    <q-item
      clickable v-ripple v-for="(item, n) in store.ruanganRanaps"
      :key="n"
    >
      <q-item-section>
        <q-item-label>{{ item?.uraian }}</q-item-label>
        <q-item-label caption>
          Gedung {{ item?.gedung }} Lantai {{ item?.lantai }} Ruang {{ item?.ruang }}
        </q-item-label>
      </q-item-section>
      <q-item-section>
        <q-item-label>
          <em
            v-if="!item?.satset_uuid"
            class="text-negative"
          >Belum Terkoneksi Satu Sehat</em>
          <em
            v-else
            class="text-primary"
          >Terkoneksi Satu Sehat</em>
        </q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-btn
          icon="icon-mat-send"
          flat
          dense
          size="sm"
          round
          color="primary"
          @click="store.setRuangan(item,'ranap')"
        />
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup>
import { onMounted } from 'vue'
import { useLocationSatsetStore } from 'src/stores/satset/location'

const store = useLocationSatsetStore()
onMounted(() => {
  store.getRuanganRanap()
    .then(() => {
      store.dialogFormRuangan = false
    })
})

</script>
