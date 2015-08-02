export default Ember.Component.extend({
  classNames: ['Mode'],

  // Probably want to store these differently
  modes: [
    Ember.Object.create({name: 'Normal', isActive: true}),
    Ember.Object.create({name: 'Multiply', isActive: false}),
    Ember.Object.create({name: 'Hard Light', isActive: false}),
    Ember.Object.create({name: 'Overlay', isActive: false}),
    Ember.Object.create({name: 'Soft Light', isActive: false})
  ],

  currentMode: Ember.computed('modes.@each.isActive', function() {
    return this.get('modes').filterBy('isActive').get('firstObject');
  }),

  selectedItemPosition: Ember.computed('currentMode', function() {
    let modes = this.get('modes');
    switch (modes.indexOf(this.get('currentMode'))) {
      case 0:
        return 'first';
      case modes.length - 1:
        return 'last';
      default:
        return 'mid';
    }
  }),

  positionModifier: Ember.computed('selectedItemPosition', function() {
    return `is-${this.get('selectedItemPosition')}-selected`;
  }),

  actions: {
    open() {
      this.set('isOpen', true);
    },

    switchTo(mode) {
      this.get('currentMode').set('isActive', false);
      mode.set('isActive', true);
      this.set('isOpen', false);
    }
  }
});
