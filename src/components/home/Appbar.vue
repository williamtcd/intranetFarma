<script lang="ts">
import { defineComponent } from 'vue'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiMenu } from '@mdi/js'
import { mdiHome } from '@mdi/js'
import { mdiCalculator } from '@mdi/js'
import { mdiExitRun } from '@mdi/js'
import { mdiCashRegister } from '@mdi/js'
import { mdiFinance } from '@mdi/js'
import { mdiClipboardAccountOutline } from '@mdi/js'
import api from '@/api/firebase/auth.js.js'

export default defineComponent({
  name: 'NavbarPadrao',
  components: {
    SvgIcon
  },
  data: () => ({
    iconMenu: mdiMenu,
    iconHome: mdiHome,
    iconCalc: mdiCalculator,
    iconLogOut: mdiExitRun,
    iconCashr: mdiCashRegister,
    drawer: true,
    group: null,
    items: [
      {
        title: 'Home',
        icon: mdiHome,
        to: { name: 'home' }
      },
      {
        title: 'Calculadora preços',
        icon: mdiCalculator,
        to: { name: 'calculadora-precos' }
      },
      {
        title: 'DashBoard Tunisia',
        icon: mdiFinance,
        to: { name: 'powerbi' }
      },
      // {
      //   title: 'Registro de Caixa',
      //   icon: mdiCashRegister,
      //   to: { name: 'caixa' }
      // },
      {
        title: 'Receita digital',
        icon: mdiClipboardAccountOutline,
        to: { name: 'lista-clientes' }
      }
    ]
  }),
  methods: {
    logout() {
      api.logOut()
      this.$router.push({ name: 'login' })
    }
  }
})
</script>
<template>
  <v-app-bar color="#00AFF0">
    <div class="d-flex flex-row justify-start align-center ml-2">
      <v-btn icon @click="drawer = !drawer">
        <svg-icon type="mdi" :path="iconMenu"> </svg-icon>
      </v-btn>
      <img src="@/assets/logocircle.png" style="width: 80px" />
      <span class="font-weight-bold text-white text-h5">Nova Rede</span>
    </div>
  </v-app-bar>
  <v-navigation-drawer v-model="drawer" location="left" fixed clipped app>
    <v-list>
      <v-list-item v-for="item in items" :key="item.title" :to="item.to" color="blue-darken-2">
        <template v-slot:prepend>
          <svg-icon type="mdi" :path="item.icon" class="mr-4" />
        </template>
        {{ item.title }}
      </v-list-item>
    </v-list>

    <template v-slot:append>
      <div class="pa-2">
        <v-btn block @click="logout" color="#00AFF0">
          <svg-icon
            type="mdi"
            :path="iconLogOut"
            class="p-0 mr-2"
          />
          Sair
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>
<style></style>
