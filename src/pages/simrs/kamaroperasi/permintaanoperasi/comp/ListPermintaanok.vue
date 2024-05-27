<template>
  <div>
    <div class="q-pb-xl">
      <LoadingList v-if="loading" />
      <empty-data v-else-if="!items.length && !loading" />
      <q-list
        v-else
        separator
      >
        <q-item
          v-for="(item, i) in items"
          :key="i"
        >
          <q-item-section avatar>
            <app-avatar-pasien
              :pasien="item"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>
              <span class="text-negative text-weight-bold">{{ item?.kunjunganranap?.masterpasien?.rs3 ?? item?.kunjunganrajal?.masterpasien?.rs3 }} {{ item?.kunjunganranap?.masterpasien?.rs2 ?? item?.kunjunganrajal?.masterpasien?.rs2 }} ( {{ item?.kunjunganranap?.masterpasien?.rs1 ?? item?.kunjunganrajal?.masterpasien?.rs1 }} )</span> | <span class="text-weight-bold">{{ item?.kunjunganranap?.masterpasien?.rs46 ?? item?.kunjunganrajal?.masterpasien?.rs46 }}</span>
            </q-item-label>
            <q-item-label>
              <span class="text-teal text-weight-bold">{{ item.rs1 }} </span> | Penjamin : <span class="text-weight-bold"> {{ item?.sistembayar?.rs2 }}</span>
            </q-item-label>
            <q-item-label>
              <span class="text-weight-bold">NIK : {{ item?.kunjunganranap?.masterpasien?.rs49 ?? item?.kunjunganrajal?.masterpasien?.rs49 }} </span> | Telp : <span class="text-weight-bold"> {{ item?.kunjunganranap?.masterpasien?.rs55 ?? item?.kunjunganrajal?.masterpasien?.rs55 }}</span>
            </q-item-label>
            <!-- <q-item-label>
              DPJP : <span class="text-negative text-weight-bold">{{ item.dokter }}</span> | RUANGAN : <span class="text-teal text-weight-bold"> {{ item.poli }}</span>
            </q-item-label> -->
            <q-item-label caption>
              USIA : <span class="text-weight-bold">{{ getUsia(item?.rs3,item?.kunjunganranap?.masterpasien?.rs16) }} Tahun</span>  | Kelamin : <span class="text-weight-bold">{{ item?.kunjunganranap?.masterpasien?.rs17 ?? item?.kunjunganrajal?.masterpasien?.rs17 }}</span>
            </q-item-label>
            <q-item-label>
              <span class="text-primary text-weight-bold">Alamat : {{ item?.kunjunganranap?.masterpasien?.rs4 ?? item?.kunjunganrajal?.masterpasien?.rs4 }}</span>
            </q-item-label>
            <q-item-label
              caption
            >
              <!-- status : <span :class="item.status !== ''?'text-primary':'text-negative'">{{ getStatus(item.status) }}</span> -->
            </q-item-label>
            <q-item-label
              v-if="item?.planning?.length"
              caption
            >
              rencana : <span class="text-primary">{{ item?.planning[0].rs4 }}</span>
              <span
                v-if="item?.planning[0].rs4==='Konsultasi'"
                class="text-primary"
              > ( {{ item?.planning[0].masterpoli?.rs2 }} )</span>
              <span
                v-if="item?.planning[1]"
              > | <span class="text-secondary">{{ item?.planning[1].rs4 }}</span>
                <span
                  v-if="item?.planning[1].rs4==='Konsultasi'"
                  class="text-secondary"
                > ( {{ item?.planning[1].masterpoli?.rs2 }} )</span>
              </span>
            </q-item-label>
          </q-item-section>
          <q-separator
            vertical
            class="q-mx-md"
          />
          <q-item-section>
            <q-item-label caption>
              DPJP : <span class="text-negative text-weight-bold">{{ item.dokter?.nama }}</span>
            </q-item-label>
            <q-item-label>
              RUANGAN : <span class="text-teal text-weight-bold"> {{ item?.kunjunganranap?.relmasterruangranap?.rs2 ?? item?.kunjunganrajal?.relmpoli?.rs2 }}</span>
            </q-item-label>
            <q-item-label>
              Tanggal MRS : <span class="text-weight-bold"> {{ date.formatDate(item?.kunjunganranap?.rs3 ?? item?.kunjunganrajal?.rs3,'DD MMMM YYYY') }}</span>
            </q-item-label>
            <q-item-label>
              Tanggal Permintaan Operasi : <span class="text-teal text-weight-bold"> {{ date.formatDate(item?.rs3,'DD MMMM YYYY') }}</span>
            </q-item-label>

            <q-item-label
              caption
            >
              <q-badge
                v-if="item?.sep"
                :label="item?.sep"
              />
            </q-item-label>
          </q-item-section>
          <q-item-section
            side
            top
          >
            <q-btn
              dense
              outline
              size="sm"
              no-caps
              color="primary"
              :label="labelLayanan(item?.rs9)"
              class="q-mb-sm"
              icon-right="icon-mat-edit"
              style="min-width: 120px;"
              :loading="loadingTerima && store.noreg === item?.noreg"
              :disable="loadingTerima"
              @click="emits('pelayanan', item)"
            />
          </q-item-section>
        </q-item>
        <q-separator />
      </q-list>
      <div class="q-pb-xl" />
      <div class="q-pb-xl" />
    </div>
  </div>
</template>
<script setup>
import { date } from 'quasar'
import LoadingList from './LoadingList.vue'
import EmptyData from './EmptyData.vue'
// import { dateFullFormat, formatJam } from 'src/modules/formatter'
// import { notifErrVue } from 'src/modules/utils'
// import { useSepBpjsStore } from 'src/stores/simrs/pendaftaran/kunjungan/bpjs/sep'
// import { ref } from 'vue'
import { usePermintaanOperasistore } from 'src/stores/simrs/kamaroperasi/permintaanoperasi'
const emits = defineEmits(['pelayanan'])
defineProps({
  items: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  },
  loadingTerima: {
    type: Boolean,
    default: false
  },
  loadingCall: {
    type: Boolean,
    default: false
  },
  loadingTidakhadir: {
    type: Boolean,
    default: false
  }
})

// function getStatus(val) {
//   // '' : 'Belum Terlayanani'
//   // '1': 'Terlayani'
//   // '2': 'Sudah diterima'
//   // '3': Batal
//   if (val === '1') {
//     return 'BELUM TERLAYANI'
//   } else {
//     return 'TERLAYANI'
//   }
// }

function labelLayanan (val) {
  if (val === '1') {
    return 'BELUM TERLAYANI'
  }
  else {
    return 'TERLAYANI'
  }
}

const store = usePermintaanOperasistore()

function getUsia (x, y) {
  const xx = new Date(x)
  const yy = new Date(y)
  const unit = 'years'
  const diff = date.getDateDiff(xx, yy, unit)

  return diff
}
</script>
