<template>
  <q-dialog
    v-model="fixed"
    full-width
    full-height
  >
    <q-card
      style="width: 100%"
    >
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6 items-center">
          RENCANA PEMESANAN OBAT
        </div>
        <q-space />
        <q-btn
          v-close-popup
          icon="icon-mat-close"
          flat
          round
          dense
        />
      </q-card-section>
      <q-separator />
      <div
        id="printMe"
        style="width: 17cm;"
        class="q-pa-xs full-width"
      >
        <KopSurat />
        <div v-if="store.loading === false">
          <q-card-section>
            <div
              class="row justify-center"
            >
              <em><b><u>  Nomor Rencana Beli : {{ store.cetaks[0]?.no_rencbeliobat }} </u></b></em>
            </div>

            <div class="row no-wrap q-mt-md bg-grey-3">
              <div class="col-6">
                <div class="row no-wrap">
                  <div class="col-3">
                    Gudang
                  </div>
                  <div class="col-1">
                    :
                  </div>
                  <div class="col-9">
                    {{ store.cetaks[0]?.gudang?.nama }}
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div class="row no-wrap">
                  <div class="col-4">
                    Tanggal
                  </div>
                  <div class="col-1">
                    :
                  </div>
                  <div class="col-8">
                    {{ store.cetaks[0]?.tgl }}
                  </div>
                </div>
              </div>
            </div>
            <br>
            <q-separator />
            <br>

            <q-markup-table
              separator="vertical"
              flat
              bordered
              dense
              wrap-cells
            >
              <thead>
                <tr>
                  <th class="text-center">
                    NO.
                  </th>
                  <th class="text-center">
                    OBAT
                  </th>
                  <th class="text-center">
                    STOK RS
                  </th>
                  <th class="text-center">
                    STOK MAX
                  </th>
                  <th class="text-center">
                    RENCANA BELI
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(rincians, s) in store.cetaks[0]?.rincian"
                  :key="s"
                >
                  <td>{{ s + 1 }}.</td>
                  <td>
                    {{ rincians?.mobat?.nama_obat }} <br>
                    <div class="row text-italic f-8">
                      {{ rincians?.kdobat }}
                    </div>
                  </td>
                  <td style="text-align: right">
                    {{ angka(Math.round(rincians?.stok_real_rs)) }} <br>
                    <div
                      class="row text-italic f-8 justify-end"
                    >
                      {{ rincians?.mobat?.satuan_k }}
                    </div>
                  </td>
                  <td style="text-align: right">
                    {{ angka(Math.round(rincians?.stok_max_rs)) }} <br>
                    <div
                      class="row text-italic f-8 justify-end"
                    >
                      {{ rincians?.mobat?.satuan_k }}
                    </div>
                  </td>
                  <td style="text-align: right">
                    {{ angka(rincians?.jumlahdirencanakan) }} <br>
                    <div
                      class="row text-italic f-8 justify-end"
                    >
                      {{ rincians?.mobat?.satuan_k }}
                    </div>
                  </td>
                </tr>
              </tbody>
            </q-markup-table>
          </q-card-section>
          <q-separator class="print-hide" />

          <q-card-actions
            align="right"
          >
            <q-btn
              ref="refPrint"
              v-print="printObj"
              color="primary"
              label="Cetak"
              class="print-hide"
              icon-right="icon-mat-print"
            />
          </q-card-actions>
        </div>
        <div v-else>
          <app-loading />
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>
<script setup>
import KopSurat from 'src/pages/simrs/dokumen/comppoli/KopSurat.vue'
import { useRencanaPemesananObatStore } from 'src/stores/simrs/farmasi/pemesanan/rencana'
import { ref } from 'vue'

const fixed = ref(false)
const store = useRencanaPemesananObatStore()
const angka = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

const printObj = {
  id: 'printMe',
  popTitle: ' '
}
</script>
