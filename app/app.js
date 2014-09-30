(function () {
  'use strict';

  angular.module('JSEnterpriseWorkshopApp', ['ui.router'])
    .config(moduleConfig)
    .factory('AppointmentService', AppointmentService)
    .factory('StateValidityService', StateValidityService)
    .controller('WizardCtrl', WizardCtrl);

  function moduleConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('wizard', {
        abstract: true,
        url: '/wizard',
        templateUrl: 'templates/wizard.html',
        controller: 'WizardCtrl as ctrl'
      })
      .state('wizard.product', {
        url: '/product',
        templateUrl: 'templates/wizard-product.html'
      })
      .state('wizard.date', {
        url: '/date',
        templateUrl: 'templates/wizard-date.html'
      })
      .state('wizard.contactdetails', {
        url: '/contactdetails',
        templateUrl: 'templates/wizard-contactdetails.html'
      })
      .state('wizard.confirmation', {
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
  function StateValidityService() {

    return {
      isValidStateTransition: isValidStateTransition
    };

    function isValidStateTransition(stateName, appointment) {
      switch (stateName) {
        case 'wizard.product':
          return true;
        case 'wizard.date':
          return !!appointment.product;
        case 'wizard.contactdetails':
          return !!appointment.date && !!appointment.time;
        case 'wizard.confirmation':
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
