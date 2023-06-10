<template>
  <div
    ref="main"
    class="full-height full-width column flex-center items-center q-px-xl q-py-md"
  >
    <div class="self-end q-mb-md">
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
    </div>
    <q-scroll-area
      :thumb-style="thumbStyle"
      :bar-style="barStyle"
      :style="`height:${h}px;
      width:100% ;`"
    >
      <div
        class="container"
      >
        <div
          v-if="items.length"
          class="row justify-center flex-wrap q-col-gutter-xl"
        >
          <div
            v-for="(item, i) in items"
            :key="i"
            class="col-auto"
          >
            <div
              class="card bg-white full-width q-pa-md cursor-pointer"
              @click="goTo(item)"
            >
              <div class="imgBx column flex-center">
                <q-icon
                  :name="item.icon"
                  :color="item.color"
                  class="imgg"
                />
                <div class="txt text-subtitle2">
                  {{ item.julukan }}
                </div>
              </div>
              <div class="content text-right">
                <div>
                  <div class="text-h6 text-negative text-weight-bold">
                    {{ item.singkatan }}
                  </div>
                  <div class="text-subtitle">
                    {{ item.julukan }}
                  </div>
                  <q-btn
                    :label="item.singkatan"
                    :color="item.color"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-scroll-area>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const h = ref()
const main = ref()
const search = ref()
const thumbStyle = ref({
  right: '0px',
  borderRadius: '5px',
  backgroundColor: '#027be3',
  width: '5px',
  opacity: 0.75
})
const barStyle = ref({
  right: '0px',
  borderRadius: '9px',
  backgroundColor: '#027be3',
  width: '9px',
  opacity: 0.2
})
onMounted(() => {
  console.log(main.value.offsetHeight)
  h.value = main.value.offsetHeight - (80 + 10)
})

defineProps({
  items: {
    type: Array,
    default: () => []
  }
})

const emits = defineEmits(['goTo'])

function goTo(item) {
  emits('goTo', item)
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  // max-height: 400px;
  overflow: auto;
  padding: 20px 0;

  .card {
    position: relative;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    width:120px;
    height:120px;

    .content {
      width: 120px;
    }
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
}
</style>
