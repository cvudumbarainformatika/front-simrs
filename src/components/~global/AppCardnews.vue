<template>
  <q-card
    flat
    bordered
    class="cursor-pointer card-news"
  >
    <q-img
      src="https://cdn.quasar.dev/img/parallax2.jpg"
      :ratio="16/9"
    />
    <q-card-section>
      <div class="f-20 text-weight-bold">
        Dewan Minta Stok Obat di RSUD dr Mohammad Saleh Segera Terpenuhi
      </div>
      <div class="flex items-center text-grey q-my-sm f-10">
        <div class="flex items-center q-mr-sm ">
          <q-icon
            name="edit_calendar"
            class="q-pr-xs"
          /> <div>08 mei 2018</div>
        </div>
        <div class="flex items-center">
          <q-icon
            name="bookmark"
            class="q-pr-xs"
          /> <div>Kategori : Berita</div>
        </div>
      </div>
      <div class="f-14">
        <strong>Probolinggo – </strong>  Stok obat di RSUD dr Mohamad Saleh Kota Probolinggo sedang mengalami krisis. Penyebabnya adalah kondisi keuangan rumah sakit yang tak stabil akibat utang
      </div>
    </q-card-section>
    <!-- <q-card-actions align="right">
      <q-btn
        flat
        round
        color="grey"
        icon="visibility"
        size="sm"
        class="q-pl-xs"
      /> <span class="text-grey">12</span>
      <q-btn
        flat
        round
        color="grey"
        size="sm"
        icon="forum"
      /><span class="text-grey">12</span>
    </q-card-actions> -->
  </q-card>
</template>

<style lang="scss" scoped>
.card-news{
  color:$grey-10;
}
</style>
