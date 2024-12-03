<template>
  <div>
    <div class="row justify-between items-center">
      <div class="col-auto">
        <div class="row items-center q-pa-sm">
          <div class="col-auto">
            <q-input
              v-model="store.params.q"
              placeholder="Cari Pasien ... Enter"
              dense
              outlined
              dark
              debounce="400"
              color="white"
              style="min-width:250px"
              @keyup.enter.stop="adaInput"
            >
              <template
                v-if="store.params.q"
                #append
              >
                <q-icon
                  name="icon-mat-close"
                  size="xs"
                  class="cursor-pointer"
                  @click.stop.prevent="()=> {
                    store.params.q = null
                    adaInput()
                  }"
                />
              </template>
              <template #prepend>
                <q-icon name="icon-mat-search" />
              </template>
            </q-input>
          </div>

          <!-- <div class="col-auto">
            <q-select
              v-model="store.periode"
              dense
              outlined
              dark
              color="white"
              :options="store.periods"
              label="Periode"
              class="q-ml-sm"
              emit-value
              map-options
              style="min-width: 150px;"
              @update:model-value="store.gantiPeriode"
            />
          </div> -->

          <div class="col-auto flex items-center">
            <q-select
              v-model="store.params.status"
              dense
              outlined
              dark
              color="white"
              :options="store.statuses"
              label="Status"
              class="q-ml-sm"
              emit-value
              map-options
              style="min-width: 150px;"
              @update:model-value="(val)=> {
                // console.log('header status val ', val);
                store.params.page = 1
                store.getData()
              }"
            />
            <div class="q-ml-sm" v-if="store.params.status === 'Pulang'">
              <app-input-date
                :model="store.params.from"
                label="Tanggal"
                icon="icon-mat-event"
                outlined
                dark
                @set-model="val=>{
                  store.params.from=val
                  store.getData()
                }"
              />
            </div>
          </div>
          <div class="col-auto">
            <q-select
              v-model="store.ruangan"
              dense
              outlined
              dark
              color="white"
              :options="store.ruangans"
              label="Ruangan"
              class="q-ml-sm"
              emit-value
              map-options
              option-value="groups"
              option-label="groups_nama"
              style="min-width: 150px;"
              @update:model-value="store.gantiRuangan"
            />
          </div>
        </div>
      </div>
      <div class="col-auto q-mr-sm">
        <div class="row">
          <!-- refresh Ids -->
          <q-btn

            unelevated
            round
            size="sm"
            icon="icon-mat-refresh"
            @click="store.refresh()"
          >
            <q-tooltip
              class="primary"
              :offset="[10, 10]"
            >
              Refresh Table
            </q-tooltip>
          </q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePengunjungRanapStore } from 'src/stores/simrs/ranap/pengunjung'
import { onMounted } from 'vue'
const store = usePengunjungRanapStore()

function adaInput (val) {
  // console.log('ada input ', val)
  // store.params.q = val
  store.params.page = 1
  if (!store.loading) store.getData()
}
onMounted(() => {
  Promise.all([
    // store.initReset(),
    store.getJenisKasus(),
    store.getRuangan().then(() => store.initReset())
  ])
})
</script>
