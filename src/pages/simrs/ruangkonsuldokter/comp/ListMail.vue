<template>
  <div class="column fit">
    <div class="col-auto bg-white q-px-sm q-py-xs">
      <div class="row justify-between items-center">
        <div class="kiri">
          <q-btn icon="icon-mat-refresh" size="sm" flat dense color="dark" @click="emits('refresh')">
            <q-tooltip>
              Segarkan
            </q-tooltip>
          </q-btn>
        </div>
        <div class="kanan">
          <q-pagination
            v-model="current"
            :max="5"
            input
          />
        </div>
      </div>
    </div>
    <div v-if="items?.length" class="col full-height scroll">
      <q-list bordered separator class="rounded-borders">
        <q-item
          clickable v-ripple v-for="(item, i) in items" :key="i" :class="{'bg-white text-bold': !item?.flag}"
          @click="emits('details', item)"
        >
          <q-item-section side top>
            <q-item-label class="text-dark">
              {{ item?.nakesminta?.nama ?? 'Not Valid' }}
            </q-item-label>
          </q-item-section>
          <q-item-section v-if="item?.kdruang === 'POL014'">
            <q-item-label lines="1">
              Pasien -- {{ item?.kunjunganigd?.nama ?? '-' }} ({{ item?.kunjunganigd?.rs2 ?? '-' }}), {{ item?.kunjunganigd?.ruangan ?? '-' }}
            </q-item-label>
            <q-item-label lines="1">
              Diagnosa -- {{ item?.kunjunganranap?.diagnosamedis[0]?.masterdiagnosa?.rs4 ?? 'Belum Ada Diagnosa' }}
            </q-item-label>
          </q-item-section>
          <q-item-section v-if="item?.kdruang !== 'POL014'">
            <q-item-label lines="1">
              <!-- Pasien -- {{ item?.kunjunganranap?.nama ?? '-' }} ({{ item?.kunjunganranap?.rs2 ?? '-' }}), {{ item?.kunjunganranap?.ruangan ?? '-' }} -->
              Pasien {{ aturPasien(item) }}
            </q-item-label>
            <q-item-label lines="1">
              Diagnosa -- {{ item?.kunjunganranap?.diagnosamedis[0]?.masterdiagnosa?.rs4 ?? 'Belum Ada Diagnosa' }}
            </q-item-label>
          </q-item-section>
          <!-- <q-item-section>
            <q-item-label lines="1">
              {{ item }}
            </q-item-label>
          </q-item-section> -->
          <q-item-section side>
            {{ humanDate(item?.tgl_permintaan) }} - {{ formatJam(item?.tgl_permintaan) }}
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script setup>
import { formatJam, humanDate } from 'src/modules/formatter'
import { ref } from 'vue'

defineProps({
  items: {
    type: Array,
    default: () => []
  }

})

const emits = defineEmits(['details', 'refresh'])

const current = ref(1)

const aturPasien = (item) => {
  // return item?.kunjunganranap?.nama ?? '-'
  console.log('pasien', item)
  if (item?.kdruang !== 'POL014') {
    return `${item?.kunjunganranap?.nama ?? '-'} (${item?.kunjunganranap?.rs2 ?? '-'}, ${item?.kunjunganranap?.ruangan ?? '-'}) `
  }
  else {
    return `${item?.kunjunganigd?.nama ?? '-'} (${item?.kunjunganigd?.rs2 ?? '-'}, ${item?.kunjunganigd?.ruangan ?? '-'}) `
  }
}

</script>
