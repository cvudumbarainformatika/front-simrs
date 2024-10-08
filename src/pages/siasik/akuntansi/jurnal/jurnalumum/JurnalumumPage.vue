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
          :options="store.tahun"
        />
        <app-btn
          color="primary"
          label="Ambil Data"
          tooltip="Ambil Dataa"
          type="submit"
          tip
          :loading="store.loadingForm"
          @click="store.getJurnalUmum()"
        />
      </div>
    </q-card>
    <q-card
      flat
      bordered
      square
      class="items-center bg-white full-width full-height"
    >
      <q-markup-table>
        <thead>
          <tr class="bg-primary text-white">
            <th>NO. BUKTI</th>
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
              {{ item?.tanggal }}
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
          </tr>
        </tbody>
      </q-markup-table>
    </q-card>
  </div>
  <!-- <div class="container q-pa-md">
    <q-card class="items-center bg-white q-pa-xl full-width">
      <div class="row q-col-gutter-sm">
        <div class="col-3">
          <q-input
            label="No. Bukti"
            outlined
            dense
            disable
          />
        </div>
        <div class="col-3">
          <app-input-date-human
            :model="store.tanggal"
            label="Tanggal"
            outlined
            @rn-model="setTo"
            @set-display="setToDisp"
          />
        </div>
        <div class="col-6">
          <q-input
            label="Keterangan"
            outlined
            dense
          />
        </div>
      </div>
    </q-card>
  </div> -->
  <!-- <div class="container q-px-md">
    <q-card class="items-center bg-white q-pa-xl full-width">
      <div class="row flex-center">
        <div class="col">
          <q-markup-table class="full-width" :separator="cell" flat bordered>
            <thead>
              <tr class="bg-primary text-white items-center">
                <th class="text-weight-bold text-white">
                  Kode Rekening 50
                </th>
                <th class="text-weight-bold text-white">
                  Uraian  Rekening 50
                </th>
                <th class="text-weight-bold text-white">
                  Debet
                </th>
                <th class="text-weight-bold text-white">
                  Kredit
                </th>
                <th class="text-weight-bold text-white">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ rincix?.nopenerimaan }}</td>
                <td> {{ rincix?.obat?.nama_obat }}</td>
                <td class="text-right">
                  {{ rincix?.jumlah }}
                </td>
                <td class="text-right">
                  ghjhjk
                </td>
                <td class="text-right">
                  jghj
                </td>
              </tr>
              <tr>
                <td>
                  <q-select
                    v-model="store.form.koderekening"
                    label="Kode Rekening 50"
                    outlined
                    emit-value
                    map-options
                    standout="bg-yellow-3"
                    dense
                    transition-show="flip-up"
                    transition-hide="flip-down"
                    :options="store.rekening50"
                    :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
                  />
                </td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>
      </div>
    </q-card>
  </div> -->
</template>
<script setup>
import { formatRpDouble } from 'src/modules/formatter'
import { usejurnalumummanual } from 'src/stores/siasik/akuntansi/jurnal/umummanual'
const store = usejurnalumummanual()

store.getRekenining50()
store.caritahun()

// function setTo (val) {
//   store.form.tanggal = val
// }

// function setToDisp (vaal) {
//   store.tanggal = vaal
// }
</script>
