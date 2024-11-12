<template>
  <div class="fit">
    <div class="column full-height">
      <div class="col-auto bg-teal text-white">
        <div class="row items-center justify-between q-pa-sm">
          <div class="kiri">
            <span>EWS</span> - Early Warning Score
          </div>
          <div class="kanan">
            <q-btn dense size="sm" flat icon="icon-mat-close" @click="emits('close')" />
          </div>
        </div>
      </div>
      <div class="col full-height scroll">
        <div class="column q-pa-md" style="margin-bottom: -20px;">
          <div class="row q-col-gutter-md">
            <div class="col-12">
              <ChartPage
                :data="data.ews" :pasien="pasien"
                title="Grafik Respiration Rate (RR)"
                label-data="Respiration Rate (RR)"
                x-axis="tgl"
                :y-axis="{min: 0, max: 70, interval: 10, axisLabel: '{value} x/mnt'}"
                content="pernapasan"
                :key="pasien"
              />
            </div>
            <div class="col-12">
              <ChartPage
                :data="data.ews" :pasien="pasien"
                title="Grafik Nadi (HR)"
                label-data="Heart Rate (HR)"
                x-axis="tgl"
                :y-axis="{min: 0, max: 300, interval: 50, axisLabel: '{value} x/mnt'}"
                content="nadi"
                :key="pasien"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineAsyncComponent } from 'vue'
import useCppt from './useCppt'

const ChartPage = defineAsyncComponent(() => import('./comp/ChartPage.vue'))

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  menu: {
    type: Object,
    default: null
  }
})

const emits = defineEmits(['close'])

const { data } = useCppt(props?.pasien)

</script>
