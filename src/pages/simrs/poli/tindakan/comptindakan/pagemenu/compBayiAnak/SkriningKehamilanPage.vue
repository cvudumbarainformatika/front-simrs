<template>
  <div class="fit column scroll bg-grey-4">
    <div class="row justify-center q-pa-lg">
      <div class="col-10">
        <q-card
          style="width:100%;"
        >
          <q-card-section class="q-pa-xl">
            <div class="row items-center q-mb-md">
              <div class="col-auto">
                Kehamilan No ?
              </div>
              <div class="col full-width">
                <div class="q-gutter-sm">
                  <q-radio
                    v-for="no in 10"
                    :key="no"
                    v-model="store.formSkrining.kehamilanNo"
                    size="xs"
                    :label="`${no}`"
                    :val="no"
                    @update:model-value="setSkrining"
                  />
                </div>
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th width="3%">
                    I
                  </th>
                  <th width="3%">
                    II
                  </th>
                  <th width="47%">
                    III
                  </th>
                  <th
                    width="47%"
                    colspan="6"
                  >
                    IV
                  </th>
                </tr>
                <tr>
                  <th width="3%">
                    KEL
                  </th>
                  <th width="3%">
                    NO
                  </th>
                  <th width="47%">
                    MASALAH/FAKTOR RESIKO
                  </th>
                  <th width="5%">
                    SKOR
                  </th>
                  <th colspan="4">
                    TRIBULAN
                  </th>
                </tr>
                <tr>
                  <th
                    width="3%"
                    class="text-weight-light"
                  >
                    F.R
                  </th>
                  <th width="3%" />
                  <th
                    width="47%"
                    class="text-weight-light"
                  >
                    SKOR AWAL IBU HAMIL
                  </th>
                  <th
                    width="5%"
                    class="text-weight-light"
                  >
                    2
                  </th>
                  <th>
                    I
                  </th>
                  <th>
                    II
                  </th>
                  <th>
                    III.1
                  </th>
                  <th>
                    III.2
                  </th>
                </tr>
              </thead>

              <tbody>
                <template
                  v-for="grup in gruping"
                  :key="grup"
                >
                  <template
                    v-for="(item, i) in store.masterSkrining.length? store.masterSkrining.filter(x=>x.fr===grup) : []"
                    :key="item"
                  >
                    <tr>
                      <td
                        v-if="i===0"
                        :rowspan="store.masterSkrining.filter(x=>x.fr===grup).length"
                      >
                        {{ item.fr }}
                      </td>
                      <td>
                        {{ item?.kode }}
                      </td>
                      <td> {{ item?.nama }}</td>
                      <td class="text-center v-mid">
                        {{ item?.skor }}
                      </td>
                      <td class="text-center">
                        <q-checkbox
                          v-model="store.formSkrining.skriningKehamilan"
                          size="xs"
                          :val="`${item?.kode+'--'+'I--'+store.formSkrining.kehamilanNo+'--'+item?.skor}`"
                          class="q-pa-none"
                        />
                      </td>
                      <td class="text-center">
                        <q-checkbox
                          v-model="store.formSkrining.skriningKehamilan"
                          size="xs"
                          :val="`${item?.kode+'--'+'II--'+store.formSkrining.kehamilanNo+'--'+item?.skor}`"
                          class="q-pa-none"
                        />
                      </td>
                      <td class="text-center">
                        <q-checkbox
                          v-model="store.formSkrining.skriningKehamilan"
                          size="xs"
                          :val="`${item?.kode+'--'+'III.1--'+store.formSkrining.kehamilanNo+'--'+item?.skor}`"
                          class="q-pa-none"
                        />
                      </td>
                      <td class="text-center">
                        <q-checkbox
                          v-model="store.formSkrining.skriningKehamilan"
                          size="xs"
                          :val="`${item?.kode+'--'+'III.2--'+store.formSkrining.kehamilanNo+'--'+item?.skor}`"
                          class="q-pa-none"
                        />
                      </td>
                    </tr>
                  </template>
                </template>
                <tr>
                  <td
                    class="text-center v-mid"
                    colspan="4"
                  >
                    JUMLAH SKOR
                  </td>
                  <td class="text-center v-mid">
                    {{ jmlSkorI }}
                  </td>
                  <td class="text-center v-mid">
                    {{ jmlSkorII }}
                  </td>
                  <td class="text-center v-mid">
                    {{ jmlSkorIII1 }}
                  </td>
                  <td class="text-center v-mid">
                    {{ jmlSkorIII2 }}
                  </td>
                </tr>
              </tbody>
            </table>
          </q-card-section>
          <q-card-section
            v-if="!arrayCompare(filterSkriningByKehamilanNo , store.formSkrining.skriningKehamilan)"
            class="q-pa-none"
          >
            <q-separator />
            <div class="row justify-end q-pa-md">
              <q-btn
                color="primary"
                :loading="store.loadingSave"
                :disable="store.loadingSave"
                @click="store.saveSkrining(pasien)"
              >
                Simpan Skrining
              </q-btn>
              <!-- {{ filterSkriningByKehamilanNo }} -->
              <!-- {{ store.formSkrining.skriningKehamilan }} -->
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>
<script setup>
// import { useQuasar } from 'quasar'
import { useKandunganStore } from 'src/stores/simrs/pelayanan/poli/kandungan'
import { computed, onMounted, ref } from 'vue'

const store = useKandunganStore()
// eslint-disable-next-line no-unused-vars
const gruping = ref(['I', 'II', 'III'])
// const $q = useQuasar()
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})
onMounted(() => {
  store.getMasterSkreening()
  store.getskrining(props.pasien)
})

// eslint-disable-next-line no-unused-vars
const filterSkriningByKehamilanNo = computed(() => {
  const arr = store.skriningAllFromServer
  const res = arr.length ? arr.filter(x => x.kehamilanNo === store.formSkrining.kehamilanNo).map(x => x.valueSingkat) : []
  return res
})

const jmlSkorI = computed(() => {
  const arr = store.formSkrining.skriningKehamilan
  const isi = arr.filter(x => x.includes('--I--')).map(x => parseInt(x.substring(x.length - 1))).reduce((x, y) => x + y, 0) + 2
  return arr.length ? isi : 2
})
const jmlSkorII = computed(() => {
  const arr = store.formSkrining.skriningKehamilan
  const isi = arr.filter(x => x.includes('--II--')).map(x => parseInt(x.substring(x.length - 1))).reduce((x, y) => x + y, 0) + 2
  return arr.length ? isi : 2
})
const jmlSkorIII1 = computed(() => {
  const arr = store.formSkrining.skriningKehamilan
  const isi = arr.filter(x => x.includes('--III.1--')).map(x => parseInt(x.substring(x.length - 1))).reduce((x, y) => x + y, 0) + 2
  return arr.length ? isi : 2
})
const jmlSkorIII2 = computed(() => {
  const arr = store.formSkrining.skriningKehamilan
  const isi = arr.filter(x => x.includes('--III.2--')).map(x => parseInt(x.substring(x.length - 1))).reduce((x, y) => x + y, 0) + 2
  return arr.length ? isi : 2
})

function setSkrining() {
  store.getskrining(props.pasien)
}

function arrayCompare(_arr1, _arr2) {
  if (
    !Array.isArray(_arr1) ||
      !Array.isArray(_arr2) ||
      _arr1.length !== _arr2.length
  ) {
    return false
  }

  // .concat() to not mutate arguments
  const arr1 = _arr1.concat().sort()
  const arr2 = _arr2.concat().sort()

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false
    }
  }

  return true
}

</script>

<style lang="scss" scoped>
table{
  width: 100%;
  border-collapse: collapse;
  th, td {
    border: 1px solid $grey;
    padding: 2px 5px;
    // vertical-align: top;
    .v-top{
      vertical-align: top;
    }
    .v-mid{
      vertical-align: middle !important;
    }
    .v.bot{
      vertical-align: bottom;
    }
  }
}
</style>
