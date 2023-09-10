<template>
  <q-card
    flat
    square
    bordered
    class="column full-height"
  >
    <div class="col-auto">
      <q-bar
        class="bg-teal text-white q-pa-sm"
        style="min-height: 45px;"
      >
        <div class="f-12">
          Table Tindakan
        </div>
        <q-space />
        <div class="q-py-xs">
          <q-select
            v-model="store.notaTindakan"
            outlined
            standout="bg-yellow-3"
            bg-color="white"
            dense
            :options="store.notaTindakans"
            :display-value="`NOTA: ${store.notaTindakan==='' || store.notaTindakan === 'BARU'? 'BARU': store.notaTindakan}`"
            style="min-width: 200px;"
          />
        </div>
      </q-bar>
    </div>
    <div class="col-grow">
      <div class="full-height bg-grey">
        <q-scroll-area style="height:calc(100% - 1px)">
          <q-list
            separator
            class="bg-white"
          >
            <q-item
              v-for="n in 2"
              :key="n"
            >
              <q-item-section>
                <q-item-label
                  lines="2"
                  class="f-12"
                >
                  <span class="">Tindakan & Jumlah</span> : ....
                </q-item-label>
                <q-item-label lines="2">
                  <span class="">Keterangan</span> : ....
                </q-item-label>
                <q-item-label lines="2">
                  <span class="">Pelaksana</span> : ....
                </q-item-label>
                <q-item-label lines="2">
                  <span class="">Tanggal</span> : ....
                </q-item-label>
                <!-- <q-item-label lines="2">
                  <span class="">Subtotal</span> : ....
                </q-item-label> -->
              </q-item-section>

              <q-item-section
                side
                top
              >
                <q-item-label
                  lines="1"
                >
                  <span class="text-orange">Tanggal</span>
                </q-item-label>

                <q-item-label>
                  <span class="text-orange">SubTotal</span>
                </q-item-label>
                <div class="row q-my-sm">
                  <q-btn
                    flat
                    round
                    size="sm"
                    icon="icon-mat-edit"
                  />
                  <q-btn
                    flat
                    round
                    size="sm"
                    icon="icon-mat-delete"
                    color="negative"
                  />
                </div>
              </q-item-section>
            </q-item>
            <q-separator />
          </q-list>
        </q-scroll-area>
      </div>
    </div>
  </q-card>
</template>

<script setup>
import { useLayananPoli } from 'src/stores/simrs/pelayanan/poli/layanan'

const store = useLayananPoli()
</script>
