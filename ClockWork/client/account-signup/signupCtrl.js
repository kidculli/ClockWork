/**
 * Created by Cullin on 3/14/16.
 * file:signupCtrl.js
 *
 * controller for sign up view
 */

angular.module('ClockWork').controller('signupCtrl',function($scope,$reactive,$stateParams,$state){
    // attach scope to this object
    $reactive(this).attach($scope);
    // object to hold submit error status
    $scope.registerError = {email_err:false,username_err:false};
    this.register = function(user) {
        console.log(user);
       Accounts.createUser({
            username:user.username,
            email:user.email,
            password:user.password,
            profile:{firstname:user.firstname,lastname:user.lastname,bio:"Not yet Implemented!",img:"https://s-media-cache-ak0.pinimg.com/236x/b3/7e/04/b37e045f783e25193050d7e0cb81f495.jpg"}
           },
           function(result){
               console.log(result);
               //successful case
               if(typeof(result) === "undefined")
               {
                   console.log("Successfully registered new user");
                   Meteor.loginWithPassword(user.email,user.password);
                   //$state.go('tabs.event-feed',{},{inherit:true,notify:true,reload:false});
                   //navigating directly to event feed causes items in feed to disappear
                   //currently set the destination to the about tab until I can fix.
                   $state.go('tabs.about',{},{inherit:true,notify:true,reload:false});
               }
               //error case
               else{
                   console.log("failed to register account");
                   // reset var
                   $scope.registerError = {email_err:false,username_err:false};
                   console.log(result);
                   if(result.reason==="Email already exists.") {
                       $scope.registerError.email_err = true;
                   }
                   else{
                       $scope.registerError.username_err = true;
                   }
               }
           });

    };

    //// bool properties initialized as false but will be set to true if login failed
    //$scope.loginError = {username_err:false,pass_err:false};
    ////sign in function ,takes an object with a username and password property
    //$scope.signin = function(user){
    //    console.log(user);
    //    console.log(this);
    //    //Call Meteor API to login
    //    Meteor.loginWithPassword(user.username,user.password,function(result){
    //        console.log(result);
    //        //successful case
    //        if(typeof(result) === "undefined")
    //        {
    //            console.log("Successfully logged in");
    //            $state.go('tabs.event-feed',{},{inherit:true,notify:true,reload:false});
    //            //navigating directly to event feed causes items in feed to disappear
    //            //currently set the destination to the about tab until I can fix.
    //            $state.go('tabs.about',{},{inherit:true,notify:true,reload:false});
    //        }
    //        //error case
    //        else{
    //            console.log("failed to login");
    //            //reset error values
    //            $scope.loginError = {username_err:false,pass_err:false};
    //            if(result.reason==="User not found") {
    //                $scope.loginError.username_err = true;
    //            }
    //            if(result.reason==="Incorrect password") {
    //                $scope.loginError.pass_err = true;
    //            }
    //        }
    //    });
    //    console.log(Meteor.userId());
    //};

});
