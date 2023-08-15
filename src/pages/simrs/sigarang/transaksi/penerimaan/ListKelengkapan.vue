<template>
  <div>
    <q-card>
      <q-card-section class="items-center justify-center">
        <div class="row q-col-gutter-md">
          <div class="col-5">
            <app-autocomplete-new
              v-model="kelengkapan.temp.pemesanan"
              label="cari pemesanan"
              option-value="nomor"
              option-label="nomor"
              autocomplete="nomor"
              outlined
              :source="kelengkapan.penerimaans"
              :loading="kelengkapan.loading"
              @on-select="kelengkapan.pemesananSelected"
            />
          </div>
          <div
            v-if="kelengkapan.items"
            class="col-7"
          >
            <q-list>
              <div
                v-for="(item,i) in kelengkapan.items"
                :key="i"
              >
                <q-item
                  v-ripple
                  class="menu cursor-pointer"
                >
                  <q-item-section
                    @click="penerimaanSelected(item)"
                  >
                    <!-- @click="kelengkapan.penerimaanSelected(item)" -->
                    <q-chip
                      square
                      color="primary"
                      text-color="white"
                      dense
                      style="flex-direction: column;"
                    >
                      {{ item.no_penerimaan }}
                    </q-chip>
                  </q-item-section>
                </q-item>
              </div>
            </q-list>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script setup>
import { useKelengkapanSuratPenerimaan } from 'src/stores/simrs/logistik/sigarang/transaksi/penerimaan/kelengkapan'

const kelengkapan = useKelengkapanSuratPenerimaan()
const penerimaanSelected = val => {
  kelengkapan.form = val
  // console.log(val)
}
</script>
