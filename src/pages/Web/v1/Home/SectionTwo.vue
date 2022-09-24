<template>
  <div class="container-padding bg-grey-3">
    <div class="q-my-lg q-py-lg">
      <div class="row justify-center q-col-gutter-lg relative-position q-mt-lg">
        <div
          v-for="(item, i) in lists"
          :key="i"
          class="col-12 col-md-3"
        >
          <div class="feature-item q-pa-lg c-p">
            <div class="icon-x">
              <q-icon :name="item.icon" />
            </div>
            <div class="text-h6 bold q-mb-lg">
              {{ item.name }}
            </div>
            <div>{{ item.desc }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const lists = ref([
  { name: 'Pelayanan Pasien', icon: 'verified', desc: 'Memberi pelayanan kesehatan paripurna berdasarkan Cinta Kasih.' },
  { name: 'AKSES INFORMASI', icon: 'local_library', desc: 'Kemudahan akses informasi dan data oleh pasien mengenai biaya yang transparan dan sejelas-jelasnya.' },
  { name: 'KEPUASAN PASIEN', icon: 'handshake', desc: 'Kami berkomitmen untuk memberikan kepuasan terhadap pasien.' },
  { name: 'KEMUDAHAN PENDAFTARAN', icon: 'app_registration', desc: 'Kami melayani pendaftaran melalui berbagai media mulai dari Booking melalui telepon, website,  whatsapp dan smartphone melalui Play Store : .' }
  // { name: 'Asrama Santri', icon: 'local_hotel', desc: 'Santri baru menempati asrama yang telah ditetepkan oleh pengurus.' }
])
</script>

<style lang="scss" scoped>
.feature-item {
    text-align: center;
    position: relative;
    overflow: hidden;
    z-index: 1;
    transition: all .5s ease;

    .icon-x {
        height: 60px;
        width: 60px;
        margin: 0 auto 30px;
        text-align: center;
        font-size: 50px;
        color: $green-10;
        // background-color: $yellow;
        position: relative;
        z-index: 1;
        transition: all .5s ease;
        // i.q-icon {
        //     margin-top:-40px;
        //     transition: all .3s ease;
        // }

        &::before{
            content: "";
            position: absolute;
            left: 100%;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: $green-9;
            transition: all .5s ease;
            z-index: -1;
            opacity: 0;
        }
    }

    // background-color: $green;
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
        box-shadow: 0 0 0px 0px rgb(0 0 0 / 20%), 0 2px 10px rgb(0 0 0 / 10%);
        &::after {
            transform: translateX(-20px);
            opacity:1
        }
        &::before {
            transform: translateX(20px);
            opacity:1
        }
        .icon-x {
            color:#fff;
            font-size: 35px;
            // i.q-icon {
            // // transform: scale(20);
            //     margin-top:0px;
            //     // transition: all .3s ease;
            // }
            &::before {
                left: 0;
                border-radius: 50%;
                opacity: 1;
            }
        }
    }

}

</style>
