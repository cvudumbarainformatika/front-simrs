<template>
  <div class="container q-pl-sm q-pr-sm">
    <div class="q-card q-mt-sm q-mt-ms">
      <q-card class="q-pa-xs">
        <div class="row bg-black text-white q-pa-sm q-mb-xs q-mt-xs">
          <div class="f-14 text-weight-bold">
            Kontrak Pekerjaan | SIASIK
          </div>
        </div>
      </q-card>
    </div>

    <div class="q-card q-mt-sm q-mt-ms">
      <q-tabs
        v-model="tabdata"
        dense
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="forminput" label="Form Kontrak" />
        <q-tab name="data" label="Data Kontrak" />
      </q-tabs>
      <q-separator />
      <q-tab-panels v-model="tabdata" animated>
        <q-tab-panel name="forminput">
          <FormInputKP />
        </q-tab-panel>

        <q-tab-panel name="data">
          <div class="text-h6">
            Mails
          </div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>
      </q-tab-panels>

      <!-- <q-page
        class="q-pa-md"
        :class="style.componentfull?'container-no-header':'container--q-header q-pa-xs relative-position'"
      >
        <q-card
          flat
          no-shadow
          square
          class="my-flex-1 scroll hide-scroll"
          ref="refSaldoawal"
        >

          <TableSaldo />

        </q-card>
      </q-page> -->
    </div>

    <!-- <div class="q-card q-mt-sm">
      <app-card title="Transaksi Saldo Awal" desc="Pejabat Penatausahaan Keuangan">
        <template #content />
      </app-card>
    </div> -->
  </div>
</template>
<script setup>
import { ref } from 'vue'
import FormInputKP from './inpage/FormInputKP.vue'

const tabdata = ref('forminput')

</script>
