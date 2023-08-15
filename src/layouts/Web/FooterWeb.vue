<template>
  <div class="q-pt-lg">
    <div class="full-width q-mt-lg text-white">
      <div class="container-padding">
        <div class="q-py-lg">
          <div class="row">
            <div class="col-12 col-md-4">
              <div class="column">
                <div class="text-h5 text-weight-bold">
                  PP ZAINUL ISHLAH
                </div>
                <div class="f-16">
                  Jl. Listrikan no.44 Kota Probolinggo
                </div>
              </div>
              <div class="q-py-lg">
                <q-btn
                  dense
                  flat
                  icon="ti-facebook"
                  size="lg"
                  href="https://www.facebook.com"
                  target="_blank"
                />
                <q-btn
                  dense
                  flat
                  icon="ti-instagram"
                  size="lg"
                  href="https://www.instagram.com"
                  target="_blank"
                />
                <q-btn
                  dense
                  flat
                  icon="ti-youtube"
                  size="lg"
                  href="https://www.youtube.com"
                  target="_blank"
                />
              </div>
            </div>
            <div class="col-12 col-md-4">
              <div class="column">
                <div class="text-h5 bold q-mb-lg">
                  KONTAK
                </div>
                <div class="row">
                  <div class="q-pr-md row text-center f-16 q-mb-sm">
                    <q-icon
                      name="call"
                      class="q-pr-sm"
                      size="20px"
                    /> <span>081237660656</span>
                  </div>
                  <div class="q-pr-md row text-center f-16 q-mb-sm">
                    <q-icon
                      name="email"
                      class="q-pr-sm"
                      size="20px"
                    /> <span>mazainulishlahzaish@gmail.com</span>
                  </div>
                  <div
                    class="q-pr-md row text-center f-16 q-mb-sm c-p"
                    @click="goToMap"
                  >
                    <q-icon
                      name="place"
                      class="q-pr-sm"
                      size="20px"
                    /> <span>Lihat di Peta</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-4">
              <div class="column">
                <div class="text-h5 bold q-mb-lg">
                  LINK TERKAIT
                </div>
                <div class="row">
                  <div class="q-pr-md row text-center f-16 q-mb-sm">
                    <span>www.blbblba.com</span>
                  </div>
                  <div class="q-pr-md row text-center f-16 q-mb-sm">
                    <span>www.app.blblba.com</span>
                  </div>
                  <!-- <div class="q-pr-md row text-center f-16 q-mb-sm">  <span>diterbitkan tanggal 20 mei 1989</span></div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>

function goToMap() {
  window.open('https://goo.gl/maps/BoSVGuESqtakgyiq5', '_blank')
}

</script>
