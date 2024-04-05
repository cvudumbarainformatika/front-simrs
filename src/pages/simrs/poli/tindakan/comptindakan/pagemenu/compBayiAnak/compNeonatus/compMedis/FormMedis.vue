<template>
  <q-card
    bordered
    flat
  >
    <q-card-section>
      <div><b>DATA IBU</b></div>
      <q-separator class="q-my-sm" />
      <q-input
        v-model="store.form.usiaKehamilan"
        label="Usia Kehamilan dlm Minggu"
        dense
        outlined
        standout="bg-yellow-3"
        style="width:30%"
      />

      <div class="row q-col-gutter-sm q-my-xs items-center">
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

      <div class="row q-col-gutter-sm items-center">
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
        /></span>
      </div>
      <q-separator class="q-my-sm" />
      <q-markup-table
        dense
        bordered
        flat
        separator="vertical"
        wrap-cells
      >
        <thead>
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
          </tr>
        </thead>
        <tbody>
          <tr v-if="store.form.riwayatKehamilan">
            <td
              colspan="7"
              class="text-center"
            >
              Tidak Ada Data
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
          Cara Kelahiran
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
          Anestesi
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
      <q-separator />
    </q-card-section>
  </q-card>
  <div style="margin-bottom: 100px;" />
</template>

<script setup>
import { useNeonatusMedisStore } from 'src/stores/simrs/pelayanan/poli/neonatusmedis'
import { onMounted } from 'vue'
const store = useNeonatusMedisStore()

onMounted(() => {
  store.initForm()
})

console.log(store.form)

</script>
