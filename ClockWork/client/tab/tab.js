/**
 * Created by Son on 3/5/2016.
 * Description: This controller toggle the side menu on the app when touched.
 *
 */
angular
    .module('ClockWork').controller('MainCtrl', function($scope, $ionicSideMenuDelegate) {
        $scope.toggleLeft = function() {
            $ionicSideMenuDelegate.toggleLeft();
    };
})