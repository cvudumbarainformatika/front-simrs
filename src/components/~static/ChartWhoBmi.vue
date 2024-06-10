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
import { ref, onMounted, computed, watchEffect } from 'vue'
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

const gender = computed(() => {
  const x = props.pasien?.kelamin ?? null
  return x === 'Perempuan' ? 'Girl' : 'Boy'
})

const line = ref(null)

onMounted(() => {
  console.log(gender)
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
        [

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
              { name: 'bmi97' },
              { name: 'bmi95' },
              { name: 'bmi90' },
              { name: 'bmi85' },
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
        // {
        //   id: 'bbi',
        //   left: '17%',
        //   right: '10%',
        //   bottom: '5%',
        //   top: '9%',
        //   width: 'auto',
        //   height: 'auto',
        //   borderWidth: 2,
        //   containLabel: true
        // },
        {
          id: 'bmi',
          left: '17%',
          right: '10%',
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
          min: 10,
          interval: 1
        },
        {
          type: 'value',
          min: 10,
          interval: 1,
          position: 'right',
          gridIndex: 0,
          show: true
        }
      ],
      series: [
        {
          name: 'bmi97',
          data: cariPanduanBmi('97rd'),
          type: 'line',
          smooth: true,
          showSymbol: false,
          // symbolSize: 0.1,
          colorBy: 'series',
          lineStyle: { color: 'red', width: 1 },
          itemStyle: { color: 'red' },
          markLine: {
            data: [{ name: '97rd', type: 'max' }],
            silent: true,
            lineStyle: { width: 0 },
            symbolSize: 1,
            label: {
              formatter: '{b}'
            }
          }

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
          markLine: {
            data: [{ name: '95rd', type: 'max' }],
            silent: true,
            lineStyle: { width: 0 },
            symbolSize: 1,
            label: {
              formatter: '{b}'
            }
          }

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
          markLine: {
            data: [{ name: '90rd', type: 'max' }],
            silent: true,
            lineStyle: { width: 0 },
            symbolSize: 1,
            label: {
              formatter: '{b}'
            }
          }

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
          markLine: {
            data: [{ name: '85rd', type: 'max' }],
            silent: true,
            lineStyle: { width: 0 },
            symbolSize: 1,
            label: {
              formatter: '{b}'
            }
          }

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
          markLine: {
            data: [{ name: '75rd', type: 'max' }],
            silent: true,
            lineStyle: { width: 0 },
            symbolSize: 1,
            label: {
              formatter: '{b}'
            }
          }

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
          markLine: {
            data: [{ name: '50rd', type: 'max' }],
            silent: true,
            lineStyle: { width: 0 },
            symbolSize: 1,
            label: {
              formatter: '{b}'
            }
          }

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
          markLine: {
            data: [{ name: '25rd', type: 'max' }],
            silent: true,
            lineStyle: { width: 0 },
            symbolSize: 1,
            label: {
              formatter: '{b}'
            }
          }

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
          markLine: {
            data: [{ name: '10rd', type: 'max' }],
            silent: true,
            lineStyle: { width: 0 },
            symbolSize: 1,
            label: {
              formatter: '{b}'
            }
          }

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
          markLine: {
            data: [{ name: '3rd', type: 'max' }],
            silent: true,
            lineStyle: { width: 0 },
            symbolSize: 1,
            label: {
              formatter: '{b}'
            }
          }

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
          emphasis: {
            focus: 'self'
          },
          labelLayout: {
            y: '85%',
            align: 'center',
            hideOverlap: true,
            moveOverlap: 'shiftX'
          },
          labelLine: {
            show: true,
            length2: 2,
            lineStyle: {
              color: '#bbb'
            }
          },
          label: {
            show: true,
            formatter: function (param) {
              return props.draft?.rangeBmi?.keterangan
            },
            minMargin: 10,
            position: 'left'
          }

        }

        // {
        //   type: 'scatter',
        //   name: 'range',
        //   data: props.draft?.rangeBmi.coor,
        //   showSymbol: true,
        //   symbol: 'circle',
        //   color: '#000',
        //   symbolSize: 2,
        //   cursor: 'pointer',
        //   markLine: {
        //     data: [{ type: 'max' }, { type: 'min' }],
        //     silent: true
        //   }

        // }

      ]
    }
    // }

    echart.setOption(option)
  }
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
