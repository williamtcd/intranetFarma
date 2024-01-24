<script lang="ts">
import api from '@/api/api.js'
import { reactive, readonly, ref, toRef, onMounted, watchEffect } from 'vue'
import { defineComponent } from 'vue'
import UploadImagem from './UploadImagem.vue'
import Imagem from './imagem.vue'

export default defineComponent({
  name: "NovaDespesa",
  props: {
      show: Boolean,
      user: String
  },
  setup(props) {
      let dialog = ref(false);
      let userfirebase: any = reactive({})
      let count = ref(0)
      let valueSlider = ref(0)
      function addCount () {
        count.value++
      }
      let listaDeDocumentos: any = reactive([]);
      async function obterUsuario(show) {
        count.value = 0
        if (show === true && props.user) {
            userfirebase.value = await api.exibeCliente(props.user);
            loadDocs();
        } else {
          userfirebase.value = {}
          count.value = 0
          listaDeDocumentos.value = []
        }
        dialog.value = show;
      }
      watchEffect(() => obterUsuario(props.show))
      async function loadDocs() {
        addCount()
        if (props.user) {
            listaDeDocumentos.value = await api.listarDocumentos(props.user);
            console.log(listaDeDocumentos.value);
        }
      }
      let tab = ref('option-1');
      // let text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
      return { dialog, userfirebase, listaDeDocumentos, props, loadDocs, count, tab, valueSlider };
  },
  components: { Imagem, UploadImagem }
})
</script>
<template>
  <v-dialog 
    v-model="dialog"
    persistent
    scrollable
    width="700"
  >
    <v-card>
      <v-card-title>
        <span class="text-h5">Ficha do cliente</span>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col
            cols="12"
          >
            <v-text-field
              v-model="userfirebase.value.nome"
              label="Nome completo"
              variant="underlined"
              density="compact"
              readonly
            />
          </v-col>
          <v-col
            cols="12"
          >
            <v-text-field
              v-model="userfirebase.value.cpf"
              label="CPF"
              variant="underlined"
              density="compact"
              readonly
            />
          </v-col>
        </v-row>
          <!-- <v-card class="border-0"> -->
            <v-tabs
              v-model="tab"
              fixed-tabs
              grow
            >
              <v-tab value="option-1" class="d-flex">
                <v-icon size="large" class="mr-2">mdi-card-account-details-outline</v-icon>
                Documentos
              </v-tab>

              <v-tab value="option-2">
                <v-icon size="x-large" class="mr-2">mdi-clipboard-account-outline</v-icon>
                Receitas
              </v-tab>
            </v-tabs>

            <v-window v-model="tab" style="height: 250px; overflow: auto;">
              <v-window-item value="option-1">
                <v-card flat>
                  <v-card-text >
                    
                    <UploadImagem
                      v-for="item in count"
                      class="px-3"
                      :user="props.user"
                      @uploaded="loadDocs"
                    />
                    
                      <v-col
                        cols="12"
                        class="d-flex flex-wrap justify-space-between"
                      >
                      <Imagem
                        v-for="item in listaDeDocumentos.value"
                        :url="item"
                      />
                      </v-col>
                  </v-card-text>
                </v-card>
              </v-window-item>
              <v-window-item value="option-2">
                <v-card flat>
                  <v-card-text>
                    
                    incluir cadastro de receitas ( em breve )
                  </v-card-text>
                </v-card>
              </v-window-item>
            </v-window>
          <!-- </v-card> -->

      </v-card-text>
      <v-card-actions>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="$emit('close', false)"
        >
          Fechar
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="dialog = false"
        >
          Salvar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
