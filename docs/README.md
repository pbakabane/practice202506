# Backbone.js について

## MVC の機能

参考：https://www.sejuku.net/blog/106675

- ### Model

  #### 単一のデータを保持するのに役立つ機能

  例：`User`(ユーザーの情報で、デフォルト値は name：空文字、age：0 歳)

  ```bash
  const User = Backbone.Model.extend({
  defaults: { name: '', age: 0 }
  });
  ```

- ### Collection

  #### 複数データの追加・削除を連続敵に行うケースにて使用する機能

  例：`UserList`(上記モデルを基にした全ユーザーリスト)

  ```bash
  const UserList = Backbone.Collection.extend({
  model: User
  });
  ```

- ### view

  #### 作成したモデルやコレクションのデータを利用する機能（DOM 要素を生成する用途が一般的）

  例：`UserView`(テンプレート機能を用いてユーザー情報を表示する li 要素) ※テンプレート機能については後述

  ```bash
  const UserView = Backbone.View.extend({
  tagName: 'li',

  render: function () {
    const template = _.template(templateHtml);
    this.$el.html(template(this.model.toJSON()));
    return this;
  }
  });

  ```

  例：`UserListView`(上記 li 要素を、ユーザーリストを用いて 1 人分ずつ繰り返しインスタンス化して出力する ul 要素)

  ```bash
  const UserListView = Backbone.View.extend({
  tagName: 'ul',

  render: function() {
  this.collection.each(function(data) {
      const li = new UserView({ model: data });
      this.$el.append(li.render().el);
    }, this);
    return this;
  }
  });

  ```

1. モデル（Model）

   - 単一データを表す
   - デフォルト値などを保持できる

2. コレクション（Collection）

   - 複数のモデルをまとめる
   - モデルの追加・削除を一括管理できる

3. ビュー（View）
   - DOM を操作して画面に反映
   - モデルとテンプレートを組み合わせる

## 構築した MVC の使い方

- ### MVC の連携の流れ

  1.　 `User`（Model）：1 人のユーザー情報を保持

  2.　 `UserList`（Collection）：複数のユーザー情報をまとめて管理

  3.　 `UserView`（View）：1 人のユーザー情報を li として描画

  4.　 `UserListView`（View）：Collection を元に複数の UserView を作り ul として描画

- ### 最後に ul 要素（上記の場合、`UserListView`）を描画する

  ```bash
  const userListView = new UserListView({ collection: users });
  $('body').append(userListView.render().el);
  ```

## View の主な機能

- ### テンプレートを用いた DOM の構築

  例：
  テンプレートは HTML 側に用意

  ```bash
  <script type="text/template" id="user-template">
  <%= name %>（性別：<%= sex %>）
  </script>
  ```

  View 側でテンプレートを使用(`UserView`)

  ```bash
  const UserView = Backbone.View.extend({
  tagName: 'li',

  render: function () {
   const template = _.template(templateHtml);
   this.$el.html(template(this.model.toJSON()));
   return this;
  }
  });
  ```

- ### イベントのバインド（DOM 操作）

  DOM イベントを定義し、要素に対する操作や処理を記述できる\
  例 ①：`UserView` にモデルをクリックしたときの動作を追加

  ```bash
  const UserView = Backbone.View.extend({
  tagName: 'li',
  events: {
    'click': 'onClick'
  },

  onClick: function () {
    alert(this.model.get('name') + ' をクリックしました');
  },

  render: function () {
    const template = _.template($('#user-template').html());
    this.$el.html(template(this.model.toJSON()));
    return this;
  }
  });

  ```

  例 ②：再利用性の高いボタンの実装

  ```bash
  const CustomButtonView = Backbone.View.extend({
  tagName: 'button',

  //渡された値(オプション)をラベルとクリックしたときの動作に設定する
  initialize: function(options) {
  this.label = options.label || 'クリック';
  this.onClick = options.onClick || function() {};
  },

  events: {
  'click': 'handleClick'
  },

  render: function() {
  this.$el.text(this.label);
  return this;
  },

  handleClick: function() {
  this.onClick();
  }
  });

  ```

  例 ②：`UserView` にて上記ボタンを搭載する\
  「詳細」ボタンを押すと`showDetail`がポップアップ表示される

  ```bash
  const UserView = Backbone.View.extend({
  tagName: 'li',

  initialize: function() {
    const templateHtml = $('#user-template').html();
    this.template = _.template(templateHtml);

    this.button = new CustomButtonView({
      label: '詳細',
      onClick: this.showDetail.bind(this)
    });
  },

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    this.$el.append(this.button.render().el);
    return this;
  },

  showDetail: function() {
    alert(`${this.model.get('name')} さんは ${this.model.get('age')} 歳${this.model.get('sex')}性です。`);
  }
  });

  ```
