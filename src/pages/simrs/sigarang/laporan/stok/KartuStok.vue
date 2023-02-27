<template>
  <q-dialog>
    <app-card
      style="width: 900px; max-width: 85vw;"
      title="Kartu Stok"
      desc="Infromasi Pergerakan Barang"
    >
      <template #content>
        <div
          class="row justify-center cursor-pointer q-mt-sm q-mb-sm"
          clickable
        >
          <div class="col-12 text-center">
            Periode :
            <q-badge>
              {{ store.paramsDetail.from !== '' ? dateFullFormat(store.paramsDetail.from) : '-' }}
            </q-badge>
            sampai
            <q-badge>
              {{ store.paramsDetail.to !== '' ? dateFullFormat(store.paramsDetail.to) : '-' }}
            </q-badge>
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <div class="text-center">
                <q-date
                  v-model="store.paramsDetail"
                  range
                  @update:model-value="store.setTanggalKartuStok"
                >
                  <div class="row items-center justify-end q-gutter-sm">
                    <q-btn
                      v-close-popup
                      label="Cancel"
                      color="primary"
                      flat
                    />
                    <q-btn
                      v-close-popup
                      label="OK"
                      color="primary"
                      flat
                    />
                    <!-- @click="save" -->
                  </div>
                </q-date>
              </div>
            </q-popup-proxy>
          </div>
        </div>
        <app-loading v-if="store.loadingKartuStok" />
      </template>
    </app-card>
  </q-dialog>
</template>
<script setup>
import { dateFullFormat } from 'src/modules/formatter'
import { useStokStore } from 'src/stores/simrs/logistik/sigarang/laporan/stok/stok'

const store = useStokStore()
// store.getDataByBarang()
</script>
