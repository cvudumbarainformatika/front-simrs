<template>
  <div class="q-pa-md text-weight-bold">
    FORM DIAGNOSA
    <div class="f-10 text-weight-light">
      <em>form Diagnosa sekaligus pensimulasian INACBG </em>
    </div>
  </div>
  <q-separator />
  <q-form
    class="row q-pa-md q-col-gutter-xs"
    @submit="onSubmit"
  >
    <!-- <div class="col-3">
      <div>Diagnosa (ICD)</div>
    </div> -->
    <div class="col-12 q-mb-sm">
      <q-select
        v-model="store.searchdiagnosa"
        use-input
        hide-selected
        fill-input
        outlined
        standout="bg-yellow-3"
        dense
        emit-value
        map-options
        option-value="kode"
        :option-label="opt => Object(opt) === opt && 'keterangan' in opt ? opt.kode +' ~ '+ opt.keterangan : '- Null -'"
        input-debounce="0"
        :options="options"
        label="Cari Diagnosa (ICD)"
        @filter="filterFn"
        @update:model-value="(val)=>store.setKode(val)"
      >
        <template #no-option>
          <q-item>
            <q-item-section class="text-grey">
              Tidak ditemukan
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>
    <div class="col-3">
      <div>Kode (ICD)</div>
    </div>
    <div class="col-9">
      <q-input
        v-model="store.formdiagnosa.kddiagnosa"
        placeholder="Kode (Automatis)"
        dense
        outlined
        standout="bg-yellow-3"
        :rules="[val => !!val || 'Harus diisi']"
        hide-bottom-space
        readonly
        style="max-width: 150px;"
      />
    </div>
    <div class="col-3">
      <div>Diagnosa</div>
    </div>
    <div class="col-9">
      <q-input
        v-model="store.formdiagnosa.diagnosa"
        placeholder="Diagnosa (Automatis)"
        outlined
        autogrow
        standout="bg-yellow-3"
        :rules="[val => !!val || 'Harus diisi']"
        hide-bottom-space
        readonly
      />
    </div>
    <div class="col-3">
      <div>Keterangan</div>
    </div>
    <div class="col-9">
      <q-input
        v-model="store.formdiagnosa.keterangan"
        autogrow
        outlined
        standout="bg-yellow-3"
        hide-bottom-space
      />
    </div>
    <div class="col-12">
      <q-separator class="q-my-sm" />
    </div>
    <div class="col-3">
      <div>Kasus Baru?</div>
    </div>
    <div class="col-9 q-gutter-sm">
      <q-radio
        v-model="store.formdiagnosa.kasus"
        dense
        val="Baru"
        label="Iya"
      />
      <q-radio
        v-model="store.formdiagnosa.kasus"
        dense
        val="Lama"
        label="Tidak"
      />
    </div>
    <div class="col-12">
      <q-separator class="q-my-sm" />
    </div>
    <div class="col-3">
      <div>Diagnosis Utama?</div>
    </div>
    <div class="col-9 q-gutter-sm">
      <q-radio
        v-model="store.formdiagnosa.tipediagnosa"
        dense
        val="Primer"
        label="Iya"
      />
      <q-radio
        v-model="store.formdiagnosa.tipediagnosa"
        dense
        val="Sekunder"
        label="Tidak"
      />
    </div>
    <div class="col-12">
      <q-separator class="q-my-lg" />
    </div>
    <div class="col-12">
      <q-btn
        label="Simpan Diagnosa"
        color="primary"
        type="submit"
      />
    </div>
  </q-form>
</template>

<script setup>
import { useLayananPoli } from 'src/stores/simrs/pelayanan/poli/layanan'
import { onMounted, ref } from 'vue'

const store = useLayananPoli()
const emits = defineEmits(['savePemeriksaan'])

function onSubmit() {
  emits('savePemeriksaan')
}

const options = ref([])

onMounted(() => {
  options.value = store.listDiagnosa
})

function filterFn(val, update, abort) {
  if (val.length < 1) {
    abort()
    return
  }

  update(() => {
    const needle = val.toLowerCase()
    const arr = store.listDiagnosa
    const filter = ['kode', 'keterangan']
    const multiFilter = (data = [], filterKeys = [], value = '') =>
      data.filter((item) => filterKeys.some(
        (key) =>
          item[key].toString().toLowerCase().includes(value.toLowerCase()) &&
            item[key]
      )
      )
    const filteredData = multiFilter(arr, filter, needle)
    options.value = filteredData
  })
}
</script>
