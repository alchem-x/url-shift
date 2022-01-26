import { css, onMounted, ref } from './modules.js'
import { getEnabledStatus, setEnabledStatus, STORE_KEY } from '../store.js'

const _Head = css`
  display: flex;
  justify-content: space-between;

  > .title {
    font-weight: bold;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    gap: .5rem;
    user-select: none;
  }

  > .title > .icon {
    width: 2rem;
    height: 2rem;
  }
`

export default {
    template: `
      <div class="${_Head}">
      <span class="title">
            <img class="icon" src="/icon.png" alt="">
            <span>URL Shift</span>
        </span>
      <label>
        <input @input="handleSwitchShift" class="shift-switch"
               :checked="enabled" type="checkbox" is="ui-switch">
      </label>
      </div>
    `,
    setup(props) {
        const enabled = ref(false)

        onMounted(async () => {
            enabled.value = await getEnabledStatus()

            browser.storage.onChanged.addListener((ev) => {
                if (ev[STORE_KEY.ENABLED]) {
                    const newValue = ev[STORE_KEY.ENABLED].newValue
                    if (enabled.value !== newValue) {
                        enabled.value = newValue
                    }
                }
            })
        })

        async function handleSwitchShift(ev) {
            const checked = ev.target.checked
            enabled.value = checked
            await setEnabledStatus(checked)
        }

        return {
            enabled,
            handleSwitchShift,
        }
    },
}