<template>
  <div class="q-pa-md">
    <q-dialog
      v-model="store.dialogRinci"
      persistent
      full-width
      backdrop-filter="blur(4px)"
      transition-show="jump-up"
      transition-hide="scale"
    >
      <q-card style="min-width:50vw;">
        <q-card-section class="row items-center">
          <div class="column">
            <div class="f-14 text-weight-bold">
              RINCIAN JURNAL
            </div>
            <div class="f-10">
              Rincian Posting Jurnal
            </div>
          </div>
          <q-space />
          <q-btn
            v-close-popup
            icon="icon-mat-clear"
            flat
            round
            dense
          />
        </q-card-section>
        <q-separator />
        <q-card-section class="q-pa-sm full-width">
          <div class="col-auto text-weight-bold">
            <div class="row q-col-gutter-md full-width">
              <div class="col-auto">
                <div class="q-py-xs">
                  No. Transaksi
                </div>
                <div>
                  Kegiatan BLUD
                </div>
                <div class="q-py-xs">
                  Keterangan
                </div>
              </div>
              <div class="col full-width">
                <div class="q-py-xs">
                  : {{ store.rinci.notrans }}
                </div>
                <div>
                  : {{ store.rinci.kegiatan }}
                </div>
                <div class="q-py-xs">
                  : {{ store.rinci.keterangan }}
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <div class="row">
            <div class="full-width">
              <q-markup-table
                flat bordered
                :separator="separator"
                :loading="store.loading"
              >
                <thead>
                  <tr class="bg-dark text-white max-width">
                    <th>KODE</th>
                    <th>URAIAN</th>
                    <th>DEBIT (Rp.)</th>
                    <th>KREDIT (Rp.)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div v-for="it in store.rinci.kode" :key="it">
                        <div class="q-py-sm">
                          {{ it }}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div v-for="it in store.rinci.uraian" :key="it">
                        <div class="q-py-sm">
                          {{ it }}
                        </div>
                      </div>
                    </td>
                    <td class="text-right">
                      <div v-for="it in store.rinci.debit" :key="it">
                        <div class="q-py-sm">
                          {{ formattanpaRp(it) }}
                        </div>
                      </div>
                    </td>
                    <td class="text-right">
                      <div v-for="it in store.rinci.kredit" :key="it">
                        <div class="q-py-sm">
                          {{ formattanpaRp(it) }}
                        </div>
                      </div>
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
                        {{ formattanpaRp(store?.totaldebit) }}
                      </q-badge></span>
                    </td>
                    <td class="text-right text-weight-bold">
                      <span><q-badge color="teal">
                        {{ formattanpaRp(store?.totalkredit) }}
                      </q-badge></span>
                    </td>
                  </tr>
                </tbody>
              </q-markup-table>
            </div>
          </div>
          <div class="row q-pt-md flex-center full-width">
            <template v-if="store.rinci?.verif === null">
              <q-btn
                size="sm"
                color="light-green-8"
                icon="icon-mat-done"
                :loading="store.loadingverif"
                @click="store.verifPosting(store?.rinci,store?.totaldebit,store?.totalkredit)"
              >
                <div class="q-pl-sm">
                  Posting
                </div>
              </q-btn>
            </template>
            <template v-else>
              <q-btn
                size="sm"
                color="teal-8"
                icon="icon-mat-done_all"
              >
                <div class="q-pl-sm">
                  Sudah Terposting
                </div>
              </q-btn>
            </template>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>

  <!-- <dialog-rinci-jurnal
    v-model="store.dialogRinciJurnal"
  /> -->
</template>
<script setup>

// eslint-disable-next-line no-unused-vars
import { formattanpaRp } from 'src/modules/formatter'
import { postingJurnal } from 'src/stores/siasik/akuntansi/jurnal/postingjurnal'
import { ref } from 'vue'

// const DialogRinciJurnal = defineAsyncComponent(() => import('../../registerjurnal/inpage/DialogRincijurnal.vue'))
const store = postingJurnal()
const separator = ref('cell')

// function openRinci (val) {
//   console.log('notrans', val)
//   store.dialogRinci = true
//   store.form.notrans = val?.notrans
//   store.form.keterangan = val?.keterangan
//   store.form.kegiatanblud = val?.kegiatan
//   store.form.tanggal = val?.tanggal
//   store.form.debit = [
//     val?.debit,
//     val?.kredit,
//     val?.debit_1,
//     val?.kredit_1,
//     val?.debit_2,
//     val?.kredit_2,
//     val?.d_pjk,
//     val?.k_pjk,
//     val?.d_pjk1,
//     val?.k_pjk1
//   ]
//   console.log('koderekening', store.form.koderek)
// }
</script>
