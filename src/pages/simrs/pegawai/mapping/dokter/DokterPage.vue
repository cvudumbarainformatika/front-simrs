<template>
  <q-page class="column full-height">
    <!-- <div class="col full-height bg-accent">
      <div class="full-height bg-red">
        sdfds
      </div>
    </div> -->
    <div class="col full-height q-pa-sm">
      <q-card class="full-height ">
        <q-card-section>
          <div class="full-width row justify-between items-center content-between">
            <div class="bg-white col-grow">
              <div
                class="flex flex-column items-center flex-center"
              >
                <div class="col text-left">
                  <div class="f-14 text-weight-bold">
                    Mapping Dokter / Nakes
                  </div>
                  <div class="title-desc">
                    Halaman Mapping Dokter & Nakes
                  </div>
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <div class="row q-col-gutter-lg">
            <div class="col-6">
              <ListNakes
                :lists="store.listsnakes"
                @select="(val)=> store.setObjnakes(val)"
              />
            </div>
            <div class="col-6">
              <q-card
                flat
                bordered
              >
                <q-card-section>
                  <!-- {{ store.objNakes }} -->
                  <div class="row items-center justify-between">
                    <div class="col row">
                      <q-avatar>
                        <img src="https://cdn.quasar.dev/img/avatar.png">
                      </q-avatar>
                      <div class="q-ml-md">
                        <div>{{ store?.objNakes?.nama }}</div>
                        <q-badge
                          outline
                          color="primary"
                          :label="labelNake(store?.objNakes?.kdgroupnakes)"
                        />
                      </div>
                      <div class="col text-h6 q-mb-sm text-right">
                        Data Nakes
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
                    label="Cari Data"
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
                        <img src="https://cdn.quasar.dev/img/avatar.png">
                      </q-avatar>
                      <div class="q-ml-md">
                        <div>{{ store?.searchResultKepeg?.nama }}</div>
                      <!-- <q-badge
                        outline
                        color="primary"
                        :label="labelNake(store?.objNakes?.kdgroupnakes)"
                      /> -->
                      </div>
                    </div>

                    <div class="col text-h6 q-mb-sm text-right">
                      Data Kepegawaian
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import ListNakes from './comp/ListNakes.vue'
import { useMappingNakesStore } from 'src/stores/simrs/pegawai/mapping/index'
import { api } from 'src/boot/axios'

const store = useMappingNakesStore()

onMounted(() => {
  store.getNakes()
})
const options = ref(null)

function labelNake(val) {
  if (!val) return ''
  if (val === '1') {
    return 'Dokter'
  } else if (val === '2') {
    return 'Perawat'
  } else {
    return 'Bidan'
  }
}

async function filterOptions (val, update) {
  if (!val) {
    update(() => {
      options.value = []
    })
    return
  }
  const params = {
    params: {
      q: val
    }
  }
  console.log('q :', val)
  const resp = await api.get('/v1/settings/appmenu/cari_pegawai', params)
  console.log('cari', resp)
  update(
    () => (options.value = resp.data),
    ref => {
      if (val !== '' && ref.options.length) {
        ref.setOptionIndex(-1)
        ref.moveOptionSelection(1, true)
      }
    }
  )
}

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
</script>
