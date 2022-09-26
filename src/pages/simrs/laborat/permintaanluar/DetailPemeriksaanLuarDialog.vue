<template>
  <q-dialog persistent>
    <q-card
      ref="printedRef"
      style="width: 60vw; max-width: 70vw;"
    >
      <q-card-section>
        <div class="text-h6">
          Permintaan Pemeriksaan Luar
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section
        v-if="items.length > 0"
        style="max-height: 50vh"
        class="scroll"
      >
        <q-markup-table
          separator="cell"
          dense
        >
          <thead>
            <tr>
              <th
                class="text-left"
                width="5%"
              >
                No
              </th>
              <th class="text-left">
                Pemeriksaan
              </th>
              <th class="text-right">
                Hasil
              </th>
              <th class="text-right">
                Satuan
              </th>
              <th class="text-right">
                Biaya
              </th>
              <th class="text-right">
                Jml
              </th>
              <th class="text-right">
                Subtotal
              </th>
            </tr>
          </thead>
          <tbody>
            <template
              v-for="(item, i) in items"
            >
              <template v-if="item.name===''">
                <tr
                  v-for="(val, n) in item.value"
                  :key="n"
                >
                  <td
                    class="text-left"
                  >
                    {{ item.name === ""?
                      i + n + 1
                      : n!==0? ''
                        :items[i - 1].name === ""?i + items[i - 1].value.length
                          :i + n + 1
                    }}
                  </td>
                  <td
                    class="text-left"
                    :colspan="item.name==='' || (item.name!=='' && n===0)?1:0"
                  >
                    {{ val.pemeriksaan_laborat.rs2 }}
                  </td>
                  <td
                    class="text-right"
                  >
                    kosong
                  </td>
                  <td
                    class="text-right"
                  >
                    {{ val.pemeriksaan_laborat.rs22 }}
                  </td>
                  <td
                    class="text-right"
                  >
                    {{ formatRp(val.biaya) }}
                  </td>
                  <td
                    class="text-right"
                  >
                    {{ val.pemeriksaan_laborat.jumlah }}
                  </td>
                  <td
                    class="text-right"
                  >
                    {{ formatRp(val.subtotal) }}
                  </td>
                </tr>
              </template>
              <template v-else>
                <tr
                  :key="i"
                  class="bg-grey-3"
                >
                  <td
                    colspan="4"
                  >
                    {{ item.name }}
                  </td>
                  <td
                    class="text-right"
                  >
                    {{ formatRp(item.value? item.value[0].biaya:0) }}
                  </td>
                  <td
                    class="text-right"
                  >
                    {{ item.value[0].pemeriksaan_laborat.jumlah }}
                  </td>
                  <td
                    class="text-right"
                  >
                    {{ formatRp(item.value? item.value[0].subtotal:0) }}
                  </td>
                </tr>
                <tr
                  v-for="(val, n) in item.value"
                  :key="n"
                >
                  <td>
                    {{ n+1 }}
                  </td>
                  <td>
                    {{ val.pemeriksaan_laborat.rs2 }}
                  </td>

                  <td
                    class="text-right"
                  >
                    kosong
                  </td>
                  <td
                    class="text-right"
                  >
                    {{ val.pemeriksaan_laborat.rs22 }}
                  </td>
                  <td
                    class="text-right"
                  />
                  <td
                    class="text-right"
                  />
                  <td
                    class="text-right"
                  />
                </tr>
              </template>
            </template>
            <tr class="bg-primary text-white">
              <td
                colspan="5"
                class="text-right"
              >
                TOTAL :
              </td>
              <td
                class="text-right"
                colspan="2"
              >
                {{ formatRp(total) }}
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </q-card-section>

      <q-card-section>
        <div class="column">
          Tidak Ada Item Pemeriksaan
        </div>
      </q-card-section>
      <q-separator />

      <q-card-actions align="right">
        <q-btn
          v-close-popup
          flat
          label="Decline"
          color="primary"
        />
        <q-btn
          flat
          label="Print"
          color="primary"
          @click="printDialog"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { formatRp } from 'src/modules/formatter'
import { ref } from 'vue'
const printedRef = ref(null)
defineProps({
  items: {
    type: Array,
    default: () => []
  },
  total: {
    type: Number,
    default: 0
  }
})

function printDialog() {
  console.log(printedRef.value)
  window.print()
}
</script>
