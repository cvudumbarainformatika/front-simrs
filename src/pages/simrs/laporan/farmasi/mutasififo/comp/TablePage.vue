<template>
  <table style="width: calc(100vw - 80px);">
    <thead class="my-sticky-header-table">
      <tr>
        <th
          width="5%"
          rowspan="2"
        >
          No
        </th>
        <th rowspan="2">
          Obat
        </th>
        <th v-if="store.params.jenis==='rekap'" rowspan="2">
          Kode Belanja
        </th>
        <th rowspan="2">
          Keterangan
        </th>
        <th colspan="3">
          Saldo Awal
        </th>
        <th colspan="4">
          Masuk
        </th>
        <th colspan="4">
          Keluar
        </th>
        <th colspan="3">
          Saldo Akhir
        </th>
      </tr>
      <tr>
        <th>Jml</th>
        <th>Harga</th>
        <th>Subtotal</th>
        <th>Tgl Masuk</th>
        <th>Jml</th>
        <th>Harga</th>
        <th>Subtotal</th>
        <th>Tgl Keluar</th>
        <th>Jml</th>
        <th>Harga</th>
        <th>Subtotal</th>
        <th>Jml</th>
        <th>Harga</th>
        <th>Subtotal</th>
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
          <td v-if="store.params.jenis==='rekap'">
            <q-skeleton
              type="text"
              width="150px"
              height="25px"
            />
          </td>
          <td>
            <q-skeleton
              type="text"
              width="150px"
              height="25px"
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
          <td>
            <q-skeleton
              type="text"
              width="100px"
              height="14px"
            />
          </td>
        </tr>
      </template>
      <template v-else-if="!store.items.length">
        <tr v-if="store.params.jenis==='rekap'">
          <td colspan="18">
            <app-no-data />
          </td>
        </tr>
        <tr v-else>
          <td colspan="17">
            <app-no-data />
          </td>
        </tr>
      </template>
      <template v-else>
        <template
          v-for="(item, n) in store.items"
          :key="n"
        >
          <tr :class="n%2===0?'even':'odd'">
            <td width="5%" :rowspan="rowspanObat(item)">
              <div class="row items-center">
                {{ n+1 }}
              </div>
            </td>
            <td :rowspan="rowspanObat(item)">
              <div class="row text-weight-bold">
                {{ item?.nama_obat }}
              </div>
              <div class="row items-end">
                <div class="col-auto f-10 q-mr-md">
                  {{ item?.kd_obat }}
                </div>
                <div class="col-auto q-mr-md f-10">
                  ({{ item?.satuan_k }})
                </div>
              </div>
            </td>
            <td v-if="store.params.jenis==='rekap'" :rowspan="rowspanObat(item)">
              {{ item?.uraian50 }}
            </td>
            <template v-if="!item?.data?.length">
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
            </template>
          </tr>
          <template v-if="item?.data?.length">
            <tr v-for="(data) in item?.data" :key="data" :class="n%2===0?'even':'odd'" class="hv">
              <td>
                <div class="text-right q-mr-xs" :class="data?.subtotal?'text-weight-bold':''">
                  {{ data?.ket }}
                </div>
              </td>
              <td>
                <div class="text-right q-mr-xs">
                  {{ cekNan(formatDouble(parseFloat(data?.saldoawal?.jumlah),2)) }}
                </div>
              </td>
              <td>
                <div class="text-right q-mr-xs">
                  {{ cekNan(formatDouble(parseFloat(data?.saldoawal?.harga),2)) }}
                </div>
              </td>
              <td>
                <div class="text-right q-mr-xs">
                  {{ cekNan(formatDouble(parseFloat(data?.saldoawal?.sub),2)) }}
                </div>
              </td>
              <!-- masuk -->
              <td>
                <div class="text-right q-mr-xs">
                  {{ data?.masuk?.tgl?dateFullFormat(data?.masuk?.tgl):'' }}
                </div>
              </td>
              <td>
                <div class="text-right q-mr-xs">
                  {{ cekNan(formatDouble(parseFloat(data?.masuk?.jumlah),2)) }}
                </div>
              </td>
              <td>
                <div class="text-right q-mr-xs">
                  {{ cekNan(formatDouble(parseFloat(data?.masuk?.harga),2)) }}
                </div>
              </td>
              <td>
                <div class="text-right q-mr-xs">
                  {{ cekNan(formatDouble(parseFloat(data?.masuk?.sub),2)) }}
                </div>
              </td>
              <!-- keluar -->
              <td>
                <div class="text-right q-mr-xs">
                  {{ data?.keluar?.tgl?dateFullFormat(data?.keluar?.tgl):'' }}
                </div>
              </td>
              <td>
                <div class="text-right q-mr-xs">
                  {{ cekNan(formatDouble(parseFloat(data?.keluar?.jumlah),2)) }}
                </div>
              </td>
              <td>
                <div class="text-right q-mr-xs">
                  {{ cekNan(formatDouble(parseFloat(data?.keluar?.harga),2)) }}
                </div>
              </td>
              <td>
                <div class="text-right q-mr-xs">
                  {{ cekNan(formatDouble(parseFloat(data?.keluar?.sub),2)) }}
                </div>
              </td>
              <!-- saldo akhir-->
              <td>
                <div class="text-right q-mr-xs" :class="data?.subtotal?'text-weight-bold':''">
                  {{ cekNan(formatDouble(parseFloat(data?.akhir?.jumlah ?? data?.subtotal?.jumlah),2)) }}
                </div>
              </td>
              <td>
                <div class="text-right q-mr-xs" :class="data?.subtotal?'text-weight-bold':''">
                  {{ cekNan(formatDouble(parseFloat(data?.akhir?.harga),2)) }}
                </div>
              </td>
              <td>
                <div class="text-right q-mr-xs" :class="data?.subtotal?'text-weight-bold':''">
                  {{ cekNan(formatDouble(parseFloat(data?.akhir?.sub ?? data?.subtotal?.sub),2)) }}
                </div>
              </td>
            </tr>
          </template>
        </template>
        <template v-if="store.loadingNext">
          <tr
            v-for="m in store.params.per_page"
            :key="m"
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
                width="150px"
                height="25px"
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
            <td>
              <q-skeleton
                type="text"
                width="100px"
                height="14px"
              />
            </td>
          </tr>
        </template>
        <!-- <tr class="text-weight-bold">
          <td colspan="6">
            Total
          </td>
          <td> {{ formatDouble(parseFloat(store.total),2) }}</td>
        </tr> -->
      </template>
    </tbody>
  </table>
</template>

<script setup>

// eslint-disable-next-line no-unused-vars
import { dateFullFormat, formatDouble } from 'src/modules/formatter'
import { useLaporanMutasiFiFoFarmasiStore } from 'src/stores/simrs/laporan/farmasi/mutasififo/mutasi'

const store = useLaporanMutasiFiFoFarmasiStore()

function rowspanObat (val) {
  const salLength = val?.data?.length
  const panj = salLength + 1

  return panj
}
function cekNan (val) {
  return isNaN(parseFloat(val)) ? '' : val
}
</script>

<style lang="scss" scoped>
.hv:hover{
  background-color: #0D5A86;
  color:#fff
}
.gt{
  border-top: 1px solid black;
}
.gka{
  border-right: 1px solid black;
}
.gki{
  border-left: 1px solid black;
}
.gb{
  border-bottom: 1px solid black;
}
//
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
thead{
  border: 1px solid black;
  tr{
    th{
      border: 1px solid black;
      vertical-align: center !important;
      background-color: white;
      color: black;
    }
  }
}
.odd{
  background-color: rgba(255, 255, 255, 0.05);
}
.even{
  background-color: rgba(0, 0, 0, 0.05);
}
// th,
td {

  text-align: left;
  text-indent: 2px;
  border: 1px solid black;
  vertical-align: center;
  border: 1px solid black;
}
// td {
//   // padding: 0.5em 0.5em 0.5em 1.5em;
// padding: 0.5em 0.5em 0.5em 1em;
// }
// th {
  // border: inherit;
  // border: 1px solid black;
// }
// tr{
//   border: 1px solid black;
// }
tr:nth-child(even) th[scope=row] {
  background-color: #f2f2f2;
}

tr:nth-child(odd) th[scope=row] {
  background-color: #fff;
}

// tr:nth-child(even) {
//   background-color: rgba(0, 0, 0, 0.05);
// }

// tr:nth-child(odd) {
//   background-color: rgba(255, 255, 255, 0.05);
// }

// td:nth-of-type(2) {
//   font-style: italic;
// }

// th:nth-of-type(3),
// td:nth-of-type(3) {
//   text-align: right;
// }
/* Fixed Headers */

th {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 5;
  border: inherit;
}

th[scope=row] {
  position: -webkit-sticky;
  position: sticky;
  left: 0;
  z-index: 1;
  border: inherit;
}

th[scope=row] {
  vertical-align: top;
  color: inherit;
  background-color: inherit;
  background: linear-gradient(90deg, transparent 0%, transparent calc(100% - .05em), #d6d6d6 calc(100% - .05em), #d6d6d6 100%);
  border: inherit;
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
