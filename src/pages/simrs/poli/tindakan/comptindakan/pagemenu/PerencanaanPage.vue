<template>
  <div
    class="full-height q-pa-sm"
  >
    <div class="row q-col-gutter-x-xs full-height">
      <div class="col-8 full-height">
        <PlanningPage
          :key="props.pasien"
          :pasien="props.pasien"
        />
      </div>
      <div class="col-4 full-height">
        <div v-if="pasien?.planning?.length">
          <q-card
            flat
            bordered
          >
            <div class="q-pa-md">
              <app-avatar-pasien
                :key="pasien"
                :pasien="pasien"
              />
            </div>

            <q-card-section>
              <div
                class="row no-wrap items-center"
                style="margin-top: -20px;"
              >
                <div class="col text-h6 ellipsis">
                  {{ pasien?.planning[0]?.rs4 }}
                </div>
                <!-- <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
                  <q-icon name="place" />
                  250 ft
                </div> -->
              </div>
            </q-card-section>

            <q-separator />
          </q-card>
        </div>
        <div
          v-else
          class="full-height flex-center column"
        >
          Tidak Ada
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePerencanaanPoliStore } from 'src/stores/simrs/pelayanan/poli/perencanaan'
import PlanningPage from './compperencanaan/PlanningPage.vue'
import { onMounted } from 'vue'

const store = usePerencanaanPoliStore()
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

onMounted(() => {
  store.getMasterPlanning()
  store.getMasterPoli()
})
</script>
