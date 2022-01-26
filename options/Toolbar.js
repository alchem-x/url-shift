import { css, LightTip, onMounted, ref } from './modules.js'
import { createDialog } from './dialog.js'
import { appendShift } from '../store.js'

const _Toolbar = css`
  margin-top: .5rem;
`

export default {
    template: `
      <div class="${_Toolbar}">
      <button @click="handleClickNew" type="primary" class="ui-button">New</button>
      </div>
    `, setup(props, { emit }) {

        function handleClickNew() {
            const dialog = createDialog({
                id: 'new-shift',
                title: 'New',
                form: true,
                App: {
                    template: `
                      <form ref="form" id="new-shift" @submit.prevent="handleSubmit">
                      <p>
                        <input name="name" type="text" class="ui-input w-full" placeholder="Name" required>
                      </p>
                      <p>
                    <textarea name="url" class="ui-textarea w-full"
                              placeholder="URL" rows="6" required></textarea>
                      </p>
                      </form>`
                    ,
                    setup() {
                        const form = ref()

                        onMounted(() => {
                            form.value.reset()
                        })

                        async function handleSubmit(ev) {
                            const submitButtonRef = dialog.querySelector('.ui-dialog-footer > button[type=submit]')
                            try {
                                submitButtonRef.disabled = true
                                const formData = new FormData(ev.target)
                                const name = formData.get('name').trim()
                                const url = formData.get('url').trim()
                                await appendShift({ name, url })
                                emit('refresh')
                                dialog.remove()
                                LightTip.success('Save succeeded')
                            } catch (err) {
                                LightTip.error('Save failed, please check input', 2000);
                            } finally {
                                submitButtonRef.disabled = false
                            }
                        }

                        return {
                            form,
                            handleSubmit,
                        }
                    },
                }
            })
        }

        return {
            handleClickNew,
        }
    },
}