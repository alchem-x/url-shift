import { defineComponent, html } from '../deps.js'

export default defineComponent({
  props: {
    url: {
      type: String,
    },
    name: {
      type: String,
    },
  },
  data() {
    return {
      focusd: false,
    }
  },
  render({ url, name, focusd }) {
    return html`
      <input
        value="${focusd ? url : name || url}"
        type="text"
        onFocus="${() => (this.focusd = true)}"
        onBlur="${() => (this.focusd = false)}"
        class="ui-input td-url-input"
        placeholder="Enter URL"
      />
    `
  },
})
