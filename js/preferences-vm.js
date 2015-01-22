define(['knockout', 'lso'], function(ko, localStorageObservable) {
  'use strict';

  function PreferencesViewModel() {
    this.showMenu = ko.observable(false);
    this.textSize = localStorageObservable('editorTextSize', 'normal');
    this.theme = localStorageObservable('editorTheme', 'light');

    this.smallerSelected = ko.pureComputed(function() {
      return this.textSize() === 'smaller';
    }, this);

    this.normalSelected = ko.pureComputed(function() {
      return this.textSize() === 'normal';
    }, this);

    this.largerSelected = ko.pureComputed(function() {
      return this.textSize() === 'larger';
    }, this);

    this.lightSelected = ko.pureComputed(function() {
      return this.theme() === 'light';
    }, this);

    this.darkSelected = ko.pureComputed(function() {
      return this.theme() === 'dark';
    }, this);
  }
  PreferencesViewModel.prototype.onButtonClick = function() {
    this.showMenu(!this.showMenu());
  };
  PreferencesViewModel.prototype.canHideHeader = function() {
    return !this.showMenu();
  };
  PreferencesViewModel.prototype.onSmallerClick = function() {
    this.textSize('smaller');
  };
  PreferencesViewModel.prototype.onNormalClick = function() {
    this.textSize('normal');
  };
  PreferencesViewModel.prototype.onLargerClick = function() {
    this.textSize('larger');
  };
  PreferencesViewModel.prototype.onLightClick = function() {
    this.theme('light');
  };
  PreferencesViewModel.prototype.onDarkClick = function() {
    this.theme('dark');
  };

  return PreferencesViewModel;
});