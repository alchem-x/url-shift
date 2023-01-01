function getShiftRuleList(script) {
    let shiftRuleList

    function define(factory) {
        shiftRuleList = factory()
    }

    new Function('define', script)(define)
    return shiftRuleList
}

window.addEventListener('message', async (event) => {
    event.source.window.postMessage(getShiftRuleList(event.data), event.origin);
})