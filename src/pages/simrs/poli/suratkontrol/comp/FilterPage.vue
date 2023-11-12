<template>
  <q-dialog
    position="right"
  >
    <q-card
      style="width: 350px"
      class="full-height"
    >
      <q-linear-progress
        :value="0.6"
        color="primary"
      />

      <q-card-section class="row items-center no-wrap">
        <div class="f-14 text-weight-bold">
          Filter Data
        </div>
        <q-space />
        <div>
          <q-btn
            flat
            round
            icon="icon-mat-close"
            @click="emits('close')"
          >
            <q-tooltip
              class="primary"
              :offset="[10, 10]"
            >
              Tutup
            </q-tooltip>
          </q-btn>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div>
          <div class="text-weight-bold f-12 q-mb-sm text-right">
            Periode Tanggal
          </div>
          <app-input-date
            :model="from"
            outlined
            label="dari tanggal"
            placeholder="tanggal"
            class="q-mb-sm"
            @set-model="(val)=> from=val"
          />
          <app-input-date
            :model="to"
            outlined
            label="sampai tanggal"
            placeholder="tanggal"
            class="q-mb-sm"
            @set-model="(val)=> to=val"
          />
        </div>
        <q-separator class="q-my-md" />
        <div>
          <div class="text-weight-bold f-12 q-mb-sm text-right">
            Filter Tanggal
          </div>
          <q-select
            v-model="txt"
            dense
            outlined
            :options="txts"
            label="Pilih filter"
            class="q-ml-sm"
            emit-value
            map-options
          />
        </div>
        <q-separator class="q-my-md" />
        <div>
          <div class="f-12 q-mb-sm text-right">
            <div class="text-weight-bold ">
              Pasien By
            </div>
            <div class="">
              Cari Nama
            </div>
          </div>
          <q-input
            v-model="q"
            outlined
            dense
            placeholder="Cari Pasien ..."
          />
        </div>
        <q-separator class="q-my-md" />
        <div class="row q-col-gutter-sm">
          <div class="col">
            <app-btn
              class="full-width"
              label="Cari Data"
              @click="sendData"
            />
          </div>
          <div class="col">
            <app-btn
              class="full-width"
              label="Reset"
              color="negative"
              @click="resetFilter"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { dateDbFormat } from 'src/modules/formatter'
import { ref, computed } from 'vue'

const emits = defineEmits(['close', 'setTo', 'setFrom', 'filterData', 'setSearch'])

const to = ref(dateDbFormat(new Date()))
const from = ref(dateDbFormat(new Date()))
const txt = ref('Tanggal Rencana Kontrol')
const txts = ref(['Tanggal Entri', 'Tanggal Rencana Kontrol'])
const props = defineProps({

  search: {
    type: String,
    default: ''
  }
})

const q = computed({
  get() {
    return props.search
  },
  set(newVal) {
    emits('setSearch', newVal)
  }
})
function sendData() {
  const params = {
    q: q.value,
    to: to.value,
    from: from.value,
    status: gantiStatus(txt.value)
  }

  emits('filterData', params)
}

function resetFilter() {
  to.value = dateDbFormat(new Date())
  from.value = dateDbFormat(new Date())
  txt.value = 'Tanggal Rencana Kontrol'
  q.value = ''
}

function gantiStatus(val) {
  if (val === 'Tanggal Rencana Kontrol') {
    return '2'
  } else if (val === 'Tanggal Entri') {
    return '1'
  } else {
    return '2'
  }
}
</script>
