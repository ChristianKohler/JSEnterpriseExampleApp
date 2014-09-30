describe('NewAppointment', function () {

  it('should have a title', function () {
    browser.get('/#/wizard');

    expect(browser.getTitle()).toEqual('Javascript Enterprise Example App');

    // should end up on product choose page
    expect(browser.getLocationAbsUrl()).toMatch('.*/wizard/product');
    element(by.css('h2')).getText().then(function (titleText) {
      expect(titleText).toBe('Choose Product');
    });

    // select a product
    element(by.model('ctrl.appointment.product')).element(by.cssContainingText('option', 'Schnitt Damen')).click();

    // TODO assert that "your selection" shows "Schnitt Damen"

    // go to next step
    element(by.css('a[href*="#\/wizard\/date"]')).click();
    expect(browser.getLocationAbsUrl()).toMatch('.*/wizard/date');
    element(by.css('h2')).getText().then(function (titleText) {
      expect(titleText).toBe('Choose Date and Time');
    });

    element(by.cssContainingText('button', '16.15')).click();
    // TODO assert that "your selection" shows "16.15"
    element(by.model('ctrl.appointment.date')).sendKeys('12/22/2015');
    // TODO assert that "your selection" shows the date

    // go to next step
    element(by.css('a[href*="#\/wizard\/contactdetails"]')).click();
    expect(browser.getLocationAbsUrl()).toMatch('.*/wizard/contactdetails');
    element(by.css('h2')).getText().then(function (titleText) {
      expect(titleText).toBe('Contact details');
    });
    element(by.model('ctrl.appointment.fullname')).sendKeys('Bart Simpson');
    element(by.model('ctrl.appointment.email')).sendKeys('bartyman@gmail.com');


    // go to next step
    element(by.css('a[href*="#\/wizard\/confirmation"]')).click();
    expect(browser.getLocationAbsUrl()).toMatch('.*/wizard/confirmation');
    element(by.css('h2')).getText().then(function (titleText) {
      expect(titleText).toBe('Appointment');
    });

    element(by.binding('ctrl.appointment.product.label')).getText().then(function (text) {
      expect(text).toContain('Schnitt Damen');
    });
    element(by.binding('ctrl.appointment.date')).getText().then(function (text) {
      expect(text).toBe('2015-12-22');
    });
    element(by.binding('ctrl.appointment.time')).getText().then(function (text) {
      expect(text).toBe('16.15');
    });
    element(by.binding('ctrl.appointment.fullname')).getText().then(function (text) {
      browser.debugger();
      expect(text).toBe('Bart Simpson');
    });
    element(by.binding('ctrl.appointment.email')).getText().then(function (text) {
      expect(text).toBe('bartyman@gmail.com');
    });

  });


});
