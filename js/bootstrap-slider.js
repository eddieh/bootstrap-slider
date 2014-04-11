/* ========================================================================
 * bootstrap-slider.js v0.0.1
 * ========================================================================
 * Copyright 2014 Eddie Hillenbrand
 * Licensed under MIT
 * ======================================================================== */


+function ($) {
  'use strict';

  // SLIDER CLASS DEFINITION
  // =========================

  var toggle   = '[data-toggle="slider"]'
  var Slider = function (element) {
  }

  Slider.prototype.noop = function (e) {
  }


  // SLIDER PLUGIN DEFINITION
  // ==========================

  var old = $.fn.slider

  $.fn.slider = function (option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.slider')

      if (!data) $this.data('bs.slider', (data = new Slider(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.slider.Constructor = Slider


  // SLIDER NO CONFLICT
  // ====================

  $.fn.slider.noConflict = function () {
    $.fn.slider = old
    return this
  }

}(jQuery);