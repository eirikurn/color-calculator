export default Ember.Component.extend({
  classNames: ['Formula'],
  blender: Ember.inject.service(),

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
    var blender = this.get('blender');
    let result = blender.blend(
      this.get('left'),
      this.get('right'),
      this.get('blending')
    );
    this.set('result', result);
  },

  calculateRight: function() {

  },

  didInsertElement: function() {
    this.calculateResult();
  }
});
