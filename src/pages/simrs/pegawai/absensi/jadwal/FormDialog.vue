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
            <div class="row q-col-gutter-md q-mt-sm">
              <div class="col-sm-7 col-md-5 col-xs-12">
                <app-autocomplete-new
                  v-model="store.form.kategory_id"
                  label="Pilih Kategori shift"
                  outlined
                  autofocus
                  option-label="nama"
                  option-value="id"
                  autocomplete="nama"
                  :source="store.shifts"
                  @on-select="store.kategorySelected"
                  @clear="store.kategoryCleared"
                />
              </div>
            </div>
            <div class="row q-col-gutter-md q-mt-sm">
              <div class="col-sm-7 col-md-5 col-xs-12">
                <q-date
                  ref="refDate"
                  v-model="store.tanggals"
                  multiple
                  :color="color"
                  :disable="!store.form.kategory_id"
                  @update:model-value="store.updateTagggal"
                />
              </div>
              <div
                v-if="store.tanggals.length"
                class="col-sm-5 col-md-6 col-xs-12"
              >
                <div class="row q-col-gutter-md q-my-sm">
                  <div class="col-3">
                    <div class="row q-col-gutter-md q-my-sm">
                      <q-chip
                        color="primary"
                        text-color="white"
                        style="width:75px; padding:5px"
                        square
                        dense
                      >
                        <div class="f-12">
                          Tanggal
                        </div>
                      </q-chip>
                    </div>
                    <div
                      v-for="(item,i) in store.tanggals"
                      :key="i"
                      class="row q-col-gutter-md q-my-sm"
                    >
                      <q-chip
                        color="primary"
                        text-color="white"
                        style="width:75px; padding:5px;"
                        dense
                        square
                        outline
                      >
                        <div class="f-12">
                          {{ dateHalfFormat(item) }}
                        </div>
                      </q-chip>
                    </div>
                  </div>
                  <div class="col-2">
                    <div class="row q-col-gutter-md q-my-sm">
                      <q-chip
                        color="light-blue"
                        text-color="white"
                        style="width:75px; padding:5px"
                        square
                        dense
                      >
                        <div class="f-12">
                          Pagi
                        </div>
                      </q-chip>
                    </div>
                    <div
                      v-for="(item,i) in store.pagies"
                      :key="i"
                      class="row q-col-gutter-md q-my-sm"
                    >
                      <q-chip
                        color="light-blue"
                        text-color="white"
                        style="width:75px; padding:5px;"
                        dense
                        square
                        outline
                      >
                        <div class="f-12">
                          {{ dateHalfFormat(item) }}
                        </div>
                      </q-chip>
                    </div>
                  </div>
                  <div class="col-2">
                    <div class="row q-col-gutter-md q-my-sm">
                      <q-chip
                        color="amber"
                        text-color="white"
                        style="width:75px; padding:5px"
                        square
                        dense
                      >
                        <div class="f-12">
                          Siang
                        </div>
                      </q-chip>
                    </div>
                    <div
                      v-for="(item,i) in store.siangs"
                      :key="i"
                      class="row q-col-gutter-md q-my-sm"
                    >
                      <q-chip
                        color="amber"
                        text-color="white"
                        style="width:75px; padding:5px;"
                        dense
                        square
                        outline
                      >
                        <div class="f-12">
                          {{ dateHalfFormat(item) }}
                        </div>
                      </q-chip>
                    </div>
                  </div>
                  <div class="col-2">
                    <div class="row q-col-gutter-md q-my-sm">
                      <q-chip
                        color="dark"
                        text-color="white"
                        style="width:75px; padding:5px"
                        square
                        dense
                      >
                        <div class="f-12">
                          Malam
                        </div>
                      </q-chip>
                    </div>
                    <div
                      v-for="(item,i) in store.malams"
                      :key="i"
                      class="row q-col-gutter-md q-my-sm"
                    >
                      <q-chip
                        color="dark"
                        text-color="white"
                        style="width:75px; padding:5px;"
                        dense
                        square
                        outline
                      >
                        <div class="f-12">
                          {{ dateHalfFormat(item) }}
                        </div>
                      </q-chip>
                    </div>
                  </div>
                  <div class="col-2">
                    <div class="row q-col-gutter-md q-my-sm">
                      <q-chip
                        color="blue-grey-6"
                        text-color="white"
                        style="width:75px; padding:5px"
                        square
                        dense
                      >
                        <div class="f-12">
                          Subuh
                        </div>
                      </q-chip>
                    </div>
                    <div
                      v-for="(item,i) in store.subuhes"
                      :key="i"
                      class="row q-col-gutter-md q-my-sm"
                    >
                      <q-chip
                        color="blue-grey-6"
                        text-color="white"
                        style="width:75px; padding:5px;"
                        dense
                        square
                        outline
                      >
                        <div class="f-12">
                          {{ dateHalfFormat(item) }}
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
              type="btn"
              label="Lihat"
              class="q-mr-md"
              @click="liatRef"
            />
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
import { dateHalfFormat } from 'src/modules/formatter'
import { computed, ref } from 'vue'
// import { ref } from 'vue'
const store = useAbsensiJadwalStore()
const color = computed(() => {
  let warna = 'primary'
  if (store.form.kategory_id === 3) { warna = 'light-blue' }
  if (store.form.kategory_id === 4) { warna = 'amber' }
  if (store.form.kategory_id === 5) { warna = 'dark' }
  if (store.form.kategory_id === 6) { warna = 'blue-grey-6' }
  return warna
})
const refDate = ref(null)

const liatRef = () => {
  console.log(refDate.value)
}

const formReff = ref(null)

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
