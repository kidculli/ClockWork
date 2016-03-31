/**
 * Created by Cullin on 3/30/16.
 * file: profileCtrl.js
 * This file controls profile view
 */

angular.module("ClockWork").controller('profileCtrl',function($scope,$reactive,$stateParams){
    // attach reactive context to this object
    $reactive(this).attach($scope);

    var user_id = $stateParams.userId
    // get user info
    this.helpers({profile:function(){
        Users.findOne({_id:user_id})
    }});
    // test
    this.bio = "Just a young nigga who wanna chill with the bois. Roll up the dubies naww mean."
});
