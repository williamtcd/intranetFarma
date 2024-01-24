<script lang="ts">
import api from '@/api/api.js'
import { reactive, readonly, ref, toRef, onMounted, watchEffect } from 'vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'imagem',
  props: {
    url: String
  },
  setup(props) {
    let fullPath = ref('')
    let loading = ref(false)
    watchEffect(() => loadDocs(props.url))
    async function loadDocs (url) {
      loading.value = true
      if (props.url) {
        fullPath.value = await api.downloadDocumentos(url)
        console.log(fullPath.value)
      }
      loading.value = false
    }
    return { fullPath, loading }
  }
})
</script>
<template>
  <v-img
    :src="fullPath"
    style="max-width: 250px; margin: 5px;"
    aspect-ratio="1"
    class="bg-grey-lighten-2"
  >
    <template v-slot:placeholder>
      <v-row
        class="fill-height ma-0"
        align="center"
        justify="center"
      >
        <v-progress-circular
          indeterminate
          color="grey-lighten-5"
        ></v-progress-circular>
      </v-row>
    </template>
  </v-img>
</template>
