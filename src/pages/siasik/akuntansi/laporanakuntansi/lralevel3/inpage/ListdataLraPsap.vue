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
                <th>SELISIH (Rp.)</th>
                <th style="width:20px">
                  %
                </th>
              </tr>
            </thead>
            <tbody v-if="store.reqs.jenislra === 2">
              <tr>
                <td colspan="5" class="text-bold">
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
                  {{ formattanpaRp(it.pagu) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.realisasi) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.selisih) }}
                </td>
                <td class="text-right">
                  {{ it.persen }}
                </td>
              </tr>
              <tr class="text-bold">
                <td>
                  JUMLAH PENDAPATAN
                </td>
                <td class="text-right">
                  {{ formattanpaRp(totalPendapatan().totalpagu) }}
                  <!-- {{ formattanpaRp(it.totalpagu) }} -->
                </td>
                <td class="text-right">
                  {{ formattanpaRp(totalPendapatan().totalrealisasi) }}
                  <!-- {{ formattanpaRp(it.totalnilaisemua) }} -->
                </td>
                <td class="text-right">
                  {{ formattanpaRp(totalPendapatan().totalselisih) }}
                  <!-- {{ it.totalpersen }} -->
                </td>
                <td class="text-right">
                  {{ totalPendapatan().totalpersen }}
                  <!-- {{ it.totalpersen }} -->
                </td>
                <!-- {{ formattanpaRp(totalBarjas().totalpagu) }} -->
              </tr>
              <tr>
                <td colspan="5" class="text-bold">
                  BELANJA
                </td>
              </tr>
              <tr>
                <td colspan="5" class="text-bold">
                  BELANJA OPERASI
                </td>
              </tr>
              <tr
                v-for="it in store.psapbarjas" :key="it"
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
                  {{ formattanpaRp(it.selisih) }}
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
                  {{ formattanpaRp(totalBarjas().totalrealisasi) }}
                  <!-- {{ formattanpaRp(it.totalnilaisemua) }} -->
                </td>
                <td class="text-right">
                  {{ formattanpaRp(totalBarjas().totalselisih) }}
                  <!-- {{ it.totalpersen }} -->
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
                  {{ formattanpaRp(it.selisih) }}
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
                  {{ formattanpaRp(totalModal().totalrealisasi) }}
                  <!-- {{ formattanpaRp(it.totalnilaisemua) }} -->
                </td>
                <td class="text-right">
                  {{ formattanpaRp(totalModal().totalselisih) }}
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
                  {{ formattanpaRp(totalBelanja().totalrealisasi) }}
                  <!-- {{ formattanpaRp(it.totalnilaisemua) }} -->
                </td>
                <td class="text-right">
                  {{ formattanpaRp(totalBelanja().totalselisih) }}
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
                  {{ formattanpaRp(surplusDefisit().totalpagu) }}
                  <!-- {{ formattanpaRp(it.totalpagu) }} -->
                </td>
                <td class="text-right">
                  {{ formattanpaRp(surplusDefisit().totalrealisasi) }}
                  <!-- {{ formattanpaRp(it.totalnilaisemua) }} -->
                </td>
                <td class="text-right">
                  {{ formattanpaRp(surplusDefisit().totalselisih) }}
                  <!-- {{ formattanpaRp(it.totalnilaisemua) }} -->
                </td>
                <td class="text-right">
                  {{ surplusDefisit().totalpersen }}
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
                  {{ formattanpaRp(it.selisih) }}
                </td>
                <td class="text-right">
                  {{ it.persen }}
                </td>
              </tr>
              <tr class="text-bold">
                <td class="text-center">
                  PEMBIAYAAN NETTO
                </td>
                <td class="text-right">
                  {{ formattanpaRp(totalSilpa().totalpagu) }}
                  <!-- {{ formattanpaRp(it.totalpagu) }} -->
                </td>
                <td class="text-right">
                  {{ formattanpaRp(totalSilpa().totalrealisasi) }}
                  <!-- {{ formattanpaRp(it.totalnilaisemua) }} -->
                </td>
                <td class="text-right">
                  {{ formattanpaRp(totalSilpa().totalselisih) }}
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
                  {{ formattanpaRp(akhirSilpa().totalpagu) }}
                  <!-- {{ formattanpaRp(it.totalpagu) }} -->
                </td>
                <td class="text-right">
                  {{ formattanpaRp(akhirSilpa().totalrealisasi) }}
                  <!-- {{ formattanpaRp(it.totalnilaisemua) }} -->
                </td>
                <td class="text-right">
                  {{ formattanpaRp(akhirSilpa().totalselisih) }}
                  <!-- {{ formattanpaRp(it.totalnilaisemua) }} -->
                </td>
                <td class="text-right">
                  {{ akhirSilpa().totalpersen }}
                  <!-- {{ it.totalpersen }} -->
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
import { useLRAjurnalStore } from 'src/stores/siasik/laporan/lra/lrajurnal.'
import { ref } from 'vue'

const separator = ref('cell')
const store = useLRAjurnalStore()

function totalPendapatan () {
  const totalpagu = store.psappendapatan.map((x) => parseFloat(x.pagu)).reduce((a, b) => a + b, 0)
  const totalrealisasi = store.psappendapatan.map((x) => parseFloat(x.realisasi)).reduce((a, b) => a + b, 0)
  const totalselisih = totalpagu - totalrealisasi
  const totalpersen = ((totalrealisasi / totalpagu) * 100).toFixed(2)
  return {
    totalpagu,
    totalrealisasi,
    totalselisih,
    totalpersen
  }
}
function totalBarjas () {
  const totalpagu = store.psapbarjas.map((x) => x.pagu).reduce((a, b) => a + b, 0)
  const totalrealisasi = store.psapbarjas.map((x) => x.nilaisemua).reduce((a, b) => a + b, 0)
  const totalselisih = totalpagu - totalrealisasi
  const totalpersen = ((totalrealisasi / totalpagu) * 100).toFixed(2)
  return {
    totalpagu,
    totalrealisasi,
    totalselisih,
    totalpersen
  }
}
function totalModal () {
  const totalpagu = store.psapmodal.map((x) => x.pagu).reduce((a, b) => a + b, 0)
  const totalrealisasi = store.psapmodal.map((x) => x.nilaisemua).reduce((a, b) => a + b, 0)
  const totalselisih = totalpagu - totalrealisasi
  const totalpersen = ((totalrealisasi / totalpagu) * 100).toFixed(2)
  return {
    totalpagu,
    totalrealisasi,
    totalselisih,
    totalpersen
  }
}

function totalBelanja () {
  const totalpagu = store.psapbarjas.map((x) => x.pagu).reduce((a, b) => a + b, 0) + store.psapmodal.map((x) => x.pagu).reduce((a, b) => a + b, 0)
  const totalrealisasi = store.psapbarjas.map((x) => x.nilaisemua).reduce((a, b) => a + b, 0) + store.psapmodal.map((x) => x.nilaisemua).reduce((a, b) => a + b, 0)
  const totalselisih = totalpagu - totalrealisasi
  const totalpersen = ((totalrealisasi / totalpagu) * 100).toFixed(2)
  return {
    totalpagu,
    totalrealisasi,
    totalselisih,
    totalpersen
  }
}

function totalSilpa () {
  const totalpagu = store.psapsilpa.map((x) => x.pagu).reduce((a, b) => a + b, 0)
  const totalrealisasi = store.psapsilpa.map((x) => x.nilaisemua).reduce((a, b) => a + b, 0)
  const totalselisih = totalpagu - totalrealisasi
  const totalpersen = ((totalrealisasi / totalpagu) * 100).toFixed(2)
  return {
    totalpagu,
    totalrealisasi,
    totalselisih,
    totalpersen
  }
}

function surplusDefisit () {
  const totalpagu = (store.psappendapatan.map((x) => parseFloat(x.pagu)).reduce((a, b) => a + b, 0)) - (store.psapbarjas.map((x) => x.pagu).reduce((a, b) => a + b, 0) + store.psapmodal.map((x) => x.pagu).reduce((a, b) => a + b, 0))
  const totalrealisasi = (store.psappendapatan.map((x) => parseFloat(x.realisasi)).reduce((a, b) => a + b, 0)) - (store.psapbarjas.map((x) => x.nilaisemua).reduce((a, b) => a + b, 0) + store.psapmodal.map((x) => x.nilaisemua).reduce((a, b) => a + b, 0))
  const totalselisih = totalpagu - totalrealisasi
  const totalpersen = (parseFloat(totalPendapatan().totalpersen) - parseFloat(totalBelanja().totalpersen)).toFixed(2)
  return {
    totalpagu,
    totalrealisasi,
    totalselisih,
    totalpersen
  }
}

function akhirSilpa () {
  const totalpagu = ((store.psappendapatan.map((x) => parseFloat(x.pagu)).reduce((a, b) => a + b, 0)) - (store.psapbarjas.map((x) => x.pagu).reduce((a, b) => a + b, 0) + store.psapmodal.map((x) => x.pagu).reduce((a, b) => a + b, 0))) +
  (store.psapsilpa.map((x) => x.pagu).reduce((a, b) => a + b, 0))
  const totalrealisasi = ((store.psappendapatan.map((x) => parseFloat(x.realisasi)).reduce((a, b) => a + b, 0)) - (store.psapbarjas.map((x) => x.nilaisemua).reduce((a, b) => a + b, 0) + store.psapmodal.map((x) => x.nilaisemua).reduce((a, b) => a + b, 0))) +
  (store.psapsilpa.map((x) => x.nilaisemua).reduce((a, b) => a + b, 0))

  const totalselisih = parseFloat(totalpagu) - parseFloat(totalrealisasi)
  const totalpersen = (parseFloat(surplusDefisit().totalpersen) + parseFloat(totalSilpa().totalpersen)).toFixed(2)
  return {
    totalpagu,
    totalrealisasi,
    totalselisih,
    totalpersen
  }
}

</script>
