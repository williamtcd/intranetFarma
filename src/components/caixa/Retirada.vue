<script lang="ts">
import { defineComponent } from 'vue'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiDelete } from '@mdi/js'
import { mdiPlus } from '@mdi/js'
import { mdiMinus } from '@mdi/js'
import moment from 'moment'

export default defineComponent({
  name: 'Retirada',
  components: {
    SvgIcon
  },
  data: () => ({
    iconTrash: mdiDelete,
    iconAdd: mdiPlus,
    iconMinus: mdiMinus,
    panel: [0],
    retiradas: [
      {
        valor: null,
        dataehora: null
      }
    ]
  }),
  watch: {},
  created() {},
  methods: {
    moment,
    addRetirada() {
      const retirada = {
        valor: null,
        dataehora: null
      }
      this.retiradas.push(retirada)
    },
    apagaRetirada(index) {
      this.retiradas.splice(index, 1)
    }
  }
})
</script>
<template>
  <v-expansion-panels v-model="panel">
    <v-expansion-panel>
      <v-expansion-panel-title color="blue-darken-2">
        <template v-slot:actions="{ expanded }">
          <svg-icon type="mdi" :path="expanded ? iconMinus : iconAdd" />
        </template>
        <span class="text-h6">Retiradas</span>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-table density="compact" style="border: 0px !important">
          <thead>
            <tr>
              <th class="text-left">Valor</th>
              <th class="text-left">horário</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(retirada, index) in retiradas" :key="index" style="border: 0px">
              <td style="padding: 0px; border: 0px !important" class="m-0">
                <v-text-field
                  v-model="retirada.valor"
                  type="number"
                  variant="underlined"
                  density="compact"
                  single-line
                  hide-details
                  prefix="R$"
                />
              </td>

              <td style="width: 120px; border: 0px !important" class="pr-0 m-0">
                <div class="d-flex flex-row pr-0 pl-2 m-0">
                  <v-text-field
                    v-model="retirada.dataehora"
                    type="text"
                    variant="underlined"
                    density="compact"
                    single-line
                    hide-details
                  >
                  </v-text-field>
                  <v-btn
                    v-if="retiradas.length > 1"
                    variant="text"
                    icon
                    size="x-small"
                    class="align-self-end"
                    @click="apagaRetirada(index)"
                  >
                    <svg-icon type="mdi" :path="iconTrash" />
                  </v-btn>
                </div>
              </td>
            </tr>
          </tbody>
        </v-table>
        <div class="d-flex justify-end mt-5 pr-2">
          <v-btn icon size="x-small" @click="addRetirada">
            <svg-icon type="mdi" :path="iconAdd" />
          </v-btn>
        </div>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
