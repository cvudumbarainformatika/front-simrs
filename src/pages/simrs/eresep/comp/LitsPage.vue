<template>
  <div class="bg-white full-height column">
    <div
      v-if="store?.pasien?.newapotekrajal?.flag==='1'"
      class=""
    >
      <div class="text-weight-bold text-orange q-my-md q-ml-md">
        resep nomor : {{ store?.pasien?.newapotekrajal?.noresep }}
      </div>
      <!-- {{ store?.pasien?.newapotekrajal?.permintaanresep?.length }} -->
      <template v-if="store?.pasien?.newapotekrajal?.permintaanresep?.length">
        <q-item
          v-for="(item, i) in store?.pasien?.newapotekrajal?.permintaanresep"
          :key="i"
          class="q-pl-sm"
        >
          <!-- {{ item }} -->
          <q-item-section style="width: 30%;">
            <div class="row">
              {{ item?.mobat?.nama_obat }}
            </div>
            <div class="row text-italic f-10">
              {{ item?.kdobat }}
            </div>
          </q-item-section>
          <q-item-section
            side
            style="width:70%"
          >
            <div class="row items-center q-col-gutter-sm full-width">
              <div
                class="text-right col-2"
              >
                {{ item?.jumlah }}
              </div>
              <div
                class="col-2 text-right"
              >
                {{ item?.aturan }}
              </div>
              <div
                class="col-5 text-right"
              >
                {{ formatDouble(item?.harga) }}
              </div>
              <div
                class="col text-right"
              >
                {{ item?.keterangan }}
              </div>
            </div>
          </q-item-section>
        </q-item>
      </template>
      <!-- {{ store.listRacikan }} -->
      <template v-if="store?.pasien?.newapotekrajal?.listRacikan?.length">
        <!-- <template v-if="store?.listRacikan?.length"> -->
        <!-- v-for="(item, i) in store?.listRacikan" -->
        <q-expansion-item
          v-for="(item, i) in store?.pasien?.newapotekrajal?.listRacikan"
          :key="i"
          dense
          dense-toggle
          class="q-pl-none"
        >
          <template #header>
            <q-item-section
              style="width: 30%;"
            >
              <div class="row">
                {{ item?.namaracikan }}
              </div>
            </q-item-section>
            <q-item-section
              side
              style="width:70%"
            >
              <div class="row items-center q-col-gutter-sm full-width">
                <div
                  class="text-right col-2"
                >
                  {{ item?.tiperacikan }}
                </div>
                <div
                  class="text-right col-2"
                >
                  {{ item?.jumlahracikan }}
                </div>
                <div
                  class="col-2 text-right"
                >
                  {{ item?.aturan }}
                </div>
                <div
                  class="col-3 text-right"
                >
                  {{ formatDouble(item?.harga) }}
                </div>
                <div
                  class="col text-right"
                >
                  {{ item?.keterangan }}
                </div>
              </div>
            </q-item-section>
          </template>

          <q-item
            v-for="(obat, j) in item?.rincian"
            :key="j"
          >
            <!-- {{ j }} {{ obat }} -->
            <q-item-section style="width: 50%;">
              <div class="row">
                {{ obat?.mobat?.nama_obat }}
              </div>
              <div class="row text-italic f-10">
                {{ obat?.kdobat }}
              </div>
            </q-item-section>
            <q-item-section
              side
              style="width:50%"
            >
              <div class="row items-center q-col-gutter-sm full-width">
                <div
                  class="text-right col-2"
                >
                  {{ obat?.jumlah }}
                </div>

                <div
                  class="col text-right"
                >
                  {{ obat?.keteranganx }}
                </div>
              </div>
            </q-item-section>
          </q-item>
        </q-expansion-item>
      </template>
    </div>
    <div
      v-if="store?.pasien?.newapotekrajal?.flag===''"
      class=""
    >
      <app-no-data text="Belum ada Resep terkirim ke depo" />
    </div>
  </div>
</template>

<script setup>
import { formatDouble } from 'src/modules/formatter'
import { usePermintaanEResepStore } from 'src/stores/simrs/farmasi/permintaanresep/eresep'

// import { ref } from 'vue'
const store = usePermintaanEResepStore()
</script>
