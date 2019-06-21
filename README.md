# Hyperapp

`book_hyperapp.pdf` から

## 1 章

- hyperapp は state 等は一つに纏められている

## 2 章

- React と違い、action で新しい state を返すのではなく、変更点のある部分のみを return する、hyperapp が再描画を勝手にやってくれる
- state に `undefined|null|Promise` を返す場合は、再描画や状態の更新を行わない
- React と同じように action の中で、直接 state を変更しても意味がない。そこはいつもどおり object を return して、hyperapp に描画を促してあげる
  - ただ、戻り値は定義されていないので、描画に直接関係ないアクションを起こせる
- async function

### action の関数で async にする

```javascript
const actions = {
  setLater: () => async (state, actions) => {
    // 2 seconds later
    await new Promise(done => setTimeout(done, 2000));
    actions.setColor("#fff");
  },
  setColor: value => ({ color: value })
};
```

- アプリケーションの状態が変更されるたびに呼び出されるのが view 関数
  - あとは新旧の状態が比較されて部分的に更新している
- Hyperapp の処理をアプリにマウントするのが app 関数
  - app 関数はアクションのコピーを返す...
  - から変数に入れて、外からアクセスすることも可能

### actions を外からアクセスする

```javascript
const main = app(state, actions, view, document.body);
setInterval(main.setRed, 1000, 255);
setInterval(main.setBlue, 1000, 0);
```

### ライフサイクルイベント

- DOM 要素の作成・更新・削除などの通知を受けられる
- oncreate: DOM が作成された時
- onupdate: 要素の属性の更新を検知
- onremove: DOM の削除前に実行
- ondestroy: DOM が削除後に実行

#### oncreate で要素のフォーカス/ onupdate で placeholder のチェック

```javascript
const Textbox = ({ placeholder }) => {
  <input
    type="text"
    oncreate={e => e.focus()}
    onupdate={(e, oldAttributes) => {
      if (oldAttributes.placeholder !== placeholder) {
        e.preventDefault();
        console.log("placeholder has been changed.");
      }
    }}
  />;
};
```

#### onremove でフェードアウトするようなアニメーションを起こす

```javascript
const Messagebox = ({ msg }) => (
  <div
    onremove={(e, done) => fadeout(e).then(done)}
    ondestroy={e => {
      console.log(`${e} is destroyed.`);
    }}
  >
    <p>{msg}</p>
  </div>
);
```
