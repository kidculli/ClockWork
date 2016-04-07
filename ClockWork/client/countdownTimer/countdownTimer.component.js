/**
 * Created by Cullin on 2/24/16.
 *
 * file: countdownTimer.component.js
 *
 * This file specifies a component for countdown timer utilizes parent controller scope to
 * determine countdown time constructor param
 *
 * -source https://gist.github.com/CMCDragonkai/6282750
 *
 *  2/27/2016
 *
 *      - got countdown to work using parent controller access
 *
 *  3/19/16
 *      - set inline style text to be black
 *
 */

angular.module("ClockWork").directive("countdownTimer",function(){
    return {
        restrict:"E",
        template: '<h3 style="color: #111111">{{countdownTimer.time_count| secondsToDateTime | date:"HH:mm:ss"}}</h3>',
        controllerAs:"countdownTimer",
        controller: function($scope, $element ,$reactive){
            $reactive(this).attach($scope);

            //List of possible parent controller names for this directive *controllerAs name
            const ctrl_list = ['profile','event','EventDetail'];
            // Iterate through array and get the time_expire value from parent ctrl
            try {
                console.log($scope.$parent.profile.attending.time_expire);
                var event_expire = Math.floor(($scope.$parent.profile.attending.time_expire - new Date().getTime())/1000);
            }
            catch(e){
                console.log(e);
            }
            console.log($scope.$parent.hasOwnProperty('profile'));
            if ($scope.$parent.hasOwnProperty('event')) {
                var event_expire = Math.floor(($scope.$parent.event.time_expire - new Date().getTime())/1000);
            }
            if ($scope.$parent.hasOwnProperty('EventDetail')) {
                var event_expire = Math.floor(($scope.$parent.EventDetail.event.time_expire - new Date().getTime())/1000);
            }
            //if($scope.$parent.hasOwnProperty('profile')){
            //    console.log("In profile ctrl");
            //    var event_expire = Math.floor(($scope.$parent.profile.attending.time_expire - new Date().getTime())/1000);
            //}

            //for (var i = 0; i< ctrl_list.length ; i++) {
            //    if ($scope.$parent.hasOwnProperty(ctrl_list[i])){
            //        console.log(ctrl_list[i]);
            //        if(ctrl_list[i] == 'event') {
            //            // get difference between current time and event time in seconds
            //            var event_expire = Math.floor(($scope.$parent.event.time_expire - new Date().getTime())/1000);
            //            break;
            //        }
            //        else if(ctrl_list[i] == 'EventDetail') {
            //            var event_expire = Math.floor(($scope.$parent.EventDetail.event.time_expire - new Date().getTime())/1000);
            //            break;
            //        }
            //        else if(ctrl_list[i] == 'profile') {
            //            var event_expire = Math.floor(($scope.$parent.profile.attending.time_expire - new Date().getTime())/1000);
            //            break;
            //        }
            //        else {
            //            console.log("Parent ctrl not found");
            //        }
            //    }
            //}
            //if (typeof event_expire == 'undefined') {
            //    console.log($scope.$parent.profile.attending.time_expire);
            //}
            // create new reactive Countdown //uses flyandi:reactive-countdown meteor package
            var countdown = new ReactiveCountdown(event_expire,{steps:1});
            //start the timer
            countdown.start();
            // reactively get the current timer time
            this.helpers({time_count: function() {
                return countdown.get();
            }});
        }
    };
});
