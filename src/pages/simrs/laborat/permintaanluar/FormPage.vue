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
                    <div class="searchings">
                      <app-autocomplete
                        v-model="search"
                        cl
                        outlined
                        valid
                        label="Pemeriksaan (Non Paket)"
                        autocomplete="rs2-rs1"
                        option-value="rs1"
                        option-label="rs2"
                        :source="store.pemeriksaans"
                        style="width:50%"
                        @get-source="store.getMasterPemeriksaanGroup"
                        @set-model="inputToList"
                      />
                      {{ details }}
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
import { usePermintaanLuarForm } from 'src/stores/simrs/penunjang/laborat/permintaanluar/form'
import { onMounted, ref } from 'vue'

const tab = ref('Pemeriksaan')
const options = ref(['Perorangan', 'Perusahaan'])
const store = usePermintaanLuarForm()

const details = ref([])

const search = ref('')
// const nonPaket = ref(null)

onMounted(() => {
  store.setToday()
  store.getAgama()
  store.getPekerjaan()
  store.getPerusahaan()
  store.getMasterPemeriksaanGroup()
})

function inputToList(val) {
  const arr = store.pemeriksaans
  const temp = arr.filter(x => x.rs2 === val)[0]
  if (temp) {
    details.value.push(temp)
    search.value = ''
  }
}

</script>
