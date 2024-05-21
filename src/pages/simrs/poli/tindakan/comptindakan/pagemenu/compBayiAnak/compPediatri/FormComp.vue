<template>
  <div>
    <CdcPage v-if="store.bukaCdc" />
    <div v-else class="q-pa-lg">
      <div class="f-12 text-weight-bold">
        Keadaan Umum
      </div>
      <q-separator class="q-my-sm" />
      <div class="row q-col-gutter-xs q-mb-sm">
        <app-input-simrs
          v-model="store.form.bb"
          label="BB / kg"
          class-tambahan="col-2"
          disable
        />
        <app-input-simrs
          v-model="store.form.pb"
          label="PB / cm"
          class-tambahan="col-2"
          disable
        />
        <app-input-simrs
          v-model="store.form.lk"
          label="LK / cm"
          class-tambahan="col-2"
        />
        <app-input-simrs
          v-model="store.form.lila"
          label="LILA / cm"
          class-tambahan="col-2"
        />
        <app-input-simrs
          v-model="store.form.bbi"
          label="BBI"
          class-tambahan="col-2"
          append
          append-icon="icon-mat-visibility"
          @append-click="store.bukaCdc=true"
        />
        <app-input-simrs
          v-model="store.form.bmi"
          label="BMI"
          class-tambahan="col-2"
        />
      </div>
      <div class="f-12 text-weight-bold">
        Anamnesis (Tambahan)
      </div>
      <q-separator class="q-my-sm" />
      <div class="row q-col-gutter-xs">
        <app-input-simrs
          v-model="store.form.riwayatPerinatal"
          label="Riwayat perinatal"
          class-tambahan="col-12"
        />
      </div>
      <div>Riwayat Imunisasi : </div>
      <q-separator />
      <div class="row q-col-gutter-xs q-mb-sm">
        <div class="col-2">
          Imunisasi Dasar
        </div>
        <div class="col-10">
          <div class="flex q-gutter-xs">
            <div>:</div>
            <q-checkbox
              v-for="item in store.imunisasiDasars"
              :key="item"
              v-model="store.form.imunisasiDasar"
              :val="item"
              :label="item"
              dense
              size="xs"
            />
          </div>
        </div>
      </div>
      <div class="row q-col-gutter-xs q-mb-sm">
        <div class="col-2">
          Imunisasi Ulang
        </div>
        <div class="col-10">
          <div class="flex q-gutter-xs">
            <div>:</div>
            <q-checkbox
              v-for="item in store.imunisasiUlangs"
              :key="item"
              v-model="store.form.imunisasiUlang"
              :val="item"
              :label="item"
              dense
              size="xs"
            />
          </div>
        </div>
      </div>
      <div>Kebiasaan Pasien Saat Sakit : </div>
      <q-separator />
      <div class="row q-col-gutter-xs q-mb-xs">
        <div class="col-2">
          Pola Komunikasi
        </div>
        <div class="col-10">
          <div class="flex q-gutter-xs">
            <div>:</div>
            <div class="q-gutter-xs">
              <q-radio
                v-for="item in store.polaKomunikasis"
                :key="item"
                v-model="store.form.polaKomunikasi"
                :val="item"
                :label="item"
                dense
                size="xs"
              />
            </div>
            <div
              v-if="store.form.polaKomunikasi==='Lain-lain'"
              class="full-width"
            >
              <app-input-simrs
                v-model="store.form.polaKomunikasiLain"
                label="Sebutkan"
              />
            </div>
          </div>
        </div>
      </div>
      <div>Pola Makanan : </div>
      <q-separator />
      <div class="row q-col-gutter-xs q-mb-sm">
        <div class="col-2">
          Makanan Pokok
        </div>
        <div class="col-10">
          <div class="flex q-gutter-xs">
            <div>:</div>
            <div class="q-gutter-xs">
              <q-radio
                v-for="item in store.makananPokoks"
                :key="item"
                v-model="store.form.makananPokok"
                :val="item"
                :label="item"
                dense
                size="xs"
              />
            </div>
            <div
              v-if="store.form.makananPokok==='Selain nasi'"
              class="full-width"
            >
              <app-input-simrs
                v-model="store.form.makananPokokLain"
                label="Sebutkan"
              />
            </div>
          </div>
        </div>
      </div>
      <div>Asesment Jatuh : </div>
      <q-separator class="q-my-xs" />
      <div class="row q-col-gutter-xs">
        <app-input-simrs
          v-model="store.form.skorMethodeHumpty"
          label="Methode Humpty Skor"
          class-tambahan="col-6"
        />
        <app-input-simrs
          v-model="store.form.resikoMethodeHumpty"
          label="Resiko"
          class-tambahan="col-6"
        />
      </div>
      <div class="row q-col-gutter-xs">
        <app-input-simrs
          v-model="store.form.skorMorsefallScale"
          label="MorsefallScale Skor"
          class-tambahan="col-6"
        />
        <app-input-simrs
          v-model="store.form.resikoMorsefallScale"
          label="Resiko"
          class-tambahan="col-6"
        />
      </div>
      <div>Asesment Fungsional : </div>
      <q-separator class="q-my-xs" />
      <div class="row q-col-gutter-xs q-mb-sm">
        <div class="col-2">
          Aktivitas Mandiri dan Mobilisasi
        </div>
        <div class="col-10">
          <div class="flex q-gutter-xs">
            <div>:</div>
            <div class="q-gutter-xs">
              <q-radio
                v-for="item in store.mobilisasis"
                :key="item"
                v-model="store.form.mobilisasi"
                :val="item"
                :label="item"
                dense
                size="xs"
              />
            </div>
            <div
              v-if="store.form.mobilisasi==='Perlu bantuan'"
              class="full-width"
            >
              <app-input-simrs
                v-model="store.form.perluBantuan"
                label="Sebutkan"
              />
            </div>
            <div
              v-if="store.form.mobilisasi==='Alat bantu jalan'"
              class="full-width"
            >
              <app-input-simrs
                v-model="store.form.alatBantu"
                label="Sebutkan"
              />
            </div>
          </div>
        </div>
      </div>

      <div>Skreening Gizi : </div>
      <q-separator class="q-my-xs" />

      <table>
        <tr>
          <th width="5%">
            #
          </th>
          <th>
            PARAMETER
          </th>
          <th width="30%">
            FILLED
          </th>
          <th width="5%">
            SKOR
          </th>
        </tr>
        <tr>
          <td>1.</td>
          <td>Apakah Pasien Tampak Kurus ?</td>
          <td>
            <q-option-group
              v-model="store.form.poin1"
              :options="store.points1"
              color="primary"
              inline
              dense
              size="xs"
              @update:model-value="store.setSkorGizi"
            />
          </td>
          <td class="text-center">
            {{ store.form.poin1 }}
          </td>
        </tr>
        <tr>
          <td>2.</td>
          <td>
            <div>Apakah terdapat penurunan BB selama 1 Bulan Terakhir?</div>
            <div class="q-ml-lg">
              - Berdasarkan Penilaian Obyektif
            </div>
            <div class="q-ml-lg">
              - Untuk Bayi kurang dari 1 Tahun BB tidak  naik selama seminggu terakhir
            </div>
          </td>
          <td>
            <q-option-group
              v-model="store.form.poin2"
              :options="store.points2"
              color="primary"
              inline
              dense
              size="xs"
              @update:model-value="store.setSkorGizi"
            />
          </td>
          <td class="text-center">
            {{ store.form.poin2 }}
          </td>
        </tr>

        <tr>
          <td>3.</td>
          <td>
            <div>Apakah terdapat SALAH SATU dari Kondisi Tersebut ? </div>
            <div class="q-ml-lg">
              - Diare >= 5 kali sehari dan atau muntah > 3 kali / hari selama seminggu terakhir
            </div>
            <div class="q-ml-lg">
              - Asupan makanan berkurang selama seminggu terakhir
            </div>
          </td>
          <td>
            <q-option-group
              v-model="store.form.poin3"
              :options="store.points3"
              color="primary"
              inline
              dense
              size="xs"
              @update:model-value="store.setSkorGizi"
            />
          </td>
          <td class="text-center">
            {{ store.form.poin3 }}
          </td>
        </tr>

        <tr>
          <td>4.</td>
          <td>
            <div>Apakah terdapat penyakit atau keadaan yg mengakibatkan pasien beresiko mengalamai malnutrisi ?</div>
            <div class="q-ml-lg">
              - Berdasarkan Penilaian Obyektif
            </div>
            <div class="q-ml-lg">
              (Penyakit Diare kronis HIV, PJB, hepato, ginjal, stoma dan lain-lain)
            </div>
          </td>
          <td>
            <q-option-group
              v-model="store.form.poin4"
              :options="store.points4"
              color="primary"
              inline
              dense
              size="xs"
              @update:model-value="store.setSkorGizi"
            />
          </td>
          <td class="text-center">
            {{ store.form.poin4 }}
          </td>
        </tr>
        <tr>
          <td
            colspan="3"
            class="text-right"
          >
            Jumlah
          </td>
          <td class="text-weight-bold text-center">
            {{ store.form.skorGizi }}
          </td>
        </tr>
        <tr>
          <td
            class="text-weight-bold text-center"
            colspan="4"
          >
            <em>Kesimpulan : </em> <span>{{ store.kesimpulanSkreeningGizi }}</span>
          </td>
        </tr>
      </table>

      <q-separator class="q-my-sm" />
      <div class="q-gutter-xs">
        <app-input-simrs
          v-model="store.form.kriteriaHasil"
          label="Kriteria Hasil"
        />
        <app-input-simrs
          v-model="store.form.implementasi"
          label="Implementasi"
        />
        <app-input-simrs
          v-model="store.form.evaluasi"
          label="Evaluasi"
        />
        <app-input-simrs
          v-model="store.form.catatanKie"
          label="Catatan KIE"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import CdcPage from './CdcPage.vue'
import { usePediatriStore } from 'src/stores/simrs/pelayanan/poli/pediatri'
// import { ref } from 'vue'
const store = usePediatriStore()

</script>

<style lang="scss" scoped>
table {
  border-collapse: collapse;
  width: 100%;
}
table, th, td {
  border: 1px solid $grey;
  padding: 2px 5px;
}

</style>
