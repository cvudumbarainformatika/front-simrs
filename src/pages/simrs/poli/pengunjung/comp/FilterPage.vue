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
            :model="to"
            outlined
            label="dari tanggal"
            placeholder="tanggal"
            class="q-mb-sm"
            @set-model="(val)=> to=val"
          />
          <app-input-date
            :model="from"
            outlined
            label="sampai tanggal"
            placeholder="tanggal"
            class="q-mb-sm"
            @set-model="(val)=> from=val"
          />
        </div>
        <q-separator class="q-my-md" />
        <div>
          <div class="text-weight-bold f-12 q-mb-sm text-right">
            Status Pasien
          </div>
          <q-select
            v-model="txt"
            dense
            outlined
            :options="txts"
            label="status pasien"
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
              Cari Pasien By Nip, Noka, Norm Atau Nama
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
import { ref } from 'vue'

const emits = defineEmits(['close', 'setTo', 'setFrom', 'filterData'])

const to = ref(dateDbFormat(new Date()))
const from = ref(dateDbFormat(new Date()))
const txt = ref('BELUM TERLAYANI')
const txts = ref(['SEMUA', 'TERLAYANI', 'BELUM TERLAYANI'])
const q = ref('')

function sendData () {
  const params = {
    q: q.value,
    to: to.value,
    from: from.value,
    status: gantiStatus(txt.value)
  }

  emits('filterData', params)
}

function resetFilter () {
  to.value = dateDbFormat(new Date())
  from.value = dateDbFormat(new Date())
  txt.value = 'BELUM TERLAYANI'
  q.value = ''
}

function gantiStatus (val) {
  if (val === 'BELUM TERLAYANI') {
    return ''
  }
  else if (val === 'TERLAYANI') {
    return '1'
  }
  else {
    return 'all'
  }
}
</script>
