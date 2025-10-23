export function getShiftInSandbox(script) {
  return new Promise((resolve, reject) => {
    function callback(ev) {
      if (ev.data.error) {
        reject(ev.data.error)
      } else {
        resolve(ev.data.data)
      }
      window.removeEventListener('message', callback)
    }

    window.addEventListener('message', callback)

    const iframe = document.querySelector('#sandbox')
    iframe.contentWindow.postMessage(script, '*')
  })
}
