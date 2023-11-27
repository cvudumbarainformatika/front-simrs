<template>
  <q-dialog @before-show="clearCheck">
    <q-card
      style="min-width: 90vw; height: 100vh;"
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
            >
              <q-item
                v-for="(item, i) in props.masters"
                :key="i"
                v-ripple
                tag="label"
                dense
                class="bg-primary"
              >
                <q-item-section
                  avatar
                  thumbnail
                >
                  <q-checkbox
                    v-if="item.name !== ''"
                    v-model="pemeriksaans"
                    :val="item"
                    color="black"
                    dark
                    size="xs"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label v-if="item.name !== ''">
                    {{ item.name }}
                  </q-item-label>
                  <q-item-label
                    v-else
                    style="padding-left:20px;"
                  >
                    NAMA PEMERIKSAAN
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  <div class="flex q-gutter-sm">
                    <div
                      style="width:100px"
                      class="text-right"
                    >
                      {{ item.name===''? 'NILAI NORMAL' : item[0].nilainormal }}
                    </div>
                    <div
                      style="width:100px"
                      class="text-right"
                    >
                      {{ item.name===''? 'SARANA' : item[0].hargasaranapolispesialis }}
                    </div>
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
          </q-scroll-area>
        </div>
        <div class="col-auto">
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
// import { formatRp } from 'src/modules/formatter'
// import { computed, ref } from 'vue'
import { ref } from 'vue'

const props = defineProps({
  masters: {
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

// const filterred = computed(() => {
//   let arr = props?.masters
//   if (group.value === 'paket') {
//     arr = arr?.filter(x => x.value?.length > 1)
//   } else if (group.value === 'non-paket') {
//     arr = arr?.filter(x => x.value?.length < 2)
//   } else {
//     arr = props?.masters
//   }

//   const val = search.value
//   let target = arr
//   if (val !== '' || val !== null) {
//     target = arr?.filter(x => {
//       return x.name.toString().toLowerCase().includes(val.toLowerCase())
//     })
//   }

//   return target
// })

function submitPemeriksaans() {
  // console.log(pemeriksaans.value)
  emits('ok', pemeriksaans.value)
}

function clearCheck() {
  pemeriksaans.value = []
}

</script>
