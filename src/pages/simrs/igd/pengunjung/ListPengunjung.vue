<template>
  <div>
    <div class="q-pb-xl">
      <ListLoading v-if="loading" />
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

          <q-item-section class="q-col-gutter-xs">
            <q-item-label>
              <span class="text-weight-bold">{{ item.nama }}</span> | <span class="text-primary text-weight-bold">{{ item.norm }}</span>
            </q-item-label>
            <q-item-label>
              <span class="text-weight-bold">{{ item.noreg }} </span> | <span v-if="item?.noka"> Noka : </span> <span class="text-cyan text-weight-bold">{{ item?.noka ?? '-' }}</span>
            </q-item-label>
            <q-item-label>
              NIK : <span class="text-negative text-weight-bold">{{ item?.nktp ?? '-' }}</span> | Telp : <span class="text-teal text-weight-bold"> {{ item?.nohp ?? '-' }}</span>
            </q-item-label>
            <q-item-label caption>
              USIA : <span class="text-weight-bold">{{ item.usia }}</span>  | Kelamin : <span class="text-weight-bold">{{ item.kelamin }}</span>
            </q-item-label>
            <q-item-label>
              <span class="text-grey">alamat :</span> {{ item?.alamat }}
            </q-item-label>
          </q-item-section>
          <q-separator
            vertical
            class="q-mx-md"
          />
          <q-item-section class="q-col-gutter-xs">
            <q-item-label>
              DPJP : <span class="text-negative text-weight-bold">{{ item.kodedokter ? item.dokter: '-' }}</span>
            </q-item-label>
            <q-item-label>
              RUANGAN : <span class="text-teal text-weight-bold"> {{ item.poli }}</span>
            </q-item-label>
            <q-item-label>
              Tanggal : <i class="text-weight-bold text-negative">{{ item.tgl_kunjungan? dateFullFormat(item.tgl_kunjungan) : '-' }}</i>  | Jam : <i class="text-weight-bold text-negative">{{ item.tgl_kunjungan? formatJam(item.tgl_kunjungan) : '-' }}</i>
            </q-item-label>
            <div>Penjamin : <span class="text-primary text-weight-bold">{{ item?.sistembayar }}</span></div>
            <div class="text-primary">
              <q-badge
                v-if="item?.sep"
                :label="item?.sep"
              />
              <div v-if="!item?.sep">
                <q-badge
                  v-if="item.groups==='1'"
                  label="SEP BELUM TERBIT"
                  color="negative"
                  class="cursor-pointer"
                />
              </div>
            </div>
          </q-item-section>
          <q-item-section
            v-if="item?.flagpelayanan === ''"
            side
          >
            <q-btn
              dense
              size="sm"
              no-caps
              color="red"
              label="TERIMA"
              class="q-mb-sm"
              icon-right="icon-mat-transfer_within_a_station"
              style="min-width: 120px;"
              :loading="loadingTerima && store.noreg === item?.noreg"
              @click="emits('terimapasien', item)"
            />
          </q-item-section>
          <q-item-section
            v-else
            side
          >
            <q-btn
              dense
              outline
              size="sm"
              no-caps
              :loading="loadingTerima && store.noreg === item?.noreg"
              :disable="loadingTerima"
              color="primary"
              label="LIHAT LAYANAN"
              class="q-mb-sm"
              icon-right="icon-mat-edit"
              style="min-width: 120px;"
              @click="bukaLayanan(item)"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
    <!-- layanan -->
    <page-layanan-igd
      v-model="store.pageLayanan"
      :pasien="pasien"
    />
  </div>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
import ListLoading from './ListLoading.vue'
import EmptyData from './EmptyData.vue'
import { defineAsyncComponent, ref } from 'vue'
import { usePengunjungIgdStore } from 'src/stores/simrs/igd/pengunjung'
import { dateFullFormat, formatJam } from 'src/modules/formatter'

const emits = defineEmits(['terimapasien'])
const store = usePengunjungIgdStore()

const PageLayananIgd = defineAsyncComponent(() => import('src/pages/simrs/igd/layanan/PageLayananIgd.vue'))
const pasien = ref(null)
function bukaLayanan(item) {
  pasien.value = item
  store.pageLayanan = true
}

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
</script>
