<template>
  <q-dialog
    persistent
    position="top"
    class="q-mt-lg"
  >
    <q-card
      dark
      style="min-width:360px"
    >
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">
          Cari Data Pasien
        </div>
        <q-space />
        <q-btn
          v-close-popup
          icon="icon-mat-clear"
          flat
          round
          dense
        />
      </q-card-section>
      <q-card-section class="row items-center q-pb-none">
        <div class="">
          <q-option-group
            v-model="jenispasien"
            :options="optionJenisPasiens"
            color="primary"
            keep-color
            inline
            @update:model-value="setJenisPasien"
          />
        </div>
        <q-space />
      </q-card-section>
      <q-separator class="q-my-xs" />
      <q-card-section>
        <q-select
          v-model="search"
          dark
          dense
          outlined
          label="Cari Data"
          use-input
          clearable
          option-value="id"
          option-label="nama"
          :options="options"
          behavior="menu"
          hide-dropdown-icon
          @filter="filterOptions"
          @update:model-value="(val)=>$emit('updated', val)"
        >
          <template #prepend>
            <q-icon name="icon-mat-search" />
          </template>
          <template #no-option>
            <q-item>
              <q-item-section class="text-grey">
                No results
              </q-item-section>
            </q-item>
          </template>
          <template #option="scope">
            <q-item v-bind="scope.itemProps">
              <!-- <q-item-section avatar>
                <q-avatar size="60px">
                  <img :src="getImage(scope.opt)">
                </q-avatar>
              </q-item-section> -->
              <q-item-section>
                <q-item-label>{{ scope.opt.nama }}</q-item-label>
                <q-item-label caption>
                  <strong>No Rm : </strong> {{ scope.opt.norm }}
                </q-item-label>
                <q-item-label caption>
                  <strong>Noreg : </strong> {{ scope.opt.noreg }}
                </q-item-label>
                <q-item-label caption>
                  <strong>KTP : </strong> {{ scope.opt.nktp }}
                </q-item-label>
                <q-item-label caption>
                  <strong>No Kartu BPJS : </strong> {{ scope.opt.noka }}
                </q-item-label>
                <q-item-label
                  v-if="scope.opt.poli"
                  caption
                >
                  <strong>Poli : </strong> {{ scope.opt.poli }}
                </q-item-label>
                <q-item-label
                  v-if="scope.opt.ruangan"
                  caption
                >
                  <strong>Ruangan : </strong> {{ scope.opt.ruangan }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { api } from 'src/boot/axios'
// import { useSettingsAplikasi } from 'src/stores/simrs/settings'
import { ref } from 'vue'

const emitss = defineEmits(['updated', 'jenis'])

const search = ref('')
const options = ref(null)
const optionJenisPasiens = ref([
  { label: 'Rawat Jalan', value: 'rjl' },
  { label: 'Rawat Inap', value: 'rnp' },
  { label: 'IGD', value: 'igd' }
])
const jenispasien = ref('rjl')

let url = '/v1/simrs/farmasinew/depo/caripasienpoli'
function setJenisPasien(val) {
  emitss('jenis', val)
  if (val === 'rjl') url = '/v1/simrs/farmasinew/depo/caripasienpoli'
  if (val === 'rnp') url = '/v1/simrs/farmasinew/depo/caripasienranap'
  if (val === 'igd') url = '/v1/simrs/farmasinew/depo/caripasienigd'
}
async function filterOptions (val, update) {
  if (!val) {
    update(() => {
      options.value = []
    })
    return
  }
  const param = {
    // params
    params: {
      q: val,
      nama: val,
      nik: val,
      norm: val,
      noreg: val,
      nosep: val,
      per_page: 50
    }
  }
  // console.log('q :', params)
  const resp = await api.get(url, param)
  console.log('cari', resp)
  update(
    () => (options.value = resp?.data?.data ?? resp?.data),
    ref => {
      if (val !== '' && ref.options.length) {
        ref.setOptionIndex(-1)
        ref.moveOptionSelection(1, true)
      }
    }
  )
}

</script>
