define(['knockout'], function(ko) {
  'use strict';

  ko.bindingHandlers.content = {
    init: function(el, valueAccessor) {
      el.innerHTML = ko.unwrap(valueAccessor());

      if (ko.isWritableObservable(valueAccessor())) {
        el.addEventListener('input', function() {
          valueAccessor()(el.innerHTML);
        });
      }
    }
  };
});