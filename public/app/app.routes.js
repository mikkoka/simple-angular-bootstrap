var MyApp = angular.module("MyApp", ["ui.router"]);

MyApp.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/intro");

  $stateProvider
    .state("main", {
      url: "/",
      templateUrl: "app/components/main/main.html",
      controller: "MainController",
      controllerAs: "main"
    })
    .state("main.intro", {
      url: "intro",
      templateUrl: "app/components/intro/intro.html",
    })
    .state("main.test", {
      url: "test",
      templateUrl: "app/components/test/test.html",
    })
    .state("stuff", {
      url: "/stuff",
      templateUrl: "app/components/stuff/stuff.html",
      controller: "StuffController",
      controllerAs: "stuffCtrl"
    })
});
