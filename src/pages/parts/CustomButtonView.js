const CustomButtonView = Backbone.View.extend({
  tagName: 'button',

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
