<template>
  <q-splitter
    v-model="splitterModel"
    style="height: 600px"
  >
    <template #before>
      <div class="q-pa-md">
        <div class="text-h4">
          Selamat Datang
        </div>
        <div class=" q-mb-md">
          di Sesi Pemanggilan Antrian
        </div>
        <q-card
          class="bg-grey-2"
          flat
        >
          <q-card-section>
            <div class="row">
              <div class="col-4">
                <div class="q-pa-lg">
                  <q-img
                    :src="gambar"
                  />
                </div>
              </div>
              <div class="col-8 q-pa-lg">
                <div
                  v-for="(x, y) in info"
                  :key="y"
                  class="row items-center q-mt-md no-wrap"
                >
                  <div class="column">
                    <div
                      class="kotak column flex-center"
                      :class="y+1 === info.length?'bg-primary text-white':'bg-white'"
                    >
                      {{ y + 1 }}
                    </div>
                  </div>
                  <div class="text-subtitle2 q-ml-lg">
                    {{ x }}
                  </div>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </template>

    <template #after>
      <div class="q-pa-md">
        <div class="text-h4">
          Unit Antrian
        </div>
        <div class=" q-mb-md">
          Pilih Unit Antrian dibawah berikut
        </div>
        <!-- LISTX -->

        <q-list
          bordered
          padding
          class="rounded-borders"
        >
          <q-item-label header>
            <q-input
              v-model="cari"
              outlined
              class="search-big"
              borderless
              debounce="500"
              dense
              placeholder="Cari Unit Antrian..."
            >
              <template #prepend>
                <q-icon
                  name="icon-mat-search"
                  size="20px"
                />
              </template>
            </q-input>
          </q-item-label>

          <q-item
            v-for="(item, i) in filterUnits "
            :key="i"
            v-ripple
            clickable
            @click="emits('unitSelected', item.value)"
          >
            <q-item-section
              avatar
              top
            >
              <q-avatar
                icon="icon-mat-dvr"
                color="accent"
                text-color="white"
              />
            </q-item-section>

            <q-item-section>
              <q-item-label
                lines="1"
                class="text-subtitle2"
              >
                {{ item.label }}
              </q-item-label>
            </q-item-section>

            <q-item-section
              side
              class="text-blue"
              :class="i+1=== mouseOrg?'txt-underline':''"
              @mouseover="mouseOrg = i+1"
              @mouseleave="mouseOrg=0"
            >
              Pilih
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </template>
  </q-splitter>
</template>

<script setup>
import { computed, ref } from 'vue'
import madsaleh from 'src/assets/images/mad_saleh_minum.png'

const mouseOrg = ref(0)
const gambar = computed(() => {
  return new URL(madsaleh, import.meta.url).href
})

const info = ref([
  'Pilih Unit Antrian Tempat Anda Bertugas disamping Berikut, Jika Unit Anda Tidak Ada ... Harap Lapor Kepada Petugas yang berwenang',
  'Halaman Ini Tidak Perlu di Refresh / Reload , Karenan aplikasi ini menggunakan System Realtime',
  'Jangan Lupa Tersenyum ... panggil Antrian Sesuai Urutan Pada Table Antrian'

])

const props = defineProps({
  units: {
    type: Array,
    default: () => []
  },
  search: {
    type: String,
    default: ''
  }
})

const filterUnits = computed(() => {
  if (cari.value === '') {
    return props.units
  }
  return props.units.filter(v => v.label.toLowerCase().indexOf(cari.value.toLowerCase()) > -1)
})

const cari = computed({
  get () { return props.search },
  set (newVal) { emits('findUnit', newVal) }
})

const emits = defineEmits(['findUnit', 'unitSelected'])

// function cariUnits() {
//   emits('findUnit', search.value)
// }

const splitterModel = ref(70)
</script>

<style lang="scss" scoped>
.kotak {
  // background-color: #fff;
  border-radius: 5px;
  width:50px !important;
  height: 50px !important;
}

.txt-underline {
  text-decoration: underline;
}
</style>
