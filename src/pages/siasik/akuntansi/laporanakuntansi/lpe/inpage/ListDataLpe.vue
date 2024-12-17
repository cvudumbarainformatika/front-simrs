<template>
  <template v-if="store.ekuitasawal && store.surplusdefisit && store.hasilkoreksi.length > 0">
    <q-card-section class="full-width">
      <div class="row justify-center">
        <div class="full-width">
          <q-markup-table
            class="my-sticky-table width:90%"
            flat-bordered
            wrap-cells
            :separator="separator"
          >
            <thead>
              <tr class="bg-dark text-white max-width">
                <th>URAIAN</th>
                <th>NILAI (Rp.)</th>
              </tr>
            </thead>
            <tbody>
              <tr class="text-bold">
                <td>
                  {{ store.ekuitasawal.uraian }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(isNaN(store.ekuitasawal?.nilai) ? 0 : store.ekuitasawal?.nilai) }}
                </td>
              </tr>
              <tr>
                <td>
                  {{ store.surplusdefisit.uraian }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(isNaN(store.surplusdefisit?.nilai) ? 0 : store.surplusdefisit?.nilai) }}
                </td>
              </tr>
              <tr class="text-bold">
                <td>
                  Dampak Kumuatif Perubahan Kebijakan / Penyesuaian Ekuitas
                </td>
                <td class="text-right">
                  {{ formattanpaRp(totalKoreksi()) }}
                </td>
              </tr>
              <tr v-for="it in store.hasilkoreksi" :key="it">
                <td>
                  - {{ it.uraian }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(isNaN(it?.nilai) ? 0 : it?.nilai) }}
                </td>
              </tr>
              <tr>
                <td>
                  Sub Jumlah
                </td>
                <td class="text-right">
                  {{ formattanpaRp(totalKoreksi()) }}
                </td>
              </tr>
              <tr class="text-bold">
                <td>
                  Ekuitas Akhir
                </td>
                <td class="text-right">
                  {{ formattanpaRp(ekuitasAkhir()) }}
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
import { formattanpaRp } from 'src/modules/formatter'
import { useLPEStore } from 'src/stores/siasik/laporan/lpe/lpe'
import { ref } from 'vue'

const store = useLPEStore()
const separator = ref('cell')

function totalKoreksi () {
  const total = store.hasilkoreksi.map((x) => parseFloat(x.nilai)).reduce((a, b) => a + b, 0)
  return total
}

function ekuitasAkhir () {
  const ekuitas = parseFloat(store.ekuitasawal.nilai)
  const surplusdef = parseFloat(store.surplusdefisit.nilai)
  const koreksi = store.hasilkoreksi.map((x) => parseFloat(x.nilai)).reduce((a, b) => a + b, 0)

  return ekuitas + surplusdef + koreksi
}

</script>
