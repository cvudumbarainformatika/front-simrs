<template>
  <div class="column">
    <div class="row justify-between items-center q-pa-sm bg-primary text-white">
      <div class="kiri row q-gutter-sm items-center">
        <q-input
          v-model="search"
          outlined
          dark
          color="white"
          dense
          :label="labelCari"
          debounce="500"
          style="min-width: 250px;"
          @keyup.enter="enterSearch"
        >
          <template
            v-if="props?.search"
            #append
          >
            <q-icon
              name="icon-mat-close"
              size="xs"
              class="cursor-pointer"
              @click.stop.prevent="enterSearch('')"
            />
          </template>
          <template #prepend>
            <q-icon
              size="sm"
              name="icon-mat-search"
            />
          </template>
        </q-input>
        <!-- <q-select
          v-model="periode"
          dense
          outlined
          dark
          color="white"
          :options="periods"
          label="Periode"
          class="q-ml-sm"
          emit-value
          map-options
          style="min-width: 150px;"
          @update:model-value="gantiPeriode"
        />
        <q-option-group
          v-model="toFlag"
          :options="flagOptions"
          color="primary"
          class="q-ml-sm"
          dense
          type="checkbox"
          inline
        /> -->
      </div>
      <div class="kanan">
        <!-- refresh Ids -->
        <q-btn
          v-if="props.adaRefresh"
          unelevated
          round
          size="sm"
          icon="icon-mat-refresh"
          @click="emits('refresh')"
        >
          <q-tooltip
            class="primary"
            :offset="[10, 10]"
          >
            Refresh Table
          </q-tooltip>
        </q-btn>
        <!-- per page -->
        <q-btn
          v-if="props.adaPerPage"
          class="q-ml-sm"
          unelevated
          color="orange"
          round
          size="sm"
          icon="icon-mat-layers"
        >
          <q-tooltip
            class="primary"
            :offset="[10, 10]"
          >
            Filter Table
          </q-tooltip>
          <q-menu
            transition-show="flip-left"
            transition-hide="flip-right"
            class="q-pt-sm"
            anchor="top left"
            self="top right"
          >
            <q-list>
              <q-item
                v-for="(opt, i) in options"
                :key="i"
                v-ripple
                tag="label"
              >
                <q-item-section>
                  <q-radio
                    v-model="selectPerPage"
                    size="xs"
                    :val="opt"
                    :label="opt + ' Baris'"
                    color="primary"
                  />
                </q-item-section>
                <q-item-label />
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
        <!-- style -->
        <q-btn
          v-if="useFull"
          flat
          :icon="!style.componentfull ? 'icon-mat-open_in_full' : 'icon-mat-close_fullscreen'"
          round
          :color="style.componentfull ? 'green' : 'white'"
          size="12px"
          class="q-ml-md"
          @click="style.setComponentFull"
        >
          <q-tooltip
            class="primary"
            :offset="[10, 10]"
          >
            Full Screen
          </q-tooltip>
        </q-btn>
      </div>
    </div>
    <!-- <div
      v-if="checked"
      class="row q-my-xs items-center "
    >
      <div class="col-6">
        <div
          v-if="!!nomor"
          class="row items-center"
        >
          <div class="col">
            Nomor pemakaian : {{ nomor }}
          </div>
          <div class="col q-ml-sm">
            <q-btn
              push
              label="Selesai "
              no-caps
              dense
              color="green"
              icon="icon-mat-done_all"
              @click="emits('selesai')"
            >
              <q-tooltip
                class="primary"
                :offset="[10, 10]"
              >
                Selesai
              </q-tooltip>
            </q-btn>
          </div>
        </div>
      </div>
      <div class="col-6 text-right">
        <q-btn
          push
          label="Simpan "
          no-caps
          dense
          color="primary"
          icon="icon-mat-save"
          class="q-mr-md"
          @click="emits('simpan')"
        >
          <q-tooltip
            class="primary"
            :offset="[10, 10]"
          >
            Simpan
          </q-tooltip>
        </q-btn>
      </div>
    </div> -->
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useStyledStore } from 'src/stores/app/styled'
// import { dateDbFormat } from 'src/modules/formatter'
// import { date } from 'quasar'

const style = useStyledStore()
const emits = defineEmits(['cari', 'refresh', 'setPerPage', 'setFlag', 'setPeriode', 'selesai', 'simpan'])
const props = defineProps({
  search: { type: String, default: '' },
  labelCari: { type: String, default: 'Cari ...' },
  nomor: { type: String, default: '' },
  adaPerPage: { type: Boolean, default: false },
  adaRefresh: { type: Boolean, default: false },
  useFull: { type: Boolean, default: false },
  perPage: { type: Number, default: 5 },
  flag: { type: Array, default: () => ['1'] },
  items: { type: Array, default: () => [] }
})

function enterSearch(evt) {
  const val = evt?.target?.value
  emits('cari', val)
}
const options = ref([5, 10, 20, 50, 100])

const selectPerPage = computed({
  get () {
    return props.perPage
  },
  set (val) {
    emits('setPerPage', val)
  }
})
const search = computed({
  get () {
    return props.search
  },
  set (newVal) {
    emits('cari', newVal)
  }
})
// eslint-disable-next-line no-unused-vars
const checked = computed(() => {
  const ada = props.items.filter(a => a.checked === true)
  if (ada.length) return true
  else return false
})
onMounted(() => {
  // hariIni()
})
</script>
