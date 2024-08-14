<template>
  <q-dialog>
    <q-card style="width: 100%">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6 items-center">
          CETAK GELANG PASIEN...???
        </div>
        <q-space />
      </q-card-section>

      <q-separator />

      <q-card-section
        style="width: 100%; height: 100%"
        class="scroll"
      >
        <div
          id="printMe"
          class="full-width"
        >
          <div class="row">
            <div class="col">
              <div class="full-height column flex-center items-center text-white">
                <figure class="qrcode full-width q-pa-xl absolute-center">
                  <vue-qrcode
                    style="margin-top: -55;"
                    :value="patien.norm"
                    tag="svg"
                    :options="{
                      errorCorrectionLevel: 'Q',
                      color: {
                        dark: '#000000',
                        light: '#ffffff',
                      },
                      margin:2
                    }"
                  />
                  <!-- <img
                    class="qrcode__image"
                    src="~assets/logos/logo-rsud.png"
                    alt="Chen Fengyuan"
                  > -->
                </figure>
              </div>
            </div>
            <div class="col text-bold">
              {{ patien.norm }}
              <q-separator />
              <div class="row">
                {{ patien.nama }}
              </div>
              <q-separator />
              <div class="row">
                {{ patien.alamat }}
              </div>
              <q-separator />
              <div class="row">
                {{ patien.kelamin }}
              </div>
              <q-separator />
              <div class="row">
                {{ patien.usia }}
              </div>
              <q-separator />
            </div>
          </div>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn
          v-print="printObj"
          color="orange"
          label="CETAK"
        />
        <q-btn
          v-close-popup
          color="orange"
          label="BATAL"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
defineProps({
  patien: { type: Object, default: () => {} }
})

const printObj = {
  id: 'printMe',
  popTitle: 'RSUD Dr Mohamad Saleh Kota Probolinggo'
}
</script>

<style scoped>
.qrcode {
  display: inline-block;
  font-size: 0;
  margin: 0;
  position: relative;
}

.qrcode__image {
  background-color: #fff;
  border: 0.15rem solid #fff;
  border-radius: 50%;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.25);
  height: 10%;
  left: 50%;
  overflow: hidden;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 10%;
}

</style>
