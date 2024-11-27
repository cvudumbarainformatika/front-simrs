<template>
  <q-form
    class="column full-height full-width"
    @submit="simpan"
  >
    <div v-if="!ulang" class="col-auto">
      <div class="q-px-md q-py-sm text-weight-bold bg-dark text-white">
        FORM DIAGNOSA GIZI
      </div>
      <q-separator class="q-mb-sm" />
      <div class="q-px-md">
        <q-input
          v-model="store.diagnosa"
          label="Diagnosa Gizi (Klik Untuk Cari Diagnosa)"
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
      <q-separator class="q-my-sm" />
    </div>

    <div class="col full-height q-px-md">
      <div><b>Kategori</b></div>
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
            label="Simpan Diagnosa & Intervensi Gizi"
            color="primary"
            type="submit"
            :loading="store.loadingSave"
            :disable="store.loadingSave"
          />
        </div>
      </q-scroll-area>
    </div>

    <!-- modal diagnosa -->
    <modal-diagnosa-gizi
      :key="props?.pasien"
      v-model="store.modalOpen"
      :masters="store.diagnosas"
      @ok="store.modalOpen=false"
    />
  </q-form>
</template>

<script setup>
import { defineAsyncComponent, onMounted, ref } from 'vue'
import { useDiagnosaGiziStore } from 'src/stores/simrs/ranap/diagnosagizi'

const ModalDiagnosaGizi = defineAsyncComponent(() => import('src/pages/simrs/ranap/layanan/diagnosaDanTindakan/diagnosagizi/comp/ModalDiagnosaGizi.vue'))

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
    default: null
  }
})

console.log(props?.pasien)

const store = useDiagnosaGiziStore()

// // const modalOpen = ref()
const groups = ref([])

// // function onSubmit() {
// //   console.log('save')
// // }

function lihatIntervensis (item) {
  const int = item?.intervensis

  const gr = int.length ? int.map(x => x.group) : []
  const unik = gr.length ? [...new Set(gr)] : []
  groups.value = unik
  // console.log('groups', groups.value)

  return unik
}

onMounted(() => {
  console.log('mounted diagnosa gizi', props.pasien)
  // if (!props.ulang)store.initReset()
  store.getData()
})

function lihatDiagnosa () {
  console.log('lihat', store.selectDiagnosa)
}

function simpan () {
  // console.log('simpan', store.form)

  store.simpanDiagnosadanIntervensi(props?.pasien)
  // console.log('simpan', )
}
</script>
