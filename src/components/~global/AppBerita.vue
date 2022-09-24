<template>
  <div class="column">
    <!-- breadcumb -->
    <div class="breadcumb q-pb-lg">
      <q-breadcrumbs>
        <q-breadcrumbs-el
          label="Home"
          icon="home"
        />
        <q-breadcrumbs-el
          label="Components"
          icon="widgets"
        />
        <q-breadcrumbs-el label="Breadcrumbs" />
      </q-breadcrumbs>
    </div>
    <!-- title -->
    <div class="title text-h5 text-weight-bold">
      Jadwal Liga Italia Akhir Pekan Ini: Inter Milan vs Spezia, Atalanta Lawan AC Milan
    </div>
    <!-- info berita -->
    <div class="flex items-center justify-between q-py-sm">
      <div class="col-md-6 col-xs-12">
        <div class="flex items-center text-grey q-gutter-md">
          <div class="flex items-center">
            <q-icon
              name="edit_calendar"
              class="q-pr-sm"
            /> <span>08 mei 2018</span>
          </div>
          <div class="flex items-center">
            <q-icon
              name="bookmark"
              class="q-pr-sm"
            /> <span>Kategori : Berita</span>
          </div>
        </div>
      </div>
      <!-- button share -->
      <div class="col-md-6 col-xs-12">
        <div class="flex items-center text-grey q-gutter-sm">
          <q-btn
            round
            unelevated
            size="sm"
            color="blue"
            icon="ti-facebook"
          />
          <q-btn
            round
            unelevated
            size="sm"
            color="red"
            icon="ti-instagram"
          />
          <q-btn
            rounded
            unelevated
            size="sm"
            color="dark"
            label="copy link"
          />
        </div>
      </div>
    </div>
    <q-img
      src="https://cdn.quasar.dev/img/parallax2.jpg"
      :ratio="16/9"
      class="rounded-borders"
    />

    <div class="desc-image text-grey">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde, ducimus a veritatis explicabo voluptatibus, culpa, eius soluta perferendis eum repellat molestias sed earum? Harum, ullam. Sapiente odio dolorem architecto qui.
    </div>
    <div class="content q-py-lg">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde, ducimus a veritatis explicabo voluptatibus, culpa, eius soluta perferendis eum repellat molestias sed earum? Harum, ullam. Sapiente odio dolorem architecto qui.
    </div>
  </div>
</template>
