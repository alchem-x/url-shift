import { defineComponent } from 'vue'
import { css } from '@emotion/css'

const HeaderClassName = css`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .title {
    font-weight: bold;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    user-select: none;

    .icon {
      width: 2rem;
      height: 2rem;
    }
  }

  .block-right {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`

export default defineComponent({
  props: {
    state: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async onSwitchChange(ev) {
      this.state.enabledStatus = ev.target.checked
    },
  },
  render({ state, onSwitchChange }) {
    return (
      <div class={HeaderClassName}>
        <span class="title">
          <img class="icon" src={'/icon.png'} alt="" />
          <span>URL Shift</span>
        </span>
        <div class="block-right">
          <a href="https://github.com/alchem-x/url-shift" target="_blank">
            Docs
          </a>
          <label>
            <input
              onInput={onSwitchChange}
              checked={state.enabledStatus}
              class="shift-switch"
              type="checkbox"
              is="ui-switch"
            />
          </label>
        </div>
      </div>
    )
  },
})
