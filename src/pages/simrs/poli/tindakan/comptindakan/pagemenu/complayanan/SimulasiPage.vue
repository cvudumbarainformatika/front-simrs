<template>
  <q-card
    flat
    square
    bordered
    class="column full-height"
    dark
  >
    <div class="col-auto">
      <q-bar
        class="bg-black text-white"
      >
        <div class="f-12 q-pa-xs">
          Simulasi InaCBG (Preview)
        </div>
      </q-bar>
    </div>
    <div class="col-grow">
      <div class="full-height">
        <q-scroll-area style="height:calc(100%)">
          <q-card-section>
            <div class="row justify-between">
              <div class="text-caption">
                Code InaCBG
              </div>
              <div class="text-subtitle2 text-orange">
                X-0
              </div>
            </div>
          </q-card-section>
          <q-separator dark />
          <q-card-section>
            <div class="row justify-between">
              <div class="text-subtitle1">
                Tarif InaCBG
              </div>
              <div class="text-subtitle1 text-orange">
                Rp. 200.000
              </div>
            </div>
          </q-card-section>
          <q-separator dark />
          <q-card-section>
            <div class="row justify-between">
              <div class="text-subtitle1">
                Tarif Rumah Sakit
              </div>
              <div class="text-subtitle1 text-orange">
                Rp. 200.000
              </div>
            </div>
          </q-card-section>
          <q-separator dark />
          <q-card-section class="bg-primary">
            <div class="row justify-between">
              <div class="text-subtitle1">
                Selisih
              </div>
              <div class="text-subtitle1 text-white">
                Rp. 0
              </div>
            </div>
          </q-card-section>
        </q-scroll-area>
      </div>
    </div>
  </q-card>
</template>
