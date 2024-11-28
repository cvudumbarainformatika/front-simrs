<template>
  <template v-if="store.psappendapatan.length > 0 ">
    <q-card-section class="full-width">
      <div class="row">
        <div class="full-width">
          <q-markup-table
            class="my-sticky-table"
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
            <tbody v-if="store.reqs.jenislo === 2">
              <tr>
                <td colspan="2" class="text-bold">
                  PENDAPATAN
                </td>
              </tr>
              <tr
                v-for="it in store.psappendapatan" :key="it"
              >
                <td>
                  - {{ it.uraian }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.realisasi) }}
                </td>
              </tr>
              <tr class="text-bold">
                <td>
                  JUMLAH PENDAPATAN
                </td>
                <td class="text-right">
                  {{ formattanpaRp(totalPendapatan()) }}
                </td>
              </tr>
              <tr>
                <td colspan="2" class="text-bold">
                  BEBAN
                </td>
              </tr>
              <tr
                v-for="it in store.psapbeban" :key="it"
              >
                <td>
                  - {{ it.uraian }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.realisasi) }}
                </td>
              </tr>
              <tr class="text-bold">
                <td>
                  JUMLAH BEBAN
                </td>
                <td class="text-right">
                  {{ formattanpaRp(totalBeban()) }}
                </td>
              </tr>

              <tr class="text-bold">
                <td class="text-center">
                  SURPLUS / DEFISIT OPERASIONAL
                </td>
                <td class="text-right">
                  {{ formattanpaRp(surplusDefisit()) }}
                </td>
              </tr>

              <tr class="text-bold">
                <td>
                  KEGIATAN NON OPERASIONAL
                </td>
              </tr>
              <tr
                v-for="it in store.psapnonoperasional" :key="it"
              >
                <td>
                  - {{ it.uraian }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.realisasi) }}
                </td>
              </tr>
              <tr class="text-bold">
                <td>
                  JUMLAH SURPLUS / DEFISIT DARI KEGIATAN NON OPERASIONAL
                </td>
                <td class="text-right">
                  {{ formattanpaRp(surplusDefisitnonOperasional()) }}
                </td>
              </tr>
              <tr class="text-bold">
                <td class="text-center">
                  SURPLUS / DEFISIT SEBELUM POS LUAR BIASA
                </td>
                <td class="text-right">
                  {{ formattanpaRp(surplusDefisitsblmPoslb()) }}
                </td>
              </tr>
              <tr class="text-bold">
                <td>
                  POS LUAR BIASA
                </td>
              </tr>
              <tr
                v-for="it in store.psapbebanluarbiasa" :key="it"
              >
                <td>
                  - {{ it.uraian }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.realisasi) }}
                </td>
              </tr>
              <tr class="text-bold">
                <td>
                  JUMLAH POS LUAR BIASA
                </td>
                <td class="text-right">
                  {{ formattanpaRp(jmlPosLuarBiasa()) }}
                </td>
              </tr>
              <tr class="text-bold">
                <td class="text-center">
                  SURPLUS / DEFISIT LO
                </td>
                <td class="text-right">
                  {{ formattanpaRp(surplusDefisitLO()) }}
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
import { useLaporanOperasionalStore } from 'src/stores/siasik/laporan/laporanoperasional/lapoperasional'
import { ref } from 'vue'
const separator = ref('cell')

const store = useLaporanOperasionalStore()

function totalPendapatan () {
  const totalrealisasi = store.psappendapatan?.map((x) => parseFloat(x.realisasi)).reduce((a, b) => a + b, 0).toFixed(2)
  // console.log('xssx', totalrealisasi)
  return parseFloat(totalrealisasi)
}

function totalBeban () {
  const totalrealisasi = store.psapbeban?.map((x) => parseFloat(x.realisasi)).reduce((a, b) => a + b, 0).toFixed(2)
  // console.log('xssx', totalrealisasi)
  return parseFloat(totalrealisasi)
}

function surplusDefisit () {
  const totalpendapatan = store.psappendapatan?.map((x) => parseFloat(x.realisasi)).reduce((a, b) => a + b, 0).toFixed(2)
  const totalbeban = store.psapbeban?.map((x) => parseFloat(x.realisasi)).reduce((a, b) => a + b, 0).toFixed(2)
  const totalrealisasi = parseFloat(totalpendapatan - totalbeban)
  return parseFloat(totalrealisasi)
}

function surplusDefisitnonOperasional () {
  const totalrealisasi = store.psapnonoperasional?.map((x) => parseFloat(x.realisasi)).reduce((a, b) => a + b, 0).toFixed(2)
  return parseFloat(totalrealisasi)
}

function surplusDefisitsblmPoslb () {
  const totalpendapatan = store.psappendapatan?.map((x) => parseFloat(x.realisasi)).reduce((a, b) => a + b, 0).toFixed(2)
  const totalbeban = store.psapbeban?.map((x) => parseFloat(x.realisasi)).reduce((a, b) => a + b, 0).toFixed(2)
  const totalnonoper = store.psapnonoperasional?.map((x) => parseFloat(x.realisasi)).reduce((a, b) => a + b, 0).toFixed(2)
  const totalrealisasi = parseFloat(totalpendapatan - totalbeban) + parseFloat(totalnonoper)
  return parseFloat(totalrealisasi)
}

function jmlPosLuarBiasa () {
  const totalrealisasi = store.psapbebanluarbiasa?.map((x) => parseFloat(x.realisasi)).reduce((a, b) => a + b, 0).toFixed(2)
  return parseFloat(totalrealisasi)
}

function surplusDefisitLO () {
  const totalpendapatan = store.psappendapatan?.map((x) => parseFloat(x.realisasi)).reduce((a, b) => a + b, 0).toFixed(2)
  const totalbeban = store.psapbeban?.map((x) => parseFloat(x.realisasi)).reduce((a, b) => a + b, 0).toFixed(2)
  const totalnonoper = store.psapnonoperasional?.map((x) => parseFloat(x.realisasi)).reduce((a, b) => a + b, 0).toFixed(2)
  const totalposluarbiasa = store.psapbebanluarbiasa?.map((x) => parseFloat(x.realisasi)).reduce((a, b) => a + b, 0).toFixed(2)

  const totalrealisasi = (parseFloat(totalpendapatan - totalbeban) + parseFloat(totalnonoper)) + parseFloat(totalposluarbiasa)
  return parseFloat(totalrealisasi)
}
</script>
