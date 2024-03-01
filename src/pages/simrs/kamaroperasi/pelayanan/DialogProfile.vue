<template>
  <q-dialog>
    <q-card class="my-carding">
      <div class="full-width q-pa-md text-center bg-primary">
        <app-avatar-pasien
          :key="pasien"
          :pasien="pasien"
          width="100px"
        />
      </div>

      <q-card-section class="q-px-md q-py-sm">
        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis">
            {{ pasien?.kunjunganranap?.masterpasien?.rs2 ?? pasien?.kunjunganrajal?.masterpasien?.rs2 }}
          </div>
        </div>
      </q-card-section>
      <q-card-section class="q-pa-none">
        <q-list
          bordered
          separator
          dense
        >
          <q-item
            v-ripple
          >
            <q-item-section>
              <q-item-label><span>NORM : {{ pasien?.kunjunganranap?.rs2 ?? pasien?.kunjunganrajal?.rs2 ?? '-' }}</span> <span class="text-primary"> || NOREG : {{ pasien?.kunjunganranap?.rs1 ?? pasien?.kunjunganrajal?.rs1 ?? '-' }}</span></q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            v-ripple
          >
            <q-item-section>
              <q-item-label><span>NIK : {{ pasien?.kunjunganranap?.masterpasien?.rs49 ?? pasien?.kunjunganrajal?.masterpasien?.rs49 ?? '-' }}</span> </q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            v-ripple
          >
            <q-item-section>
              <q-item-label><span>TGL LAHIR : {{ date.formatDate(pasien?.kunjunganranap?.masterpasien?.rs16 ?? pasien?.kunjunganrajal?.masterpasien?.rs16 ,'DD MMMM YYYY') }}</span> </q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            v-ripple
          >
            <q-item-section>
              <q-item-label><span>USIA : {{ pasien?.usia ?? '-' }} Tahun</span> </q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            v-ripple
          >
            <q-item-section>
              <q-item-label><span>TELP : {{ pasien?.kunjunganranap?.masterpasien?.rs55 ?? pasien?.kunjunganrajal?.masterpasien?.rs55 ?? '-' }}</span> </q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            v-ripple
          >
            <q-item-section>
              <q-item-label><span>AGAMA : {{ pasien?.kunjunganranap?.masterpasien?.rs22 ?? pasien?.kunjunganrajal?.masterpasien?.rs22 ?? '-' }}</span> </q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            v-ripple
          >
            <q-item-section>
              <q-item-label><span>ALAMAT : {{ pasien?.kunjunganranap?.masterpasien?.rs4 ?? pasien?.kunjunganrajal?.masterpasien?.rs4 ?? '-' }}</span> </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        <q-list
          bordered
          separator
          dense
          dark
          class="bg-dark"
        >
          <q-item
            v-ripple
          >
            <q-item-section>
              <q-item-label><span>PENJAMIN : {{ pasien?.sistembayar?.rs2 ?? '-' }}</span> </q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            v-ripple
          >
            <q-item-section>
              <q-item-label><span>NOKA : {{ pasien?.kunjunganranap?.masterpasien?.rs46 ?? pasien?.kunjunganrajal?.masterpasien?.rs46 ?? '-' }}</span> </q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            v-ripple
          >
            <q-item-section>
              <q-item-label><span>NO. PERMINTAAN : {{ pasien?.rs2 ?? '-' }}</span> </q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            v-ripple
          >
            <q-item-section>
              <q-item-label><span>NOSEP : {{ pasien?.sep ?? '-' }}</span> </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { date } from 'quasar'

defineProps({
  pasien: {
    type: Object,
    default: null
  }
})
</script>

<style lang="scss" scoped>
.my-carding{
  width: 30vw;
  overflow: hidden;
}
</style>
