<template>
  <q-card
    flat
    bordered
  >
    <q-card-section class="q-pa-none">
      <div class="bg-yellow-3">
        <q-option-group
          v-model="group"
          :options="options"
          color="primary"
          inline
        />
      </div>
      <q-separator />
      <q-list
        v-if="props?.lists?.length"
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
            aa
          </q-item-section>
        </q-item>
      </q-list>

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

const group = ref(1)
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

const filterred = computed(() => {
  const termapings = props?.termapings
  if (group.value === 1) {
    return props?.lists.filter(x => !termapings.includes(x.kode))
  } else if (group.value === 2) {
    return props?.lists.filter(x => termapings.includes(x.kode))
  } else {
    return props?.lists
  }
})
</script>
