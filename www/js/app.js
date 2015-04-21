angular.module('petFinder',
    [
      'ionic',
      'ngCordova',
      'ngCookies',
      'pascalprecht.translate',
      'petFinder.controllers',
      'petFinder.services',
      'petFinder.directives'
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

        $translateProvider.useLocalStorage();

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
            .state('app', {
              url: "/app",
              abstract: true,
              templateUrl: "templates/side-menu.html"
            })

            .state('app.map', {
              url: '/map',
              views: {
                'menuContent': {
                  templateUrl: 'templates/map.html',
                  controller: 'MapCtrl'
                }
              }
            })

            .state('app.lost', {
              url: '/lost',
              views: {
                'menuContent': {
                  templateUrl: 'templates/lost.html',
                  controller: 'LostCtrl'
                }
              }
            })

            .state('app.lostDetail', {
              url: '/lost/detail/{lostPetId}',
              views: {
                'menuContent': {
                  templateUrl: 'templates/lost-detail.html',
                  controller: 'LostDetailCtrl'
                }
              }
            })

            .state('app.lost-form', {
              url: '/lost/lost-form',
              views: {
                'menuContent': {
                  templateUrl: 'templates/lost-form.html',
                  controller: 'LostFormCtrl'
                }
              }
            })

            .state('app.found', {
              url: '/found',
              views: {
                'menuContent': {
                  templateUrl: 'templates/found.html',
                  controller: 'FoundCtrl'
                }
              }
            })

            .state('app.found-form', {
              url: '/found/found-form/',
              views: {
                'menuContent': {
                  templateUrl: 'templates/found-form.html',
                  controller: 'FoundFormCtrl'
                }
              }
            })

            .state('app.adoption', {
              url: '/adoption',
              views: {
                'menuContent': {
                  templateUrl: 'templates/adoption.html',
                  controller: 'AdoptionCtrl'
                }
              }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/map');

    }]);
