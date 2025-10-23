import { defineComponent } from 'vue'

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
      focused: false,
    }
  },
  render({ url, name, focused }) {
    return (
      <input
        value={focused ? url : name || url}
        type="text"
        onFocus={() => (this.focused = true)}
        onBlur={() => (this.focused = false)}
        class="ui-input td-url-input"
        placeholder="Enter URL"
      />
    )
  },
})
