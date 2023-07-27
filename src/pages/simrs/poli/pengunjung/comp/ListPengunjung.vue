<template>
  <div>
    <div style="padding-top:50px;">
      <q-list separator>
        <q-item
          v-for="i in 50"
          :key="i"
        >
          <q-item-section avatar>
            <!-- <app-avatar-pasien
              :pasien="item"
            /> -->
            <q-avatar
              square
              size="100px"
            >
              <img src="https://cdn.quasar.dev/img/avatar.png">
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-weight-bold">
              <!-- {{ item.nama }} | <span class="text-primary">{{ item.norm }}</span> -->
              nama | norm
            </q-item-label>
            <q-item-label>
              <!-- NOREG : <span class="text-weight-bold">{{ item.noreg }} </span> | Penjamin : <span class="text-weight-bold"> {{ item.sistembayar }}</span> -->
              noreg
            </q-item-label>
            <q-item-label>
              <!-- DPJP : <span class="text-negative text-weight-bold">{{ item.dokter }}</span> | RUANGAN : <span class="text-teal text-weight-bold"> {{ item.poli }}</span> -->
              DPJP | Ruangan
            </q-item-label>
            <q-item-label caption>
              <!-- USIA : <span class="text-weight-bold">{{ item.usia }}</span>  | Kelamin : <span class="text-weight-bold">{{ item.kelamin }}</span> -->
              Usia | Kelamin
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
