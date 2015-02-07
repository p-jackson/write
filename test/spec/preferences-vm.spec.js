define(['preferences-vm'], function(PreferencesViewModel) {
  'use strict';

  function checkTextSizeComputed(vm, sizeSetting, computedName) {
    var textSizeSettings = ['smaller', 'normal', 'larger'];
    checkOptionComputed(vm, sizeSetting, 'textSize', computedName, textSizeSettings);
  }

  function checkThemeComputed(vm, themeSetting, computedName) {
    var themeSettings = [ 'light', 'dark' ];
    checkOptionComputed(vm, themeSetting, 'theme', computedName, themeSettings);
  }

  function checkOptionComputed(vm, sizeSetting, propertyName, computedName, allSettings) {
    var computed = vm[computedName];
    var property = vm[propertyName];

    for (var i = 0; i < allSettings.length; ++i) {
      property(allSettings[i]);
      var expected = allSettings[i] === sizeSetting;
      expect(computed()).toBe(expected);
    }

    // Fuzz test
    property(undefined);
    expect(computed()).toBe(false);
    property(Math.random());
    expect(computed()).toBe(false);
  }

  describe('PreferencesViewModel', function() {

    beforeEach(function() {
      this.vm = new PreferencesViewModel();
    });

    it('smallerSelected is true when textSize is the correct value', function() {
      checkTextSizeComputed(this.vm, 'smaller', 'smallerSelected');
    });

    it('normalSelected is true when textSize is the correct value', function() {
      checkTextSizeComputed(this.vm, 'normal', 'normalSelected');
    });

    it('largerSelected is true when textSize is the correct value', function() {
      checkTextSizeComputed(this.vm, 'larger', 'largerSelected');
    });

    it('lightSelected is true when theme is the correct value', function() {
      checkThemeComputed(this.vm, 'light', 'lightSelected');
    });

    it('darkSelected is true when theme is the correct value', function() {
      checkThemeComputed(this.vm, 'dark', 'darkSelected');
    });

    it('smallerSelected is true after smaller option is clicked', function() {
      this.vm.onNormalClick();
      expect(this.vm.smallerSelected()).toBe(false);
      this.vm.onSmallerClick();
      expect(this.vm.smallerSelected()).toBe(true);
      this.vm.onSmallerClick();
      expect(this.vm.smallerSelected()).toBe(true);
    });

    it('normalSelected is true after normal option is clicked', function() {
      this.vm.textSize(null);
      expect(this.vm.normalSelected()).toBe(false);
      this.vm.onNormalClick();
      expect(this.vm.normalSelected()).toBe(true);
      this.vm.onNormalClick();
      expect(this.vm.normalSelected()).toBe(true);
    });

    it('largerSelected is true after larger option is clicked', function() {
      this.vm.onNormalClick();
      expect(this.vm.largerSelected()).toBe(false);
      this.vm.onLargerClick();
      expect(this.vm.largerSelected()).toBe(true);
      this.vm.onLargerClick();
      expect(this.vm.largerSelected()).toBe(true);
    });

    it('lightSelected is true after light option is clicked', function() {
      this.vm.onDarkClick();
      expect(this.vm.lightSelected()).toBe(false);
      this.vm.onLightClick();
      expect(this.vm.lightSelected()).toBe(true);
      this.vm.onLightClick();
      expect(this.vm.lightSelected()).toBe(true);
    });

    it('darkSelected is true after dark option is clicked', function() {
      this.vm.onLightClick();
      expect(this.vm.darkSelected()).toBe(false);
      this.vm.onDarkClick();
      expect(this.vm.darkSelected()).toBe(true);
      this.vm.onDarkClick();
      expect(this.vm.darkSelected()).toBe(true);
    });

    it('header can not be hidden when the menu is visible', function() {
      this.vm.showMenu(true);
      expect(this.vm.canHideHeader()).toBe(false);
    });

  });

});