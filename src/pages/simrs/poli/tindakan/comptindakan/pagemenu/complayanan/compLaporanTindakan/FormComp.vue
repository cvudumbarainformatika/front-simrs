<template>
  <div class="col-auto bg-dark text-white">
    <div class="q-pa-sm text-weight-bold">
      Form Laporan Tindakan
    </div>
  </div>
  <div class="col full-height scroll">
    <!-- <div class="column fit"> -->
    <q-form
      ref="formRef"
      class="column fit q-pa-md"
      @submit="onSubmit"
    >
      <div class="col full-height scroll">
        <q-select
          v-model="store.form.kddokter"
          outlined
          dense
          standout="bg-yellow-3"
          use-input
          hide-selected
          fill-input
          input-debounce="500"
          :options="dokters"
          style="width: 50%; "
          class="q-my-xs"
          label="Cari Dokter"
          :rules="[val => !!val || 'Maaf Harus diisi terlebih dahulu']"
          hide-bottom-space
          option-label="nama"
          option-value="kode"
          map-options
          emit-value
          @filter="filterFn"
        >
          <template #no-option>
            <q-item>
              <q-item-section class="text-grey">
                No results
              </q-item-section>
            </q-item>
          </template>
        </q-select>
        <!-- <q-input
          v-model="store.form.jenistindakan"
          label="Jenis Tindakan"
          dense
          standout="bg-yellow-3"
          outlined
          style="width: 50%;"
        /> -->

        <div>
          Jenis Tindakan : <em
            v-if="props.pasien?.tindakan?.length"
            class="text-grey"
          >Pilih Tindakan dibawah berikut !</em>
          <em
            v-else
            class="text-negative"
          >Maaf Belum Ada Tindakan pada pasien ini !</em>
          <div
            v-if="props.pasien?.tindakan?.length"
            class="full-width"
          >
            <!-- <q-checkbox
              v-model="store.selectAll"
              color="teal"
              size="xs"
              label="Pilih Semua"
            /> -->

            <q-list
              bordered
              separator
              dense
              class="q-my-sm"
            >
              <q-item
                v-for="(item, i) in props.pasien.tindakan"
                :key="i"
                v-ripple
                tag="label"
                dense
              >
                <q-item-section avatar>
                  <q-radio
                    v-model="store.form.jenistindakan"
                    :val="item.rs4"
                    size="xs"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ item?.mastertindakan?.rs2 }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>

        <div class="flex q-py-md">
          dikirim untuk pemeriksaan PA?
          <q-option-group
            v-model="store.form.dikirimuntukpemeriksaanpa"
            :options="options"
            color="primary"
            inline
            dense
            class="q-pl-md"
          />
        </div>
        <div class="flex q-gutter-xs">
          <app-input-date
            :model="store.form.tanggal"
            outlined
            label="Tanggal Tindakan"
            style="width: 25%;"
            @set-model="val=>store.form.tanggal=val"
          />
          <app-input-date
            :model="store.form.jammulai"
            outlined
            label="Jam dimulai"
            style="width: 25%;"
            :type-date="false"
            @set-model="val=>store.setForm('jammulai',val)"
          />
          <app-input-date
            :model="store.form.jamselesai"
            outlined
            label="Jam Selesai"
            style="width: 25%;"
            :type-date="false"
            @set-model="val=>store.setForm('jamselesai',val)"
          />
          <div>
            <div>Lama Tindakan </div>
            <div>{{ store.form.lamatindakan }}</div>
          </div>
        </div>
        <q-input
          v-model="store.form.catatankomplikasi"
          label="Catatan Komplikasi"
          dense
          outlined
          standout="bg-yellow-3"
          class="q-my-sm"
        />

        <q-input
          v-model="store.form.laporantindakan"
          label="Laporan Tindakan"
          type="textarea"
          outlined
          standout="bg-yellow-3"
          class="q-my-sm"
          :rules="[val => !!val || 'Maaf Harus diisi terlebih dahulu']"
        />

        <!-- <div>
          Laporan Tindakan : <em
            v-if="props.pasien?.tindakan?.length"
            class="text-grey"
          >Pilih Tindakan dibawah berikut !</em>
          <em
            v-else
            class="text-negative"
          >Maaf Belum Ada Tindakan pada pasien ini !</em>
          <div
            v-if="props.pasien?.tindakan?.length"
            class="full-width"
          >
            <q-checkbox
              v-model="store.selectAll"
              color="teal"
              size="xs"
              label="Pilih Semua"
            />

            <q-list
              bordered
              separator
              dense
              class="q-my-sm"
            >
              <q-item
                v-for="(item, i) in props.pasien.tindakan"
                :key="i"
                v-ripple
                tag="label"
                dense
              >
                <q-item-section avatar>
                  <q-checkbox
                    v-model="store.form.laporantindakan"
                    :val="item.rs4"
                    color="teal"
                    size="xs"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ item?.mastertindakan?.rs2 }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div> -->

        <!-- <div
          v-for="n in 100"
          :key="n"
        >
          asdasdas
        </div> -->
      </div>

      <div class="absolute-bottom full-width bg-white shadow-4">
        <div class="row q-pa-md justify-end">
          <q-btn
            type="submit"
            color="primary"
            :loading="store.loading"
            :disable="store.loading"
          >
            Simpan Laporan Tindakan
          </q-btn>
        </div>
      </div>
    </q-form>
    <!-- </div> -->
  </div>
</template>

<script setup>
// import { api } from 'src/boot/axios'
import { useLaporanTindakanPoliStore } from 'src/stores/simrs/pelayanan/poli/laporanTindakan'
import { onMounted, ref, watchEffect } from 'vue'
const store = useLaporanTindakanPoliStore()

const options = [
  {
    label: 'Iya',
    value: 'Iya'
  },
  {
    label: 'Tidak',
    value: 'Tidak'
  }
]

const dokters = ref([])
const formRef = ref()

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

onMounted(() => {
  store.getListDokter()
  store.initForm()
})

// console.log('formCompLapTindakan', props.pasien)

function filterFn (val, update, abort) {
  update(async () => {
    if (val === '') {
      dokters.value = []
    } else {
      const needle = val.toLocaleLowerCase()
      const splits = ['nama']
      const filteredData = multiFilter(store.listdokters, splits, needle)
      dokters.value = filteredData
    }
  })
}

const multiFilter = (data = [], filterKeys = [], value = '') => {
  return data.filter((item) => {
    return filterKeys.some(key => item[key].toString().toLowerCase().includes(value.toLowerCase()) && item[key])
  })
}

// function setModel(val) {
//   console.log('val', val)
//   store.form.kddokter = val
// }

function onSubmit() {
  // console.log(store.form)
  store.simpanData(props.pasien).then(() => {
    // console.log('formCompLapTindakan', props.pasien)
  })
}

watchEffect(() => {
  if (store.selectAll === true) {
    store.form.laporantindakan = props.pasien.tindakan.map(x => x?.rs4)
  }
})
</script>
