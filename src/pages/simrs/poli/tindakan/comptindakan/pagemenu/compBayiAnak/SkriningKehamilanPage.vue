<template>
  <div class="fit column scroll bg-grey-4">
    <div class="row justify-center q-pa-lg">
      <div class="col-10">
        <q-card
          style="width:100%;"
        >
          <q-card-section>
            <table>
              <thead>
                <tr>
                  <th width="3%">
                    I
                  </th>
                  <th width="3%">
                    II
                  </th>
                  <th width="47%">
                    III
                  </th>
                  <th
                    width="47%"
                    colspan="6"
                  >
                    IV
                  </th>
                </tr>
                <tr>
                  <th width="3%">
                    KEL
                  </th>
                  <th width="3%">
                    NO
                  </th>
                  <th width="47%">
                    MASALAH/FAKTOR RESIKO
                  </th>
                  <th width="5%">
                    SKOR
                  </th>
                  <th colspan="4">
                    TRIBULAN
                  </th>
                </tr>
                <tr>
                  <th
                    width="3%"
                    class="text-weight-light"
                  >
                    F.R
                  </th>
                  <th width="3%" />
                  <th
                    width="47%"
                    class="text-weight-light"
                  >
                    SKOR AWAL IBU HAMIL
                  </th>
                  <th
                    width="5%"
                    class="text-weight-light"
                  >
                    2
                  </th>
                  <th>
                    I
                  </th>
                  <th>
                    II
                  </th>
                  <th>
                    III.1
                  </th>
                  <th>
                    III.2
                  </th>
                </tr>
              </thead>

              <tbody />
            </table>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>
<script setup>

</script>

<style lang="scss" scoped>
table{
  width: 100%;
  border-collapse: collapse;
  th, td {
    border: 1px solid $grey;
    padding: 2px 5px;
    vertical-align: top;
  }
}
</style>
