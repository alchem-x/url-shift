import { defineComponent, html, LightTip } from '../deps.js'
import { getShiftInSandbox } from '../sandbox.js'
import ConfigInput from './ConfigInput.js'

export default defineComponent({
    props: {
        item: {
            type: Object,
        },
    },
    methods: {
        async onReload(ev) {
            const item = this.item
            const reloadButtonRef = ev.target
            try {
                reloadButtonRef.disabled = true
                const url = item.url
                if (!url?.trim()) {
                    LightTip.error('Please enter URL')
                    return
                }
                const response = await fetch(url, {
                    headers: {
                        'pragma': 'no-cache',
                        'cache-control': 'no-cache',
                    }
                })
                item.script = await response.text()
                const config = await getShiftInSandbox(item.script)
                if (Array.isArray(config)) {
                    item.rules = config
                } else {
                    item.rules = config.rules ?? []
                    item.name = config.name ?? ''
                }
                LightTip.success('Reload succeeded')
            } catch (err) {
                console.error(err)
                const errorString = err.message || err.toString()
                if (errorString) {
                    LightTip.error(errorString)
                }
            } finally {
                reloadButtonRef.disabled = false
            }
        },
        async onChangeEnabled(ev) {
            const item = this.item
            item.enabled = ev.target.checked
        },
        async onToggleShowDetails() {
            const item = this.item
            item.showDetails = !item.showDetails
        },
        async onDelete() {
            this.$emit('delete')
        },
        onUrlInput(ev) {
            const item = this.item
            item.url = ev.target.value
        },
    },
    render({ item, onReload, onChangeEnabled, onToggleShowDetails, onDelete, onUrlInput }) {
        return html`
            <tr>
                <td class="td-url">
                    <${ConfigInput} url="${item.url}" name="${item.name}" onInput="${onUrlInput}"/>
                </td>
                <td class="td-action">
                    <button onClick=${onReload} class="ui-button button-reload" data-type="primary">
                        ${item.script ? 'Reload ↺' : 'Load ↺'}
                    </button>
                    <button class="ui-button" data-type="normal"
                            onClick="${onToggleShowDetails}">
                        ${item.showDetails ? 'Details ↑' : 'Details ↓'}
                    </button>
                    <label>
                        <input onInput="${onChangeEnabled}"
                                checked="${item.enabled}" class="shift-switch"
                                type="checkbox"
                                is="ui-switch"/>
                    </label>
                </td>
            </tr>
            ${item.showDetails && html`
                <tr>
                    <td colspan="2">
                        <div class="script-container">
                            <code>
                                <pre class="rule-script">${item.script}</pre>
                            </code>
                        </div>
                        <div class="details-action">
                            <button onClick="${onDelete}" class="ui-button" data-type="danger">
                                Delete
                            </button>
                        </div>
                    </td>
                </tr>
            `}
        `
    }
})