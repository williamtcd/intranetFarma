<script lang="ts">
import api from '@/api/api.js'
import { reactive, readonly, ref, toRef, onMounted, watchEffect } from 'vue'
import { defineComponent, defineEmits } from 'vue'

export default defineComponent({
  name: 'UploadImagem',
  props: {
    user: String
  },
  setup(props, {emit}) {
    const nomeDoc = ref("rg")
    let show = ref(true)
    let loading = ref(false)
    let showbutton = ref(true)

    async function upload(e) {
        let file = e.target.files[0];
        loading.value = true
        if (props.user) {
           await api.uploadDocumentos(nomeDoc.value, props.user, file);
        }
        nomeDoc.value = ''
        show.value = false
        loading.value= false
        emit('uploaded')
    }
    return { upload, show, loading, showbutton }
  }
})
</script>
<template>
  <div class="d-flex flex-row justify-end w-100">
  <v-btn
    v-if="showbutton"
    color="blue-darken-1"
    variant="text"
    class="align-self-center"
    @click="showbutton = false"
  >
    Adicionar novo documento
  </v-btn>
  <v-file-input
    v-if="show && !showbutton"
    ref="file"
    :loading="loading"
    accept="image/*"
    density="compact"
    variant="underlined"
    prepend-icon="mdi-camera"
    label="adicione um documento"
    class="w-100"
    @change="upload"  
  />
  </div>
</template>
