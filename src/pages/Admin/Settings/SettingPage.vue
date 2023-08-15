<template>
  <q-page class="q-pa-lg">
    <div class="title-page q-mb-md">
      <div class="text-h6">
        Setting Website
      </div>
      <div class="f-12">
        Setting logo, title, header, contact dll
      </div>
    </div>
    <q-card>
      <q-card-section>
        <q-form
          @on-submit="onSubmit"
          @on-reset="onReset"
        >
          <div class="row q-col-gutter-md">
            <div class="col-md-4 col-xs-12 gt-sm">
              <div class="f-12 text-weight-bold">
                Title Header
              </div>
              <div class="f-12 text-grey-7">
                title / judul website, letak:disamping logo header
              </div>
            </div>
            <div class="col-md-8 col-xs-12">
              <app-input label="title *" />
            </div>
            <!--  -->
            <div class="col-md-4 col-xs-12 gt-sm">
              <div class="f-12 text-weight-bold">
                Deskripsi
              </div>
              <div class="f-12 text-grey-7">
                tulis deskripsi websitemu, letak: dibawah title
              </div>
            </div>
            <div class="col-md-8 col-xs-12">
              <app-input label="deskripsi" />
            </div>
            <!--  -->
            <div class="col-md-4 col-xs-12 gt-sm">
              <div class="f-12 text-weight-bold">
                Telp / Contact
              </div>
              <div class="f-12 text-grey-7">
                no telp atau contact customer support
              </div>
            </div>
            <div class="col-md-8 col-xs-12">
              <app-input label="telp" />
            </div>
            <!--  -->
            <div class="col-md-4 col-xs-12 gt-sm">
              <div class="f-12 text-weight-bold">
                Link Facebook
              </div>
              <div class="f-12 text-grey-7">
                terhubung ke facebook kamu
              </div>
            </div>
            <div class="col-md-8 col-xs-12">
              <app-input label="facebook" />
            </div>
            <!--  -->
            <div class="col-md-4 col-xs-12 gt-sm">
              <div class="f-12 text-weight-bold">
                Link Instagram
              </div>
              <div class="f-12 text-grey-7">
                terhubung ke instagram kamu
              </div>
            </div>
            <div class="col-md-8 col-xs-12">
              <app-input label="instagram" />
            </div>
            <!--  -->
            <div class="col-md-4 col-xs-12 gt-sm">
              <div class="f-12 text-weight-bold">
                Link Youtube
              </div>
              <div class="f-12 text-grey-7">
                terhubung ke channel youtube kamu
              </div>
            </div>
            <div class="col-md-8 col-xs-12">
              <app-input label="youtube" />
            </div>
          </div>
          <!--  -->
          <q-separator class="q-my-md" />
          <!--  -->
          <div class="row q-col-gutter-md">
            <div class="col-md-4 col-xs-12 gt-sm">
              <div class="f-12 text-weight-bold">
                Logo
              </div>
              <div class="f-12 text-grey-7">
                logo website
              </div>
            </div>
            <div class="col-md-8 col-xs-12">
              <q-avatar
                size="100px"
              >
                <img src="https://cdn.quasar.dev/img/avatar.png">
              </q-avatar>
            </div>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>

function onSubmit() {

}
function onReset() {

}
</script>

<style lang="scss" scoped>

</style>
