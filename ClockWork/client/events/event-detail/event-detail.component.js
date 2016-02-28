/*
    Author: Cullin Lam
    Created on 2/24/16

    2.24.16 C Lam
        -Added reactive Countdown timer
 */

angular
    .module('ClockWork').controller('EventDetailCtrl', function ($scope,$reactive,$stateParams,myUtilities) {
        // attach scope to this object
        $reactive(this).attach($scope);

        var event_id = $stateParams.eventId;
        //hardcode user's name until we get the User collections up
        this.name = "ClockWork Master";
        this.event = Events.findOne({'_id':event_id});
        // convert milliseconds to seconds
        //var start_time = Math.floor((this.event.time_expire - new Date().getTime())/1000);
        //console.log(start_time);
        //// initialize reactive countdown object with start time
        //var countdown = new ReactiveCountdown(start_time,{steps:1});
        //// start countdown
        //countdown.start();
        //// need to apply a filter to get H:M:S
        //this.helpers({time_count: function(){return countdown.get();}});

        // set if we should display number of spots remaining i.e if 10+ we shouldnt
        if (typeof(this.event.cap) == 'string'){
            this.hide = true;
        }
        else {
            this.hide = false;
        }
    });

