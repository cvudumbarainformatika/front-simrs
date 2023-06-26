<template>
  <div class="row items-center justify-between title-page q-mb-md">
    <div class="flex items-center">
      <div class="icon q-mr-md">
        <q-icon
          name="icon-mat-verified_user"
          size="lg"
        />
      </div>
      <div class="left">
        <div class="text-h6">
          BPJS || JKN
        </div>
        <div class="f-12">
          <span>Pasien Baru JKN / BPJS</span>
        </div>
      </div>
    </div>

    <div class="row items-center">
      <q-btn
        class="glossy q-mr-sm"
        round
        color="primary"
        icon="icon-mat-dvr"
      >
        <q-tooltip
          anchor="bottom middle"
          self="top middle"
          :offset="[10, 10]"
        >
          <strong>Tambah</strong> <em>Pasien Baru</em>
        </q-tooltip>
      </q-btn>
      <q-btn
        class="glossy"
        round
        color="dark"
        icon="icon-mat-dvr"
      >
        <q-tooltip
          anchor="bottom middle"
          self="top middle"
          :offset="[10, 10]"
        >
          <strong>List</strong> <em>Data Pasien</em>
        </q-tooltip>
      </q-btn>
    </div>
  </div>
</template>
