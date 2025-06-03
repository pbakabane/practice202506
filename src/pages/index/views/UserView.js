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
