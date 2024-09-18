<template>
  <div class="row q-col-gutter-md">
    <q-input
      ref="refInputKu"
      v-model="store.form.keluhanUtama"
      outlined
      autogrow
      stack-label
      standout="bg-yellow-3"
      label="Keluhan Utama"
      :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
      hide-bottom-space
      style="width:50%"
    />
    <q-input
      v-model="store.form.rwPenySkr"
      outlined
      autogrow
      stack-label
      standout="bg-yellow-3"
      label="Riwayat Penyakit Sekarang"
      hide-bottom-space
      style="width:50%"
    />
    <q-input
      v-model="store.form.rwPenyDhl"
      outlined
      autogrow
      stack-label
      standout="bg-yellow-3"
      label="Riwayat Penyakit Dahulu"
      hide-bottom-space
      style="width:50%"
    />
    <q-input
      v-model="store.form.rwPenyKlrg"
      outlined
      autogrow
      stack-label
      standout="bg-yellow-3"
      label="Riwayat Penyakit Keluarga"
      hide-bottom-space
      style="width:50%"
    />
    <q-input
      v-model="store.form.rwPengobatan"
      outlined
      autogrow
      stack-label
      standout="bg-yellow-3"
      label="Riwayat Pengobatan"
      hide-bottom-space
      style="width:50%"
    />
    <q-input
      v-model="store.form.rwPkrjDgZatBahaya"
      outlined
      autogrow
      stack-label
      standout="bg-yellow-3"
      label="Riwayat Pekerjaan yg berhubung dg Zat berbahaya"
      hide-bottom-space
      style="width:50%"
    />

    <div class="col-12">
      <!-- RIWAYAT ALERGI -->
      <q-card flat bordered class="q-mb-sm">
        <q-card-section>
          <div class="text-weight-bold">
            Riwayat Alergi
          </div>
          <div class="text-grey-8 f-10">
            Riwayat alergi yang pernah dialami
            oleh pasien
          </div>
          <q-separator class="q-my-sm" />
          <div class="flex q-gutter-sm q-mb-sm">
            <q-checkbox
              dense
              v-for="(al, i) in store.alergis"
              :key="i"
              v-model="store.form.rwAlergi"
              :val="al"
              :label="al"
              color="primary"
            />
          </div>
          <q-input
            v-model="store.form.ketRwAlergi"
            outlined
            label="Keterangan Alergi"
            standout="bg-yellow-3"
            autogrow
            style="width: 70%;"
          />
        </q-card-section>
      </q-card>

      <!-- FORM 4.2 -->
      <q-card flat bordered class="q-mb-sm">
        <q-card-section class="row q-col-gutter-xs">
          <div class="text-weight-bold col-12">
            Form 4.2 (Kebidanan)
            <q-separator class="q-my-sm" />
          </div>

          <q-input
            v-model="store.formKebidanan.rwObsetri"
            outlined
            label="Riwayat Peny. Obsetric/Gynecology Sekarang"
            standout="bg-yellow-3"
            autogrow
            class="col-12"
          />
          <q-input
            v-model="store.formKebidanan.rwRawat"
            outlined
            label="Pernah dirawat ?"
            standout="bg-yellow-3"
            autogrow
            class="col-6"
          />
          <q-input
            v-model="store.formKebidanan.rwOperasi"
            outlined
            label="Pernah Operasi ?"
            standout="bg-yellow-3"
            autogrow
            class="col-6"
          />

          <div class="col-12 q-mt-sm">
            <div class="text-bold">
              Riwayat Penyakit Gynecology
            </div>
            <q-separator class="q-my-sm" />

            <div class="flex q-gutter-sm">
              <q-checkbox
                dense
                v-for="(g, x) in store.gynecologys"
                :key="x"
                v-model="store.formKebidanan.rwGynecology"
                :val="g"
                :label="g"
                color="primary"
              />
            </div>
            <q-separator class="q-my-sm" />
            <div class="text-bold q-mt-sm">
              Riwayat KB
            </div>
            <q-separator class="q-my-xs" />
            <div class="row q-col-gutter-xs">
              <app-input-simrs v-model="store.formKebidanan.rwKbJns" label="Jenis" class="col-4" />
              <app-input-simrs v-model="store.formKebidanan.rwKbLama" label="Lama" class="col-4" />
              <app-input-simrs v-model="store.formKebidanan.rwKbKeluhan" label="Keluhan" class="col-4" />
            </div>
            <q-separator class="q-my-sm" />
            <div class="text-bold q-mt-sm">
              Riwayat Menstruasi
            </div>
            <q-separator class="q-my-xs" />
            <div class="row q-col-gutter-xs">
              <app-input-simrs v-model="store.formKebidanan.menarche" label="Menarche (th)" class="col-4" />
              <app-input-simrs v-model="store.formKebidanan.siklusHari" label="Siklus (hr)" class="col-4" />
              <q-select
                v-model="store.formKebidanan.siklus"
                dense
                standout="bg-yellow-3 text-black"
                outlined
                label="Siklus"
                :options="store.sikluses"
                emit-value
                map-options
                input-class="ellipsis"
                fill-input
                hide-bottom-space
                class="col-4"
              />
              <app-input-simrs v-model="store.formKebidanan.lamaMens" label="Lama (hr)" class="col-2" :valid="{number: true}" />
              <q-select
                v-model="store.formKebidanan.kondisiMens"
                dense
                standout="bg-yellow-3 text-black"
                outlined
                label="Kondisi Mens"
                :options="store.kondisiMens"
                emit-value
                map-options
                input-class="ellipsis"
                fill-input
                hide-bottom-space
                class="col-6"
              />
              <app-input-simrs v-model="store.formKebidanan.hpht" label="HPHT (hr)" class="col-4" :valid="{number: true}" />
              <app-input-date
                v-model="store.formKebidanan.tglPerkPersalinan"
                label="Tanggal Perkiraan Persalinan"
                outlined
                dense
                @set-model="(val)=>{store.formKebidanan.tglPerkPersalinan=val}"
                class="col-6"
              />

              <div class="col-12 q-mt-xs">
                <div class="text-bold q-mt-sm">
                  Riwayat Perkawinan
                </div>
                <q-separator />
              </div>
              <app-input-simrs v-model="store.formKebidanan.rwKawinStatus" label="Status" class="col-7" />
              <app-input-simrs v-model="store.formKebidanan.kawinKe" label="Perkawinan Ke" class="col-2" :valid="{number: true}" />
              <app-input-simrs v-model="store.formKebidanan.nikahUmur" label="Nikah Umur" class="col-2" :valid="{number: true}" />

              <div class="col-12 q-mt-xs">
                <div class="text-bold q-mt-sm">
                  Riwayat Kehamilan, Persalinan, Nifas
                </div>
                <q-separator class="q-my-sm" />
              </div>
              <app-input-simrs v-model="store.formKebidanan.g" label="G" class="col-2" />
              <app-input-simrs v-model="store.formKebidanan.p" label="P" class="col-2" />
              <app-input-simrs v-model="store.formKebidanan.ab" label="Ab" class="col-2" />
              <app-input-simrs v-model="store.formKebidanan.ah" label="Ah" class="col-2" />
              <q-select
                v-model="store.formKebidanan.imunisasi"
                dense
                standout="bg-yellow-3 text-black"
                outlined
                label="Imunisasi"
                :options="store.imunisasis"
                emit-value
                map-options
                input-class="ellipsis"
                fill-input
                hide-bottom-space
                class="col-4"
              />

              <div class="full-width">
                <div class="flex q-gutter-sm items-center q-mb-sm q-mt-xs">
                  <div class="text-bold">
                    Riwayat Kehamilan
                  </div>
                  <q-btn dense outline color="primary" icon="icon-mat-add" label="Tambah Riwayat Kehamilan" class="q-px-sm" @click="store.openDialogFormRiwayat = true" />
                </div>
                <TableRiwayatKehamilan :items="store.riwayatKehamilans" @delete="store.deleteRiwayatKehamilan()" />
              </div>
            </div>
            <div class="text-bold q-mt-sm">
              Pola Eliminasi
            </div>
            <q-separator class="q-my-xs" />

            <div class="row q-col-gutter-xs">
              <app-input-simrs v-model="store.formKebidanan.bab" label="BAB (x/hr)" class="col-2" :valid="{number: true}" />
              <q-select
                v-model="store.formKebidanan.konsistensi"
                dense
                standout="bg-yellow-3 text-black"
                outlined
                label="Konsistensi"
                :options="store.konsistensis"
                emit-value
                map-options
                input-class="ellipsis"
                fill-input
                hide-bottom-space
                class="col-3"
              />
              <q-select
                v-model="store.formKebidanan.warna"
                dense
                standout="bg-yellow-3 text-black"
                outlined
                label="Warna"
                :options="store.warnas"
                emit-value
                map-options
                input-class="ellipsis"
                fill-input
                hide-bottom-space
                class="col-4"
              />

              <app-input-simrs v-model="store.formKebidanan.peristatikUsus" label="Peri. Usus x/mnt" class="col-3" :valid="{number: true}" />
              <q-select
                v-model="store.formKebidanan.flatus"
                dense
                standout="bg-yellow-3 text-black"
                outlined
                label="Flatus"
                :options="store.yaTidaks"
                emit-value
                map-options
                input-class="ellipsis"
                fill-input
                hide-bottom-space
                class="col-2"
              />
              <app-input-simrs v-model="store.formKebidanan.bak" label="BAK x/hr" class="col-2" :valid="{number: true}" />
              <div class="col-12 q-gutter-sm flex">
                <div>Keluhan BAK :</div>
                <q-checkbox dense size="sm" v-for="n in store.keluhanBaks" :key="n" v-model="store.formKebidanan.keluhanBak" :val="n" :label="n" />
              </div>
              <div class="col-12 q-gutter-sm flex q-mb-sm">
                <div>Keluhan :</div>
                <q-checkbox dense size="sm" v-for="n in store.keluhans" :key="n" v-model="store.formKebidanan.keluhans" :val="n" :label="n" />
              </div>
              <app-input-simrs v-model="store.formKebidanan.jmlBak" label="Jml. BAK ml/hr" class="col-3" :valid="{number: true}" />
              <q-select
                v-model="store.formKebidanan.warnaUrine"
                dense
                standout="bg-yellow-3 text-black"
                outlined
                label="Warna Urine"
                :options="store.warnaUrine"
                emit-value
                map-options
                input-class="ellipsis"
                fill-input
                hide-bottom-space
                class="col-4"
              />
              <q-select
                v-model="store.formKebidanan.kateter"
                dense
                standout="bg-yellow-3 text-black"
                outlined
                label="Terp. Kateter"
                :options="store.yaTidaks"
                emit-value
                map-options
                input-class="ellipsis"
                fill-input
                hide-bottom-space
                class="col-3"
              />
              <app-input-simrs v-if="store.formKebidanan.kateter==='Ya'" v-model="store.formKebidanan.kttHrKe" label="Ktt Hr ke-" class="col-2" :valid="{number: true}" />
            </div>
          </div>
        </q-card-section>
      </q-card>

      <!-- FORM 4.3 -->
      <q-card flat bordered class="q-mb-sm">
        <q-card-section>
          <div class="text-weight-bold">
            Form 4.3 (Neonatal)
          </div>
          <q-separator class="q-my-xs" />
        </q-card-section>
      </q-card>

      <!-- KAJIAN NYERI -->
      <q-card flat bordered class="q-mb-sm">
        <q-card-section class="q-py-xs q-px-md">
          <div class="flex q-gutter-xs items-center">
            <div class="text-weight-bold">
              Kajian Nyeri
            </div>
            <q-radio v-model="store.form.kajianNyeri" v-for="dd in store.pilihanNyeris" :key="dd" :label="dd?.text" :val="dd.text" />
          </div>
          <!-- <div class="text-grey-8 f-10">
            Pilih Kajian Nyeri Pasien diatas
          </div> -->
          <q-separator />
        </q-card-section>
        <q-card-section>
          <div v-if="store.form.kajianNyeri==='Wong Baker Face Scale'">
            <div class="">
              Keluhan Nyeri (Wong Baker Face Scale) :
              <span class="q-ml-sm">
                <q-icon
                  size="lg"
                  color="teal"
                  :name="iconNyeri"
                />
              </span>
              <em class="text-primary q-ml-sm">{{ store.form.keluhanNyeri }}</em>
            </div>
            <q-separator class="q-my-xs" />
            <q-slider
              v-model="store.form.skorNyeri"
              color="primary"
              thumb-color="primary"
              label-color="primary"
              label-text-color="yellow"
              markers
              :marker-labels="(val)=> fnMarkerLabel"
              marker-labels-class="text-primary"
              label-always
              switch-label-side
              :min="0"
              :max="10"
              @update:model-value="store.setKeteranganSkornyeri"
              style="width: 70%;"
            />
          </div>
          <div v-else>
            <div class="">
              Behavioral Pain Scale (BPS)
            </div>
            <q-separator class="q-my-xs" />
            <div class="text-weight-bold">
              Ekspresi Wajah :
            </div>
            <q-separator class="q-my-xs" />
            <div class="flex q-gutter-sm items-center">
              <q-radio dense size="sm" v-model="store.form.ekspresiWajah" v-for="aa in store.ekspresiWajah" :key="aa" :label="aa?.text" :val="aa?.value" @update:model-value="(val)=> store.form.ekspresiWajahKet = aa?.text" />
            </div>
            <q-separator class="q-my-xs" />
            <div class="text-weight-bold">
              Gerakan Tangan :
            </div>
            <q-separator class="q-my-xs" />
            <div class="flex q-gutter-sm items-center">
              <q-radio dense size="sm" v-model="store.form.gerakanTangan" v-for="aa in store.gerakanTangan" :key="aa" :label="aa?.text" :val="aa?.value" @update:model-value="(val)=> store.form.gerakanTanganKet = aa?.text" />
            </div>
            <q-separator class="q-my-xs" />
            <div class="text-weight-bold">
              Kepatuhan terhadap ventilasi mekanik :
            </div>
            <q-separator class="q-my-xs" />
            <div class="flex q-gutter-sm items-center">
              <q-radio dense size="sm" v-model="store.form.kebutuhanVentilasi" v-for="aa in store.kebutuhanVentilasi" :key="aa" :label="aa?.text" :val="aa?.value" @update:model-value="(val)=> store.form.kebutuhanVentilasiKet = aa?.text" />
            </div>
          </div>
        </q-card-section>
      </q-card>

      <div class="skreening-gizi-dewasa">
        <q-card flat bordered>
          <q-card-section class="q-py-sm q-px-md">
            <div>
              <strong>Skreening Gizi (Dewasa)</strong>
            </div>
            <q-separator />
          </q-card-section>
          <q-card-section class="row">
            <div class="col-9">
              Apakah Ada Penurunan Berat badan yang tidak diinginkan selama 6 Bulan terakhir ?
            </div>
            <div class="col-3 flex q-gutter-sm">
              <q-radio dense v-model="store.form.sgd.bb" :val="2" label="Iya" @update:model-value="hitungSkorGizi" />
              <q-radio dense v-model="store.form.sgd.bb" :val="0" label="Tidak" @update:model-value="hitungSkorGizi" />
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section class="row">
            <div class="col-9">
              Apakah Asupan Makan berkurang karena tidak nafsu makan ?
            </div>
            <div class="col-3 flex q-gutter-sm">
              <q-radio dense v-model="store.form.sgd.am" :val="1" label="Iya" @update:model-value="hitungSkorGizi" />
              <q-radio dense v-model="store.form.sgd.am" :val="0" label="Tidak" @update:model-value="hitungSkorGizi" />
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section class="row">
            <div class="col-9">
              Apakah pasien memiliki diagnosa khusus / kondisi khusus ?
            </div>
            <div class="col-3 flex q-gutter-sm">
              <q-radio dense v-model="store.form.sgd.kk" :val="2" label="Iya" @update:model-value="hitungSkorGizi" />
              <q-radio dense v-model="store.form.sgd.kk" :val="0" label="Tidak" @update:model-value="hitungSkorGizi" />
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <div class="flex items-center q-gutter-sm justify-end text-primary">
              <div><strong>SKOR : {{ store.form.sgdSkor }}</strong> => </div>
              <div><strong>{{ store.form.sgdKet }}</strong></div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="skreening-gizi-kebidanan">
        <q-card flat bordered>
          <q-card-section class="q-py-sm q-px-md">
            <div>
              <strong>Skrining Gizi Pasien Obstetric / Kehamilan / Nifas</strong>
            </div>
            <q-separator />
          </q-card-section>
          <q-card-section class="row">
            <div class="col-9">
              Apakah asupan makan berkurang karena tidak nafsu makan ?
            </div>
            <div class="col-3 flex q-gutter-sm">
              <q-radio dense v-model="store.formKebidanan.sgk.am" :val="2" label="Iya" @update:model-value="store.hitungSkorSgk" />
              <q-radio dense v-model="store.formKebidanan.sgk.am" :val="0" label="Tidak" @update:model-value="store.hitungSkorSgk" />
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section class="row">
            <div class="col-9">
              Apakah ada pertambahan BB yang kurang atau lebih selama kehamilan ?
            </div>
            <div class="col-3 flex q-gutter-sm">
              <q-radio dense v-model="store.formKebidanan.sgk.bb" :val="1" label="Iya" @update:model-value="store.hitungSkorSgk" />
              <q-radio dense v-model="store.formKebidanan.sgk.bb" :val="0" label="Tidak" @update:model-value="store.hitungSkorSgk" />
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section class="row">
            <div class="col-9">
              {{ `Nilai Hb < 10 g/dl atau HCT 30%` }}
            </div>
            <div class="col-3 flex q-gutter-sm">
              <q-radio dense v-model="store.formKebidanan.sgk.hb" :val="2" label="Iya" @update:model-value="store.hitungSkorSgk" />
              <q-radio dense v-model="store.formKebidanan.sgk.hb" :val="0" label="Tidak" @update:model-value="store.hitungSkorSgk" />
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section class="row q-col-gutter-md">
            <div class="col-9">
              <div>{{ `Ada gangguan metabolisme / kondisi khusus. (Penyakit tertentu)` }}</div>
              <app-input-simrs v-if="store.formKebidanan.sgk.metabolisme > 0" v-model="store.formKebidanan.sgk.metabolismeKet" label="Sebutkan" class="q-mt-sm" />
            </div>

            <div class="col-3 flex q-gutter-sm">
              <q-radio dense v-model="store.formKebidanan.sgk.metabolisme" :val="2" label="Iya" @update:model-value="store.hitungSkorSgk" />
              <q-radio dense v-model="store.formKebidanan.sgk.metabolisme" :val="0" label="Tidak" @update:model-value="store.hitungSkorSgk" />
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <div class="flex items-center q-gutter-sm justify-end text-primary">
              <div><strong>SKOR : {{ store.formKebidanan.sgkSkor }}</strong> => </div>
              <div><strong>{{ store.formKebidanan.sgkKet }}</strong></div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- {{ store.form.ekspresiWajahKet }} -->
    </div>

    <!-- DIALOG -->
    <DialogFormRiwayat v-model="store.openDialogFormRiwayat" :pasien="pasien" />
  </div>
</template>

<script setup>
import { useAnamnesisRanapStore } from 'src/stores/simrs/ranap/anamnesis'
import { computed, defineAsyncComponent, onMounted, ref } from 'vue'

const TableRiwayatKehamilan = defineAsyncComponent(() => import('./comp/TableRiwayatKehamilan.vue'))
const DialogFormRiwayat = defineAsyncComponent(() => import('./comp/DialogFormRiwayat.vue'))

const store = useAnamnesisRanapStore()

defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

const refInputKu = ref(null)
defineExpose({
  refInputKu
})

const iconNyeri = computed(() => {
  const val = store?.form.skorNyeri
  let icon = 'icon-my-emoticon-excited-outline'
  if (val < 2) {
    icon = 'icon-my-emoticon-excited-outline'
  }
  else if (val >= 2 && val < 4) {
    icon = 'icon-my-emoticon-outline'
  }
  else if (val >= 4 && val < 6) {
    icon = 'icon-my-emoticon-neutral-outline'
  }
  else if (val >= 6 && val < 8) {
    icon = 'icon-my-emoticon-confused-outline'
  }
  else if (val >= 8 && val < 10) {
    icon = 'icon-my-emoticon-angry-outline'
  }
  else if (val === 10) {
    icon = 'icon-my-emoticon-cry-outline'
  }

  return icon
})

onMounted(() => {
  store.getRiwayatKehamilan()
  store.initReset()
})

const hitungSkorGizi = () => {
  store.hitungSkorSgd()
}
</script>
