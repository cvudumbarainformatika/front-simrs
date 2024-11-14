<template>
  <q-form
    class="column fit"
    @submit="simpan"
  >
    <div class="col full-height full-width">
      <div class="column fit">
        <div v-if="!ulang" class="col-auto">
          <div class="row q-col-gutter-x-md q-px-md q-pt-md q-pb-xs">
            <div class="col-auto">
              <div class="text-weight-bold">
                Pilih Diagnosa Keperawatan
              </div>
              <div class="f-10 text-weight-light">
                Click Untuk Pencarian Diagnosa Keperawatan
              </div>
            </div>
            <div class="col full-width">
              <q-input
                v-model="store.diagnosa"
                label="Diagnosa Keperawtan"
                autogrow
                outlined
                standout="bg-yellow-3"
                icon="icon-mat-search"
                :rules="[val => !!val || 'Harap cari Diagnosa dahulu']"
                lazy-rules="ondemand"
                hide-bottom-space
                @click="store.modalOpen = true"
                @update:model-value="lihatDiagnosa"
              />
            </div>

            <div v-if="store.selectDiagnosa.length" class="col-12">
              <b>Intervensi Keperawatan</b>
            </div>
          </div>
          <q-separator />
        </div>

        <div v-if="!ulang" class="col full-height q-px-md scroll">
          <div
            v-for="item in store.selectDiagnosa"
            :key="item.kode"
          >
            <q-separator class="q-my-xs" />
            <div class="bg-grey-4 q-pa-sm">
              <b>{{ item.kode }} - {{ item.nama }}</b>
            </div>

            <div v-if="item.intervensis?.filter(x=>x.group === 'terapeutik').length">
              <q-separator class="q-my-xs" />
              <div class="">
                <q-chip
                  outline
                  color="primary"
                  text-color="white"
                  dense
                  size="sm"
                >
                  Terapeutik
                </q-chip>
              </div>
              <q-option-group
                v-model="store.selectIntervensis"
                :options="item.intervensis?.filter(x=>x.group === 'terapeutik').map(x=>{
                  return {
                    label:x?.nama,
                    value:x?.id + '||' + item.kode
                  }
                })"
                color="primary"
                inline
                dense
                type="checkbox"
                size="sm"
              />
            </div>

            <div v-if="item.intervensis?.filter(x=>x.group === 'edukasi').length">
              <q-separator class="q-my-xs" />
              <div class="">
                <q-chip
                  outline
                  color="orange"
                  text-color="white"
                  dense
                  size="sm"
                >
                  Edukasi
                </q-chip>
              </div>
              <q-option-group
                v-model="store.selectIntervensis"
                :options="item.intervensis?.filter(x=>x.group === 'edukasi').map(x=>{
                  return {
                    label:x?.nama,
                    value:x?.id + '||' + item.kode
                  }
                })"
                color="primary"
                inline
                dense
                type="checkbox"
                size="sm"
              />
            </div>

            <div v-if="item.intervensis?.filter(x=>x.group === 'observasi').length">
              <q-separator class="q-my-xs" />
              <div class="">
                <q-chip
                  outline
                  color="teal"
                  text-color="white"
                  dense
                  size="sm"
                >
                  Observasi
                </q-chip>
              </div>
              <q-option-group
                v-model="store.selectIntervensis"
                :options="item.intervensis?.filter(x=>x.group === 'observasi').map(x=>{
                  return {
                    label:x?.nama,
                    value:x?.id + '||' + item.kode
                  }
                })"
                color="primary"
                inline
                dense
                type="checkbox"
                size="sm"
              />
            </div>

            <div
              v-if="item.intervensis?.filter(x=>x.group === 'kolaborasi').length"
              class="q-mb-sm"
            >
              <q-separator class="q-my-xs" />
              <div class="">
                <q-chip
                  outline
                  color="pink"
                  text-color="white"
                  dense
                  size="sm"
                >
                  Kolaborasi
                </q-chip>
              </div>
              <q-option-group
                v-model="store.selectIntervensis"
                :options="item.intervensis?.filter(x=>x.group === 'kolaborasi').map(x=>{
                  return {
                    label:x?.nama,
                    value:x?.id + '||' + item.kode
                  }
                })"
                color="primary"
                inline
                dense
                type="checkbox"
                size="sm"
              />
            </div>

            <div
              v-if="item.intervensis?.filter(x=>x.group === 'plann').length"
              class="q-mb-sm"
            >
              <q-separator class="q-my-xs" />
              <div class="">
                <q-chip
                  outline
                  color="pink"
                  text-color="white"
                  dense
                  size="sm"
                >
                  Plann
                </q-chip>
              </div>
              <q-option-group
                v-model="store.selectIntervensis"
                :options="item.intervensis?.filter(x=>x.group === 'plann').map(x=>{
                  return {
                    label:x?.nama,
                    value:x?.id + '||' + item.kode
                  }
                })"
                color="primary"
                inline
                dense
                type="checkbox"
                size="sm"
              />
            </div>
          </div>

          <div style="margin-bottom:100px" />
          <!-- <q-separator class="q-my-lg" /> -->
        </div>

        <div v-if="ulang" class="col full-height q-px-md scroll">
          <div
            v-for="item in store.selectDiagnosa"
            :key="item.kode"
          >
            <q-separator class="q-my-xs" />
            <div class="bg-grey-4 q-pa-sm">
              <b>{{ item.kode }} - {{ item.nama }}</b>
            </div>

            <div v-if="item.intervensis?.filter(x=>x.group === 'terapeutik' ).length && categoryIntervensi !== 'plann'">
              <q-separator class="q-my-xs" />
              <div class="">
                <q-chip
                  outline
                  color="primary"
                  text-color="white"
                  dense
                  size="sm"
                >
                  Terapeutik
                </q-chip>
              </div>
              <q-option-group
                v-model="store.selectIntervensis"
                :options="item.intervensis?.filter(x=>x.group === 'terapeutik').map(x=>{
                  return {
                    label:x?.nama,
                    value:x?.id + '||' + item.kode
                  }
                })"
                color="primary"
                inline
                dense
                type="checkbox"
                size="sm"
              />
            </div>

            <div v-if="item.intervensis?.filter(x=>x.group === 'edukasi').length && categoryIntervensi !== 'plann'">
              <q-separator class="q-my-xs" />
              <div class="">
                <q-chip
                  outline
                  color="orange"
                  text-color="white"
                  dense
                  size="sm"
                >
                  Edukasi
                </q-chip>
              </div>
              <q-option-group
                v-model="store.selectIntervensis"
                :options="item.intervensis?.filter(x=>x.group === 'edukasi').map(x=>{
                  return {
                    label:x?.nama,
                    value:x?.id + '||' + item.kode
                  }
                })"
                color="primary"
                inline
                dense
                type="checkbox"
                size="sm"
              />
            </div>

            <div v-if="item.intervensis?.filter(x=>x.group === 'observasi').length && categoryIntervensi !== 'plann'">
              <q-separator class="q-my-xs" />
              <div class="">
                <q-chip
                  outline
                  color="teal"
                  text-color="white"
                  dense
                  size="sm"
                >
                  Observasi
                </q-chip>
              </div>
              <q-option-group
                v-model="store.selectIntervensis"
                :options="item.intervensis?.filter(x=>x.group === 'observasi').map(x=>{
                  return {
                    label:x?.nama,
                    value:x?.id + '||' + item.kode
                  }
                })"
                color="primary"
                inline
                dense
                type="checkbox"
                size="sm"
              />
            </div>

            <div
              v-if="item.intervensis?.filter(x=>x.group === 'kolaborasi').length && categoryIntervensi !== 'plann'"
              class="q-mb-sm"
            >
              <q-separator class="q-my-xs" />
              <div class="">
                <q-chip
                  outline
                  color="pink"
                  text-color="white"
                  dense
                  size="sm"
                >
                  Kolaborasi
                </q-chip>
              </div>
              <q-option-group
                v-model="store.selectIntervensis"
                :options="item.intervensis?.filter(x=>x.group === 'kolaborasi').map(x=>{
                  return {
                    label:x?.nama,
                    value:x?.id + '||' + item.kode
                  }
                })"
                color="primary"
                inline
                dense
                type="checkbox"
                size="sm"
              />
            </div>

            <div
              v-if="item.intervensis?.filter(x=>x.group === 'plann').length && categoryIntervensi === 'plann'"
              class="q-mb-sm"
            >
              <q-separator class="q-my-xs" />
              <div class="">
                <q-chip
                  outline
                  color="pink"
                  text-color="white"
                  dense
                  size="sm"
                >
                  Plann
                </q-chip>
              </div>
              <q-option-group
                v-model="store.selectIntervensis"
                :options="item.intervensis?.filter(x=>x.group === 'plann').map(x=>{
                  return {
                    label:x?.nama,
                    value:x?.id + '||' + item.kode
                  }
                })"
                color="primary"
                inline
                dense
                type="checkbox"
                size="sm"
              />
            </div>
          </div>

          <div style="margin-bottom:100px" />
          <!-- <q-separator class="q-my-lg" /> -->
        </div>
      </div>
      <div
        v-if="!ulang"
        class="text-right absolute-bottom full-width bg-yellow-2 q-pa-sm"
      >
        <q-btn
          label="Simpan Diagnosa & Intervensi Keperawatan"
          color="primary"
          type="submit"
          :loading="store.loadingSave"
          :disable="store.loadingSave"
        />
      </div>
    </div>

    <!-- modal diagnosa -->
    <modal-diagnosa-keperawatan
      :key="props?.pasien"
      v-model="store.modalOpen"
      :masters="store.diagnosas"
      @ok="store.modalOpen=false"
    />
  </q-form>
</template>

<script setup>

import ModalDiagnosaKeperawatan from 'src/pages/simrs/poli/tindakan/comptindakan/pagemenu/complayanan/ModalDiagnosaKeperawatan.vue'
import { useDiagnosaKeperawatan } from 'src/stores/simrs/pelayanan/poli/diagnosakeperawatan'
import { onMounted } from 'vue'

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  kasus: {
    type: Object,
    default: null
  },
  nakes: {
    type: String,
    default: null
  },
  ulang: {
    type: Boolean,
    default: false
  },
  categoryIntervensi: {
    type: String,
    default: 'plann'
  }
})

const store = useDiagnosaKeperawatan()

// const modalOpen = ref()
// const group = ref([])

// function onSubmit() {
//   console.log('save')
// }

onMounted(() => {
  // console.log(props.pasien)
  if (!props.ulang)store.initReset()
})

function lihatDiagnosa () {
  console.log('lihat', store.selectDiagnosa)
}

function simpan () {
  // console.log('simpan')
  if (props.ulang) {
    store.tataForm(props?.pasien, 'ranap')
  }
  store.simpanDiagnosadanIntervensi(props?.pasien, 'ranap')
}
</script>
