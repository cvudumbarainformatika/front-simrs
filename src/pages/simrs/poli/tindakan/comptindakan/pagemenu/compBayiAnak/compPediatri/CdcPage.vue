<template>
  <div class="relative-position">
    <!-- <div class="flex head justify-between q-pa-sm">
      <div class="text-weight-bold flex-1">
        <div>2 to 20 years : Girls</div>
        <div>Stature-for-age and weight-for-age percentiles</div>
      </div>
      <div>
        <q-btn flat round icon="icon-mat-close">
          <q-tooltip>kembali ke form</q-tooltip>
        </q-btn>
      </div>
    </div>

    <q-separator /> -->

    <div class="relative-position">
      <div
        ref="line" style="width:100%; height: 1050px; "
      />
      <!-- <div style="margin-bottom: 300px;" /> -->
    </div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
import { usePediatriStore } from 'src/stores/simrs/pelayanan/poli/pediatri'
// import mboh from './mboh.json'
// import { ref } from 'vue'
const store = usePediatriStore()

const line = ref(null)

onMounted(() => {
  const echart = echarts.init(line.value)

  // console.log('echart', echart)

  // console.log('a', mboh)

  // const data = cariPanduan()
  // let option
  if (line.value !== null) {
    const option = {
      color: ['#DEAC80', '#006699', '#4cabce', '#8c564b', '#000', '#2f4554', '#61a0a8', '#d48265'],
      grid: [
        {
          left: '15%',
          right: '15%',
          // bottom: 50,
          top: 50,

          width: 'auto',
          height: 800,
          borderWidth: 2,

          containLabel: true
        }
        // {
        //   left: '15%',
        //   right: '15%',
        //   // bottom: '2%',
        //   top: 555,

        //   width: 'auto',
        //   height: 400,
        //   show: true,
        //   containLabel: true
        // }
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
      },

      axisPointer: {
        link: [
          {
            xAxisIndex: 'all'
          }
        ],
        label: {
          show: true,
          formatter: function (params) {
            // console.log('params', params)
            if (params.axisDimension === 'x') {
              return 'usia' + ' ' + usia(params.value) + ' th'
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
        // {
        //   type: 'value',
        //   min: 0,
        //   max: 100,
        //   interval: 10,
        //   gridIndex: 1,
        //   show: false
        // },
        {
          type: 'value',
          min: 0,
          max: 200,
          interval: 10,
          position: 'right',
          gridIndex: 0,
          show: true
        }
        // {
        //   type: 'value',
        //   min: 0,
        //   max: 100,
        //   interval: 10,
        //   position: 'right',
        //   gridIndex: 1
        // }
      ],
      series: [
        {
          type: 'scatter',
          name: 'PB',
          data: [[84, 115]],
          showSymbol: true,
          symbol: 'diamond',
          color: '#F00',
          symbolSize: 15,
          cursor: 'pointer'
        },
        {
          name: 'A',
          data: [[24, 115], [84, 115]],
          type: 'line',
          smooth: true,
          showSymbol: false,
          xAxisIndex: 0,
          yAxisIndex: 0

          // showAllSymbol: 'auto',
          // symbolSize: 0.1
        },

        {
          name: 'P 3rd',
          data: cariPanduan('3rd'),
          type: 'line',
          smooth: true,
          showSymbol: false,
          xAxisIndex: 0,
          yAxisIndex: 0

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
          yAxisIndex: 0
        },
        {
          name: 'P 10rd',
          data: cariPanduan('10rd'),
          type: 'line',
          smooth: true,
          showSymbol: false,
          xAxisIndex: 0,
          yAxisIndex: 0
        },
        {
          name: 'P 25rd',
          data: cariPanduan('25rd'),
          type: 'line',
          smooth: true,
          showSymbol: false,
          xAxisIndex: 0,
          yAxisIndex: 0
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
          yAxisIndex: 0
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
          yAxisIndex: 0
        },
        {
          name: 'P 97rd',
          data: cariPanduan('97rd'),
          type: 'line',
          smooth: true,
          showSymbol: false,
          xAxisIndex: 0,
          yAxisIndex: 0
        },

        // untuk series weight
        {
          name: 'W3',
          data: cariPanduanWeight('3rd'),
          type: 'line',
          smooth: true,
          showSymbol: false,
          xAxisIndex: 0,
          yAxisIndex: 0
        },
        {
          name: 'W10',
          data: cariPanduanWeight('10rd'),
          type: 'line',
          smooth: true,
          showSymbol: false,
          xAxisIndex: 0,
          yAxisIndex: 0
        },
        {
          name: 'W25',
          data: cariPanduanWeight('25rd'),
          type: 'line',
          smooth: true,
          showSymbol: false,
          xAxisIndex: 0,
          yAxisIndex: 0
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
          yAxisIndex: 0
        },
        {
          name: 'W75',
          data: cariPanduanWeight('75rd'),
          type: 'line',
          smooth: true,
          showSymbol: false,
          xAxisIndex: 0,
          yAxisIndex: 0
        },
        {
          name: 'W90',
          data: cariPanduanWeight('90rd'),
          type: 'line',
          smooth: true,
          showSymbol: false,
          xAxisIndex: 0,
          yAxisIndex: 0
        },
        {
          name: 'W95',
          data: cariPanduanWeight('95rd'),
          type: 'line',
          smooth: true,
          showSymbol: false,
          xAxisIndex: 0,
          yAxisIndex: 0
        }

        // perpotongan tinggi

        // {
        //   type: 'line',
        //   name: 'tinggi',
        //   data: [[24, 115], [240, 115]],
        //   showSymbol: false,
        //   xAxisIndex: 0,
        //   yAxisIndex: 0
        // },
        // {
        //   type: 'line',
        //   name: 'usia',
        //   data: [[84, 200], [84, 115]],
        //   showSymbol: false,
        //   xAxisIndex: 0,
        //   yAxisIndex: 0
        // }
      ]
    }
    // }

    echart.setOption(option)
  }
})

const cariPanduan = (val) => {
  const masterTb = store?.masterCdc.length ? store.masterCdc.filter(x => x.gender === 1 && x?.jns === 1) : []
  const arr = []
  // if (val === '3rd') {
  for (let i = 0; i < masterTb.length; i++) {
    arr[i] = [masterTb[i].age_m, masterTb[i][val]]
  }

  return arr
}
const cariPanduanWeight = (val) => {
  const masterTb = store?.masterCdc.length ? store.masterCdc.filter(x => x.gender === 1 && x?.jns === 2) : []
  console.log(masterTb)
  const arr = []
  // if (val === '3rd') {
  for (let i = 0; i < masterTb.length; i++) {
    arr[i] = [masterTb[i].age_m, masterTb[i][val]]
  }

  return arr
}

const usia = (val) => {
  const mentahan = val / 12
  const round = Math.round(mentahan * 10) / 10
  return round
}
</script>
