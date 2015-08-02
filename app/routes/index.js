export default Ember.Route.extend({
  model: function() {
    return {
      left: '#ffffff',
      right: 'rgba(0, 0, 0, 0.2)',
      result: '#000000',
      blending: 'normal'
    };
  }
});
