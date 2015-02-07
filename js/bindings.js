define(['knockout'], function(ko) {
  'use strict';

  ko.bindingHandlers.textareaGrow = {
    init: function(el) {

      function resize() {
        var scroll = document.body.scrollTop;
        el.style.height = '';

        var nativeHeight = el.clientHeight;
        var textHeight = el.scrollHeight;

        if (nativeHeight < textHeight)
          el.style.height = textHeight + 'px';

        document.body.scrollTop = scroll;
      }

      resize();
      el.addEventListener('input', resize);
      window.addEventListener('resize', resize);
    }
  };

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