<template>
  <q-dialog @before-show="clearCheck">
    <q-card
      style="min-width: 70vw; height: 100vh;"
      class="full-height"
    >
      <div class="column full-height">
        <div class="col-auto text-white">
          <div class="row items-center justify-between bg-dark q-py-xs q-px-sm">
            <div class="f-20">
              Daftar Pemeriksaan Laborat
            </div>
            <q-btn
              v-close-popup
              icon="icon-mat-close"
              size="sm"
              padding="sm"
              flat
              rounded
            />
          </div>
          <div class="row justify-between bg-grey-2 q-py-xs q-px-sm">
            <q-input
              v-model="search"
              label="Cari Pemeriksaan..."
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
            <q-option-group
              v-model="group"
              :options="groups"
              color="primary"
              inline
              class="text-dark"
            />
          </div>
        </div>
        <div class="col full-height bg-dark text-white">
          <q-scroll-area style="height:calc(100% - 1px);">
            <q-list
              bordered
              separator
              dark
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
                    v-model="pemeriksaans"
                    :val="item"
                    color="teal"
                    dark
                    size="xs"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ item?.name }}</q-item-label>
                  <q-item-label caption>
                    <span :class="item?.value?.length > 1?'text-yellow':'text-red'">
                      {{ item?.value?.length > 1? 'PAKET' : 'NON PAKET' }}
                    </span>
                  </q-item-label>
                </q-item-section>
                <q-item-section
                  side
                >
                  <q-item-label caption>
                    Rp. {{ formatRp(item?.value[0].biayapolispesialis) }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-scroll-area>
        </div>
        <div
          class="col-auto"
        >
          <div class="row items-center justify-end q-pa-sm q-gutter-sm">
            <q-btn
              v-close-popup
              flat
              label="Batal"
              color="negative"
            />
            <q-btn
              flat
              label="Ok"
              color="primary"
              @click="submitPemeriksaans"
            />
          </div>
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { formatRp } from 'src/modules/formatter'
import { computed, ref } from 'vue'
// import { ref } from 'vue'

const props = defineProps({
  masters: {
    type: Array,
    default: () => []
  },
  headers: {
    type: Array,
    default: () => []
  }
})

const emits = defineEmits(['ok'])

const group = ref('semua')
const pemeriksaans = ref([])
const search = ref('')
const groups = ref([
  {
    label: 'Semua',
    value: 'semua'
  },
  {
    label: 'Paket',
    value: 'paket'
  },
  {
    label: 'Non Paket',
    value: 'non-paket'
  }
])

const filterred = computed(() => {
  let arr = props?.masters
  if (group.value === 'paket') {
    arr = arr?.filter(x => x.value?.length > 1)
  } else if (group.value === 'non-paket') {
    arr = arr?.filter(x => x.value?.length < 2)
  } else {
    arr = props?.masters
  }

  const val = search.value
  let target = arr
  if (val !== '' || val !== null) {
    target = arr?.filter(x => {
      return x.name.toString().toLowerCase().includes(val.toLowerCase())
    })
  }

  return target
})

function submitPemeriksaans() {
  // console.log(pemeriksaans.value)
  emits('ok', pemeriksaans.value)
}

function clearCheck() {
  pemeriksaans.value = []
}

</script>
