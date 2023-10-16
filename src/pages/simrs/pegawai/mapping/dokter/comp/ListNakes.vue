<template>
  <q-card
    flat
    bordered
  >
    <q-card-section class="q-pa-none">
      <q-input
        v-model="search"
        label="Cari Nakes"
        dense
        outlined
        standout="bg-yellow-3"
      />
      <div class="column  bg-yellow-3">
        <!-- <div class="q-pa-sm">
          Data Mapping Nakes
        </div> -->
        <div class="row items-center justify-between">
          <q-option-group
            v-model="group"
            :options="options"
            color="primary"
            inline
          />
          <div class="q-px-md q-py-sm">
            <div class="text-subtitle1 text-weight-bold">
              {{ filterred.length }}
            </div>
          </div>
        </div>
      </div>
      <div class="row items-center justify-between bg-primary text-white">
        <q-option-group
          v-model="group2"
          :options="options2"
          color="white"
          inline
          dark
        />
        <div class="q-px-md q-py-sm">
          <div class="text-subtitle1 text-weight-bold">
            {{ filterred.length }}
          </div>
        </div>
      </div>
      <q-separator />
      <q-scroll-area
        v-if="props?.lists?.length"
        style="height:600px"
      >
        <q-list

          dense
          separator
        >
          <q-item
            v-for="(item, i) in filterred"
            :key="i"
            v-ripple
            clickable
            :active="item === terselect"
            active-class="bg-primary text-white"
            @click="kirimKeForm(item)"
          >
            <q-item-section avatar>
              <q-icon
                :color="item === terselect?'white':'primary'"
                name="icon-mat-person"
              />
            </q-item-section>

            <q-item-section>{{ item?.nama }}</q-item-section>
            <q-item-section side>
              <q-icon
                name="icon-mat-arrow_forward"
                size="xs"
                :color="item === terselect?'white':'primary'"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <div
        v-else
        class="column full-height flex-center"
        style="height:400px"
      >
        Data Belum Ada
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  lists: {
    type: Array,
    default: () => []
  },
  termapings: {
    type: Array,
    default: () => []
  },
  terselect: {
    type: Object,
    default: null
  }
})

const emits = defineEmits(['select'])

function kirimKeForm(val) {
  // console.log(val)
  emits('select', val)
}

const search = ref('')
const group = ref(1)
const group2 = ref('1')
const options = ref(
  [
    {
      label: 'Belum ter mapping',
      value: 1
    },
    {
      label: 'Sudah ter mapping',
      value: 2
    },
    {
      label: 'Semua',
      value: 3
    }
  ]
)
const options2 = ref(
  [
    {
      label: 'Dokter',
      value: '1'
    },
    {
      label: 'Perawat',
      value: '2'
    },
    {
      label: 'Bidan',
      value: '3'
    }
  ]
)

const filterred = computed(() => {
  const termapings = props?.termapings
  let arr = []
  if (group.value === 1) {
    arr = props?.lists.filter(x => !termapings.includes(x.kode))
  } else if (group.value === 2) {
    arr = props?.lists.filter(x => termapings.includes(x.kode))
  } else {
    arr = props?.lists
  }

  const needle = search.value.toLowerCase()
  // const splits = ['kdgroupnakes', 'nama']
  // const multiFilter = (data = [], filterKeys = [], value = '') =>
  //   data.filter((item) =>
  //     filterKeys.some(
  //       (key) =>
  //         item[key].toString().toLowerCase().includes(value.toLowerCase()) &&
  //               item[key]
  //     )
  //   )
  // const filteredData = multiFilter(arr, splits, needle)

  return arr?.filter(a => a.kdgroupnakes === group2.value && a.nama.toString().toLowerCase().includes(needle))
  // return filteredData
})

console.log('filter', filterred.value)
</script>
