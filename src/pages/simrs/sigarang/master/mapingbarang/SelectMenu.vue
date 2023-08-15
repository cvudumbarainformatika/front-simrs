<template>
  <q-select v-model="model" dense borderless use-input option-value="id" :option-label="optionLabel"
    :label="'Cari ' + props.title" :options="options" behavior="menu" hide-dropdown-icon @filter="filterOptions"
    @update:model-value="selected">
    <template v-if="model" #append>
      <q-icon name="icon-mat-close" class="cursor-pointer" @click.stop.prevent="model = null" />
    </template>
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
        <q-item-section v-if="scope.opt.uraian">
          <q-item-label>
            <div class="row">
              <div class="col">
                {{scope.opt.kode}}
              </div>
              <div class="col">
                {{scope.opt.uraian}}
              </div>
            </div>
          </q-item-label>
        </q-item-section>
        <q-item-section v-if="scope.opt.nama">
          <q-item-label>
            <div class="row">
              <div class="col">
                {{scope.opt.kode}}
              </div>
              <div class="col">
                {{scope.opt.nama}}
              </div>
            </div>
          </q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>
<script setup>
import { api } from 'src/boot/axios'
import { ref } from 'vue'
const emits = defineEmits(['on-select'])
const props = defineProps({
  title: { type: String, default: 'apa ?' },
  url: { type: String, default: 'tidak ada' },
  optionLabel: { type: [Object, Array, String], default: 'nama' }
})
const options = ref(null)
const model = ref(null)
const selected = val => {
  emits('on-select', val)
  console.log('on-select', val)
}
async function filterOptions (val, update) {
  console.log('filter options', val)
  if (!val) {
    update(() => {
      options.value = []
    })
    return
  }
  const params = {
    params: {
      q: val,
      order_by: 'created_at',
      sort: 'desc',
      per_page: 20
    }
  }
  const resp = await api.get(props.url, params)
  console.log(props.title, resp.data.data)
  update(
    () => (options.value = resp.data.data),
    ref => {
      if (val !== '' && ref.options.length) {
        ref.setOptionIndex(-1)
        ref.moveOptionSelection(1, true)
      }
    }
  )
}
</script>
