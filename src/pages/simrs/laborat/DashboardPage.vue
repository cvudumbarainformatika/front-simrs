<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <div class="col-md-12 col-lg-12 col-xl-12 col-xs-12">
        <div class="tempat-widget">
          <div class="row q-col-gutter-md">
            <div class="col-md-2 col-lg-2 col-xl-2 col-xs-12">
              <WidgetComp
                :nilai="parseInt(store.labHariIni) + parseInt(store.labLuarHariIni)"
                :loading="store.loading"
                subtitle="Total Pemeriksaan"
                subtitle2="Seluruh Item Pemeriksaan"
              />
            </div>
            <div class="col-md-2 col-lg-2 col-xl-2 col-xs-12">
              <WidgetComp
                color="negative"
                icon="icon-mat-poll"
                :nilai="store.labLuarHariIni"
                subtitle="Laborat Luar"
                subtitle2="Item Pemeriksaan Laborat Luar"
                :loading="store.loading"
              />
            </div>
            <div class="col-md-2 col-lg-2 col-xl-2 col-xs-12">
              <WidgetComp
                color="secondary"
                icon="icon-mat-poll"
                :nilai="store.labHariIni"
                subtitle="Laborat Dalam"
                subtitle2="Item Pemeriksaan Laborat dlm"
                :loading="store.loading"
              />
            </div>
            <div class="col-md-2 col-lg-2 col-xl-2 col-xs-12">
              <WidgetComp
                color="dark"
                :nilai="parseInt(store.transLabHariIni) + parseInt(store.transLabLuarHariIni)"
                :loading="store.loading"
                subtitle="Total Transaksi Pasien"
                subtitle2="Seluruh Transaksi"
              />
            </div>
            <div class="col-md-2 col-lg-2 col-xl-2 col-xs-12">
              <WidgetComp
                color="warning"
                icon="icon-mat-person"
                :nilai="store.transLabLuarHariIni"
                subtitle="Pasien Laborat Luar"
                subtitle2="Transaksi Laborat Luar"
                :loading="store.loading"
              />
            </div>
            <div class="col-md-2 col-lg-2 col-xl-2 col-xs-12">
              <WidgetComp
                color="accent"
                icon="icon-mat-person"
                :nilai="store.transLabHariIni"
                subtitle="Pasien Laborat dalam"
                subtitle2="Transaksi Laborat Dalam"
                :loading="store.loading"
              />
            </div>
            <div class="col-md-6 col-lg-6 col-xl-6 col-xs-12">
              <ChartsLine
                :items="store.itemLabs"
                text="Pemeriksaan Laboratorium (dalam)"
                title-left="Jumlah Pemeriksaan"
              />
            </div>
            <div class="col-md-6 col-lg-6 col-xl-6 col-xs-12">
              <ChartsLine
                :items="store.itemLabLuars"
                text="Pemeriksaan Laboratorium (luar)"
                title-left="Jumlah Pemeriksaan"
              />
            </div>
            <div class="col-md-12 col-lg-12 col-xl-12 col-xs-12">
              <ChartLabelLine
                :items="store.itemLabs"
                :items2="store.itemLabLuars"
                text="Pasien Pemeriksaan Laborat (Berdasarkan Nota)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
// import { dateDbFormat } from 'src/modules/formatter'
import WidgetComp from 'src/pages/simrs/laborat/dashboard/WidgetComp.vue'
import { useDashboardLaborat } from 'src/stores/simrs/penunjang/laborat/dashboard'
import { onMounted } from 'vue'
import ChartsLine from './dashboard/ChartsLine.vue'
import ChartLabelLine from './dashboard/ChartLabelLine.vue'

const store = useDashboardLaborat()

// const labToday = computed(() => {
//   let jml = 0
//   const today = dateDbFormat(new Date())
//   const items = store.itemLabs
//   if (items.length > 0) jml = items.filter(item => item.x === today)[0].y
//   return jml
// })
// const labLuarToday = computed(() => {
//   let jml = 0
//   const today = dateDbFormat(new Date())
//   const items = store.itemLabLuars
//   if (items.length > 0) jml = items.filter(item => item.x === today)[0].y
//   return jml
// })

onMounted(() => {
  store.getLaboratDashboards()
})
</script>
