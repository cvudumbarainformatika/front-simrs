<template>
  <q-page class="bg-grey-3 flex column flex-center desktop-padding bg-img ">
    <div
      v-if="store.loading"
      class="column flex-center items-center"
      style="min-height:500px"
    >
      <app-loading />
    </div>
    <div
      v-else
      class="row q-col-gutter-md"
    >
      <div class="col-md-3 col-xs-12">
        <q-card
          v-ripple
          class="bg-primary text-white full-height cursor-pointer q-hoverable"
          @click="goTo('/pegawai')"
        >
          <div
            class="feature-item c-p column flex-center "
          >
            <div class="icon-x q-mb-lg">
              <q-icon name="icon-mat-assignment_ind" />
            </div>
            <div class="text-h6 q-mb-lg">
              SIMPEG
            </div>
            <div>Sistem Informasi Management Kepegawaian</div>
          </div>
        </q-card>
      </div>
      <div class="col-md-3 col-xs-12">
        <q-card class="bg-indigo text-white q-mb-md cursor-pointer model-two">
          <div class="q-pa-md">
            <div class="column ">
              <div class="flex items-center justify-between">
                <div class="icon-b">
                  <q-icon name="icon-mat-medical_information" />
                </div>
                <div class="text-h4 text-weight-light">
                  E-RM
                </div>
              </div>
              <q-separator class="bg-white q-my-sm" />
              <div class="text-h5 text-weight-light">
                e-Rekam Medic
              </div>
            </div>
          </div>
        </q-card>
        <q-card class="bg-negative text-white model-two">
          <div class="q-pa-md">
            <div class="column">
              <div class="flex items-center justify-between">
                <div class="icon-b">
                  <q-icon name="icon-mat-local_pharmacy" />
                </div>
                <div class="text-h4 text-weight-light">
                  E-PCY
                </div>
              </div>
              <q-separator class="bg-white q-my-md" />
              <div class="text-h5 text-weight-light">
                e-Pharmacy
              </div>
            </div>
          </div>
        </q-card>
      </div>
      <div class="col-md-3 col-xs-12">
        <q-card class="bg-dark text-white q-mb-md cursor-pointer model-two">
          <div class="q-pa-md">
            <div class="column ">
              <div class="flex items-center justify-between">
                <div class="icon-b">
                  <q-icon name="icon-mat-medication_liquid" />
                </div>
                <div class="text-h4 text-weight-light">
                  E-CLY
                </div>
              </div>
              <q-separator class="bg-white q-my-sm" />
              <div class="text-h5 text-weight-light">
                e-Clinic
              </div>
            </div>
          </div>
        </q-card>
        <q-card class="bg-orange text-white model-two">
          <div class="q-pa-md">
            <div class="column">
              <div class="flex items-center justify-between">
                <div class="icon-b">
                  <q-icon name="icon-mat-personal_injury" />
                </div>
                <div class="text-h4 text-weight-light">
                  E-RJ
                </div>
              </div>
              <q-separator class="bg-white q-my-md" />
              <div class="text-h5 text-weight-light">
                e-Rawat Jalan
              </div>
            </div>
          </div>
        </q-card>
      </div>
      <div class="col-md-3 col-xs-12">
        <q-card
          class="bg-green-10 text-white q-mb-md cursor-pointer model-two"
          @click="goTo('/sigarang/dashboard')"
        >
          <div class="q-pa-md">
            <div class="column ">
              <div class="flex items-center justify-between">
                <div class="icon-b">
                  <q-icon name="icon-mat-inventory_2" />
                </div>
                <div class="text-h4 text-weight-light">
                  E-LG
                </div>
              </div>
              <q-separator class="bg-white q-my-sm" />
              <div class="text-h5 text-weight-light">
                e-Logistik
              </div>
            </div>
          </div>
        </q-card>
      </div>

      <div class="col-md-3 col-xs-12">
        <q-card
          class="bg-teal text-white q-mb-md cursor-pointer model-two"
          @click="goTo('/admin/laborat')"
        >
          <div class="q-pa-md">
            <div class="column ">
              <div class="flex items-center justify-between">
                <div class="icon-b">
                  <q-icon name="icon-mat-medication_liquid" />
                </div>
                <div class="text-h4 text-weight-light">
                  LABSYM
                </div>
              </div>
              <q-separator class="bg-white q-my-sm" />
              <div class="text-h5 text-weight-light">
                Laboratorium system
              </div>
            </div>
          </div>
        </q-card>
      </div>
      <div class="col-md-3 col-xs-12">
        <q-card
          class="bg-accent text-white q-mb-md cursor-pointer model-two"
          @click="goTo('/antrian')"
        >
          <div class="q-pa-md">
            <div class="column ">
              <div class="flex items-center justify-between">
                <div class="icon-b">
                  <q-icon name="icon-eva-person-outline" />
                </div>
                <div class="text-h4 text-weight-light">
                  ANTRIAN
                </div>
              </div>
              <q-separator class="bg-white q-my-sm" />
              <div class="text-h5 text-weight-light">
                Antrian System
              </div>
            </div>
          </div>
        </q-card>
      </div>
      <div class="col-md-3 col-xs-12">
        <q-card
          class="bg-deep-purple text-white q-mb-md cursor-pointer model-two"
          @click="goTo('/master/dashboard')"
        >
          <div class="q-pa-md">
            <div class="column ">
              <div class="flex items-center justify-between">
                <div class="icon-b">
                  <q-icon name="icon-cus-group_work" />
                </div>
                <div class="text-h4 text-weight-light">
                  MS
                </div>
              </div>
              <q-separator class="bg-white q-my-sm" />
              <div class="text-h5 text-weight-light">
                Masters
              </div>
            </div>
          </div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useSettingsAplikasi } from 'src/stores/simrs/settings/index.js'
import { onMounted } from 'vue'

const router = useRouter()
const store = useSettingsAplikasi()

onMounted(() => {
  console.log('mounted sso')
  store.getData()
})

function goTo(url) {
  router.replace({ path: url })
}
</script>

<style lang="scss" scoped>
  .bg-img {
  background-image: url("../../assets/images/bg.png");
  background-repeat: no-repeat, repeat;
  background-size: cover;
}
  .desktop-padding {
    padding:30px;
  }
  .model-two {
    position: relative;
    overflow: hidden;
    transition: all .5s ease;
    .icon-b {
        font-size: 60px;
        position: relative;
        z-index: 1;transition: all .5s ease;
    }
      &::before {
        content: "";
          position: absolute;
          z-index: 0;
          border-radius: 8%;
          background-color: #fff;
          top: 26px;
          left: -120px;
          width: 88px;
          height: 75px;
          opacity: 0;
          transition: all .5s ease;
      }
      &::after {
        content: "";
          position: absolute;
          z-index: 0;
          border-radius: 10%;
          background-color: #47e91e;
          top: 88px;
          /* bottom: -3px; */
          right: 19px;
          width: 0px;
          height: 4px;
          opacity: 0;
          transition: all .5s ease;
      }
      &:hover {
        .icon-b {
          color: #444444;
        }
        &::before {
            transform: translateX(110px);
            opacity: 1
          }
        &::after {
          width:40px;
            opacity: 1
          }
      }
  }
  .feature-item {
      text-align: center;
      position: relative;
      overflow: hidden;
      z-index: 1;
      transition: all .5s ease;
      height: 100%;
      .icon-x {
          height: 80px;
          width: 80px;
          text-align: center;
          font-size: 80px;
          color: #fff;
          // background-color: #fff;
          position: relative;
          z-index: 1;
          transition: all .5s ease;
          &::before{
              content: "";
              position: absolute;
              left: 100%;
              top: 0;
              width: 100%;
              height: 100%;
              transition: all .5s ease;
              z-index: -1;
              opacity: 0;
          }
      }
      &::before {
        content: "";
        position: absolute;
        z-index: -1;
        border-radius: 50%;
        background-color: $pink;
        height: 20px;
        width: 20px;
        left: -10px;
        top: 40px;
        opacity: 0;
        transition: all .5s ease;
      }
      &::after {
        content: "";
        position: absolute;
        z-index: -1;
        border-radius: 50%;
        height: 20px;
        width: 20px;
        background-color: $orange;
        right: -30px;
        top: 80px;
        opacity: 0;
        transition: all .5s ease;
      }
      &:hover {
        // box-shadow: 0 0 0px 0px rgb(0 0 0 / 20%), 0 2px 10px rgb(0 0 0 / 10%);
        &::after {
          transform: translateX(-20px);
          opacity: 1
        }
        &::before {
          transform: translateX(20px);
          opacity: 1
        }
        .icon-x {
          color: $primary;
          background-color: #fff;
          border-radius: 50%;
          font-size: 50px;
          // font-size: 35px;
          &::before {
            left: 0;
            border-radius: 50%;
            opacity: 1;
          }
        }
      }
  }
  </style>
