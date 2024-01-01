<template>
  <div class="bg-white full-height column">
    <div class="col-auto bg-primary text-white">
      <div class="q-pa-sm">
        Form Resep Dokter
      </div>
    </div>
    <div class="col full-height relative-position">
      <q-scroll-area
        style="height: calc( 100% ); padding-bottom: 60px;"
      >
        <q-list
          separator
          bordered
        >
          <!-- Header nya -->
          <q-item
            class="bg-dark text-white"
          >
            <q-item-section style="width: 50%;">
              NAMA OBAT
            </q-item-section>
            <q-item-section
              side
              style="width:50%"
            >
              <div class="text-white row items-center q-col-gutter-sm full-width">
                <div
                  class="text-right col-2"
                >
                  Jumlah
                </div>
                <div
                  class="col-3 text-right"
                >
                  Atr Pakai
                </div>
                <div
                  class="col text-right"
                >
                  Keterangan
                </div>
              </div>
            </q-item-section>
          </q-item>
          <!-- Inputan -->
          <q-item>
            <q-item-section style="width: 50%;">
              <q-input
                placeholder="Cari Obat / tekan Ctrl + Enter untuk racikan"
                dense
                standout="bg-yellow-3"
                outlined
                class="full-width"
                @keyup.alt.enter="racikan"
              >
                <template #prepend>
                  <q-icon name="icon-mat-search" />
                </template>
              </q-input>
            </q-item-section>
            <q-item-section
              side
              style="width:50%"
            >
              <div class="text-white row items-center q-col-gutter-sm full-width">
                <div
                  class="text-right col-2"
                >
                  <q-input
                    placeholder="Qty"
                    dense
                    standout="bg-yellow-3"
                    outlined
                  />
                </div>
                <div
                  class="col-4 text-right"
                >
                  <q-input
                    placeholder="Aturan Pakai"
                    dense
                    standout="bg-yellow-3"
                    outlined
                  />
                </div>
                <div
                  class="col text-right"
                >
                  <q-input
                    placeholder="Keterangan"
                    dense
                    standout="bg-yellow-3"
                    outlined
                    class="full-width"
                  />
                </div>
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
      <div class="absolute-bottom q-pa-sm bg-yellow-3 row items-center justify-between">
        <div class="q-gutter-sm">
          <q-btn color="dark">
            Simpan Resep
          </q-btn>
          <q-btn color="negative">
            Reset Resep
          </q-btn>
        </div>
        <div>
          <q-btn color="primary">
            Kirim Resep
          </q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
function racikan() {
  console.log('ok')
  alert('oooi')
}
</script>
