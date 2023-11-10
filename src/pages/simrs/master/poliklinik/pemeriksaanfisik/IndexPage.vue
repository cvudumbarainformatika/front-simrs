<template>
  <q-page

    class="column full-height"
    style="overflow: hidden;"
  >
    <q-card
      flat
      square
      class="col column q-ma-sm full-height"
    >
      <q-card-section class="col-auto">
        <div class="full-width row justify-between items-center content-between">
          <div class="bg-white col-grow">
            <div
              class="flex flex-column items-center flex-center"
            >
              <div class="col text-left">
                <div class="f-14 text-weight-bold">
                  Master Pemeriksaan Fisik
                </div>
                <div class="title-desc">
                  Master Pemeriksaan Fisik Poliklinik
                </div>
              </div>
            </div>
          </div>
          <div class="flex q-gutter-sm">
            <q-btn
              label="tambah data baru"
              color="primary"
              @click="reset"
            />
            <q-input
              label="Cari Pemeriksaan"
              outlined
              dense
              standout="bg-yellow-3"
              clearable
              style="width: 200px;"
            />
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <div
        class="col-grow full-height relative-position"
      >
        <div class="absolute full-width full-height">
          <div class="row full-height">
            <div class="col-4 full-height scroll q-pa-sm">
              <FormPemeriksaan v-if="!store.isFromImg" />
              <FormTemplate v-else />
            </div>
            <div class="col-8 full-height bg-grey scroll q-pa-sm">
              <ListsPemeriksaan
                :items="store?.items"
                @selected="store.selectedItem"
                @add-img="store.addImg"
                @delete-img="store.deleteImg"
              />
            </div>
          </div>
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script setup>
import ListsPemeriksaan from './ListsPemeriksaan.vue'
import FormPemeriksaan from './FormPemeriksaan.vue'
import { useMasterPemeriksaanFisik } from '../../../../../stores/simrs/master/poliklinik/pemeriksaanfisik'
import { onMounted } from 'vue'
import FormTemplate from './FormTemplate.vue'

const store = useMasterPemeriksaanFisik()

onMounted(() => {
  store.getData()
  store.getMasterPoli()
  store.initReset()
})

function reset() {
  store.initReset()
}
</script>
