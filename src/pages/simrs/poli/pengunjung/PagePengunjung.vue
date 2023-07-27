<script setup>
// import { useStyledStore } from 'src/stores/app/styled'

// const style = useStyledStore()
</script>

<template>
  <q-page
    ref="pageRef"
    class="column full-height full-width"
  >
    <div class="col-auto">
      <div>
        <q-header elevated>
          <q-toolbar>
            <!-- <q-btn
            flat
            round
            dense
            icon="icon-mat-menu"
            class="q-mr-sm"
          /> -->
            <!-- <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar> -->

            <q-toolbar-title>
              <div class="f-14 ">
                My Pasien
              </div>
              <div class="f-10">
                Daftar Pengunjung di Ruangan Ini
              </div>
            </q-toolbar-title>

            <q-btn
              flat
              round
              dense
              icon="icon-mat-menu"
            />
          </q-toolbar>
        </q-header>
      </div>
    </div>
    <div class="col-grow bg-teal">
      <div>asdas</div>
    </div>
  </q-page>
</template>
