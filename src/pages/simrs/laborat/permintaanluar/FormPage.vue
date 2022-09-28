<template>
  <q-page>
    <q-card>
      <q-card-section>
        <q-form>
          <div class="row q-col-gutter-lg">
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
                  style="width:100%"
                  outlined
                />
                <app-autocomplete
                  v-model="store.form.agama"
                  outlined
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
                  label="Pekerjaan"
                  autocomplete="rs2"
                  option-value="rs1"
                  option-label="rs2"
                  :source="store.pekerjaans"
                  @get-source="store.getPekerjaan"
                  @set-model="(val)=>{store.setForm('pekerjaan', val)}"
                />
                <q-select
                  v-model="store.jenispembayaran"
                  outlined
                  :options="options"
                  label="Jenis Pembayaran"
                  dense
                  style="width:30%"
                />
                <app-autocomplete
                  v-model="store.form.perusahaan_id"
                  outlined
                  label="Perusahaan"
                  autocomplete="perusahaan"
                  option-value="id"
                  :option-label="val => Object(val) === val && 'perusahaan' in val ? `${val.perusahaan}`:null"
                  :source="store.perusahaans"
                  @get-source="store.getPerusahaan"
                  @set-model="(val)=>{store.setForm('perusahaan', val)}"
                />
                <app-input
                  label="No Telp"
                  style="width:40%"
                />
                <app-input
                  label="Dokter Pengirim"
                  style="width:40%"
                />
              </div>
            </div>
            <div class="col-md-6 col-lg-6 col-xl-6 col-xs-12">
              <q-tabs
                v-model="tab"
                dense
                class="bg-grey-3"
                active-color="primary"
                indicator-color="primary"
                align="left"
                narrow-indicator
              >
                <q-tab
                  name="mails"
                  label="Mails"
                />
                <q-tab
                  name="alarms"
                  label="Alarms"
                />
                <q-tab
                  name="movies"
                  label="Movies"
                />
              </q-tabs>
              <q-separator />

              <q-tab-panels
                v-model="tab"
                animated
              >
                <q-tab-panel name="mails">
                  <div class="text-h6">
                    Mails
                  </div>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </q-tab-panel>

                <q-tab-panel name="alarms">
                  <div class="text-h6">
                    Alarms
                  </div>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </q-tab-panel>

                <q-tab-panel name="movies">
                  <div class="text-h6">
                    Movies
                  </div>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </q-tab-panel>
              </q-tab-panels>
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

const tab = ref('mails')
const options = ref(['Perorangan', 'Perusahaan'])
const store = usePermintaanLuarForm()

onMounted(() => {
  store.setToday()
  store.getAgama()
  store.getPekerjaan()
  store.getPerusahaan()
})

</script>
