<template>
  <q-page
    class="column full-height"
    style="overflow: hidden;"
  >
    <q-card class="col column q-ma-sm full-height">
      <q-card-section class="col-auto">
        <div class="full-width row justify-between items-center content-between">
          <div class="bg-white col-grow">
            <div
              class="flex flex-column items-center flex-center"
            >
              <div class="col text-left">
                <div class="f-14 text-weight-bold">
                  Mapping Dokter BPJS
                </div>
                <div class="title-desc">
                  Halaman Mapping Dokter & BPJS
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <div
        class="col-grow full-height relative-position"
      >
        <div class="absolute full-width full-height">
          <div class="row q-px-md q-py-md full-height q-col-gutter-md">
            <div class="col-6 full-height">
              <!-- {{ store.ygsudahdimappings }} -->
              <ListDokterBpjs
                :lists="store.listdokter"
                :loading="store.loadingListDikter"
                :terselect="store.objDokter"
                :termapings="store.ygsudahdimappings"
                @select="(val) => store.setObjDokter(val)"
              />
            </div>
            <div class="col-6 full-heigh">
              <q-card
                flat
                bordered
              >
                <q-card-section>
                  <div class="row items-center justify-between">
                    <div class="col row items-center">
                      <q-avatar>
                        <img src="https://cdn.quasar.dev/img/avatar.png">
                      </q-avatar>
                      <div class="q-ml-md">
                        <div>{{ store?.objDokter?.namadokter }}</div>
                        <div class="flex items-center q-gutter-sm q-pt-xs">
                          <div>Kode </div>
                          <q-badge
                            outline
                            color="orange"
                            :label="store?.objDokter?.kodedokter"
                          />
                        </div>
                      </div>
                      <div class="col text-f12 text-weight-bold q-mb-sm text-right">
                        Data BPJS
                      </div>
                    </div>
                  </div>
                </q-card-section>
                <q-separator />
                <q-card-section>
                  <q-select
                    v-model="store.searchResultKepeg"
                    dense
                    outlined
                    standout="bg-yellow-3"
                    label="Cari Data Kepegawaian"
                    use-input
                    clearable
                    option-value="id"
                    option-label="nama"
                    :options="options"
                    behavior="menu"
                    hide-dropdown-icon
                    @filter="filterOptions"
                  >
                    <template #prepend>
                      <q-icon name="icon-mat-search" />
                    </template>
                    <template #no-option>
                      <q-item>
                        <q-item-section class="text-grey">
                          No results
                        </q-item-section>
                      </q-item>
                    </template>
                    <template #option="scope">
                      <q-item v-bind="scope.itemProps">
                        <q-item-section avatar>
                          <q-avatar size="60px">
                            <img :src="getImage(scope.opt)">
                          </q-avatar>
                        </q-item-section>
                        <q-item-section>
                          <q-item-label>{{ scope.opt.nama }}</q-item-label>
                          <q-item-label caption>
                            <strong>Nip : </strong> {{ scope.opt.nip }}
                          </q-item-label>
                          <q-item-label caption>
                            <strong>Ruangan : </strong> {{ scope.opt.ruangan? scope.opt.ruangan.namaruang : '-' }}
                          </q-item-label>
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                </q-card-section>
                <q-separator />
                <q-card-section v-if="store.searchResultKepeg">
                  <div class="row items-center justify-between">
                    <div class="col row">
                      <q-avatar>
                        <img :src="getImage(store?.searchResultKepeg)">
                      </q-avatar>
                      <div class="q-ml-md">
                        <div>{{ store?.searchResultKepeg?.nama }}</div>
                        <div class="flex items-center q-gutter-sm q-pt-xs">
                          <div>Kode </div>
                          <q-badge
                            outline
                            color="orange"
                            :label="store?.searchResultKepeg?.kddpjp"
                          />
                        </div>
                      </div>
                    </div>

                    <div class="col f-12 text-weight-bold q-mb-sm text-right">
                      Data Kepegawaian
                    </div>
                  </div>
                </q-card-section>
                <q-separator />
                <q-card-section align="right">
                  <q-btn
                    label="Simpan Mapping"
                    color="primary"
                    :loading="store?.loadingSave"
                    :disable="store?.loadingSave"
                    @click="store.saveMapping"
                  />
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
      </div>
    </q-card>
  </q-page>
</template>
<script setup>
import { useBpjsMappingDokter } from 'src/stores/simrs/pegawai/mapping/bpjs'
import ListDokterBpjs from './comp/ListDokterBpjs.vue'
import { onMounted, ref } from 'vue'

const store = useBpjsMappingDokter()
const options = ref([])
onMounted(() => {
  store.getSimpeg()
  store.getDokters()
  store.getDataTermapping()
})
function getImage(row) {
  const kelamin = row.kelamin
  if (row.foto === null || row.foto === '' || row.foto === 'undefined') {
    return kelamin === 'Perempuan'
      ? new URL('../../../../assets/images/actress.svg', import.meta.url).href
      : new URL('../../../../assets/images/user-avatar.svg', import.meta.url).href
  } else {
    return 'http://192.168.100.100/simpeg/foto/' + row.nip + '/' + row.foto
  }
}

async function filterOptions (val, update) {
  if (!val) {
    update(() => {
      options.value = []
    })
    return
  }
  update(() => {
    const needle = val.toLowerCase()
    const arr = store.pegawais
    const filter = ['nama']
    const multiFilter = (data = [], filterKeys = [], value = '') =>
      data.filter((item) => filterKeys.some(
        (key) =>
          item[key].toString().toLowerCase().includes(value.toLowerCase()) &&
          item[key]
      )
      )
    const filteredData = multiFilter(arr, filter, needle)
    options.value = filteredData
  })
}
</script>
