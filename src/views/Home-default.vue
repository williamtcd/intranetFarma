<script lang="ts">
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiCalculator } from '@mdi/js'
import { mdiExitRun } from '@mdi/js'
import { mdiCashRegister } from '@mdi/js'
import { mdiClipboardAccountOutline } from '@mdi/js'
import { mdiTicketPercentOutline } from '@mdi/js'
import { mdiFinance } from '@mdi/js'

export default {
  name: 'NavbarPadrao',
  components: {
    SvgIcon
  },
  data: () => ({
    iconCalc: mdiCalculator,
    iconLogOut: mdiExitRun,
    iconCashr: mdiCashRegister,
    iconsProfiles: mdiClipboardAccountOutline,
    iconPrice: mdiTicketPercentOutline,
    iconFinance: mdiFinance
  }),
  methods: {
    consol() {
      console.log('teste')
    }
  }
}
</script>
<template>
  <div class="d-flex justify-center">
    <div class="d-flex flex-row flex-wrap justify-center align-center mt-10 w-100" style="max-width: 900px">
      <div class="mx-5 my-5">
        <v-card
          class="mx-auto white"
          max-width="344"
        >
          <v-card-item>
            <div>
              <div class="text-overline mb-1">
                Ferramenta
              </div>
              <div class="d-flex text-h6 mb-1 align-center">
                <svg-icon type="mdi" width="24" height="24" :path="iconPrice" class="mr-2"/> Precificação
              </div>
              <div class="text-caption">Utilize a calculadora para elaborar promoções</div>
            </div>
          </v-card-item>

          <v-card-actions class="d-flex justify-end">
            <v-btn
              variant="text"
              color="teal-accent-4"
              @click="$router.push({ name: 'calculadora-precos'})"
            >
            <svg-icon type="mdi" width="24" height="24" :path="iconCalc" class="mr-2"/>
              Experimente
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
      <div class="mx-5 my-5">
        <v-card
          class="mx-auto white"
          max-width="344"
        >
          <v-card-item>
            <div>
              <div class="text-overline mb-1">
                Sistema
              </div>
              <div class="d-flex text-h6 mb-1 align-center">
                <svg-icon type="mdi" width="24" height="24" :path="iconsProfiles" class="mr-2"/>
                Receitas Digitais
              </div>
              <div class="text-caption">Acesso rápido a clientes e receitas cadastradas</div>
            </div>
          </v-card-item>

          <v-card-actions class="d-flex justify-end">
            <v-btn
              variant="text"
              color="teal-accent-4"
              @click="$router.push({ name: 'lista-clientes'})"
            >
            <svg-icon type="mdi" width="24" height="24" :path="iconsProfiles" class="mr-2"/>
              Experimente
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
      <div class="mx-5 my-5">
        <v-card
          class="mx-auto white"
          max-width="344"
        >
          <v-card-item>
            <div>
              <div class="text-overline mb-1">
                Ferramenta
              </div>
              <div class="d-flex text-h6 mb-1 align-center">
                <svg-icon type="mdi" width="24" height="24" :path="iconFinance" class="mr-2"/>
                Power BI
              </div>
              <div class="text-caption">Dashboard para auxilio em tomadas de decisão</div>
            </div>
          </v-card-item>

          <v-card-actions class="d-flex justify-end">
            <v-btn
              variant="text"
              color="teal-accent-4"
              @click="$router.push({ name: 'powerbi'})"
            >
            <svg-icon type="mdi" width="24" height="24" :path="iconFinance" class="mr-2"/>
              Experimente
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </div>
  </div>
</template>
