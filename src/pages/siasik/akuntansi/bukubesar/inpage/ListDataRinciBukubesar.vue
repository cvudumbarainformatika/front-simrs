<template>
  <template v-if="store.hasilRinci1.length > 0">
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
                <td>
                  {{ it.debit }}
                </td>
                <td>
                  {{ it.kredit }}
                </td>
                <td>
                  {{ it.total }}
                </td>
              </tr>
              <tr class="text-weight-bold">
                <td colspan="3" class="text-center">
                  JUMLAH
                </td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>
      </div>
    </q-card-section>
  </template>
  <template v-else-if="store.hasilRinci2.length > 0">
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
              <tr v-for="it in store.hasilRinci2" :key="it">
                <!-- <td colspan="2" class="text-weight-bold">
                  KODE REKENING : {{ it.kode }}
                </td> -->
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
                <td>
                  {{ it.debit }}
                </td>
                <td>
                  {{ it.kredit }}
                </td>
                <td>
                  {{ it.total }}
                </td>
              </tr>
              <tr class="text-weight-bold">
                <td colspan="3" class="text-center">
                  JUMLAH
                </td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>
      </div>
    </q-card-section>
  </template>
  <template v-else-if="store.hasilRinci3.length > 0">
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
              <tr v-for="it in store.hasilRinci3" :key="it">
                <!-- <td colspan="2" class="text-weight-bold">
                  KODE REKENING : {{ it.kode }}
                </td> -->
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
                <td>
                  {{ it.debit }}
                </td>
                <td>
                  {{ it.kredit }}
                </td>
                <td>
                  {{ it.total }}
                </td>
              </tr>
              <!-- <tr v-for="rinci in it.rinci" :key="rinci">
                <td> {{ rinci.tanggal }} </td>
                <td> {{ rinci.notrans }} </td>
                <template v-if="!rinci.keterangan">
                  <td>{{ rinci.kegiatan }} </td>
                </template>
                <template v-else-if="!rinci.kegiatan">
                  <td>{{ rinci.keterangan }} </td>
                </template>
                <template v-else>
                  <td>{{ rinci.keterangan }} > {{ rinci.kegiatan }} </td>
                </template>
                <td> {{ rinci.debit }} </td>
                <td> {{ rinci.kredit }} </td>
                <td> {{ rinci.total }} </td>
              </tr> -->
              <tr class="text-weight-bold">
                <td colspan="3" class="text-center">
                  JUMLAH
                </td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>
      </div>
    </q-card-section>
  </template>
  <template v-else-if="store.hasilRinci4.length > 0">
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
              <tr v-for="it in store.hasilRinci4" :key="it">
                <!-- <td colspan="2" class="text-weight-bold">
                  KODE REKENING : {{ it.kode }}
                </td> -->
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
                <td>
                  {{ it.debit }}
                </td>
                <td>
                  {{ it.kredit }}
                </td>
                <td>
                  {{ it.total }}
                </td>
              </tr>
              <tr class="text-weight-bold">
                <td colspan="3" class="text-center">
                  JUMLAH
                </td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>
      </div>
    </q-card-section>
  </template>
  <template v-else-if="store.hasilRinci5.length > 0">
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
              <tr v-for="it in store.hasilRinci5" :key="it">
                <!-- <td colspan="2" class="text-weight-bold">
                  KODE REKENING : {{ it.kode }}
                </td> -->
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
                <td>
                  {{ it.debit }}
                </td>
                <td>
                  {{ it.kredit }}
                </td>
                <td>
                  {{ it.total }}
                </td>
              </tr>
              <tr class="text-weight-bold">
                <td colspan="3" class="text-center">
                  JUMLAH
                </td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>
      </div>
    </q-card-section>
  </template>
  <template v-else-if="store.hasilRinci6.length > 0">
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
              <tr v-for="it in store.hasilRinci6" :key="it">
                <!-- <td colspan="2" class="text-weight-bold">
                  KODE REKENING : {{ it.kode }}
                </td> -->
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
                <td>
                  {{ it.debit }}
                </td>
                <td>
                  {{ it.kredit }}
                </td>
                <td>
                  {{ it.total }}
                </td>
              </tr>
              <tr class="text-weight-bold">
                <td colspan="3" class="text-center">
                  JUMLAH
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
import { useBukubesarStore } from 'src/stores/siasik/akuntansi/bukubesar/bukubesar'
import { ref } from 'vue'

const store = useBukubesarStore()
const separator = ref('cell')

</script>
