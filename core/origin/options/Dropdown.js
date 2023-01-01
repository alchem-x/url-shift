import { css, LightTip, onMounted, ref } from './modules.js'
import { createDialog } from './dialog.js'
import CodePreviewer from './CodePreviewer.js'
import { deleteShift, updateShift } from '../store.js'
import { fetchScript } from '../shift.js'

const _Dropdown = css`
  position: relative;

  > .drop {
    box-sizing: border-box;
    position: absolute;
    background-color: #fff;
    border-radius: 4px;
    right: 3px;
    top: 42px;
    border: 1px solid #eaeaea;
    min-width: 120px;
    user-select: none;
    z-index: 1;
    box-shadow: rgba(0, 0, 0, 0) 0 0 0 0, rgba(0, 0, 0, 0) 0 0 0 0, rgba(0, 0, 0, 0.1) 0 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px;

    > .button {
      padding: .5rem 1rem;
      box-sizing: border-box;
      cursor: pointer;
      color: #111;
      transition-property: background-color;
      transition-duration: 200ms;
      text-align: left;

      &.danger {
        color: #eb4646;
      }

      :hover {
        background-color: #f4f4f4;
      }

      :not(:first-child) {
        border-top: 1px solid #eaeaea;
      }
    }
  }
`

export default {
    template: `
      <div class="${_Dropdown}">
      <button ref="moreButton" @click="handleClickTarget" class="ui-button">More</button>
      <div class="drop" v-if="open" @click.stop="handleClickDrop">
        <div @click="handleClickPreview" class="button">Preview</div>
        <div @click="handleClickEdit" class="button">Edit</div>
        <div @click="handleClickReload" class="button">Reload</div>
        <div @click="handleClickDelete" class="button danger">Delete</div>
      </div>
      </div>
    `,
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
    setup(props, { emit }) {
        const moreButton = ref()
        const open = ref(false)

        onMounted(() => {
            document.body.addEventListener('click', (ev) => {
                if (open.value && ev.target !== moreButton.value) {
                    open.value = false
                }
            })
        })

        function handleClickTarget(ev) {
            open.value = !open.value
        }

        function handleClickDrop() {
            open.value = false
        }

        function handleClickEdit() {
            const dialog = createDialog({
                id: 'edit-shift',
                form: true,
                title: 'Edit',
                App: {
                    template: `
                      <form ref="form" id="edit-shift" @submit.prevent="handleSubmit">
                      <p>
                        <input name="name" type="text" class="ui-input w-full" placeholder="Name" required>
                      </p>
                      <p>
                        <textarea name="url" class="ui-textarea w-full" placeholder="URL" rows="6" required></textarea>
                      </p>
                      </form>
                    `
                    ,
                    setup() {
                        const form = ref()

                        onMounted(() => {
                            const item = props.item
                            form.value.name.value = item.name
                            form.value.url.value = item.url
                        })

                        async function handleSubmit(ev) {
                            const submitButtonRef = dialog.querySelector('.ui-dialog-footer > button[type=submit]')
                            try {
                                submitButtonRef.disabled = true
                                const formData = new FormData(ev.target)
                                const name = formData.get('name').trim()
                                const url = formData.get('url').trim()
                                const newShift = {
                                    ...props.item,
                                    name,
                                    url,
                                    script: await fetchScript(url),
                                }
                                await updateShift(newShift)
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

        async function handleClickDelete() {
            await deleteShift(props.item.id)
            emit('refresh')
        }

        async function handleClickReload() {
            try {
                const newShift = {
                    ...props.item,
                    script: await fetchScript(props.item.url),
                }
                await updateShift(newShift)
                emit('refresh')
                LightTip.success('Reload succeeded')
            } catch (err) {
                LightTip.error('Reload failed, please check', 2000);
            }
        }

        function handleClickPreview() {
            createDialog({
                id: 'preview-shift',
                title: 'Preview',
                width: '1000px',
                App: {
                    template: `
                      <CodePreviewer :script="script"/>
                    `,
                    setup() {
                        return {
                            script: props.item.script,
                        }
                    },
                    components: { CodePreviewer, }
                }
            })
        }

        return {
            open,
            moreButton,
            handleClickTarget,
            handleClickDrop,
            handleClickEdit,
            handleClickReload,
            handleClickPreview,
            handleClickDelete,
        }
    },
}