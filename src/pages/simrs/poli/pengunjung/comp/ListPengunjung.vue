<template>
  <div>
    <div style="padding-top:50px;">
      <q-list separator>
        <q-item
          v-for="(item, i) in items"
          :key="i"
        >
          <q-item-section avatar>
            <app-avatar-pasien
              :pasien="item"
              width="100px"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>
              <span class="text-weight-bold">{{ item.nama }}</span> | <span class="text-primary text-weight-bold">{{ item.norm }}</span>
            </q-item-label>
            <q-item-label>
              <span class="text-weight-bold">{{ item.noreg }} </span> | Penjamin : <span class="text-weight-bold"> {{ item.sistembayar }}</span>
            </q-item-label>
            <q-item-label>
              DPJP : <span class="text-negative text-weight-bold">{{ item.dokter }}</span> | RUANGAN : <span class="text-teal text-weight-bold"> {{ item.poli }}</span>
            </q-item-label>
            <q-item-label caption>
              USIA : <span class="text-weight-bold">{{ item.usia }}</span>  | Kelamin : <span class="text-weight-bold">{{ item.kelamin }}</span>
            </q-item-label>
            <q-item-label>
              Sistem Bayar
            </q-item-label>
            <q-item-label
              caption
            >
              status Pasien
            </q-item-label>
          </q-item-section>
          <q-item-section
            side
            top
          >
            <q-btn
              dense
              size="sm"
              no-caps
              color="secondary"
              label="Tindakan"
              class="q-mb-sm"
              icon-right="icon-mat-description"
              @click="emits('tindakan', item)"
            />
            <q-btn
              dense
              size="sm"
              no-caps
              color="orange"
              label="Panggil"
              icon-right="icon-mat-volume_up"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>
<script setup>
const emits = defineEmits(['tindakan'])
defineProps({
  items: {
    type: Array,
    default: () => []
  }
})
</script>
