<template>
  <div>
    <div style="margin-bottom: 100px;">
      <q-list
        square
        separator
      >
        <q-item
          v-for="item in store.pasiens"
          :key="item"
          v-ripple
          clickable
        >
          <q-item-section avatar>
            <app-avatar-pasien
              :pasien="item"
              width="50px"
            />
          </q-item-section>

          <q-item-section class="q-col-gutter-xs">
            <div><b>{{ item?.nama }}</b></div>
            <div>Norm|Reg : <span class="text-primary">{{ item?.norm }}</span> | <span class="text-orange">{{ item.noreg }}</span></div>
            <div>Usia : {{ item?.usia }} | <em class="text-grey">{{ item.kelamin }}</em></div>
            <div class="f-10">
              {{ item?.alamat }}
            </div>
          </q-item-section>
          <q-item-section class="q-col-gutter-xs">
            <div class="text-pink">
              DPJP : <b>{{ item?.dokter ?? '-' }}</b>
            </div>
            <div>Penjamin : <span class="text-primary">{{ item?.sistembayar }}</span></div>
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
          <q-item-section side>
            <q-btn
              dense
              outline
              size="sm"
              no-caps
              color="primary"
              label="LIHAT LAYANAN"
              class="q-mb-sm"
              icon-right="icon-mat-eye"
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
import { defineAsyncComponent, ref } from 'vue'
import { usePengunjungIgdStore } from 'src/stores/simrs/igd/pengunjung'
const store = usePengunjungIgdStore()

const PageLayananIgd = defineAsyncComponent(() => import('src/pages/simrs/igd/layanan/PageLayananIgd.vue'))
const pasien = ref(null)
function bukaLayanan(item) {
  pasien.value = item
  store.pageLayanan = true
}
</script>
