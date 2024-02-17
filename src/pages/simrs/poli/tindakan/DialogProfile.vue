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
            {{ pasien?.nama_panggil }}
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
              <q-item-label><span>NORM : {{ pasien?.norm ?? '-' }}</span> <span class="text-primary"> || NOREG : {{ pasien?.noreg ?? '-' }}</span></q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            v-ripple
          >
            <q-item-section>
              <q-item-label><span>NIK : {{ pasien?.nktp ?? '-' }}</span> </q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            v-ripple
          >
            <q-item-section>
              <q-item-label><span>TGL LAHIR : {{ pasien?.tgllahir ? dateFullFormat(pasien?.tgllahir) : '-' }}</span> </q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            v-ripple
          >
            <q-item-section>
              <q-item-label><span>USIA : {{ pasien?.usia ?? '-' }}</span> </q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            v-ripple
          >
            <q-item-section>
              <q-item-label><span>TELP : {{ pasien?.nohp ?? '-' }}</span> </q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            v-ripple
          >
            <q-item-section>
              <q-item-label><span>AGAMA : {{ pasien?.agama ?? '-' }}</span> </q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            v-ripple
          >
            <q-item-section>
              <q-item-label><span>ALAMAT : {{ pasien?.alamat ?? '-' }}</span> </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>

        <q-list
          v-if="pasien?.groups==='1'"
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
              <q-item-label><span>PENJAMIN : {{ pasien?.sistembayar ?? '-' }}</span> </q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            v-ripple
          >
            <q-item-section>
              <q-item-label><span>NOKA : {{ pasien?.noka ?? '-' }}</span> </q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            v-ripple
          >
            <q-item-section>
              <q-item-label><span>NO. RUJUKAN : {{ pasien?.norujukan ?? '-' }}</span> </q-item-label>
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
import { dateFullFormat } from 'src/modules/formatter'

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
