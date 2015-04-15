angular.module('petFinder',
    [
      'ionic',
      'ngCordova',
      'pascalprecht.translate',
      'petFinder.controllers',
      'petFinder.services'
    ]
)
    .run(function ($ionicPlatform) {
      $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.styleDefault();
        }
        Parse.initialize("OFhtB4g2AmhOhCpp0D4jphsKxxainEgNjReARulV", "RLgDuYDz0Jj7EmIl9KCh62phAFxj3BTLjli6l931");
      });
    })

    .config(['$stateProvider', '$ionicConfigProvider', '$urlRouterProvider', '$translateProvider',
      function ($stateProvider, $ionicConfigProvider, $urlRouterProvider, $translateProvider) {

        $ionicConfigProvider.tabs.position('top');

        // registers translation table with language key 'en'
        $translateProvider.translations('en', translationsEN);

        // registers translation table with language key 'es'
        $translateProvider.translations('es', translationsES);

        // try to find out preferred language by yourself
        $translateProvider.determinePreferredLanguage(function () {
          var preferredLangKey = 'en',
              language = navigator.language;

          if(language.indexOf('es') > -1) {
            preferredLangKey = 'es';
          } else if(language.indexOf('en') > -1) {
            preferredLangKey = 'en';
          }

          return preferredLangKey;
        });

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

          // setup an abstract state for the tabs directive
            .state('tab', {
              url: "/tab",
              abstract: true,
              templateUrl: "templates/tabs.html"
            })

            .state('tab.map', {
              url: '/map',
              views: {
                'tab-map': {
                  templateUrl: 'templates/tab-map.html',
                  controller: 'MapCtrl'
                }
              }
            })

            .state('tab.lost', {
              url: '/lost',
              views: {
                'tab-lost': {
                  templateUrl: 'templates/tab-lost.html',
                  controller: 'LostCtrl'
                }
              }
            })

            .state('tab.lostDetail', {
              url: '/lost/detail/{lostPetId}',
              views: {
                'tab-lost': {
                  templateUrl: 'templates/tab-lost-detail.html',
                  controller: 'LostDetailCtrl'
                }
              }
            })

            .state('tab.lost-form', {
              url: '/lost/lost-form',
              views: {
                'tab-lost': {
                  templateUrl: 'templates/lost-form.html',
                  controller: 'LostFormCtrl'
                }
              }
            })

            .state('tab.found', {
              url: '/found',
              views: {
                'tab-found': {
                  templateUrl: 'templates/tab-found.html',
                  controller: 'FoundCtrl'
                }
              }
            })

            .state('tab.found-form', {
              url: '/found/found-form/',
              views: {
                'tab-found': {
                  templateUrl: 'templates/found-form.html',
                  controller: 'FoundFormCtrl'
                }
              }
            })

            .state('tab.adoption', {
              url: '/adoption',
              views: {
                'tab-adoption': {
                  templateUrl: 'templates/tab-adoption.html',
                  controller: 'AdoptionCtrl'
                }
              }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/map');

    }]);
