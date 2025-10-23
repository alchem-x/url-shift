export async function fetchScript(url) {
  let errorText
  try {
    if (!url) {
      return ''
    }
    const response = await fetch(url, {
      headers: {
        'cache-control': 'no-store',
      },
    })
    if (response.ok) {
      return await response.text()
    } else {
      errorText = response.statusText
    }
  } catch (err) {
    errorText = err.message
  }
  if (errorText) {
    throw new Error(`Fetch script failed: ${errorText}`)
  }
}
