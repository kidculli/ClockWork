/**
 * Created by Cullin on 3/19/16.
 *
 * file: notifCtrl.js
 *
 * This file implements notifications view controller
 */

angular.module("ClockWork").controller('notifCtrl',function($scope,$reactive) {
    //set reactive context
    $reactive(this).attach($scope);
    console.log("Running notifCtrl");
    var curr_user_id = Meteor.user().username;
    console.log(curr_user_id);
    //helper to filter Notifications for current user
    this.helpers({
        notifs: function () {
            return Notifications.find({to: curr_user_id});
        }
    });

    // function to trash Notification
    this.trash = function (notif_id) {
        //do a method call or do it straight from client
        Meteor.call("Update", "Notifications", {
            query: {_id: notif_id},
            update: {$pull: {to: Meteor.user().username}},
            options: {upsert: false}
        });
    };
});