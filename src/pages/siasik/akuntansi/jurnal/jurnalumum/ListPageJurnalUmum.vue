<template>
  <div class="q-pa-md full-width">
    <q-markup-table
      flat bordered
      :separator="separator"
    >
      <thead>
        <tr class="bg-primary text-white max-width">
          <th>NO. BUKTI </th>
          <th>TANGGAL</th>
          <th>KETERANGAN</th>
          <th>KODE AKUN</th>
          <th>NAMA AKUN</th>
          <th>DEBET</th>
          <th>KREDIT</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item , n) in store.rincis"
          :key="n"
          class="list-move"
        >
          <td class="text-left text-weight-bold">
            {{ item?.nobukti }}
          </td>
          <td class="text-center">
            {{ dateFullFormat(item?.tanggal) }}
          </td>
          <td class="text-center">
            {{ item?.keterangan }}
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
            >
              <span>{{ rinciannmakun?.uraianpsap13 }}</span>
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
              {{ formatRpDouble(store?.totald) }}
            </q-badge></span>
          </td>
          <td class="text-right text-weight-bold">
            <span><q-badge color="teal">
              {{ formatRpDouble(store?.totalk) }}
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
