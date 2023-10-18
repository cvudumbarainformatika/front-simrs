<template>
  <q-card
    flat
    bordered
    class="full-height"
  >
    <div class="column full-height">
      <div class="col-auto bg-yellow-3">
        <div class="row items-center justify-between q-pa-sm">
          <q-option-group
            v-model="group"
            :options="options"
            color="primary"
            inline
            size="xs"
          />
          <div class="text-weight-bold f-16">
            {{ filterred?.length }}
          </div>
        </div>
      </div>
      <q-separator />
      <div class="col">
        <q-scroll-area style="height:calc( 100% - 1px)">
          <template v-if="loading">
            <q-list
              dense
              separator
            >
              <q-item
                v-for="n in 20"
                :key="n"
                v-ripple
                clickable
                active-class="bg-primary text-white"
              >
                <!-- :active="item === terselect" -->
                <q-item-section avatar>
                  <q-skeleton
                    type="QAvatar"
                    size="26px"
                  />
                  <!-- :color="item === terselect?'white':'primary'" -->
                </q-item-section>

                <q-item-section>
                  <q-skeleton
                    type="text"
                    width="120px"
                  />
                </q-item-section>
                <q-item-section side>
                  <q-skeleton
                    type="text"
                    width="20px"
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </template>
          <template v-else>
            <q-list
              separator
              dense
            >
              <q-item
                v-for="(item, i) in filterred"
                :key="i"
                v-ripple
                clickable
                active-class="bg-primary text-white"
                :active="item === terselect"
                @click="kirimKeForm(item)"
              >
                <!-- :active="item === terselect" -->
                <q-item-section avatar>
                  <q-icon
                    :color="item === terselect?'white':'primary'"
                    name="icon-mat-person"
                  />
                <!-- :color="item === terselect?'white':'primary'" -->
                </q-item-section>

                <q-item-section>
                  {{ item?.namadokter }}
                  <!-- || {{ item?.kodedokter }} -->
                </q-item-section>
                <q-item-section side>
                  <q-icon
                    name="icon-mat-arrow_forward"
                    size="xs"
                    :color="item === terselect?'white':'primary'"
                  />
                </q-item-section>
              </q-item>
              <q-separator />
            </q-list>
          </template>
        </q-scroll-area>
      </div>
    </div>
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
  },
  loading: {
    type: Boolean,
    default: false
  }
})

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

// console.log(props)
const filterred = computed(() => {
  const termapings = props?.termapings
  let arr = []
  if (group.value === 1) {
    arr = props?.lists.filter(x => !termapings.includes(x?.kodedokter?.toString()))
  } else if (group.value === 2) {
    arr = props?.lists.filter(x => termapings.includes(x?.kodedokter?.toString()))
  } else {
    arr = props?.lists
  }
  return arr
  // return props?.lists.filter(x => !termapings.includes(x?.kodedokter?.toString()))
})
const emits = defineEmits(['select'])

function kirimKeForm(val) {
  console.log(val)
  emits('select', val)
}

</script>
