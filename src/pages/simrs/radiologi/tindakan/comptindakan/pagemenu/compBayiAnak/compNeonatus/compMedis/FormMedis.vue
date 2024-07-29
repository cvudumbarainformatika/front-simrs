<template>
  <q-card
    bordered
    flat
  >
    <q-card-section>
      <div><b>DATA IBU</b></div>
      <q-separator class="q-my-sm" />
      <q-input
        v-model="store.form.usiaKehamilanIbu"
        label="Usia Kehamilan dlm Minggu"
        dense
        outlined
        standout="bg-yellow-3"
        style="width:30%"
      />

      <div class="row q-col-gutter-sm q-my-xs">
        <div class="col-2">
          Ante Natal Care
        </div>
        <div class="col-10 row">
          <div class="q-mx-xs">
            :
          </div>
          <div class="row q-col-gutter-sm">
            <q-radio
              v-for="item in store.anteNatalCares"
              :key="item"
              v-model="store.form.anc"
              :val="item"
              :label="item"
              dense
              size="xs"
            />
          </div>
          <q-input
            v-if="store.form.anc==='Lain-lain'"
            v-model="store.form.ancLain"
            label="Lain-lain"
            dense
            outlined
            standout="bg-yellow-3"
            class="q-my-xs"
          />
        </div>
      </div>

      <q-separator class=" q-my-xs" />

      <div class="row q-col-gutter-sm">
        <div class="col-2">
          Rujukan :
        </div>
        <div class="col-10 row">
          <div class="q-mx-xs">
            :
          </div>
          <div class="row q-col-gutter-sm">
            <q-radio
              v-for="item in store.rujukans"
              :key="item"
              v-model="store.form.rujukan"
              :val="item"
              :label="item"
              dense
              size="xs"
            />
          </div>
          <q-input
            v-if="store.form.rujukan==='Lain-lain'"
            v-model="store.form.rujukanLain"
            label="Lain-lain"
            dense
            outlined
            standout="bg-yellow-3"
            class="q-my-xs"
          />
        </div>
      </div>

      <q-separator class=" q-my-xs" />

      <div class="row q-col-gutter-sm">
        <div class="col-2">
          Riwayat Peny. ibu
        </div>
        <div class="col-10 row">
          <div class="q-mx-xs">
            :
          </div>
          <div class="row q-col-gutter-sm">
            <q-radio
              v-for="item in store.riwayatPenyakitIbus"
              :key="item"
              v-model="store.form.riwayatPenyakitIbu"
              :val="item"
              :label="item"
              dense
              size="xs"
            />
          </div>
          <q-input
            v-if="store.form.riwayatPenyakitIbu==='Ada'"
            v-model="store.form.riwayatPenyakitIbuAda"
            label="Sebutkan"
            dense
            outlined
            standout="bg-yellow-3"
            class="q-my-xs"
          />
        </div>
      </div>
    </q-card-section>

    <q-card-section>
      <div>
        <b>RIWAYAT KEHAMILAN / PERSALINAN DULU</b> <span><q-btn
          label="Tambah Riwayat"
          dense
          outline
          color="primary"
          size="sm"
          class="q-ml-md q-px-md"
          @click="store.modalRiwayat = true"
        /></span>
      </div>
      <q-separator class="q-my-sm" />
      <q-markup-table
        dense
        bordered
        flat
        separator="cell"
        wrap-cells
      >
        <thead class="bg-primary text-white">
          <tr>
            <th class="text-left">
              NO
            </th>
            <th class="text-left">
              PENYULIT KEHAMILAN
            </th>
            <th class="text-left">
              MACAM PERSALINAN
            </th>
            <th class="text-left">
              L/P
            </th>
            <th class="text-left">
              Hidup/Mati
            </th>
            <th class="text-left">
              Umur Sekarang Wkt Meninggal
            </th>
            <th class="text-left">
              Sebab Kematian
            </th>
            <th class="text-right">
              #
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="!store.riwayatKehamilan.length">
            <td
              colspan="7"
              class="text-center"
            >
              Tidak Ada Data
            </td>
          </tr>
          <tr
            v-for="item in store.riwayatKehamilan"
            v-else
            :key="item"
          >
            <td class="text-left">
              {{ item?.kehamilanNo }}
            </td>
            <td class="text-left">
              {{ item?.penyulitKehamilan }}
            </td>
            <td class="text-left">
              {{ item?.macamPersalinan }}
            </td>
            <td class="text-left">
              {{ item?.lp }}
            </td>
            <td class="text-left">
              {{ item?.hidupmati }}
            </td>
            <td class="text-left">
              {{ item?.umursekarang }}
            </td>
            <td class="text-left">
              {{ item?.sebabKematian }}
            </td>
            <td class="text-end">
              <q-btn
                icon="icon-mat-delete"
                size="xs"
                flat
                round
                color="negative"
                @click="store.deleteRiwayat(item?.id)"
              />
            </td>
          </tr>
        </tbody>
      </q-markup-table>
      <q-separator class="q-my-sm" />
      <div>Riwayat Kehamilan / Persalinan sekarang : </div>
      <div class="row q-col-gutter-sm">
        <q-input
          v-model="store.form.riwayatKehamilanSekarangG"
          label="G"
          dense
          outlined
          standout="bg-yellow-3"
          class="col-4"
        />
        <q-input
          v-model="store.form.riwayatKehamilanSekarangP"
          label="P"
          dense
          outlined
          standout="bg-yellow-3"
          class="col-4"
        />
        <q-input
          v-model="store.form.riwayatKehamilanSekarangAb"
          label="Ab"
          dense
          outlined
          standout="bg-yellow-3"
          class="col-4"
        />
      </div>
      <div class="row q-col-gutter-sm q-mt-xs">
        <q-radio
          v-for="item in store.riwayatPersalinans"
          :key="item"
          v-model="store.form.riwayatPersalinan"
          :val="item"
          :label="item"
          dense
          size="xs"
        />
      </div>
      <q-input
        v-if="store.form.riwayatPersalinan==='Febris'"
        v-model="store.form.riwayatPersalinanFebris"
        label="Febris ... Celcius"
        dense
        outlined
        standout="bg-yellow-3"
        class="q-my-xs"
      />
      <q-input
        v-if="store.form.riwayatPersalinan==='Lain-lain'"
        v-model="store.form.riwayatPersalinanLain"
        label="Lain-lain"
        dense
        outlined
        standout="bg-yellow-3"
        class="q-my-xs"
      />

      <div class="row q-col-gutter-md items-center q-mt-xs">
        <div class="col-3">
          Induksi Persalinan
        </div>
        <div class="col-9">
          <div class="row q-gutter-sm">
            <q-radio
              v-for="item in store.induksiPersalinans"
              :key="item"
              v-model="store.form.induksiPersalinan"
              :val="item"
              :label="item"
              dense
              size="xs"
            />
          </div>
        </div>
      </div>

      <q-separator class="q-my-xs" />

      <div class="row q-col-gutter-md items-center">
        <div class="col-3">
          Anestesi
        </div>
        <div class="col-9">
          <div class="row q-gutter-sm">
            <q-radio
              v-for="item in store.anestesis"
              :key="item"
              v-model="store.form.anestesi"
              :val="item"
              :label="item"
              dense
              size="xs"
            />
          </div>
        </div>
      </div>

      <q-separator class="q-my-xs" />

      <div class="row q-col-gutter-md">
        <div class="col-3">
          Cara Kelahiran
        </div>
        <div class="col-9">
          <div class="row q-gutter-sm">
            <q-radio
              v-for="item in store.caraKelahirans"
              :key="item"
              v-model="store.form.caraKelahiran"
              :val="item"
              :label="item"
              dense
              size="xs"
            />
          </div>
          <q-input
            v-if="store.form.caraKelahiran==='Lain-lain'"
            v-model="store.form.caraKelahiranLain"
            label="Lain-lain"
            dense
            outlined
            standout="bg-yellow-3"
            class="q-my-xs"
          />
        </div>
      </div>
      <q-input
        v-model="store.form.indikasiPartus"
        label="Indikasi Partus tindakan"
        dense
        outlined
        standout="bg-yellow-3"
        class="q-my-xs"
      />
      <q-input
        v-model="store.form.tempatPersalinan"
        label="Tempat Persalinan"
        dense
        outlined
        standout="bg-yellow-3"
        class="q-my-xs"
      />

      <div class="row q-col-gutter-md q-mt-xs">
        <div class="col-3">
          Penolong Persalinan
        </div>
        <div class="col-9">
          <div class="row q-gutter-sm">
            <q-radio
              v-for="item in store.penolongPersalinans"
              :key="item"
              v-model="store.form.penolongPersalinan"
              :val="item"
              :label="item"
              dense
              size="xs"
            />
          </div>
          <q-input
            v-if="store.form.penolongPersalinan==='Lain-lain'"
            v-model="store.form.penolongPersalinanLain"
            label="Lain-lain"
            dense
            outlined
            standout="bg-yellow-3"
            class="q-my-xs"
          />
        </div>
      </div>

      <q-separator class="q-my-xs" />
      <div class="row q-col-gutter-md">
        <div class="col-3">
          Ketuban Pecah dini?
        </div>
        <div class="col-9">
          <div class="row q-gutter-sm">
            <q-radio
              v-for="item in store.ketubanPecahDinis"
              :key="item"
              v-model="store.form.ketubanPecahDini"
              :val="item"
              :label="item"
              dense
              size="xs"
            />
          </div>
          <q-input
            v-if="store.form.ketubanPecahDini==='Ya'"
            v-model="store.form.ketubanPecahDiniJam"
            label="Pada Jam ?"
            dense
            outlined
            standout="bg-yellow-3"
            class="q-my-xs"
          />
        </div>
      </div>

      <q-separator class="q-my-xs" />
      <div><b><i>Air Ketuban</i></b></div>
      <div class="row q-col-gutter-md">
        <div class="col-3">
          Jumlah
        </div>
        <div class="col-9">
          <div class="row q-gutter-sm">
            <q-radio
              v-for="item in store.jumlahKetubans"
              :key="item"
              v-model="store.form.jumlahKetuban"
              :val="item"
              :label="item"
              dense
              size="xs"
            />
          </div>
        </div>
      </div>
      <q-separator class="q-my-xs" />
      <div class="row q-col-gutter-md">
        <div class="col-3">
          Warna
        </div>
        <div class="col-9">
          <q-input
            v-model="store.form.warnaKetuban"
            label="Warna Ketuban"
            dense
            outlined
            standout="bg-yellow-3"
            class="q-my-xs"
          />
        </div>
      </div>

      <q-separator class="q-my-xs" />
      <div class="row q-col-gutter-md">
        <div class="col-3">
          Kekeruhan
        </div>
        <div class="col-9">
          <div class="row q-gutter-sm">
            <q-radio
              v-for="item in store.kekeruhans"
              :key="item"
              v-model="store.form.kekeruhan"
              :val="item"
              :label="item"
              dense
              size="xs"
            />
          </div>
        </div>
      </div>

      <q-separator class="q-my-xs" />
      <div class="row q-col-gutter-md">
        <div class="col-3">
          Bau
        </div>
        <div class="col-9">
          <div class="row q-gutter-sm">
            <q-radio
              v-for="item in store.baus"
              :key="item"
              v-model="store.form.bau"
              :val="item"
              :label="item"
              dense
              size="xs"
            />
          </div>
        </div>
      </div>

      <q-separator class="q-my-xs" />
      <div class="row q-col-gutter-md">
        <div class="col-3">
          Placenta
        </div>
        <div class="col-9">
          <q-input
            v-model="store.form.placenta"
            label="Placenta"
            dense
            outlined
            standout="bg-yellow-3"
            class="q-my-xs"
          />
        </div>
      </div>

      <q-separator class="q-my-xs" />
      <div class="row q-col-gutter-md">
        <div class="col-3">
          Obat Sebelum bersalin
        </div>
        <div class="col-9">
          <div class="row q-gutter-sm">
            <q-radio
              v-for="item in store.obatSebelumBersalins"
              :key="item"
              v-model="store.form.obatSebelumBersalin"
              :val="item"
              :label="item"
              dense
              size="xs"
            />
          </div>
          <q-input
            v-if="store.form.obatSebelumBersalin==='Ya'"
            v-model="store.form.obatSebelumBersalinYa"
            label="Sebutkan"
            dense
            outlined
            standout="bg-yellow-3"
            class="q-my-xs"
          />
        </div>
      </div>
    </q-card-section>

    <q-card-section>
      <div><b>DATA BAYI</b></div>
      <q-separator class="q-my-xs" />
      <div class="row items-center q-col-gutter-xs">
        <div class="col-3">
          Lahir
        </div>
        <div class="col-4 row no-wrap">
          <div class="q-mr-sm">
            :
          </div>
          <app-input-date
            :model="store.form.lahirTgl"
            label="Tgl Lahir"
            outlined
            clearable
            valid
            @set-model="val=>store.form.lahirTgl=val"
          />
        </div>
        <div class="col-3">
          <app-input-date
            :model="store.form.lahirJam"
            label="Jam Lahir"
            outlined
            :type-date="false"
            clearable
            valid
            @set-model="val=>store.form.lahirJam=val"
          />
        </div>
      </div>

      <div class="row items-center q-col-gutter-xs">
        <div class="col-3">
          Resusitasi
        </div>
        <div class="col-9 row no-wrap q-mt-xs">
          <div class="q-mr-sm">
            :
          </div>
          <div class="flex q-gutter-sm">
            <q-radio
              v-for="item in store.resusitasis"
              :key="item"
              v-model="store.form.resusitasi"
              :val="item"
              :label="item"
              dense
              size="xs"
            />
          </div>
          <div
            v-if="store.form.resusitasi==='Ya'"
            class="q-ml-sm"
          >
            <div class="flex q-gutter-sm">
              <app-input-date
                :model="store.form.resusitasiJamMulai"
                label="Jam Mulai"
                outlined
                :type-date="false"
                clearable
                valid
                @set-model="val=>store.form.resusitasiJamMulai=val"
              />
              <app-input-date
                :model="store.form.resusitasiJamSelesai"
                label="Jam Selesai"
                outlined
                :type-date="false"
                clearable
                valid
                @set-model="val=>store.form.resusitasiJamSelesai=val"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="row items-center q-col-gutter-xs">
        <div class="col-3">
          Skor APGAR
        </div>
        <div class="col-9 row no-wrap q-mt-xs">
          <div class="q-mr-sm">
            :
          </div>
          <div>
            <q-input
              v-model="store.form.skorApgar"
              label="Skor APGAR"
              dense
              outlined
              standout="bg-yellow-3"
            />
          </div>
        </div>
      </div>

      <div class="row items-center q-col-gutter-xs">
        <div class="col-3">
          Berat Badan
        </div>
        <div class="col-9 row no-wrap q-mt-xs">
          <div class="q-mr-sm">
            :
          </div>
          <div class="flex q-gutter-sm">
            <q-input
              v-model="store.form.beratBadan"
              label="Berat Badan / Gram"
              dense
              outlined
              standout="bg-yellow-3"
            />
            <div
              v-if="store.form.beratBadan"
              class="flex q-gutter-xs"
            >
              <q-radio
                v-for="item in store.beratBadans"
                :key="item"
                v-model="store.form.beratBadanKat"
                :val="item"
                :label="item"
                dense
                size="xs"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="row items-center q-col-gutter-xs">
        <div class="col-3">
          Panjang Badan
        </div>
        <div class="col-9 row no-wrap q-mt-xs">
          <div class="q-mr-sm">
            :
          </div>
          <div>
            <q-input
              v-model="store.form.panjangBadan"
              label="Panjang Badan / Cm"
              dense
              outlined
              standout="bg-yellow-3"
            />
          </div>
        </div>
      </div>

      <div class="row items-center q-col-gutter-xs">
        <div class="col-3">
          Lingkar Kepala
        </div>
        <div class="col-9 row no-wrap q-mt-xs">
          <div class="q-mr-sm">
            :
          </div>
          <div class="flex q-gutter-sm">
            <q-input
              v-model="store.form.lingkarKepala"
              label="Lingkar Kepala / Cm"
              dense
              outlined
              standout="bg-yellow-3"
            />
            <div
              v-if="store.form.lingkarKepala"
              class="flex q-gutter-xs"
            >
              <q-radio
                v-for="item in store.lingkarKepalas"
                :key="item"
                v-model="store.form.lingkarKepalaKat"
                :val="item"
                :label="item"
                dense
                size="xs"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="row items-center q-col-gutter-xs">
        <div class="col-3">
          Usia Kehamilan
        </div>
        <div class="col-9 row no-wrap q-mt-xs">
          <div class="q-mr-sm">
            :
          </div>
          <div class="flex q-gutter-sm">
            <q-input
              v-model="store.form.usiaKehamilanBayi"
              label="Usia Khmilan / Mggu"
              dense
              outlined
              standout="bg-yellow-3"
            />
            <div
              v-if="store.form.usiaKehamilanBayi"
              class="flex q-gutter-xs"
            >
              <q-radio
                v-for="item in store.usiaKehamilanBayis"
                :key="item"
                v-model="store.form.usiaKehamilanBayiKat"
                :val="item"
                :label="item"
                dense
                size="xs"
              />
            </div>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
  <div style="margin-bottom: 100px;" />

  <modal-riwayat-form
    v-model="store.modalRiwayat"
    :pasien="props?.pasien"
  />
</template>

<script setup>
import ModalRiwayatForm from './ModalRiwayatForm.vue'
import { useNeonatusMedisStore } from 'src/stores/simrs/pelayanan/poli/neonatusmedis'
import { onMounted } from 'vue'
const store = useNeonatusMedisStore()

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

onMounted(() => {
  // store.initForm()
})

</script>
