define(['knockout', 'preferences-vm', 'lso'], function(ko, PreferencesViewModel, localStorageObservable) {
  'use strict';

  function MainViewModel() {
    this.preferences = new PreferencesViewModel();

    this.contents = localStorageObservable('editorContents');

    this.focusEditor = ko.observable(true);
    this.hideHeader = ko.observable(false);

    this.contentsStyle = ko.pureComputed(function() {
      switch (this.preferences.textSize()) {
        case 'smaller': return 'isSmaller';
        case 'normal': return '';
        case 'larger': return 'isLarger';
      }
    }, this);

    this.bodyStyle = ko.pureComputed(function() {
      switch (this.preferences.theme()) {
        case 'light': return 'theme-light';
        case 'dark': return 'theme-dark';
      }
    }, this);
  }

  MainViewModel.prototype.onBodyClick = function(vm, e) {
    if (e.target.nodeName !== 'BODY')
      return true;

    this.focusEditor(true);
  };

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