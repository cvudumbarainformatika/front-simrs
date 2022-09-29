<!-- eslint-disable vue/no-lone-template -->
<!-- eslint-disable vue/no-v-text-v-html-on-component -->

<!-- eslint-disable vue/no-v-html -->
<template>
  <q-page>
    <q-card>
      <q-card-section>
        <q-form>
          <div class="row q-col-gutter-xl">
            <div class="col-md-6 col-lg-6 col-xl-6 col-xs-12">
              <div class="row q-col-gutter-md">
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
                  option-value="rs1"
                  option-label="rs2"
                  :source="store.pekerjaans"
                  @get-source="store.getPekerjaan"
                  @set-model="(val)=>{store.setForm('pekerjaan', val)}"
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
                        label="Cari Pemeriksaan (Non Paket)"
                        :options="optNonPaket"
                        behavior="menu"
                        hide-dropdown-icon
                        style="width:50%"
                        @filter="filterNonPaket"
                        @update:model-value="val=>insertList(false, val)"
                      >
                        <template
                          v-if="searchNonPaket"
                          #append
                        >
                          <q-icon
                            name="icon-mat-cancel"
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
                                {{ scope.opt.rs21===''? scope.opt.rs2 : scope.opt.rs21 }} -
                                <span class="text-italic text-negative">Biaya: Rp. {{ formatRp(scope.opt.rs3 + scope.opt.rs4) }}</span>
                              </q-item-label>
                              <!-- <q-item-label caption>
                                <strong>Nip : </strong> {{ scope.opt.nip }}
                              </q-item-label> -->
                            </q-item-section>
                          </q-item>
                        </template>
                      </q-select>
                      <q-select
                        v-model="searchPaket"
                        dense
                        outlined
                        use-input
                        option-value="rs1"
                        option-label="rs2"
                        label="Cari Pemeriksaan (Paket)"
                        :options="optPaket"
                        behavior="menu"
                        hide-dropdown-icon
                        style="width:50%"
                        @filter="filterPaket"
                        @update:model-value="val=>insertList(false, val)"
                      >
                        <template
                          v-if="searchNonPaket"
                          #append
                        >
                          <q-icon
                            name="icon-mat-cancel"
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
                                {{ scope.opt.rs2 }} - <span class="text-italic text-negative">Biaya: Rp. {{ formatRp(scope.opt.rs3 + scope.opt.rs4) }}</span>
                              </q-item-label>
                              <!-- <q-item-label caption>
                                <strong>Nip : </strong> {{ scope.opt.nip }}
                              </q-item-label> -->
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
                      >
                        <div
                          v-if="details.length===0"
                          class="column flex-center"
                          style="height:300px"
                        >
                          Belum Ada Data
                        </div>
                        <q-expansion-item
                          v-for="(item, i) in details"
                          :key="i"
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
                              <q-item-label>{{ item.rs2 }}</q-item-label>
                              <q-item-label
                                caption
                                lines="1"
                              >
                                Tarif Sarana : {{ formatRp(item.rs3) }}, Tarif Layanan : {{ formatRp(item.rs4) }}
                              </q-item-label>
                            </q-item-section>

                            <q-item-section side>
                              <q-icon
                                name="icon-mat-delete_sweep"
                                color="negative"
                                @click="deleteDetails(i)"
                              />
                            </q-item-section>
                          </template>
                          <q-card
                            class="bg-grey-2"
                          >
                            <q-item
                              v-ripple
                              clickable
                              class="q-px-lg"
                            >
                              <q-item-section>
                                Item
                              </q-item-section>
                            </q-item>
                          </q-card>
                        </q-expansion-item>
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
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script setup>
import { api } from 'src/boot/axios'
import { usePermintaanLuarForm } from 'src/stores/simrs/penunjang/laborat/permintaanluar/form'
import { onMounted, ref } from 'vue'
import { formatRp } from 'src/modules/formatter'

const tab = ref('Pemeriksaan')
const options = ref(['Perorangan', 'Perusahaan'])
const store = usePermintaanLuarForm()

const details = ref([])

const searchNonPaket = ref('')
const optNonPaket = ref([])
const searchPaket = ref('')
const optPaket = ref([])
// const nonPaket = ref(null)

onMounted(() => {
  store.setToday()
  store.getAgama()
  store.getPekerjaan()
  store.getPerusahaan()
  // store.getMasterPemeriksaanGroup()
})

function insertList(paket, val) {
  if (val) {
    details.value.push(val)
  }

  console.log('from list', val)
}

function deleteDetails(index) {
  details.value.splice(index, 1)
}

async function filterNonPaket (val, update) {
  if (!val) {
    update(() => {
      optNonPaket.value = []
    })
    return
  }
  const params = {
    params: {
      q: val,
      p: 'non'
    }
  }
  const resp = await api.get('/v1/master_laborat_group', params)
  console.log('cari non paket', resp)
  update(
    () => (optNonPaket.value = resp.data),
    ref => {
      if (val !== '' && ref.options.length) {
        ref.setOptionIndex(-1)
        ref.moveOptionSelection(1, true)
      }
    }
  )
}
async function filterPaket (val, update) {
  if (!val) {
    update(() => {
      optPaket.value = []
    })
    return
  }
  const params = {
    params: {
      q: val,
      p: 'paket'
    }
  }
  const resp = await api.get('/v1/master_laborat_group', params)
  console.log('cari non paket', resp)
  update(
    () => (optPaket.value = resp.data),
    ref => {
      if (val !== '' && ref.options.length) {
        ref.setOptionIndex(-1)
        ref.moveOptionSelection(1, true)
      }
    }
  )
}

</script>
