<template>
  <q-list
    bordered
    separator
    class="bg-white rounded-borders"
  >
    <q-item
      v-for="n in 4"
      :key="n"
      v-ripple
      clickable
    >
      <q-item-section avatar>
        <q-avatar
          rounded
          size="110px"
        >
          <q-img
            src="https://placeimg.com/500/300/nature"
            style="max-width: 110px; height: 90px;"
            fit="cover"
            class="rounded-borders"
          />
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label
          lines="2"
          class="f-14 text-weight-bold"
        >
          Dewan Minta Stok Obat di RSUD dr Mohammad Saleh Segera Terpenuhi
        </q-item-label>
        <div class="flex items-center text-grey q-my-sm f-10">
          <div class="flex items-center q-mr-sm">
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
        <q-item-label
          caption
          lines="2"
        >
          <span class="text-weight-bold">Probolinggo </span>
          -- Stok obat di RSUD dr Mohamad Saleh Kota Probolinggo sedang mengalami krisis. Penyebabnya adalah kondisi keuangan rumah sakit yang tak stabil akibat utang
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>
