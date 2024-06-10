<template>
  <div class="app-table f-12">
    <!-- title option table -->
    <div class="print-only">
      <slot
        name="header-for-print"
      />
    </div>
    <div class="flex items-center justify-between q-mb-md  print-hide">
      <!-- title -->
      <!-- <div class="title-table q-pr-sm f-14 text-bold">
        {{ title }}
      </div> -->
      <div class="col-one flex items-center">
        <div v-if="adaCari">
          <q-input
            v-model="search"
            outlined
            class="search-big"
            borderless
            debounce="500"
            clearable
            dense
            placeholder="Search..."
            @keydown.enter.prevent="searchEnter"
          >
            <template #prepend>
              <q-icon
                name="icon-mat-search"
                size="20px"
              />
            </template>
          </q-input>
        </div>
        <slot
          name="header-left-after-search"
          class="q-ml-md"
        />
      </div>
      <div class="col-one">
        <!-- delete Ids -->
        <slot
          name="header-right-before"
          class="q-ml-md"
        />
        <q-btn
          v-if="selected.length>0"
          unelevated
          color="red"
          round
          size="sm"
          icon="icon-mat-delete_sweep"
          @click="deleteData()"
        >
          <q-tooltip
            class="primary"
            :offset="[10, 10]"
          >
            Hapus Data
          </q-tooltip>
        </q-btn>
        <!-- refresh Ids -->
        <q-btn
          unelevated
          round
          size="sm"
          icon="icon-mat-refresh"
          @click="emits('refresh')"
        >
          <q-tooltip
            class="primary"
            :offset="[10, 10]"
          >
            Refresh Table
          </q-tooltip>
        </q-btn>
        <!-- per page -->
        <q-btn
          class="q-ml-sm"
          unelevated
          color="orange"
          round
          size="sm"
          icon="icon-mat-layers"
        >
          <q-tooltip
            class="primary"
            :offset="[10, 10]"
          >
            Filter Table
          </q-tooltip>
          <q-menu
            transition-show="flip-left"
            transition-hide="flip-right"
            anchor="top left"
            self="top right"
          >
            <q-list dense>
              <q-item
                v-for="(opt, i) in options"
                :key="i"
                v-ripple
                tag="label"
              >
                <!-- <q-item-section> -->
                <q-radio
                  v-model="selectPerPage"
                  size="xs"
                  :val="opt"
                  :label="opt + ' Baris'"
                  color="primary"
                />
                <!-- </q-item-section> -->
                <!-- <q-item-label /> -->
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
        <!-- filter table -->
        <q-btn
          class="q-ml-sm"
          unelevated
          color="indigo"
          round
          size="sm"
          icon="icon-mat-sort"
        >
          <q-tooltip
            class="primary"
            :offset="[10, 10]"
          >
            Filter Table
          </q-tooltip>
          <q-menu
            transition-show="flip-left"
            transition-hide="flip-right"
            class="q-pt-sm"
          >
            <q-list style="min-width: 131px">
              <q-item
                v-for="(head, index) in filterCheckbox"
                :key="index"
                v-ripple
                tag="label"
              >
                <q-item-section avatar>
                  <q-checkbox
                    v-model="selectColumn"
                    size="sm"
                    dense
                    :val="head"
                    color="primary"
                  />
                </q-item-section>
                <q-item-section>{{ head }}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
        <!-- data baru -->
        <q-btn
          v-if="addData && adaTambah"
          class="q-ml-sm"
          unelevated
          round
          color="primary"
          size="sm"
          icon="icon-mat-add"
          @click="emits('newData')"
        >
          <q-tooltip
            class="primary"
            :offset="[10, 10]"
          >
            Data Baru
          </q-tooltip>
        </q-btn>
      </div>
    </div>
    <q-separator />
    <!-- table -->
    <q-markup-table
      ref="refCellTable"
      dense
      flat
      bordered
      separator="cell"
      class="screenwide"
    >
      <thead>
        <tr v-if="enableHead">
          <th
            v-if="isChecked"
            width="5%"
            class="text-left"
          >
            <div>
              <q-checkbox
                v-model="checkAll"
                size="xs"
                keep-color
                color="cyan"
              />
            </div>
          </th>
          <th
            v-if="rowNo"
            width="5%"
            class="text-left"
          >
            <div class="text-weight-bold">
              No
            </div>
          </th>
          <th
            v-if="rowImage !== null"
            width="5%"
            class="text-left"
          >
            <div class="">
              #
            </div>
          </th>
          <th
            v-for="(head, index) in filterColumn"
            :key="index"
            class="cursor-pointer"
            @click="emits('setOrder', head)"
          >
            <div class="row items-center text-weight-bold">
              <slot
                :name="'col-' + head"
                :row="head"
                :left="'col-grow text-left'"
                :right="'col-grow text-right'"
              >
                <div class="col-grow text-left">
                  {{ head }}
                </div>
              </slot>
              <div v-if="orderBy===head">
                <q-icon
                  v-if="sort==='desc'"
                  class="q-ml-xs"
                  name="icon-mat-vertical_align_bottom"
                />
                <q-icon
                  v-else
                  class="q-ml-xs"
                  name="icon-mat-vertical_align_top"
                />
              </div>
            </div>
          </th>
          <th
            v-if="rightAction"
            class="text-right"
          >
            <div class="">
              #
            </div>
          </th>
        </tr>
        <tr v-if="!enableHead">
          <slot name="top-row" />
        </tr>
      </thead>
      <tbody v-if="!loading">
        <tr v-if="!items.length > 0">
          <transition
            transition-show="fade"
            transition-hide="fade"
          >
            <td :colspan="rowImage === null? filterColumn.length + 1 : filterColumn.length + 1">
              <div
                class="flex column flex-center bg-loading-bg__table"
                style="height:300px"
              >
                <div>
                  <q-icon
                    name="icon-mat-receipt_long"
                    color="primary"
                    size="60px"
                  />
                </div>
                <div class="text-primary q-mt-sm">
                  Data Belum Ada
                </div>
              </div>
            </td>
          </transition>
        </tr>
        <tr
          v-for="(item, i) in items"
          v-else
          :key="i"
          class="text-left"
          :class="clickAble ? item.highlight===true? 'cursor-pointer bg-light-blue-11':'cursor-pointer':''"
          @click="clickAble?clicked(item,i):''"
        >
          <td v-if="isChecked">
            <q-checkbox
              v-model="selected"
              size="xs"
              keep-color
              :val="item.id"
              color="teal"
            />
          </td>
          <td
            v-if="rowNo"
            width="5%"
            class="text-left"
          >
            {{ i+1 }}
          </td>
          <!-- <td
            v-if="rowImage !== null"
            class="text-left"
          >
            <slot
              :name="'cell-default-img'"
              :row="item"
            />
          </td> -->
          <td
            v-for="( col, idx ) in filterColumn"
            :key="idx"
            width="10%"
            class="text-left"
          >
            <slot
              :name="'cell-' + col"
              :row="item"
            >
              {{ item[col] }}
            </slot>
          </td>
          <td
            v-if="leftBtn"
            class="text-right"
          >
            <div class="row justify-end items-center">
              <!-- class="q-ml-md" -->
              <slot
                name="left-acttion"
                :row="item"
                :col="i"
              />
              <div v-if="defaultBtn">
                <q-btn
                  v-if="adaEdit"
                  flat
                  class=""
                  size="sm"
                  round
                  color="grey"
                  icon="icon-mat-edit"
                  @click="emits('editData',item)"
                >
                  <q-tooltip
                    anchor="top middle"
                    self="center middle"
                  >
                    Edit Data
                  </q-tooltip>
                </q-btn>
                <q-btn
                  v-if="selected.length < 2 && adaDelete"
                  flat
                  class=""
                  size="sm"
                  round
                  color="grey"
                  icon="icon-mat-delete_sweep"
                  @click="deleteOne(item.id)"
                >
                  <q-tooltip
                    anchor="top middle"
                    self="center middle"
                  >
                    Delete Data
                  </q-tooltip>
                </q-btn>
              </div>

              <div v-else>
                <slot
                  name="custom-btn"
                  :row="item"
                />
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <slot name="bottom-row" />
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td :colspan="rowImage === null? filterColumn.length + 2 : filterColumn.length + 3">
            <div
              class="flex column flex-center bg-loading-bg__table"
              style="height:400px"
            >
              <div>
                <q-spinner-cube
                  color="primary"
                  size="40px"
                />
              </div>
              <div class="text-primary q-mt-sm">
                harap bersabar, menunggu...
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </q-markup-table>
    <div class="print-only">
      <slot
        name="footer-for-print"
      />
    </div>
    <!-- Pagination -->
    <AppPaginationTable
      v-if="items.length > 0"
      class="print-hide"
      :meta="meta"
      @first="emits('goto', 1)"
      @last="emits('goto', meta.last_page)"
      @next="emits('goto', meta.current_page + 1)"
      @prev="emits('goto', meta.current_page - 1)"
    />
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const props = defineProps({
  addData: { type: Boolean, default: true },
  title: { type: String, default: '' },
  loading: { type: Boolean, default: false },
  columns: { type: Array, default: () => [] },
  columnHide: { type: Array, default: () => [] },
  items: { type: Array, default: () => [] },
  meta: { type: Object, default: () => {} },
  rowImage: { type: String, default: null },
  rowNo: { type: Boolean, default: false },
  perPage: { type: Number, default: 12 },
  orderBy: { type: String, default: 'id' },
  sort: { type: String, default: 'desc' },
  toSearch: { type: String, default: '' },
  isChecked: { type: Boolean, default: false },
  defaultBtn: { type: Boolean, default: true },
  adaEdit: { type: Boolean, default: true },
  adaDelete: { type: Boolean, default: true },
  adaTambah: { type: Boolean, default: true },
  adaCari: { type: Boolean, default: true },
  clickAble: { type: Boolean, default: false },
  leftBtn: { type: Boolean, default: false },
  enableHead: { type: Boolean, default: true },
  rightAction: { type: Boolean, default: true },
  textSize: { type: Number, default: 12 }
})
const emits = defineEmits(['onClick', 'newData', 'editData', 'goto', 'deleteIds', 'setRow', 'setColumns', 'setOrder', 'find', 'search', 'delete', 'refresh'])

// const per_page = ref(5)
const refCellTable = ref(null)
const options = ref([5, 10, 20, 50, 100, 1000])
const checkAll = ref(false)
const selected = ref([])
const selectPerPage = computed({
  get () { return props.perPage },
  set (val) { emits('setRow', val) }
})

const search = computed({
  get () { return props.toSearch },
  set (newVal) { emits('find', newVal) }
})

const clicked = (val, i) => {
  emits('onClick', { item: val, index: i })
}
const filterColumn = computed(() => {
  const cols = props.columns ? props.columns : []
  if (cols.length > 0) {
    const filterred = cols.filter((el) => !props.columnHide.includes(el))
    if (selectColumn.value.length > 0) {
      const thumb = filterred.filter((el) => selectColumn.value.includes(el))
      return thumb
    }
    return filterred
  }

  return cols
})

const filterCheckbox = computed(() => {
  const cols = props.columns ? props.columns : []
  if (cols.length > 0) {
    return cols.filter((el) => !props.columnHide.includes(el))
  }
  return cols
})

const selectColumn = ref([])
const heightCell = ref(0)
// actions
onMounted(() => {
  // console.log(props.columns)
  heightCell.value = refCellTable.value.$el.clientHeight * props.perPage
//   console.log(refCellTable.value.$el.clientHeight * props.perPage)
})
watch(filterCheckbox, (obk) => {
  for (let i = 0; i < obk.length; i++) {
    selectColumn.value.push(obk[i])
  }
})

watch(checkAll, () => {
  setCheck(checkAll.value)
})
watch(selectColumn, () => {
  setCheck(checkAll.value)
})
watch(() => props.items, (obj) => {
//   console.log('Watch items', obj)
  selected.value = []
})

function searchEnter (evt) {
  emits('search', evt.target.value)
}

const setCheck = (x) => {
  const arr = []
  if (x) {
    for (let i = 0; i < props.items.length; i++) {
      arr.push(props.items[i].id)
    }
    selected.value = arr
  }
  else {
    selected.value = []
  }
}
function deleteData () {
  $q.dialog({
    title: 'Peringatan',
    message: 'Apakah Data ini akan dihapus?',
    cancel: true
    // persistent: true
  }).onOk(() => {
    // const params = { id: selected.value }
    emits('deleteIds', selected.value)
  }).onCancel(() => {
    console.log('Cancel')
    selected.value = []
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}
function deleteOne (id) {
  $q.dialog({
    title: 'Peringatan',
    message: 'Apakah Data ini akan dihapus?',
    cancel: true
    // persistent: true
  }).onOk(() => {
    // const params = { id: selected.value }
    emits('delete', id)
  }).onCancel(() => {
    console.log('Cancel')
    selected.value = []
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}

const ts = computed(() => (props.textSize).toString() + 'px')
const pts = computed(() => (props.textSize - 2).toString() + 'px')
</script>

<style lang="scss" scoped>

$fs : v-bind(ts);
$pfs: v-bind(pts);

@mixin width-full($full: true) {
  @if $full {
    max-width: 100% !important;
  }
}
@mixin wrap($full: true) {
  @if $full {
    padding:10px 10px;
      white-space: normal !important;
        word-wrap: normal !important;
        hyphens: manual;
  } @else {
    padding:8px 10px;
  }
}

.app-table {
  width: 100%; /* print width */
  font-size:$fs;

  // .q-table{
  //   @include width-full($full: true);
  // }
  .q-table {
    max-width: 100% !important;
  }
  // .q-table td {
  //   padding: 10px 10px;
  //   font-size: $fs;
  // }
  // .q-table th {
  //   padding:15px 10px;
  //   font-size: $fs;
  // }
  .q-table td {
      font-size:$fs;
      @include wrap($full: false);
    }
    .q-table th {
      font-size:$fs;
      @include wrap($full: false);
    }
}

@media print {
  .app-table {
    width: 100%; /* print width */
    font-size:$pfs;

    .q-table {
        max-width: 100% !important;
      }
    .q-table td {
      padding: 5px 5px;
      font-size: $pfs;
       white-space: normal !important;
        word-wrap: normal !important;
        hyphens: manual;
    }
    .q-table th {
      padding:5px 5px;
      font-size:$pfs;
      white-space: normal !important;
        word-wrap: normal !important;
        hyphens: manual;
    }

    .screenwide{
      max-width: 100% !important;
    }
  }
}
</style>
