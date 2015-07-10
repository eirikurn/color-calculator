export default Ember.Component.extend({
  classNames: ['Formula'],

  actions: {
    changeLeft: function() {
      Ember.run.once(this, 'calculateResult');
    },
    changeRight: function() {
      Ember.run.once(this, 'calculateResult');
    },
    changeResult: function() {
      Ember.run.once(this, 'calculateRight');
    }
  },

  calculateResult: function() {
    let left = tinycolor(this.get('left'));
    let right = tinycolor(this.get('right'));
    let alpha = right.getAlpha();
    right.setAlpha(1);
    let result = tinycolor.mix(left, right, alpha * 100);
    this.set('result', result);
  },

  calculateRight: function() {

  },

  didInsertElement: function() {
    this.calculateResult();
  }
});
