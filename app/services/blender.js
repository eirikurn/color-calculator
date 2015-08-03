export default Ember.Service.extend({
  blend(color1, color2, mode, reverse) {
    color1 = this.colorToRgbRatio(color1);
    color2 = this.colorToRgbRatio(color2);
    const func = this.blendFunctions[mode].bind(this.blendFunctions);

    if (!func) return;

    // Blend
    let result = {
      r: func(color1.r, color2.r),
      g: func(color1.g, color2.g),
      b: func(color1.b, color2.b)
    };

    // Composite
    let alpha = color2.a;
    return tinycolor.fromRatio({
      r: color1.r + (result.r - color1.r) * alpha,
      g: color1.g + (result.g - color1.g) * alpha,
      b: color1.b + (result.b - color1.b) * alpha
    });
  },

  colorToRgbRatio(color) {
    let rgb = tinycolor(color).toRgb();
    return {
      r: rgb.r / 255,
      g: rgb.g / 255,
      b: rgb.b / 255,
      a: rgb.a
    };
  },

  blendFunctions: {
    normal(cb, cs) {
      return cs;
    },

    multiply(cb, cs) {
      return cb * cs;
    },

    screen(cb, cs) {
      return 1 - (1 - cb) * (1 - cs);
    },

    overlay(cb, cs) {
      return this.hardLight(cs, cb);
    },

    hardLight(cb, cs) {
      return cs <= 0.5 ? this.multiply(cb, 2 * cs) : this.screen(cb, 2 * cs - 1);
    },

    darken(cb, cs) {
      return Math.min(cb, cs);
    },

    lighten(cb, cs) {
      return Math.max(cb, cs);
    },

    colorDodge(cb, cs) {
      return cb === 0 ? 0 :
          cs === 1 ? 1 :
          Math.min(1, cb / (1 - cs));
    },

    colorBurn(cb, cs) {
      return cb === 1 ? 1 :
          cs === 0 ? 0 :
          1 - Math.min(1, (1 - cb) / cs);
    },

    softLight(cb, cs) {
      const d = cb <= .25 ? ((16 * cb - 12) * cb + 4) * cb : Math.sqrt(cb);
      if (cs <= .5)
        return cb - (1 - 2 * cs) * cb * (1 - cb);
      else
        return cb + (2 * cs - 1) * (d - cb);
    },

    difference(cb, cs) {
      return Math.abs(cb - cs);
    },

    exclusion(cb, cs) {
      return cb + cs - 2 * cb * cs;
    }
  }
});
