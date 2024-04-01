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
                <q-item-label>Urutan Kelahiran : {{ item.urutankelahiran }}</q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label>Tanggal Pemeriksaan : {{ item.tanggalpemeriksaan }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>Penampilan Umum : {{ item.penampilanumum }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>Sikap Thd Pemeriksaan : {{ item.sikapThdPemeriksaan }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>Afek : {{ item.afek }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>Roman Muka : {{ item.romanMuka }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>Proses Pikir : {{ item.prosesPikir }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>Gangguan Persepsi : {{ item.gangguanPersepsi }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label overline>
                  Kognitif
                </q-item-label>
                <q-item-label>
                  - Memory : {{ item.memory }}
                </q-item-label>
                <q-item-label>
                  - Konsentrasi : {{ item.konsentrasi }}
                </q-item-label>
                <q-item-label>
                  - Orientasi : {{ item.orientasi }}
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>Kemampuan verbal : {{ item.kemampuanverbal }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>Emosi : {{ item.emosi }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>Prilaku : {{ item.prilaku }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>Psikotes Pendukung</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>simptom : {{ item.simptom }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>Dinamika Psikologi : {{ item.dinamikPsikologi }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>Diagnosa Psikologi : {{ item.diagnosaPsikologi }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>Rencana Intervensi Psikologi : {{ item.rencanaIntervensiPsikologi }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>Intervensi Psikologi : {{ item.intervensiPsikologi }}</q-item-label>
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
