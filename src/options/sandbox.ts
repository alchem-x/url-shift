export function getShiftInSandbox(script: string) {
  return new Promise((resolve, reject) => {
    const callback = (ev: MessageEvent<{ error: Error | any; data: any }>) => {
      if (ev.data.error) {
        reject(ev.data.error)
      } else {
        resolve(ev.data.data)
      }
      window.removeEventListener('message', callback)
    }

    window.addEventListener('message', callback)

    const iframe = document.querySelector('#sandbox') as HTMLIFrameElement
    iframe.contentWindow!.postMessage(script, '*')
  })
}
