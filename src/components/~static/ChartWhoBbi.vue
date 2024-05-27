<template>
  <q-card class="relative-position" :style="{ height: height, width: width }">
    <div
      v-if="calculateAgeInMonths(props?.pasien?.tgllahir ?? null) < 24 || calculateAgeInMonths(props?.pasien?.tgllahir ?? null) > 240"
      class="fit full-height column flex-center" style="width: 100%; min-height: 600px;"
    >
      <div class="f-14 text-weight-bold">
        Maaf ... Halaman ini Hanya Untuk Pasien Usia 2 - 20 Tahun
      </div>
    </div>
    <div v-else class="fit relative-position">
      <div
        class="fit"
        ref="line"
        style="min-width:500px; min-height:600px;"
      />
      <!-- <div style="margin-bottom: 300px;" /> -->
    </div>
  </q-card>
</template>

<script setup>
import * as echarts from 'echarts'
import { ref, onMounted, watchEffect } from 'vue'
// import { usePediatriStore } from 'src/stores/simrs/pelayanan/poli/pediatri'

// import mboh from './mboh.json'
// import { ref } from 'vue'

const props = defineProps({
  pasien: {
    type: Object, default: null
  },
  draft: {
    type: Object, default: null
  },
  width: {
    type: String,
    default: '544px'
  },
  height: {
    type: String,
    default: '644px'
  }
})
// const store = usePediatriStore()

// const gender = computed(() => {
//   const x = props.pasien?.kelamin ?? null
//   return x === 'Perempuan' ? 'Girl' : 'Boy'
// })

const line = ref(null)

onMounted(() => {
  console.log(props.pasien)
  setTimeout(() => {
    chartInit()
  }, 100)
})

function chartInit () {
  const echart = echarts.init(line.value)
  if (line.value !== null) {
    const option = {
      // color: ['red', 'orange', 'brown', 'black', 'green', 'purple', 'yellow', 'blue'],
      // color: ['#DEAC80', '#006699', '#4cabce', '#8c564b', '#000', '#2f4554', '#61a0a8', '#d48265'],
      toolbox: {
        show: true,
        top: '3%',
        right: '3%',
        feature: {
          // dataZoom: {
          //   yAxisIndex: 'none'
          // },
          dataView: {
            readOnly: false
          },
          // magicType: {
          //   type: ['line', 'bar']
          // },
          restore: {},
          saveAsImage: {}
        }
      },
      dataZoom: {
        start: 0,
        type: 'slider',
        disabled: false,
        bottom: '4%'
      },

      // dataZomm: [
      //   { xAxisIndex: [0], type: 'slider', start: 0, bottom: '4%', disable: false },
      //   { yAxisIndex: 0 }
      // ],
      title: [
        {
          text: `Nama : ${props?.pasien?.nama_panggil ?? 'Pasien'}`,
          subtext: `Record : ${props?.pasien?.noreg ?? '-'}`,
          left: '2%',
          top: 10,
          itemGap: 1,
          textStyle: {
            fontSize: 14,
            fontWeight: 'bolder'
          },
          subtextStyle: {
            fontSize: 12,
            fontWeight: 'bold'
          },
          gridIndex: 0
        },
        {
          text: `Usia : ${props?.pasien?.usia ?? 0}`,
          left: '2%',
          top: 38,
          itemGap: 1,
          textStyle: {
            fontSize: 12,
            fontWeight: 'normal'
          },
          gridIndex: 0
        },
        {
          text: `PB : ${props?.draft?.pb ?? 0} cm`,
          left: '2%',
          top: 52,
          itemGap: 1,
          textStyle: {
            fontSize: 12,
            fontWeight: 'normal'
          },
          gridIndex: 0
        },
        {
          text: `BB : ${props?.draft?.bb ?? 0} kg`,
          left: '2%',
          top: 65,
          itemGap: 1,
          textStyle: {
            fontSize: 12,
            fontWeight: 'normal'
          },
          gridIndex: 0
        },
        {
          text: `BBI : ${props?.draft?.titikC[1] ?? 0}`,
          left: '2%',
          top: 79,
          itemGap: 1,
          textStyle: {
            fontSize: 12,
            fontWeight: 'normal'
          },
          gridIndex: 0
        },

        {
          text: `BMI : ${props?.draft?.bmi ?? 0}`,
          left: '2%',
          top: 92,
          itemGap: 1,
          textStyle: {
            fontSize: 12,
            fontWeight: 'normal'
          },
          gridIndex: 0
        }
        // {
        //   text: 'Nama : ' + props?.pasien?.nama_panggil ?? '',
        //   right: '3%',
        //   left: 'auto',
        //   top: '5%',
        //   itemGap: 1,
        //   textStyle: {
        //     align: 'right',
        //     fontSize: 12
        //   }
        // },
        // {
        //   text: `Record : ${props?.pasien?.noreg ?? ''}`,
        //   right: '3%',
        //   top: '7%',
        //   textStyle: {
        //     fontSize: 12,
        //     fontWeight: 'normal'
        //   }
        // }
        // {
        //   text: `BB : ${props?.draft?.bb ?? 0} cm, PB : ${props?.draft?.pb ?? 0} kg`,
        //   left: 10,
        //   top: 70,
        //   textStyle: {
        //     fontSize: 12
        //   }
        // },
        // {
        //   text: `BBI : ${props?.draft?.titikC[1] ?? 0}`,
        //   left: 10,
        //   top: 110,
        //   textStyle: {
        //     fontSize: 30,
        //     fontWeight: 'bold'
        //   }
        // },
        // {
        //   text: `BMI : ${props?.draft?.bmi ?? 0}`,
        //   left: 10,
        //   top: 140,
        //   textStyle: {
        //     fontSize: 30,
        //     fontWeight: 'bold'
        //   }
        // }

      ],
      legend:
        [{
          type: 'plain',
          show: true,
          width: 0,
          left: '2%',
          bottom: '40%',
          height: 10,
          orient: 'horizontal',
          align: 'auto',
          itemGap: 8,
          gridIndex: 0,
          textStyle: { fontSize: 10 },
          backgroundColor: 'rgba(0,0,0,0.2)',
          borederRadius: 5,
          padding: 8,
          data: [
            { name: 'P 97rd' },
            { name: 'P 90rd' },
            { name: 'P 75rd' },
            { name: 'P 50rd' },
            { name: 'P 25rd' },
            { name: 'P 10rd' },
            { name: 'P 3rd' }
          ]
        },
        {
          type: 'plain',
          show: true,
          width: 0,
          left: '2%',
          bottom: '8%',
          height: 10,
          orient: 'horizontal',
          align: 'auto',
          itemGap: 8,
          gridIndex: 0,
          textStyle: { fontSize: 10 },
          backgroundColor: 'rgba(0,0,0,0.2)',
          borederRadius: 5,
          padding: 8,
          data: [
            { name: 'W97' },
            { name: 'W90' },
            { name: 'W75' },
            { name: 'W50' },
            { name: 'W25' },
            { name: 'W10' },
            { name: 'W3' }
          ]
        }

        ],
      graphic: [
        {
          type: 'group',
          rotation: Math.PI / 4,
          bounding: 'raw',
          right: 110,
          bottom: 110,
          z: 100,
          children: [
            {
              type: 'rect',
              left: 'center',
              top: 'center',
              z: 100,
              shape: {
                width: 400,
                height: 50
              },
              style: {
                fill: 'rgba(0,0,0,0.3)'
              }
            },
            {
              type: 'text',
              left: 'center',
              top: 'center',
              z: 100,
              style: {
                fill: '#fff',
                text: 'RSUD MSALEH',
                font: 'bold 26px sans-serif'
              }
            }
          ]
        }
      ],
      grid: [
        {
          id: 'bbi',
          left: '17%',
          right: '5%',
          bottom: '5%',
          top: '11%',
          width: 'auto',
          height: 'auto',
          borderWidth: 2,
          containLabel: true
        }

      ],
      // legend: {
      //   bottom: 2,
      //   left: 'center',
      //   data: ['P 3rd', 'P 5rd', 'P 10rd', 'P 25rd', 'P 50rd', 'P 75rd', 'P 90rd', 'P 97rd']
      // },
      tooltip: {
        show: true,
        trigger: 'axis',
        axisPointer: { type: 'cross' },
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        // position: function (pos, params, el, elRect, size) {
        //   const obj = { top: 10 }
        //   obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30
        //   return obj
        // },
        extraCssText: 'width: 170px'
        // formatter: 'Percentiles : <br/> {b}  : {c}'
      },

      axisPointer: {
        // link: [
        //   {
        //     xAxisIndex: 'all'
        //   }
        // ],
        label: {
          show: true,
          formatter: function (params) {
            // console.log('params', params)
            if (params.axisDimension === 'x') {
              return 'usia' + ' ' + usia(params.value)
            }
            if (params.axisDimension === 'y') {
              return '' + Math.round(params.value)
            }
          },
          // backgroundColor: 'transparent',
          color: 'white',
          rich: {
            box: {
              backgroundColor: 'grey',
              padding: 5
            }
          }
        }
      },
      xAxis: [
        {
          type: 'value',
          min: 24,
          max: 240,
          interval: 12,
          axisLabel: {
            formatter: function (value, index) {
              return value / 12
            }
          },
          gridIndex: 0,
          position: 'bottom'
          // show: false
        }

      ],
      yAxis: [
        {
          type: 'value',
          min: 0,
          max: 200,
          interval: 10,
          gridIndex: 0
        },
        {
          type: 'value',
          min: 0,
          max: 200,
          interval: 10,
          position: 'right',
          gridIndex: 0,
          show: true
        }
      ],
      series: [
        {
          type: 'scatter',
          name: 'A',
          data: getChartResult(),
          emphasis: {
            focus: 'self'
          },
          color: '#000',
          symbolSize: 10,
          cursor: 'pointer',
          gridIndex: 0
        },
        {
          name: 'B',
          data: getChartResult(),
          type: 'line',
          showSymbol: true,
          xAxisIndex: 0,
          yAxisIndex: 0,
          gridIndex: 0,
          lineStyle: {
            color: '#000',
            type: 'dashed',
            width: 0.5
          }
        },
        {
          name: 'P 97rd',
          data: cariPanduan('97rd'),
          type: 'line',
          smooth: true,
          showSymbol: false,
          colorBy: 'series',
          lineStyle: { color: 'red', width: 1 },
          itemStyle: { color: 'red' },
          xAxisIndex: 0,
          yAxisIndex: 0,
          gridIndex: 0
        },

        {
          name: 'P 90rd',
          data: cariPanduan('90rd'),
          type: 'line',
          smooth: true,
          showSymbol: false,
          colorBy: 'series',
          lineStyle: { color: 'orange', width: 1 },
          itemStyle: { color: 'orange' },
          xAxisIndex: 0,
          yAxisIndex: 0,
          gridIndex: 0
        },

        {
          name: 'P 75rd',
          data: cariPanduan('75rd'),
          type: 'line',
          smooth: true,
          showSymbol: false,
          colorBy: 'series',
          lineStyle: { color: 'gold', width: 1 },
          itemStyle: { color: 'gold' },
          xAxisIndex: 0,
          yAxisIndex: 0
        },

        {
          name: 'P 50rd',
          data: cariPanduan('50rd'),
          type: 'line',
          smooth: true,
          lineStyle: {
            color: 'black',
            width: 3
          },
          itemStyle: { color: 'black' },
          showSymbol: false,
          xAxisIndex: 0,
          yAxisIndex: 0,
          gridIndex: 0
        },

        {
          name: 'P 25rd',
          data: cariPanduan('25rd'),
          type: 'line',
          smooth: true,
          showSymbol: false,
          colorBy: 'series',
          lineStyle: { color: 'blue', width: 1 },
          itemStyle: { color: 'blue' },
          xAxisIndex: 0,
          yAxisIndex: 0,
          gridIndex: 0
        },

        {
          name: 'P 10rd',
          data: cariPanduan('10rd'),
          type: 'line',
          smooth: true,
          showSymbol: false,
          colorBy: 'series',
          lineStyle: { color: 'navy', width: 1 },
          itemStyle: { color: 'navy' },
          xAxisIndex: 0,
          yAxisIndex: 0,
          gridIndex: 0
        },

        {
          name: 'P 3rd',
          data: cariPanduan('3rd'),
          type: 'line',
          smooth: true,
          showSymbol: false,
          colorBy: 'series',
          lineStyle: { color: 'purple', width: 1 },
          itemStyle: { color: 'purple' },
          xAxisIndex: 0,
          yAxisIndex: 0,
          gridIndex: 0
        },

        // untuk series weight
        {
          name: 'W97',
          data: cariPanduanWeight('97rd'),
          type: 'line',
          smooth: true,
          showSymbol: false,
          colorBy: 'series',
          lineStyle: { color: 'red', width: 1 },
          itemStyle: { color: 'red' },
          xAxisIndex: 0,
          yAxisIndex: 0,
          gridIndex: 0
        },
        {
          name: 'W90',
          data: cariPanduanWeight('90rd'),
          type: 'line',
          smooth: true,
          showSymbol: false,
          colorBy: 'series',
          lineStyle: { color: 'orange', width: 1 },
          itemStyle: { color: 'orange' },
          xAxisIndex: 0,
          yAxisIndex: 0,
          gridIndex: 0
        },
        {
          name: 'W75',
          data: cariPanduanWeight('75rd'),
          type: 'line',
          smooth: true,
          showSymbol: false,
          colorBy: 'series',
          lineStyle: { color: 'gold', width: 1 },
          itemStyle: { color: 'gold' },
          xAxisIndex: 0,
          yAxisIndex: 0,
          gridIndex: 0
        },

        {
          name: 'W50',
          data: cariPanduanWeight('50rd'),
          type: 'line',
          smooth: true,
          showSymbol: false,
          lineStyle: {
            color: '#000',
            width: 3
          },
          itemStyle: { color: 'black' },
          xAxisIndex: 0,
          yAxisIndex: 0,
          gridIndex: 0
        },

        {
          name: 'W25',
          data: cariPanduanWeight('25rd'),
          type: 'line',
          smooth: true,
          showSymbol: false,
          colorBy: 'series',
          lineStyle: { color: 'navy', width: 1 },
          itemStyle: { color: 'navy' },
          xAxisIndex: 0,
          yAxisIndex: 0,
          gridIndex: 0
        },

        {
          name: 'W10',
          data: cariPanduanWeight('10rd'),
          type: 'line',
          smooth: true,
          showSymbol: false,
          colorBy: 'series',
          lineStyle: { color: 'green', width: 1 },
          itemStyle: { color: 'green' },
          xAxisIndex: 0,
          yAxisIndex: 0,
          gridIndex: 0
        },

        {
          name: 'W3',
          data: cariPanduanWeight('3rd'),
          type: 'line',
          smooth: true,
          showSymbol: false,
          colorBy: 'series',
          lineStyle: { color: 'purple', width: 1 },
          itemStyle: { color: 'purple' },
          xAxisIndex: 0,
          yAxisIndex: 0,
          gridIndex: 0
        }

      ]
    }
    // }

    echart.setOption(option)
  }
}

const cariPanduan = (val) => {
  // const masterTb = store?.masterCdc.length ? store.masterCdc.filter(x => x.gender === 1 && x?.jns === 1) : []
  const masterTb = props?.draft?.masterTb ?? []
  const arr = []
  // if (val === '3rd') {
  for (let i = 0; i < masterTb.length; i++) {
    arr[i] = [masterTb[i].age_m, masterTb[i][val]]
  }

  return arr
}
const cariPanduanWeight = (val) => {
  // const masterTb = store?.masterCdc.length ? store.masterCdc.filter(x => x.gender === 1 && x?.jns === 2) : []
  const masterTb = props?.draft?.masterWeight ?? []
  // console.log(masterTb)
  const arr = []
  // if (val === '3rd') {
  for (let i = 0; i < masterTb.length; i++) {
    arr[i] = [masterTb[i].age_m, masterTb[i][val]]
  }

  return arr
}

const getChartResult = () => {
  // const titikA = props?.draft
  const { titkA, titikB, titikC } = props?.draft

  return [titkA, titikB, titikC]
}

// eslint-disable-next-line no-unused-vars
const getMaxBmi = (val) => {
  const masterTb = props?.draft?.masterBmi ?? []
  const o = masterTb.length ? masterTb.map(x => x[val]) : []
  const y = o.reduce((a, b) => Math.max(a, b), 0)
  const xy = [240, y]
  return [xy]
}

const usia = (val) => {
  const mentahan = val / 12
  // const round = Math.round(mentahan * 10) / 10
  const round = mentahan.toFixed(2)
  const years = round % 1
  const months = years * 12
  const totalMonths = months
  return Math.floor(round).toString() + ' th ' + totalMonths.toFixed(0) + ' bln'
}

function calculateAgeInMonths (birthdate) {
  if (!birthdate) return null // !birthdate return null
  const today = new Date()
  const birthdateObj = new Date(birthdate)

  // Menghitung jumlah bulan antara tanggal lahir dan tanggal saat ini
  const months = today.getFullYear() * 12 + today.getMonth() -
    birthdateObj.getFullYear() * 12 - birthdateObj.getMonth()

  // Menghitung usia
  // const age = Math.floor(months / 12);
  // console.log('calculateAgeInMonths', months)
  return months
}

watchEffect(() => {
  // console.log('watchEffect', props.draft)
  if (props.draft) {
    getChartResult()
    // chartInit()
  }
})
</script>
