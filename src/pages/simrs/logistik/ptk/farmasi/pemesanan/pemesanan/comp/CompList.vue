<template>
  <div>
    <!-- {{ table.rencanas }} -->
    <div v-if="table.rencanas.length && !table.loadingList">
      <q-list
        bordered
        separator
      >
        <q-item
          v-for="(item,i) in table.rencanas"
          :key="i"
          v-ripple
          clickable
          @click="table.rencanaSelected(item?.no_rencbeliobat)"
        >
          <q-item-section>
            <div>
              {{ item?.no_rencbeliobat }}
            </div>
          </q-item-section>
          <q-item-section>
            <div class="text-primary">
              {{ item?.gudang?.nama }}
            </div>
          </q-item-section>
          <q-item-section>
            <div class="text-cyan">
              {{ dateFullFormat(item?.tglperencanaan) }}
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    <!-- {{ table.rencanas }} -->
    </div>
    <div v-if="table.loadingList">
      <app-loading />
    </div>
    <div v-if="!table.rencanas.length && !table.loadingList">
      <app-no-selected-page
        color="primary"
        icon="icon-mat-receipt_long"
        text="Tidak ada data"
      />
    </div>
  </div>
</template>
<script setup>
import { dateFullFormat } from 'src/modules/formatter'
import { useTabelPemesananObatStore } from 'src/stores/simrs/farmasi/pemesanan/tabelObat'

const table = useTabelPemesananObatStore()
</script>
