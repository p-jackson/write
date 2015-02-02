define(['knockout'], function(ko) {
  'use strict';

  ko.bindingHandlers.menuPopup = {
    init: function(el, valueAccessor) {
      var observable = valueAccessor();
      var menu = document.getElementById(el.getAttribute('menu'));

      function onDocumentClick(e) {
        if (e._write_inMenuClick)
          return;

        observable(false);
        document.removeEventListener('click', onDocumentClick);
      }

      function onMenuClick(e) {
        e._write_inMenuClick = true;
      }

      function onClick(e) {
        observable(!observable());

        e._write_inMenuClick = true;

        if (observable()) {
          document.addEventListener('click', onDocumentClick);
          menu.addEventListener('click', onMenuClick);
        }
      }

      el.addEventListener('click', onClick);

      ko.utils.domNodeDisposal.addDisposeCallback(el, function() {
        el.removeEventListener('click', onClick);
        document.removeEventListener('click', onDocumentClick);
        menu.removeEventListener('click', onMenuClick);
      });
    }
  };

});