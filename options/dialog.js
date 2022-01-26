import { createApp, Dialog } from './modules.js'


export function createDialog(options) {
    const instance = createApp(options.App)

    return new Dialog({
        title: options.title,
        width: options.width || '600px',
        buttons: options.form ? [
            { value: 'Cancel', type: 'normal', },
            { value: 'Save', type: 'primary', form: options.id, },
        ] : [],
        onShow() {
            instance.mount(this.querySelector('.ui-dialog-body'))
        },
        onRemove() {
            instance.unmount()
        },
    })
}