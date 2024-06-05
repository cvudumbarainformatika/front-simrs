<template>
  <div class="fit q-pa-sm">
    <div class="row fit">
      <div class="col-7 full-height">
        <q-card
          class="fit"
          square
        >
          <div class="column full-height">
            <div class="col-auto">
              <div class="q-pa-sm bg-primary text-white text-weight-bold">
                PEMERIKSAAN PSIKOLOGI
              </div>
            </div>

            <div class="col full-height scroll">
              <q-form>
                <div class="column q-px-md q-pt-md">
                  <div class="row q-gutter-md">
                    <q-input
                      v-model="store.form.urutankelahiran"
                      autofocus
                      outlined
                      dense
                      standout="bg-yellow-3"
                      label="Urutan Kelahiran"
                      style="width:30%"
                    />
                    <div style="width:30%">
                      <app-input-date
                        v-model="store.form.tanggalpemeriksaan"
                        class="full-width"
                        label="Tanggal Pemeriksaan"
                        outlined
                        @set-model="(val)=>store.form.tanggalpemeriksaan=val"
                      />
                    </div>
                  </div>
                  <div class="text-weight-bold q-my-sm">
                    Observasi
                  </div>
                  <div class="row">
                    <div
                      class="col-12 q-pa-md"
                      style="border:1px solid grey"
                    >
                      <b>deskripsi Umum</b>
                      <div class="row q-gutter-md q-py-xs">
                        <div> - Penampilan Umum : </div>
                        <q-radio
                          v-model="store.form.penampilanumum"
                          val="Terawat"
                          label="Terawat"
                          dense
                          size="sm"
                        />
                        <q-radio
                          v-model="store.form.penampilanumum"
                          val="Kurang Terawat"
                          label="Kurang Terawat"
                          dense
                          size="sm"
                        />
                      </div>
                      <q-separator class="q-my-xs" />
                      <div class="row q-gutter-md">
                        <div> - Sikap Terhadap Pemeriksaan : </div>
                        <q-radio
                          v-model="store.form.sikapThdPemeriksaan"
                          val="Kooperatif"
                          label="Kooperatif"
                          dense
                          size="sm"
                        />
                        <q-radio
                          v-model="store.form.sikapThdPemeriksaan"
                          val="Kurang Kooperatif"
                          label="Kurang Kooperatif"
                          dense
                          size="sm"
                        />
                      </div>
                      <q-separator class="q-my-xs" />
                      <div class="row q-gutter-md">
                        <div> - Afek : </div>
                        <q-radio
                          v-model="store.form.afek"
                          val="Normal"
                          label="Normal"
                          dense
                          size="sm"
                        />
                        <q-radio
                          v-model="store.form.afek"
                          val="Datar"
                          label="Datar"
                          dense
                          size="sm"
                        />
                        <q-radio
                          v-model="store.form.afek"
                          val="Kooperatif"
                          label="Kooperatif"
                          dense
                          size="sm"
                        />
                      </div>
                      <q-separator class="q-my-xs" />
                      <div class="row q-gutter-md">
                        <div> - Roman Muka : </div>
                        <q-radio
                          v-model="store.form.romanMuka"
                          val="Murung"
                          label="Murung"
                          dense
                          size="sm"
                        />
                        <q-radio
                          v-model="store.form.romanMuka"
                          val="Wajar"
                          label="Wajar"
                          dense
                          size="sm"
                        />
                        <q-radio
                          v-model="store.form.romanMuka"
                          val="Euphoria"
                          label="Euphoria"
                          dense
                          size="sm"
                        />
                      </div>
                      <q-separator class="q-my-xs" />
                      <div class="row q-gutter-md">
                        <div> - Proses pikir : </div>
                        <q-radio
                          v-model="store.form.prosesPikir"
                          val="Realistik"
                          label="Realistik"
                          dense
                          size="sm"
                        />
                        <q-radio
                          v-model="store.form.prosesPikir"
                          val="Tidak Realistik"
                          label="Tidak Realistik"
                          dense
                          size="sm"
                        />
                      </div>
                      <q-separator class="q-my-xs" />
                      <div class="row q-gutter-md">
                        <q-input
                          v-model="store.form.gangguanPersepsi"
                          dense
                          outlined
                          standout="bg-yellow-3"
                          label="Gangguan Persepsi"
                          style="width: 70%;"
                        />
                      </div>
                    </div>
                    <div
                      class="col-12 q-pa-md"
                      style="border:1px solid grey"
                    >
                      <b>Fungsi Psikologi</b>
                      <div> - Kognitif</div>
                      <div class="row q-gutter-md q-ml-xs">
                        <div> - Memory : </div>
                        <q-radio
                          v-model="store.form.memory"
                          val="+"
                          label="+"
                          dense
                          size="sm"
                        />
                        <q-radio
                          v-model="store.form.memory"
                          val="-"
                          label="-"
                          dense
                          size="sm"
                        />
                      </div>
                      <q-separator class="q-my-xs" />
                      <div class="row q-gutter-md q-ml-xs">
                        <div> - Konsentrasi : </div>
                        <q-radio
                          v-model="store.form.konsentrasi"
                          val="+"
                          label="+"
                          dense
                          size="sm"
                        />
                        <q-radio
                          v-model="store.form.konsentrasi"
                          val="-"
                          label="-"
                          dense
                          size="sm"
                        />
                      </div>
                      <q-separator class="q-my-xs" />
                      <div class="row q-gutter-md q-ml-xs">
                        <div> - Orientasi : </div>
                        <q-radio
                          v-model="store.form.orientasi"
                          val="+"
                          label="+"
                          dense
                          size="sm"
                        />
                        <q-radio
                          v-model="store.form.orientasi"
                          val="-"
                          label="-"
                          dense
                          size="sm"
                        />
                      </div>
                      <q-separator class="q-my-xs" />
                      <div class="row q-gutter-md">
                        <div> - Kemampuan Verbal : </div>
                        <q-radio
                          v-model="store.form.kemampuanverbal"
                          val="+"
                          label="+"
                          dense
                          size="sm"
                        />
                        <q-radio
                          v-model="store.form.kemampuanverbal"
                          val="-"
                          label="-"
                          dense
                          size="sm"
                        />
                      </div>
                      <q-separator class="q-my-xs" />
                      <div class="row q-gutter-md">
                        <div> - Emosi : </div>
                        <q-radio
                          v-model="store.form.emosi"
                          val="Stabil"
                          label="Stabil"
                          dense
                          size="sm"
                        />
                        <q-radio
                          v-model="store.form.emosi"
                          val="Tidak stabil"
                          label="Tidak stabil"
                          dense
                          size="sm"
                        />
                      </div>
                      <q-separator class="q-my-xs" />
                      <div class="row q-gutter-md">
                        <div> - Prilaku : </div>
                        <q-radio
                          v-model="store.form.prilaku"
                          val="Ada Hambatan"
                          label="Ada Hambatan"
                          dense
                          size="sm"
                        />
                        <q-radio
                          v-model="store.form.prilaku"
                          val="Normal"
                          label="Normal"
                          dense
                          size="sm"
                        />
                        <q-radio
                          v-model="store.form.prilaku"
                          val="Agresif"
                          label="Agresif"
                          dense
                          size="sm"
                        />
                        <q-radio
                          v-model="store.form.prilaku"
                          val="Menarik diri"
                          label="Menarik diri"
                          dense
                          size="sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="text-weight-bold q-my-sm">
                    Psikotes Pendukung
                  </div>

                  <div class="column">
                    <div class="relative-position q-mb-md">
                      <q-btn
                        label="Tambah Psikotes Pendukung"
                        dense
                        color="primary"
                        class="full-width relative-position"
                        outline
                      >
                        <q-popup-edit
                          v-slot="scope"
                          v-model="store.psikotes"
                          class="q-pa-sm"
                          persistent
                          :cover="false"
                          buttons
                          style="width:30%"
                          @update:model-value="addPsiko"
                        >
                          <q-input
                            v-model="scope.value"
                            dense
                            standout="bg-yellow-3"
                            autofocus
                            outlined
                            placeholder="Enter untuk menambahkan"
                            @keyup.enter="scope.set"
                          />
                        </q-popup-edit>
                      </q-btn>
                    </div>

                    <q-list
                      dense
                      separator
                      bordered
                    >
                      <q-item
                        v-for="(item, i) in store.form.psikotespendukung"
                        :key="i"
                      >
                        <q-item-section>
                          <div class="row">
                            <div class="q-pr-sm">
                              {{ i +1 }}.
                            </div>
                            <div>
                              {{ item }}
                              <q-popup-edit
                                v-slot="scope"
                                v-model="store.form.psikotespendukung[i]"
                                auto-save
                                :cover="false"
                                :offset="[0, 0]"
                                class="q-pa-none"
                              >
                                <q-input
                                  v-model="scope.value"
                                  dense
                                  autofocus
                                  outlined
                                  standout="bg-yellow-3"
                                  @keyup.enter="scope.set"
                                />
                              </q-popup-edit>
                            </div>
                          </div>
                        </q-item-section>
                      </q-item>
                    </q-list>

                    <q-input
                      v-model="store.form.hasilTes"
                      dense
                      outlined
                      standout="bg-yellow-3"
                      label="Hasil Tes :"
                      class="q-my-sm"
                    />
                  </div>

                  <div class="text-weight-bold q-my-sm">
                    Simptom
                  </div>

                  <q-option-group
                    v-model="store.form.simptom"
                    :options="store.optionSimptom"
                    color="green"
                    type="checkbox"
                    inline
                  />

                  <q-input
                    v-model="store.form.dinamikPsikologi"
                    dense
                    outlined
                    standout="bg-yellow-3"
                    label="Dinamika Psikologi"
                    class="q-my-xs"
                  />
                  <q-input
                    v-model="store.form.diagnosaPsikologi"
                    dense
                    outlined
                    standout="bg-yellow-3"
                    label="Diagnosa Psikologi"
                    class="q-my-xs"
                  />
                  <q-input
                    v-model="store.form.rencanaIntervensiPsikologi"
                    dense
                    outlined
                    standout="bg-yellow-3"
                    label="Rencana Intervensi Psikologi"
                    class="q-my-xs"
                  />
                  <q-input
                    v-model="store.form.intervensiPsikologi"
                    dense
                    outlined
                    standout="bg-yellow-3"
                    label="Intervensi Psikologi"
                    class="q-my-xs"
                  />
                </div>

                <div style="margin-bottom: 100px;" />
              </q-form>

              <div class="absolute-bottom bg-grey-4 shadow-4">
                <div class="q-pa-md row justify-end">
                  <q-btn
                    color="primary"
                    @click="simpanData"
                  >
                    Simpan Pemeriksaan Psikologi
                  </q-btn>
                </div>
              </div>
            </div>
          </div>
        </q-card>
      </div>
      <div class="col-5 full-height">
        <ListPsikiatri
          :items="pasien?.psikiatri"
          @hapus="deleteData"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import ListPsikiatri from './comppsikiatri/ListPsikiatri.vue'
import { usePsikologiPoli } from 'src/stores/simrs/pelayanan/poli/psikologi'
import { onMounted } from 'vue'
import { useQuasar } from 'quasar'

const store = usePsikologiPoli()
const $q = useQuasar()
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})
onMounted(() => {
  store.setOptionsSimptom()
  store.initForm()
  console.log(props.pasien)
})

function simpanData() {
  store.saveData(props.pasien)
}

function addPsiko() {
  store.setPsiko().then(() => {
    store.psikotes = null
  })
}

function deleteData(id) {
  $q.dialog({
    dark: true,
    title: 'Peringatan',
    message: 'Apakah Data ini akan dihapus?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    // console.log('HAPUS', id)
    store.deleteData(props.pasien, id)
  }).onCancel(() => {
    // console.log('Cancel')
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}
</script>
