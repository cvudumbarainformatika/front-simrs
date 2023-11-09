<template>
  <div class="column full-height">
    <div class="col-auto">
      <q-bar>
        <q-btn
          flat
          rounded
          padding="xs"
          size="xs"
          icon="icon-mat-close"
          @click="emits('close')"
        />
        <q-space />
        <div>History Pasien</div>
      </q-bar>
    </div>
    <div class="col full-height">
      <q-scroll-area style="height:calc(100% - 50px)">
        <q-list
          v-if="store?.items?.length"
          bordered
          separator
        >
          <q-expansion-item
            v-for="(item, i) in store?.items"
            :key="i"
            expand-separator
            :label="item?.ruangan + ' | '+ item?.rs1 "
            :caption="tanggal(item?.tanggal)"
          >
            <q-card dark>
              <q-separator />
              <q-card-section class="q-pa-none">
                <div v-if="item?.anamnesis.length">
                  <q-bar class="bg-primary">
                    <div>ANAMNESIS</div>
                  </q-bar>
                  <q-list dark>
                    <q-item
                      v-for="(anamnesis, a) in item?.anamnesis"
                      :key="a"
                    >
                      <q-item-section>
                        <q-item-label>Keluhan Utama</q-item-label>
                        <q-item-label
                          caption
                          lines="2"
                        >
                          {{ anamnesis?.rs4 }}
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
                <div v-else>
                  <q-bar class="bg-primary">
                    <div>ANAMNESA tidak ada</div>
                  </q-bar>
                </div>
              </q-card-section>

              <q-separator />
              <q-card-section
                v-if="item?.diagnosa?.length"
                class="q-pa-none"
              >
                <q-bar class="bg-accent">
                  <div>DIAGNOSA</div>
                </q-bar>
                <q-list dark>
                  <q-item
                    v-for="(diagnosa, d) in item?.diagnosa"
                    :key="d"
                  >
                    <q-item-section>
                      <q-item-label>Diagnosa</q-item-label>
                      <q-item-label
                        caption
                        lines="2"
                      >
                        {{ diagnosa?.masterdiagnosa?.rs4 }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>

              <q-separator />
              <q-card-section
                v-if="item?.laborat?.length"
                class="q-pa-none"
              >
                <q-bar class="bg-teal">
                  PEMERIKSAAN LABORAT
                </q-bar>
                <q-markup-table
                  separator="vertical"
                  flat
                  bordered
                  dense
                  dark
                >
                  <thead>
                    <tr>
                      <th class="text-left">
                        Nama Pemeriksaan
                      </th>
                      <th class="text-right">
                        Hasil
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(lab, l) in item?.laborat"
                      :key="l"
                    >
                      <td
                        class="text-left ellipsis"
                        style="max-width: 250px;"
                      >
                        {{ lab?.pemeriksaanlab?.rs2 }}
                      </td>
                      <td
                        class="text-right"
                        style="max-width: 150px;"
                      >
                        {{ lab?.rs21 }}
                      </td>
                    </tr>
                  </tbody>
                </q-markup-table>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
        <div
          v-else
          class="full-height column flex-center "
        >
          <div>History Pasien Belum Ada</div>
        </div>
      </q-scroll-area>
      <div
        class="absolute-bottom bg-primary"
        style="height: 50px;"
      >
        adasda
      </div>
    </div>
  </div>
</template>

<script setup>
import { dateFullFormat, formatJam } from 'src/modules/formatter'
import { useHistoryPasien } from 'src/stores/simrs/pelayanan/poli/historypasien'
import { onMounted } from 'vue'

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

const emits = defineEmits(['close'])

const tanggal = (val) => {
  return dateFullFormat(val) + ' ~ ' + formatJam(val)
}

const store = useHistoryPasien()
onMounted(() => {
  store.getData(props.pasien)
})
</script>
