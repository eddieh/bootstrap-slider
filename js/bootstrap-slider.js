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

    if (this.options.showChange)
      this.$progressBarChange = $el.find('.progress-bar-change')

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
    this.$handle.tooltip('destroy')
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

    if (this.options.valueTooltip) this.showTooltip(newLeft)

    this.$handle.css('left', newLeft + '%')
    this.$progressBar.css('width', newLeft + '%')

    if (this.options.showChange)
      this.showChange(progressLeft, progressWidth, newLeft)
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

  Slider.prototype.showTooltip = function (newLeft) {
    this.$handle.tooltip('destroy')
    this.$handle.tooltip({
      animation: false,
      placement: 'bottom',
      title: typeof this.options.valueTooltip == 'boolean' ?
        newLeft + '%' : this.options.valueTooltip(newLeft),
      trigger: 'manual'
    }).tooltip('show')
  }

  Slider.prototype.showChange = function (progressLeft, progressWidth, newLeft) {
    var handleMargin = 0,
        handleLeft = 0

    if (!this.originalLeft) {
      handleMargin = parseInt(this.$handle.css('margin-left'))
      handleLeft = this.$handle.offset().left - handleMargin
      this.originalLeft = Math.round(((handleLeft - progressLeft) / progressWidth) * 100)
    }

    if (newLeft <= this.originalLeft) {
      this.$progressBar.css('width', newLeft + '%')
      this.$progressBarChange.css('width', this.originalLeft - newLeft + '%')
    }

    if (newLeft > this.originalLeft) {
      this.$progressBar.css('width', this.originalLeft + '%')
      this.$progressBarChange.css('width', newLeft - this.originalLeft + '%')
    }
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