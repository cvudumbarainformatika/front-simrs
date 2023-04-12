<template>
  <q-dialog
    full-width
    full-height
  >
    <q-card style="width:90vw !important;">
      <q-card-section>
        <div class="f-14 text-weight-bold">
          Form Dispen
        </div>
        <div class="title-desc">
          Input Dispenssi Pegawai
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="row q-col-qutter-md">
          <div class="col-md-6 col-sm-12 col-xs-12 col-lg-6 col-xl-6">
            <!-- searc -->
            <div>
              <q-input
                v-model="store.params.q"
                debounce="500"
                filled
                placeholder="Pencarian pegawai"
                dense
                @update:model-value="store.searchPegawai()"
              >
                <template #append>
                  <q-icon name="icon-mat-search" />
                </template>
              </q-input>
            </div>
            <!-- list -->
            <div class="q-my-md">
              <ListPegawai :key="store.pegawais" />
            </div>
          </div>
          <!-- list select -->
          <div class="col-md-6 col-sm-12 col-xs-12 col-lg-6 col-xl-6">
            <div class="q-ml-md">
              <div class="q-mb-md">
                <app-input label="alasan" />
              </div>
              <ListSelectPegawai />
              <div class="q-mt-md">
                <app-btn
                  v-if="store.list.length > 0"
                  label="Simpan"
                />
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import ListPegawai from './dispen/ListPegawai.vue'
import ListSelectPegawai from './dispen/ListSelectPegawai.vue'
import { useDispenStore } from 'src/stores/simrs/pegawai/user/libur/dispen'
import { onMounted } from 'vue'

const store = useDispenStore()
onMounted(() => {
  store.getPegawai()
})
</script>
