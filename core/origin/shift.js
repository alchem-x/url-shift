export function getShift(script) {
    let shift

    function define(factory) {
        shift = factory()
    }

    new Function('define', script)(define)
    return shift
}

export async function fetchScript(url) {
    let errorText
    try {
        const response = await fetch(url, {
            headers: {
                'cache-control': 'no-store',
            }
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
