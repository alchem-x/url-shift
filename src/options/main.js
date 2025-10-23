import { createApp, h } from 'vue'
import App from './App.jsx'

function main() {
  const app = createApp({
    render() {
      return h(App)
    },
  })
  app.mount('#app')
}

main()
