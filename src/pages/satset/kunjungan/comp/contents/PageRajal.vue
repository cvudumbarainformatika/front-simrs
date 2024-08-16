<template>
  <div class="column full-height">
    <div class="col-auto">
      <HeaderRajal />
    </div>
    <div class="col full-height">
      <q-scroll-area style="height:calc( 100% - 1px )">
        <table>
          <thead>
            <tr>
              <th>PASIEN</th>
              <th>DPJP</th>
              <th>POLIKLINIK</th>
              <th class="text-end">
                ID SATSET
              </th>
              <th class="text-end">
                OPTIONS
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(pasien, n) in store.pasiens"
              :key="n"
            >
              <td>
                <div><span>{{ pasien?.nama }}</span> </div>
                <div><span>NOREG : </span> <em class="text-primary">{{ pasien?.noreg }}</em> <span> NORM : </span> <em class="text-negative">{{ pasien?.norm }}</em></div>
              </td>
              <td>{{ pasien?.dokter ? pasien.dokter:'---' }}</td>
              <td>{{ pasien?.poli }}</td>
              <td class="text-end">
                <em
                  v-if="!pasien.pasien_uuid"
                  class="text-negative"
                >Belum Ada</em>
                <em
                  v-else
                  class="text-primary"
                >{{ pasien?.pasien_uuid }}</em>
              </td>
              <td class="text-end">
                <q-btn
                  v-if="!pasien.pasien_uuid && !pasien.satset"
                  label="Dapatkan ID"
                  dense
                  color="teal"
                  size="sm"
                  class="q-px-md"
                  :loading="store.loading && pas===n"
                  :disable="store.loading && pas===n"
                  @click="getIdSatset(pasien, n)"
                />
                <q-btn
                  v-else-if="pasien.pasien_uuid && !pasien.satset"
                  :label="pasien.satset_error? 'Error Kunjungan':'Kirim Kunjungan'"
                  dense
                  :color="pasien.satset_error?'negative':'primary'"
                  size="sm"
                  class="q-px-md"
                  :loading="store.loadingSend && pas===n"
                  :disable="store.loadingSend && pas===n"
                  @click="kirimKunjungan(pasien, n)"
                />
                <q-btn
                  v-else
                  label="Satu Sehat"
                  dense
                  color="orange"
                  size="sm"
                  class="q-px-md"
                />
                <!-- <div v-if="store.pasien.satset_error">
                  <em>Pengiriman Kunjungan Error !</em>
                </div> -->
              </td>
            </tr>
          </tbody>
        </table>
      </q-scroll-area>

      <div class="absolute-bottom bg-primary">
        <bottom-rajal
          v-if="store.meta"
          :meta="store.meta"
          @go-to="(val)=> store.goToPage(val)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import HeaderRajal from './HeaderRajal.vue'
import BottomRajal from './BottomRajal.vue'
import { useSatsetRajalStore } from 'src/stores/satset/rajal'
import { onMounted, ref } from 'vue'

const store = useSatsetRajalStore()
const pas = ref(0)
onMounted(() => {
  store.getData()
})

function getIdSatset (pasien, n) {
  pas.value = n
  store.getSatsetId(pasien)
}

function kirimKunjungan (pasien, n) {
  pas.value = n
  store.kirimKunjunganSatset(pasien)
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

  //vertical-align: text-top;
  vertical-align: middle;
  text-align: left;
  text-indent: -0.5em;
}
td {
  padding: 0.5em 1em 0.5em 1.5em;
}
th {
  padding: 0.5em 1em 0.5em 1.5em;
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
