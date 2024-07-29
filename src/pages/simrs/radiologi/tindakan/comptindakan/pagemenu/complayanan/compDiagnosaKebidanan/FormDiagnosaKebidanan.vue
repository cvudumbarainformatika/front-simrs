<template>
  <q-form
    class="column full-height full-width"
    @submit="simpan"
  >
    <div class="col-auto">
      <div class="q-px-md q-py-sm text-weight-bold bg-dark text-white">
        FORM DIAGNOSA KEBIDANAN
      </div>
      <q-separator class="q-mb-sm" />
      <div class="q-px-md">
        <q-input
          v-model="store.diagnosa"
          label="Diagnosa Kebidanan (Klik Untuk Cari Diagnosa)"
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
      <div><b>Intervensi Kebidanan</b></div>
      <q-scroll-area style="height:calc(100% - 20px)">
        <div
          v-for="item in store.selectDiagnosa"
          :key="item.kode"
        >
          <q-separator class="q-my-xs" />
          <div> <b>{{ item.kode }} - {{ item.nama }}</b> </div>
          <template
            v-for="gr in lihatIntervensis(item)"
            :key="gr"
          >
            <div v-if="item.intervensis?.filter(x=>x.group === gr).length">
              <q-separator class="q-my-xs" />
              <div class="">
                <q-chip
                  outline
                  color="primary"
                  text-color="white"
                  dense
                  size="sm"
                >
                  {{ gr }}
                </q-chip>
              </div>
              <q-option-group
                v-model="store.selectIntervensis"
                :options="item.intervensis?.filter(x=>x.group === gr).map(x=>{
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
          </template>
        </div>

        <q-separator class="q-my-lg" />
        <div
          class="text-right"
          style="margin-bottom: 30px;"
        >
          <q-btn
            label="Simpan Diagnosa & Intervensi Kebidanan"
            color="primary"
            type="submit"
          />
        </div>
      </q-scroll-area>
    </div>
    <!-- modal diagnosa -->
    <modal-diagnosa-kebidanan
      :key="props?.pasien"
      v-model="modalOpen"
      :masters="store.diagnosas"
      @ok="modalOpen=false"
    />
  </q-form>
</template>

<script setup>

import ModalDiagnosaKebidanan from './ModalDiagnosaKebidanan.vue'
import { useDiagnosaKebidananStore } from 'src/stores/simrs/pelayanan/poli/diagnosakebidanan'
import { onMounted, ref } from 'vue'

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

const store = useDiagnosaKebidananStore()

const modalOpen = ref()
const groups = ref([])

// function onSubmit() {
//   console.log('save')
// }

function lihatIntervensis(item) {
  const int = item.intervensis

  const gr = int.length ? int.map(x => x.group) : []
  const unik = gr.length ? [...new Set(gr)] : []
  groups.value = unik
  return unik
}

onMounted(() => {
  console.log(props.pasien)
  store.initReset()
  store.getData()
})

function lihatDiagnosa() {
  console.log('lihat', store.selectDiagnosa)
}

function simpan() {
  store.simpanDiagnosadanIntervensi(props?.pasien)
  // console.log('simpan', )
}
</script>
