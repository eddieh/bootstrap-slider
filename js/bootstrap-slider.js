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

  var toggle = '[data-toggle="slider"]'

  var Slider = function (element, options) {
    var $el = $(element)

    this.options = $.extend({}, Slider.DEFAULTS, options)

    if (typeof this.options.step == 'string') {
      this.options.step = parseInt(this.options.step)
      this.options.tolerance = this.options.tolerance || this.options.step * .2
    }

    this.$progress = $el.find('.progress')
    this.$progressBar = $el.find('.progress-bar')
    this.$handle = $el.find('.slider-handle')

    this.$handle.on('mousedown', $.proxy(this.mouseDown, this))
  }

  Slider.DEFAULTS = {
  };

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
        newLeft = Math.round(((mouseX - progressLeft) / progressWidth) * 100)

    e.preventDefault()

    if (typeof this.options.step == 'number') {
      newLeft = this.stepBehavior(progressLeft, progressWidth, newLeft)
      if (newLeft == -1) return
    }

    if (newLeft < 0) newLeft = 0
    if (newLeft > 100) newLeft = 100

    this.$handle.css('left', newLeft + '%')
    this.$progressBar.css('width', newLeft + '%')
  }

  Slider.prototype.stepBehavior = function (progressLeft, progressWidth, newLeft) {
    var handleMargin = parseInt(this.$handle.css('margin-left')),
        handleLeft = this.$handle.offset().left - handleMargin,
        originalLeft = Math.round(((handleLeft - progressLeft) / progressWidth) * 100),
        step = this.options.step,
        tolerance = this.options.tolerance,
        left = originalLeft - step,
        right = originalLeft + step

    if (newLeft >= left - tolerance && newLeft <= left + tolerance)
      newLeft = originalLeft - step
    if (newLeft >= right - tolerance && newLeft <= right + tolerance)
      newLeft = originalLeft + step

    if (Math.abs(originalLeft - newLeft) != step) return -1

    return newLeft
  }

  // SLIDER PLUGIN DEFINITION
  // ==========================

  var old = $.fn.slider

  $.fn.slider = function (option) {
    return this.each(function () {
      var $this = $(this)
      var data = $this.data('bs.slider')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.slider', (data = new Slider(this, options)))
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