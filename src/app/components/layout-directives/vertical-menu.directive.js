MyApp.directive("verticalMenu", function($document, $window) {
  return {
    templateUrl: "templates/layout-directives/vertical-menu.html",
    link: function(scope, element, attrs) {
      // var navbar = document.getElementById("navbar");
      // var menu = element.find(".fixed-pos")[0];

      // scope.menuToggle = [
      //   true,
      //   true,
      //   true,
      //   true,
      // ];

      // scope.toggleMenu = function(index) {
      //   scope.menuToggle[index] = !scope.menuToggle[index];
      // }

      // var resizeMenu = function() {
      //   var top = navbar.clientHeight - $document.scrollTop();
      //   if (top < 0) {
      //     menu.style.top = 0;
      //   } else {
      //     menu.style.top = top + 3 + "px";
      //   }
      // }

      // $window.addEventListener("resize", resizeMenu, true);
      // $window.addEventListener("scroll", resizeMenu, true);

      // scope.$on("$destroy", function() {
      //   $window.removeEventListener("resize", resizeMenu, true);
      //   $window.removeEventListener("scroll", resizeMenu, true);
      // });

      // resizeMenu();
    }
  };
});
