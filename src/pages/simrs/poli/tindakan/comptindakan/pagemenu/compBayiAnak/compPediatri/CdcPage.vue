<template>
  <div class="relative-position">
    <div
      v-if="calculateAgeInMonths(props?.pasien?.tgllahir ?? null) < 24 || calculateAgeInMonths(props?.pasien?.tgllahir ?? null) > 240"
      class="fit full-height column flex-center" style="width: 100%; min-height: 400px;"
    >
      <div class="f-14 text-weight-bold">
        Maaf ... Halaman ini Hanya Untuk Pasien Usia 2 - 20 Tahun
      </div>
    </div>
    <div v-else class="relative-position">
      <div
        ref="line" style="width:100%; height: 950px;"
      />
      <!-- <div style="margin-bottom: 300px;" /> -->
    </div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { ref, onMounted, computed, watchEffect } from 'vue'
import { usePediatriStore } from 'src/stores/simrs/pelayanan/poli/pediatri'

// import mboh from './mboh.json'
// import { ref } from 'vue'

const props = defineProps({
  pasien: {
    type: Object, default: null
  },
  draft: {
    type: Object, default: null
  }
})
const store = usePediatriStore()

const gender = computed(() => {
  const x = props.pasien?.kelamin ?? null
  return x === 'Perempuan' ? 'Girl' : 'Boy'
})

const line = ref(null)

onMounted(() => {
  console.log('store', store)
  // console.log('props', props?.draft)
  // console.log('coba', getChartResult())

  // const ageInMonths = calculateAgeInMonths(props?.pasien?.tgllahir ?? null)
  console.log('gender', gender)
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
      title: [
        {
          text: `2 - 20 years for ${gender.value}`,
          right: '3%',
          top: 10,
          textStyle: {
            fontSize: 20,
            fontWeight: 'bold'
          },
          gridIndex: 2
        }
        // {
        //   text: 'Stature-for-age and Weight-for-age percentiles',
        //   left: 10,
        //   top: 33,
        //   textStyle: {
        //     fontSize: 14
        //   }
        // },
        // {
        //   text: `Nama : ${props?.pasien?.nama_panggil ?? ''}`,
        //   left: 10,
        //   top: 55,
        //   textStyle: {
        //     fontSize: 12
        //   }
        // },
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
          left: '6%',
          top: '8%',
          height: 10,
          orient: 'horizontal',
          align: 'auto',
          padding: [0, 0, 0, 0],
          gridIndex: 0,
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
          left: '6%',
          top: '62%',
          height: 10,
          orient: 'horizontal',
          align: 'auto',
          padding: [0, 0, 0, 0],
          gridIndex: 0,
          data: [
            { name: 'W97' },
            { name: 'W90' },
            { name: 'W75' },
            { name: 'W50' },
            { name: 'W25' },
            { name: 'W10' },
            { name: 'W3' }
          ]
        },
        {
          type: 'plain',
          show: true,
          width: 0,
          right: '37%',
          top: '42%',
          height: 10,
          orient: 'horizontal',
          align: 'auto',
          padding: [0, 0, 0, 0],
          gridIndex: 1,
          data: [
            { name: 'bmi97' },
            { name: 'bmi95' },
            { name: 'bmi90' },
            { name: 'bmi75' },
            { name: 'bmi50' },
            { name: 'bmi25' },
            { name: 'bmi10' },
            { name: 'bmi3' }
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
          left: '3%',
          right: 'auto',
          bottom: '5%',
          top: '5%',

          width: '50%',
          height: 'auto',
          borderWidth: 2,

          containLabel: true
        },
        {
          id: 'bmi',
          right: '3%',
          left: 'auto',
          bottom: '5%',
          top: 'auto',

          width: '42%',
          height: '55%',
          show: true,
          containLabel: true
        },
        {
          id: 'title-text',
          right: '3%',
          left: 'auto',
          // bottom: 'auto',
          top: '5%',
          // top: 555,

          width: '40%',
          height: '25%',
          show: true,
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
          position: 'top'
          // show: false
        },
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
          gridIndex: 1
        },
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
          gridIndex: 0
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
          min: 10,
          // max: 40,
          interval: 2,
          position: 'left',
          gridIndex: 1
        },
        {
          type: 'value',
          min: 0,
          max: 200,
          interval: 10,
          position: 'right',
          gridIndex: 0,
          show: true
        },
        {
          type: 'value',
          min: 10,
          // max: 40,
          interval: 2,
          position: 'right',
          gridIndex: 1
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

        // {
        //   name: 'P 5rd',
        //   data: cariPanduan('5rd'),
        //   type: 'line',
        //   smooth: true,
        //   showSymbol: false,
        //   colorBy: 'series',
        //   lineStyle: { color: 'green', width: 1 },
        //   itemStyle: { color: 'green' },
        //   xAxisIndex: 0,
        //   yAxisIndex: 0,
        //   gridIndex: 0
        // },

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
        },

        // FOR BMI

        {
          name: 'bmi97',
          data: cariPanduanBmi('97rd'),
          type: 'line',
          smooth: true,
          showSymbol: false,
          colorBy: 'series',
          lineStyle: { color: 'red', width: 1 },
          itemStyle: { color: 'red' },
          xAxisIndex: 1,
          yAxisIndex: 1,
          gridIndex: 1
        },
        {
          name: 'bmi95',
          data: cariPanduanBmi('95rd'),
          type: 'line',
          smooth: true,
          showSymbol: false,
          colorBy: 'series',
          lineStyle: { color: 'orange', width: 1 },
          itemStyle: { color: 'orange' },
          xAxisIndex: 1,
          yAxisIndex: 1,
          gridIndex: 1
        },
        {
          name: 'bmi90',
          data: cariPanduanBmi('90rd'),
          type: 'line',
          smooth: true,
          showSymbol: false,
          colorBy: 'series',
          lineStyle: { color: 'gold', width: 1 },
          itemStyle: { color: 'gold' },
          xAxisIndex: 1,
          yAxisIndex: 1,
          gridIndex: 1
        },
        {
          name: 'bmi85',
          data: cariPanduanBmi('85rd'),
          type: 'line',
          smooth: true,
          showSymbol: false,
          colorBy: 'series',
          lineStyle: { color: 'purple', width: 1 },
          itemStyle: { color: 'purple' },
          xAxisIndex: 1,
          yAxisIndex: 1,
          gridIndex: 1
        },

        {
          name: 'bmi75',
          data: cariPanduanBmi('75rd'),
          type: 'line',
          smooth: true,
          showSymbol: false,
          colorBy: 'series',
          lineStyle: { color: 'blue', width: 1 },
          itemStyle: { color: 'blue' },
          xAxisIndex: 1,
          yAxisIndex: 1,
          gridIndex: 1
        },

        {
          name: 'bmi50',
          data: cariPanduanBmi('50rd'),
          type: 'line',
          smooth: true,
          showSymbol: false,
          colorBy: 'series',
          lineStyle: { color: 'black', width: 3 },
          itemStyle: { color: 'black' },
          xAxisIndex: 1,
          yAxisIndex: 1,
          gridIndex: 1
        },
        {
          name: 'bmi25',
          data: cariPanduanBmi('25rd'),
          type: 'line',
          smooth: true,
          showSymbol: false,
          colorBy: 'series',
          lineStyle: { color: 'navy', width: 1 },
          itemStyle: { color: 'navy' },
          xAxisIndex: 1,
          yAxisIndex: 1,
          gridIndex: 1
        },
        {
          name: 'bmi10',
          data: cariPanduanBmi('10rd'),
          type: 'line',
          smooth: true,
          showSymbol: false,
          colorBy: 'series',
          lineStyle: { color: 'green', width: 1 },
          itemStyle: { color: 'green' },
          xAxisIndex: 1,
          yAxisIndex: 1,
          gridIndex: 1
        },
        {
          name: 'bmi3',
          data: cariPanduanBmi('3rd'),
          type: 'line',
          smooth: true,
          showSymbol: true,
          colorBy: 'series',
          lineStyle: { color: 'purple', width: 1 },
          itemStyle: { color: 'purple' },
          symbolSize: 0.1,
          markPoint: {
            data: [{ name: '周最低', value: [168, 15.66], xAxis: 0, yAxis: 15.71 }]
          },
          xAxisIndex: 1,
          yAxisIndex: 1,
          gridIndex: 1
        },
        {
          type: 'scatter',
          name: 'BMI',
          data: getScatterBmi(),
          showSymbol: true,
          symbol: 'circle',
          color: '#000',
          symbolSize: 8,
          cursor: 'pointer',
          markPoint: {
            data: [
              { type: 'max', name: 'BMI', symbolSize: 80 }
            ]
          },
          xAxisIndex: 1,
          yAxisIndex: 1,
          gridIndex: 1
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

const cariPanduanBmi = (val) => {
  // const masterTb = store?.masterCdc.length ? store.masterCdc.filter(x => x.gender === 1 && x?.jns === 2) : []
  const masterTb = props?.draft?.masterBmi ?? []
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

const getScatterBmi = () => {
  // const titikA = props?.draft
  const { titikD } = props?.draft
  // console.log('titikD', titikD)
  return [titikD]
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
