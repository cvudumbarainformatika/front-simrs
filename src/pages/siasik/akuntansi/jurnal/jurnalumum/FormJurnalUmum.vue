<!-- eslint-disable vue/valid-v-slot -->
<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog
      v-model="store.dialog"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="full-width">
        <q-bar class="text-white bg-primary">
          <q-space />

          <q-btn dense flat icon="icon-mat-close" v-close-popup>
            <q-tooltip class="bg-white text-dark">
              Close
            </q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <div class="text-h6 text-center text-weight-bold">
            <q-badge color="red" class="text-h6 text-center">
              No. Bukti:   {{ store?.form?.nobukti }}
            </q-badge>
          </div>
        </q-card-section>

        <q-form
          ref="refForm"
          class="full-height"
          @submit="onSubmit"
        >
          <q-card-section class="q-pt-none">
            <div class="container q-pa-md">
              <q-card class="items-center  q-pa-md full-width">
                <div class="row q-col-gutter-sm">
                  <div class="col-5">
                    <app-input-date-human
                      ref="reftanggal"
                      :model="store.tanggal"
                      label="Tanggal"
                      outlined
                      standout="bg-yellow-3"
                      :disable="store.form.nobukti !== '' "
                      :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
                      @db-model="tanggal"
                      @set-display="setTanggal"
                    />
                  </div>
                  <div class="col-6">
                    <q-input
                      ref="refketerangan"
                      v-model="store.form.keterangan"
                      label="Keterangan"
                      outlined
                      dense
                      standout="bg-yellow-3"
                      :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
                      :disable="store.form.nobukti !== '' "
                    />
                  </div>
                  <div
                    class="col-1" v-if="store?.flagVerif !== '1'"
                  >
                    <q-btn type="submit" rounded color="primary" class="items-center" :loading="store.loadingverif" size="sm">
                      <q-icon left size="3em" name="icon-mat-add" />
                      <q-tooltip class="bg-red text-white">
                        Input Rincian
                      </q-tooltip>
                    </q-btn>
                  </div>
                </div>
              </q-card>
            </div>
            <div class="container q-px-md">
              <q-card class="items-center bg-white q-pa-xl full-width" v-if="store.loading === true">
                <q-item>
                  <q-item-section avatar>
                    <q-skeleton type="QAvatar" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>
                      <q-skeleton type="text" />
                    </q-item-label>
                    <q-item-label caption>
                      <q-skeleton type="text" />
                    </q-item-label>
                  </q-item-section>
                </q-item>

                <q-skeleton height="200px" square />

                <q-card-actions align="right" class="q-gutter-md">
                  <q-skeleton type="QBtn" />
                  <q-skeleton type="QBtn" />
                </q-card-actions>
              </q-card>
              <q-card class="items-center bg-white q-pa-xl full-width" v-else>
                <div class="row flex-center">
                  <div
                    class="col" v-for="(item , n) in store?.transall"
                    :key="n"
                  >
                    <q-markup-table class="full-width" :separator="separator" flat bordered>
                      <thead>
                        <tr class="bg-primary text-white items-center">
                          <th class="text-weight-bold text-white">
                            Kode Rekening 50
                          </th>
                          <th class="text-weight-bold text-white">
                            Uraian  Rekening 50
                          </th>
                          <th class="text-weight-bold text-white">
                            Debet
                          </th>
                          <th class="text-weight-bold text-white">
                            Kredit
                          </th>
                          <th class="text-weight-bold text-white">
                            Aksi
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(rincian , x) in item?.rincianjurnalumum"
                          :key="x"
                          class="list-move"
                        >
                          <td>
                            <span><q-badge outline color="indigo">{{ rincian?.kodepsap13 }}</q-badge></span>
                          </td>
                          <td>
                            <span>{{ rincian?.uraianpsap13 }}</span>
                          </td>
                          <td class="text-right">
                            <span v-if="rincian?.debet !== '0.00'">
                              <q-badge color="red-5">{{ formatRpDouble(rincian?.debet,2) }}</q-badge>
                            </span>
                          </td>
                          <td class="text-right">
                            <span v-if="rincian?.kredit !== '0.00'">
                              <q-badge color="teal">  {{ formatRpDouble(rincian?.kredit,2) }} </q-badge>
                            </span>
                          </td>
                          <td class="text-right">
                            <span
                              v-if="item?.verif !== '1'"
                            >
                              <q-btn rounded color="red" class="items-center" size="sm" :loading="store.loadingverif" @click="store.hapusrincians(rincian)">
                                <q-icon left size="1em" name="icon-mat-delete" />
                                <q-tooltip class="bg-primary text-white">
                                  Hapus
                                </q-tooltip>
                              </q-btn> </span>
                          </td>
                        </tr>
                        <tr>
                          <td colspan="2" class="text-right">
                            <q-badge outline color="indigo">
                              SUBTOTAL
                            </q-badge>
                          </td>
                          <td class="text-right text-weight-bold">
                            <span><q-badge color="red-5">
                              {{ formatRpDouble(store?.totalrincid,2) }}
                            </q-badge></span>
                          </td>
                          <td class="text-right text-weight-bold">
                            <span><q-badge color="teal">
                              {{ formatRpDouble(store?.totalrincik,2) }}
                            </q-badge></span>
                          </td>
                          <td class="text-lefth text-weight-bold">
                            <span v-if="item.verif === ''"><q-btn label="Verif" color="primary" :loading="store.loadingverif" rounded dense @click="store.VerifData(item?.nobukti,store?.totalrincid,store?.totalrincik)" /></span>
                            <span v-else><q-badge rounded color="indigo">Sudah Terverif</q-badge></span>
                          </td>
                        </tr>
                      </tbody>
                    </q-markup-table>
                  </div>
                </div>
              </q-card>
            </div>
          </q-card-section>
        </q-form>
      </q-card>
      <form-rincian-jurnal-umum />
    </q-dialog>
  </div>
</template>
<script setup>
import { usejurnalumummanual } from 'src/stores/siasik/akuntansi/jurnal/umummanual'
// eslint-disable-next-line no-unused-vars
import { onBeforeMount, onBeforeUnmount, onMounted, ref } from 'vue'
import FormRincianJurnalUmum from './FormRincianJurnalUmum.vue'
import { formatRpDouble } from 'src/modules/formatter'

const maximizedToggle = ref(true)
const store = usejurnalumummanual()
const separator = ref('cell')

const refForm = ref(null)
const reftanggal = ref(null)
const refketerangan = ref(null)
// const model = ref(null)

function tanggal (val) {
  store.form.tanggal = val
}
function setTanggal (val) {
  store.tanggal = val
}

function onSubmit () {
  store.fixed = true
}

onMounted(() => {
  store.getRekenining50()
})

// function resetclose () {
//   store.form.nobukti = ''
//   store.form.keterangan = ''
//   store.flagVerif = ''
//   store.transall = []
// }
// onBeforeUnmount(() => {
//   console.log('jalan')
//   store.form.nobukti = ''
//   store.form.keterangan = ''
//   store.flagVerif = ''
//   store.transall = []
// })

// function setTo (val) {
//   console.log('sa', val)
//   store.form.tanggal = val
// }

// function setToDisp (vaal) {
//   store.tanggal = vaal
// }
</script>
