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
      color: ['#DEAC80', '#006699', '#4cabce', '#8c564b', '#000', '#2f4554', '#61a0a8', '#d48265'],
      // title: [
      //   {
      //     text: `2 - 20 years for ${gender.value}`,
      //     left: 10,
      //     top: 10,
      //     textStyle: {
      //       fontSize: 20,
      //       fontWeight: 'bold'
      //     }
      //   },
      //   {
      //     text: 'Stature-for-age and Weight-for-age percentiles',
      //     left: 10,
      //     top: 33,
      //     textStyle: {
      //       fontSize: 14
      //     }
      //   },
      //   {
      //     text: `Nama : ${props?.pasien?.nama_panggil ?? ''}`,
      //     left: 10,
      //     top: 55,
      //     textStyle: {
      //       fontSize: 12
      //     }
      //   },
      //   {
      //     text: `BB : ${props?.draft?.bb ?? 0} cm, PB : ${props?.draft?.pb ?? 0} kg`,
      //     left: 10,
      //     top: 70,
      //     textStyle: {
      //       fontSize: 12
      //     }
      //   },
      //   {
      //     text: `BBI : ${props?.draft?.titikC[1] ?? 0}`,
      //     left: 10,
      //     top: 110,
      //     textStyle: {
      //       fontSize: 30,
      //       fontWeight: 'bold'
      //     }
      //   },
      //   {
      //     text: `BMI : ${props?.draft?.bmi ?? 0}`,
      //     left: 10,
      //     top: 140,
      //     textStyle: {
      //       fontSize: 30,
      //       fontWeight: 'bold'
      //     }
      //   }

      // ],
      // graphic: [
      //   {
      //     type: 'group',
      //     rotation: Math.PI / 4,
      //     bounding: 'raw',
      //     right: 110,
      //     bottom: 110,
      //     z: 100,
      //     children: [
      //       {
      //         type: 'rect',
      //         left: 'center',
      //         top: 'center',
      //         z: 100,
      //         shape: {
      //           width: 400,
      //           height: 50
      //         },
      //         style: {
      //           fill: 'rgba(0,0,0,0.3)'
      //         }
      //       },
      //       {
      //         type: 'text',
      //         left: 'center',
      //         top: 'center',
      //         z: 100,
      //         style: {
      //           fill: '#fff',
      //           text: 'RSUD MSALEH',
      //           font: 'bold 26px sans-serif'
      //         }
      //       }
      //     ]
      //   },
      //   {
      //     type: 'group',
      //     left: 20,
      //     top: 100,
      //     children: [
      //       // {
      //       //   type: 'rect',
      //       //   z: 100,
      //       //   // left: 'center',
      //       //   // top: 'middle',
      //       //   right: 0,
      //       //   top: 0,
      //       //   // textContent: 'MBOH',
      //       //   shape: {
      //       //     width: 340,
      //       //     height: 100
      //       //   },
      //       //   style: {
      //       //     fill: '#fff',
      //       //     stroke: '#555',
      //       //     lineWidth: 1,
      //       //     shadowBlur: 8,
      //       //     shadowOffsetX: 3,
      //       //     shadowOffsetY: 3,
      //       //     shadowColor: 'rgba(0,0,0,0.2)',
      //       //     padding: 2
      //       //   }
      //       // },
      //       {
      //         type: 'text',
      //         z: 110,
      //         right: 0,
      //         top: 0,
      //         style: {
      //           fill: '#333',
      //           // width: 300,
      //           overflow: 'break',
      //           text: `BBI : ${props?.draft?.titikC[1] ?? 0}`,
      //           fontSize: 30,
      //           fontWeight: 'bold'
      //         }
      //       }
      //       // {
      //       //   type: 'text',
      //       //   z: 100,
      //       //   left: 'center',
      //       //   top: 'end',
      //       //   style: {
      //       //     fill: '#333',
      //       //     width: 300,
      //       //     overflow: 'break',
      //       //     text: `BBI : ${props?.draft?.bmi ?? 0} kg/m2`,
      //       //     fontSize: 30,
      //       //     fontWeight: 'bold'
      //       //   }
      //       // }
      //     ]
      //   }
      // ],
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
          gridIndex: 0
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
        },
        {
          type: 'value',
          min: 10,
          max: 40,
          interval: 5,
          position: 'right',
          gridIndex: 1
        },
        {
          type: 'value',
          min: 10,
          max: 40,
          interval: 5,
          position: 'left',
          gridIndex: 1
        }
      ],
      series: [
        {
          type: 'scatter',
          name: 'A',
          data: getChartResult(),
          showSymbol: true,
          symbol: 'circle',
          color: '#000',
          symbolSize: 8,
          cursor: 'pointer',
          gridIndex: 0
        },
        {
          name: 'B',
          data: getChartResult(),
          type: 'line',
          smooth: true,
          showSymbol: false,
          xAxisIndex: 0,
          yAxisIndex: 0,
          gridIndex: 0,
          lineStyle: {
            color: '#000',
            type: 'dashed',
            width: 1
          }
        },

        {
          name: 'P 3rd',
          data: cariPanduan('3rd'),
          type: 'line',
          smooth: true,
          showSymbol: false,
          xAxisIndex: 0,
          yAxisIndex: 0,
          gridIndex: 0

          // showAllSymbol: 'auto',
          // symbolSize: 0.1
        },
        {
          name: 'P 5rd',
          data: cariPanduan('5rd'),
          type: 'line',
          smooth: true,
          showSymbol: false,
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
          xAxisIndex: 0,
          yAxisIndex: 0,
          gridIndex: 0
        },
        {
          name: 'P 50rd',
          data: cariPanduan('50rd'),
          type: 'line',
          smooth: true,
          lineStyle: {
            // color: '#000',
            width: 3
          },
          showSymbol: false,
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
          xAxisIndex: 0,
          yAxisIndex: 0
        },
        {
          name: 'P 90rd',
          data: cariPanduan('90rd'),
          type: 'line',
          smooth: true,
          showSymbol: false,
          xAxisIndex: 0,
          yAxisIndex: 0,
          gridIndex: 0
        },
        {
          name: 'P 97rd',
          data: cariPanduan('97rd'),
          type: 'line',
          smooth: true,
          showSymbol: false,
          xAxisIndex: 0,
          yAxisIndex: 0,
          gridIndex: 0
        },

        // untuk series weight
        {
          name: 'W3',
          data: cariPanduanWeight('3rd'),
          type: 'line',
          smooth: true,
          showSymbol: false,
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
          xAxisIndex: 0,
          yAxisIndex: 0,
          gridIndex: 0
        },
        {
          name: 'W95',
          data: cariPanduanWeight('95rd'),
          type: 'line',
          smooth: true,
          showSymbol: false,
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
