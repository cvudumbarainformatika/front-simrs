<template>
  <q-card>
    <q-list
      bordered
      separator
      class="rounded-borders"
    >
      <q-item-label header>
        Table Data Berita
      </q-item-label>
      <q-separator />
      <q-item
        v-for="n in 10"
        :key="n"
        class="q-py-sm"
      >
        <q-item-section
          avatar
          class="col-2"
        >
          <q-img
            :ratio="16/9"
            src="~assets/images/rsud.jpg"
          />
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">
            <span class="text-weight-medium">[quasarframework/quasar]</span>
            <span class="text-grey-8"> - GitHub repository</span>
          </q-item-label>
          <q-item-label
            caption
            lines="1"
          >
            @rstoenescu in #3: > Generic type parameter for props
          </q-item-label>
          <q-item-label
            lines="1"
            class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase"
          >
            <span class="cursor-pointer">Open in GitHub</span>
          </q-item-label>
        </q-item-section>

        <q-item-section
          side
        >
          <div class="text-grey-8 q-gutter-xs">
            <q-btn
              class="gt-xs"
              size="12px"
              flat
              dense
              round
              icon="delete"
            />
            <q-btn
              class="gt-xs"
              size="12px"
              flat
              dense
              round
              icon="done"
            />
            <q-btn
              size="12px"
              flat
              dense
              round
              icon="more_vert"
            />
          </div>
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>
