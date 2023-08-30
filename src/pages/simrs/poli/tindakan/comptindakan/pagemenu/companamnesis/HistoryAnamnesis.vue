<template>
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
            @click="emits('close')"
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
</template>

<script setup>
import { ref } from 'vue'
import { useSlideup } from 'src/composable/gsap/slideup'
const { enter, leave } = useSlideup()

defineProps({
  seamless: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['close'])

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

<style lang="scss" scoped>
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
