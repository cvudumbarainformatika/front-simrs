<template>
  <div>
    <div class="row q-mb-sm text-weight-bold">
      Keterangan :
    </div>
    <div class="row q-mb-md items-center">
      <div class="q-mr-md text-center">
        <div class="q-mr-sm">
          <!-- color="red" -->
          <q-avatar
            text-color="white"
            dense
            size="24px"
            icon="icon-mat-close"
          />
        </div>
        <div class="q-mr-sm">
          Tidak ada catatan absensi
        </div>
      </div>
      <div class="q-mr-md text-center">
        <div class="q-mr-sm">
          <q-avatar
            color="primary"
            text-color="white"
            size="24px"
            dense
            icon="icon-mat-done_all"
          />
        </div>
        <div class="q-mr-sm">
          datang tepat waktu<br>
          warna sesuai kategori
        </div>
      </div>
      <div class="q-mr-md text-center">
        <div class="q-mr-sm">
          <q-avatar
            color="orange"
            text-color="white"
            size="24px"
            dense
            icon="icon-mat-done"
          />
        </div>
        <div class="q-mr-sm">
          datang terlambat
        </div>
      </div>
      <div class="q-mr-md text-center">
        <div class="q-mr-sm">
          <q-chip
            color="red"
            text-color="white"
            class="chip"
            dense
            square
          >
            <div class="f-12">
              nama hari libur
            </div>
          </q-chip>
        </div>
        <div class="q-mr-sm">
          libur nasional
        </div>
      </div>
      <div class="q-mr-md text-center">
        <div class="q-mr-sm">
          <q-chip
            color="info"
            text-color="white"
            class="chip"
            dense
            square
          >
            <div class="f-12">
              Kode absen
            </div>
          </q-chip>
        </div>
        <div class="q-mr-sm">
          Tidak hadir dengan alasan
        </div>
      </div>
    </div>
    <div class="row text-weight-bold">
      warna kategori jadwal :
    </div>
    <div class="row">
      <div
        v-for="(data,i) in datas"
        :key="i"
      >
        <div class="q-mr-sm">
          <q-chip
            :style="`background-color: ${data.warna};`"

            text-color="white"
            class="chip"
            dense
            square
          >
            <div class="f-12">
              {{ data.nama }}
            </div>
          </q-chip>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
defineProps({
  datas: {
    type: Object,
    default: () => {}
  }
})
</script>
