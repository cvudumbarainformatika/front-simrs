<template>
  <q-form
    class="column full-height full-width"
    @submit="simpan"
  >
    <div class="col-auto">
      <div class="q-px-md q-py-sm text-weight-bold bg-dark text-white">
        FORM DIAGNOSA KEPERAWATAN & INTERVENSI KEPERAWATAN
        <!-- <div class="f-10 text-weight-light">
          <em>Pilih Diagnosa Keperawatan dibawah berikut </em>
        </div> -->
      </div>
      <q-separator class="q-mb-sm" />
      <div class="q-px-md">
        <q-input
          v-model="store.diagnosa"
          label="Diagnosa Keperawtan (Klik Untuk Cari Diagnosa)"
          autogrow
          outlined
          standout="bg-yellow-3"
          icon="icon-mat-search"
          :rules="[val => !!val || 'Harap cari Diagnosa dahulu']"
          lazy-rules="ondemand"
          hide-bottom-space
          @click="modalOpen = true"
          @update:model-value="lihatDiagnosa"
        />
      </div>
      <q-separator class="q-my-sm" />
    </div>

    <div class="col full-height q-px-md">
      <div><b>Intervensi Keperawatan</b></div>
      <q-scroll-area style="height:calc(100% - 20px)">
        <div
          v-for="item in store.selectDiagnosa"
          :key="item.kode"
        >
          <q-separator class="q-my-xs" />
          <div> <b>{{ item.kode }} - {{ item.nama }}</b> </div>

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
        </div>

        <q-separator class="q-my-lg" />
        <div
          class="text-right"
          style="margin-bottom: 30px;"
        >
          <q-btn
            label="Simpan Diagnosa & Intervensi Keperawatan"
            color="primary"
            type="submit"
          />
        </div>
      </q-scroll-area>
    </div>
    <!-- modal diagnosa -->
    <modal-diagnosa-keperawatan
      :key="props?.pasien"
      v-model="modalOpen"
      :masters="store.diagnosas"
      @ok="modalOpen=false"
    />
  </q-form>
</template>

<script setup>

import ModalDiagnosaKeperawatan from './ModalDiagnosaKeperawatan.vue'
import { useDiagnosaKeperawatan } from 'src/stores/simrs/pelayanan/poli/diagnosakeperawatan'
import { onMounted, ref } from 'vue'

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

const store = useDiagnosaKeperawatan()

const modalOpen = ref()
// const group = ref([])

// function onSubmit() {
//   console.log('save')
// }

onMounted(() => {
  console.log(props.pasien)
  store.initReset()
  store.getData()
})

function lihatDiagnosa () {
  console.log('lihat', store.selectDiagnosa)
}

function simpan () {
  // console.log('simpan', store.simpanDiagnosadanIntervensi(props?.pasien))
  store.simpanDiagnosadanIntervensi(props?.pasien)
}
</script>
