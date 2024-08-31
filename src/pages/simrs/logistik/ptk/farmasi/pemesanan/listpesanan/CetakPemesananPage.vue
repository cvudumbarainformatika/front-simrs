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
          PEMESANAN OBAT
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
        <div>
          <q-card-section>
            <div
              class="row justify-center"
            >
              <em><b><u>  Nomor Pemesanan Obat : {{ store.cetaks[0]?.nopemesanan }} </u></b></em>
            </div>

            <div class="row no-wrap q-mt-md bg-grey-3 full-width">
              <div class="col-2">
                Gudang
              </div>
              <div class="col-1 text-left col-md-1">
                :
              </div>
              <div class="col-4 text-left">
                {{ store.cetaks[0]?.gudang?.nama }}
              </div>
              <div class="col-2">
                Tgl Pemesanan
              </div>
              <div class="col-1 text-left">
                :
              </div>
              <div class="col-4 text-left">
                {{ store.cetaks[0]?.tgl_pemesanan }}
              </div>
            </div>
            <div class="row no-wrap bg-grey-3">
              <div class="col-2">
                PBF
              </div>
              <div class="col-1 text-left">
                :
              </div>
              <div class="col-4 text-left">
                {{ store.cetaks[0]?.pihakketiga.nama }}
              </div>
              <div class="col-2">
                CP
              </div>
              <div class="col-1 text-left">
                :
              </div>
              <div class="col-4 text-left">
                {{ store.cetaks[0]?.pihakketiga.cp }}
              </div>
            </div>
          </q-card-section>
        </div>
        <q-separator vertical />

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
              <!-- <th class="text-center">
                JUMLAH BISA DIBELI
              </th> -->
              <th class="text-center">
                JUMLAH DIPESAN
              </th>
              <!-- <th class="text-center">
                HARGA
              </th> -->
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(rincians, s) in store.cetaks[0]?.rinci"
              :key="s"
            >
              <td>{{ s + 1 }}.</td>
              <td>
                {{ rincians?.masterobat?.nama_obat }} <br>
                <div class="row text-italic f-8">
                  {{ rincians?.kdobat }}
                </div>
              </td>
              <!-- <td>
                {{ angka(rincians?.jumlah_bisa_dibeli) }} <br>
                <div class="row text-italic f-8">
                  {{ rincians?.masterobat?.satuan_k }}
                </div>
              </td> -->
              <td>
                {{ angka(rincians?.jumlahdpesan) }} <br>
                <div class="row text-italic f-8">
                  {{ rincians?.masterobat?.satuan_k }}
                </div>
              </td>
              <!-- <td>
                {{ angka(rincians?.harga) }}
              </td> -->
            </tr>
          </tbody>
        </q-markup-table>
        <div class="row text-bold">
          <div class="col-10 text-right">
            Total
          </div>
          <div class="col text-center">
            <!-- Rp.  {{ angka(Math.round(store.cetaks[0]?.total)) }} -->
          </div>
        </div>
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
      <!-- <div v-else>
        <app-loading />
      </div> -->
    </q-card>
  </q-dialog>
</template>
<script setup>
import KopSurat from 'src/pages/simrs/dokumen/comppoli/KopSurat.vue'
import { useListPemesananStore } from 'src/stores/simrs/farmasi/pemesanan/listpesanan'
import { ref } from 'vue'

const fixed = ref(false)
const store = useListPemesananStore()
const angka = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

const printObj = {
  id: 'printMe',
  popTitle: ' '
}
</script>
