<template>
  <div class="full-height q-pa-sm">
    <div class="row q-col-gutter-x-xs full-height">
      <div class="col-7 full-height">
        <q-card
          flat
          bordered
          square
          class="full-height"
        >
          <q-card-section>
            <div class="row items-center justify-between">
              <div class="f-14 text-weight-bold">
                Form Anamnesis
              </div>
              <div>
                <q-btn
                  flat
                  dense
                  size="md"
                  icon="icon-mat-history"
                  @click="seamless = !seamless"
                >
                  <q-tooltip class="bg-dark text-white">
                    History Pasien
                  </q-tooltip>
                </q-btn>
              </div>
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section
            class="scroll"
          >
            <div class="">
              <div class="row q-col-gutter-md q-mb-md">
                <div class="col-4">
                  <div class="text-weight-bold">
                    Keluhan Utama
                  </div>
                  <div class="text-grey-8 f-10">
                    Keluhan yang menjadi alasan utama
                    pasien
                  </div>
                </div>
                <div class="col-8">
                  <q-input
                    v-model="text"
                    outlined
                    autogrow
                    standout="bg-yellow-3"
                  />
                </div>
              </div>
              <div class="row q-col-gutter-md q-mb-md">
                <div class="col-4">
                  <div class="text-weight-bold">
                    Riwayat Penyakit
                  </div>
                  <div class="text-grey-8 f-10">
                    Riwayat penyakit yang pernah diderita
                    oleh pasien
                  </div>
                </div>
                <div class="col-8">
                  <q-input
                    v-model="text"
                    outlined
                    autogrow
                    standout="bg-yellow-3"
                  />
                </div>
              </div>
              <div class="row q-col-gutter-md q-mb-md">
                <div class="col-4">
                  <div class="text-weight-bold">
                    Riwayat Alergi
                  </div>
                  <div class="text-grey-8 f-10">
                    Riwayat alergi yang pernah dialami
                    oleh pasien
                  </div>
                </div>
                <div class="col-6">
                  <q-select
                    v-model="model"
                    dense
                    outlined
                    :options="options"
                    stack-label
                    emit-value
                    map-options
                    standout="bg-yellow-3"
                  >
                    <template #append>
                      <q-icon
                        v-if="model !== null"
                        class="cursor-pointer"
                        name="icon-mat-clear"
                        size="xs"
                        @click.stop.prevent="model = ''"
                      />
                    </template>
                  </q-select>
                </div>
              </div>
              <div class="row q-col-gutter-md q-mb-md">
                <div class="col-4">
                  <div class="text-weight-bold">
                    Riwayat Pengobatan
                  </div>
                  <div class="text-grey-8 f-10">
                    Riwayat obat-obatan yang pernah
                    dikonsumsi oleh pasien
                  </div>
                </div>
                <div class="col-8">
                  <q-input
                    v-model="text"
                    outlined
                    autogrow
                    standout="bg-yellow-3"
                  />
                </div>
              </div>
            </div>
          </q-card-section>
          <!-- <q-separator class="q-my-lg" /> -->
          <q-card-actions
            align="right"
            class="bg-primary text-white absolute-bottom"
          >
            <app-btn
              color="dark"
              label="Simpan Data"
              tooltip="Simpan Data"
              tip
            />
          </q-card-actions>
        </q-card>
      </div>
      <div class="col-5 full-height">
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
            <q-btn
              dense
              size="sm"
              icon="icon-mat-close"
              flat
            />
          </q-bar>
          <q-card-section
            style="padding:0"
            class="full-height"
          >
            <q-scroll-area style="height:calc(100% - 40px);">
              <q-list separator>
                <q-item
                  v-for="n in 2"
                  :key="n"
                >
                  <q-item-section>
                    <q-item-label
                      lines="2"
                      class="f-12"
                    >
                      <span class="text-weight-bold">Keluhan Utama</span> : ....
                    </q-item-label>
                    <q-item-label
                      lines="2"
                    >
                      <span class="text-weight-bold">Riwayat Penyakit</span> : ....
                    </q-item-label>
                    <q-item-label
                      lines="2"
                    >
                      <span class="text-weight-bold">Riwayat Alergi</span> : ....
                    </q-item-label>
                    <q-item-label
                      lines="2"
                    >
                      <span class="text-weight-bold">Riwayat Pengobatan</span> : ....
                    </q-item-label>
                  </q-item-section>

                  <q-item-section
                    side
                    top
                  >
                    <q-btn
                      flat
                      round
                      size="sm"
                      icon="icon-mat-edit"
                    />
                    <q-btn
                      flat
                      round
                      size="sm"
                      icon="icon-mat-delete"
                      color="negative"
                    />
                  </q-item-section>
                </q-item>
                <q-separator />
              </q-list>
            </q-scroll-area>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- dialog -->
    <transition
      appear
      @enter="enter"
      @leave="leave"
    >
      <div
        v-if="seamless"
        class="absolute-bottom full-width"
        style="height: 450px;"
      >
        <q-card
          class="full-height full-height"
          dark
          square
        >
          <q-linear-progress
            :value="0.7"
            color="pink"
          />

          <q-card-section class="row items-center no-wrap">
            <div>
              <div class="text-weight-bold">
                History Anamnese Pasien
              </div>
              <div class="text-grey">
                Bisa di pilih jika anamnesisnya sama
              </div>
            </div>

            <q-space />
            <q-btn
              flat
              round
              icon="icon-mat-close"
              @click="seamless = !seamless"
            />
          </q-card-section>
          <q-separator dark />
          <q-card-section>
            <q-table
              class="my-sticky-header-table"
              flat
              bordered
              :rows="rows"
              :columns="columns"
              row-key="name"
            />
          </q-card-section>
        </q-card>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { useSlideup } from 'src/composable/gsap/slideup'
import { onMounted, ref } from 'vue'
const seamless = ref(false)
// const options = [
//   { value: '', label: '' },
//   { value: 1, label: 'Obat' },
//   { value: 2, label: 'Makanan' },
//   { value: 3, label: 'Udara' },
//   { value: 4, label: 'Lain-lain' }
// ]
const options = ['Obat', 'Makanan', 'Udara', 'Lain-lain']
const model = ref(options[0])
const text = ref('')
const { enter, leave } = useSlideup()
onMounted(() => {
  console.log(model.value)
  console.log(text.value)
})

const columns = ref([
  {
    name: 'name',
    required: true,
    label: 'Dessert (100g serving)',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true },
  { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
  { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
  { name: 'protein', label: 'Protein (g)', field: 'protein' },
  { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
  { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
])

const rows = ref([
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: '14%',
    iron: '1%'
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: '8%',
    iron: '1%'
  },
  {
    name: 'Eclair',
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    sodium: 337,
    calcium: '6%',
    iron: '7%'
  },
  {
    name: 'Cupcake',
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    sodium: 413,
    calcium: '3%',
    iron: '8%'
  },
  {
    name: 'Gingerbread',
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    sodium: 327,
    calcium: '7%',
    iron: '16%'
  },
  {
    name: 'Jelly bean',
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    sodium: 50,
    calcium: '0%',
    iron: '0%'
  },
  {
    name: 'Lollipop',
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    sodium: 38,
    calcium: '0%',
    iron: '2%'
  },
  {
    name: 'Honeycomb',
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    sodium: 562,
    calcium: '0%',
    iron: '45%'
  },
  {
    name: 'Donut',
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    sodium: 326,
    calcium: '2%',
    iron: '22%'
  },
  {
    name: 'KitKat',
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    sodium: 54,
    calcium: '12%',
    iron: '6%'
  }
])
</script>

<style lang="scss">
.my-sticky-header-table{
  height: 300px;

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th{
    background-color: $dark;
    color: #fff;
  }

  thead tr th{
    position: sticky;
    z-index: 1;
  }

  thead tr:first-child th{
    top: 0;
  }

  &.q-table--loading thead tr:last-child th{
    top: 48px;
  }
  tbody{
    scroll-margin-top: 48px;
  }
}

</style>
