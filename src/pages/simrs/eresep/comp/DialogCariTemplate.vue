<template>
  <q-dialog position="top" backdrop-filter="blur(4px)">
    <q-card style="min-width: 40vw;">
      <q-card-section>
        <div class="text-h6">
          Pencarian Template
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-select
          ref="refTemplate"
          v-model="store.cariTemplate"
          outlined
          dense
          use-input
          fill-input
          hide-selected
          input-debounce="100"
          :options="options"
          @filter="filterFn"
          placeholder="Min 2 character untuk pencarian template"
          option-label="nama"
          option-value="id"
          autocomplete="nama"
          autofocus
          class="full-width"
          hide-bottom-space
          hide-dropdown-icon
          no-error-icon
          @update:model-value="templateSelected"
        >
          <!-- @update:model-value="obatSelected"
          @keyup.enter.stop="emits('enter')"
          @focus="focused()"
          @blur="showTooltip = false"
          @input-value="inputCari" -->
          <template #prepend>
            <q-icon name="icon-mat-search" />
          </template>
          <template #option="scope">
            <q-item v-bind="scope.itemProps" class="column">
              <div
                class="q-my-xs"
              >
                <!-- <span v-html="highlightText(scope.opt?.nama)" /> -->
                <span>{{ scope.opt?.nama }}</span>
              </div>
            </q-item>

            <q-separator />
          </template>
          <template #no-option>
            <q-item>
              <q-item-section class="text-grey">
                No results
              </q-item-section>
            </q-item>
          </template>

          <!-- <q-tooltip v-model="showTooltip" anchor="center right" self="center left" :offset="[10, 10]">
      <div class="bg-primary text-white q-pa-md">
        <div><strong>Informasi Pencarian OBAT</strong></div>
        <div><em>pemilihan obat untuk <strong>TEMPLATE</strong> tidak berdasarkan <strong>ALOKASI STOK</strong></em></div>
        <div><em>Minimal 3 karakter untuk pencarian OBAT</em></div>
      </div>
    </q-tooltip> -->
          <!-- <app-tooltip v-model="showTooltip" no-parent-event arrow="left" anchor="center right" self="center left">
            <div><strong>Informasi Pencarian OBAT</strong></div>
            <div><em>pemilihan obat untuk <strong>TEMPLATE</strong> tidak berdasarkan <strong>ALOKASI STOK</strong></em></div>
          </app-tooltip> -->
        </q-select>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="TUTUP / BATAL" color="dark" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { api } from 'src/boot/axios'
import { notifErrVue } from 'src/modules/utils'
import { useTemplateEResepStore } from 'src/stores/simrs/farmasi/permintaanresep/templateeresep'
import { ref } from 'vue'

const store = useTemplateEResepStore()

const refTemplate = ref(null)
const options = ref([])

const props = defineProps({
  depo: {
    type: String,
    default: ''
  }
})

const emits = defineEmits(['close'])

async function filterFn (val, update, abort) {
  if (val.length < 2) {
    store.selectTemplate(null)
    abort()
    return
  }

  const depo = store.depos.filter(pa => pa.jenis === props.depo)
  // console.log('depo', store?.depo, depo)
  if (depo.length) {
    store.dpPar = depo[0]?.value
  }
  else return notifErrVue('depo tujuan tidak ditemukan')

  const param = {
    kodedepo: store.dpPar,
    q: val
  }

  const params = { params: param }

  const resp = await api.get('v1/simrs/penunjang/farmasinew/templateeresep/gettemplate', params)
  // console.log('resp', resp)
  const data = resp.data ?? []

  update(() => {
    // const needle = val?.toLowerCase()
    // options.value = data.length ? data?.filter(v => v?.namaobat.toLowerCase().indexOf(needle) > -1) : []
    options.value = data
  })
}

const templateSelected = (val) => {
  // console.log('templateSelected', val)
  store.selectTemplate(val)
  emits('close')
}
</script>
