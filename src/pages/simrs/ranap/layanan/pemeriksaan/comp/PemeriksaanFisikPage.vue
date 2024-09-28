<template>
  <div class="row fit">
    <!-- Left pane -->
    <div class="left-panel col-auto full-height bg-red">
      opo
    </div>
    <div class="page-content col full-width full-height " id="workspace">
      <CanvasComp class="full-width full-height" />
    </div>
    <!-- Right pane -->
    <div class="right-panel full-height bg-red relative-position" :class="settings.righDrawer ? 'col-4' : 'col-0'">
      <div>
        Kanan
      </div>
      <div class="close-btn bg-white cursor-pointer z-top" @click="settings.righDrawer = !settings.righDrawer">
        <div class="column full-height flex-center">
          <q-icon :name="settings.righDrawer ? 'icon-mat-chevron_right' : 'icon-mat-chevron_left'" size="22px" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineAsyncComponent, reactive } from 'vue'

const CanvasComp = defineAsyncComponent(() => import('./pemeriksaanFisik/CanvasComp.vue'))
defineProps({
  pasien: {
    type: Object,
    default: () => null
  }
})
const settings = reactive({
  LeftDrawer: true,
  righDrawer: true
})
</script>

<style lang="scss" scoped>
#workspace {
  overflow: hidden;
}

.close-btn {
  width: 20px;
  height: 64px;
  cursor: pointer;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
  position: absolute;
  left: -20px;
  z-index: 1;
  top: 50%;
  margin-top: -10px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;

}
</style>
