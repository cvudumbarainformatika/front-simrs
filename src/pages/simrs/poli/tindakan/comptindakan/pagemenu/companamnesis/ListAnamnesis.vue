<template>
  <q-card
    flat
    bordered
    square
    class="full-height bg-teal-2"
    style="overflow: hidden;"
  >
    <q-bar
      class="bg-teal text-white z-top"
      style="width: inherit;"
    >
      <div class="f-12">
        Data Anamnesis
      </div>
      <q-space />
      <q-btn
        dense
        size="sm"
        icon="icon-mat-close"
        flat
      />
    </q-bar>
    <q-card-section
      style="padding:0"
      class="full-height"
    >
      <q-scroll-area style="height:calc(100% - 40px);">
        <q-list separator>
          <q-item
            v-for="n in 2"
            :key="n"
          >
            <q-item-section>
              <q-item-label
                lines="2"
                class="f-12"
              >
                <span class="text-weight-bold">Keluhan Utama</span> : ....
              </q-item-label>
              <q-item-label
                lines="2"
              >
                <span class="text-weight-bold">Riwayat Penyakit</span> : ....
              </q-item-label>
              <q-item-label
                lines="2"
              >
                <span class="text-weight-bold">Riwayat Alergi</span> : ....
              </q-item-label>
              <q-item-label
                lines="2"
              >
                <span class="text-weight-bold">Riwayat Pengobatan</span> : ....
              </q-item-label>
            </q-item-section>

            <q-item-section
              side
              top
            >
              <q-btn
                flat
                round
                size="sm"
                icon="icon-mat-edit"
              />
              <q-btn
                flat
                round
                size="sm"
                icon="icon-mat-delete"
                color="negative"
              />
            </q-item-section>
          </q-item>
          <q-separator />
        </q-list>
      </q-scroll-area>
    </q-card-section>
  </q-card>
</template>

<script setup>
// import { useAnamnesis } from 'src/stores/simrs/pelayanan/poli/anamnesis'
// const store = useAnamnesis()
</script>
