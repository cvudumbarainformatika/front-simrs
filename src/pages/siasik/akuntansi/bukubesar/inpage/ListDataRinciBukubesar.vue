<template>
  <template
    v-if="store.hasilRinci1.length > 1 || store.hasilRinci2.length > 1
      || store.hasilRinci3.length > 1 || store.hasilRinci4.length > 1
      || store.hasilRinci5.length > 1 || store.hasilRinci6.length > 1"
  >
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
            <tbody v-if="store.hasilRinci1.length > 1">
              <tr v-for="it in store.hasilRinci1" :key="it">
                <td> {{ it.tanggal }} </td>
                <td> {{ it.notrans }} </td>
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
                  {{ formattanpaRp(total().jmldebit) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(total().jmlkredit) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(total().jumlah) }}
                </td>
              </tr>
            </tbody>
            <tbody v-else-if="store.hasilRinci2.length > 1">
              <tr v-for="it in store.hasilRinci2" :key="it">
                <td> {{ it.tanggal }} </td>
                <td> {{ it.notrans }} </td>
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
                  {{ formattanpaRp(total().jmldebit) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(total().jmlkredit) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(total().jumlah) }}
                </td>
              </tr>
            </tbody>
            <tbody v-else-if="store.hasilRinci3.length > 1">
              <tr v-for="it in store.hasilRinci3" :key="it">
                <td> {{ it.tanggal }} </td>
                <td> {{ it.notrans }} </td>
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
                  {{ formattanpaRp(total().jmldebit) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(total().jmlkredit) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(total().jumlah) }}
                </td>
              </tr>
            </tbody>
            <tbody v-else-if="store.hasilRinci4.length > 1">
              <tr v-for="it in store.hasilRinci4" :key="it">
                <td> {{ it.tanggal }} </td>
                <td> {{ it.notrans }} </td>
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
                  {{ formattanpaRp(total().jmldebit) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(total().jmlkredit) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(total().jumlah) }}
                </td>
              </tr>
            </tbody>
            <tbody v-else-if="store.hasilRinci5.length > 1">
              <tr v-for="it in store.hasilRinci5" :key="it">
                <td> {{ it.tanggal }} </td>
                <td> {{ it.notrans }} </td>
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
                  {{ formattanpaRp(total().jmldebit) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(total().jmlkredit) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(total().jumlah) }}
                </td>
              </tr>
            </tbody>
            <tbody v-else-if="store.hasilRinci6.length > 1">
              <tr v-for="it in store.hasilRinci6" :key="it">
                <td> {{ it.tanggal }} </td>
                <td> {{ it.notrans }} </td>
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
                  {{ formattanpaRp(total().jmldebit) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(total().jmlkredit) }}
                </td>
                <td class="text-right">
                  {{ formattanpaRp(total().jumlah) }}
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

function total () {
  if (store.hasilRinci1.length > 1) {
    const debit = store.hasilRinci1.map((x) => x.debit)
    const jmldebit = debit.reduce((a, b) => a + b, 0)
    const kredit = store.hasilRinci1.map((x) => x.kredit)
    const jmlkredit = kredit.reduce((a, b) => a + b, 0)
    const jumlah = jmldebit - jmlkredit
    return {
      jmldebit,
      jmlkredit,
      jumlah
    }
  }
  else if (store.hasilRinci2.length > 1) {
    const debit = store.hasilRinci2.map((x) => x.debit)
    const jmldebit = debit.reduce((a, b) => a + b, 0)
    const kredit = store.hasilRinci2.map((x) => x.kredit)
    const jmlkredit = kredit.reduce((a, b) => a + b, 0)
    const jumlah = jmldebit - jmlkredit
    return {
      jmldebit,
      jmlkredit,
      jumlah
    }
  }
  else if (store.hasilRinci3.length > 1) {
    const debit = store.hasilRinci3.map((x) => x.debit)
    const jmldebit = debit.reduce((a, b) => a + b, 0)
    const kredit = store.hasilRinci3.map((x) => x.kredit)
    const jmlkredit = kredit.reduce((a, b) => a + b, 0)
    const jumlah = jmldebit - jmlkredit
    return {
      jmldebit,
      jmlkredit,
      jumlah
    }
  }
  else if (store.hasilRinci4.length > 1) {
    const debit = store.hasilRinci4.map((x) => x.debit)
    const jmldebit = debit.reduce((a, b) => a + b, 0)
    const kredit = store.hasilRinci4.map((x) => x.kredit)
    const jmlkredit = kredit.reduce((a, b) => a + b, 0)
    const jumlah = jmldebit - jmlkredit
    return {
      jmldebit,
      jmlkredit,
      jumlah
    }
  }
  else if (store.hasilRinci5.length > 1) {
    const debit = store.hasilRinci5.map((x) => x.debit)
    const jmldebit = debit.reduce((a, b) => a + b, 0)
    const kredit = store.hasilRinci5.map((x) => x.kredit)
    const jmlkredit = kredit.reduce((a, b) => a + b, 0)
    const jumlah = jmldebit - jmlkredit
    return {
      jmldebit,
      jmlkredit,
      jumlah
    }
  }
  else if (store.hasilRinci6.length > 1) {
    const debit = store.hasilRinci6.map((x) => x.debit)
    const jmldebit = debit.reduce((a, b) => a + b, 0)
    const kredit = store.hasilRinci6.map((x) => x.kredit)
    const jmlkredit = kredit.reduce((a, b) => a + b, 0)
    const jumlah = jmldebit - jmlkredit
    return {
      jmldebit,
      jmlkredit,
      jumlah
    }
  }
}

</script>
