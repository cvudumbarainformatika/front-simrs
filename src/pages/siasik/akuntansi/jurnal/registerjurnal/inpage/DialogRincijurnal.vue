<template>
  <div class="q-pa-md">
    <q-dialog
      v-model="store.dialogRinci"
      persistent
      full-width
      backdrop-filter="blur(4px)"
      transition-show="jump-up"
      transition-hide="jump-down"
    >
      <q-card style="min-width:50vw;">
        <q-card-section class="row items-center">
          <div class="column">
            <div class="f-14 text-weight-bold">
              Rincian Jurnal
            </div>
            <div class="f-14 q-pt-sm">
              {{ store.form.keterangan }}
            </div>
          </div>
          <q-space />
          <q-btn
            v-close-popup
            icon="icon-mat-clear"
            flat
            round
            dense
          />
        </q-card-section>
        <q-separator />
        <q-card-section>
          <div class="row">
            <div class="q-pa-sm q-gutter-y-md" style="width: 25%">
              <app-input-simrs
                v-model="store.form.tanggal"
                label="Tanggal"
                readonly
                outlined
                dense
              />
            </div>
            <div class="q-pa-sm q-gutter-y-md" style="width: 25%">
              <app-input-simrs
                v-model="store.form.notrans"
                label="No. Transaksi"
                readonly
                outlined
                dense
              />
            </div>
            <div class="q-pa-sm q-gutter-y-md" style="width: 50%">
              <app-input-simrs
                v-model="store.form.kegiatanblud"
                label="Kegiatan"
                readonly
                outlined
                dense
              />
            </div>
            <div class="full-width">
              <q-markup-table
                flat bordered
                wrap-cells
              >
                <thead>
                  <tr class="bg-dark text-white max-width">
                    <th>Rekening</th>
                    <th>Uraian</th>
                    <th>Debit</th>
                    <th>Kredit</th>
                  </tr>
                </thead>
                <tbody v-for="it in store.form.debit" :key="it">
                  <tr v-for="rek in it" :key="rek">
                    <td>
                      {{ rek.kode }}
                    </td>
                    <td>
                      {{ rek.uraian }}
                    </td>
                    <td>
                      {{ rek.debit }}
                    </td>
                    <td>
                      {{ rek.kredit }}
                    </td>
                  </tr>
                </tbody>
              </q-markup-table>
            </div>
            <div>
              {{ store.form.koderek }}
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script setup>
import { registerJurnal } from 'src/stores/siasik/akuntansi/jurnal/regjurnal'

// eslint-disable-next-line no-unused-vars
const store = registerJurnal()
</script>
