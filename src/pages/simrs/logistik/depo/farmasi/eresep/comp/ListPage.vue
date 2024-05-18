<template>
  <table>
    <thead>
      <tr>
        <th width="5%">
          No
        </th>
        <th>
          Resep
        </th>
        <th>
          Pasien
        </th>
        <th>
          Dokter
        </th>
        <th>
          Ruangan
        </th>
        <th>
          Status
        </th>
        <th class="text-end">
          Aksi
        </th>
      </tr>
    </thead>
    <tbody>
      <template v-if="store.loading">
        <tr
          v-for="n in store.params.per_page"
          :key="n"
        >
          <td width="5%">
            <q-skeleton
              type="text"
              width="20px"
              height="14px"
            />
          </td>
          <td>
            <q-skeleton
              type="text"
              width="50px"
              height="14px"
            />
            <q-skeleton
              type="text"
              width="40px"
              height="10px"
            />
          </td>
          <td>
            <div class="row q-mb-xs q-col-gutter-sm">
              <q-skeleton
                type="text"
                width="100px"
                height="14px"
              />
            </div>
            <div class="row q-col-gutter-sm items-center">
              <q-skeleton
                type="text"
                width="40px"
                height="14px"
              />
              <div class="text-grey q-pt-none">
                ||
              </div>
              <q-skeleton
                type="text"
                width="40px"
                height="14px"
                class="q-ml-xs"
              />
            </div>
          </td>
          <td>
            <q-skeleton
              type="text"
              width="100px"
              height="14px"
            />
          </td>
          <td>
            <q-skeleton
              type="text"
              width="100px"
              height="14px"
            />
          </td>
          <td class="text-end">
            <div class="row justify-end">
              <q-skeleton
                type="text"
                width="100px"
                height="14px"
              />
            </div>
          </td>
        </tr>
      </template>
      <template v-else-if="!store.items.length">
        <tr>
          <td colspan="7">
            <app-no-data />
          </td>
        </tr>
      </template>
      <template v-else>
        <template
          v-for="(item, n) in store.items"
          :key="n"
        >
          <tr :class="item?.flag==='1'?'bg-light-blue-2':''">
            <td width="5%">
              {{ n+1 }}
            </td>
            <td>
              <div class="row ">
                {{ item?.noresep }}
              </div>
              <div class="row text-grey f-10">
                <div>
                  {{ dateFullFormat(item?.tgl_permintaan) }}
                </div>
                <div
                  v-if="item?.tiperesep==='iter' && item?.noresep_asal!==''"
                  class="q-ml-sm"
                >
                  (copy - {{ dateFullFormat(item?.tgl) }}  )
                </div>
              </div>
              <div
                v-if="item?.tiperesep==='iter'"
                class="row text-purple text-weight-bold f-10"
              >
                iter s/d {{ dateFullFormat(item?.iter_expired) }}
              </div>
              <div
                v-if="item?.tiperesep==='prb'"
                class="row text-blue text-weight-bold f-10"
              >
                PRB
              </div>
              <div
                v-if="item?.adaKronis"
                class="row text-negative text-weight-bold f-10"
              >
                {{ item?.adaKronis }}
              </div>
              <div
                v-if="item?.adaKronisR"
                class="row text-negative text-weight-bold f-10"
              >
                {{ item?.adaKronisR }}
              </div>
            </td>
            <td>
              <div class="row text-weight-bold">
                {{ item?.datapasien?.nama }}
              </div>
              <div class="row">
                {{ item?.noreg }} || {{ item?.norm }}
              </div>
            </td>
            <td>
              {{ item?.dokter?.nama }}
            </td>
            <td>
              <div v-if="item?.poli">
                {{ item?.poli?.rs2 }}
              </div>
              <div v-if="item?.ruanganranap">
                {{ item?.ruanganranap?.rs2 }}
              </div>
            </td>
            <td>
              <q-chip
                square
                class="f-10"
                :color="color(item?.flag)"
                text-color="white"
              >
                {{ status(item?.flag) }}
              </q-chip>
            </td>
            <td class="text-end q-mr-sm">
              <q-btn
                round
                class="f-10 q-mr-sm"
                color="dark"
                text-color="white"
                icon="icon-mat-print"
                @click="toPrint(item)"
              >
                <q-tooltip
                  class="primary"
                  :offset="[10, 10]"
                >
                  Print resep
                </q-tooltip>
              </q-btn>
              <q-btn
                v-if="item?.flag==='1'"
                round
                class="f-10 q-mr-sm"
                :color="color(item?.flag)"
                text-color="white"
                icon="icon-mat-move_to_inbox"
                :disable="store.loadingTerima && item?.loading"
                :loading="store.loadingTerima && item?.loading"
                @click="store.terimaResep(item)"
              >
                <q-tooltip
                  class="primary"
                  :offset="[10, 10]"
                >
                  Terima
                </q-tooltip>
              </q-btn>
              <q-btn
                v-if="item?.flag==='2' && item?.doneresep && item?.doneracik"
                round
                class="f-10 q-mr-sm"
                :color="color(item?.flag)"
                text-color="white"
                icon="icon-mat-done_all"
                :disable="store.loadingSelesai && item?.loading"
                :loading="store.loadingSelesai && item?.loading"
                @click="store.resepSelesai(item)"
              >
                <q-tooltip
                  class="primary"
                  :offset="[10, 10]"
                >
                  Selesai
                </q-tooltip>
              </q-btn>
              <q-btn
                square
                class="f-10"
                color="primary"
                text-color="white"
                label="Buka"
                no-caps
                @click="buka(item)"
              >
                <q-tooltip
                  class="primary"
                  :offset="[10, 10]"
                >
                  Buka Resep Pasien
                </q-tooltip>
              </q-btn>
              <q-btn
                square
                class="f-10"
                color="yellow"
                text-color="green"
                label="Info"
                no-caps
                @click="info(item)"
              >
                <q-tooltip
                  class="primary"
                  :offset="[10, 10]"
                >
                  Pelayanan Informasi Obat
                </q-tooltip>
              </q-btn>
            </td>
            <!-- <td class="text-end">
            <div>
              <q-btn
                icon="icon-mat-send"
                flat
                dense
                size="sm"
                round
                color="primary"
                :loading="store.loadingSend && indexId===item?.id"
                :disable="store.loadingSend && indexId === item?.id"
                @click="send(item?.id)"
              />
            </div>
          </td> -->
          </tr>
          <!-- <tr v-if="item.expand">
            <td colspan="6">
              <div>{{ item }}</div>
            </td>
          </tr> -->
        </template>
      </template>
    </tbody>
  </table>
</template>

<script setup>
// import { ref } from 'vue'
import { dateFullFormat } from 'src/modules/formatter'
import { useEResepDepoFarmasiStore } from 'src/stores/simrs/farmasi/eresep/eresep'
import { usePrintEresepStore } from 'src/stores/simrs/farmasi/eresep/printesep'
import { useRouter } from 'vue-router'

const store = useEResepDepoFarmasiStore()
const router = useRouter()

// const indexId = ref(0)
function status(val) {
  let balik = ' Belum ada status'
  switch (val) {
    case '':
      balik = ' draft'
      break
    case '1':
      balik = 'Belum diterima'
      break
    case '2':
      balik = 'Siap di kerjakan'
      break
    case '3':
      balik = 'Selesai'
      break
    case '4':
      balik = 'Returned'
      break

    default:
      break
  }
  return balik
}
function color(val) {
  let balik = 'grey'
  switch (val) {
    case '':
      balik = 'grey'
      break
    case '1':
      balik = 'grey'
      break
    case '2':
      balik = 'green'
      break
    case '3':
      balik = 'negative'
      break
    case '4':
      balik = 'orange'
      break

    default:
      break
  }
  return balik
}

function buka(val) {
  store.setOpen()
  store.setResep(val)
  // console.log('buka', val)
  // if (val?.expand === undefined) val.expand = true
  // else val.expand = !val.expand
}
function info(val) {
  store.openInfo()
  store.setInfo(val)
}
// function send(id) {
//   indexId.value = id
//   store.sendToSatset(id)
// }
const print = usePrintEresepStore()
function toPrint(row) {
  print.setResep(row)
  console.log('row', row)
  const noresep = row?.noresep
  const routeData = router.resolve({
    path: '/print/eresep',
    query: {
      noresep
    }
  })
  window.open(routeData.href, '_blank')
}
</script>

<style lang="scss" scoped>

.text-end{
  text-align: end;
}
/* Standard Tables */

table {
  // margin: 1em 0;
  border-collapse: collapse;
  border: 1px solid #d6d6d6;
  width: 100%;
  margin-bottom: 50px;
}

th,
td {

  vertical-align: text-top;
  text-align: left;
  text-indent: -0.5em;
}
td {
  padding: 0.5em 0.5em 0.5em 1.5em;
}
th {
  padding: 0.5em 0.5em 0.5em 1em;
  vertical-align: bottom;
  background-color: $dark;
  color: $white;
}

tr:nth-child(even) th[scope=row] {
  background-color: #f2f2f2;
}

tr:nth-child(odd) th[scope=row] {
  background-color: #fff;
}

tr:nth-child(even) {
  background-color: rgba(0, 0, 0, 0.05);
}

tr:nth-child(odd) {
  background-color: rgba(255, 255, 255, 0.05);
}

td:nth-of-type(2) {
  font-style: italic;
}

// th:nth-of-type(3),
// td:nth-of-type(3) {
//   text-align: right;
// }
/* Fixed Headers */

th {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 2;
}

th[scope=row] {
  position: -webkit-sticky;
  position: sticky;
  left: 0;
  z-index: 1;
}

th[scope=row] {
  vertical-align: top;
  color: inherit;
  background-color: inherit;
  background: linear-gradient(90deg, transparent 0%, transparent calc(100% - .05em), #d6d6d6 calc(100% - .05em), #d6d6d6 100%);
}

table:nth-of-type(2) th:not([scope=row]):first-child {
  left: 0;
  z-index: 3;
  background: linear-gradient(90deg, #666 0%, #666 calc(100% - .05em), #ccc calc(100% - .05em), #ccc 100%);
}

/* Strictly for making the scrolling happen. */

th[scope=row] + td {
  min-width: 24em;
}

th[scope=row] {
  min-width: 20em;
}

</style>
