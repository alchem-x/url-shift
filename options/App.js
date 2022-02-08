import { css, onMounted, ref } from './modules.js'
import Header from './Header.js'
import ShiftTable from './ShiftTable.js'
import Toolbar from './Toolbar.js'
import { getShiftList } from '../store.js'

const _App = css`
  box-sizing: border-box;
  max-width: 1000px;
  padding: 2rem 1rem;
  min-height: 100vh;
  margin: 0 auto;
`

export default {
    template: `
      <div class="${_App}">
      <Header/>
      <ShiftTable @refresh="handleRefresh" :shift-list="shiftList"/>
      <Toolbar @refresh="handleRefresh"/>
      </div>
    `,
    setup() {
        const shiftList = ref([])

        async function handleRefresh() {
            shiftList.value = await getShiftList()
        }

        onMounted(handleRefresh)

        return {
            shiftList,
            handleRefresh,
        }
    },
    components: {
        Header,
        ShiftTable,
        Toolbar,
    },
}