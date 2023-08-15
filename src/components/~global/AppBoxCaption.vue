<template>
  <div class="frame1-container">
    <div class="frame1-frame1">
      <span class="frame1-text"><span>{{ caption }}</span></span>
      <span class="frame1-text2"><span>{{ label }}</span></span>
      <img
        src="~assets/images/rectangle326-g27k-200h.png"
        alt="Rectangle326"
        class="frame1-rectangle3"
      >
      <img
        src="~assets/images/union29-jqwf.svg"
        alt="Union29"
        class="frame1-union"
      >
    </div>
  </div>
</template>

<script setup>
defineProps({
  caption: { type: String, default: 'caption' },
  label: { type: String, default: 'label' }
})
</script>

<style scoped>
.frame1-container {
  width: 100%;
  display: flex;
  overflow: auto;
  min-height: 100vh;
  align-items: center;
  flex-direction: column;
}
.frame1-frame1 {
  width: 460px;
  height: 89px;
  display: flex;
  overflow: hidden;
  position: relative;
  align-items: center;
  flex-shrink: 0;
  justify-content: flex-start;
  background-color: rgba(255, 255, 255, 1);
}
.frame1-text {
  top: 62px;
  left: 13px;
  color: #ffffff;
  width: 232px;
  height: auto;
  z-index: 101;
  position: absolute;
  font-size: 12px;
  font-style: Regular;
  text-align: left;
  font-family: Inter;
  font-weight: 400;
  line-height: normal;
  font-stretch: normal;
  text-decoration: none;
}
.frame1-text2 {
  top: 21px;
  left: 11px;
  color: rgba(0, 0, 0, 1);
  width: 414px;
  height: auto;
  position: absolute;
  font-size: 24px;
  font-style: Regular;
  text-align: left;
  font-family: Inter;
  font-weight: 400;
  line-height: normal;
  font-stretch: normal;
  text-decoration: none;
}
.frame1-rectangle3 {
  width: 452px;
  height: 78px;
  align-self: flex-start;
  box-sizing: content-box;
  border-color: rgba(236, 154, 154, 1);
  border-style: solid;
  border-width: 4px;
  border-radius: 15px;
}
.frame1-union {
  top: 58px;
  left: 3px;
  width: 312px;
  height: 27px;
  z-index: 100;
  position: absolute;
}
</style>
