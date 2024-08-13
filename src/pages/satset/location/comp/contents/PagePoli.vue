<template>
  <table>
    <thead>
      <tr>
        <th>Nama Ruangan</th>
        <th>Deskripsi</th>
        <th>Status</th>
        <th class="text-end">
          OPTIONS
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, n) in store.ruanganRajals"
        :key="n"
      >
        <td>{{ item?.uraian }}</td>
        <td>Gedung {{ item?.gedung }} Lantai {{ item?.lantai }} Ruang {{ item?.ruang }}</td>
        <td>
          <em
            v-if="!item?.satset_uuid"
            class="text-negative"
          >Belum Terkoneksi Satu Sehat</em>
          <em
            v-else
            class="text-primary"
          >Terkoneksi Satu Sehat</em>
        </td>
        <td class="text-end">
          <div>
            <q-btn
              icon="icon-mat-send"
              flat
              dense
              size="sm"
              round
              color="primary"
              @click="store.setRuangan(item,'rajal')"
            />
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { onMounted } from 'vue'
import { useLocationSatsetStore } from 'src/stores/satset/location'

const store = useLocationSatsetStore()

onMounted(() => {
  store.getRuanganRajal()
})

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
  padding: 0.5em 0.5em 0.5em 1em;
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
