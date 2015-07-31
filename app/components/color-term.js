export default Ember.Component.extend({
  classNames: ['Term'],

  showAlpha: false,

  alpha: Ember.computed('color', {
    get: function() {
      var color = tinycolor(this.get('color'));
      return Math.round(color.getAlpha() * 100);
    },
    set: function(key, value) {
      value = parseInt(value, 10);
      if (isNaN(value)) {
        return;
      }
      let color = tinycolor(this.get('color'));
      color.setAlpha(value / 100);
      this.set('color', color.toRgbString());
      this.sendAction();
      return value;
    }
  }),

  hexColor: Ember.computed('color', {
    get: function() {
      var color = tinycolor(this.get('color'));
      return color.toHexString();
    },
    set: function(key, value) {
      let color = tinycolor(value);
      color.setAlpha(this.get('alpha') / 100);
      this.set('color', color.toRgbString());
      this.sendAction();
      return value;
    }
  }),

  actions: {
    change: function() {
      this.sendAction('action', this.get('cssColor'));
    }
  }
});
