<template>
  <div class="full-height full-width column flex-center q-pa-lg">
    <!-- <q-scroll-area style="400px"> -->
    <div class="container row justify-center flex-wrap q-col-gutter-xl">
      <div
        v-for="n in 15"
        :key="n"
        class="col-md-3 "
      >
        <div class="card bg-white full-width q-pa-md cursor-pointer">
          <div class="imgBx">
            <q-icon
              name="icon-mat-event"
              color="primary"
              size="70px"
              style="max-width: 80px;"
              class="imgg"
            />
            <div class="txt text-h6">
              Simpeg
            </div>
          </div>
          <div class="content text-right">
            <div>
              <div class="text-h6 text-negative">
                Design
              </div>
              <div class="text-subtitle">
                Ini Aplikasi Apa
              </div>
              <q-btn
                label="App"
                color="orange"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- </q-scroll-area> -->
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  max-height: 400px;
  overflow: auto;
  padding: 20px 0;

  .card {
    position: relative;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);

    .imgBx{
      position: absolute;
      top: 10px;
      left: 10px;
      backdrop-filter: blur(30px);
      background-color: rgba(255,255,255,0.2);
      height: calc(100% - 20px);
      width: calc(100% - 20px);
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
        // filter: invert(1);
        max-width: 80px;

      }

    }

    &:hover .imgBx{
        height: 80px;
        width: 80px;
        left: -30px;
        top: calc(50% - 40px)
      }
    &:hover .imgBx .txt{
        display: none;
      }
  }
}
</style>
