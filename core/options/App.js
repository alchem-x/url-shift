import { css, defineComponent, html, toRaw } from './deps.js'
import Header from './components/Header.js'
import ShiftTable from './components/ShiftTable.js'
import { getEnabledStatus, getNextId, getShiftList, setEnabledStatus, setShiftList } from '../store.js'

const AppClassName = css`
  box-sizing: border-box;
  max-width: 1280px;
  padding: 2rem 1rem;
  min-height: 100vh;
  margin: 0 auto;

  a {
    color: var(--ui-blue, #2a80eb);
    text-decoration-line: none;
  }

  .bottom-action {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 16px;
  }
`

async function getAppData() {
  return {
    enabledStatus: await getEnabledStatus(),
    shiftList: await getShiftList(),
  }
}

const appData = await getAppData()

export default defineComponent({
  data() {
    return {
      state: {
        enabledStatus: appData.enabledStatus,
        shiftList: appData.shiftList,
      },
    }
  },
  methods: {
    async onNew() {
      this.state.shiftList.push({ id: await getNextId() })
    },
  },
  watch: {
    state: {
      async handler(newState) {
        newState = toRaw(newState)
        await setEnabledStatus(newState.enabledStatus)
        await setShiftList(newState.shiftList)
      },
      deep: true,
    },
  },
  render({ state, onNew }) {
    return html`
      <div class="${AppClassName}">
        <${Header} state="${state}" />
        <${ShiftTable} state="${state}" />
        <div class="bottom-action">
          <button onClick="${onNew}" class="ui-button" data-type="primary">New</button>
        </div>
      </div>
    `
  },
})
