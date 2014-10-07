describe('StateValidityService', function () {

  var StateValidityService;

  beforeEach(angular.mock.module('JSEnterpriseWorkshopApp'));

  beforeEach(inject(function (_StateValidityService_) {
    StateValidityService = _StateValidityService_;
  }));

  it('must be defined', function () {
    expect(StateValidityService).toBeDefined();
  });

  describe('on confirmation page', function () {
    var appointment;
    beforeEach(function () {
      appointment = {
        product: 'product',
        date: 'date',
        time: 'time',
        fullname: 'fullname',
        email: 'email@email.com',
        confirmed: true
      };
    });

    it('is not allowed to change the product', function () {
      expect(StateValidityService.isValidStateTransition('wizard.product', appointment)).toBe(false);
    });

    it('is not allowed to change the contactdetails', function () {
      expect(StateValidityService.isValidStateTransition('wizard.contactdetails', appointment)).toBe(false);
    });

    it('is not allowed to change a data', function () {
      expect(StateValidityService.isValidStateTransition('wizard.date', appointment)).toBe(false);
    });
  });
});