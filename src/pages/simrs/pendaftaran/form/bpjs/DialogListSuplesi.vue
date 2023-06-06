<template>
  <q-dialog>
    <q-card style="min-width:75vw;">
      <q-card-section>
        <div class="f-14 text-weight-bold">
          Suplesi
        </div>
        <div class="title-desc q-mb-md">
          Daftar Nomor Suplesi
        </div>
        <div v-if="!store.listSuplesi.length">
          <app-loading v-if="store.loadingSuplesi" />
          <app-no-data v-else />
        </div>
        <div v-if="store.listSuplesi.length">
          <div class="row no-wrap justify-center items-center q-col-gutter-sm text-weight-bold q-mb-sm">
            <div class="col-2">
              <div class="row q-col-gutter-sm">
                <div class="col-2">
                  No
                </div>
                <div class="col-10">
                  No Register
                </div>
              </div>
            </div>
            <div class="col-2">
              No. SEP
            </div>
            <div class="col-2">
              No. SEP Awal
            </div>
            <div class="col-1">
              No. Surat Jaminan
            </div>
            <div class="col-2">
              Tgl Kejadian
            </div>
            <div class="col-2">
              Tgl Sep
            </div>
            <div class="col-1">
              aksi
            </div>
          </div>
          <div
            v-for="(list,i) in store.listSuratKontrols"
            :key="i"
            class="row no-wrap justify-center items-center q-col-gutter-sm q-mb-xs"
          >
            <div class="col-2">
              <div class="row q-col-gutter-sm">
                <div class="col-2">
                  {{ i+1 }}
                </div>
                <div class="col-10">
                  {{ list.noRegister?list.noRegister:'-' }}
                </div>
              </div>
            </div>
            <div class="col-2">
              {{ list.noSep?list.noSep:'-' }}
            </div>
            <div class="col-2">
              {{ list.noSepAwal?list.noSepAwal:'-' }}
            </div>
            <div class="col-1">
              {{ list.noSuratJaminan?list.noSuratJaminan:'-' }}
            </div>
            <div class="col-2">
              {{ list.tglKejadian?dateFullFormat(list.tglKejadian):'-' }}
            </div>
            <div class="col-2">
              {{ list.tglSep?dateFullFormat(list.tglSep):'-' }}
            </div>
            <div class="col-1">
              <app-btn
                label="pilih"
                @click="pilihSuplesi(list)"
              />
            </div>
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <q-separator />

      <q-separator />
    </q-card>
  </q-dialog>
</template>
<script setup>
import { dateFullFormat } from 'src/modules/formatter'
import { useRegistrasiPasienBPJSStore } from 'src/stores/simrs/pendaftaran/form/bpjs/registrasibpjs'

const store = useRegistrasiPasienBPJSStore()
// surat kontrol
function pilihSuplesi(val) {
  store.form.nosuplesi = val.noSep
  store.tampilSuplesi = false
}
</script>
