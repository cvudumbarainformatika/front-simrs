<template>
  <table>
    <thead>
      <tr>
        <th width="5%">
          No
        </th>
        <th>
          Obat
        </th>
        <th>
          Ruangan
        </th>
        <th>
          Stok
        </th>
        <th>
          Dipakai
        </th>
        <th class="text-end">
          #
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
              height="18px"
            />
          </td>
          <td class="text-end">
            <div class="row justify-end">
              <q-skeleton
                type="text"
                width="30px"
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
          <tr
            class="cursor-pointer"
            :class="item?.higlight?'bg-light-blue-2 ':''"
          >
            <td width="5%">
              {{ n+1 }}
            </td>
            <td>
              <div class="row ">
                {{ item?.obat?.nama_obat }}
              </div>
              <div class="row text-grey f-10">
                {{ item?.kdobat }}
              </div>
            </td>
            <td>
              <div v-if="item?.ruang">
                {{ item?.ruang?.uraian }}
              </div>
            </td>
            <td>
              <div class="row items-end justify-start">
                <div class="col">
                  {{ item?.stok }}
                </div>
                <div class="col text-weight-bold f-10">
                  ({{ item?.obat?.satuan_k }})
                </div>
              </div>
            </td>
            <td>
              <div class="row">
                <div class="col-12">
                  <q-input
                    ref="refInput"
                    v-model="item.dipakai"
                    label=". Jumlah Dipakai"
                    dense
                    outlined
                    standout="bg-yellow-3"
                    @update:model-value="setNumber($event,item,'dipakai')"
                  />
                </div>
              </div>
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
              <q-checkbox
                v-model="item.checked"
                size="xs"
                @update:model-value="setCheck($event, item,n)"
              />
            </td>
          </tr>
          <tr v-if="item.expand">
            <td colspan="5">
              <div>{{ item }}</div>
            </td>
          </tr>
        </template>
      </template>
    </tbody>
  </table>
</template>

<script setup>
import { ref } from 'vue'
import { useFarmasiPemakaianRuanganStore } from 'src/stores/simrs/farmasi/pemakaianruangan/pemakaianruangan'
import { notifErrVue } from 'src/modules/utils'

const store = useFarmasiPemakaianRuanganStore()
const refInput = ref(null)
function setNumber(evt, det, key) {
  const inc = evt.includes('.')
  const ind = evt.indexOf('.')
  const panj = evt.length
  const nilai = isNaN(parseFloat(evt)) ? 0 : (inc && (ind === (panj - 1)) ? evt : parseFloat(evt))
  det[key] = nilai
  if (key === 'dipakai') {
    if (nilai > det.stok) {
      notifErrVue('Pemakaian tidak boleh lebih dari jumlah Stok')
      det.dipakai = det.stok
    }
  }
}
function setCheck(evt, item, n) {
  console.log('ref', refInput.value, n)
  // console.log('evt', evt)
  // console.log('item', item)
  if (item.checked) {
    item.dipakai = item.dipakai ?? 0
    refInput.value[n].focus()
    refInput.value[n].select()
  }
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
