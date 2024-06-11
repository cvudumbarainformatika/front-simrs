<template>
  <table>
    <thead>
      <tr>
        <th width="5%">
          No
        </th>
        <th>
          Nomor
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
          <td colspan="5">
            <app-no-data />
          </td>
        </tr>
      </template>
      <template v-else>
        <template
          v-for="(item, n) in store.items"
          :key="n"
        >
          <tr
            :class="item?.higlight?'bg-light-blue-2 cursor-pointer':'cursor-pointer'"
            @click="expand(item)"
          >
            <td width="5%">
              {{ n+1 }}
            </td>
            <td>
              <div class="row ">
                {{ item?.nopemakaian }}
              </div>
              <div class="row text-grey f-10">
                {{ dateFullFormat(item?.tgl) }}
              </div>
            </td>
            <td>
              {{ item?.ruangan?.uraian }}
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
              <!-- <q-btn
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
              </q-btn> -->
              <q-btn
                v-if="item?.flag==='1'"
                round
                icon="icon-mat-print"
                dense
                color="dark"
                size="sm"
                @click="toPrint(item)"
              >
                <q-tooltip
                  class="primary"
                  :offset="[10, 10]"
                >
                  Print
                </q-tooltip>
              </q-btn>
              <q-btn
                v-if="item?.flag==='1'"
                round
                flat
                class="f-10 q-mr-sm"
                color="negative"
                icon="icon-mat-lock"
              >
                <q-tooltip
                  class="primary"
                  :offset="[10, 10]"
                >
                  Sudah dikunci
                </q-tooltip>
              </q-btn>
              <q-btn
                v-if="item?.flag===''"
                round
                flat
                class="f-10 q-mr-sm"
                color="green"
                icon="icon-mat-lock_open"
                :disable="store.loadingSelesai && item?.loading"
                :loading="store.loadingSelesai && item?.loading"
                @click="selesai(item)"
              >
                <q-tooltip
                  class="primary"
                  :offset="[10, 10]"
                >
                  Kunci
                </q-tooltip>
              </q-btn>
              <q-btn
                v-if="item?.flag===''"
                round
                flat
                class="f-10 q-mr-sm"
                color="negative"
                icon="icon-mat-delete_sweep"
                :disable="(store.loadingHead && item?.loading) || rincLoading(item)"
                :loading="store.loadingHead && item?.loading"
                @click="hapusHead(item)"
              >
                <q-tooltip
                  class="primary"
                  :offset="[10, 10]"
                >
                  Hapus Data Pemakaian
                </q-tooltip>
              </q-btn>
              <q-btn
                v-if="item.expand"
                round
                flat
                class="f-10"
                color="grey"
                icon="icon-mat-expand_less"
              />
              <q-btn
                v-if="!item.expand"
                round
                flat
                class="f-10"
                color="grey"
                icon="icon-mat-expand_more"
              />
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
          <tr v-if="item.expand">
            <td
              colspan="5"
              class="bg-white"
            >
              <div class="head">
                <div class="row">
                  <div class="col-1">
                    No
                  </div>
                  <div class="col-8">
                    Obat
                  </div>
                  <div class="col-2">
                    Jumlah
                  </div>
                  <div class="col-1 text-right">
                    <div class="q-mr-md">
                      #
                    </div>
                  </div>
                </div>
              </div>
              <div
                v-for="(rin,i) in item?.rinci"
                :key="i"
                class="child"
              >
                <!-- {{ rin }} -->
                <div class="row items-center">
                  <div class="col-1">
                    {{ i+1 }}
                  </div>
                  <div class="col-8">
                    <div class="row text-weight-bold">
                      {{ rin?.obat?.nama_obat }}
                    </div>
                    <div class="row text-italic f-10 text-grey">
                      {{ rin?.obat?.kd_obat }}
                    </div>
                  </div>
                  <div class="col-2">
                    {{ rin?.total }}
                  </div>
                  <div class="col-1 text-right">
                    <div class="q-mr-md">
                      <q-btn
                        v-if="item?.flag===''"
                        round
                        flat
                        class="f-8 q-mr-sm"
                        color="negative"
                        icon="icon-mat-delete"
                        :disable="(store.loadingRinci && rin?.loading ) || item?.loading"
                        :loading="store.loadingRinci && rin?.loading"
                        @click="hapusRinci(rin)"
                      >
                        <q-tooltip
                          class="primary"
                          :offset="[10, 10]"
                        >
                          Hapus Obat
                        </q-tooltip>
                      </q-btn>
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </template>
      </template>
    </tbody>
  </table>
</template>

<script setup>
// import { ref } from 'vue'
import { dateFullFormat } from 'src/modules/formatter'
// import { usePrintEresepStore } from 'src/stores/simrs/farmasi/eresep/printesep'
import { useListPemakaianRuanganStore } from 'src/stores/simrs/farmasi/pemakaianruangan/listpemakaian'
// import { useRouter } from 'vue-router'

const store = useListPemakaianRuanganStore()
// const router = useRouter()

function toPrint (val) {
  store.dataToPrint = val
  val.expand = !val.expand
  val.highlight = !val.highlight
  store.isOpen = true
  // console.log('val', val, dialogPrint.value)
}
function expand (item) {
  item.expand = !item.expand
  item.higlight = !item.higlight
}
function selesai (item) {
  item.expand = !item.expand
  item.higlight = !item.higlight
  store.selesaiPemakaian(item)
}
function hapusHead (item) {
  item.expand = !item.expand
  item.higlight = !item.higlight
  store.hapusHead(item)
}
function hapusRinci (item) {
  store.hapusRinci(item)
}
function rincLoading (val) {
  const ada = val?.rinci.filter(rin => rin.loading)
  if (ada.length) return true
  else return false
}
// const indexId = ref(0)
function status (val) {
  let balik = ' Belum ada status'
  switch (val) {
    case '':
      balik = ' Belum dikunci'
      break
    case '1':
      balik = 'Dikunci'
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
function color (val) {
  let balik = 'grey'
  switch (val) {
    case '':
      balik = 'grey'
      break
    case '1':
      balik = 'green'
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

// function buka(val) {
//   store.setOpen()
//   store.setResep(val)
//   console.log('buka', val)
//   // if (val?.expand === undefined) val.expand = true
//   // else val.expand = !val.expand
// }
// function send(id) {
//   indexId.value = id
//   store.sendToSatset(id)
// }
// const print = usePrintEresepStore()
// function toPrint(row) {
//   print.setResep(row)
//   console.log('row', row)
//   const noresep = row?.noresep
//   const routeData = router.resolve({
//     path: '/print/eresep',
//     query: {
//       noresep
//     }
//   })
//   window.open(routeData.href, '_blank')
// }
</script>

<style lang="scss" scoped>
.head{
  border: 1px solid rgb(44, 43, 43);
  padding-left: 10px;
  background-color:  rgba(0, 0, 0, 0.9);
  color: white;
}
.child{
  border-bottom: 1px solid rgb(44, 43, 43);
  border-left: 1px solid rgb(44, 43, 43);
  border-right: 1px solid rgb(44, 43, 43);
  padding-left: 10px;
}
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
