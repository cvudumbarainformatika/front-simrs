<template>
  <table>
    <thead>
      <tr>
        <th>Nama Departemen</th>
        <th>PHONE</th>
        <th class="text-end">
          EMAIL
        </th>
        <th class="text-end">
          STATUS
        </th>
        <th class="text-end">
          OPTIONS
        </th>
      </tr>
    </thead>
    <tbody>
      <template v-if="store.items.length">
        <tr
          v-for="(item, n) in store?.items"
          :key="n"
        >
          <td>{{ n + 1 }}. {{ item?.nama }}</td>
          <td>{{ item?.phone }}</td>
          <td class="text-end">
            {{ item?.email }}
          </td>
          <td class="text-end">
            <div
              v-if="!item.satset_uuid"
              class="row q-gutter-sm justify-end"
            >
              <q-badge
                outline
                color="negative"
                label="Belum Terkoneksi Satu Sehat"
                class="q-pa-sm"
              />
            </div>
            <q-badge
              v-else
              outline
              color="primary"
              label="Terkoneksi Satu Sehat"
              class="q-pa-sm"
            />
          </td>
          <td>
            <div
              v-if="!item.satset_uuid"
              class="row items-center justify-end"
            >
              <q-btn
                icon="icon-mat-send"
                size="sm"
                round
                color="primary"
                flat
                @click="store.kirimSatset(item)"
              >
                <q-tooltip>Kirim Ke Satu Sehat</q-tooltip>
              </q-btn>
            </div>
            <div
              v-else
              class="row items-center justify-end"
            >
              <q-btn
                icon="icon-mat-visibility"
                size="sm"
                round
                color="orange"
                flat
                @click="store.setItem(item)"
              >
                <q-tooltip>lihat Data</q-tooltip>
              </q-btn>
            </div>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script setup>
import { useOrganisasiStore } from '../../../../stores/satset/organisasi'

const store = useOrganisasiStore()
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
}

th,
td {

  vertical-align: text-top;
  text-align: left;
  text-indent: -0.5em;
}
td {
  padding: 0.25em 0.5em 0.25em 1em;
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
