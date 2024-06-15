<template>
  <div class="bg-white full-height" style="width: 100%;">
    <div class="col-grow bg-teal text-white q-pa-sm">
      <q-bar class=" bg-teal text-white">
        <div class="q-ma-sm f-14 ">
          List Nomor Permintaan Obat Persiapan Operasi
        </div>
        <q-space />
        <div class="q-my-sm">
          <q-select
            v-model="store.nopermintaan"
            outlined
            standout="bg-yellow-3"
            bg-color="white"
            dense
            :options="store.nopermintaans"
            :display-value="`${store.nopermintaan === null || store.nopermintaan === '' || store.nopermintaan === 'BARU' ? 'BARU' : store.nopermintaan}`"
            style="min-width: 200px;"
            @update:model-value="store.setResep"
          />
        </div>
      </q-bar>
    </div>

    <div
      class="col-12"
    >
      <div
        v-if="store.listSudah "
        class="q-my-md q-ml-md"
      >
        <q-chip
          square
          class="f-10"
          :color="color(store.listSudah?.flag)"
          :text-color="store.listSudah?.flag==='2'?'':'white'"
        >
          {{ status(store.listSudah?.flag) }}
        </q-chip>
        <!-- {{ store?.pasien?.newapotekrajal[store.indexRacikan]?.flag }} -->
      </div>
      <!-- {{ store?.pasien?.newapotekrajal[store.indexRacikan]?.permintaanresep?.length }} -->
      <template v-if="store.listSudah?.rinci?.length">
        <q-list class="full-height scroll">
          <q-item
            v-for="(item, i) in store.listSudah?.rinci"
            :key="i"
            class="q-pl-sm row"
            bordered
          >
            <!-- {{ item }} -->
            <q-item-section style="width: 50%;">
              <div class="row">
                {{ item?.obat?.nama_obat }}
              </div>
              <div class="row text-italic f-10">
                {{ item?.kd_obat }}
              </div>
            </q-item-section>
            <q-item-section
              side
              style="width:50%"
            >
              <div class="row items-center q-col-gutter-sm full-width">
                <div
                  class="text-right col-5"
                >
                  {{ item?.jumlah_minta }}
                </div>

                <div
                  class="col text-right"
                >
                  <!-- {{ item?.keterangan }} -->
                </div>
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </template>
      <!-- {{ store.listRacikan }} -->
    </div>
    <div
      v-if="store?.listSudah?.flag===''"
      class=""
    >
      <app-no-data text="Belum ada Resep terkirim ke depo" />
    </div>
  </div>
</template>

<script setup>
// import { formatDouble } from 'src/modules/formatter'
import { usePersiapanOperasiStore } from 'src/stores/simrs/farmasi/kamaroperasi/resepsemntara'
// import { laravelEcho } from 'src/modules/newsockets'

import { onUnmounted } from 'vue'
const store = usePersiapanOperasiStore()
function status (val) {
  let balik = ' Belum ada status'
  switch (val) {
    case '':
      balik = ' draft'
      break
    case '1':
      balik = 'Dikirim Ke Depo'
      break
    case '2':
      balik = 'Sudah didistribusikan oleh depo'
      break
    case '3':
      balik = 'Sudah dibuatkan resep'
      break
    case '4':
      balik = 'Selesai'
      break

    default:
      break
  }
  return balik
}
function color (val) {
  let balik = 'grey'
  switch (val) {
    case '':
      balik = 'grey'
      break
    case '1':
      balik = 'grey'
      break
    case '2':
      balik = 'yellow'
      break
    case '3':
      balik = 'orange'
      break
    case '4':
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
onUnmounted(() => {
  store.nopermintaan = ''
  store.listSudah = null
  // subscribedChannel()
})
</script>
