import { css, hljs, onMounted, ref } from './modules.js'

const _CodePreviewer = css`
  border: 1px solid #111;
  background-color: #fff;
  overflow: auto;
  max-height: min(400px, 50vh);

  > pre {
    margin: 0;
    padding: 0;
  }
`

export default {
    template: `
      <div class="${_CodePreviewer}">
      <pre><code ref="code" class="language-javascript">{{ script }}</code></pre>
      </div>
    `,
    props: {
        script: {
            type: String,
            required: true,
        },
    },
    setup() {
        const code = ref()

        onMounted(() => {
            hljs.highlightElement(code.value)
        })

        return {
            code,
        }
    },
}