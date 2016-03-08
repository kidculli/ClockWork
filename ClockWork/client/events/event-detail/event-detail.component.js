/*
    Author: Cullin Lam
    Created on 2/24/16

    2.24.16 C Lam
        -Added reactive Countdown timer
        - Deleted countdown timer logic moved to directive
 */

angular
    .module('ClockWork').controller('EventDetailCtrl', function ($scope,$reactive,$stateParams,myUtilities) {
        // attach scope to this object
        $reactive(this).attach($scope);

        var event_id = $stateParams.eventId;
        console.log("LOOOOOOOOOOOOOOOOOOOOOOOOOK");
        console.log(event_id);
        //hardcode user's name until we get the User collections up
        this.name = "ClockWork Master";
        this.event = Events.findOne({'_id':event_id});

        // set if we should display number of spots remaining i.e if 10+ we shouldnt
        if (typeof(this.event.cap) == 'string'){
            this.hide = true;
        }
        else {
            this.hide = false;
        }
    });

