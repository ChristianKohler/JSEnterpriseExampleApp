describe('StateValidityService', function () {


  var STATES = {
    product: 'wizard.product',
    contactdetails: 'wizard.contactdetails',
    date: 'wizard.date',
    confirmation: 'wizard.confirmation'
  };

  var StateValidityService;

  beforeEach(angular.mock.module('JSEnterpriseWorkshopApp'));

  beforeEach(inject(function (_StateValidityService_) {
    StateValidityService = _StateValidityService_;
  }));

  it('must be defined', function () {
    expect(StateValidityService).toBeDefined();
  });

  describe('#isValidStateTransition()', function () {

    it('should return true when switching to product', function () {
      expect(StateValidityService.isValidStateTransition(STATES.product, {})).toBe(true);
    });
    it('should return false when switching to date, if appointment has no product', function () {
      expect(StateValidityService.isValidStateTransition(STATES.contactdetails, {})).toBe(false);
    });

    it('should return false when switching to contactdetails, if appointment has no date', function () {
      expect(StateValidityService.isValidStateTransition(STATES.contactdetails, {
      })).toBe(false);
    });

    it('should return false when switching to contactdetails, if appointment has no time', function () {
      expect(StateValidityService.isValidStateTransition(STATES.contactdetails, {
        date: 'someDate'
      })).toBe(false);
    });

    it('should return true when switching to contactdetails, if date and time is set', function () {
      expect(StateValidityService.isValidStateTransition(STATES.contactdetails, {
        date: 'someDate',
        time: 'someTime'
      })).toBe(true);
    });

    it('should return false when switching to confirmation, if appointment is missing date', function () {
      expect(StateValidityService.isValidStateTransition(STATES.confirmation, {
        time: 'time'
      })).toBe(false);
    });

    it('should return false when switching to confirmation, if appointment is missing time', function () {
      expect(StateValidityService.isValidStateTransition(STATES.confirmation, {
        date: 'date'
      })).toBe(false);
    });

    it('should return false when switching to confirmation, if appointment is missing fullname', function () {
      expect(StateValidityService.isValidStateTransition(STATES.confirmation, {
        date: 'date',
        time: 'time'
      })).toBe(false);
    });

    it('should return false when switching to confirmation, if appointment is missing email', function () {
      expect(StateValidityService.isValidStateTransition(STATES.confirmation, {
        date: 'date',
        time: 'time',
        fullname: 'someFullname'
      })).toBe(false);
    });

    it('should return true when switching to confirmation, if appointment has all needed attributes set', function () {
      expect(StateValidityService.isValidStateTransition(STATES.confirmation, {
        date: 'date',
        time: 'time',
        fullname: 'someFullname',
        email: 'email'
      })).toBe(true);
    });

  });

});
