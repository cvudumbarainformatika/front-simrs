<template>
  <q-card
    flat
    bordered
    square
    class="full-height"
    style="overflow: hidden;"
  >
    <q-form
      ref="refForm"
      class="full-height"
      @submit="onSubmit"
    >
      <q-card-section class="q-px-md q-py-xs bg-primary text-white">
        <div class="row items-center justify-between">
          <div class="f-12 text-weight-bold">
            Form Pelayanan Cathlab
          </div>
          <div>
            <q-btn
              flat
              dense
              size="md"
              icon="icon-mat-history"
              @click="historyOpen"
            >
              <q-tooltip class="bg-dark text-white">
                {{ tooltip }}
              </q-tooltip>
            </q-btn>
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section
        class="full-height scroll"
      >
        <div
          class="row items-center"
        >
          <div class="col-5">
            <q-select
              label="Tindakan CathLab"
              dense
              outlined
            />
          </div>
          <div class="col-10">
            <q-input label="Keterangan" />
          </div>
        </div>
      </q-card-section>
    </q-form>
  </q-card>
</template>

<script setup>

</script>
