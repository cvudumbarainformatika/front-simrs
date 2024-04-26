<template>
  <div class="column full-height full-width">
    <div class="col-auto bg-primary text-white">
      <div class="row q-pa-sm">
        {{ title }} ({{ pasien?.nama }})
      </div>
    </div>
    <div
      v-if="store.historys.length && !store.loadingHistory"
      class="col full-height bg-grey-3 scroll"
    >
      <!-- <q-infinite-scroll
        :offset="250"
        @load="onLoad"
      > -->
      <!-- <q-list
          bordered
          separator
          class="bg-grey-3"
        > -->
      <q-card
        v-for="(item, index) in store.historys"
        :key="index"
        class="q-mb-lg q-pa-md"
      >
        <!-- <q-item
            v-for="(item, index) in store.historys"
            :key="index"
            class="q-mb-md"
          > -->
        <div class="column">
          <q-item-label class="text-primary">
            <b>Riwayat Anamnese Tanggal : <em>{{ humanDate(item?.tgl) }}</em></b>
          </q-item-label>
          <q-item-label class="q-mb-sm text-orange">
            <span>Petugas : <em>{{ item?.datasimpeg?.nama }}</em></span>
          </q-item-label>
          <table class="row full-width">
            <th>Keluhan Utama</th>
            <td>{{ item?.keluhanutama ?? '-' }}</td>
            <th>Riwayat Penyakit (Skrg)</th>
            <td>{{ item?.riwayatpenyakitsekarang ?? '-' }}</td>
            <th>Riwayat Penyakit</th>
            <td>{{ item?.riwayatpenyakit ?? '-' }}</td>
            <th>Riwayat Alergi</th>
            <td>{{ item?.riwayatalergi ?? '-' }}</td>
            <th>Reaksi Berupa</th>
            <td>{{ item?.keteranganalergi ?? '-' }}</td>
            <th>Riwayat Pengobatan</th>
            <td>{{ item?.keteranganalergi ?? '-' }}</td>
          </table>
          <table class="row full-width table2">
            <td>Apakah Pasien mengalami penurunan / peningkatan BB yang tidak diinginkan dalam 6 Bulan terakhir ?</td>
            <th>{{ getYT(item?.skreeninggizi) }}</th>
            <td>Apakah Asupan Makan berkurang karena tidak nafsu makan ? </td>
            <th>{{ getYT(item?.asupanmakan) }}</th>

            <td>Skor </td>
            <th>{{ item?.skor ?? 0 }}</th>
            <th>Kondisi Khusus </th>
            <td>{{ item?.kondisikhusus }}</td>
            <th>Keluhan Nyeri </th>
            <td>
              <q-icon
                size="xs"
                color="teal"
                :name="iconNyeri(item?.scorenyeri)"
              />
              {{ setKeteranganSkornyeri(item?.scorenyeri) }}
            </td>
          </table>

          <div
            class="f-12 text-right q-mt-md text-info cursor-pointer"
            @click="store.copyForm(item)"
          >
            Copy Anamnese? Click disini
          </div>
        </div>
        <template #loading>
          <div class="row justify-center q-my-md">
            <q-spinner-dots
              color="primary"
              size="40px"
            />
          </div>
        </template>
        <!-- </q-item> -->
        <!-- </q-list> -->
      </q-card>
      <!-- </q-infinite-scroll> -->
    </div>
    <div
      v-else
      class="col full-height"
    >
      <div
        v-if="store.loadingHistory"
        class="column full-height flex-center"
      >
        <div class="row justify-center q-my-md">
          <q-spinner-dots
            color="primary"
            size="40px"
          />
        </div>
        Harap Menunggu ..... Sinkron Data
      </div>
      <div
        v-else
        class="column full-height flex-center"
      >
        MAAF ... DATA HISTORY ANAMNESIS BELUM ADA
      </div>
    </div>
  </div>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
import { onMounted, ref } from 'vue'
import { useAnamnesis } from 'src/stores/simrs/pelayanan/poli/anamnesis'
// eslint-disable-next-line no-unused-vars
import { humanDate } from 'src/modules/formatter'

const store = useAnamnesis()
const props = defineProps({
  pasien: {
    type: Object,
    default: () => {}
  },
  title: {
    type: String,
    default: 'History'
  }
})

// eslint-disable-next-line no-unused-vars
const emits = defineEmits(['clickBtn'])

// eslint-disable-next-line no-unused-vars
function pilihData(row) {
  // console.log(row)
  store.pilihHistory(row)
}

onMounted(() => {
  // console.log('onMounted')
  store.getHistory(props?.pasien?.norm)
})

// function splitter(txt) {
//   if (txt !== '' || txt !== null || txt !== undefined) {
//     const arr = txt?.split('cursor=')
//     return arr[1]
//   }

//   return null
// }

// function onLoad(index, done) {
//   // if (!store.loadingHistory) {
//   console.log('index', index)
//   // console.log('split', splitter(store.historyMeta?.next_page_url))
//   setTimeout(() => {
//     store.getHistory(props?.pasien?.norm, index + 1)
//     done()
//   }, 1000)
//   // }
// }

function getYT(val) {
  if (val === 1 || val === '1') {
    return 'Ya'
  } else if (val === 0 || val === '0') {
    return 'Tidak'
  } else {
    return '-'
  }
}

function iconNyeri(it) {
  const val = typeof it === 'string' ? (isNaN(parseInt(it)) ? 0 : parseInt(it)) : 0
  // console.log('val nyeri', val)
  // console.log('anu nyeri', anu)
  let icon = 'icon-my-emoticon-excited-outline'
  if (val < 2) {
    icon = 'icon-my-emoticon-excited-outline'
  } else if (val >= 2 && val < 4) {
    icon = 'icon-my-emoticon-outline'
  } else if (val >= 4 && val < 6) {
    icon = 'icon-my-emoticon-neutral-outline'
  } else if (val >= 6 && val < 8) {
    icon = 'icon-my-emoticon-confused-outline'
  } else if (val >= 8 && val < 10) {
    icon = 'icon-my-emoticon-angry-outline'
  } else if (val === 10) {
    icon = 'icon-my-emoticon-cry-outline'
  }

  return icon
}

function setKeteranganSkornyeri(it) {
  const val = typeof it === 'string' ? (isNaN(parseInt(it)) ? 0 : parseInt(it)) : 0
  let result = 'tidak ada nyeri'
  if (val === 0) {
    result = 'tidak ada nyeri'
  } else if (val > 0 && val <= 3) {
    result = 'nyeri ringan'
  } else if (val > 3 && val <= 6) {
    result = 'nyeri sedang'
  } else if (val > 6 && val <= 10) {
    result = 'nyeri berat'
  }

  return result
}

</script>

<style lang="scss" scoped>
table {
  width: 100%;
  background-color: #fff;
  // padding: 2px;
  th{
    width: 35%;
    text-align: left;
  }
  td {
    width: 65%;
    text-align: left;
  }
  th, td {
    border: 1px solid gray;
    padding: 5px;
    border-collapse: collapse;
  }
}

table.table2{
  width: 100%;
  background-color: #fff;
  // padding: 2px;
  th{
    width: 25%;
    text-align: left;
  }
  td {
    width: 75%;
    text-align: left;
  }
  th, td {
    border: 1px solid gray;
    padding: 5px;
    border-collapse: collapse;
  }
}

</style>
