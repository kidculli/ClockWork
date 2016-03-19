/**
 * Created by Cullin on 3/19/16.
 *
 * file: logoutController.js
 *
 * This file is responsible for logging out of the application
 */

angular.module("ClockWork").controller("logoutCtrl",function($scope,$state){
    $scope.logout = function() {
        Meteor.logout();
        $state.go('signin');
    }
});