<template>
  <div class="q-pa-lg">
    <div class="column q-gutter-xs">
      <app-input-simrs
        v-model="store.form.operasi"
        label="Operasi yang pernah dialami"
        style="width:80%"
      />
      <app-input-simrs
        v-model="store.form.gemeli"
        label="Faktor Keturunan Gemeli"
        style="width:80%"
      />
      <div><b>Riwayat Obsetri</b></div>
      <q-separator />
      <table>
        <thead>
          <tr>
            <th width="3%">
              No
            </th>
            <th width="3%">
              P/L
            </th>
            <th width="10%">
              Umur Anak
            </th>
            <th>K/U Anak</th>
            <th>BBL</th>
            <th>Riwayat Kehamilan</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>a</td>
            <td>aa</td>
            <td>aa</td>
            <td>aa</td>
            <td>aa</td>
            <td>aa</td>
          </tr>
        </tbody>
      </table>

      <div class="row q-col-gutter-xs q-mt-xs">
        <app-input-simrs
          v-model="store.form.menarche"
          label="Menarche"
          class-tambahan="col-5"
        />
        <app-input-simrs
          v-model="store.form.menstruasi"
          label="Menstruasi"
          class-tambahan="col-5"
        />
        <app-input-simrs
          v-model="store.form.menikahKe"
          label="Menikah ke"
          class-tambahan="col-2"
          type="number"
        />
        <app-input-simrs
          v-model="store.form.kontrasepsi"
          label="Kontrasepsi yang pernah digunakan"
          class-tambahan="col-8"
        />
      </div>
      <div><b>Data Kehamilan Sekarang</b></div>
      <q-separator />
      <div class="row q-mt-xs q-col-gutter-xs">
        <app-input-simrs
          v-model="store.form.kandunganG"
          label="G"
          class-tambahan="col-4"
        />
        <app-input-simrs
          v-model="store.form.kandunganP"
          label="P"
          class-tambahan="col-4"
        />
        <app-input-simrs
          v-model="store.form.kandunganA"
          label="A"
          class-tambahan="col-4"
        />
        <app-input-simrs
          v-model="store.form.haidAwal"
          label="Hari Pertama Haid Terakhir"
          class-tambahan="col-4"
        />
        <app-input-date
          :model="store.form.tglHarapanLahir"
          label="tgl Harapan Lahir"
          outlined
          class="col-4"
          :valid="true"
          @set-model="val=>store.form.tglHarapanLahir=val"
        />
        <app-input-simrs
          v-model="store.form.keluhan"
          label="Keluhan Selama Hamil"
          class-tambahan="col-8"
        />
        <app-input-simrs
          v-model="store.form.pemeriksaanDalam"
          label="Pemeriksaan Dalam"
          class-tambahan="col-8"
        />
      </div>

      <div><b>Skreening nutrisi : </b></div>
      <q-separator class="q-my-xs" />

      <table>
        <tr>
          <th width="3%">
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
          <td>Apakah Asupan Makan berkurabg karena nafsu makan ?</td>
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
            <div>Ada Pertambahan BB yg kurang atau lebih selama kehamilan ?</div>
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
            <div> {{ `Nilai HB < 10 g/dl atau HCT < 30 %` }} </div>
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
            <div> Ada gangguan metabolisme/kondisi khusus (peny DM, gangguan fungsi tiroid, infeksi kronis, IV/AIDS, TB, LUPUS, dll) ?</div>
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

      <div><b>Skreening Resiko Jatuh</b></div>
      <q-separator class="q-my-xs" />

      <div>Gaya Berjalan Pasien ? : </div>
      <div class="q-gutter-xs">
        <q-checkbox
          v-for="item in store.resikoJatuhs"
          :key="item"
          v-model="store.form.resikoJatuh"
          :val="item"
          :label="item"
          dense
          size="xs"
        />
      </div>
      <q-separator class="q-my-xs" />
      <div><b>Status Fungsional</b></div>
      <q-separator class="q-my-xs" />
      <div class="row">
        <div class="col-3">
          Aktivitas dan Mobilisasi :
        </div>
        <div class="col-9 row">
          <div class="col-auto q-gutter-sm">
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
            v-if="store.form.mobilisasi !== 'Mandiri'"
            class="col "
          >
            <app-input-simrs
              v-model="store.form.perluBantuan"
              label="Sebutkan"
              class-tambahan="col-8"
            />
          </div>
        </div>
      </div>

      <div class="row">
        <app-input-simrs
          v-model="store.form.alatBantuJalan"
          label="Alat Bantu Jalan"
          class-tambahan="col-8"
        />
      </div>
    </div>
  </div>
</template>

<script setup>

import { useKandunganStore } from 'src/stores/simrs/pelayanan/poli/kandungan'

const store = useKandunganStore()
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
