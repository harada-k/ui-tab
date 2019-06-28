# ui-tab

## 学習内容
CodeGridの記事を元に、タブUIを作成
- https://app.codegrid.net/entry/2018-common-ui-6
- https://app.codegrid.net/entry/2018-common-ui-7
- https://app.codegrid.net/entry/2018-common-ui-8

タブUIにおけるJavaScriptの基本的な考え方、キーボードインタラクションの実装方法を学ぶ。

### ポイント
タブのリスト
```
<ul class="TabUI-tablist"
    role="tablist"
    aria-label="おすすめ記事リンク">
  <li class="TabUI-item"
      role="none presentation">
    <button type="button"
            class="TabUI-tab"
            id="tab-news"
            role="tab"
            aria-controls="panel-news"
            aria-selected="true"
            tabindex="0">ニュース</button>
  </li>
</ul>
```
- `role="tablist"` タブのリストであることを示す
    - `tablist`ロールは、このあとに出てくる`tab`ロールのコンテキストに要求され、`tablist`ロール自体も`tab`ロールの所有を要求する
    - `tablistロール`にはラベルを指定する
        - 他の要素のテキストを参照するなら`aria-labelledby`
        - そうでないなら`aria-label`
- `li`要素の初期ロールは`listitem`
    - `listitem`に要求されるコンテキストロールは`ul`の初期ロールでもある`list`ロール、または`group`ロール
    - `ul`のロールはすでに`tablist`に変更されているので、この`li`をアクセシビリティツリーから無視させることで、コンテキストに不都合が出ないようにする => `role="none presentation"`に変更
- `button`要素をタブに使用
    - タブに要求されるキーボードインタラクションには「EnterキーとSpaceキーで押せること」なので、この動作を最初から持っている`button`要素を使用する
    - 何も指定しないと`type="submit"`になるので、`type="button"`を付与してデフォルトの動作を持たないボタンと示す
    - `button`をタブとして示すための`role="tab"`
    - `aria-controls`で操作対象となるタブパネルのid属性値を指定し、タブとタブパネルを関連付ける
    - `aria-selected`属性で、タブが現在選択されているのかどうかを示す（`true`/`false`/`undefined`）
    - `tabindex="-1"`を指定すると、Tabキーのフォーカス移動ではその要素に到達できなくなる。（タブにフォーカスが当たっているとき、タブ同士でのフォーカスの移動は左右カーソルキーで行う。JavaScriptで実装）

タブパネル
```
<div class="TabUI-body">
  <div class="TabUI-tabpanel"
       id="panel-news"
       role="tabpanel"
       aria-labelledby="tab-news"
       aria-hidden="false"
       tabindex="0">
    <!-- コンテンツ -->
  </div>
</div>
```
- `id`属性はタブの`aria-controls`属性と同じ値を設定
- `tabpanel`ロールでタブパネルであることを示す
- `aria-labelledby`属性にはタブのid属性値を指定。タブパネルのラベルに、関連付けられたタブのテキストが使用され、タブとタブパネルが相互関連付けされる。
    - 各タブのテキストはタブパネルのラベルとして使用できるようなものにすることが望ましい。
- `aria-hidden`属性でタブパネルが表示されているかどうかを示す
    - 複数のタブが選択可能なタブUIの場合、`aria-hidden`でも`hidden`でもなく、「`aria-expanded`属性で開閉状態を示すことを確認すべき（SHOULD）である」
- `tabindex="0"`でTabキーによるフォーカス移動を可能に。
    - 使用している要素が`div`であり、初期状態ではTabキーによるフォーカス移動ができないため。

### 課題
- jsの機能を分割して見通しよくする。
