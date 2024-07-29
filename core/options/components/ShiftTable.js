import { css, defineComponent, html } from '../deps.js'
import ShiftItem from './ShiftItem.js'

const ShiftTableClassName = css`
    margin-top: 2rem;

    .shift-table {
        width: 100%;
    }

    .th-url {
        width: 80%;
    }

    .th-action {
        width: 20%;
    }

    .td-url {
        > .td-url-input {
            width: 100%;
        }
    }

    .td-action {
        display: flex;
        gap: 8px;
        justify-content: center;
        align-items: center;
    }

    .script-container {
        overflow: auto;

        pre {
            margin: 0;
        }
    }

    .details-action {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-top: 16px;
        gap: 8px;
    }

    .td-empty {
        text-align: center;
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
        onDelete(item) {
            const shiftList = this.state.shiftList
            const findIndex = shiftList.findIndex((it) => it.id === item.id)
            if (findIndex > -1) {
                shiftList.splice(findIndex,1)
            }
        },
    },
    render({ state, onDelete }) {
        return html`
            <div class="${ShiftTableClassName}">
                <table class="ui-table shift-table">
                    <thead>
                    <tr>
                        <th class="th-url">URL</th>
                        <th class="th-action">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    ${state.shiftList.map((it) => html`
                        <${ShiftItem} item="${it}" onDelete="${() => onDelete(it)}"/>
                    `)}
                    ${!state.shiftList.length && html`
                        <tr>
                            <td class="td-empty" colspan="2">Empty</td>
                        </tr>
                    `}
                    </tbody>
                </table>
            </div>
        `
    },
})