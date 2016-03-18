/*
 Author: Cullin Lam
 Created on 2/24/16

 2.24.16 C Lam
 -Added reactive Countdown timer
 - Deleted countdown timer logic moved to directive

 3.17.16 C Lam
    - made view reactive using helper
    - got attend to work

 3/18/16 C Lam
    - added leave function call
 */

angular
    .module('ClockWork').controller('EventDetailCtrl', function ($scope, $reactive, $stateParams) {
        // attach scope to this object
        $reactive(this).attach($scope);

        var event_id = $stateParams.eventId;
        console.log(event_id);
        this.helpers(
            {
                event:function() {
                    return Events.findOne({_id:event_id})
                }
            }
        );

        // update scope vars whenever database changes
        this.autorun(function(){
            if(this.event.owner == Meteor.user().username) {
                this.hide_attend = true;
                this.hide_leave = true;
                return;
            }
            // if user is attending hide attend button, show leave button
            if (this.event.attendees.indexOf(Meteor.user().username) > -1) {
                this.hide_attend = true;
                this.hide_leave = false;
            }
            // show attend button, hide leave button
            else {
                this.hide_attend = false;
                this.hide_leave = true;
            }
            console.log("autorun init");
            console.log(this.hide_attend);
            console.log(this.hide_leave);
        });
        console.log(this.event);
        // set hide_leave to be true on init
        //this.hide_leave = true;
        //// if user is owner hide attend button
        //if(event.owner == Meteor.user().username) {
        //    this.hide_attend = true;
        //}
        //// if user is attending hide attend button
        //if (this.event.attendees.indexOf(Meteor.user().username) > -1) {
        //    this.hide_attend = true;
        //}
        ////  do not hide leave button
        //else {
        //    this.hide_leave = false;
        //}
        //set if we should display number of spots remaining i.e if 10+ we shouldn't
        if (typeof(this.event.cap) == 'string') {
            this.hide = true;
        }
        else {
            this.hide = false;
        }

        ////helper function to execute query, private
        //function update_full() {
        //    //find the event, make sure its not yet full * concurrency protection
        //    //if this person will fill the attendees to cap set full
        //    var full_result = Events.update({_id: this.event._id, full: false, fill: {$eq: this.event.cap - 1}},
        //        {
        //            //update attendees array
        //            $set: {attendees: this.event.attendees, full: true},
        //            // increment fill
        //            $inc: {fill: 1}
        //        },
        //        // no insert
        //        {upsert: false});
        //    return full_result;
        //}
        //
        ////helper function to execute not full query, private
        //function update() {
        //    // do the not full query
        //    console.log(this.event);
        //    var not_full_result = Events.update({_id: this.event._id, full: false},
        //        {
        //            //update attendees array
        //            $set: {attendees: this.event.attendees},
        //            // increment fill
        //            $inc: {fill: 1}
        //        },
        //        // no insert
        //        {upsert: false});
        //    console.log(not_full_result);
        //    return not_full_result;
        //}

        //Events.update({_id: "F7zsxh2Mmdg46zo7S", full: false}, {$inc: {fill: 1}, $set: {attendees: ["cullin"]}});

        //function test_call(error,result){
        //    console.log(result);
        //}
        //
        //function call_back2(error,result){
        //    console.log("In call back 2");
        //    if (result.reason == "unmatched") {
        //        console.log("Update failed the event is full " + result.full_result);
        //    }
        //    else if (result.success) {
        //        console.log(Meteor.user().username + "is now attending" + this.event.title);
        //    }
        //    else {
        //        console.log("Error occurred while updating collection: " + result.full_result + error);
        //    }
        //}
        //
        //function call_back(error,result){
        //    console.log("In call back 1");
        //    console.log(error);
        //    console.log(result);
        //    if (result.reason == "unmatched") {
        //        Meteor.call("Update", "Events", {
        //            query: {_id: event_id, full: false},
        //            update: {
        //                $push: {attendees: Meteor.user().username},
        //                $inc: {fill: 1}
        //            },
        //            options: {
        //                upsert: false
        //            }
        //
        //        }, true,call_back2);
        //    }
        //
        //    else if (result.success) {
        //        console.log(Meteor.user().username + "is now attending" + this.event.title);
        //    }
        //    else {
        //        console.log("Error occurred while updating collection: " + result.full_result + error);
        //    }
        //};
        //Meteor.call("Update","Events",{query:{_id:"oZW8TJNqxKDTmuerp",full:false},update:{$set:{attendees:['Drake','Future','Weezy']},$inc:{fill:1}},options:{upsert:false}},false);
        this.attend = function () {
            if (Meteor.user()) {
                // check if user is already attending
                if (this.event.attendees.indexOf(Meteor.user().username) == -1)
                {
                    // set hiding
                    this.hide_attend = true;
                    this.hide_leave = false;
                    // Might need to implement stub call on client
                    Meteor.call("Attend",this.event,Meteor.user().username);

                }
                else {
                    console.log(Meteor.user().username + "already attending");
                }
            }
            else {
                console.log("User not logged in ");
            }

        }

        this.leave = function () {
            if (Meteor.user()) {
                // check if user is already attending
                if (this.event.attendees.indexOf(Meteor.user().username) > -1)
                {
                    // set hiding
                    this.hide_attend = false;
                    this.hide_leave = true;
                    // Might need to implement stub call on client
                    Meteor.call("Leave",this.event,Meteor.user().username);

                }
                else {
                    console.log(Meteor.user().username + "already not attending");
                }
            }
            else {
                console.log("User not logged in ");
            }
        }
    });

