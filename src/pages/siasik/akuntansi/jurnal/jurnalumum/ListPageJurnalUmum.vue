<template>
  <div class="q-pa-md full-width" v-if="store.loading === true">
    <q-card>
      <q-item>
        <q-item-section avatar>
          <q-skeleton type="QAvatar" />
        </q-item-section>

        <q-item-section>
          <q-item-label>
            <q-skeleton type="text" />
          </q-item-label>
          <q-item-label caption>
            <q-skeleton type="text" />
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-skeleton height="200px" square />

      <q-card-actions align="right" class="q-gutter-md">
        <q-skeleton type="QBtn" />
        <q-skeleton type="QBtn" />
      </q-card-actions>
    </q-card>
  </div>
  <div class="q-pa-md full-width" v-else>
    <q-markup-table
      flat bordered
      :separator="separator"
    >
      <thead>
        <tr class="bg-primary text-white max-width">
          <th>NO. BUKTI</th>
          <th>TANGGAL</th>
          <th>KETERANGAN</th>
          <th>KODE AKUN</th>
          <th>NAMA AKUN</th>
          <th>DEBET</th>
          <th>KREDIT</th>
        </tr>
      </thead>
      <tbody v-if="store.items == ''">
        <tr>
          <td colspan="7" class="text-center">
            Belum Ada Data Diambil
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr
          v-for="(item , n) in store.items"
          :key="n"
          class="list-move"
        >
          <td class="text-left text-weight-bold">
            <span v-if="item.verif === ''"><q-btn
              dense
              round
              style="padding: 1px;"
              color="indigo"
              class="q"
              icon="icon-mat-edit"
              @click="store.editForm(item)"
            /></span> {{ item?.nobukti }}
          </td>
          <td class="text-center">
            {{ dateFullFormat(item?.tanggal) }}
          </td>
          <td class="text-center">
            <div style="width: 100px; white-space: normal !important;">
              {{ item?.keterangan }}
            </div>
          </td>
          <td class="text-center text-weight-bold">
            <div
              v-for="(rincian , r) in item?.rincianjurnalumum"
              :key="r"
            >
              <span>{{ rincian?.kodepsap13 }}</span>
            </div>
          </td>
          <td class="text-left text-weight-bold">
            <div
              v-for="(rinciannmakun , rn) in item?.rincianjurnalumum"
              :key="rn"
              style="width: 500px; white-space: normal !important;"
            >
              <span style="overflow-wrap: normal;">{{ rinciannmakun?.uraianpsap13 }}</span>
            </div>
          </td>
          <td class="text-right">
            <div
              v-for="(rinciannmakun , rn) in item?.rincianjurnalumum"
              :key="rn"
            >
              <div v-if="rinciannmakun?.debet !== '0.00'">
                <span><q-badge color="red-5">
                  {{ formatRpDouble(rinciannmakun?.debet,2) }}
                </q-badge></span>
              </div>
              <div v-else>
                <span>&nbsp;</span>
              </div>
            </div>
          </td>
          <td class="text-right">
            <div
              v-for="(rinciannmakun , rn) in item?.rincianjurnalumum"
              :key="rn"
            >
              <div v-if="rinciannmakun?.kredit !== '0.00'">
                <span><q-badge color="teal">
                  {{ formatRpDouble(rinciannmakun?.kredit,2) }}
                </q-badge></span>
              </div>
              <div v-else>
                <span>&nbsp;</span>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="5" class="text-right text-weight-bold">
            SUBTOTAL
          </td>
          <td class="text-right text-weight-bold">
            <span><q-badge color="red-5">
              {{ formatRpDouble(store?.totald,2) }}
            </q-badge></span>
          </td>
          <td class="text-right text-weight-bold">
            <span><q-badge color="teal">
              {{ formatRpDouble(store?.totalk,2) }}
            </q-badge></span>
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>
<script setup>
import { dateFullFormat, formatRpDouble } from 'src/modules/formatter'
import { usejurnalumummanual } from 'src/stores/siasik/akuntansi/jurnal/umummanual'
import { ref } from 'vue'
// import FormJurnalUmum from './FormJurnalUmum.vue'

const store = usejurnalumummanual()
const separator = ref('cell')

</script>
