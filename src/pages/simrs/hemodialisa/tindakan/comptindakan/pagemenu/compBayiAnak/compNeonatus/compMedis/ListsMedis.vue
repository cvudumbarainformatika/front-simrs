<template>
  <div class="full-width">
    <q-card
      v-for="item in items"
      :key="item"
      flat
      bordered
      class="q-mb-sm"
    >
      <q-card-section class="q-pa-sm">
        <table>
          <tr>
            <td width="35%">
              Usia Kehamilan Ibu
            </td>
            <td>{{ item?.usiaKehamilanIbu }}</td>
          </tr>
          <tr>
            <td width="35%">
              Ante Natal Care
            </td>
            <td>
              <div> {{ item?.anc }}</div>
              <div v-if="item?.anc==='Lain-lain'">
                <q-separator />
                <div>{{ item?.ancLain }}</div>
              </div>
            </td>
          </tr>
          <tr>
            <td width="35%">
              Rujukan
            </td>
            <td>
              <div> {{ item?.rujukan }}</div>
              <div v-if="item?.rujukan==='Lain-lain'">
                <q-separator />
                <div>{{ item?.rujukanLain }}</div>
              </div>
            </td>
          </tr>
          <tr>
            <td width="35%">
              Rwyt Peny. Ibu
            </td>
            <td>
              <div> {{ item?.riwayatPenyakitIbu }}</div>
              <div v-if="item?.riwayatPenyakitIbu==='Ada'">
                <q-separator />
                <div>{{ item?.riwayatPenyakitIbuAda }}</div>
              </div>
            </td>
          </tr>
          <tr>
            <td width="35%">
              Rwyt Khml (Skr)
            </td>
            <td>
              <div> <b>G</b> : {{ item?.riwayatKehamilanSekarangG }}</div>
              <q-separator />
              <div> <b>P</b> : {{ item?.riwayatKehamilanSekarangP }}</div>
              <q-separator />
              <div> <b>Ab</b> : {{ item?.riwayatKehamilanSekarangAb }}</div>
              <q-separator />
              <div> {{ item?.riwayatKehamilan }}</div>
              <q-separator />
            </td>
          </tr>
          <tr>
            <td width="35%">
              Induksi Persalinan
            </td>
            <td>
              <div> {{ item?.induksiPersalinan }}</div>
            </td>
          </tr>
          <tr>
            <td width="35%">
              Anestesi
            </td>
            <td>
              <div> {{ item?.anestesi }}</div>
            </td>
          </tr>

          <tr>
            <td width="35%">
              Cara Kelahiran
            </td>
            <td>
              <div> {{ item?.caraKelahiran }}</div>
              <div v-if="item?.caraKelahiran==='Lain-lain'">
                <q-separator />
                <div>{{ item?.caraKelahiranLain }}</div>
              </div>
            </td>
          </tr>
          <tr>
            <td width="35%">
              Indikasi Partus tindakan
            </td>
            <td>
              <div> {{ item?.indikasiPartus }}</div>
            </td>
          </tr>
          <tr>
            <td width="35%">
              tempat Persalinan
            </td>
            <td>
              <div> {{ item?.tempatPersalinan }}</div>
            </td>
          </tr>
          <tr>
            <td width="35%">
              penolong Persalinan
            </td>
            <td>
              <div> {{ item?.penolongPersalinan }}</div>
              <div v-if="item?.penolongPersalinan==='Lain-lain'">
                <q-separator />
                <div>{{ item?.penolongPersalinanLain }}</div>
              </div>
            </td>
          </tr>
          <tr>
            <td width="35%">
              Ktbn pch dini?
            </td>
            <td>
              <div> {{ item?.ketubanPecahDini }}</div>
              <div v-if="item?.ketubanPecahDini==='Ya'">
                <q-separator />
                <div>Jam : {{ item?.ketubanPecahDiniJam }}</div>
              </div>
            </td>
          </tr>
          <tr>
            <td width="35%">
              Air Ketuban
            </td>
            <td>
              <div> <b>Jumlah :</b> {{ item?.jumlahKetuban }}</div>
              <q-separator />
              <div><b>Warna :</b> {{ item?.warnaKetuban }}</div>
              <q-separator />
              <div><b>Kekeruhan :</b> {{ item?.kekeruhan }}</div>
              <q-separator />
              <div><b>Bau :</b> {{ item?.bau }}</div>
            </td>
          </tr>
          <tr>
            <td width="35%">
              Placenta
            </td>
            <td>
              <div> {{ item?.placenta }}</div>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <div> Obat sebelum Bersalin ? {{ item?.obatSebelumBersalin }}</div>
              <div v-if="item?.obatSebelumBersalin === 'Ya'">
                <q-separator />
                <div>{{ item?.obatSebelumBersalinYa }}</div>
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <div> <b>DATA BAYI</b></div>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <div> <b>Lahir Tgl:</b> {{ item?.lahirTgl?? '-' }} <b>Jam</b> {{ item?.lahirJam??'-' }}</div>
              <q-separator />
              <div><b>Resusitasi :</b> {{ item?.resusitasi }}</div>
              <q-separator />
              <div><b>Skor APGAR :</b> {{ item?.skorApgar }}</div>
              <q-separator />
              <div><b>BB :</b> {{ item?.beratBadan??'-' }} Cm</div>
              <q-separator />
              <div><b>PB :</b> {{ item?.panjangBadan??'-' }} Cm</div>
              <div><b>LK :</b> {{ item?.linkarKepala??'-' }} Cm</div>
              <div><b>Usia Kehamilan Bayi :</b> {{ item?.usiaKehamilanBayi??'-' }} Minggu</div>
            </td>
          </tr>
        </table>
      </q-card-section>
      <q-card-section class="q-pa-sm">
        <div class="row full-width justify-between">
          <div> <b><i>Diinput Oleh : {{ item?.pegawai?.nama }}</i></b></div>
          <div class="justify-end">
            <q-btn
              icon="icon-mat-delete"
              size="sm"
              round
              flat
              color="red"
              @click="emits('hapus', item)"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>

defineProps({
  items: {
    type: Array,
    default: () => []
  }
})

const emits = defineEmits(['hapus', 'edit'])

</script>

<style lang="scss" scoped>
table {
  border-collapse: collapse;
  width: 100%;
}
table, th, td {
  border: 1px solid $grey;
}

</style>
