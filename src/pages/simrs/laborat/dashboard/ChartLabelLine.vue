<template>
  <q-card>
    <q-card-section>
      <div id="chart">
        <apexchart
          type="line"
          height="400"
          :options="chartOptions"
          :series="series"
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
// import { humanDate } from 'src/modules/formatter'
import { computed, ref } from 'vue'

const props = defineProps({
  name: {
    type: String,
    default: 'Laborat'
  },
  name2: {
    type: String,
    default: 'Laborat Luar'
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
  items2: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const mapping = computed(() => {
  return props.items.map(a => a.z)
})
const mapping2 = computed(() => {
  return props.items2.map(a => a.z)
})

const arrx = computed(() => {
  const arr1 = props.items.map(a => a.x)
  const arr2 = props.items2.map(a => a.x)
  return arr1.concat(arr2)
})

const series = ref([
  {
    name: props.name,
    data: mapping
  },
  {
    name: props.name2,
    data: mapping2
  }

])
const chartOptions = ref({
  chart: {
    type: 'line',
    // stacked: false,
    height: 400,
    dropShadow: {
      enabled: true,
      color: '#000',
      top: 18,
      left: 7,
      blur: 10,
      opacity: 0.2
    },
    toolbar: {
      show: false
    }
  },

  colors: ['#77B6EA', '#545454'],
  dataLabels: {
    enabled: true
  },
  stroke: {
    curve: 'smooth'
  },
  title: {
    text: props.text,
    align: 'left'
  },

  grid: {
    borderColor: '#e7e7e7',
    row: {
      colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
      opacity: 0.5
    }
  },
  markers: {
    size: 1
  },
  xaxis: {
    categories: arrx,
    title: {
      text: 'Bulan Ini'
    }
  },
  yaxis: {
    title: {
      text: 'Jumlah Pemeriksaan'
    },
    min: 0,
    max: 300
  },

  legend: {
    position: 'top',
    horizontalAlign: 'right',
    floating: true,
    offsetY: -25,
    offsetX: -5
  }
})

</script>
