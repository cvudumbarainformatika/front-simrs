<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <div class="col-md-6 col-lg-6 col-xl-6 col-xs-12">
        <div class="tempat-widget">
          <div class="row q-col-gutter-md">
            <div class="col-md-4 col-lg-4 col-xl-4 col-xs-12">
              <WidgetComp
                :nilai="200"
                :loading="store.loading"
              />
            </div>
            <div class="col-md-4 col-lg-4 col-xl-4 col-xs-12">
              <WidgetComp
                color="negative"
                icon="icon-mat-poll"
                :nilai="100"
                subtitle="Laborat Luar"
                :loading="store.loading"
              />
            </div>
            <div class="col-md-4 col-lg-4 col-xl-4 col-xs-12">
              <WidgetComp
                color="secondary"
                icon="icon-mat-poll"
                :nilai="100"
                subtitle="Laborat Dalam"
                :loading="store.loading"
              />
            </div>
          </div>
        </div>
        <div class="tempat-charts q-mt-md">
          <div class="row q-col-gutter-md">
            <div class="col-md-12 col-lg-12 col-xl-12 col-xs-12">
              <ChartsLine
                :items="store.itemLabs"
                text="Pemeriksaan Laboratorium (dalam)"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-lg-6 col-xl-6 col-xs-12">
        <ChartsLine
          :items="store.itemLabLuars"
          text="Pemeriksaan Laboratorium (luar)"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import WidgetComp from 'src/pages/simrs/laborat/dashboard/WidgetComp.vue'
import { useDashboardLaborat } from 'src/stores/simrs/penunjang/laborat/dashboard'
import { onMounted } from 'vue'
import ChartsLine from './dashboard/ChartsLine.vue'

const store = useDashboardLaborat()

onMounted(() => {
  store.getLaboratDashboards()
})
</script>
