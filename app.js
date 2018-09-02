(function () {
    'use strict';

    var helpApp = angular.module('app',
         [
             'ui.router',
             'ui.bootstrap',
             'ngMessages',
             'pascalprecht.translate',
             'vs-repeat'
         ]);

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Config
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    var configFunction = function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider, $provide, $urlMatcherFactoryProvider) {
        $urlMatcherFactoryProvider.caseInsensitive(true);
        $urlRouterProvider.otherwise("/");
               
        $provide.decorator('$exceptionHandler', ['$delegate', function ($delegate) {
            return function (exception, cause) {
                $delegate(exception, cause);

                var data = {
                    type: 'angular',
                    url: window.location.hash,
                    localtime: Date.now(),
                    message: "",
                    name: "",
                    stack: ""
                };
                if (cause) { data.cause = cause; }
                if (exception) {
                    if (exception.message) { data.message = exception.message; }
                    if (exception.name) { data.name = exception.name; }
                    if (exception.stack) { data.stack = exception.stack; }
                }

                console.log('exception', data);
                if (data.message == "Unable to get property 'focus' of undefined or null reference") {
                    // just skip this annoying angular IE bug...
                    return;
                }
                else {
                    // window.alert('Error: ' + data.message + '\r\n' + data.stack);
                }
            };
        }]);
    }
    configFunction.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider', '$locationProvider', '$provide', '$urlMatcherFactoryProvider'];
    helpApp.config(configFunction);

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Run
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    var runFunction = function ($rootScope, $state, $stateParams, $modalStack) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    };
    runFunction.$inject = ['$rootScope', '$state', '$stateParams', '$modalStack'];
    helpApp.run(runFunction);
})();





