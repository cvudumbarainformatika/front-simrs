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
            <!-- <q-avatar
              square
              size="100px"
            >
              <img src="https://cdn.quasar.dev/img/avatar.png">
            </q-avatar> -->
          </q-item-section>
          <q-item-section>
            <q-item-label>
              <span class="text-weight-bold">{{ item.nama }}</span> | <span class="text-primary text-weight-bold">{{ item.norm }}</span>
              <!-- nama | norm -->
            </q-item-label>
            <q-item-label>
              <span class="text-weight-bold">{{ item.noreg }} </span> | Penjamin : <span class="text-weight-bold"> {{ item.sistembayar }}</span>
              <!-- noreg -->
            </q-item-label>
            <q-item-label>
              DPJP : <span class="text-negative text-weight-bold">{{ item.dokter }}</span> | RUANGAN : <span class="text-teal text-weight-bold"> {{ item.poli }}</span>
              <!-- DPJP | Ruangan -->
            </q-item-label>
            <q-item-label caption>
              USIA : <span class="text-weight-bold">{{ item.usia }}</span>  | Kelamin : <span class="text-weight-bold">{{ item.kelamin }}</span>
              <!-- Usia | Kelamin -->
            </q-item-label>
            <q-item-label>
              <!-- Penjamin : <span class="text-weight-bold"> {{ item.sistembayar }}</span> -->
              Sistem Bayar
            </q-item-label>
            <q-item-label
              caption
            >
              <!-- Status Pasien: <span class="text-negative text-weight-bold">{{ getStatus(item.taskid) }}</span> -->
              status Pasien
            </q-item-label>
          </q-item-section>
          <q-item-section side>
            asd
          </q-item-section>
        </q-item>
      </q-list>
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
</script>
