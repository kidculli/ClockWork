/**
 * Created by Cullin on 3/13/16.
 * File: loginController.js
 *
 * This file controls the login view
 *
 * 3/19/16
 *  - Clear cache on login view enter
 *  - cleaned up console logs
 *
 */

angular.module('ClockWork').controller('loginCtrl',function($scope,$reactive,$stateParams,$state,$ionicHistory){
    //clear cache and history on logout
    //src- https://forum.ionicframework.com/t/ionic-beta14-how-to-clean-the-cache-for-a-specific-view/14277/6
    $scope.$on("$ionicView.enter", function(scopes, states){
        $ionicHistory.clearHistory();
        $ionicHistory.clearCache();
    });
    // attach reactive context to this object
    $reactive(this).attach($scope);
    // bool properties initialized as false but will be set to true if login failed
    $scope.loginError = {username_err:false,pass_err:false};
    //sign in function ,takes an object with a username and password property
    this.signin = function(user){
        //Call Meteor API to login
        Meteor.loginWithPassword(user.username,user.password,function(result){
            //successful case
            if(typeof(result) === "undefined")
            {
                console.log("Successfully logged in user: " + Meteor.userId());
                //$state.go('tabs.about',{},{inherit:true,notify:true,reload:false});
                $state.go('tabs.event-feed',{},{inherit:true,notify:true,reload:false});
                //navigating directly to event feed causes items in feed to disappear
                //currently set the destination to the about tab until I can fix.

            }
            //error case
            else{
                console.log("failed to login");
                //reset error values
                $scope.loginError = {username_err:false,pass_err:false};
                if(result.reason==="User not found") {
                    $scope.loginError.username_err = true;
                }
                if(result.reason==="Incorrect password") {
                    $scope.loginError.pass_err = true;
                }
            }
        });
    };

});