const UserView = Backbone.View.extend({
  tagName: 'li',

  render: function () {
    const templateHtml = $('#user-template').html();
    const template = _.template(templateHtml);
    this.$el.html(template(this.model.toJSON()));
    return this;
  }
});
