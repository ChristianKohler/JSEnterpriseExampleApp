(function () {
  'use strict';

  var States = {
    PRODUCT: 'wizard.product',
    CONTACTDETAILS: 'wizard.contactdetails',
    DATE: 'wizard.date',
    CONFIRMATION: 'wizard.confirmation'
  };

  angular.module('JSEnterpriseWorkshopApp', ['ui.router'])
    .constant('States', States)
    .config(moduleConfig)
    .factory('AppointmentService', AppointmentService)
    .factory('StateValidityService', StateValidityService)
    .controller('WizardCtrl', WizardCtrl);


  function moduleConfig($stateProvider, $urlRouterProvider, States) {
    $stateProvider
      .state('wizard', {
        abstract: true,
        url: '/wizard',
        templateUrl: 'templates/wizard.html',
        controller: 'WizardCtrl as ctrl'
      })
      .state(States.PRODUCT, {
        url: '/product',
        templateUrl: 'templates/wizard-product.html'
      })
      .state(States.DATE, {
        url: '/date',
        templateUrl: 'templates/wizard-date.html'
      })
      .state(States.CONTACTDETAILS, {
        url: '/contactdetails',
        templateUrl: 'templates/wizard-contactdetails.html'
      })
      .state(States.CONFIRMATION, {
        url: '/confirmation',
        templateUrl: 'templates/wizard-confirmation.html'
      });

    $urlRouterProvider.otherwise('/wizard/product');
  }

  function WizardCtrl($scope, AppointmentService, StateValidityService) {

    var vm = this;
    vm.appointment = {};
    vm.products = AppointmentService.getProducts();
    vm.getProposalForDate = AppointmentService.getProposalForDate;
    vm.canSwitchToState = canSwitchToState;

    function canSwitchToState(state) {
      return StateValidityService.isValidStateTransition(state, vm.appointment);
    }

    $scope.$on('$stateChangeStart', function (event, toState) {
      if (!StateValidityService.isValidStateTransition(toState.name, vm.appointment)) {
        event.preventDefault();
      }
    });
  }

  /**
   *
   * @returns {{isValidStateTransition: isValidStateTransition}}
   * @constructor
   */
  function StateValidityService(States) {

    return {
      isValidStateTransition: isValidStateTransition
    };

    function isValidStateTransition(stateName, appointment) {
      switch (stateName) {
        case States.PRODUCT :
          return true;
        case States.DATE :
          return !!appointment.product;
        case States.CONTACTDETAILS :
          return !!appointment.date && !!appointment.time;
        case States.CONFIRMATION :
          return !!appointment.date && !!appointment.time && !!appointment.fullname && !!appointment.email;
      }
      return false;
    }

  }

  function AppointmentService() {

    return {
      getProducts: getProducts,
      getProposalForDate: getProposalForDate
    };

    function getProducts() {
      return [
        {'id': 'herren', 'label': 'Schnitt Herren (45.00 CHF)'},
        {'id': 'damen', 'label': 'Schnitt Damen (60.00 CHF)'}
      ];
    }

    function getProposalForDate() {
      return ['15.15', '16.00', '16.15', '17.45'];
    }

  }

})();
