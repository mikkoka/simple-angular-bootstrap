var MyApp = angular.module("MyApp", ["ui.router"]);

MyApp.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/intro");

  $stateProvider
    .state("main", {
      url: "/",
      templateUrl: "templates/main/main.html",
      controller: "MainController",
      controllerAs: "main"
    })
    .state("main.intro", {
      url: "intro",
      templateUrl: "templates/intro/intro.html",
    })
    .state("main.test", {
      url: "test",
      templateUrl: "templates/test/test.html",
    })
    .state("stuff", {
      url: "/stuff",
      templateUrl: "templates/stuff/stuff.html",
      controller: "StuffController",
      controllerAs: "stuffCtrl"
    })
});
