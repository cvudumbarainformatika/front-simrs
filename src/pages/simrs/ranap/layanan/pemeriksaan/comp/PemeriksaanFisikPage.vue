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
  // background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAACACAMAAABOb9vcAAAAhFBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAADHx8cODg50dHTx8fF2dnZ1dXWWlpZHR0c4ODhQpkZ5AAAAIXRSTlMA9t+/upkRAnPq5NXDfDEsKQjMeGlRThkMsquljTwzIWhBHpjgAAABJElEQVRYw+3YyW7CQBCEYbxig8ELGJyQkJRJyPb+75dj3zy/lD7kMH3+ZEuzSFO1mlZwhjOE2uwhVHJYMygNVwilhz2EUvNaMigledUFoE1anKYAtA9nVRuANpviOQBt0t2ZQSnZ9QxK6Qih9LSGUHkJobYlhGp6CPW4hlAVhckLhMop1InCjEK1FBYU1hSqo/BI4YXCjMIthTWFijDCCB3g7fuO4O1t/rkvQXPz/LUIzX0oAM0tQHOfCkBzC9DcuwLQXACao9Dv1yb9lsek2xaaxMcMH1x6Ff79dY0wwgj/DGv3p2tG4cX9wd55h4rCO/hk3uEs9w6QlXPIbXrfIJ6XrmVBOtJCA1YkXqVLkh1aUgyNk1fV1BxLxzpsuNLKzrME/AWr0ywwvyj83AAAAABJRU5ErkJggg==);
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
