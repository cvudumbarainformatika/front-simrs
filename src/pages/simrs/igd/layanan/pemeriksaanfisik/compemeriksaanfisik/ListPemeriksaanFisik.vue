<template>
  <q-card
    flat
    bordered
    square
    class="full-height bg-teal-2"
    style="overflow: hidden;"
  >
    <q-bar
      class="bg-teal text-white z-top"
      style="width: inherit;"
    >
      <div class="f-12">
        Data Pemeriksaan Fisik
      </div>
      <q-space />
    </q-bar>
    <q-card-section
      style="padding:0"
      class="full-height bg-grey"
    >
      <div
        v-if="loadingaja"
        class="column full-height flex-center"
      >
        <div class="text-white">
          Harap Tunggu .....
        </div>
        <div class="text-white">
          Sinkron Data Ke DATABASE
        </div>
      </div>
      <div
        v-if="pasien?.pemeriksaanfisikpsikologidll?.length <= 0"
        class="column full-height flex-center"
      >
        <div class="text-white">
          Belum Ada data tersimpan
        </div>
      </div>
      <q-scroll-area
        v-else
        style="height:calc(100% - 32px);"
      >
        <q-list
          class="bg-white"
          separator
        >
          <transition-group name="list">
            <q-item
              v-for="(triage , x) in pasien?.triage"
              :key="x"
            >
              <q-item-section>
                <q-item-label>
                  <q-badge outline color="red">
                    Pemeriksaan Dari Triage
                  </q-badge>
                </q-item-label>
                <q-item-label>
                  <div class="row">
                    <div class="col-3">
                      - Nadi : <span class="text-bold">{{ triage?.nadi ?? '-' }} x/mnt</span>
                    </div>
                    <div class="col-3">
                      - Suhu : <span class="text-bold">{{ triage?.suhu ?? '-' }}° C </span>
                    </div>
                    <div class="col-3">
                      - Kesadaran : <span class="text-bold">{{ triage?.kesadaran ?? '-' }} </span>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-3">
                      - Pernapasan : <span class="text-bold">{{ triage?.pernapasanx ?? '-' }} x/mnt </span>
                    </div>
                    <div class="col-3">
                      - SPo2 : <span class="text-bold">{{ triage?.spo2 ?? '-' }} % </span>
                    </div>
                    <div class="col-3">
                      - Sistole/Diastole : <span class="text-bold">{{ triage?.sistole ?? '-' }}/{{ triage?.diastole ?? '-' }} mmHg </span>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-3">
                      - Eye : <span class="text-bold">{{ triage?.eye ?? '-' }} </span>
                    </div>
                    <div class="col-3">
                      - Verbal : <span class="text-bold">{{ triage?.verbal ?? '-' }} </span>
                    </div>
                    <div class="col-3">
                      - Motorik : <span class="text-bold">{{ triage?.motorik ?? '-' }} </span>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-3">
                      - BB : <span class="text-bold">{{ triage?.bb ?? '-' }} Kg</span>
                    </div>
                    <div class="col-3">
                      - TB : <span class="text-bold">{{ triage?.tb ?? '-' }} Cm</span>
                    </div>
                  </div>
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item
              v-for="(item , n) in lists"
              :key="n"
              class="list-move"
            >
              <q-item-section>
                <q-item-label
                  class="f-12"
                >
                  <q-badge outline color="primary">
                    Pemeriksaan Psikologis, Sosial Ekonomi, Spiritual
                  </q-badge>
                </q-item-label>
                <div class="row">
                  <div class="col-5">
                    <q-item-label>
                      <span class="">- Status Psikologis </span> : <span class="text-weight-bold">{{ item?.pemerisaanpsikologidll?.status_psikologis_lain ?? item?.pemerisaanpsikologidll?.status_psikologis }}</span>
                    </q-item-label>
                    <q-item-label>
                      <span class="">- Sosial </span> : <span class="text-weight-bold">{{ item?.pemerisaanpsikologidll?.sosial ?? '-' }}</span>
                    </q-item-label>
                    <q-item-label>
                      <span class="">- Ekonomi </span> : <span class="text-weight-bold">{{ item?.pemerisaanpsikologidll?.ekonomi ?? '-' }}</span>
                    </q-item-label>
                  </div>
                  <div class="col-5">
                    <q-item-label>
                      <span class="">- Spiritual </span> : <span class="text-weight-bold">{{ item?.pemerisaanpsikologidll?.spiritual ?? '-' }}</span>
                    </q-item-label>
                    <q-item-label>
                      <span class="">- Nilai-nilai Kepercayaan & Budaya Yang Diyakini</span> : <span class="text-weight-bold">{{ item?.pemerisaanpsikologidll?.nilai_kepercayaan }}, {{ item?.pemerisaanpsikologidll?.ket_nilaikepercayaan }}</span>
                    </q-item-label>
                  </div>
                </div>
                <q-separator class="q-my-sm" />
                <q-item-label>
                  <span class=""><q-badge outline color="primary">
                    Pemeriksaan Pupil
                  </q-badge></span>
                </q-item-label>
                <q-item-label>
                  <span class="">- Keadaan Pupil</span> : <span class="text-weight-bold">{{ item?.pemerisaanpsikologidll?.keadaan_pupil }}</span>
                </q-item-label>
                <q-item-label>
                  <span class="">- Reflek Cahaya</span>
                </q-item-label>
                <q-item-label>
                  <div class="row q-ml-md">
                    <div class="col-4">
                      <span class=""> Kiri</span> : <span class="text-weight-bold">{{ item?.pemerisaanpsikologidll?.reflek_cahaya_kiri }}</span>
                    </div>
                    <div class="col-4">
                      <span class=""> Kanan</span> : <span class="text-weight-bold">{{ item?.pemerisaanpsikologidll?.reflek_cahaya_kanan }}</span>
                    </div>
                  </div>
                </q-item-label>
                <q-item-label>
                  <span class="">- Diameter</span>
                </q-item-label>
                <q-item-label>
                  <div class="row q-ml-md">
                    <div class="col-4">
                      <span class=""> Kiri</span> : <span class="text-weight-bold">{{ item?.pemerisaanpsikologidll?.diameter_kiri }} mm</span>
                    </div>
                    <div class="col-4">
                      <span class=""> Kanan</span> : <span class="text-weight-bold">{{ item?.pemerisaanpsikologidll?.diameter_kanan }} mm</span>
                    </div>
                  </div>
                </q-item-label>
                <q-separator class="q-my-sm" />
                <!-- <q-separator class="q-my-md" /> -->
                <q-item-label>
                  <q-badge outline color="primary">
                    Pemeriksaan Anatomi
                  </q-badge>
                </q-item-label>
                <q-item-label>
                  <span class="">- Kepala </span> : <span class="text-weight-bold">{{ item?.rs5 ?? '-' }}</span>
                </q-item-label>
                <q-item-label>
                  <span class="">- Leher </span> : <span class="text-weight-bold">{{ item?.rs6 ?? '-' }}</span>
                </q-item-label>
                <q-item-label>
                  <span class="">- Dada </span> : <span class="text-weight-bold">{{ item?.rs7 ?? '-' }}</span>
                </q-item-label>
                <q-item-label>
                  <span class="">- Punggung </span> : <span class="text-weight-bold">{{ item?.rs8 ?? '-' }}</span>
                </q-item-label>
                <q-item-label>
                  <span class="">- Perut </span> : <span class="text-weight-bold">{{ item?.rs9 ?? '-' }}</span>
                </q-item-label>
                <q-item-label>
                  <span class="">- Tangan </span> : <span class="text-weight-bold">{{ item?.rs10 ?? '-' }}</span>
                </q-item-label>
                <q-item-label>
                  <span class="">- Kaki </span> : <span class="text-weight-bold">{{ item?.rs11 ?? '-' }}</span>
                </q-item-label>
                <q-item-label>
                  <span class="">- Status Neurologis </span> : <span class="text-weight-bold">{{ item?.rs12 ?? '-' }}</span>
                </q-item-label>
                <q-item-label>
                  <span class="">- Genital </span> : <span class="text-weight-bold">{{ item?.rs13 ?? '-' }}</span>
                </q-item-label>
              </q-item-section>
              <q-item-section
                v-if="bisaEditHapus"
                side
              >
                <div class="q-gutter-sm">
                  <!-- <q-btn
                    flat
                    round
                    size="sm"
                    icon="icon-mat-edit"
                    @click="store.editForm(item)"
                  /> -->
                  <q-btn
                    flat
                    round
                    size="sm"
                    icon="icon-mat-delete"
                    color="negative"
                    @click="hapusItem(item.id, item.rs1)"
                  />
                </div>
              </q-item-section>
            </q-item>
          </transition-group>
        </q-list>
      </q-scroll-area>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { usePemeriksaanfisikStore } from 'src/stores/simrs/igd/pemeriksaanfisik'
import { computed } from 'vue'
const store = usePemeriksaanfisikStore()
const $q = useQuasar()
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  loadingaja: {
    type: Boolean,
    default: false
  },
  bisaEditHapus: {
    type: Boolean,
    default: true
  }
})

const lists = computed(() => {
  const arr = props.pasien?.pemeriksaanfisikpsikologidll
  return arr?.sort((a, b) => { return b.id - a.id })
})

function hapusItem (id, noreg) {
  $q.dialog({
    dark: true,
    title: 'Peringatan',
    message: 'Apakah Data ini akan dihapus?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    // console.log('OK')
    store.deleteData(props.pasien, id, noreg)
  }).onCancel(() => {
    // console.log('Cancel')
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}

</script>
