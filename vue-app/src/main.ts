import { h, createApp } from 'vue'
import singleSpaVue from 'single-spa-vue'

import App from './App.vue'
import router from './router'
import store from './store'

const vueLifecycles = singleSpaVue({
  createApp,
  appOptions: {
    render () {
      return h(App)
    }
  },
  handleInstance (app) {
    app.use(router)
    app.use(store)
  }
})

export const bootstrap = vueLifecycles.bootstrap
export const mount = vueLifecycles.mount
export const unmount = vueLifecycles.unmount
