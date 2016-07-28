app.directive("paraBack", ['$window', function ($window) {
  return function(scope, element, attrs) {
    element.css("background-image", "url("+attrs.paraBack+")"); // Apply the background image with CSS
    element.css("background-attachment", "fixed"); // Disable background scrolling

    var max = Infinity;

    var image = new Image(); // Create a JavaScript image so that the code below can be run when the background is loaded
    image.src = attrs.paraBack;
    image.onload = function () {
      max = image.height - window.innerHeight; // Stop scrolling after the bottom of the picture is reached
      var xOffset = -(image.width/2-window.innerWidth/2);
      element.css("background-position-x", xOffset+'px'); // Horizontally align the background
    }

    var scrollHandler = function () {
      var offset = Math.floor(this.pageYOffset*0.1); // Set background to scroll at 10% of scrolling speed
      if (offset<max) {
        element.css('background-position-y', '-'+offset+'px'); // If not the bottom of the image is reached, move the background (scroll)
      }
    };

    angular.element($window).on('scroll', scrollHandler); // Set the defined scrollHandler function to be ran when user scroll

    scope.$on('$destroy', function () {
      angular.element($window).off('scroll', scrollHandler); // Unbind the function when the scope is destroyed
    });
  };
}]);