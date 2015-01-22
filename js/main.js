requirejs.config({
  baseUrl: 'js',
  paths: {
    knockout: 'http://cdnjs.cloudflare.com/ajax/libs/knockout/3.2.0/knockout-min'
  }
});

define(['knockout', 'main-vm', 'bindings'], function(ko, MainViewModel) {
  'use strict';

  var mainViewModel = new MainViewModel();
  mainViewModel.startHideTimer();

  ko.applyBindings(mainViewModel);

});