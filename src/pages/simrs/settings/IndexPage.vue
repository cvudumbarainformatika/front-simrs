<template>
  <q-page
    ref="main"
    class=""
  >
    <div
      class="padding-xxxl q-pt-md"
    >
      <q-card
        class="card-my shadow-22"
        :style="`height:${h}px`"
      >
        <div
          style="height:70px"
          class="q-px-lg q-py-md"
        >
          <app-input
            dense
            valid
            label="search"
          />
        </div>
        <q-scroll-area :style="`height:${hScroll}px`">
          <div class="q-px-lg q-py-sm">
            <div
              v-for="n in 50"
              :key="n"
            >
              Drawer {{ n }} / 50
            </div>
          </div>
        </q-scroll-area>
        <div
          ref="bot"
          style="height:72px"
          class="absolute-bottom bg-primary text-white q-px-lg q-py-md"
        >
          <div class="row">
            <q-avatar
              size="40px"
              font-size="20px"
              color="dark"
              text-color="white"
              icon="icon-mat-person"
            />
            <q-space />
            <q-btn
              flat
              padding="sm"
              icon="icon-mat-settings"
            />
          </div>
        </div>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const main = ref(null)
const h = ref()
const hScroll = ref()

onMounted(() => {
  h.value = main.value.$el.offsetHeight - 35
  hScroll.value = h.value - (72 + 70)

  console.log(h.value)
})
</script>

<style lang="scss" scoped>
.padding-xxxl {
  padding-left: 20%;
  padding-right: 20%;
}
</style>
