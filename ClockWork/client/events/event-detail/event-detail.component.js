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
        // attach reactive context to this object
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
                //hide both attend and leave if owner
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

        //set if we should display number of spots remaining i.e if 10+ we shouldn't
        if (typeof(this.event.cap) == 'string') {
            this.hide = true;
        }
        else {
            this.hide = false;
        }

        this.attend = function () {
            /*
                This function sets current logged in user to attending on the event
                Performs a call to server method "Attend"
             */
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
            /*
                This function removes current user from attending list on event
                calls server method "Leave" to do so
             */
            if (Meteor.user()) {
                // check if user is already attending
                if (this.event.attendees.indexOf(Meteor.user().username) > -1)
                {
                    // set hiding
                    this.hide_leave = true;
                    this.hide_attend = false;
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

