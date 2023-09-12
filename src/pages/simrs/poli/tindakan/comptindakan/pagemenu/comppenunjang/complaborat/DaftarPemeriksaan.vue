<template>
  <div class="column full-height">
    <q-bar class="col-auto bg-dark text-white">
      <div class="q-py-sm f-14 ">
        Daftar Pemeriksaan Laborat
      </div>
    </q-bar>
    <div class="col-grow">
      <div class="q-pa-md">
        <q-input
          v-model="store.caripemeriksaanlab"
          label="Cari Pemeriksaan"
          dense
          outlined
          standout="bg-yellow-3"
          hide-bottom-space
        >
          <template #append>
            <q-icon name="icon-mat-search" />
          </template>
        </q-input>
      </div>
      <q-separator />
      <q-scroll-area
        v-if="filterDetails.length > 0"
        style="height: calc(100% - 68px);"
        class="bg-grey"
      >
        <q-list
          v-if="!store.loadingMasterLab"
          bordered
          dense
          separator
        >
          <q-item
            v-for="(item, i) in filterDetails"
            :key="i"
            class="bg-white"
            style="margin-bottom: 2px;"
          >
            <q-item-section class="q-py-sm">
              <q-item-label>{{ item.name }}</q-item-label>
              <q-item-label
                lines="1"
              >
                <span class="text-weight-bold">Rp. {{ formatRp(item?.value[0]?.biayapolispesialis) }}</span>
              </q-item-label>
            </q-item-section>
            <q-item-section
              side
            >
              <q-item-label :class="item?.value[0]?.jenis==='PAKET'?'text-primary':'text-negative'">
                <!-- {{ item?.value[0]?.biayapolispesialis }} -->
                <span class="text-weight-bold">{{ item?.value[0]?.jenis }}</span>
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
      <div
        v-else
        class="column full-height flex-center"
      >
        Data Tidak Ada
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatRp } from 'src/modules/formatter'
import { usePenunjangPoli } from 'src/stores/simrs/pelayanan/poli/penunjang'
import { computed } from 'vue'

const store = usePenunjangPoli()

const filterDetails = computed(() => {
  const c = store.masterlaborat
  return c
})

// console.log(filterDetails)
</script>
