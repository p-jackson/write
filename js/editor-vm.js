define(['knockout', 'lso'], function(ko, localStorageObservable) {
  'use strict';

  function EditorViewModel(mainViewModel) {
    this.contents = localStorageObservable('editorContents');

    this.focusEditor = ko.observable(true);

    this.editorStyle = ko.pureComputed(function() {
      switch (mainViewModel.preferences.textSize()) {
        case 'smaller': return 'isSmaller';
        case 'normal': return '';
        case 'larger': return 'isLarger';
      }
    }, this);
  }

  EditorViewModel.prototype.onClick = function(vm, e) {
    if (e.target.nodeName === 'TEXTAREA')
      return true;

    this.focusEditor(true);
  };

  return EditorViewModel;
});