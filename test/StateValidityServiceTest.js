describe('StateValidityService', function () {

  var StateValidityService, States;

  beforeEach(angular.mock.module('JSEnterpriseWorkshopApp'));

  beforeEach(inject(function (_StateValidityService_, _States_) {
    StateValidityService = _StateValidityService_;
    States = _States_;
  }));

  it('must be defined', function () {
    expect(StateValidityService).toBeDefined();
  });

  describe('#isValidStateTransition()', function () {

    it('should return true when switching to product', function () {
      expect(StateValidityService.isValidStateTransition(States.PRODUCT, {})).toBe(true);
    });
    it('should return false when switching to date, if appointment has no product', function () {
      expect(StateValidityService.isValidStateTransition(States.CONTACTDETAILS, {})).toBe(false);
    });

    it('should return false when switching to contactdetails, if appointment has no date', function () {
      expect(StateValidityService.isValidStateTransition(States.CONTACTDETAILS, {
      })).toBe(false);
    });

    it('should return false when switching to contactdetails, if appointment has no time', function () {
      expect(StateValidityService.isValidStateTransition(States.CONTACTDETAILS, {
        date: 'someDate'
      })).toBe(false);
    });

    it('should return true when switching to contactdetails, if date and time is set', function () {
      expect(StateValidityService.isValidStateTransition(States.CONTACTDETAILS, {
        date: 'someDate',
        time: 'someTime'
      })).toBe(true);
    });

    it('should return false when switching to confirmation, if appointment is missing date', function () {
      expect(StateValidityService.isValidStateTransition(States.CONFIRMATION, {
        time: 'time'
      })).toBe(false);
    });

    it('should return false when switching to confirmation, if appointment is missing time', function () {
      expect(StateValidityService.isValidStateTransition(States.CONFIRMATION, {
        date: 'date'
      })).toBe(false);
    });

    it('should return false when switching to confirmation, if appointment is missing fullname', function () {
      expect(StateValidityService.isValidStateTransition(States.CONFIRMATION, {
        date: 'date',
        time: 'time'
      })).toBe(false);
    });

    it('should return false when switching to confirmation, if appointment is missing email', function () {
      expect(StateValidityService.isValidStateTransition(States.CONFIRMATION, {
        date: 'date',
        time: 'time',
        fullname: 'someFullname'
      })).toBe(false);
    });

    it('should return true when switching to confirmation, if appointment has all needed attributes set', function () {
      expect(StateValidityService.isValidStateTransition(States.CONFIRMATION, {
        date: 'date',
        time: 'time',
        fullname: 'someFullname',
        email: 'email'
      })).toBe(true);
    });

  });

});
