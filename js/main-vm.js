define([
  'knockout',
  'preferences-vm',
  'editor-vm'
], function(ko, PreferencesViewModel, EditorViewModel) {
  'use strict';

  function MainViewModel() {
    this.preferences = new PreferencesViewModel();
    this.editor = new EditorViewModel(this);

    this.hideHeader = ko.observable(false);

    this.bodyStyle = ko.pureComputed(function() {
      switch (this.preferences.theme()) {
        case 'light': return 'theme-light';
        case 'dark': return 'theme-dark';
      }
    }, this);
  }

  MainViewModel.prototype.onMouseMove = function() {
    this.hideHeader(false);
    this.startHideTimer();
    return true;
  };

  MainViewModel.prototype.startHideTimer = function() {
    if (this._timerId)
      clearTimeout(this._timerId);

    this._timerId = setTimeout(function() {
      if (this.preferences.canHideHeader())
        this.hideHeader(true);
    }.bind(this), 3000);
  };

  return MainViewModel;
});