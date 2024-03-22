<template>
  <div class="bg-white full-height column">
    <q-bar class="col-auto bg-teal text-white">
      <div class="q-py-sm f-14 ">
        List Nomor Resep
      </div>
      <q-space />
      <div class="q-py-xs">
        <q-select
          v-model="store.noresep"
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
    <template v-if="store?.indexRacikan>=0 && store?.pasien?.newapotekrajal">
      <div
        v-if="parseInt(store?.pasien?.newapotekrajal[store?.indexRacikan]?.flag)>=1"
        class=""
      >
        <div class="q-my-md q-ml-md">
          <q-chip
            square
            class="f-10"
            :color="color(store?.pasien?.newapotekrajal[store.indexRacikan]?.flag)"
            text-color="white"
          >
            {{ status(store?.pasien?.newapotekrajal[store.indexRacikan]?.flag) }}
          </q-chip>
          <!-- {{ store?.pasien?.newapotekrajal[store.indexRacikan]?.flag }} -->
        </div>
        <!-- {{ store?.pasien?.newapotekrajal[store.indexRacikan]?.permintaanresep?.length }} -->
        <template v-if="store?.pasien?.newapotekrajal[store.indexRacikan]?.permintaanresep?.length">
          <q-item
            v-for="(item, i) in store?.pasien?.newapotekrajal[store.indexRacikan]?.permintaanresep"
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
        <template v-if="store?.pasien?.newapotekrajal[store.indexRacikan]?.listRacikan?.length">
          <!-- <template v-if="store?.listRacikan?.length"> -->
          <!-- v-for="(item, i) in store?.listRacikan" -->
          <q-expansion-item
            v-for="(item, i) in store?.pasien?.newapotekrajal[store.indexRacikan]?.listRacikan"
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
        v-if="store?.pasien?.newapotekrajal[store.indexRacikan]?.flag===''"
        class=""
      >
        <app-no-data text="Belum ada Resep terkirim ke depo" />
      </div>
    </template>
  </div>
</template>

<script setup>
import { formatDouble } from 'src/modules/formatter'
// import { laravelEcho } from 'src/modules/newsockets'
import { usePermintaanEResepStore } from 'src/stores/simrs/farmasi/permintaanresep/eresep'

import { onMounted } from 'vue'
const store = usePermintaanEResepStore()
function status(val) {
  let balik = ' Belum ada status'
  switch (val) {
    case '':
      balik = ' draft'
      break
    case '1':
      balik = 'Dikirim Ke Depo'
      break
    case '2':
      balik = 'Sedang dikerjakan'
      break
    case '3':
      balik = 'Selesai'
      break

    default:
      break
  }
  return balik
}
function color(val) {
  let balik = 'grey'
  switch (val) {
    case '':
      balik = 'grey'
      break
    case '1':
      balik = 'grey'
      break
    case '2':
      balik = 'primary'
      break
    case '3':
      balik = 'green'
      break

    default:
      break
  }
  return balik
}
// function subscribedChannel() {
//   const channel = laravelEcho.private('private.notif.depo-farmasi')
//   channel.subscribed(() => {
//     console.log('subscribed private.notif.depo-farmasi channel !!!')
//   }).listen('.notif-message', (e) => {
//     console.log('listen notif', e)
//   })
// }
onMounted(() => {
  // subscribedChannel()
})
</script>
