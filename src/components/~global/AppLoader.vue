<template>
  <div class="full-height full-width column flex-center hitam">
    <div class="loader" />
  </div>
</template>

<style lang="scss" scoped>
$black : #000;
.loader {
  position: relative;
  width:150px;
  height:150px;
  border-radius: 50%;
  background: linear-gradient(45deg, transparent, transparent 40%, $lime);
  animation: animate 2s linear infinite;
  &::before{
    content: '';
    position: absolute;
    top: 6px;
    left: 6px;
    right: 6px;
    bottom: 6px;
    background: $black;
    border-radius: 50%;
    z-index: 1000;
  }
  &::after{
    content: '';
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background: linear-gradient(45deg, transparent, transparent 40%, $lime);
    border-radius: 50%;
    z-index: 1000;
    z-index: 1;
    filter: blur(30px);
  }
}

.hitam {
  background: $black;
}

@keyframes animate {
  0%{
    transform: rotate(0deg);
    filter: hue-rotate(0deg);
  }
  100%{
    transform: rotate(360deg);
    filter: hue-rotate(360deg);
  }
}
</style>
