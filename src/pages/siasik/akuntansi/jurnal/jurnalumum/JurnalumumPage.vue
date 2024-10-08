<template>
  <div class="container q-pa-md ">
    <q-card class="items-center bg-white q-pa-xl full-width">
      <div class="row q-gutter-xs">
        <q-select
          v-model="store.params.tahuncari"
          outlined
          standout="bg-yellow-3"
          style="width: 200px;"
          dense
          transition-show="flip-up"
          transition-hide="flip-down"
          label="Tahun"
          :options="tahun"
        />
        <app-btn
          color="primary"
          label="Ambil Data"
          tooltip="Ambil Dataa"
          type="submit"
          tip
          :loading="store.loading"
          @click="store.getJurnalUmum()"
        />
        <app-btn label="Tambah" color="primary" @click="store.dialog = true" />
      </div>
    </q-card>
    <q-card
      flat
      bordered
      square
      class="items-center bg-white full-width full-height"
    >
      <q-markup-table :separator="separator" flat bordered>
        <thead>
          <tr class="bg-primary text-white">
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
            v-for="(item , n) in store.items"
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
    </q-card>
  </div>
  <form-jurnal-umum />
</template>
<script setup>
import { dateFullFormat, formatRpDouble } from 'src/modules/formatter'
import { usejurnalumummanual } from 'src/stores/siasik/akuntansi/jurnal/umummanual'
import { onMounted, ref } from 'vue'
import FormJurnalUmum from './FormJurnalUmum.vue'

const store = usejurnalumummanual()
const separator = ref('cell')
const tahun = ref([])

onMounted(() => {
  const max = new Date().getFullYear()
  const min = max - 2
  // eslint-disable-next-line no-unused-vars
  const years = []

  for (let i = max; i >= min; i--) {
    tahun.value.push(i)
  }
})

</script>
