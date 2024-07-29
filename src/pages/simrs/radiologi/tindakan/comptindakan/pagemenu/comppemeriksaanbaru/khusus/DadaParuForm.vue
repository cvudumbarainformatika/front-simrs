<template>
  <div
    class="row q-col-gutter-sm"
    style="margin-bottom: 40px;"
  >
    <div class="col-12 text-weight-bold">
      Pemeriksaan Dada & Paru (Specialistik)
      <q-separator class="q-my-xs" />
    </div>
    <div class="col-6">
      <div class="text-weight-bold">
        Inspeksi :
        <q-separator class="q-my-sm" />
      </div>
      <div>
        <q-option-group
          v-model="store.inspeksis"
          :options="inspeksiOptions"
          color="primary"
          size="sm"
          inline
          dense
          type="checkbox"
          @update:model-value="setInspeksi"
        />
      </div>
    </div>
    <div class="col-6">
      <div class="text-weight-bold">
        Palpasi :
        <q-separator class="q-my-sm" />
      </div>
      <div>
        <q-option-group
          v-model="store.palpasis"
          :options="palpasiOptions"
          color="primary"
          size="sm"
          inline
          dense
          type="checkbox"
          @update:model-value="setPalpasi"
        />
      </div>
    </div>
    <div
      class="col-12"
      style="margin-bottom: -5px;"
    >
      <q-separator class="q-my-xs" />
      <div class="text-weight-bold">
        Perkusi :
        <q-separator class="q-my-xs" />
      </div>
    </div>

    <div class="col-6">
      <div class="text-weight-bold">
        Dada Kanan :
        <q-separator class="q-my-sm" />
      </div>
      <div>
        <q-option-group
          v-model="store.perkusidadakanans"
          :options="kananOptions"
          color="primary"
          size="sm"
          inline
          dense
          type="checkbox"
          @update:model-value="setPerkusiDadaKanan"
        />
      </div>
    </div>
    <div class="col-6">
      <div class="text-weight-bold">
        Dada Kiri :
        <q-separator class="q-my-sm" />
      </div>
      <div>
        <q-option-group
          v-model="store.perkusidadakiris"
          :options="kananOptions"
          color="primary"
          size="sm"
          inline
          dense
          type="checkbox"
          @update:model-value="setPerkusiDadaKiri"
        />
      </div>
    </div>
    <div
      class="col-12"
      style="margin-bottom: -5px;"
    >
      <q-separator class="q-my-xs" />
      <div class="text-weight-bold">
        Auskultasi : <em class="text-weight-light">Suara Nafas Dasar</em>
        <q-separator class="q-my-xs" />
      </div>
      <div class="q-py-sm">
        <q-option-group
          v-model="store.auskultasisuaradasars"
          :options="auskultasiOptions"
          color="primary"
          size="sm"
          inline
          dense
          type="checkbox"
          @update:model-value="setAuskultasiDasar"
        />
      </div>
    </div>
    <div
      class="col-12"
      style="margin-bottom: -5px;"
    >
      <q-separator class="q-my-xs" />
      <div class="text-weight-bold">
        Auskultasi : <em class="text-weight-light">Suara Nafas Tambahan</em>
        <q-separator class="q-my-xs" />
      </div>
    </div>

    <div class="col-6">
      <div class="text-weight-bold">
        Dada Kanan :
        <q-separator class="q-my-xs" />
      </div>
      <div>
        <q-option-group
          v-model="store.auskultasisuaratambahankanans"
          :options="suaraTambahanOptions"
          color="primary"
          size="sm"
          inline
          dense
          type="checkbox"
          @update:model-value="setAuskultasiTambahanKanan"
        />
      </div>
    </div>
    <div class="col-6">
      <div class="text-weight-bold">
        Dada Kiri :
        <q-separator class="q-my-xs" />
      </div>
      <div>
        <q-option-group
          v-model="store.auskultasisuaratambahankiris"
          :options="suaraTambahanOptions"
          color="primary"
          size="sm"
          inline
          dense
          type="checkbox"
          @update:model-value="setAuskultasiTambahanKiri"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePemeriksaanFisik } from 'src/stores/simrs/pelayanan/poli/pemeriksaanfisik'
import { ref } from 'vue'

const store = usePemeriksaanFisik()

// const simetris = ref([])
const inspeksiOptions = ref([
  { label: 'Simetris', value: 'Simetris' },
  { label: 'Tidak Simetris', value: 'Tidak Simetris' }
])
// const palpasi = ref([])
const palpasiOptions = ref([
  { label: 'Fremitus Raba Normal', value: 'Fremitus Raba Normal' },
  { label: 'Fremitus Raba Meningkat', value: 'Fremitus Raba Meningkat' },
  { label: 'Fremitus Raba Menurun', value: 'Fremitus Raba Menurun' }
])
// const dadakanan = ref([])
// const dadakiri = ref([])
const kananOptions = ref([
  { label: 'Sonor', value: 'Sonor' },
  { label: 'Redup', value: 'Redup' },
  { label: 'Hipersonor', value: 'Hipersonor' }
])
// const auskultasi = ref([])
const auskultasiOptions = ref([
  { label: 'Vesikuler', value: 'Vesikuler' },
  { label: 'Bronkovesikuler', value: 'Bronkovesikuler' },
  { label: 'Bronkual', value: 'Bronkual' },
  { label: 'Trakeal', value: 'Trakeal' }
])
// const suaraTambahanKanan = ref([])
// const suaraTambahanKiri = ref([])
const suaraTambahanOptions = ref([
  { label: 'Pleural Friction Rub', value: 'Pleural Friction Rub' },
  { label: 'Whooping', value: 'Whooping' },
  { label: 'Wheezing', value: 'Wheezing' },
  { label: 'Crackles', value: 'Crackles' },
  { label: 'Stridor', value: 'Stridor' },
  { label: 'Rhonchi', value: 'Rhonchi' }
])

function setInspeksi() {
  const txt = store.inspeksis?.join('||')
  store.setFormVital('inspeksi', txt)
}
function setPalpasi() {
  const txt = store.palpasis?.join('||')
  store.setFormVital('palpasi', txt)
}
function setPerkusiDadaKanan() {
  const txt = store.perkusidadakanans.join('||')
  store.setFormVital('perkusidadakanan', txt)
}
function setPerkusiDadaKiri() {
  const txt = store.perkusidadakiris.join('||')
  store.setFormVital('perkusidadakiri', txt)
}
function setAuskultasiDasar() {
  const txt = store.auskultasisuaradasars.join('||')
  store.setFormVital('auskultasisuaradasar', txt)
}
function setAuskultasiTambahanKanan() {
  const txt = store.auskultasisuaratambahankanans.join('||')
  store.setFormVital('auskultasisuaratambahankanan', txt)
}
function setAuskultasiTambahanKiri() {
  const txt = store.auskultasisuaratambahankiris.join('||')
  store.setFormVital('auskultasisuaratambahankiri', txt)
}

// const updateSelectionPsikologis = (val) => {
//   console.log(val)
//   store.setFormVital('statuspsikologis', val.join(', '))
//   // console.log(store.formVital.statuspsikologis)
// }

</script>
