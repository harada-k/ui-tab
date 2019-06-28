(function(){
// タブUIのルート
const tabUIRoot = document.querySelector('.js-tabUI');
// すべてのタブ
const tabs = tabUIRoot.querySelectorAll('.js-tab');
// すべてのタブパネル
const panels = tabUIRoot.querySelectorAll('.js-tabpanel');
// タブの数
const tabsLength = tabs.length;

// 現在選択されているタブのインデックス
// 初期化時に選択されているタブのインデックスで更新する
let currentSelectedTabIndex;

// 現在フォーカスが当たっているタブのインデックス
let currentFocusedTabIndex;

// タブの最後のインデックス
const tabsLastIndex = tabsLength - 1;

// 特定のタブのタブ一覧におけるインデックスを返す
function getIndexOfTab(tabElement) {
  let matchedIndex = -1;
  for (let i = 0; i < tabsLength; i++) {
    if (tabs[i] === tabElement) {
      matchedIndex = i;
      break;
    }
  }
  return matchedIndex;
}

// 切り替え動作

// 現在選択されているタブのインデックスを返す
function getCurrentSelectedTabIndex() {
  return currentSelectedTabIndex;
}

// 現在選択されているタブのインデックスを設定する
function setCurrentSelectedTabIndex(index) {
  currentSelectedTabIndex = index;
}

// タブをクリックしたときのイベントハンドラ
function onClickTab(event) {
  const clickedTab = event.currentTarget;
  const clickedIndex = getIndexOfTab(clickedTab);
  const currentIndex = getCurrentSelectedTabIndex();
  // クリックされたタブが現在選択されているものと同じなら何もしない
  if (clickedIndex === currentIndex) {
    return;
  }
  // タブとタブパネルを切り替える
  changeTab(clickedIndex, currentIndex);
  // 現在選択されているタブのインデックスを更新
  setCurrentSelectedTabIndex(clickedIndex);
}

// タブとタブパネルの状態切り替え
function changeTab(nextIndex, currentIndex) {
  const nextTab = tabs[nextIndex];
  const nextPanel = panels[nextIndex];
  show(nextTab, nextPanel);
  // 初期化時は現在選択されているインデックスが存在しない
  if (currentIndex > -1) {
    const currentTab = tabs[currentIndex];
    const currentPanel = panels[currentIndex];
    hide(currentTab, currentPanel);
  }
}

// タブを選択状態にし、タブパネルを表示する
function show(tab, panel) {
  tab.setAttribute('aria-selected', 'true');
  tab.removeAttribute('tabindex');
  panel.setAttribute('aria-hidden', 'false');
}

// タブを非選択状態にし、タブパネルを非表示にする
function hide(tab, panel) {
  tab.setAttribute('aria-selected', 'false');
  tab.setAttribute('tabindex', '-1');
  panel.setAttribute('aria-hidden', 'true');
}

function onClickTab(event) {
  const clickedTab = event.currentTarget;
  const clickedIndex = getIndexOfTab(clickedTab);
  const currentIndex = getCurrentSelectedTabIndex();
  // クリックされたタブが現在選択されているものと同じなら何もしない
  if (clickedIndex === currentIndex) {
    return;
  }
  // タブとタブパネルを切り替える
  changeTab(clickedIndex, currentIndex);
  // 現在選択されているタブのインデックスを更新
  setCurrentSelectedTabIndex(clickedIndex);
}

// キーボード操作

// 現在フォーカスが当たっているタブのインデックスを返す
function getCurrentFocusedTabIndex() {
  return currentFocusedTabIndex;
}

// 現在フォーカスが当たっているタブのインデックスを設定する
function setCurrentFocusedTabIndex(index) {
  currentFocusedTabIndex = index;
}

// タブのフォーカスイベントハンドラ
// フォーカスされたタブのインデックスを取得し、
// 現在フォーカスが当たっているタブのインデックスを更新する
function onFocusTab(event) {
  const focusedTab = event.currentTarget;
  const focusedIndex = getIndexOfTab(focusedTab);
  const currentSelectedIndex = getCurrentSelectedTabIndex();
  setCurrentFocusedTabIndex(focusedIndex);
  // フォーカスによる自動選択バージョン
  if (focusedIndex === currentSelectedIndex) {
    return;
  }
  changeTab(focusedIndex, currentSelectedIndex);
  setCurrentSelectedTabIndex(focusedIndex);
}

// タブのキーダウンイベントハンドラ
// キーボードインタラクションを実装する
function onKeydownTab(event) {
  const key = event.key;
  switch (key) {
    case 'ArrowRight':
    case 'Right': // for IE, Edge 16-, Firefox 36-
      focusNextTab();
      break;
    case 'ArrowLeft':
    case 'Left': // for IE, Edge 16-, Firefox 36-
      focusPreviousTab();
      break;
    case 'Home':
      focusTab(0);
      break;
    case 'End':
      focusTab(tabsLastIndex);
      break;
  }
}

// 特定のインデックスのタブにフォーカスを移動する
function focusTab(index) {
  tabs[index].focus();
}

// 現在フォーカスが当たっているタブの次のタブにフォーカスを移動する
// 最後のタブの場合は最初のタブに移動する
function focusNextTab() {
  const currentIndex = getCurrentFocusedTabIndex();
  let nextIndex = currentIndex + 1;
  if (nextIndex > tabsLastIndex) {
    nextIndex = 0;
  }
  focusTab(nextIndex);
}

// 現在フォーカスが当たっているタブの前のタブにフォーカスを移動する
// 最初のタブの場合は最後のタブに移動する
function focusPreviousTab() {
  const currentIndex = getCurrentFocusedTabIndex();
  let nextIndex = currentIndex - 1;
  if (nextIndex < 0) {
    nextIndex = tabsLastIndex;
  }
  focusTab(nextIndex);
}

// 初期化

// タブが選択状態かどうか
function isSelectedTab(tab) {
  const ariaSelected = tab.getAttribute('aria-selected');
  return ariaSelected === 'true';
}

// 初期化処理
function init() {
  for (let i = 0; i < tabsLength; i++) {
    const tab = tabs[i];
    const isSelected = isSelectedTab(tab);
    if (isSelected) {
      changeTab(i);
      setCurrentSelectedTabIndex(i);
    }
    tab.addEventListener('click', onClickTab, false);
    tab.addEventListener('focus', onFocusTab, false);
    tab.addEventListener('keydown', onKeydownTab, false);
  }
}

// 実行
init();

})();
