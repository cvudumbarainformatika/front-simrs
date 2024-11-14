<template>
  <div class="column full-height">
    <div class="col-auto text-white">
      <div class="row justify-between bg-grey-2 q-py-xs q-px-sm">
        <q-input
          v-model="search"
          label="Cari Diagnosa..."
          dense
          standout="bg-yellow-3"
          outlined
          color="primary"
          style="width: 40%;"
        >
          <template #prepend>
            <q-icon name="icon-mat-search" />
          </template>
        </q-input>
      </div>
    </div>
    <div class="col full-height bg-white">
      <q-scroll-area style="height:calc(100% - 1px);">
        <q-list
          bordered
          separator
          dense
        >
          <q-item
            v-for="item in filterred"
            :key="item"
            v-ripple
            tag="label"
          >
            <q-item-section avatar>
              <q-checkbox
                v-model="store.selectDiagnosa"
                :val="item"
                color="teal"
                size="sm"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label><b>{{ item?.kode }}</b> - {{ item?.nama }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>

        <!-- {{ diagnosas }} -->
      </q-scroll-area>
    </div>
  </div>
</template>

<script setup>
import { useDiagnosaKeperawatan } from 'src/stores/simrs/pelayanan/poli/diagnosakeperawatan'
import { computed, ref } from 'vue'

const store = useDiagnosaKeperawatan()

const search = ref('')
// const props = defineProps({
//   masters: {
//     type: Array,
//     default: () => []
//   }
// })
// const emits = defineEmits(['ok'])

const filterred = computed(() => {
  const arr = store.diagnosas

  const val = search.value
  let target = arr
  if (val !== '' || val !== null) {
    target = arr?.filter(x => {
      return x?.nama?.toString().toLowerCase().includes(val.toLowerCase()) || x?.kode?.toString().toLowerCase().includes(val.toLowerCase())
    })
  }

  return target
})
// function submit () {
//   pilihDiagnosa()
//   emits('ok')
// }

// function pilihDiagnosa () {
//   const val = store.selectDiagnosa
//   const arr = val.length ? val.map(x => x.kode) : []
//   const implode = arr.length ? arr.join('||') : ''
//   console.log('pilih', val)
//   store.setDiagnosa(implode, val)
//   // insertList(val)
// }

</script>
