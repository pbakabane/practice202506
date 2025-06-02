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