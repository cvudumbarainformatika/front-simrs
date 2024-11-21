<template>
  <template v-if="store.psappendapatan.length > 0 && store.psapbarjas.length > 0 && store.psapsilpa.length > 0">
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
                <th>ANGGARAN (Rp.)</th>
                <th>REALISASI (Rp.)</th>
                <th>%</th>
              </tr>
            </thead>
            <tbody v-if="store.reqs.jenislra === 2">
              <tr>
                <td colspan="4" class="text-bold">
                  BELANJA
                </td>
              </tr>
              <tr>
                <td colspan="4" class="text-bold">
                  BELANJA OPERASI
                </td>
              </tr>
              <tr
                v-for="it in store.psapbarjas" :key="it"
                :class="it.kode.length <= 3 ? 'text-bold' : '' "
              >
                <td>
                  - {{ it.uraian }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.pagu) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.nilaisemua) }}
                </td>
                <td class="text-right">
                  {{ it.persen }}
                </td>
              </tr>
              <tr class="text-bold">
                <td>
                  JUMLAH BELANJA OPERASI
                </td>
                <td class="text-right">
                  {{ formattanpaRp(totalBarjas().totalpagu) }}
                  <!-- {{ formattanpaRp(it.totalpagu) }} -->
                </td>
                <td class="text-right">
                  {{ formattanpaRp(totalBarjas().totalnilaisemua) }}
                  <!-- {{ formattanpaRp(it.totalnilaisemua) }} -->
                </td>
                <td class="text-right">
                  {{ totalBarjas().totalpersen }}
                  <!-- {{ it.totalpersen }} -->
                </td>
                <!-- {{ formattanpaRp(totalBarjas().totalpagu) }} -->
              </tr>
              <tr>
                <td colspan="4" class="text-bold">
                  BELANJA MODAL
                </td>
              </tr>
              <tr
                v-for="it in store.psapmodal" :key="it"
                :class="it.kode.length <= 3 ? 'text-bold' : '' "
              >
                <td>
                  - {{ it.uraian }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.pagu) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.nilaisemua) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.persen) }}
                </td>
              </tr>
              <tr class="text-bold">
                <td>
                  JUMLAH BELANJA MODAL
                </td>
                <td class="text-right">
                  {{ formattanpaRp(totalModal().totalpagu) }}
                  <!-- {{ formattanpaRp(it.totalpagu) }} -->
                </td>
                <td class="text-right">
                  {{ formattanpaRp(totalModal().totalnilaisemua) }}
                  <!-- {{ formattanpaRp(it.totalnilaisemua) }} -->
                </td>
                <td class="text-right">
                  {{ totalModal().totalpersen }}
                  <!-- {{ it.totalpersen }} -->
                </td>
                <!-- {{ formattanpaRp(totalBarjas().totalpagu) }} -->
              </tr>
              <tr class="text-bold">
                <td class="text-center">
                  JUMLAH BELANJA
                </td>
                <td class="text-right">
                  {{ formattanpaRp(totalBelanja().totalpagu) }}
                  <!-- {{ formattanpaRp(it.totalpagu) }} -->
                </td>
                <td class="text-right">
                  {{ formattanpaRp(totalBelanja().totalnilaisemua) }}
                  <!-- {{ formattanpaRp(it.totalnilaisemua) }} -->
                </td>
                <td class="text-right">
                  {{ totalBelanja().totalpersen }}
                  <!-- {{ it.totalpersen }} -->
                </td>
                <!-- {{ formattanpaRp(totalBarjas().totalpagu) }} -->
              </tr>
              <tr class="text-bold">
                <td class="text-center">
                  SURPLUS / DEFISIT
                </td>
                <td class="text-right">
                  <!-- {{ formattanpaRp(totalBelanja().totalpagu) }} -->
                  <!-- {{ formattanpaRp(it.totalpagu) }} -->
                </td>
                <td class="text-right">
                  <!-- {{ formattanpaRp(totalBelanja().totalnilaisemua) }} -->
                  <!-- {{ formattanpaRp(it.totalnilaisemua) }} -->
                </td>
                <td class="text-right">
                  <!-- {{ totalBelanja().totalpersen }} -->
                  <!-- {{ it.totalpersen }} -->
                </td>
                <!-- {{ formattanpaRp(totalBarjas().totalpagu) }} -->
              </tr>
              <tr>
                <td colspan="4" class="text-bold">
                  PEMBIAYAAN
                </td>
              </tr>
              <tr
                v-for="it in store.psapsilpa" :key="it"
                :class="it.kode.length <= 3 ? 'text-bold' : '' "
              >
                <td>
                  - {{ it.uraian }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.pagu) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.nilaisemua) }}
                </td>
                <td class="text-right">
                  {{ it.persen }}
                </td>
              </tr>
              <tr class="text-bold">
                <td>
                  PEMBIAYAAN NETTO
                </td>
                <td class="text-right">
                  {{ formattanpaRp(totalSilpa().totalpagu) }}
                  <!-- {{ formattanpaRp(it.totalpagu) }} -->
                </td>
                <td class="text-right">
                  {{ formattanpaRp(totalSilpa().totalnilaisemua) }}
                  <!-- {{ formattanpaRp(it.totalnilaisemua) }} -->
                </td>
                <td class="text-right">
                  {{ totalSilpa().totalpersen }}
                  <!-- {{ it.totalpersen }} -->
                </td>
                <!-- {{ formattanpaRp(totalBarjas().totalpagu) }} -->
              </tr>
              <tr class="text-bold">
                <td class="text-center">
                  SISA LEBIH PEMBIAYAAN ANGGARAN (SILPA)
                </td>
                <td class="text-right">
                  <!-- {{ formattanpaRp(totalBelanja().totalpagu) }} -->
                  <!-- {{ formattanpaRp(it.totalpagu) }} -->
                </td>
                <td class="text-right">
                  <!-- {{ formattanpaRp(totalBelanja().totalnilaisemua) }} -->
                  <!-- {{ formattanpaRp(it.totalnilaisemua) }} -->
                </td>
                <td class="text-right">
                  <!-- {{ totalBelanja().totalpersen }} -->
                  <!-- {{ it.totalpersen }} -->
                </td>
                <!-- {{ formattanpaRp(totalBarjas().totalpagu) }} -->
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
import { useLRAjurnalStore } from 'src/stores/siasik/laporan/lra/lrajurnal.'
import { ref } from 'vue'

const separator = ref('cell')
const store = useLRAjurnalStore()

function totalBarjas () {
  const totalpagu = store.psapbarjas.map((x) => x.pagu).reduce((a, b) => a + b, 0)
  const totalnilaisemua = store.psapbarjas.map((x) => x.nilaisemua).reduce((a, b) => a + b, 0)
  const totalpersen = (totalnilaisemua / totalpagu * 100).toFixed(2)
  return {
    totalpagu,
    totalnilaisemua,
    totalpersen
  }
}
function totalModal () {
  const totalpagu = store.psapmodal.map((x) => x.pagu).reduce((a, b) => a + b, 0)
  const totalnilaisemua = store.psapmodal.map((x) => x.nilaisemua).reduce((a, b) => a + b, 0)
  const totalpersen = (totalnilaisemua / totalpagu * 100).toFixed(2)
  return {
    totalpagu,
    totalnilaisemua,
    totalpersen
  }
}

function totalBelanja () {
  const totalpagu = store.psapbarjas.map((x) => x.pagu).reduce((a, b) => a + b, 0) + store.psapmodal.map((x) => x.pagu).reduce((a, b) => a + b, 0)
  const totalnilaisemua = store.psapbarjas.map((x) => x.nilaisemua).reduce((a, b) => a + b, 0) + store.psapmodal.map((x) => x.nilaisemua).reduce((a, b) => a + b, 0)
  const totalpersen = (totalnilaisemua / totalpagu * 100).toFixed(2)
  return {
    totalpagu,
    totalnilaisemua,
    totalpersen
  }
}

function totalSilpa () {
  const totalpagu = store.psapsilpa.map((x) => x.pagu).reduce((a, b) => a + b, 0)
  const totalnilaisemua = store.psapsilpa.map((x) => x.nilaisemua).reduce((a, b) => a + b, 0)
  const totalpersen = (totalnilaisemua / totalpagu * 100).toFixed(2)
  return {
    totalpagu,
    totalnilaisemua,
    totalpersen
  }
}

</script>
