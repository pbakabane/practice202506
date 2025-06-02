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

  例：`UsersList`(上記モデルを基にした全ユーザーリスト)

  ```bash
  const UsersList = Backbone.Collection.extend({
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

  例：`UsersListView`(上記 li 要素を、ユーザーリストを用いて 1 人分ずつ繰り返しインスタンス化して出力する ul 要素)

  ```bash
  const UsersListView = Backbone.View.extend({
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

  2.　 `UsersList`（Collection）：複数のユーザー情報をまとめて管理

  3.　 `UserView`（View）：1 人のユーザー情報を li として描画

  4.　 `UsersListView`（View）：Collection を元に複数の UserView を作り ul として描画

- ### 最後に ul 要素（上記の場合、`UsersListView`）を描画する

  ```bash
  const usersListView = new UsersListView({ collection: users });
  $('body').append(usersListView.render().el);
  ```

## View の主な機能

- ### テンプレートを用いた DOM の構築

  例：
  テンプレートは HTML 側に用意

  ```bash
  <script type="text/template" id="user-template">
  <%= name %>（<%= age %>歳）
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

  DOM イベントを定義し、要素に対する操作や処理を記述できる
  例：クリックしたときの動作を追加

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
