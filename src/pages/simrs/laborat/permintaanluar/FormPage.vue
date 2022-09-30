<!-- eslint-disable vue/no-lone-template -->
<!-- eslint-disable vue/no-v-text-v-html-on-component -->

<!-- eslint-disable vue/no-v-html -->
<template>
  <q-page>
    <q-card>
      <q-form
        ref="refForm"
        @submit="simpanData"
        @reset="resetForm"
      >
        <q-card-section>
          <div class="row q-col-gutter-xl">
            <div class="col-md-6 col-lg-6 col-xl-6 col-xs-12">
              <div class="row q-col-gutter-md ">
                <app-input
                  v-model="store.form.nota"
                  label="Nota (auto)"
                  readonly
                  outlined
                  style="width:40%"
                />
                <app-input
                  v-model="store.form.nosurat"
                  label="Nomor Surat"
                  valid
                  outlined
                  style="width:60%"
                />
                <app-input
                  v-model="store.form.noktp"
                  label="Nomor KTP"
                  style="width:70%"
                  outlined
                />
                <app-input
                  v-model="store.form.nama"
                  label="Nama"
                  style="width:90%"
                  outlined
                />
                <app-input
                  v-model="store.form.temp_lahir"
                  label="Tempat Lahir"
                  style="width:40%"
                  outlined
                />
                <app-input-date
                  :model="store.form.tgl_lahir"
                  label="Tgl Lahir"
                  style="width:40%"
                  outlined
                  @set-model="(val)=> store.setForm('tgl_lahir', val)"
                />
                <app-input-date
                  :model="store.form.sampel_diambil"
                  label="Sampel diambil"
                  style="width:40%"
                  outlined
                  @set-model="(val)=> store.setForm('sampel_diambil', val)"
                />
                <app-input-date
                  :model="store.form.jam_sampel_diambil"
                  label="Jam Sampel diambil"
                  style="width:40%"
                  outlined
                  :type-date="false"
                  @set-model="(val)=> store.setForm('jam_sampel_diambil', val)"
                />
                <div class="row items-center">
                  <q-radio
                    v-model="store.form.kelamin"
                    size="sm"
                    val="Laki-laki"
                    label="Laki-laki"
                  />
                  <q-radio
                    v-model="store.form.kelamin"
                    size="sm"
                    val="Perempuan"
                    label="Perempuan"
                  />
                </div>
                <app-input
                  v-model="store.form.alamat"
                  label="Alamat"
                  valid
                  style="width:100%"
                  outlined
                />
                <app-autocomplete
                  v-model="store.form.agama"
                  outlined
                  valid
                  label="Agama"
                  autocomplete="rs2"
                  option-value="rs2"
                  option-label="rs2"
                  :source="store.agamas"
                  @get-source="store.getAgama"
                  @set-model="(val)=>{store.setForm('agama', val)}"
                />
                <app-autocomplete
                  v-model="store.form.kode_pekerjaan"
                  outlined
                  valid
                  label="Pekerjaan"
                  autocomplete="rs2"
                  option-value="rs2"
                  option-label="rs2"
                  :source="store.pekerjaans"
                  @get-source="store.getPekerjaan"
                  @set-model="(val)=>{store.setForm('kode_pekerjaan', val)}"
                />
                <q-select
                  v-model="store.form.jenispembayaran"
                  outlined
                  :options="options"
                  label="Jenis Pembayaran"
                  dense
                  lazy-rules
                  :rules="[val => !!val || 'Harap diisi']"
                  style="width:30%"
                />
                <app-autocomplete
                  v-if="store.form.jenispembayaran === 'Perusahaan'"
                  v-model="store.form.perusahaan_id"
                  outlined
                  label="Perusahaan"
                  autocomplete="perusahaan"
                  option-value="id"
                  option-label="perusahaan"
                  :source="store.perusahaans"
                  @get-source="store.getPerusahaan"
                  @set-model="(val)=>{store.setForm('perusahaan', val)}"
                />
                <app-input
                  v-model="store.form.nohp"
                  valid
                  outlined
                  label="No Telp"
                  style="width:40%"
                />
                <app-input
                  v-model="store.form.pengirim"
                  outlined
                  valid
                  label="Dokter Pengirim"
                  style="width:40%"
                />
              </div>
            </div>
            <div class="col-md-6 col-lg-6 col-xl-6 col-xs-12">
              <q-card
                flat
                bordered
                class="full-height bg-grey-2"
              >
                <q-tabs
                  v-model="tab"
                  class="bg-grey-3"
                  active-color="primary"
                  indicator-color="primary"
                  align="left"
                >
                  <q-tab
                    name="Pemeriksaan"
                    label="Pemeriksaan"
                  />
                  <q-tab
                    name="Catatan"
                    label="Catatan"
                  />
                </q-tabs>
                <q-separator />

                <q-tab-panels
                  v-model="tab"
                  animated
                >
                  <q-tab-panel name="Pemeriksaan">
                    <div class="row q-col-gutter-lg searchings">
                      <q-select
                        v-model="searchNonPaket"
                        dense
                        outlined
                        use-input
                        :option-value="obj=>obj"
                        option-label="rs2"
                        label="Cari Pemeriksaan"
                        :options="optNonPaket"
                        behavior="menu"
                        hide-dropdown-icon
                        style="width:100%"
                        @filter="filterNonPaket"
                        @update:model-value="val=>insertList(val)"
                      >
                        <template
                          v-if="searchNonPaket"
                          #append
                        >
                          <q-icon
                            name="icon-mat-cancel"
                            size="xs"
                            class="cursor-pointer"
                            @click.stop.prevent="searchNonPaket = null"
                          />
                        </template>
                        <template #no-option>
                          <q-item>
                            <q-item-section class="text-grey">
                              Data tidak ditemukan
                            </q-item-section>
                          </q-item>
                        </template>
                        <template #option="scope">
                          <q-item v-bind="scope.itemProps">
                            <q-item-section>
                              <q-item-label>
                                {{ scope.opt.rs2 }}
                                -  <span class="text-italic text-negative">Biaya: Rp. {{ formatRp(scope.opt.rs3 + scope.opt.rs4) }}</span>
                              </q-item-label>
                              <q-item-label :class="scope.opt.rs21===''?'text-grey-5':''">
                                <strong>  {{ scope.opt.rs21===''? ' NON PAKET' : ' PAKET -' + scope.opt.rs21 }} </strong>
                              </q-item-label>
                            </q-item-section>
                          </q-item>
                        </template>
                      </q-select>
                    </div>

                    <div class="list--details q-mt-lg">
                      <q-toolbar class="bg-primary text-white shadow-2">
                        <q-toolbar-title>List Permintaan</q-toolbar-title>
                      </q-toolbar>
                      <q-list
                        bordered
                        dense
                        separator
                        padding
                      >
                        <div
                          v-if="details.length===0"
                          class="column flex-center"
                          style="height:300px"
                        >
                          Belum Ada Data
                        </div>
                        <transition-group name="list">
                          <template
                            v-for="(item, i) in filterDetails"
                          >
                            <template
                              v-if="item.name === ''"
                            >
                              <q-item
                                v-for="(sub, n) in item.value"
                                :key="i + n"
                                class="list-move"
                              >
                                <q-item-section avatar>
                                  <q-avatar
                                    color="primary"
                                    text-color="white"
                                  >
                                    A
                                  </q-avatar>
                                </q-item-section>

                                <q-item-section>
                                  <q-item-label>{{ sub.rs2 }}</q-item-label>
                                  <q-item-label
                                    caption
                                    lines="1"
                                  >
                                    Tarif Sarana : {{ formatRp(sub.rs3) }}, Tarif Layanan : {{ formatRp(sub.rs4) }}
                                  </q-item-label>
                                </q-item-section>

                                <q-item-section side>
                                  <q-icon
                                    class="cursor-pointer"
                                    name="icon-mat-delete_sweep"
                                    color="negative"
                                    @click="deleteDetails(false, sub)"
                                  />
                                </q-item-section>
                              </q-item>
                            </template>
                            <template v-else>
                              <q-expansion-item
                                :key="i"
                                expand-icon-toggle
                                expand-separator
                                class="list-move"
                              >
                                <template #header>
                                  <q-item-section avatar>
                                    <q-avatar
                                      color="primary"
                                      text-color="white"
                                    >
                                      A
                                    </q-avatar>
                                  </q-item-section>

                                  <q-item-section>
                                    <q-item-label>{{ item.name }}</q-item-label>
                                    <q-item-label
                                      caption
                                      lines="1"
                                    >
                                      Tarif Sarana : {{ formatRp(item.value[0].rs3) }}, Tarif Layanan : {{ formatRp(item.value[0].rs4) }}
                                    </q-item-label>
                                  </q-item-section>

                                  <q-item-section side>
                                    <q-icon
                                      class="cursor-pointer"
                                      name="icon-mat-delete_sweep"
                                      color="negative"
                                      @click="deleteDetails(true, item)"
                                    />
                                  </q-item-section>
                                </template>
                                <q-card
                                  class="bg-grey-2"
                                >
                                  <q-item
                                    v-for="ex in item.value"
                                    :key="ex.id"
                                    v-ripple
                                    clickable
                                    class="q-px-xl"
                                  >
                                    <q-item-section>
                                      <div class="q-px-lg">
                                        {{ ex.rs2 }}
                                      </div>
                                    </q-item-section>
                                  </q-item>
                                </q-card>
                              </q-expansion-item>
                            </template>
                          </template>
                        </transition-group>
                      </q-list>
                    </div>
                  </q-tab-panel>

                  <q-tab-panel name="Catatan">
                    <div class="text-h6">
                      Catatan
                    </div>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </q-tab-panel>
                </q-tab-panels>
              </q-card>
            </div>
          </div>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
          <app-btn
            type="reset"
            label="Reset"
            color="dark"
          />
          <app-btn label="Simpan Data" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-page>
</template>
<script setup>
// import { api } from 'src/boot/axios'
import { usePermintaanLuarForm } from 'src/stores/simrs/penunjang/laborat/permintaanluar/form'
import { computed, onMounted, ref } from 'vue'
import { formatRp } from 'src/modules/formatter'
import { notifErrVue } from 'src/modules/utils'

const tab = ref('Pemeriksaan')
const options = ref(['Perorangan', 'Perusahaan'])
const store = usePermintaanLuarForm()

const details = ref([])

const filterDetails = computed(() => {
  const c = details.value
  if (c.length > 0) {
    return groupBy(c, paket => paket.rs21)
  }
  return []
})

const searchNonPaket = ref('')
const optNonPaket = ref([])
// const searchPaket = ref('')
// const optPaket = ref([])
// const nonPaket = ref(null)

onMounted(() => {
  store.setToday()
  store.getAgama()
  store.getPekerjaan()
  store.getPerusahaan()
  store.getMasterPemeriksaanGroup()
})

function insertList(val) {
  if (val) {
    if (val.rs21 === '') {
      details.value.push(val)
    } else {
      const group = store.pemeriksaans.filter(x => x.rs21 === val.rs21)
      for (let i = 0; i < group.length; i++) {
        details.value.push(group[i])
      }
    }
  }

  console.log('from list', filterDetails.value)
}

function deleteDetails(paket, item) {
  if (!paket) {
    const index = details.value.indexOf(item)
    console.log(index)
    details.value.splice(index, 1)
  } else {
    console.log(item)
    const arr = item.value
    for (let i = 0; i < arr.length; i++) {
      const index = details.value.indexOf(arr[i])
      details.value.splice(index, 1)
    }
  }
  // details.value.splice(index, 1)
}

function groupBy(list, keyGetter) {
  const map = new Map()
  list.forEach((item) => {
    const key = keyGetter(item)
    const collection = map.get(key)
    if (!collection) {
      map.set(key, [item])
    } else {
      collection.push(item)
    }
  })
  const arr = Array.from(map, ([name, value]) => ({ name, value }))
  return arr
}

async function filterNonPaket (val, update) {
  if (!val) {
    update(() => {
      optNonPaket.value = []
    })
    return
  }
  // const params = {
  //   params: {
  //     q: val,
  //     p: 'non'
  //   }
  // }
  // const resp = await api.get('/v1/master_laborat_group', params)
  // console.log('cari non paket', resp)
  update(
    () => {
      const needle = val.toLowerCase()
      const arr = 'rs2-rs21'
      const splits = arr.split('-')
      const multiFilter = (data = [], filterKeys = [], value = '') => data.filter((item) => filterKeys.some(key => item[key].toString().toLowerCase().includes(value.toLowerCase()) && item[key]))
      const filteredData = multiFilter(store.pemeriksaans, splits, needle)
      optNonPaket.value = filteredData
    },
    ref => {
      if (val !== '' && ref.options.length) {
        ref.setOptionIndex(-1)
        ref.moveOptionSelection(1, true)
      }
    }
  )
}
// async function filterPaket (val, update) {
//   console.log(val)
//   if (!val) {
//     update(() => {
//       optPaket.value = []
//     })
//     return
//   }
//   const params = {
//     params: {
//       q: val,
//       p: 'paket'
//     }
//   }
//   const resp = await api.get('/v1/master_laborat_group', params)
//   console.log('cari paket', resp)
//   update(
//     () => (optPaket.value = resp.data)
//     // ref => {
//     //   if (val !== '' && ref.options.length) {
//     //     ref.setOptionIndex(-1)
//     //     ref.moveOptionSelection(1, true)
//     //   }
//     // }
//   )
// }

function simpanData() {
  if (details.value.length === 0) {
    return notifErrVue('Harap masukkan Data permintaan terlebih dahulu')
  }

  store.saveForm(details.value)
}

const refForm = ref(null)
function resetForm() {
  store.newData()
  details.value = []
  refForm.value.resetValidations()
}
</script>

<style lang="scss" scoped>
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
