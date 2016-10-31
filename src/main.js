import Vue from 'vue'
import App from './App.vue'

function createApp() {
  return new Vue({
    render: h => h(App)
  })
}

if (typeof window !== 'undefined') {
  createApp().$mount('#app')
} else if (typeof module !== 'undefined' && module.exports) {
  const app = createApp()
  module.exports = context => {
    return Promise.resolve(app)
  }
}