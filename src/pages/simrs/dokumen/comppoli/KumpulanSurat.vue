<template>
  <div
    ref="main"
    class="full-height full-width column flex-center items-center"
    :class="isMobile? 'q-px-sm q-py-md': 'q-px-xl q-py-md'"
  >
    <!-- <div class="self-end q-mb-md">
      <q-input
        v-model="search"
        standout="bg-white text-dark"
        label="Cari Aplikasi"
        dense
        dark
      >
        <template #prepend>
          <q-icon name="icon-mat-search" />
        </template>
      </q-input>
    </div> -->
    <!-- <q-scroll-area
      :thumb-style="thumbStyle"
      :bar-style="barStyle"
      :style=" `height:${h}px; width:100%;`
      "
      class="flex-center items-center"
    > -->
    <div
      class="container flex-center"
      :style="`height:${h}px;  width:100%;`"
    >
      <div
        v-if="items.length"
        class="wrapper"
        :class="!isMobile? ' q-col-gutter-xl': 'q-col-gutter-md'"
      >
        <div
          v-for="(item, i) in items"
          :key="i"
          class="col-auto"
        >
          <div
            v-if="!isMobile"
            class="card bg-white cursor-pointer"
            @click="goTo(item)"
          >
            <!-- <div class="imgBx column flex-center items-center">
              <q-icon
                :name="item.icon"
                :color="item.color"
                class="imgg"
              />
              <div class="txt text-subtitle2">
                {{ item.label }}
              </div>
            </div> -->
            <div class="content text-right">
              <div class="text-h6 text-negative text-weight-bold">
                {{ item.jenis }}
              </div>
              <div class="f-10">
                {{ item.label }}
              </div>
              <q-btn
                :label="item.jenis"
                :color="item.color"
                dense
                padding="sm"
                class="absolute-bottom"
              />
            </div>
          </div>
          <div
            v-else
            class="card-mobile bg-white cursor-pointer justify-center"
            @click="goTo(item)"
          >
            <div class="img-mob column flex-center items-center">
              <div>
                <q-icon
                  :name="item.icon"
                  :color="item.color"
                  size="30px"
                />
              </div>
              <div class="txt f-10">
                {{ item.julukan }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- </q-scroll-area> -->
  </div>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { onMounted, ref } from 'vue'

const h = ref()
const main = ref()
// const search = ref()
// const thumbStyle = ref({
//   right: '0px',
//   borderRadius: '5px',
//   backgroundColor: '#027be3',
//   width: '5px',
//   opacity: 0.75
// })
// const barStyle = ref({
//   right: '0px',
//   borderRadius: '9px',
//   backgroundColor: '#027be3',
//   width: '9px',
//   opacity: 0.2
// })

defineProps({
  items: {
    type: Array,
    default: () => []
  },
  akses: {
    type: [Array, String],
    default: () => []
  }
})
const emits = defineEmits(['goTo'])

const $q = useQuasar()
const isMobile = ref($q.platform.is.mobile)
// const filterApps = computed(() => {
//   const allApp = props.items
//   const akses = props.akses
//   if (akses === 'all') {
//     return allApp
//   }
//   const filt = akses.reduce(function(r, e) {
//     r[e.aplikasi_id] = (r[e.aplikasi_id] || 0) + e.aplikasi_id
//     return r
//   }, {})

//   const group = Object.keys(filt)
//   const grouped = group.map(x => parseInt(x))
//   const r = allApp.filter((a) => grouped.some(x => x === a.id))
//   return r
// })

onMounted(() => {
  console.log('main ', main.value.offsetHeight)
  h.value = main.value.offsetHeight
  // console.log('kumpulan apps', filterApps.value)
  // console.log('kumpulan akses', props.akses)
})

function goTo(item) {
  emits('goTo', item)
}
</script>

<style lang="scss" scoped>

.card-mobile {
    position: relative;
    width: 60px;
    height: 60px;
    padding:5px;
    border-radius: 5px;
    // justify-content: center;
    // align-items: center;
      // display: flow-root;
    .img-mob{
      display: flex;
      overflow: hidden;
      justify-content: center;
      align-items: center;
      width: 100%;
      white-space: nowrap;
    }
}
.container {
  width: 100%;
  height: 100%;
  // max-height: 400px;
  overflow: auto;
  padding: 20px 0;

    .wrapper {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        align-content: stretch;
        justify-content: center;
    }

  }

  .card {
    position: relative;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    width:130px;
    height:120px;
    padding:10px;
    // overflow: hidden;

    .imgBx{
      position: absolute;
      top: 5px;
      left: 5px;
      backdrop-filter: blur(30px);
      background-color: rgba(255,255,255,0.2);
      height: calc(100% - 10px);
      width: calc(100% - 10px);
      z-index: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      border-radius: 10px;
      border: 1px solid rgba(255,255,255,0.2);
      box-shadow: 5px 5px 30px rgba(0,0,0,0.1);
      transition: 0.3s ease-in-out;

      .imgg{
        max-width: 80px;
        font-size: 50px;
      }

    }

    &:hover .imgBx{
        height: 80px;
        width: 80px;
        left: -40px;
        top: calc(50% - 40px);
        background-color: transparent;
      }
    &:hover .imgBx .txt{
        display: none;
      }
  }
</style>
