<template>
  <template v-if="store.hasilmaps.length">
    <q-card-section class="full-width">
      <div class="row">
        <div class="full-width">
          <q-markup-table
            flat bordered
            wrap-cells
            :separator="separator"
          >
            <thead>
              <tr class="bg-dark text-white max-width">
                <th>TANGGAL</th>
                <th>NO. TRANSAKSI</th>
                <th>KETERANGAN</th>
                <th>KEGIATAN</th>
                <th>NILAI</th>
                <th>AKSI</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="it in store.hasilmaps" :key="it">
                <td> {{ it.tanggal }} </td>
                <td> {{ it.notrans }} </td>
                <td> {{ it.keterangan }} </td>
                <td> {{ it.kegiatan }} </td>
                <td class="text-right">
                  {{ formattanpaRp(it.nilai) }}
                </td>
                <td class="text-center">
                  <q-btn
                    dense
                    round
                    size="sm"
                    color="light-green-8"
                    class="q"
                    icon="icon-mat-search"
                    @click="store.openRinci(it)"
                  >
                    <q-tooltip
                      transition-show="scale"
                      transition-hide="scale"
                      class="bg-teal"
                      anchor="center right"
                      self="center left"
                      :offset="[10, 10]"
                    >
                      Lihat Rincian
                    </q-tooltip>
                  </q-btn>
                </td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>
      </div>
    </q-card-section>
  </template>
  <template v-else>
    <div class="row q-pa-md full-width text-subtitle1 flex-center">
      <q-icon class="q-pr-sm" size="sm" name="icon-mat-warning" />
      Silahkan Pilih Parameter Dulu
    </div>
  </template>
  <dialog-rincijurnal
    v-model="store.dialogJurnal"
  />
</template>
<script setup>
import { formattanpaRp } from 'src/modules/formatter'
import { postingJurnal } from 'src/stores/siasik/akuntansi/jurnal/postingjurnal'
import { defineAsyncComponent, ref } from 'vue'

const DialogRincijurnal = defineAsyncComponent(() => import('./DialogRinciJurnal.vue'))

const store = postingJurnal()

const separator = ref('cell')
</script>
