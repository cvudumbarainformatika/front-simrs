<template>
  <table>
    <thead>
      <tr>
        <th
          width="5%"
          style="border-top: 1px solid black; border-left: 1px solid black;  border-right: 1px solid black;"
        >
          No
        </th>
        <th
          style="border-top: 1px solid black; border-right: 1px solid black;"
        >
          Nama
        </th>
        <th style="border-top: 1px solid black; border-right: 1px solid black;">
          Satuan
        </th>
        <th style="border-top: 1px solid black; border-right: 1px solid black;">
          Stok Awal
        </th>
        <th style="border-top: 1px solid black; border-right: 1px solid black;">
          Penerimaan
        </th>
        <th
          colspan="3"
          style="border-top: 1px solid black; border-right: 1px solid black;"
        >
          Pengeluaran
        </th>
        <th style="border-top: 1px solid black; border-right: 1px solid black;">
          Sisa
        </th>
      </tr>
      <tr>
        <th
          style="border-right: 1px solid black;  border-left: 1px solid black; "
        />
        <th
          style="border-right: 1px solid black; "
        />
        <th
          style="border-right: 1px solid black; "
        />
        <th
          style="border-right: 1px solid black; "
        />
        <th
          style="border-right: 1px solid black; "
        />
        <th style="border-right: 1px solid black; border-top: 1px solid black;">
          Depo PNM
        </th>
        <th style="border-right: 1px solid black; border-top: 1px solid black;">
          Depo Habis Pakai
        </th>
        <th style="border-right: 1px solid black; border-top: 1px solid black;">
          Depo Gizi
        </th>
        <th style="border-right: 1px solid black; " />
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
            <div class="row">
              <div class="col-4 text-right">
                <q-skeleton
                  type="text"
                  width="100px"
                  height="14px"
                />
              </div>
              <div class="col-4 gka gki text-right">
                <q-skeleton
                  type="text"
                  width="100px"
                  height="14px"
                />
              </div>
              <div class="col-4 text-right">
                <q-skeleton
                  type="text"
                  width="100px"
                  height="14px"
                />
              </div>
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
          <tr>
            <td width="5%">
              {{ n+1 }}
            </td>
            <td>
              {{ item?.nama }}
            </td>
            <td>
              {{ item?.satuan?.nama }}
            </td>
            <td>
              <div class="text-right">
                {{ item?.awal }}
              </div>
            </td>
            <td>
              <div class="text-right">
                {{ item?.masuk }}
              </div>
            </td>
            <td>
              {{ item?.pnm }}
            </td>
            <td>
              {{ item?.hbs }}
            </td>
            <td>
              {{ item?.gizi }}
            </td>
            <td>
              <div class="text-right">
                {{ formatDouble(parseFloat(item?.akhir),2) }}
              </div>
            </td>
          </tr>
        </template>
      </template>
    </tbody>
  </table>
</template>

<script setup>

import { formatDouble } from 'src/modules/formatter'
import { useLaporanStokOpnameGudangStore } from 'src/stores/simrs/laporan/sigarang/stokopnamegudang/opname'

const store = useLaporanStokOpnameGudangStore()

</script>

<style lang="scss" scoped>
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

// th,
td {

  text-align: left;
  text-indent: 2px;
  border: 1px solid black;
  vertical-align: bottom;
  border: 1px solid black;
}
// td {
//   // padding: 0.5em 0.5em 0.5em 1.5em;
// padding: 0.5em 0.5em 0.5em 1em;
// }
th {
  vertical-align: text-top !important;
  background-color: white;
  color: black;
  border: inherit;
  // border: 1px solid black;
}
// tr{
//   border: 1px solid black;
// }
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
