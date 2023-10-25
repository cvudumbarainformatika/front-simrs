<template>
  <q-dialog full-width>
    <q-card
      class="itu"
    >
      <q-card-section>
        <div class="f-14 text-weight-bold">
          Form Input
        </div>
        <div class="title-desc">
          Input Pegawai Tidak Hadir
        </div>
      </q-card-section>
      <q-card-section>
        <div class="row q-col-gutter-sm items-center q-mb-sm">
          <div class="col-sm-4 col-xs-12">
            Cari Nama Pegawai
          </div>
          <div class="col-sm-8 col-xs-12">
            <app-autocomplete-debounce-input
              v-model="store.form.user_id"
              label="cari pegawai terdaftar"
              autocomplete="nama"
              option-label="nama"
              option-value="id"
              :source="store.users"
              :loading="store.loading"
              @buang="store.searchUser"
            />
          </div>
        </div>
        <div class="row q-col-gutter-sm items-center q-mb-sm">
          <div class="col-sm-4 col-xs-12">
            Tanggal
          </div>
          <div class="col-sm-2 col-xs-1">
            <div class="row">
              <q-radio
                v-model="store.rangeDay"
                val="sehari"
                dense
                label="sehari"
                @update:model-value="store.setRangeDay"
              />
            </div>
            <div class="row">
              <q-radio
                v-model="store.rangeDay"
                val="lebih"
                dense
                label="Lebih dari Sehari"
                @update:model-value="store.setRangeDay"
              />
            </div>
          </div>
          <div class="col-sm-1 col-xs-1">
            <q-btn
              icon="icon-mat-event"
              round
              dense
              color="primary"
            >
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
                @show="updateProxy"
              >
                <div v-if="store.rangeDay==='sehari'">
                  <q-date
                    ref="refDate"
                    v-model="store.form.tanggal"
                    mask="YYYY-MM-DD"
                  >
                    <div class="row items-center justify-end q-gutter-sm">
                      <q-btn
                        v-close-popup
                        label="Cancel"
                        color="dark"
                        flat
                      />
                      <q-btn
                        v-close-popup
                        label="OK"
                        color="primary"
                        flat
                      />
                    <!-- @click="save" -->
                    </div>
                  </q-date>
                </div>
                <div v-if="store.rangeDay==='lebih'">
                  <q-date
                    ref="refDate"
                    v-model="store.form.tanggals"
                    multiple
                    mask="YYYY-MM-DD"
                  >
                    <div class="row items-center justify-end q-gutter-sm">
                      <q-btn
                        v-close-popup
                        label="Cancel"
                        color="dark"
                        flat
                      />
                      <q-btn
                        v-close-popup
                        label="OK"
                        color="primary"
                        flat
                      />
                    <!-- @click="save" -->
                    </div>
                  </q-date>
                </div>
              </q-popup-proxy>
            </q-btn>
          </div>
          <div
            v-if="store.rangeDay==='sehari'"
            class="col-sm-5 col-xs-11"
          >
            {{ dateFullFormat( store.form.tanggal) }}
          </div>
          <div
            v-if="store.rangeDay==='lebih'"
            class="col-sm-5 col-xs-11"
          >
            <!-- {{ store.form.tanggals }} -->
            <div class="row">
              <div
                v-for="(tanggal,i) in store.form.tanggals"
                :key="i"
              >
                <div v-if="i%2===0">
                  {{ dateFullFormat( tanggal) }}
                </div>

                <div v-else>
                  , {{ dateFullFormat( tanggal) }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row q-col-gutter-sm items-center q-mb-sm">
          <div class="col-sm-4 col-xs-12">
            Tipe tidak hadir
          </div>
          <div class="col-sm-8 col-xs-12">
            <app-autocomplete-new
              v-model="store.form.flag"
              label="cari tipe"
              autocomplete="nama"
              option-label="nama"
              option-value="value"
              :source="store.flags"
              :loading="store.loading"
            />
            <!-- @input-value="store.searchUser" -->
          </div>
        </div>
        <div class="row q-col-gutter-sm items-center q-mb-sm">
          <div class="col-sm-4 col-xs-12">
            Alasan
          </div>
          <div class="col-sm-8 col-xs-12">
            <app-input
              v-model="store.form.alasan"
              label="alasan"
              valid
              :loading="store.loading"
            />
            <!-- @input-value="store.searchUser" -->
          </div>
        </div>
        <div class="row q-col-gutter-sm items-center q-mb-sm">
          <div class="col-sm-4 col-xs-12">
            Foto
          </div>
          <div class="col-sm-8 col-xs-12">
            <q-img
              :src="imgUrl"
              class="cursor-pointer"
              @click="imgClick()"
            />
            <q-file
              ref="fileRef"
              v-model="store.form.image"
              filled
              dense
              label="Gambar Thumbnail"
              accept=".pdf,image/*"
              class="q-mb-md"
              @update:model-value="simpanGambar"
            />
          </div>
        </div>
        <div class="text-right">
          <app-btn
            type="reset"
            color="dark"
            label="Cancel"
            class="q-mr-md"
            @click="onCancel"
          />
          <app-btn
            label="Simpan"
            :loading="store.loading"
            @click="onSimpan"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref } from 'vue'
import { dateFullFormat } from 'src/modules/formatter'
import { useLiburAbsenStore } from 'src/stores/simrs/pegawai/user/libur/libur'
import { date } from 'quasar'
import { pathImg } from 'src/boot/axios'

const store = useLiburAbsenStore()
const proxyDate = ref(null)
const refDate = ref(null)
const updateProxy = () => {
  console.log('date', refDate.value)
  refDate.value.setToday()
  proxyDate.value = store.form.tanggal ? store.form.tanggal : date.formatDate(Date.now(), 'YYYY/MM/DD')
  store.setForm('tanggal', proxyDate.value)
}

const fileRef = ref(null)
// const tempImg = ref(null)

function imgClick () {
  fileRef.value.pickFiles()
  // console.log('ambil')
}
const imgUrl = ref(store.form.image ? (pathImg + store.form.image) : new URL('../../../../../assets/images/no-image.png', import.meta.url).href)
// watch(() => store.form, (apem) => {
//   // console.log('watch apem', apem)
//   if (apem) {
//     imgUrl.value = apem.image !== null || apem.image !== undefined ? (pathImg + apem.image) : new URL('../../../../../assets/images/no-image.png', import.meta.url).href
//   } else {
//     imgUrl.value = new URL('../../../../../assets/images/no-image.png', import.meta.url).href
//   }
// })
const simpanGambar = () => {
  imgUrl.value = URL.createObjectURL(store.form.image)
}

const onCancel = () => {
  store.setOpen()
}
const onSimpan = () => {
  store.toSaveForm()
}
</script>
<style lang="scss" scoped>
.itu{
  width: 65vw !important;
}
</style>
