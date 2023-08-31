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
            :rows="store.historys"
            :columns="columns"
            row-key="keluhanutama"
            :loading="store.loadingHistory"
            separator="cell"
          >
            <template #body-cell-opt="props">
              <q-td :props="props">
                <q-btn
                  flat
                  style="color: #FF0080"
                  label="Pilih"
                  @click="pilihData(props.row)"
                />
              </q-td>
            </template>
            <template #loading>
              <q-inner-loading
                showing
                color="primary"
              />
            </template>
          </q-table>
        </q-card-section>
      </q-card>
    </div>
  </transition>
</template>

<script setup>
import { ref } from 'vue'
import { useSlideup } from 'src/composable/gsap/slideup'
import { useAnamnesis } from 'src/stores/simrs/pelayanan/poli/anamnesis'
import { humanDate } from 'src/modules/formatter'
const { enter, leave } = useSlideup()

const store = useAnamnesis()
defineProps({
  seamless: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['close'])

const columns = ref([
  {
    keluhanutama: 'name',
    required: true,
    label: 'Keluhan Utama',
    align: 'left',
    field: row => row.keluhanutama,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'riwayatpenyakit', align: 'left', label: 'Riwayat Penyakit', field: 'riwayatpenyakit', sortable: true },
  { name: 'riwayatalergi', align: 'left', label: 'Riwayat Alergi', field: 'riwayatalergi', sortable: true },
  { name: 'tgl', align: 'right', label: 'Tanggal', field: 'tgl', format: val => `${humanDate(val)}`, sortable: true },
  { name: 'opt', align: 'right', label: '#', field: 'tgl' }
])

function pilihData(row) {
  // console.log(row)
  store.pilihHistory(row)
}

</script>

<style lang="scss" scoped>
.my-sticky-header-table {
  height: 320px;
  cursor: pointer;
}
</style>

<!-- <style lang="sass" scoped>
.my-sticky-header-table
  /* height or max-height is important */
  height: 310px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #00b4ff

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px

  /* prevent scrolling behind sticky top row on focus */
  tbody
    /* height of all previous header rows */
    scroll-margin-top: 48px
</style> -->
