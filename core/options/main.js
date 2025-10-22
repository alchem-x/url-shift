import { createApp, h } from './deps.js'
import App from './App.js'

function main() {
  const app = createApp({
    render() {
      return h(App)
    },
  })
  app.mount('#app')
}

main()
