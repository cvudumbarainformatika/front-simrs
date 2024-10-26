<template>
  <template v-if="store.hasilmapsLevel6.length">
    <q-card-section class="full-width">
      <div class="row">
        <div class="full-width">
          <q-markup-table
            flat-bordered
            wrap-cells
            :separator="separator"
          >
            <thead>
              <tr class="bg-dark text-white max-width">
                <th>TANGGAL</th>
                <th>NO. BUKTI</th>
                <th style="width: 40%;">
                  URAIAN
                </th>
                <th>DEBIT</th>
                <th>KREDIT</th>
                <th>SALDO</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="it in store.hasilmapsLevel6" :key="it">
                <td>{{ it.tanggal }}</td>
                <td>{{ it.notrans }}</td>
                <td>{{ it.keterangan }} > {{ it.kegiatan }} </td>
                <td class="text-right">
                  Rp. {{ formattanpaRp(it.debit) }}
                </td>
                <td class="text-right">
                  Rp. {{ formattanpaRp(it.kredit) }}
                </td>
                <td class="text-right">
                  Rp. {{ formattanpaRp(it.total) }}
                </td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>
      </div>
    </q-card-section>
  </template>
</template>
<script setup>
// eslint-disable-next-line no-unused-vars
import { formattanpaRp } from 'src/modules/formatter'
import { useBukubesarStore } from 'src/stores/siasik/akuntansi/bukubesar/bukubesar'
import { ref } from 'vue'

const store = useBukubesarStore()
const separator = ref('cell')
</script>
