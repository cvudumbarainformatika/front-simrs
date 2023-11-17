<template>
  <q-card
    flat
    bordered
    square
    class="full-height"
  >
    <div class="full-height column">
      <div class="col-auto bg-primary text-white">
        <q-bar>
          <div>Form Sharing Biaya</div>
        </q-bar>
      </div>
      <div class="col full-height">
        <q-form
          ref="refForm"
          class="q-pa-sm full-height"
          @submit="onSubmit"
        >
          <q-card-section
            class="full-height scroll"
          >
            <div class="row q-col-gutter-md q-mb-sm items-center">
              <div class="col-4">
                Tindakan Yang Disharing
              </div>
              <div class="col-8">
                option
              </div>
            </div>
            <div class="row q-col-gutter-md q-mb-sm items-center">
              <div class="col-4">
                Tagihan Pasien
              </div>
              <div class="col-8">
                <app-input
                  label="Tagihan"
                  outlined
                />
              </div>
            </div>
            <div class="row q-col-gutter-md q-mb-sm items-center">
              <div class="col-4">
                Keterangan
              </div>
              <div class="col-8">
                <app-input
                  label="Keterangan"
                  outlined
                />
              </div>
            </div>
          </q-card-section>
        </q-form>
      </div>
    </div>
  </q-card>
</template>
