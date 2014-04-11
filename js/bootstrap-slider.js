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
    var $el = $(element)

    this.$progress = $el.find('.progress')
    this.$progressBar = $el.find('.progress-bar')
    this.$handle = $el.find('.slider-handle')

    this.$handle.on('mousedown', $.proxy(this.mouseDown, this))
  }

  Slider.prototype.mouseDown = function (e) {
    $(document)
      .on('mousemove', $.proxy(this.mouseMove, this))
      .on('mouseup', $.proxy(this.mouseUp, this))
  }

  Slider.prototype.mouseUp = function (e) {
    $(document)
      .off('mousemove', this.mouseMove)
      .off('mouseup', this.mouseUp)
  }

  Slider.prototype.mouseMove = function (e) {
    var mouseX = e.clientX,
        progressLeft = this.$progress.offset().left,
        progressWidth = this.$progress.width(),
        newLeft = ((mouseX - progressLeft) / progressWidth) * 100

    e.preventDefault()

    if (newLeft < 0) newLeft = 0
    if (newLeft > 100) newLeft = 100

    this.$handle.css('left', newLeft + '%')
    this.$progressBar.css('width', newLeft + '%')
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