<template>
  <q-dialog
    persistent
    :maximized="true"
    transition-show="slide-up"
    transition-hide="slide-down"
    @show="onShow"
  >
    <q-card class="bg-primary text-white fullscreen column" style="overflow: hidden;">
      <div class="column fit">
        <q-bar class="col-auto q-pa-xs">
          <q-space />
          <q-btn dense flat icon="icon-mat-close" v-close-popup>
            <q-tooltip class="bg-white text-primary">
              Close
            </q-tooltip>
          </q-btn>
        </q-bar>

        <div class="col full-height">
          <div class="column full-height">
            <div class="col-auto">
              <div class="flex items-center justify-between q-pa-md">
                <q-input dense standout="bg-blue text-white" dark placeholder="Cari" />
                <div>Data Ruangan {{ item?.nama }}</div>
              </div>
              <q-separator dark />
            </div>

            <div v-if="store.loading" class="col full-height">
              <div class="column full-height flex-center bg-grey-4 text-dark">
                <q-spinner color="primary" size="3em" />
              </div>
            </div>

            <div v-else class="col full-height">
              <div v-if="store.ruangans.length" class="full-height scroll bg-grey-4">
                <q-card dark separator bordered class="q-ma-xs" v-for="(data, n) in store.ruangans" :key="n" :class="data?.satset_uuid?'bg-primary':'bg-negative'">
                  <q-item clickable v-ripple @click="store.setRuangan(data, data?.gruper)">
                    <q-item-section avatar>
                      <q-icon
                        color="grey-4"
                        name="icon-mat-display_settings"
                      />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ data?.uraian }}</q-item-label>
                      <q-item-label caption class="text-grey-4">
                        Gedung {{ data?.gedung }} Lantai {{ data?.lantai }} Ruang {{ data?.ruang }}
                      </q-item-label>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ data?.satset_uuid ? 'Terkoneksi Satu Sehat' : 'Belum Terkoneksi' }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-btn outline color="grey-4" round icon="icon-mat-send" size="sm" />
                    </q-item-section>
                  </q-item>
                </q-card>
              </div>
              <div v-else class="full-height bg-grey-4">
                <div class="column full-height flex-center text-dark">
                  <div class="">
                    Maaf ... Data Ruangan Belum Ter SET
                  </div>
                  <div>Harap Cek grup di databese ruangan</div>
                </div>
              </div>
            </div>

            <!-- END COLUMN -->
          </div>
        </div>
      </div>
    </q-card>

    <!-- dialog Form -->
    <DialogFormRuangan v-model="store.dialogFormRuangan" />
  </q-dialog>
</template>

<script setup>
// import { notifErrVue } from 'src/modules/utils'
import { useLocationSatsetStore } from 'src/stores/satset/location'
import { defineAsyncComponent } from 'vue'

const DialogFormRuangan = defineAsyncComponent(() => import('./DialogFormRuangan.vue'))

const props = defineProps({
  item: {
    type: Object,
    default: null
  }
})

const store = useLocationSatsetStore()

const onShow = () => {
  store.getRuanganByGroup(props.item?.gruper)
}

</script>
