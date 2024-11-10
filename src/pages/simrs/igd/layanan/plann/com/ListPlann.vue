<template>
  <q-card
    flat
    bordered
    square
    class="full-height bg-teal-2"
    style="overflow: hidden;"
  >
    <q-bar
      class="bg-teal text-white z-top"
      style="width: inherit;"
    >
      <div class="f-12">
        Data Anamnesis
      </div>
      <q-space />
    </q-bar>
    <q-card-section
      style="padding:0"
      class="full-height bg-grey"
    >
      <div
        v-if="loadingaja"
        class="column full-height flex-center"
      >
        <div class="text-white">
          Harap Tunggu .....
        </div>
        <div class="text-white">
          Sinkron Data Ke DATABASE
        </div>
      </div>
      <div
        v-if="pasien?.anamnesekebidanan?.length <= 0"
        class="column full-height flex-center"
      >
        <div class="text-white">
          Belum Ada data tersimpan
        </div>
      </div>
      <q-scroll-area
        v-else
        style="height:calc(100% - 32px);"
      >
        <q-list
          class="bg-white"
          separator
        >
          <transition-group name="list">
            <q-item
              v-for="(item , n) in lists"
              :key="n"
              class="list-move"
            >
              <q-item-section>
                <q-item-label
                  class="f-12"
                >
                  <span class="">Keluhan Utama </span> : <span class="text-weight-bold">{{ item?.keluhanutama }}</span>
                </q-item-label>
                <q-item-label>
                  <span class="">Riwayat Penyakit (Sekarang) </span> : <span class="text-weight-bold">{{ item?.riwayatpenyakitsekarang }}</span>
                </q-item-label>
                <q-item-label>
                  <span class="">Riwayat Penyakit </span> : <span class="text-weight-bold">{{ item?.riwayatpenyakit }}</span>
                </q-item-label>
                <q-item-label>
                  <span class="">Riwayat Alergi </span> : <span class="text-weight-bold">{{ item?.riwayatalergi }}</span>
                </q-item-label>
                <q-item-label>
                  <span class="">Reaksi berupa </span> : <span class="text-weight-bold">{{ item?.keteranganalergi }}</span>
                </q-item-label>
                <q-item-label>
                  <span class="">Riwayat Pengobatan</span> : <span class="text-weight-bold">{{ item?.riwayatpengobatan }}</span>
                </q-item-label>
                <q-item-label>
                  <span class="">Riwayat Pekerjaan Yang Berhubungan Dengan Zat Berbahaya</span> : <span class="text-weight-bold">{{ item?.riwayatpekerjaan }}</span>
                </q-item-label>
                <q-separator class="q-my-md" />
                <q-item-label>
                  <span class="text-weight-bold">Skreening Gizi</span>
                </q-item-label>
                <div v-if="item?.optionskriniggizi === 1">
                  <q-item-label>
                    <span class="">- Apakah Pasian mengalami penurunan / peningkatan BB yang tidak diinginkan dalam 6 Bulan terakhir ? <b>{{ getYT(item?.skreeninggizi) }}</b></span>
                    <div class="q-my-xs">
                      - Apakah Asupan Makan berkurang karena tidak nafsu makan ? <b>{{ getYT(item?.asupanmakan) }}</b>
                    </div>
                    <div>
                      - Kondisi Khusus : <em>{{ item?.kondisikhusus }}</em> <b>
                        <div>
                          - Skor Gizi :
                          <q-badge color="green" v-if="item?.skor < 2">
                            {{ item?.skor }}
                          </q-badge>
                          <q-badge color="red" v-else>
                            {{ item?.skor }}
                          </q-badge>
                          Keterangan :
                          <q-badge outline color="green" v-if="item?.skor < 2">
                            {{ store.keteranganSkorGizi(item?.skor) }}
                          </q-badge>
                          <q-badge outline color="red" v-else>
                            {{ store.keteranganSkorGizi(item?.skor) }}
                          </q-badge>
                          <q-separator class="q-my-xs" style="width: 300px;" />
                        </div>
                      </b>
                    </div>
                  </q-item-label>
                </div>
                <div v-if="item?.optionskriniggizi === 2">
                  <q-item-label>
                    <div>- Apakah Asupan Makan Berkurang Karena Tidak Nafsu Makan? <b>{{ getYT(item?.asupanmakanberkurang) }}</b></div>
                    <div>
                      - Ada Gangguan Metabolisme (DM, Gangguan Fungsi Tiroid, Infeksi Kronis dll)? <b>{{ getYT(item?.metabolisme) }}</b>
                    </div>
                    <div>
                      - Ada Penambahan Berat Badan Yang Kurang Atau Lebih Sesuai Dengan Usia Kehamilan? <b>{{ getYT(item?.penambahanbb) }}</b>
                    </div>
                    <div>
                      - Nilai Hb Kurang Dari 10g/dL, atau HCT Kurang Dari 30% <b>{{ getYT(item?.nilaihbberkurang) }}</b>
                    </div>
                    <q-separator class="q-my-xs" style="width: 300px;" />
                    <div>
                      - Skor Gizi :
                      <q-badge color="green" v-if="item?.skorgizix < 2">
                        {{ item?.skorgizix }}
                      </q-badge>
                      <q-badge color="red" v-else>
                        {{ item?.skorgizix }}
                      </q-badge>
                      Keterangan :
                      <q-badge outline color="green" v-if="item?.skorgizix < 2">
                        {{ store.keteranganSkorGizi(item?.skorgizix) }}
                      </q-badge>
                      <q-badge outline color="red" v-else>
                        {{ store.keteranganSkorGizi(item?.skorgizix) }}
                      </q-badge>
                      <q-separator class="q-my-sm" />
                    </div>
                  </q-item-label>
                </div>
                <br>
                <q-item-label>
                  <span class="text-weight-bold">Assesmen Nyeri ({{ metodenyeri(item?.metodenyeri) }})</span>
                </q-item-label>
                <q-item-label>
                  <div>
                    <div v-if="item?.metodenyeri === 'nrt'">
                      - Skor Nyeri :
                      <b> {{ item?.skornyeri??'-' }} </b>

                      <span
                        v-if="!isNaN(parseInt(item?.skornyeri))"
                        class="q-mx-sm"
                      >
                        <q-icon
                          size="xs"
                          color="teal"
                          :name="iconNyeri(item?.skornyeri)"
                        />
                      </span>
                      <em class="text-primary"> {{ item?.keteranganscorenyeri ?? '-' }}</em>
                      <q-separator class="q-my-xs" style="width: 300px;" />
                    </div>
                    <div v-if="item?.metodenyeri === 'bps'">
                      <q-item-label>- Ekspresi Wajah : {{ item?.ekspresiwajah }}</q-item-label>
                      <q-item-label>- Gerakan Tangan : {{ item?.gerakantangan }}</q-item-label>
                      <q-item-label>- Kepatuhan terhadap ventilasi mekanik : {{ item?.kepatuhanventilasimekanik }}</q-item-label>
                      <q-item-label>
                        <q-separator class="q-my-xs" style="width: 300px;" />
                        <div>
                          Skor Nyeri (BPS) =
                          <q-badge :color="ketcolorbps(item?.scroebps)">
                            {{ item?.scroebps }}
                          </q-badge>
                          Keterangan : <q-badge outline :color="ketcolorbps(item?.scroebps)">
                            {{ item?.ketscorebps }}
                          </q-badge>
                          <q-separator class="q-my-xs" />
                        </div>
                      </q-item-label>
                    </div>
                    <div v-if="item?.metodenyeri === 'nips'">
                      <q-item-label>- Ekspresi Wajah : {{ item?.ekspresiwajahnips ?? '-' }}</q-item-label>
                      <q-item-label>- Menangis : {{ item?.menangis ?? '-' }}</q-item-label>
                      <q-item-label>- Pola Nafas : {{ item?.polanafas ?? '-' }}</q-item-label>
                      <q-item-label>- Lengan : {{ item?.lengan ?? '-' }}</q-item-label>
                      <q-item-label>- Kaki : {{ item?.kaki ?? '-' }}</q-item-label>
                      <q-item-label>- Keadaan Rangsangan : {{ item?.keadaanrangsangan ?? '-' }}</q-item-label>
                      <q-item-label>
                        <q-separator class="q-my-xs" style="width: 300px;" />
                        <div>
                          Skor Nyeri (NIPS) =
                          <q-badge :color="ketcolorbps(item?.scroenips)">
                            {{ item?.scroenips }}
                          </q-badge>
                          Keterangan : <q-badge outline :color="ketcolorbps(item?.scroenips)">
                            {{ item?.ketscorenips }}
                          </q-badge>
                          <q-separator class="q-my-xs" />
                        </div>
                      </q-item-label>
                    </div>
                  </div>
                </q-item-label>
                <div>
                  <q-item-label>
                    <span class="text-weight-bold"><b>Keterangan Nyeri</b></span>
                  </q-item-label>
                  <q-item-label>- Lokasi Nyeri : <b> {{ item?.lokasinyeri ?? '-' }}</b></q-item-label>
                  <q-item-label>- Durasi Nyeri : <b>{{ item?.durasinyeri ?? '-' }}</b></q-item-label>
                  <q-item-label>- Penyebab Nyeri : <b>{{ item?.penyebabnyeri ?? '-' }}</b></q-item-label>
                  <q-item-label>- Frekwensi Nyeri : <b>{{ item?.frekwensinyeri ?? '-' }}</b></q-item-label>
                  <q-item-label>
                    - Nyeri Hilang : {{ item?.nyerihilang ?? '-' }}
                    <span v-if="item?.sebutkannyerihilang !== null">
                      ( {{ item?.sebutkannyerihilang }} )
                    </span>
                  </q-item-label>
                  <q-separator class="q-my-md" />
                </div>
                <div>
                  <q-item-label>
                    <span class="text-weight-bold"><b>Kebutuhan Komunikasi dan Edukasi</b></span>
                  </q-item-label>
                  <q-item-label>
                    - Bicara : <b> {{ item?.kebutuhankomunikasidanedukasi ?? '-' }}</b>
                    <span v-if="item?.sebutkankomunaksilainnya !== null">
                      ( {{ item?.sebutkankomunaksilainnya }} )
                    </span>
                  </q-item-label>
                  <q-item-label>
                    - Dibutuhkan Penerjemah : <b>{{ item?.penerjemah ?? '-' }}</b>
                    <span v-if="item?.sebutkanpenerjemah !== null">
                      ( {{ item?.sebutkanpenerjemah }} )
                    </span>
                  </q-item-label>
                  <q-item-label>- Bahasa Isyarat : <b>{{ item?.bahasaisyarat ?? '-' }}</b></q-item-label>
                  <q-item-label>
                    - Hambatan : <b>{{ item?.hamabatan ?? '-' }}</b>
                    <span v-if="item?.sebutkanhambatan !== null">
                      ( {{ item?.sebutkanhambatan }} )
                    </span>
                  </q-item-label>
                  <q-separator class="q-my-md" />
                </div>
                <div>
                  <q-item-label>
                    <span class="text-weight-bold"><b>Riwayat Pemakaian Alat Kontrasepsi</b></span>
                  </q-item-label>
                  <q-item-label>- Pernah  : <b> {{ item?.alatkontrasepsi ?? '-' }}</b></q-item-label>
                  <q-item-label>- Jenis : <b>{{ item?.jeniskontasepsi ?? '-' }}</b></q-item-label>
                  <q-item-label>
                    - Lama Pemakaian : <b>{{ item?.tahunlamapemakaiankontrasepsi ?? '0' }} Tahun
                      {{ item?.bulanlamapemakaiankontrasepsi ?? '0' }} Bulan
                      {{ item?.minggulamapemakaiankontrasepsi ?? '0' }} Minggu
                      {{ item?.harilamapemakaiankontrasepsi ?? '0' }} Hari
                    </b>
                  </q-item-label>
                  <q-item-label>- Keluhan  : <b>{{ item?.keluhankontrasepsi ?? '-' }}</b></q-item-label>
                  <q-separator class="q-my-md" />
                </div>
                <div>
                  <q-item-label>
                    <span class="text-weight-bold"><b>Riwayat Pernikahan</b></span>
                  </q-item-label>
                  <q-item-label>
                    - Status Pernikahan  : <b> {{ item?.statuspernikahan ?? '-' }},
                      <span v-if="item?.jumlahpernikahan !== null">
                        Jumlah Pernikahan {{ item?.jumlahpernikahan }}
                      </span>
                    </b>
                  </q-item-label>
                  <q-item-label>- Umur Pertama Kali Kawin : <b>{{ item?.umurpertamanikah ?? '0' }} Tahun</b></q-item-label>
                  <q-item-label>- Kawin Dengan Suami Ke : </q-item-label>
                  <q-separator class="q-my-md" />
                </div>
                <div>
                  <q-item-label>
                    <span class="text-weight-bold"><b>Riwayat Menstruasi</b></span>
                  </q-item-label>
                  <q-item-label>- Menarche Umur  : <b> {{ item?.menarcheumur ?? '-' }} Tahun</b></q-item-label>
                  <q-item-label>- Siklus : <b>{{ item?.siklus ?? '-' }} Hari</b></q-item-label>
                  <q-item-label>- Keteraturan : <b>{{ item?.keteraturan ?? '-' }}</b></q-item-label>
                  <q-item-label>- Lama Hari : <b>{{ item?.lamahaririwayatmens ?? '-' }}</b></q-item-label>
                  <q-item-label>
                    - Keluhan Haid : <b>{{ item?.keluhanhaid ?? '-' }}</b>
                    <span v-if="item?.sebutkankeluhanhaid !== null">
                      ({{ item?.sebutkankeluhanhaid }})
                    </span>
                  </q-item-label>
                  <q-separator class="q-my-md" />
                </div>
                <div>
                  <q-item-label>
                    <span class="text-weight-bold"><b>Riwayat Penyakit Ginekologi</b></span>
                  </q-item-label>
                  <q-item-label>
                    -  Apakah terdapat riwayat penyakit ginekologi? : <b>{{ item?.riwayatginekologi ?? '-' }}</b>
                    <span v-if="item?.ginekologis !== null">
                      ({{ item?.ginekologis }})
                    </span>
                    <span v-if="item?.sebutkanginekologis !== null">
                      ({{ item?.sebutkanginekologis }})
                    </span>
                  </q-item-label>
                  <q-separator class="q-my-md" />
                </div>
                <div>
                  <q-item-label>
                    <span class="text-weight-bold"><b>Riwayat Hamil</b></span>
                  </q-item-label>
                  <q-item-label>- Hari Pertama Haid Terakhir : <b>{{ item?.haid ?? '-' }}</b></q-item-label>
                  <q-item-label>- Gravida : <b>{{ item?.gravida ?? '-' }}</b></q-item-label>
                  <q-item-label>- Partus : <b>{{ item?.partus ?? '-' }}</b></q-item-label>
                  <q-item-label>- Abortus : <b>{{ item?.abortus ?? '-' }}</b></q-item-label>
                  <q-item-label>- Taksiran Partus : <b>{{ item?.taksiranpartus ?? '-' }}</b></q-item-label>
                  <q-item-label>
                    - Asuhan Antenatal : <b>{{ item?.asupanantenatal ?? '-' }}</b>
                    <span v-if="item?.updateasupanantenatal !== null">
                      ({{ item?.updateasupanantenatal }})
                    </span>
                    <span v-if="item?.sebutkanasupanantenatal !== null">
                      ({{ item?.sebutkanasupanantenatal }})
                    </span>
                  </q-item-label>
                  <q-item-label>- Frekwensi : <b>{{ item?.frekuensi ?? '-' }}</b></q-item-label>
                  <q-item-label>
                    - Imunisasi TT : <b>{{ item?.imunisasitt ?? '-' }}</b>
                    <span v-if="item?.sebutkanimunisasitt !== null">
                      ({{ item?.sebutkanimunisasitt }}x)
                    </span>
                  </q-item-label>
                  <q-separator class="q-my-md" />
                </div>
                <div>
                  <q-item-label>
                    <span class="text-weight-bold"><b>Keluhan saat hamil</b></span>
                  </q-item-label>
                  <q-item-label>
                    - Keluhan saat hamil : <b>{{ item?.keluhanhamil ?? '-' }}</b>
                    <span v-if="item?.sebutkeluhanhamils !== null">
                      ({{ item?.sebutkeluhanhamils }}x)
                    </span>
                  </q-item-label>
                  <q-separator class="q-my-md" />
                </div>
                <div>
                  <q-item-label>
                    <span class="text-weight-bold"><b>Status Obstetri dan ginekologi</b></span>
                  </q-item-label>
                  <q-item-label>- Periksa Luar : <b>{{ item?.periksaluarginekologi ?? '-' }}</b></q-item-label>
                  <q-item-label>- Inspekulo : <b>{{ item?.inspekuloginekologi ?? '-' }}</b></q-item-label>
                  <q-item-label>- Periksa Demam : <b>{{ item?.periksadalamginekologi ?? '-' }}</b></q-item-label>
                </div>
              </q-item-section>
              <q-item-section
                side
              >
                <div class="q-gutter-sm">
                  <q-btn
                    flat
                    round
                    size="sm"
                    icon="icon-mat-edit"
                    @click="store.editForm(item)"
                  />
                  <q-btn
                    flat
                    round
                    size="sm"
                    icon="icon-mat-delete"
                    color="negative"
                    @click="hapusItem(item.id)"
                  />
                </div>
              </q-item-section>
            </q-item>
          </transition-group>
        </q-list>
      </q-scroll-area>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { useAnamnesis } from 'src/stores/simrs/igd/anamnesis'
import { computed } from 'vue'
const store = useAnamnesis()
const $q = useQuasar()
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  loadingaja: {
    type: Boolean,
    default: false
  }
})

function ketcolorbps (val) {
  if (parseInt(val) === 3) {
    return 'light-green'
  }
  else if (parseInt(val) === 4 && parseInt(val) <= 6) {
    return 'green'
  }
  else if (parseInt(val) === 7 && parseInt(val) <= 9) {
    return 'orange'
  }
  else if (parseInt(val) === 10 && parseInt(val) <= 12) {
    return 'red'
  }
}

const lists = computed(() => {
  const arr = props.pasien?.anamnesekebidanan
  // console.log('hahaha', arr)
  return arr?.sort((a, b) => { return b.id - a.id })
})

function getYT (val) {
  if (val === 1 || val === '1') {
    return 'Ya'
  }
  else if (val === 0 || val === '0') {
    return 'Tidak'
  }
  else {
    return '-'
  }
}

function hapusItem (id) {
  $q.dialog({
    dark: true,
    title: 'Peringatan',
    message: 'Apakah Data ini akan dihapus?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    // console.log('OK')
    store.deleteData(props.pasien, id)
  }).onCancel(() => {
    // console.log('Cancel')
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}

function iconNyeri (anu) {
  const val = typeof anu === 'string' ? (isNaN(parseInt(anu)) ? 0 : parseInt(anu)) : 0
  // console.log('val nyeri', val)
  // console.log('anu nyeri', anu)
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
}

function metodenyeri (val) {
  console.log('val nyeri', val)
  if (val === 'nrt') {
    return 'Numeric Rating Scale'
  }
  else if (val === 'bps') {
    return 'Behavioral Pain Scale'
  }
  else if (val === 'nips') {
    return 'Neonatus Infant Pain Scale'
  }
}
</script>
