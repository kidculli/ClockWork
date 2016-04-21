/**
 * Created by Cullin on 4/2/16.
 *
 * file: gotoProfile.js
 *
 * This file implements an angular controller that moves current state to profile with user's userid
 */

angular.module('ClockWork').controller('gotoProfileCtrl',function($scope,$state,$location){
    $scope.username = Meteor.user().username;
    $scope.goToProfile = function(){
        $state.go('tabs.profile',{userId:Meteor.user().username});
    }
});