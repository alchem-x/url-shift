import { css } from './modules.js'
import Dropdown from './Dropdown.js'
import { updateShift } from '../store.js'

const _ShiftTable = css`
  margin-top: 2rem;

  th.percentage-10 {
    width: 10%;
  }

  th.percentage-20 {
    width: 20%;
  }

  .text-url {
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .text-center {
    text-align: center;
  }

  .text-left {
    text-align: left;
  }
`

export default {
    template: `
      <div class="${_ShiftTable}">
      <table class="ui-table">
        <thead>
        <tr>
          <th class="text-left percentage-20">Name</th>
          <th>URL</th>
          <th class="percentage-10">Enabled</th>
          <th class="percentage-10"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(it, index) of shiftList" :key="index">
          <td>{{ it.name }}</td>
          <td>
            <pre class="text-url" :title="it.url">{{ it.url }}</pre>
          </td>
          <td class="text-center">
            <input @input="handleSwitchShift($event, it)" class="shift-switch"
                   :checked="it.enabled" type="checkbox" is="ui-switch">
          </td>
          <td class="text-center">
            <Dropdown :item="it" @refresh="$emit('refresh')"/>
          </td>
        </tr>
        <tr v-if="!shiftList.length">
          <td class="text-center" colspan="4">Empty</td>
        </tr>
        </tbody>
      </table>
      </div>

    `,
    props: {
        shiftList: {
            type: Array,
            required: true,
        }
    },
    setup(props, { emit }) {

        async function handleSwitchShift(ev, it) {
            const checked = ev.target.checked
            const newShift = {
                ...it,
                enabled: checked,
            }
            await updateShift(newShift)
        }

        return {
            handleSwitchShift,
        }
    },
    components: { Dropdown, },
}