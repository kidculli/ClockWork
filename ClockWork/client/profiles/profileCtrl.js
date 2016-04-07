/**
 * Created by Cullin on 3/30/16.
 * file: profileCtrl.js
 * This file controls profile view
 */

angular.module("ClockWork").controller('profileCtrl',function($scope,$reactive,$stateParams){
    // attach reactive context to this object
    $reactive(this).attach($scope);

    console.log($stateParams);
    var user_id = $stateParams.userId;
    console.log(user_id);
    // get user info
    this.helpers(
        {
            profile_info:function() {
                return Users.findOne({username:user_id})
            },

            attending:function(){
                console.log('running attending helper');
                return Events.findOne({attendees:user_id,expired:false});
            },

            attended:function(){
                return Events.find({attendees:user_id,expired:true})
            }
            //hide_attending:function(){
            //    var obj = Events.findOne({attendees:user_id, expired:false});
            //    if (obj.length == 0) {
            //        return true;
            //    }
            //    else {
            //        return false;
            //    }
            //    //if (len > 0 ){
            //    //    return false;
            //    //}
            //    //else {
            //    //    return true;
            //    //}
            //}
        });
    // test
    this.bio = "I like to Dance and Code and stuff. On this to chill."
});
