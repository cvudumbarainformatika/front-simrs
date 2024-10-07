<template>
  <div class="container q-pa-md">
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
            @db-model="setTo"
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
  </div>
  <div class="container q-px-md">
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
  </div>
</template>
<script setup>
import { usejurnalumummanual } from 'src/stores/siasik/akuntansi/jurnal/umummanual'
const store = usejurnalumummanual()

store.getRekenining50()

function setTo (val) {
  store.form.tanggal = val
}

function setToDisp (vaal) {
  store.tanggal = vaal
}
</script>
