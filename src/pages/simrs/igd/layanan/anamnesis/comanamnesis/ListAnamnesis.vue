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
        v-if="pasien?.anamnesis?.length <= 0"
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
                  <span class="">Keluhan Utama </span> : <span class="text-weight-bold">{{ item?.rs4 }}</span>
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
                  <span class="">Riwayat Pekerjaan Yang Berhubungan Dengan Zat Berbahaya</span> : <span class="text-weight-bold">{{ item?.riwayat_pekerjaan_yang_berhubungan_dengan_zat_berbahaya }}</span>
                </q-item-label>
                <q-item-label>
                  <span class="">Riwayat Penyakit Keluarga</span> : <span class="text-weight-bold">{{ item?.riwayatpenyakitkeluarga }}</span>
                </q-item-label>
                <!-- <q-separator class="q-my-md" /> -->
                <q-item-label>
                  <span class="text-weight-bold">Skreening Gizi</span>
                </q-item-label>
                <q-item-label>
                  <span class="">- Apakah Pasian mengalami penurunan / peningkatan BB yang tidak diinginkan dalam 6 Bulan terakhir ? <b>{{ getYT(item?.skreeninggizi) }}</b></span>
                  <div class="q-my-xs">
                    - Apakah Asupan Makan berkurang karena tidak nafsu makan ? <b>{{ getYT(item?.asupanmakan) }}</b>
                  </div>
                  <div>- Kondisi Khusus : <em>{{ item?.kondisikhusus }}</em> <b>Skor : {{ item?.skor }}</b> </div>
                </q-item-label>
                <br>
                <div>
                  <q-item-label>
                    <span><q-badge outline color="red">Numeric Rating Scale</q-badge></span>
                  </q-item-label>
                  <q-item-label>
                    <q-separator class="q-my-xs" style="width: 300px;" />
                    <div>
                      - Skor Nyeri : <q-badge color="green">
                        {{ item?.scorenyeri??'-' }}
                      </q-badge>
                      <span
                        v-if="!isNaN(parseInt(item?.scorenyeri))"
                        class="q-mx-sm"
                      >
                        <q-icon
                          size="xs"
                          color="teal"
                          :name="iconNyeri(item?.scorenyeri)"
                        />
                      </span>
                      <em class="text-primary"> {{ item?.keteranganscorenyeri ?? '-' }}</em>
                      <q-separator class="q-my-xs" style="width: 300px;" />
                    </div>
                  </q-item-label>
                  <q-item-label>
                    <span class="text-weight-bold"><q-badge outline color="red">Behavioral Pain Scale (BPS)</q-badge></span>
                  </q-item-label>
                  <q-item-label>- Ekspresi Wajah : {{ item?.anamnesebps?.ekspresi_wajah }}</q-item-label>
                  <q-item-label>- Gerakan Tangan : {{ item?.anamnesebps?.gerakan_tangan }}</q-item-label>
                  <q-item-label>- Kepatuhan terhadap ventilasi mekanik : {{ item?.anamnesebps?.kepatuhan_ventilasi_mekanik }}</q-item-label>
                  <q-item-label>
                    <q-separator class="q-my-xs" style="width: 300px;" />
                    <div>
                      - Skor Nyeri : <q-badge color="green" class="q-mx-sm">
                        {{ item?.anamnesebps?.skor ?? '-' }}
                      </q-badge>
                      <q-badge outline color="green">
                        <em>{{ item?.anamnesebps?.keterangan_skor ?? '-' }}</em>
                      </q-badge>
                      <q-separator class="q-my-xs" style="width: 300px;" />
                    </div>
                  </q-item-label>
                  <q-item-label>
                    <span class="text-weight-bold"><q-badge outline color="red">Neonatus Infant Pain Scale (NIPS)</q-badge></span>
                  </q-item-label>
                  <q-item-label>- Ekspresi Wajah : {{ item?.anamnesenips?.ekspresi_wajah ?? '-' }}</q-item-label>
                  <q-item-label>- Menangis : {{ item?.anamnesenips?.menangis ?? '-' }}</q-item-label>
                  <q-item-label>- Lengan : {{ item?.anamnesenips?.lengan ?? '-' }}</q-item-label>
                  <q-item-label>- Kaki : {{ item?.anamnesenips?.kaki ?? '-' }}</q-item-label>
                  <q-item-label>- Keadaan Rangsangan : {{ item?.anamnesenips?.keadaan_rangsangan ?? '-' }}</q-item-label>
                  <q-item-label>
                    <q-separator class="q-my-xs" style="width: 300px;" />
                    <div>
                      - Skor Nyeri : <q-badge color="green" class="q-mx-sm">
                        {{ item?.anamnesenips?.skor ?? '-' }}
                      </q-badge>
                      <q-badge outline color="green">
                        <em>{{ item?.anamnesenips?.ket_skor ?? '-' }}</em>
                      </q-badge>
                      <q-separator class="q-my-xs" style="width: 300px;" />
                    </div>
                  </q-item-label>
                </div>
                <div>
                  <q-item-label>
                    <span class="text-weight-bold"><q-badge outline color="red">Keterangan Nyeri</q-badge></span>
                  </q-item-label>
                  <q-item-label>- Lokasi Nyeri : {{ item?.anamnesetambahan[0]?.lokasi_nyeri ?? '-' }}</q-item-label>
                  <q-item-label>- Durasi Nyeri : {{ item?.anamnesetambahan[0]?.durasi_nyeri ?? '-' }}</q-item-label>
                  <q-item-label>- Penyebab Nyeri : {{ item?.anamnesetambahan[0]?.penyebab_nyeri ?? '-' }}</q-item-label>
                  <q-item-label>- Frekwensi Nyeri : {{ item?.anamnesetambahan[0]?.frekwensi_nyeri ?? '-' }}</q-item-label>
                  <q-item-label>
                    - Nyeri Hilang : {{ item?.anamnesetambahan[0]?.nyeri_hilang ?? '-' }}
                    <span v-if="item?.anamnesetambahan[0]?.sebutkannyerihilang !== null">
                      ( {{ item?.anamnesetambahan[0]?.sebutkannyerihilang }} )
                    </span>
                  </q-item-label>
                </div>
                <div>
                  <q-item-label>
                    <span class="text-weight-bold"><q-badge outline color="red">Status Fungsional</q-badge></span>
                  </q-item-label>
                  <q-item-label>
                    - Aktivitas Dan Mobilitas : {{ item?.anamnesetambahan[0]?.aktifitas_mobilitas ?? '-' }}
                    <span v-if="item?.anamnesetambahan[0]?.sebutkanperlubanuan !== null">
                      ( {{ item?.anamnesetambahan[0]?.sebutkanperlubanuan }} )
                    </span>
                  </q-item-label>
                  <q-item-label>
                    - Alat Bantu Jalan : {{ item?.anamnesetambahan[0]?.alat_bantu_jalan ?? '-' }}
                    <span v-if="item?.anamnesetambahan[0]?.sebutkanalatbantujalan !== null">
                      ( {{ item?.anamnesetambahan[0]?.sebutkanalatbantujalan }} )
                    </span>
                  </q-item-label>
                </div>
                <div>
                  <q-item-label>
                    <span class="text-weight-bold"><q-badge outline color="red">Kebutuhan Komunikasi dan Edukasi</q-badge></span>
                  </q-item-label>
                  <q-item-label>
                    - Bicara : {{ item?.anamnesetambahan[0]?.bicara ?? '-' }}
                    <span v-if="item?.anamnesetambahan[0]?.sebutkanalatbantujalan !== null">
                      ( {{ item?.anamnesetambahan[0]?.sebutkanalatbantujalan }} )
                    </span>
                  </q-item-label>
                  <q-item-label>
                    - Dibutuhkan Penerjemah : {{ item?.anamnesetambahan[0]?.penerjemah ?? '-' }}
                    <span v-if="item?.anamnesetambahan[0]?.sebutkanpenerjemah !== null">
                      ( {{ item?.anamnesetambahan[0]?.sebutkanpenerjemah }} )
                    </span>
                  </q-item-label>
                  <q-item-label>
                    - Bahasa Isyarat : {{ item?.anamnesetambahan[0]?.bahasa_isyarat ?? '-' }}
                  </q-item-label>
                  <q-item-label>
                    - Hambatan : {{ item?.anamnesetambahan[0]?.hambatan ?? '-' }}
                    <span v-if="item?.anamnesetambahan[0]?.sebutkanhambatan !== null">
                      ( {{ item?.anamnesetambahan[0]?.sebutkanhambatan }} )
                    </span>
                  </q-item-label>
                </div>
                <!-- <div>
                  <q-item-label>
                    <span class="text-weight-bold"><q-badge outline color="red">Kebutuhan Komunikasi dan Edukasi</q-badge></span>
                  </q-item-label>
                  <q-item-label>
                    - Bicara : {{ item?.anamnesetambahan[0]?.bicara ?? '-' }}
                    <span v-if="item?.anamnesetambahan[0]?.sebutkanalatbantujalan !== null">
                      ( {{ item?.anamnesetambahan[0]?.sebutkanalatbantujalan }} )
                    </span>
                  </q-item-label>
                  <q-item-label>
                    - Dibutuhkan Penerjemah : {{ item?.anamnesetambahan[0]?.penerjemah ?? '-' }}
                    <span v-if="item?.anamnesetambahan[0]?.sebutkanpenerjemah !== null">
                      ( {{ item?.anamnesetambahan[0]?.sebutkanpenerjemah }} )
                    </span>
                  </q-item-label>
                  <q-item-label>
                    - Bahasa Isyarat : {{ item?.anamnesetambahan[0]?.bahasa_isyarat ?? '-' }}
                  </q-item-label>
                  <q-item-label>
                    - Hambatan : {{ item?.anamnesetambahan[0]?.hambatan ?? '-' }}
                    <span v-if="item?.anamnesetambahan[0]?.sebutkanhambatan !== null">
                      ( {{ item?.anamnesetambahan[0]?.sebutkanhambatan }} )
                    </span>
                  </q-item-label>
                </div> -->
                <div>
                  <q-item-label>
                    <span class="text-weight-bold"><q-badge outline color="red">Batuk</q-badge></span>
                  </q-item-label>
                  <q-item-label>
                    - Riwayat Demam : {{ item?.anamnesetambahan[0]?.riwayat_demam ?? '-' }}
                  </q-item-label>
                  <q-item-label>
                    - Berkeringan Pada Malam Hari Tanpa Aktivitas : {{ item?.anamnesetambahan[0]?.berkeringat_malam_hari ?? '-' }}
                  </q-item-label>
                  <q-item-label>
                    - Riwayat Bepergian Dari Daerah Wabah : {{ item?.anamnesetambahan[0]?.riwayat_bepergian ?? '-' }}
                  </q-item-label>
                  <q-item-label>
                    - Riwayat Pemakaian Obat Jangka Panjang : {{ item?.anamnesetambahan[0]?.riwayat_pemakaian_obat ?? '-' }}
                  </q-item-label>
                  <q-item-label>
                    - Riwayat BB Turun Tanpa Sebab Yang Diketauhig : {{ item?.anamnesetambahan[0]?.riwayat_bb_turun ?? '-' }}
                  </q-item-label>
                </div>
              </q-item-section>
              <q-item-section
                v-if="bisaEditHapus"
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
  },
  bisaEditHapus: {
    type: Boolean,
    default: true
  }
})

const lists = computed(() => {
  const arr = props.pasien?.anamnesis
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
</script>
