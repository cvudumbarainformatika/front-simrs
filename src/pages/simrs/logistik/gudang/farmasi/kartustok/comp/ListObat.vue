<template>
  <q-list
    dense
    separator
  >
    <q-item
      v-for="(item, i) in store.items"
      :key="i"
    >
      <q-item-section style="width:40%">
        {{ item?.nama_obat }}
      </q-item-section>
      <q-item-section
        style="width:60%"
        side
      >
        <div class="row items-center full-width q-col-gutter-xs">
          <div class="col-3 text-right">
            Saldo Awal
          </div>
          <div class="col-3 text-right">
            Trans In
          </div>
          <div class="col-3 text-right">
            Trans Out
          </div>
          <div class="col-3 text-right">
            Saldo Akhir
          </div>
        </div>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup>
import { useKartuStokFarmasiStore } from '../../../../../../../stores/simrs/farmasi/katustok'

const store = useKartuStokFarmasiStore()
</script>
