xdescribe("MyApp", function() {

  var ApiService,
      $log;

  beforeEach(function () {
    module('MyApp');

    inject(function ($controller) {
      ApiService = $controller("MainController", { $scope: scope });
      // $log = _$log_;
    })
  });

  describe("suite", function() {
    it ("should pass", function() {
      expect(true).toEqual(true);
    });

    it ("should return 0", function() {
      expect(ApiService.syncMethod()).toEqual(true);
    });
  });
});
