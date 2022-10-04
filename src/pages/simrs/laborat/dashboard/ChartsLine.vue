<template>
  <q-card>
    <q-card-section>
      <div id="chart">
        <apexchart
          type="area"
          height="350"
          :options="chartOptions"
          :series="series"
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { humanDate } from 'src/modules/formatter'
import { computed, ref } from 'vue'

const props = defineProps({
  name: {
    type: String,
    default: 'Pemeriksaan'
  },
  text: {
    type: String,
    default: 'Pemeriksaan Movement Stat'
  },
  titleLeft: {
    type: String,
    default: 'Jumlah'
  },
  items: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const mapping = computed(() => {
  return props.items.map(a => ([a.x, a.y]))
})

const series = ref([{
  name: props.name,
  data: mapping
}])
const chartOptions = ref({
  chart: {
    type: 'area',
    stacked: false,
    height: 350,
    zoom: {
      type: 'x',
      enabled: true,
      autoScaleYaxis: true
    },
    toolbar: {
      autoSelected: 'zoom'
    }
  },

  dataLabels: {
    enabled: false
  },
  markers: {
    size: 0
  },
  title: {
    text: props.text,
    align: 'left'
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      inverseColors: false,
      opacityFrom: 0.5,
      opacityTo: 0,
      stops: [0, 90, 100]
    }
  },
  yaxis: {
    // labels: {
    //   formatter: function (val) {
    //     return (val / 100).toFixed(0)
    //   }
    // },
    title: {
      text: props.titleLeft
    }
  },
  xaxis: {
    type: 'datetime',
    labels: {
      formatter: function (val) {
        return humanDate(val)
      }
    }
  },
  tooltip: {
    shared: false,
    x: {
      formatter: function (val) {
        return humanDate(val)
      }
    }
  }
})

</script>
