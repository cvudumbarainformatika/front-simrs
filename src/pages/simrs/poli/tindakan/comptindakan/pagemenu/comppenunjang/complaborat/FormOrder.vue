<template>
  <div class="column full-height">
    <q-bar class="col-auto bg-dark text-white">
      <div class="q-py-sm f-14 ">
        Form Order Laborat
      </div>
    </q-bar>
    <div class="col full-height">
      <div class="row q-pa-md">
        <div class="col-12">
          <q-select
            v-model="store.caripemeriksaanlab"
            dense
            outlined
            use-input
            :option-value="obj => obj"
            option-label="name"
            label="Cari Pemeriksaan"
            :options="optNonPaket"
            behavior="menu"
            hide-dropdown-icon
            style="width:100%"
            @filter="filterNonPaket"
            @update:model-value="val => insertList(val)"
          >
            <template
              v-if="searchNonPaket"
              #append
            >
              <q-icon
                name="icon-mat-cancel"
                size="xs"
                class="cursor-pointer"
                @click.stop.prevent="searchNonPaket = null"
              />
            </template>
            <template #no-option>
              <q-item>
                <q-item-section class="text-grey">
                  Data tidak ditemukan
                </q-item-section>
              </q-item>
            </template>
            <template #option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section>
                  <q-item-label>
                    {{ scope.opt.name }}
                    -  <span class="text-italic text-negative">Biaya: Rp. {{ formatRp(scope.opt.value[0].biaya) }}</span>
                  </q-item-label>
                  <q-item-label :class="scope.opt.value[0].jenis === 'NON-PAKET' ? 'text-grey-5' : ''">
                    <strong>  {{ scope.opt.value[0].jenis }} </strong>
                    <span
                      v-if="scope.opt.value[0].jenis === 'NON-PAKET'"
                      class="text-primary"
                    >  - {{ scope.opt.value[0].kode }} </span>
                  </q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { usePenunjangPoli } from 'src/stores/simrs/pelayanan/poli/penunjang'

const store = usePenunjangPoli()
console.log('store', store)
</script>
