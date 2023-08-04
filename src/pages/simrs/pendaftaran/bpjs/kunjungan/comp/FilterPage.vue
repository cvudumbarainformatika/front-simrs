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
        color="pink"
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
            @set-model="(val)=> emits('setTo', val)"
          />
          <app-input-date
            :model="from"
            outlined
            label="sampai tanggal"
            placeholder="tanggal"
            class="q-mb-sm"
            @set-model="(val)=> emits('setFrom', val)"
          />
        </div>
        <q-separator class="q-my-md" />
        <div>
          <div class="text-weight-bold f-12 q-mb-sm text-right">
            Status Pasien
          </div>
          <app-input label="" />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { dateDbFormat } from 'src/modules/formatter'

const emits = defineEmits(['close', 'setTo', 'setFrom'])

defineProps({
  to: {
    type: String,
    default: dateDbFormat(new Date())
  },
  from: {
    type: String,
    default: dateDbFormat(new Date())
  }
})
</script>
