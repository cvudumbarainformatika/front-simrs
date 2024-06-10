<template>
  <div class="bg-white full-height column">
    <q-bar class="col-auto bg-teal text-white">
      <div class="q-py-sm f-14 ">
        List Nomor Resep
      </div>
      <q-space />
      <div class="q-py-xs">
        <q-select
          :key="store.noreseps"
          v-model="store.noresep"
          label="List nomor resep"
          outlined
          standout="bg-yellow-3"
          bg-color="white"
          dense
          :options="store.noreseps"
          :display-value="`${store.noresep === null || store.noresep === '' || store.noresep === 'BARU' ? 'BARU' : store.noresep}`"
          style="min-width: 200px;"
          @update:model-value="store.setResep"
        />
      </div>
    </q-bar>
  </div>
  <div>
    <app-no-data v-if="!store.sudahs?.length" />
  </div>
  <div
    v-if="store?.filteredSudahs?.length"
    class="q-mt-xs"
  >
    <div
      v-for="(item,i) in store?.filteredSudahs"
      :key="i"
    >
      <div class="row items-center q-pb-xs garis-bawah">
        <div
          class="col-auto q-mr-xs"
          style="width:2%"
        >
          {{ i+1 }}
        </div>
        <div
          class="col-auto q-mr-xs"
          style="width:63%"
        >
          <div class="row">
            {{ item?.nama_obat }}
          </div>
          <div class="row f-10 text-italic">
            {{ item?.kd_obat }}
          </div>
          <div class="row f-8 text-italic">
            {{ item?.nopermintaan }}
          </div>
        </div>
        <div
          class="col-shrink q-mr-xs"
          style="width:20%"
        >
          <div class="row items-center">
            <div class="col-auto q-mr-xs">
              {{ item?.jumlah_resep }}
            </div>
            <div class="col-auto text-italic f-10">
              ({{ item?.satuan_k }})
            </div>
          </div>
        </div>
        <!-- <div
          class="col-shrink q-mr-xs"
          style="width:10%"
        >
          <q-btn
            v-if="parseInt(item?.flag) <= 3"
            dense
            icon="icon-mat-delete_sweep"
            round
            color="negative"
            flat
            size="sm"
            :loading="item?.loading && store?.loadingHapus"
            :disable="item?.loading && store?.loadingHapus"
            @click="store.hapusObat(item)"
          >
            <q-tooltip
              class="primary"
              :offset="[10, 10]"
            >
              Batalkan resep untuk obat ini
            </q-tooltip>
          </q-btn>
        </div> -->
      </div>
    </div>
  </div>
  <!-- {{ store.sudahs }} -->
</template>
<script setup>

import { useResepPermintaanOperasiStore } from 'src/stores/simrs/farmasi/permintaanresep/permintaanoperasi'

// eslint-disable-next-line no-unused-vars
const store = useResepPermintaanOperasiStore()
</script>
<style lang="scss" scoped>
.garis-bawah{
  border-bottom: 1px solid black;
}
</style>
