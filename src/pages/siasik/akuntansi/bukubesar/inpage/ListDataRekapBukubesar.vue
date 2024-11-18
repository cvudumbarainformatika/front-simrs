<template>
  <template v-if="store.hasilmapsLevel1.length > 0 && store.reqs.levelberapa === 0">
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
                <th>KODE REKENING</th>
                <th style="width: 40%;">
                  URAIAN
                </th>
                <th>DEBIT (Rp.)</th>
                <th>KREDIT (Rp.)</th>
                <th>SALDO (Rp.)</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="it in store.hasilmapsLevel1" :key="it">
                <td>{{ it.kode }}</td>
                <td>{{ it.uraian }}</td>
                <td class="text-right">
                  {{ formattanpaRp(it.debit) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.kredit) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.total) }}
                </td>
              </tr>
              <tr>
                <td colspan="2" class="text-weight-bold text-center">
                  JUMLAH
                </td>
                <td class="text-right">
                  {{ formattanpaRp(totalDebit()) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(totalKredit()) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(totalSaldo()) }}
                </td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>
      </div>
    </q-card-section>
  </template>
  <template v-else-if="store.hasilmapsLevel5.length > 0 && !store.hasilmapsLevel6.length">
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
                <th>KODE REKENING</th>
                <th style="width: 40%;">
                  URAIAN
                </th>
                <th>DEBIT (Rp.)</th>
                <th>KREDIT (Rp.)</th>
                <th>SALDO (Rp.)</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="it in store.hasilmapsLevel5" :key="it">
                <td>{{ it.kode }}</td>
                <td>{{ it.uraian }}</td>
                <td class="text-right">
                  {{ formattanpaRp(it.debit) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.kredit) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.total) }}
                </td>
              </tr>
              <tr>
                <td colspan="2" class="text-weight-bold text-center">
                  JUMLAH
                </td>
                <td class="text-right">
                  {{ formattanpaRp(totalDeb()) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(totalKred()) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(totalSal()) }}
                </td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>
      </div>
    </q-card-section>
  </template>
  <template v-else-if="store.hasilmapsLevel6.length">
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
                <th>DEBIT (Rp.)</th>
                <th>KREDIT (Rp.)</th>
                <th>SALDO (Rp.)</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="it in store.hasilmapsLevel6" :key="it">
                <td>{{ it.tanggal }}</td>
                <td>{{ it.notrans }}</td>
                <template v-if="!it.keterangan">
                  <td>{{ it.kegiatan }} </td>
                </template>
                <template v-else-if="!it.kegiatan">
                  <td>{{ it.keterangan }} </td>
                </template>
                <template v-else>
                  <td>{{ it.keterangan }} > {{ it.kegiatan }} </td>
                </template>
                <td class="text-right">
                  {{ formattanpaRp(it.debit) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.kredit) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(it.total) }}
                </td>
              </tr>
              <tr class="text-weight-bold">
                <td colspan="3" class="text-center">
                  JUMLAH
                </td>
                <td class="text-right">
                  {{ formattanpaRp(Debitlevel6()) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(Kreditlevel6()) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(Saldolevel6()) }}
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

function totalDebit () {
  const debit = store.hasilmapsLevel1.map((x) => x.debit)
  const totaldebit = debit.reduce((a, b) => a + b, 0)
  return totaldebit
}
function totalKredit () {
  const kredit = store.hasilmapsLevel1.map((x) => x.kredit)
  const totalkredit = kredit.reduce((a, b) => a + b, 0)
  return totalkredit
}
function totalSaldo () {
  const debit = store.hasilmapsLevel1.map((x) => x.debit)
  const totaldebit = debit.reduce((a, b) => a + b, 0)
  const kredit = store.hasilmapsLevel1.map((x) => x.kredit)
  const totalkredit = kredit.reduce((a, b) => a + b, 0)
  return totaldebit - totalkredit
}

// TOTAL HASIL LEVEL DIBAWAH 5
function totalDeb () {
  const debit = store.hasilmapsLevel5.map((x) => x.debit)
  const totaldebit = debit.reduce((a, b) => a + b, 0)
  return totaldebit
}
function totalKred () {
  const kredit = store.hasilmapsLevel5.map((x) => x.kredit)
  const totalkredit = kredit.reduce((a, b) => a + b, 0)
  return totalkredit
}
function totalSal () {
  const debit = store.hasilmapsLevel5.map((x) => x.debit)
  const totaldebit = debit.reduce((a, b) => a + b, 0)
  const kredit = store.hasilmapsLevel5.map((x) => x.kredit)
  const totalkredit = kredit.reduce((a, b) => a + b, 0)
  return totaldebit - totalkredit
}

// TOTAL HASIL LEVEL 6
// eslint-disable-next-line no-unused-vars
function Debitlevel6 () {
  const debit = store.hasilmapsLevel6.map((x) => x.debit)
  const totaldebit = debit.reduce((a, b) => a + b, 0)
  return totaldebit
}
// eslint-disable-next-line no-unused-vars
function Kreditlevel6 () {
  const kredit = store.hasilmapsLevel6.map((x) => x.kredit)
  const totalkredit = kredit.reduce((a, b) => a + b, 0)
  return totalkredit
}
// eslint-disable-next-line no-unused-vars
function Saldolevel6 () {
  const debit = store.hasilmapsLevel6.map((x) => x.debit)
  const totaldebit = debit.reduce((a, b) => a + b, 0)
  const kredit = store.hasilmapsLevel6.map((x) => x.kredit)
  const totalkredit = kredit.reduce((a, b) => a + b, 0)
  return totaldebit - totalkredit
}

// TOTAL HASIL LEVEL DIBAWAH 5
// function SaldoAwalDebit () {
//   const debit = store.hasilSal5.map((x) => x.debit)
//   const totaldebit = debit.reduce((a, b) => a + b, 0)
//   return totaldebit
// }
// function SaldoAwalKredit () {
//   const kredit = store.hasilSal5.map((x) => x.kredit)
//   const totalkredit = kredit.reduce((a, b) => a + b, 0)
//   return totalkredit
// }
// function totalSaldoAwal () {
//   const debit = store.hasilSal5.map((x) => x.debit)
//   const totaldebit = debit.reduce((a, b) => a + b, 0)
//   const kredit = store.hasilSal5.map((x) => x.kredit)
//   const totalkredit = kredit.reduce((a, b) => a + b, 0)
//   return totaldebit - totalkredit
// }
</script>
