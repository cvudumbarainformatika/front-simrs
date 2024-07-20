<template>
  <q-dialog persistent :backdrop-filter="'blur(4px)'">
    <q-card>
      <q-bar>
        <div>9:34</div>
        <q-separator vertical class="q-ml-sm" />
        <div>Peserta BPJS </div>

        <q-space />

        <q-btn dense flat icon="icon-mat-close" v-close-popup>
          <q-tooltip>Close</q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section>
        <div class="flex q-gutter-sm">
          <app-avatar-pasien :pasien="pasien" width="30%" />
          <div class="flex-">
            <table>
              <tr>
                <td>NAMA</td>
                <td>:</td>
                <td>{{ props.peserta?.nama }}</td>
              </tr>
              <tr>
                <td>NIK</td>
                <td>:</td>
                <td>{{ props.peserta?.nik }}</td>
              </tr>
              <tr>
                <td>No. BPJS</td>
                <td>:</td>
                <td>{{ props.peserta?.noKartu }}</td>
              </tr>
              <tr>
                <td>Hak Kelas</td>
                <td>:</td>
                <td>{{ props.peserta?.hakKelas?.keterangan }}</td>
              </tr>
              <tr :class="`text-weight-bold ${props.peserta?.statusPeserta?.keterangan==='AKTIF' ? 'text-info' : 'text-red'}`">
                <td>STATUS</td>
                <td>:</td>
                <td>{{ props.peserta?.statusPeserta?.keterangan }}</td>
              </tr>
            </table>
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div>Data dari BPJS ditemukan, Apakah anda ingin mengganti data form dengan yang di dapat dari Bpjs ? jika ya silahkan klik tombol <b>OK</b> di bawah </div>
      </q-card-section>
      <q-separator />
      <q-card-actions class="justify-between">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn label="ok" color="primary" @click="emits('ok')" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  peserta: {
    type: Object,
    default: null
  }
})

const pasien = computed(() => {
  const obj = {
    kelamin: props.peserta?.sex === 'L' ? 'Laki-laki' : 'Perempuan',
    usia: props.peserta?.umur?.umurSekarang ?? '0'
  }
  return obj
})

const emits = defineEmits(['ok'])
</script>

<style lang="scss" scoped>
table {
  width: 100%;
  // tr {
  //   outline: thin solid;
  // }
}
</style>
