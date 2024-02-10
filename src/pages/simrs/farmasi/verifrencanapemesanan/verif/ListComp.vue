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
          Gudang
        </th>
        <th>
          Tanggal
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
      <template v-else>
        <template
          v-for="(item, n) in store.items"
          :key="n"
        >
          <tr :class="item?.flag==='1'?'bg-light-blue-1':''">
            <td width="5%">
              {{ n+1 }}
            </td>
            <td>
              <div class="row ">
                {{ item?.no_rencbeliobat }}
              </div>
              <!-- <div class="row ">
                {{ item?.no_verif }}
              </div> -->
            </td>
            <td>
              <div class="row text-weight-bold">
                {{ item?.gudang?.nama }}
              </div>
            </td>
            <td>
              <div>
                {{ dateFullFormat(item?.tgl) }}
              </div>
              <div v-if="item?.tgl_verif">
                {{ dateFullFormat(item?.tgl_verif) }}
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
              <!-- <q-btn
                v-if="item?.flag==='1'"
                round
                class="f-10 q-mr-sm"
                color="green"
                text-color="white"
                icon="icon-mat-done_all"
                :disable="store.loadingVerif && item?.loading"
                :loading="store.loadingVerif && item?.loading"
                @click="store.selesaiVerif(item)"
              >
                <q-tooltip
                  class="primary"
                  :offset="[10, 10]"
                >
                  Klik untuk selesai verif
                </q-tooltip>
              </q-btn> -->
              <q-btn
                square
                class="f-10"
                color="primary"
                text-color="white"
                no-caps
                @click="buka(item)"
              >
                Buka
              </q-btn>
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
import { useVerifikasiRencanaPesanStore } from 'src/stores/simrs/farmasi/verifikasiperencanaanpemesanan/verifrencana'

const store = useVerifikasiRencanaPesanStore()

// const indexId = ref(0)
function status(val) {
  let balik = ' Belum ada status'
  switch (val) {
    case '':
      balik = ' draft'
      break
    case '1':
      balik = 'Belum Diverif'
      break
    case '2':
      balik = 'Sudah Diverif'
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
      balik = 'purple'
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
  store.setRencana(val)
  console.log('buka', val)
  // if (val?.expand === undefined) val.expand = true
  // else val.expand = !val.expand
}
// function send(id) {
//   indexId.value = id
//   store.sendToSatset(id)
// }
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
