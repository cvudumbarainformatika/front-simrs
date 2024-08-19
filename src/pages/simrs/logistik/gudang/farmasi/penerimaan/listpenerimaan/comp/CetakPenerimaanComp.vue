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
          PENERIMAAN OBAT
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
        v-if="store.loadingcetak === false"
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
              <em><b><u>  Nomor Penerimaan Obat : {{ store.cetaks[0]?.nopenerimaan }} </u></b></em>
            </div>

            <div class="row no-wrap q-mt-md bg-grey-3 full-width">
              <div class="col-2">
                No. Pemesanan
              </div>
              <div class="col-1 text-left col-md-1">
                :
              </div>
              <div class="col-4 text-left">
                {{ store.cetaks[0]?.nopemesanan }}
              </div>
              <div class="col-2">
                Tgl Penerimaan
              </div>
              <div class="col-1 text-left">
                :
              </div>
              <div class="col-4 text-left">
                {{ store.cetaks[0]?.tglpenerimaan }}
              </div>
            </div>
            <div class="row no-wrap bg-grey-3">
              <div class="col-2">
                Jenis Surat
              </div>
              <div class="col-1 text-left">
                :
              </div>
              <div class="col-4 text-left">
                {{ store.cetaks[0]?.jenissurat }}
              </div>
              <div class="col-2">
                No. Surat
              </div>
              <div class="col-1 text-left">
                :
              </div>
              <div class="col-4 text-left">
                {{ store.cetaks[0]?.nomorsurat }}
              </div>
            </div>
            <div class="row no-wrap bg-grey-3">
              <div class="col-2">
                Tgl Surat
              </div>
              <div class="col-1 text-left">
                :
              </div>
              <div class="col-4 text-left">
                {{ store.cetaks[0]?.tglsurat }}
              </div>
              <div class="col-2">
                Batas Bayar
              </div>
              <div class="col-1 text-left">
                :
              </div>
              <div class="col-4 text-left">
                {{ store.cetaks[0]?.batasbayar }}
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
                {{ store.cetaks[0]?.pihakketiga?.nama }}
              </div>
              <div class="col-2">
                Pengirim
              </div>
              <div class="col-1 text-left">
                :
              </div>
              <div class="col-4 text-left">
                {{ store.cetaks[0]?.pengirim }}
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
              <th class="text-center">
                JUMLAH
              </th>
              <th class="text-center">
                SATUAN
              </th>
              <th class="text-center">
                INFO
              </th>
              <th class="text-center">
                HARGA
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(rincians, s) in store.cetaks[0]?.penerimaanrinci"
              :key="s"
            >
              <td>{{ s + 1 }}.</td>
              <td>
                {{ rincians?.masterobat?.nama_obat }} <br>
                <div class="row text-italic f-10 text-weight-bold">
                  {{ rincians?.kdobat }}
                </div>
              </td>
              <td class="f-10 text-weight-bold">
                Pesan : {{ angka(rincians?.jml_pesan) }}<br>
                Terima : {{ angka(rincians?.jml_terima_k) }} <br>
                Seluruhnya : {{ angka(rincians?.jml_all_penerimaan) }}
              </td>
              <td class="f-10 text-weight-bold">
                Satuan Besar : {{ rincians?.satuan }}<br>
                Isi : {{ angka(rincians?.isi) }} <br>
                Satuan Kecil : {{ rincians?.satuan_kcl }}
              </td>
              <td class="f-10 text-weight-bold">
                Batch : {{ rincians?.no_batch }}<br>
                Expired : {{ rincians?.tgl_exp }}
              </td>
              <td class="f-10 text-weight-bold">
                Harga : {{ angka(rincians?.harga) }}<br>
                Diskon : {{ angka(rincians?.diskon) }}% <br>
                PPN : {{ angka(rincians?.ppn) }}% <br>
                Netto : {{ angka(rincians?.harga_netto_kecil) }}
              </td>
            </tr>
          </tbody>
        </q-markup-table>
        <div class="row text-bold">
          <div class="col-10 text-right">
            Total
          </div>
          <div class="col text-center">
            Rp.  {{ angka(Math.round(store.cetaks[0]?.total)) }}
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
      <div v-else>
        <app-loading />
      </div>
    </q-card>
  </q-dialog>
</template>
<script setup>
import KopSurat from 'src/pages/simrs/dokumen/comppoli/KopSurat.vue'
import { useListPenerimaanStore } from 'src/stores/simrs/farmasi/penerimaan/listpenerimaan'
import { ref } from 'vue'

const fixed = ref(false)
const store = useListPenerimaanStore()
const angka = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

const printObj = {
  id: 'printMe',
  popTitle: ' '
}
</script>
