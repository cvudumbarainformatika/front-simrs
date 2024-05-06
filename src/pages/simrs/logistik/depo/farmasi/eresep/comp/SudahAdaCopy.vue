<template>
  <q-dialog
    persistent
  >
    <q-card style="min-width: 800px;">
      <q-bar class="bg-primary">
        <q-space />

        <q-btn
          v-close-popup
          dense
          flat
          color="white"
          icon="icon-mat-close"
          @click="store.closeCopy()"
        >
          <q-tooltip class="bg-white text-primary">
            Close
          </q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section>
        <div class="row bg-red text-white q-col-gutter-sm">
          <div class="col-4">
            Nomor Resep
          </div>
          <div class="col-4">
            Nomor Resep Asal
          </div>
          <div class="col-4">
            Tanggal Copy Resep
          </div>
        </div>
        <div class="row q-col-gutter-sm">
          <div class="col-4">
            {{ store.adaCopys?.noresep }}
          </div>
          <div class="col-4">
            {{ store.adaCopys?.noresep_asal }}
          </div>
          <div class="col-4">
            {{ dateFullFormat(store.adaCopys?.tgl) }}
          </div>
        </div>
        <div v-if="store.adaCopys?.rincian?.length">
          <div class="row bg-yellow text-red q-pa-xs q-mt-sm">
            Non Racikan
          </div>
          <div class="row bg-dark text-white q-pa-xs q-my-sm q-ml-md">
            <div
              class="col-auto"
              style="width: 5%;"
            >
              No
            </div>
            <div class="col-7">
              Nama Obat
            </div>
            <div class="col-4">
              Jumlah Obat
            </div>
          </div>
          <div
            v-for="(rinc,i) in store.adaCopys?.rincian"
            :key="i"
            class="row q-px-xs q-ml-md"
            :class="i%2===1?'bg-grey-4':''"
          >
            <div
              class="col-auto"
              style="width: 5%;"
            >
              {{ i+1 }}
            </div>
            <div class="col-7">
              {{ rinc?.mobat?.nama_obat }}
            </div>
            <div class="col-4">
              {{ rinc?.jumlah }}
            </div>
          </div>
        </div>
        <div v-if="store.adaCopys?.listRacikan.length">
          <div class="row bg-orange text-white q-pa-xs q-mt-sm">
            Racikan
          </div>
          <div class="row bg-grey-9 text-white q-pa-xs q-mt-sm q-ml-md">
            <div
              class="col-auto"
              style="width: 5%;"
            >
              No
            </div>
            <div class="col-4">
              Nama Racikan
            </div>
          </div>
          <div
            v-for="(item,i) in store.adaCopys?.listRacikan"
            :key="i"
            :class="i%2===1?'bg-grey-4 q-ml-md':'q-ml-md'"
          >
            <div class="row q-px-xs ">
              <div
                class="col-auto"
                style="width: 5%;"
              >
                {{ i+1 }}
              </div>
              <div class="col-4">
                {{ item?.namaracikan }}
              </div>
            </div>

            <div v-if="item?.rincian?.length">
              <div class="row">
                <div class="col-1" />
                <div class="col-11">
                  <div class="row bg-blue text-white q-pa-xs q-mt-sm f-10">
                    Rincian Obat
                  </div>
                  <div class="row bg-dark text-white q-pa-xs q-my-sm f-10">
                    <div
                      class="col-auto"
                      style="width: 5%;"
                    >
                      No
                    </div>
                    <div class="col-7">
                      Nama Obat
                    </div>
                    <div class="col-4">
                      Jumlah Obat
                    </div>
                  </div>
                  <div
                    v-for="(rinc,j) in item?.rincian"
                    :key="j"
                    class="row q-px-xs"
                    :class="j%2===1?'bg-grey-4':'bg-white'"
                  >
                    <div
                      class="col-auto"
                      style="width: 5%;"
                    >
                      {{ j+1 }}
                    </div>
                    <div class="col-7">
                      {{ rinc?.mobat?.nama_obat }}
                    </div>
                    <div class="col-4">
                      {{ rinc?.jumlah }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { dateFullFormat } from 'src/modules/formatter'
import { useEResepDepoFarmasiStore } from 'src/stores/simrs/farmasi/eresep/eresep'

const store = useEResepDepoFarmasiStore()
</script>
