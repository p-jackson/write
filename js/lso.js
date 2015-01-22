define(['knockout'], function(ko) {
  'use strict';

  function localStorageObservable(storageName, initialValue) {
    var ob = ko.observable(localStorage.getItem(storageName) || initialValue);

    ob.subscribe(function(value) {
      localStorage.setItem(storageName, value);
    });

    return ob;
  }

  return localStorageObservable;
});