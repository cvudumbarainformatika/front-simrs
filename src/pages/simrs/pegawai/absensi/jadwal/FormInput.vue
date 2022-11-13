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
            <div
              v-for="(day, i) in store.days"
              :key="i"
              class="row q-col-gutter-md q-mt-sm items-center"
            >
              <div class="col-1 text-center">
                <q-checkbox
                  v-model="daySelected"
                  :val="i"
                  @update:model-value="checkBox"
                />
              </div>
              <div class="col-2">
                {{ day.nama }}
              </div>
              <div
                v-for="(shift, n) in store.shifts"
                :key="n"
                class="col-2"
              >
                <div
                  v-if="store.tanggals[i]"
                  class="row items-center"
                >
                  <div class="col-4">
                    <q-radio
                      v-model="store.tanggals[i].shift"
                      :val="shift.jam_reguler"
                      dense
                      @update:model-value="RadioSel"
                    />
                  </div>
                  <div class="col-8">
                    <div class="row">
                      {{ shift.nama }}
                    </div>
                    <div class="row">
                      {{ formatJam(shift.jam_reguler.masuk) }} - {{ formatJam(shift.jam_reguler.pulang) }}
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
import { ref } from 'vue'
const store = useAbsensiJadwalStore()

const formReff = ref(null)
const formatJam = data => {
  const temp = data.split(':')
  return temp[0] + ':' + temp[1]
}
const daySelected = ref([])
const shiftSelected = ref(null)
const checkBox = (value, event) => {
  if (value.length) {
    store.tanggals = []
    value.forEach(data => {
      store.tanggals[data] = store.days[data]
      if (store.tanggals[data].created_at) {
        delete store.tanggals[data].created_at
      }
      if (store.tanggals[data].updated_at) {
        delete store.tanggals[data].updated_at
      }
    })
  } else {
    store.tanggals = []
  }
  console.log('tanggal', store.tanggals)
  console.log('model', daySelected.value)
  console.log('value', value)
  console.log('event', event)
}
const RadioSel = (value, event) => {
  console.log('model', shiftSelected.value)
  console.log('tanggal', store.tanggals)
  console.log('value', value)
  // console.log('event', event)
}
const onSubmit = () => {
  store.saveForm().then(() => {
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
</script>
<style lang="scss" scoped>
.itu{
  width: 75vw !important;
}
</style>
