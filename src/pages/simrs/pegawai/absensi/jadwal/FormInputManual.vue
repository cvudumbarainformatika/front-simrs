<template>
  <q-dialog full-width>
    <q-card
      class="itu full-width"
    >
      <q-card-section>
        <div class="f-14 text-weight-bold">
          Form Input
        </div>
        <div class="title-desc">
          Input Master Cuti
        </div>
      </q-card-section>
      <q-card-section>
        <q-form
          ref="formReff"
          @submit="onSubmit"
          @reset="onReset"
        >
          <div class="row q-col-gutter-md">
            <div class="col-sm-4 col-xs-12">
              <app-autocomplete-new
                :model="store.form.user_id"
                label="Pilih nama pegawai"
                outlined
                autofocus
                option-label="nama"
                option-value="id"
                autocomplete="nama"
                :source="store.pegawaies"
                @on-select="store.pegawaiSelected"
                @clear="store.pegawaiCleared"
              />
            </div>
            <div class="col-sm-4 col-xs-12">
              <app-autocomplete-new
                :model="store.form.ruang_id"
                label="Pilih Ruangan"
                outlined
                autofocus
                option-label="uraian"
                option-value="id"
                autocomplete="uraian"
                :source="store.ruangs"
                @on-select="store.ruangSelected"
                @clear="store.ruangCleared"
              />
            </div>
            <div class="col-sm-4 col-xs-12">
              <app-autocomplete-new
                :model="store.kategori"
                label="Pilih Kategori Jadwal"
                outlined
                autofocus
                option-label="nama"
                option-value="value"
                autocomplete="nama"
                :source="store.kategoriJadwal"
                @on-select="store.kategoriJadwalSelected"
                @clear="store.kategoriJadwalCleared"
              />
            </div>
          </div>

          <q-separator class="q-my-md" />
          <div
            v-if="store.kategori!==3"
            class="row q-col-gutter-md q-mt-lg"
          >
            <div
              v-if="store.form.kategory_id===1 "
              class="col-12"
            >
              <div class="row q-col-gutter-md q-mt-sm">
                <div class="col-2">
                  {{ store.kategories[0].pertama.nama }}
                </div>
                <div class="col-5">
                  jam : {{ store.kategories[0].jam_reguler.masuk }} - {{ store.kategories[0].jam_reguler.pulang }}
                </div>
              </div>
              <div class="row q-col-gutter-md q-mt-sm">
                <div class="col-2">
                  {{ store.kategories[0].kedua.nama }}
                </div>
                <div class="col-5">
                  jam : {{ store.kategories[0].jam_reguler.masuk }} - {{ store.kategories[0].jam_reguler.pulang }}
                </div>
              </div>
              <div class="row q-col-gutter-md q-mt-sm">
                <div class="col-2">
                  {{ store.kategories[0].ketiga.nama }}
                </div>
                <div class="col-5">
                  jam : {{ store.kategories[0].jam_reguler.masuk }} - {{ store.kategories[0].jam_reguler.pulang }}
                </div>
              </div>
              <div class="row q-col-gutter-md q-mt-sm">
                <div class="col-2">
                  {{ store.kategories[0].keempat.nama }}
                </div>
                <div class="col-5">
                  jam : {{ store.kategories[0].jam_reguler.masuk }} - {{ store.kategories[0].jam_reguler.pulang }}
                </div>
              </div>
              <div class="row q-col-gutter-md q-mt-sm">
                <div class="col-2">
                  {{ store.kategories[0].kelima.nama }}
                </div>
                <div class="col-5">
                  jam : {{ store.kategories[0].jam_jumat.masuk }} - {{ store.kategories[0].jam_jumat.pulang }}
                </div>
              </div>
            </div>
            <div
              v-if="store.form.kategory_id===2 "
              class="col-12"
            >
              <div class="row q-col-gutter-md q-mt-sm">
                <div class="col-2">
                  {{ store.kategories[1].pertama.nama }}
                </div>
                <div class="col-5">
                  jam : {{ store.kategories[1].jam_reguler.masuk }} - {{ store.kategories[1].jam_reguler.pulang }}
                </div>
              </div>
              <div class="row q-col-gutter-md q-mt-sm">
                <div class="col-2">
                  {{ store.kategories[1].kedua.nama }}
                </div>
                <div class="col-5">
                  jam : {{ store.kategories[1].jam_reguler.masuk }} - {{ store.kategories[1].jam_reguler.pulang }}
                </div>
              </div>
              <div class="row q-col-gutter-md q-mt-sm">
                <div class="col-2">
                  {{ store.kategories[1].ketiga.nama }}
                </div>
                <div class="col-5">
                  jam : {{ store.kategories[1].jam_reguler.masuk }} - {{ store.kategories[1].jam_reguler.pulang }}
                </div>
              </div>
              <div class="row q-col-gutter-md q-mt-sm">
                <div class="col-2">
                  {{ store.kategories[1].keempat.nama }}
                </div>
                <div class="col-5">
                  jam : {{ store.kategories[1].jam_reguler.masuk }} - {{ store.kategories[1].jam_reguler.pulang }}
                </div>
              </div>
              <div class="row q-col-gutter-md q-mt-sm">
                <div class="col-2">
                  {{ store.kategories[1].kelima.nama }}
                </div>
                <div class="col-5">
                  jam : {{ store.kategories[1].jam_reguler.masuk }} - {{ store.kategories[1].jam_reguler.pulang }}
                </div>
              </div>
              <div class="row q-col-gutter-md q-mt-sm">
                <div class="col-2">
                  {{ store.kategories[1].keenam.nama }}
                </div>
                <div class="col-5">
                  jam : {{ store.kategories[1].jam_reguler.masuk }} - {{ store.kategories[1].jam_reguler.pulang }}
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="store.kategori===3"
          >
            <!-- Senin -->
            <div
              class="row q-col-gutter-md q-mt-sm items-center"
            >
              <div class="col-1 text-center">
                <q-checkbox
                  ref="refSenin"
                  v-model="store.form.hari_01"
                  val="1"
                  true-value="1"
                />
              </div>
              <div class="col-2">
                Senin
              </div>
              <div
                v-for="(shift, n) in store.shifts"
                :key="n"
                class="col-2"
              >
                <div
                  v-if="store.form.hari_01"
                  class="row items-center"
                >
                  <div class="col-4">
                    <q-radio
                      v-model="store.form.jam_01"
                      :val="shift.jam_01"
                      dense
                      :color="warna(shift)"
                    />
                  </div>
                  <div class="col-8">
                    <div class="row">
                      <q-chip
                        :color="warna(shift)"
                        text-color="white"
                        style="width:85px; padding:2px;"
                        dense
                        square
                      >
                        <div class="f-12">
                          {{ shift.nama }}
                        </div>
                      </q-chip>
                    </div>
                    <div class="row">
                      <q-chip
                        :color="warna(shift)"
                        text-color="white"
                        style="width:85px; padding:2px;"
                        dense
                        square
                      >
                        <div class="f-12">
                          {{ formatJam(shift.jam_reguler.masuk) }} - {{ formatJam(shift.jam_reguler.pulang) }}
                        </div>
                      </q-chip>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Selasa -->
            <div
              class="row q-col-gutter-md q-mt-sm items-center"
            >
              <div class="col-1 text-center">
                <q-checkbox
                  ref="refSelasa"
                  v-model="store.form.hari_02"
                  true-value="2"
                />
              </div>
              <div class="col-2">
                Selasa
              </div>
              <div
                v-for="(shift, n) in store.shifts"
                :key="n"
                class="col-2"
              >
                <div
                  v-if="store.form.hari_02"
                  class="row items-center"
                >
                  <div class="col-4">
                    <q-radio
                      v-model="store.form.jam_02"
                      :val="shift.jam_01"
                      dense
                      :color="warna(shift)"
                    />
                  </div>
                  <div class="col-8">
                    <div class="row">
                      <q-chip
                        :color="warna(shift)"
                        text-color="white"
                        style="width:85px; padding:2px;"
                        dense
                        square
                      >
                        <div class="f-12">
                          {{ shift.nama }}
                        </div>
                      </q-chip>
                    </div>
                    <div class="row">
                      <q-chip
                        :color="warna(shift)"
                        text-color="white"
                        style="width:85px; padding:2px;"
                        dense
                        square
                      >
                        <div class="f-12">
                          {{ formatJam(shift.jam_reguler.masuk) }} - {{ formatJam(shift.jam_reguler.pulang) }}
                        </div>
                      </q-chip>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Rabu -->
            <div
              class="row q-col-gutter-md q-mt-sm items-center"
            >
              <div class="col-1 text-center">
                <q-checkbox
                  ref="refRabu"
                  v-model="store.form.hari_03"
                  true-value="3"
                />
              </div>
              <div class="col-2">
                Rabu
              </div>
              <div
                v-for="(shift, n) in store.shifts"
                :key="n"
                class="col-2"
              >
                <div
                  v-if="store.form.hari_03"
                  class="row items-center"
                >
                  <div class="col-4">
                    <q-radio
                      v-model="store.form.jam_03"
                      :val="shift.jam_01"
                      dense
                      :color="warna(shift)"
                    />
                  </div>
                  <div class="col-8">
                    <div class="row">
                      <q-chip
                        :color="warna(shift)"
                        text-color="white"
                        style="width:85px; padding:2px;"
                        dense
                        square
                      >
                        <div class="f-12">
                          {{ shift.nama }}
                        </div>
                      </q-chip>
                    </div>
                    <div class="row">
                      <q-chip
                        :color="warna(shift)"
                        text-color="white"
                        style="width:85px; padding:2px;"
                        dense
                        square
                      >
                        <div class="f-12">
                          {{ formatJam(shift.jam_reguler.masuk) }} - {{ formatJam(shift.jam_reguler.pulang) }}
                        </div>
                      </q-chip>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Kamis -->
            <div
              class="row q-col-gutter-md q-mt-sm items-center"
            >
              <div class="col-1 text-center">
                <q-checkbox
                  ref="refKamis"
                  v-model="store.form.hari_04"
                  true-value="4"
                />
              </div>
              <div class="col-2">
                Kamis
              </div>
              <div
                v-for="(shift, n) in store.shifts"
                :key="n"
                class="col-2"
              >
                <div
                  v-if="store.form.hari_04"
                  class="row items-center"
                >
                  <div class="col-4">
                    <q-radio
                      v-model="store.form.jam_04"
                      :val="shift.jam_01"
                      dense
                      :color="warna(shift)"
                    />
                  </div>
                  <div class="col-8">
                    <div class="row">
                      <q-chip
                        :color="warna(shift)"
                        text-color="white"
                        style="width:85px; padding:2px;"
                        dense
                        square
                      >
                        <div class="f-12">
                          {{ shift.nama }}
                        </div>
                      </q-chip>
                    </div>
                    <div class="row">
                      <q-chip
                        :color="warna(shift)"
                        text-color="white"
                        style="width:85px; padding:2px;"
                        dense
                        square
                      >
                        <div class="f-12">
                          {{ formatJam(shift.jam_reguler.masuk) }} - {{ formatJam(shift.jam_reguler.pulang) }}
                        </div>
                      </q-chip>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Jum'at -->
            <div
              class="row q-col-gutter-md q-mt-sm items-center"
            >
              <div class="col-1 text-center">
                <q-checkbox
                  ref="refJumat"
                  v-model="store.form.hari_05"
                  true-value="5"
                />
              </div>
              <div class="col-2">
                Jum'at
              </div>
              <div
                v-for="(shift, n) in store.shifts"
                :key="n"
                class="col-2"
              >
                <div
                  v-if="store.form.hari_05"
                  class="row items-center"
                >
                  <div class="col-4">
                    <q-radio
                      v-model="store.form.jam_05"
                      :val="shift.jam_01"
                      dense
                      :color="warna(shift)"
                    />
                  </div>
                  <div class="col-8">
                    <div class="row">
                      <q-chip
                        :color="warna(shift)"
                        text-color="white"
                        style="width:85px; padding:2px;"
                        dense
                        square
                      >
                        <div class="f-12">
                          {{ shift.nama }}
                        </div>
                      </q-chip>
                    </div>
                    <div class="row">
                      <q-chip
                        :color="warna(shift)"
                        text-color="white"
                        style="width:85px; padding:2px;"
                        dense
                        square
                      >
                        <div class="f-12">
                          {{ formatJam(shift.jam_reguler.masuk) }} - {{ formatJam(shift.jam_reguler.pulang) }}
                        </div>
                      </q-chip>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Sabtu -->
            <div
              class="row q-col-gutter-md q-mt-sm items-center"
            >
              <div class="col-1 text-center">
                <q-checkbox
                  ref="refSabtu"
                  v-model="store.form.hari_06"
                  true-value="6"
                />
              </div>
              <div class="col-2">
                Sabtu
              </div>
              <div
                v-for="(shift, n) in store.shifts"
                :key="n"
                class="col-2"
              >
                <div
                  v-if="store.form.hari_06"
                  class="row items-center"
                >
                  <div class="col-4">
                    <q-radio
                      v-model="store.form.jam_06"
                      :val="shift.jam_01"
                      dense
                      :color="warna(shift)"
                    />
                  </div>
                  <div class="col-8">
                    <div class="row">
                      <q-chip
                        :color="warna(shift)"
                        text-color="white"
                        style="width:85px; padding:2px;"
                        dense
                        square
                      >
                        <div class="f-12">
                          {{ shift.nama }}
                        </div>
                      </q-chip>
                    </div>
                    <div class="row">
                      <q-chip
                        :color="warna(shift)"
                        text-color="white"
                        style="width:85px; padding:2px;"
                        dense
                        square
                      >
                        <div class="f-12">
                          {{ formatJam(shift.jam_reguler.masuk) }} - {{ formatJam(shift.jam_reguler.pulang) }}
                        </div>
                      </q-chip>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Minggu -->
            <div
              class="row q-col-gutter-md q-mt-sm items-center"
            >
              <div class="col-1 text-center">
                <q-checkbox
                  ref="refMinggu"
                  v-model="store.form.hari_07"
                  true-value="7"
                />
              </div>
              <div class="col-2">
                Minggu
              </div>
              <div
                v-for="(shift, n) in store.shifts"
                :key="n"
                class="col-2"
              >
                <div
                  v-if="store.form.hari_07"
                  class="row items-center"
                >
                  <div class="col-4">
                    <q-radio
                      v-model="store.form.jam_07"
                      :val="shift.jam_01"
                      dense
                      :color="warna(shift)"
                    />
                  </div>
                  <div class="col-8">
                    <div class="row">
                      <q-chip
                        :color="warna(shift)"
                        text-color="white"
                        style="width:85px; padding:2px;"
                        dense
                        square
                      >
                        <div class="f-12">
                          {{ shift.nama }}
                        </div>
                      </q-chip>
                    </div>
                    <div class="row">
                      <q-chip
                        :color="warna(shift)"
                        text-color="white"
                        style="width:85px; padding:2px;"
                        dense
                        square
                      >
                        <div class="f-12">
                          {{ formatJam(shift.jam_reguler.masuk) }} - {{ formatJam(shift.jam_reguler.pulang) }}
                        </div>
                      </q-chip>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <q-separator class="q-my-md" />
          <div class="text-right">
            <app-btn
              type="reset"
              color="dark"
              label="Cancel"
              class="q-mr-md"
            />
            <app-btn
              label="Simpan"
              :loading="store.loading"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useAbsensiJadwalStore } from 'src/stores/simrs/pegawai/absensi/jadwal/jadwal'
import { ref, watch } from 'vue'
const store = useAbsensiJadwalStore()

const formReff = ref(null)
const formatJam = data => {
  const temp = data.split(':')
  return temp[0] + ':' + temp[1]
}
// const shiftSelected = ref(null)

const warna = data => {
  // console.log('warna ', data.nama)
  if (data.nama === 'Shift Pagi') {
    return 'light-blue-6'
  } else if (data.nama === 'Shift Siang') {
    return 'deep-orange-10'
  } else if (data.nama === 'Shift malam') {
    return 'dark'
  } else if (data.nama === 'Shift subuh') {
    return 'blue-grey-8'
  } else {
    return 'positive'
  }
}

// const refChkbox = ref(null)
const refSenin = ref(null)
const refSelasa = ref(null)
const refRabu = ref(null)
const refKamis = ref(null)
const refJumat = ref(null)
const refSabtu = ref(null)
const refMinggu = ref(null)
const daySelected = ref([])
watch(store.form, () => {
  console.log('watch edited', store.edited)
})
if (store.edited === true) {
  console.log('page form Input edited true', store.checkBoxValue)
  daySelected.value = store.checkBoxValue
}
// const checkBox = (value, event) => {
//   if (value.length) {
//     store.tanggals = []
//     value.forEach(data => {
//       store.setForm('hari_0' + data + 1, store.days[data].id)
//       store.tanggals[data] = store.days[data]
//       if (store.tanggals[data].created_at) {
//         delete store.tanggals[data].created_at
//       }
//       if (store.tanggals[data].updated_at) {
//         delete store.tanggals[data].updated_at
//       }
//     })
//   } else {
//     store.tanggals = []
//   }
//   console.log('tanggal', store.tanggals)
//   console.log('model', daySelected.value)
//   console.log('value', value)
//   // console.log('event', event)
// }
// const RadioSel = (value, event) => {
//   console.log('model', shiftSelected.value)
//   console.log('tanggal', store.tanggals)
//   console.log('value', value)
//   // console.log('event', event)
// }
const onSubmit = () => {
  store.saveForm()
    .then(() => {
      if (formReff.value != null) { formReff.value.resetValidation() }

      store.setOpen()
    }).catch(() => {
      store.setOpen()
    })
}
const onReset = () => {
  formReff.value.resetValidation()
  store.setOpen()
}
// onSubmit()
</script>
<style lang="scss" scoped>
.itu{
  width: 75vw !important;
}
</style>
