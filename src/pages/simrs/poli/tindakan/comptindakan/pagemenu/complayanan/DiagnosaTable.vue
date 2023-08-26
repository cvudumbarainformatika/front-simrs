<template>
  <q-card
    flat
    square
    bordered
    class="column full-height"
  >
    <div class="col-auto">
      <q-bar
        class="bg-teal text-white"
      >
        <div class="f-12 q-pa-xs">
          Table Diagnosa
        </div>
      </q-bar>
    </div>
    <div class="col-grow">
      <div class="full-height">
        <q-scroll-area style="height:calc(100% - 1px)">
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
                  <span class="">Diagnosa</span> : ....
                </q-item-label>
                <q-item-label
                  lines="2"
                >
                  <span class="">Keterangan</span> : ....
                </q-item-label>
                <q-item-label
                  lines="2"
                >
                  <span class="">Kasus Baru?</span> : ....
                </q-item-label>
                <q-item-label
                  lines="2"
                >
                  <span class="">Diagnosa Utama?</span> : ....
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
      </div>

      <!-- </q-scroll-area> -->
    </div>
  </q-card>
</template>

<script setup>

</script>
