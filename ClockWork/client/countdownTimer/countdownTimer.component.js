/**
 * Created by Cullin on 2/24/16.
 *
 * file: countdownTimer.component.js
 *
 * This file specifies a component for countdown timer
 *
 * -source https://gist.github.com/CMCDragonkai/6282750
 *
 *  2/27/2016
 *
 *      - got countdown to work using parent controller access
 *
 */

angular.module("ClockWork").directive("countdownTimer",function(){
    return {
        restrict:"E",
        template: "<h3>{{countdownTimer.time_count| secondsToDateTime | date:'HH:mm:ss'}}</h3>",
        replace: true,
        controllerAs:"countdownTimer",
        controller: function($scope, $element ,$reactive){
            $reactive(this).attach($scope);
                //$element.text(attr.init);
                //attr.$observe('init', function(value){
                //    $element.text(attr.init);
                //});
            //initialize scope var null
            //$scope.countdown = 'undefined';
            //set watch on init, wait for it to be initalized then start reactive countdown clock
            //$scope.$watch('init', function () {
            //    console.log($scope.init);
            //    var start_time = Math.floor(($scope.init - new Date().getTime())/1000);
            //    //// initialize reactive countdown object with start time
            //    $scope.countdown = new ReactiveCountdown(start_time,{steps:1});
            //    // start the timer
            //    $scope.countdown.start();
            //    console.log($scope.countdown.get());
            //
            //});

            //test code
            const ctrl_list = ['event','EventDetail'];
            for (var i = 0; i< ctrl_list.length ; i++) {
                if ($scope.$parent.hasOwnProperty(ctrl_list[i])){
                    if(ctrl_list[i] == 'event') {
                        var event_expire = Math.floor(($scope.$parent.event.time_expire - new Date().getTime())/1000);
                    }
                    else if(ctrl_list[i] == 'EventDetail') {
                        var event_expire = Math.floor(($scope.$parent.EventDetail.event.time_expire - new Date().getTime())/1000);
                    }
                    else {
                        console.log("Parent ctrl not found");
                    }
                }
            }
            //console.log($scope.$parent.hasOwnProperty('event'));
            //for (ctrl in _ctrl_list) {
            //    console.log(_ctrl_list);
            //    if($scope.$parent.hasOwnProperty(ctrl)) {
            //        console.log("parent ctrl: "+ctrl);
            //    }
            //}
            //console.log($scope.$parent);
            //console.log(new Date($scope.$parent.event.time_expire));
             //get data from parent scope and change to seconds remaining
            //var event_expire = Math.floor(($scope.$parent.event.time_expire - new Date().getTime())/1000);
            ////var event_expire = Math.floor(($scope.$parent.EventDetail.event.time_expire - new Date().getTime())/1000);
            var countdown = new ReactiveCountdown(event_expire,{steps:1});
            ////    // start the timer
            countdown.start();

            this.helpers({time_count: function() {
                return countdown.get();
            }});
            //this.helpers({time_count: function(){
            //    if ($scope.countdown !== 'undefined') {
            //        console.log($scope.countdown);
            //        return $scope.countdown.get();
            //
            //    }
            //    else {
            //        return '00:00:00';
            //    }
            //}});
            }
        //link: function($scope, $element, attr){
        //    //$element.text(attr.init);
        //    //attr.$observe('init', function(value){
        //    //    $element.text(attr.init);
        //    //});
        //
        //    // convert milliseconds to seconds init will be the time_expire value
        //    var start_time = Math.floor((this.event.time_expire - new Date().getTime())/1000);
        //    // initialize reactive countdown object with start time
        //    var countdown = new ReactiveCountdown(start_time,{steps:1});
        //    // start countdown
        //    countdown.start();
        //
        //}
    };
});
