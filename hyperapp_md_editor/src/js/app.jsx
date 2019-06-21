import { h, app } from "hyperapp";
import marked from "marked";
import "./../scss/style.scss";

const previewStyles = ["github", "air"];

const state = {
  preview: "",
  style: previewStyles[0]
};

const actions = {
  setInput: input => state => ({
    preview: marked(input)
  }),
  changeCss: input => state => ({
    stylebase: input
  })
};

const view = (state, actions) => (
  <div>
    <header id="header">
      <h1>Markdown Editor made by Hyperapp</h1>
      <p id="selectWrap">
        <label>
          CSS type ▶
          <select
            id="selectCss"
            onchange={e => actions.changeCss(e.target.value)}
          >
            {previewStyles.map(style => (
              <option value={style}>{style}</option>
            ))}
          </select>
        </label>
      </p>
    </header>
    <article id="main">
      <section id="inputMarddown">
        <p id="editorWrap">
          <textarea
            id="editor"
            placeholder="# Let's start writing!"
            oninput={e => {
              actions.setInput(e.target.value);
            }}
          />
        </p>
      </section>
      <section id="previewHtml">
        {/* innerHTMLに直接渡すことでHTML化した文字列をそのままHTMLとして反映できる */}
        <div
          id="preview"
          className={state.stylebase}
          innerHTML={state.preview}
        />
      </section>
    </article>
  </div>
);

app(state, actions, view, document.body);
