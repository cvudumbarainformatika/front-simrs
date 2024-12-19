<template>
  <q-card
    flat
    bordered
    square
    class="full-height bg-teal-2"
    style="overflow: hidden;"
  >
    <q-bar
      class="bg-teal text-white z-top"
      style="width: inherit;"
    >
      <div class="f-12">
        Data Obat Yang Sudah DiResepkan
      </div>
      <q-space />
    </q-bar>

    <q-card-section
      style="padding:0"
      class="full-height bg-grey"
    >
      <div
        v-if="loadingaja"
        class="column full-height flex-center"
      >
        <div class="text-white">
          Harap Tunggu .....
        </div>
        <div class="text-white">
          Sinkron Data Ke DATABASE
        </div>
      </div>
      <div
        v-if="store?.listresep?.length <= 0"
        class="column full-height flex-center"
      >
        <div class="text-white">
          Belum Ada data tersimpan
        </div>
      </div>
      <q-scroll-area
        v-else
        style="height:calc(100% - 32px);"
      >
        <q-list
          class="bg-white"
          separator
        >
          <transition-group name="list">
            <q-item
              v-for="(item , n) in store?.listresep"
              :key="n"
              class="list-move"
            >
              <q-item-section>
                <div class="row">
                  <div class="col-2">
                    Nama Obat
                  </div>
                  <div class="col-1">
                    =
                  </div>
                  <div class="col-9 text-bold q-pb-sm">
                    <q-badge outline color="orange">
                      {{ item?.nama_obat }}
                    </q-badge>
                  </div>
                </div>
                <div class="row">
                  <div class="col-2">
                    Jumlah
                  </div>
                  <div class="col-1">
                    =
                  </div>
                  <div class="col-3 text-bold">
                    {{ item?.jumlah }} {{ item?.satuan_k }}
                  </div>
                  <div class="col-2">
                    Aturan
                  </div>
                  <div class="col-1">
                    =
                  </div>
                  <div class="col-3 text-bold">
                    <q-badge outline color="red">
                      {{ item?.aturan }}
                    </q-badge>
                  </div>
                </div>
                <div class="row">
                  <div class="col-2">
                    Konsumsi
                  </div>
                  <div class="col-1">
                    =
                  </div>
                  <div class="col-8 text-bold">
                    <q-badge color="primary">
                      {{ item?.konsumsi }}
                    </q-badge>
                  </div>
                </div>
              </q-item-section>
              <q-item-section
                side
              >
                <div class="q-gutter-sm">
                  <q-btn
                    flat
                    round
                    size="sm"
                    icon="icon-mat-send"
                    color="orange"
                    :loading="store.loading"
                    @click="tosimpan(item)"
                  />
                </div>
              </q-item-section>
            </q-item>
          </transition-group>
        </q-list>
      </q-scroll-area>
    </q-card-section>
  </q-card>
  <FormDialogPemakaianObatPage :satuan="store.satuanobat" :pasien="props.pasien" />
</template>
<script setup>
import { usePemakaianObatStore } from 'src/stores/simrs/igd/pemakaianobat'
import FormDialogPemakaianObatPage from './FormDialogPemakaianObatPage.vue'

const store = usePemakaianObatStore()

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  satuan: {
    type: Object,
    default: null
  },
  loadingaja: {
    type: Boolean,
    default: false
  }
})

function tosimpan (val) {
  store.namaobat = val?.nama_obat
  store.form.kdobat = val?.kdobat
  store.form.noresep = val?.noresep
  store.fixed = true
}

store.cariresep(props.pasien)
</script>
