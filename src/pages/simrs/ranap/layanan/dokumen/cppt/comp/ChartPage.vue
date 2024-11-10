<template>
  <div class="relative-position">
    <q-card>
      <q-card-section>
        <div
          ref="line" :style="`width:100%; height: ${height}px;`"
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
// import { colors } from 'quasar'
// const { getPaletteColor } = colors

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  pasien: {
    type: Object,
    default: null
  },

  title: {
    type: String,
    default: 'Grafik CPPT'
  },
  labelData: {
    type: String,
    default: 'Respiration Rate (RR)'
  },
  xAxis: {
    type: String,
    default: 'tgl'
  },
  yAxis: {
    type: Object,
    default: () => {
      return {
        min: 0,
        max: 80,
        interval: 10,
        axisLabel: '{value} x/mnt'
      }
    }
  },
  content: {
    type: String,
    default: 'pernapasan'
  },
  height: {
    type: Number,
    default: 400
  }
})

const line = ref(null)

onMounted(() => {
  setTimeout(() => {
    chartInit()
  }, 100)
})

const chartInit = () => {
  const echart = echarts.init(line.value)
  if (line.value !== null) {
    const option = {
      title: {
        text: props?.title
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {},
      toolbox: {
        show: true,
        feature: {
          dataZoom: {
            yAxisIndex: 'none'
          },
          dataView: { readOnly: false },
          magicType: { type: ['line', 'bar'] },
          restore: {},
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: props?.data?.map(a => a[props?.xAxis]) ?? []
      },
      yAxis: {
        type: 'value',
        min: props?.yAxis?.min ?? 0,
        max: props?.yAxis?.max ?? 50,
        interval: props?.yAxis?.interval ?? 5,
        axisLabel: {
          // formatter: '{value} °C'
          formatter: props?.yAxis?.axisLabel
        }
      },
      series: [
        // {
        //   name: 'Score 0',
        //   data: (new Array(props?.data?.length).fill(20)),
        //   type: 'line',
        //   smooth: true,
        //   showSymbol: false,
        //   lineStyle: {
        //     width: 0
        //   },
        //   areaStyle: {
        //     opacity: 0.8,
        //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        //       {
        //         offset: 0,
        //         color: getPaletteColor('white')
        //       },
        //       {
        //         offset: 1,
        //         color: getPaletteColor('white')
        //       }
        //     ])
        //   }
        // },
        // {
        //   name: 'Score 1',
        //   data: (new Array(props?.data?.length).fill(12)),
        //   type: 'line',
        //   smooth: true,
        //   showSymbol: false,
        //   lineStyle: {
        //     width: 0
        //   },
        //   areaStyle: {
        //     opacity: 0.8,
        //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        //       {
        //         offset: 0,
        //         color: getPaletteColor('yellow-1')
        //       },
        //       {
        //         offset: 1,
        //         color: getPaletteColor('yellow')
        //       }
        //     ])
        //   }
        // },
        // {
        //   name: 'Score 3',
        //   data: (new Array(props?.data?.length).fill(8)),
        //   type: 'line',
        //   smooth: true,
        //   showSymbol: false,
        //   lineStyle: {
        //     width: 0
        //   },
        //   areaStyle: {
        //     opacity: 0.8,
        //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        //       {
        //         offset: 0,
        //         color: getPaletteColor('red')
        //       },
        //       {
        //         offset: 1,
        //         color: getPaletteColor('red')
        //       }
        //     ])
        //   }
        // },

        {
          name: props?.labelData,
          type: 'line',
          data: props?.data?.map(a => a[props?.content]) ?? [],
          markPoint: {
            data: [
              { type: 'max', name: 'Max' },
              { type: 'min', name: 'Min' }
            ]
          },
          markLine: {
            data: [
              {
                type: 'average',
                name: 'Rata-rata ' + props?.labelData,
                label: {
                  formatter: '{b} : {c}',
                  position: 'middle'
                }
              }
            ]
          }
        }

      ]
    }
    echart.setOption(option)
  }
}
</script>
