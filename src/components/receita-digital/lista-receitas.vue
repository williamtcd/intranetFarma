<script lang="ts">
import { defineComponent } from 'vue'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiDelete } from '@mdi/js'
import { mdiPlus } from '@mdi/js'
import { mdiMinus } from '@mdi/js'

export default defineComponent({
  name: 'NovaDespesa',
  components: {
    SvgIcon
  },
  data: () => ({
    dialog: false,
    iconTrash: mdiDelete,
    iconAdd: mdiPlus,
    iconMinus: mdiMinus,
    panel: [0],
    despesas: [
      {
        descricao: '',
        valor: null
      }
    ]
  }),
  watch: {},
  created() {},
  methods: {
    addNovaDespesa() {
      const despesa = {
        descricao: '',
        valor: null
      }
      this.despesas.push(despesa)
    },
    apagaDespesa(index) {
      this.despesas.splice(index, 1)
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
        <span class="text-h6">Despesas</span>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-table density="compact">
          <thead>
            <tr>
              <th class="text-left">descrição</th>
              <th class="text-left">valor</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(despesa, index) in despesas" :key="index">
              <td style="padding: 0px; border: 0px !important" class="m-0">
                <v-text-field
                  v-model="despesa.descricao"
                  type="text"
                  variant="underlined"
                  density="compact"
                  single-line
                  hide-details
                />
              </td>
              <td style="width: 150px; border: 0px !important" class="pr-0 m-0">
                <div class="d-flex flex-row pr-0">
                  <v-text-field
                    v-model="despesa.valor"
                    type="number"
                    variant="underlined"
                    density="compact"
                    single-line
                    hide-details
                    prefix="R$"
                  />
                  <v-btn
                    v-if="despesas.length > 1"
                    variant="text"
                    icon
                    size="x-small"
                    class="align-self-end"
                    @click="apagaDespesa(index)"
                  >
                    <svg-icon type="mdi" :path="iconTrash" />
                  </v-btn>
                </div>
              </td>
            </tr>
          </tbody>
        </v-table>
        <div class="d-flex justify-end mt-5">
          <v-btn icon size="x-small" @click="addNovaDespesa">
            <svg-icon type="mdi" :path="iconAdd" />
          </v-btn>
        </div>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
