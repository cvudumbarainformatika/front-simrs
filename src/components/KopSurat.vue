<template>
  <div>
    <div class="row garis-bawah">
      <div class="col-2">
        <q-img
          src="~assets/images/logo-kota-grey.png"
          spinner-color="white"
          style="height: 3.56cm; max-width: 2.86cm"
        />
      </div>
      <div class="col-8">
        <div class="row justify-center f-18">
          PEMERINTAH KOTA PROBOLINGGO
        </div>
        <div class="row justify-center f-12 text-weight-bold">
          DINAS KESEHATAN, PENGENDALIAN PENDUDUK, DAN KELUARGA BERENCANA
        </div>
        <div class="row justify-center f-26 text-weight-bold">
          UOBK RSUD DOKTER MOHAMAD SALEH
        </div>
        <div class="row justify-center f-14">
          Jl. Mayjen Panjaitan No.65 Telp.(0335) 433119, 42118 Fax (0335) 432702
        </div>
        <div class="row justify-center f-14">
          E-mail : rsudprob@probolinggokota.go.id
        </div>
        <div class="row justify-center f-14 text-weight-bold">
          PROBOLINGGO  67219
        </div>
      </div>
      <div class="col-2">
        <q-img
          src="~assets/images/logo-rsud.png"
          spinner-color="white"
          style="height: 2.8cm; max-width: 2.86cm"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.print{
  position: absolute;
    right: 30px;
    top: 5px;
    z-index: 10;
}
.garis-bawah{
  border-bottom: 6px solid black;
  border-bottom-style: double;
}
.border-box{
  border: 1px solid black;
}
.border-tb{
  border-top: 1px solid black;
  border-bottom: 1px solid black;
}
.border-left{
  border-left: 1px solid black;
}
.border-right{
  border-right: 1px solid black;
}
.border-bottom{
  border-bottom: 1px solid black;
}
</style>
