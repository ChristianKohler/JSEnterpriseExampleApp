(function () {
  'use strict';

  angular.module('JSEnterpriseWorkshopApp', ['ui.router'])

    .config(function ($stateProvider, $urlRouterProvider) {
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
    })

    .controller('WizardCtrl', function (appointmentService) {
      var vm = this;
      vm.appointment = {};
      vm.products = appointmentService.getProducts();
      vm.getProposalForDate = appointmentService.getProposalForDate;
    })

    .factory('appointmentService', function () {
      function getProducts() {
        return [
          {'id': 'herren', 'label': 'Schnitt Herren (45.00 CHF)'},
          {'id': 'damen', 'label': 'Schnitt Damen (60.00 CHF)'}
        ];
      }

      function getProposalForDate() {
        return ['15.15', '16.00', '16.15', '17.45'];
      }

      return {
        getProducts: getProducts,
        getProposalForDate: getProposalForDate
      };
    });
})();
