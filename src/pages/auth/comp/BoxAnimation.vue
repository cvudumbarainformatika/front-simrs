<template>
  <div class="bungkusbox">
    <div class="box ">
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
</template>

<style lang="scss" scoped>

.bungkusbox {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  overflow: hidden;
  .box div{
    position: absolute;
    width: 60px;
    height: 60px;
    background-color: transparent;
    border: 6px solid rgba(255,255,255,0.8);
    // border-radius: 50%;
  }
  .box div:nth-child(1){
    top:12%;
    left: 42%;
    animation: animate 16s linear infinite;
  }
  .box div:nth-child(2){
    bottom:12%;
    left: 82%;
    animation: animate 5s linear infinite;
  }
  .box div:nth-child(3){
    top:11%;
    left:92%;
    animation: animate 18s linear infinite;
  }
  .box div:nth-child(4){
    top:52%;
    left: 2%;
    animation: animate 12s linear infinite;
  }
  .box div:nth-child(5){
    top:20%;
    left: 80%;
    animation: animate 15s linear infinite;
  }
  .box div:nth-child(6){
    top:30%;
    left: 10%;
    animation: animate 45s linear infinite;
  }
  .box div:nth-child(7){
    top:-5%;
    left: 50%;
    animation: animate 12s linear infinite;
  }
  .box div:nth-child(8){
    top:70%;
    left: 5%;
    animation: animate 10s linear infinite;
  }
  .box div:nth-child(9){
    top:80%;
    left: 42%;
    animation: animate 16s linear infinite;
  }
  .box div:nth-child(10){
    top:70%;
    left: 22%;
    animation: animate 5s linear infinite;
  }
  .box div:nth-child(11){
    top:60%;
    left: 72%;
    animation: animate 8s linear infinite;
  }
  .box div:nth-child(12){
    top:0%;
    left: 0%;
    animation: animate 8s linear infinite;
  }
}

@keyframes animate {
  0% {
    transform: scale(0) translateY(0) rotate(0);
    opacity: 1;
  }
  100% {
    transform: scale(1.3) translateY(-300px) rotate(360deg);
    opacity: 0;
  }
}
</style>
