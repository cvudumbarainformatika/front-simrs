<template>
  <div
    class="q-pt-lg bg-primary "
  >
    <div class="full-width q-mt-lg text-white">
      <div class="container-padding">
        <div class="q-py-lg">
          <div class="row">
            <div class="col-12 col-md-4">
              <div class="column">
                <div class="text-h5 text-weight-bold">
                  {{ store.header.title }}
                </div>
                <div class="f-12">
                  {{ store.header.alamat }}
                </div>
              </div>
              <div class="q-py-lg">
                <q-btn
                  dense
                  flat
                  icon="ti-facebook"
                  size="lg"
                  :href="store.header.link_fb"
                  target="_blank"
                />
                <q-btn
                  dense
                  flat
                  icon="ti-instagram"
                  size="lg"
                  :href="store.header.link_instagram"
                  target="_blank"
                />
                <q-btn
                  dense
                  flat
                  icon="ti-youtube"
                  size="lg"
                  :href="store.header.link_youtube"
                  target="_blank"
                />
              </div>
            </div>
            <div class="col-12 col-md-4">
              <div class="column">
                <div class="text-h5 bold q-mb-lg">
                  HUBUNGI KAMI :
                </div>
                <div class="column">
                  <div class="q-pr-md row text-center f-12 q-mb-sm">
                    <q-icon
                      name="call"
                      class="q-pr-sm"
                      size="14px"
                    /> <span>{{ store.header.phone }}</span>
                  </div>
                  <div class="q-pr-md row text-center f-12 q-mb-sm">
                    <q-icon
                      name="email"
                      class="q-pr-sm"
                      size="14px"
                    /> <span>{{ store.header.email }}</span>
                  </div>
                  <div
                    class="q-pr-md row text-center f-12 q-mb-sm cursor-pointer"
                    @click="goToLink(store.header.link_map)"
                  >
                    <q-icon
                      name="place"
                      class="q-pr-sm"
                      size="14px"
                    /> <span>lihat lokasi</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-4">
              <div class="column">
                <div class="text-h5 bold q-mb-lg text-right">
                  LINK TERKAIT :
                </div>
                <!-- <div class="row"> -->
                <div
                  class="text-right f-12 q-mb-sm cursor-pointer"
                  @click="goToLink('https://probolinggokota.go.id')"
                >
                  <span>probolinggokota.com</span>
                </div>
                <div class="q-pr-md row text-center f-12 q-mb-sm">
                  <!-- <span>www.app.blblba.com</span> -->
                </div>
                <!-- <div class="q-pr-md row text-center f-16 q-mb-sm">  <span>diterbitkan tanggal 20 mei 1989</span></div> -->
                <!-- </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useAppStore } from 'src/stores/app'

const store = useAppStore()

function goToLink(val) {
  window.open(val, '_blank')
}

</script>
