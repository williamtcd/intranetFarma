import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './plugins/vuetify.js'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { useLayoutStore } from '@/stores/layout'
import { initializeApp } from 'firebase/app'
import '@mdi/font/css/materialdesignicons.css'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA8w9hVyxx6pymXaJMIHs1jz-0dftujhjw',
  authDomain: 'novarede-d1ca0.firebaseapp.com',
  projectId: 'novarede-d1ca0',
  storageBucket: 'novarede-d1ca0.appspot.com',
  messagingSenderId: '104329396214',
  appId: '1:104329396214:web:9eef7c9dff1f8bb73791d7'
}

// Initialize Firebase
initializeApp(firebaseConfig)

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    sets: {
      mdi
    }
  },
  components,
  directives
})

const app = createApp(App).use(vuetify)
app.use(createPinia())
app.use(router)

const setlayout = useLayoutStore()

function setLayoutForNextPage(to: any) {
  let layout = to.matched[0]?.components.default.layout

  if (!layout) {
    layout = 'default-layout'
  }

  setlayout.increment(layout)
}

router.afterEach(setLayoutForNextPage)

app.mount('#app')
