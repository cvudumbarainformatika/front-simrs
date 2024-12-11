<template>
  <template v-if="store.datarka.length > 0">
    <q-card-section class="full-width">
      <div class="row">
        <div class="full-width">
          <q-markup-table
            class="my-sticky-table"
            flat-bordered
            wrap-cells
            :separator="separator"
          >
            <thead>
              <tr class="bg-grey text-white max-width">
                <th>KODE REKENING</th>
                <th>URAIAN</th>
                <th>VOLUME</th>
                <th>SATUAN</th>
                <th>HARGA</th>
                <th>PAGU</th>
              </tr>
            </thead>
            <tbody>
              <tr class="vertical-top" v-for="it in store.datarka" :key="it">
                <td>
                  <div class="text-bold">
                    {{ it.kode }}
                  </div>
                  <div class="q-pl-md q-py-md" v-for="rinci in it?.rincian" :key="rinci">
                    {{ rinci.kode108 }}
                  </div>
                </td>
                <td>
                  <div class="text-bold">
                    {{ it.uraian }}
                  </div>
                  <div class="q-pl-md q-py-md" v-for="rinci in it?.rincian" :key="rinci">
                    - {{ rinci.usulan }}
                  </div>
                </td>
                <td class="text-right">
                  <div class="q-py-sm" />
                  <div class="q-pl-md q-py-md" v-for="rinci in it?.rincian" :key="rinci">
                    {{ rinci.volume }}
                  </div>
                </td>
                <td>
                  <div class="q-py-sm" />
                  <div class="q-pl-md q-py-md" v-for="rinci in it?.rincian" :key="rinci">
                    {{ rinci.satuan }}
                  </div>
                </td>
                <td class="text-right">
                  <div class="q-py-sm" />
                  <div class="q-pl-md q-py-md" v-for="rinci in it?.rincian" :key="rinci">
                    {{ formattanpaRp(rinci.harga) }}
                  </div>
                </td>
                <td class="text-right">
                  <div class="text-bold">
                    {{ formattanpaRp(it.pagu) }}
                  </div>
                  <div class="q-pl-md q-py-md" v-for="rinci in it?.rincian" :key="rinci">
                    {{ formattanpaRp(rinci.pagu) }}
                  </div>
                </td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>
      </div>
    </q-card-section>
  </template>
</template>
<script setup>
import { formattanpaRp } from 'src/modules/formatter'
import { useRkaStore } from 'src/stores/siasik/anggaran/storerka'
import { ref } from 'vue'

const store = useRkaStore()
const separator = ref('cell')

</script>
