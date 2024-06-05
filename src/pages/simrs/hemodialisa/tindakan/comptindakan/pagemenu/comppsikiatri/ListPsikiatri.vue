<template>
  <div class="fit">
    <div
      v-if="!items.length"
      class="column full-height flex-center"
    >
      <div>Belum Ada Data</div>
    </div>

    <div
      v-else
      class="full-height q-pl-md scroll"
    >
      <q-card
        v-for="(item, i) in items"
        :key="i"
        class="q-mb-md"
      >
        <q-card-section>
          <q-list
            dense
            bordered
            separator
            class="rounded-borders"
          >
            <q-item>
              <q-item-section>
                <q-item-label>Urutan Kelahiran : <b>{{ item.urutankelahiran }}</b> </q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label>Tanggal Pemeriksaan : <b>{{ item.tanggalpemeriksaan }}</b> </q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>Penampilan Umum : <b>{{ item.penampilanumum }}</b> </q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>Sikap Thd Pemeriksaan : <b>{{ item.sikapThdPemeriksaan }}</b> </q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>Afek : <b>{{ item.afek }}</b> </q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>Roman Muka : <b>{{ item.romanMuka }}</b> </q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>Proses Pikir : <b>{{ item.prosesPikir }}</b> </q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>Gangguan Persepsi : <b>{{ item.gangguanPersepsi }}</b> </q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label overline>
                  Kognitif
                </q-item-label>
                <q-item-label>
                  - Memory : <b>{{ item.memory }}</b>
                </q-item-label>
                <q-item-label>
                  - Konsentrasi : <b>{{ item.konsentrasi }}</b>
                </q-item-label>
                <q-item-label>
                  - Orientasi : <b>{{ item.orientasi }}</b>
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>Kemampuan verbal : <b>{{ item.kemampuanverbal }}</b> </q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>Emosi : <b>{{ item.emosi }}</b> </q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>Prilaku : <b>{{ item.prilaku }}</b> </q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label> <b>Psikotes Pendukung</b> </q-item-label>
                <q-separator />
                <div
                  v-for="(ss, n) in item.psikotespendukung"
                  :key="n"
                  class="row q-py-xs"
                >
                  <div class="q-mr-sm">
                    {{ n + 1 }}
                  </div> <div>{{ ss }}</div>
                </div>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label> <b>simptom : </b>  </q-item-label>
                <q-separator />
                <div
                  v-for="(sim, x) in item.simptom"
                  :key="x"
                  class="row q-py-xs"
                >
                  <div class="q-mr-sm">
                    {{ x + 1 }}
                  </div> <div>{{ sim }}</div>
                </div>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>Dinamika Psikologi : {{ item.dinamikPsikologi }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>Diagnosa Psikologi : <b>{{ item.diagnosaPsikologi }}</b> </q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>Rencana Intervensi Psikologi : <b>{{ item.rencanaIntervensiPsikologi }}</b> </q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>Intervensi Psikologi : <b>{{ item.intervensiPsikologi }}</b> </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-card-section
          align="right"
        >
          <q-btn
            icon="icon-mat-delete"
            color="negative"
            flat
            round
            size="sm"
            @click="emits('hapus', item.id)"
          />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    default: () => []
  }
})

const emits = defineEmits(['hapus'])
</script>
