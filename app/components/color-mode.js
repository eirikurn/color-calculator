export default Ember.Component.extend({
  classNames: ['Mode'],

  // Probably want to store these differently
  modes: [
    Ember.Object.create({name: 'Normal', func: 'normal', isActive: true}),
    Ember.Object.create({name: 'Multiply', func: 'multiply', isActive: false}),
    Ember.Object.create({name: 'Screen', func: 'screen', isActive: false}),
    Ember.Object.create({name: 'Overlay', func: 'overlay', isActive: false}),
    Ember.Object.create({name: 'Hard Light', func: 'hardLight', isActive: false}),
    Ember.Object.create({name: 'Darken', func: 'darken', isActive: false}),
    Ember.Object.create({name: 'Lighten', func: 'lighten', isActive: false}),
    Ember.Object.create({name: 'Color Dodge', func: 'colorDodge', isActive: false}),
    Ember.Object.create({name: 'Color Burn', func: 'colorBurn', isActive: false}),
    Ember.Object.create({name: 'Soft Light', func: 'softLight', isActive: false}),
    Ember.Object.create({name: 'Difference', func: 'difference', isActive: false}),
    Ember.Object.create({name: 'Exclusion', func: 'exclusion', isActive: false})
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
      this.set('blending', this.get('currentMode').get('func'));
    }
  }
});
