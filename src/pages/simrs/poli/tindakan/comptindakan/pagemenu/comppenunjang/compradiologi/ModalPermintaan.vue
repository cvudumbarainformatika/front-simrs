<template>
  <q-dialog @before-show="lihatList">
    <q-card style="min-width: 50vw;">
      <q-card-section class="q-pa-sm bg-primary text-white">
        <div class="row justify-between">
          <div class="text-h6">
            Daftar Pemeriksaan
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
      </q-card-section>

      <q-separator />

      <q-card-section
        style="height: 65vh"
        class="q-pa-none scroll"
      >
        <div class="row full-height">
          <div class="col-5 full-height bg-dark text-white scroll">
            <q-list
              separator
              dense
              dark
            >
              <!-- <q-item-label header>
                Group Pemeriksaan
              </q-item-label> -->
              <q-item
                v-for="(row, n) in gruping"
                :key="n"
                v-ripple
                tag="label"
                clickable
              >
                <q-item-section avatar>
                  <q-radio
                    v-model="shape"
                    :val="row"
                    color="teal"
                    size="xs"
                    dark
                    @update:model-value="pilihPemeriksaan"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ row }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <div class="col-7 full-height">
            <div class="column full-height">
              <div class="col-auto bg-grey-2">
                <div class="row items-center q-pa-sm q-gutter-md">
                  <div>
                    <q-input
                      v-model="search"
                      outlined
                      standout="bg-yellow-3"
                      label="cari Pemeriksaan"
                      dense
                      class="full-width"
                      debounce="500"
                      @update:model-value="cariPemeriksaan"
                    >
                      <template #prepend>
                        <q-icon name="icon-mat-search" />
                      </template>
                      <template
                        #append
                      >
                        <q-icon
                          name="icon-mat-close"
                          class="cursor-pointer"
                          @click.stop.prevent="clearPemeriksaan"
                        />
                      </template>
                    </q-input>
                  </div>
                  <q-space />
                  <div>
                    <q-checkbox
                      v-model="checkAll"
                      label="Pilih Semua"
                      color="teal"
                      left-label
                      @update:model-value="checkingAll"
                    />
                  </div>
                </div>
                <q-separator />
              </div>
              <div class="col full-height scroll">
                <q-list
                  v-if="filterredLists.length"
                  separator
                  dense
                >
                  <q-item
                    v-for="(item, i) in filterredLists"
                    :key="i"
                    v-ripple
                    tag="label"
                  >
                    <q-item-section avatar>
                      <q-checkbox
                        v-model="pemeriksaans"
                        :val="item"
                        color="teal"
                      />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>
                        {{ item.nama }}
                        <em class="text-negative f-10 q-ml-sm"> - ({{ item.group }})</em>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-separator />
                </q-list>
                <div
                  v-else
                  class="column flex-center full-height"
                >
                  <div>Tidak ditemukan</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions
        align="right"
        class="bg-yellow-3"
      >
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
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { useGroupBy } from 'src/composable/groupby'

const { setGroup } = useGroupBy()
const props = defineProps({
  lists: {
    type: Array,
    default: () => []
  }
})

const emits = defineEmits(['ok'])

const pemeriksaans = ref([])
const shape = ref('SEMUA PEMERIKSAAN')
const gruping = ref([])
const search = ref('')
const checkAll = ref(false)

const filterredLists = ref([])

function lihatList() {
  const arr = props.lists
  const mapping = mapper(arr)

  const gr = setGroup(mapping, x => x.group)
  const sorting = gr.sort(function (a, b) {
    if (a.name < b.name) {
      return -1
    }
    if (a.name > b.name) {
      return 1
    }
    return 0
  })
  // console.log(sorting)
  filterredLists.value = mapping
  gruping.value = sorting?.map(x => x.name)
  gruping.value.splice(0, 0, 'SEMUA PEMERIKSAAN')
  shape.value = 'SEMUA PEMERIKSAAN'
  checkAll.value = false
  search.value = ''
  pemeriksaans.value = []
}

function mapper(arr) {
  return arr?.length ? arr?.map(x => {
    const obj = {
      group: x?.rs3,
      nama: x?.rs2,
      val: x?.rs2 + ' ' + `(${x?.rs3}).`,
      kode: x?.rs1
    }
    return obj
  }) : []
}

function clearPemeriksaan() {
  checkAll.value = false
  pemeriksaans.value = []
  search.value = ''
  pilihPemeriksaan(shape.value)
}

function cariPemeriksaan(val) {
  console.log(val.toLowerCase())
  checkAll.value = false
  pemeriksaans.value = []
  if (val === '' || val === null) {
    pilihPemeriksaan(shape.value)
  } else {
    const arr = mapper(props.lists)
    const target = arr?.filter(x => {
      if (shape.value === 'SEMUA PEMERIKSAAN') {
        return x.nama.toString().toLowerCase().includes(val.toLowerCase())
      } else {
        return x.nama.toString().toLowerCase().includes(val.toLowerCase()) && x.group.toString().toLowerCase().includes(shape.value.toLowerCase())
      }
    })
    filterredLists.value = target
  }
}

function checkingAll() {
  if (checkAll.value) {
    pemeriksaans.value = filterredLists.value.map(x => x)
  } else {
    pemeriksaans.value = []
  }
}

function pilihPemeriksaan(val) {
  checkAll.value = false
  pemeriksaans.value = []
  if (val === '' || val === null || val === 'SEMUA PEMERIKSAAN') {
    filterredLists.value = mapper(props.lists)
  } else {
    const arr = mapper(props.lists)
    const target = arr?.filter(x => x.group.toString().toLowerCase().includes(val.toLowerCase()))
    filterredLists.value = target
  }
}

function submitPemeriksaans() {
  emits('ok', pemeriksaans.value)
}
</script>
