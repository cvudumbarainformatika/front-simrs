<template>
  <q-dialog
    position="top"
    class="q-mt-xl"
    @hide="hiddenDialog()"
    backdrop-filter="blur(4px)"
  >
    <q-card style="min-width:50vw;">
      <q-card-section class="row items-center">
        <div class="column">
          <div class="f-14 text-weight-bold">
            CARI DATA PASIEN
          </div>
          <div class="f-10">
            Pencarian Pasien Berdasarkan NIK, NORM, NOKA & NAMA
          </div>
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
      <q-separator />
      <q-card-section>
        <q-select
          ref="refAutocomplete"
          label="Cari Pasien"
          v-model="search"
          outlined
          dense
          use-input
          hide-selected
          fill-input
          input-debounce="200"
          :options="options"
          @filter="filterFn"
          placeholder="Min 2 character untuk pencarian pasien"
          :option-label="opt => Object(opt) === opt && 'icd' in opt ? opt.icd + ' - ' + opt.keterangan : '- Null -'"
          option-value="icd"
          autocomplete="keterangan"
          autofocus
          class="full-width"
          hide-bottom-space
          hide-dropdown-icon
          no-error-icon
          @update:model-value="obatSelected"
        >
          <template #prepend>
            <q-icon name="icon-mat-search" />
          </template>
          <template #option="scope">
            <q-item v-bind="scope.itemProps" class="row items-end">
              <div> {{ scope.opt?.icd + ' - '+scope.opt?.keterangan }}</div>
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
        </q-select>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { api } from 'src/boot/axios'
import { ref } from 'vue'

const search = ref(null)
const options = ref([])

function hiddenDialog () {
  console.log('hidden dialog')
}

async function filterFn (val, update) {
  if (val.length < 2) {
    update(() => {
      options.value = []
    })
    return
  }

  const resp = await api.get()
  console.log('filter', resp)

  update(() => {
    const needle = val
    options.value = search.value
      ? options.value.filter(v => v.keterangan.toLowerCase().indexOf(needle.toLowerCase()) > -1)
      : options.value
  })
}
</script>
