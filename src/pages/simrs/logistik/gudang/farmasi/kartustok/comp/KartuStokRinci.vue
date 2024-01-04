<template>
  <q-dialog
    persistent
    :maximized="true"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card
      class=""
      style="overflow: hidden;"
    >
      <div class="column full-height scroll">
        <div class="col-auto">
          <div class="column">
            <q-bar class="bg-primary text-white">
              <q-space />
              <q-btn
                v-close-popup
                dense
                flat
                icon="icon-mat-close"
              >
                <q-tooltip class="bg-white text-primary">
                  Close
                </q-tooltip>
              </q-btn>
            </q-bar>

            <div class="q-px-md q-py-sm">
              <div class="row justify-between">
                <div class="kiri column">
                  <div class="row">
                    <div style="width:100px">
                      Ruangan
                    </div>
                    <div> : {{ params.koderuangan }}</div>
                  </div>
                  <div class="row">
                    <div style="width:100px">
                      Kode Barang
                    </div>
                    <div> : {{ item?.kd_obat }}</div>
                  </div>
                  <div class="row">
                    <div style="width:100px">
                      Nama Barang
                    </div>
                    <div> : {{ item?.nama_obat }}</div>
                  </div>
                </div>
                <div class="kanan column">
                  <div class="text-right">
                    Periode
                  </div>
                  <div>
                    Bulan {{ bulans[parseInt(params?.bulan) - 1??0] }} Tahun {{ params?.tahun }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col full-height">
          <q-scroll-area style="height: calc( 100% - 1px );">
            <table>
              <thead>
                <tr>
                  <th>Tanggal</th>
                  <th>Keterangan</th>
                  <th class="text-end">
                    Debet
                  </th>
                  <th class="text-end">
                    Kredit
                  </th>
                  <th class="text-end">
                    Saldo
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="n in 100"
                  :key="n"
                >
                  <td>Miguel De Cervantes</td>
                  <td>The Ingenious Gentleman Don Quixote of La Mancha</td>
                  <td class="text-end">
                    1605
                  </td>
                  <td class="text-end">
                    9783125798502
                  </td>
                  <td class="text-end">
                    9783125798502
                  </td>
                </tr>
              </tbody>
            </table>
          </q-scroll-area>
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  item: {
    type: Object,
    default: null
  },
  params: {
    type: Object,
    default: null
  }
})

const bulans = ref(['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'Novermber', 'Desember'])

console.log('props', props.item)
</script>

<style lang="scss" scoped>

.text-end{
  text-align: end;
}
/* Standard Tables */

table {
  // margin: 1em 0;
  // border-collapse: collapse;
  border: 0.1em solid #d6d6d6;
  width: 100%;
}

caption {
  text-align: left;
  font-style: italic;
  padding: 0.25em 0.5em 0.5em 0.5em;
  // position: -webkit-sticky;
  // position: sticky;
  // top: 0;
  // z-index: 2;
}

th,
td {
  padding: 0.25em 0.5em 0.25em 1em;
  vertical-align: text-top;
  text-align: left;
  text-indent: -0.5em;
}

th {
  vertical-align: bottom;
  background-color: #666;
  color: #fff;
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
