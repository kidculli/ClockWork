/**
 * Created by Cullin on 3/13/16.
 * File: loginController.js
 *
 * This file controls the login view
 *
 */

angular.module('ClockWork').controller('loginCtrl',function($scope,$reactive,$stateParams,$state){
    // attach scope to this object
    $reactive(this).attach($scope);
    // bool properties initialized as false but will be set to true if login failed
    $scope.loginError = {username_err:false,pass_err:false};
    //sign in function ,takes an object with a username and password property
    $scope.signin = function(user){
        console.log(user);
        console.log(this);
        //Call Meteor API to login
        Meteor.loginWithPassword(user.username,user.password,function(result){
            console.log(result);
            //successful case
            if(typeof(result) === "undefined")
            {
                console.log("Successfully logged in");
                $state.go('tabs.event-feed',{},{inherit:true,notify:true,reload:false});
                //navigating directly to event feed causes items in feed to disappear
                //currently set the destination to the about tab until I can fix.
                $state.go('tabs.about',{},{inherit:true,notify:true,reload:false});
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
        console.log(Meteor.userId());
    };

});