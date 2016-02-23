/**
 * Created by Son on 2/23/2016.
 */
/**
 * Author: Son Nguyen
 *
 * file: event-feed.component.js
 *
 * This file declare the controller for event-feed.html
 */
angular
    .module('ClockWork').controller('addEventCtrl', addEventFunction);

function addEventFunction($scope, $meteor, $reactive) {

    //uses 'this' instead of '$scope' because of controllerAs.
    $reactive(this).attach($scope);

    //declaring empty eventS
    this.newEvent = {};

    //this.events = $meteor.collection(ClockWork);
    this.helpers({
        events: function(){
            return ClockWork.find({});
        }
    });

    //use this variable to store the value that is selected in the timePicker.
    var expire_time= "";

    //Edit the dictionary for user preference for the timePicker package.
    //For more information visit: https://github.com/rajeshwarpatlolla/ionic-timepicker
    this.timePickerObject = {
        inputEpochTime: ((new Date()).getHours() * 60 * 60),  //Optional
        step: 5,  //Optional
        format: 24,  //Optional
        titleLabel: '24-hour Format',  //Optional
        setLabel: 'Set',  //Optional
        closeLabel: 'Close',  //Optional
        setButtonType: 'button-positive',  //Optional
        closeButtonType: 'button-stable',  //Optional
        callback: function (val) {    //Mandatory
            timePickerCallback(val);
        }
    };

    function timePickerCallback(val) {
        if (typeof (val) === 'undefined') {
            console.log('Time not selected');
        } else {
            var selectedTime = new Date(val * 1000);
            console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), ':', selectedTime.getUTCMinutes(), 'in UTC');

            //This is not from the timePicker package. Use this variable to append into this.newEvent
            expire_time = val;
        }
    }

    this.addEvent = function(){
        //append expire time from timePicker into newEvent
        this.newEvent['expire'] = expire_time;
        ClockWork.insert(this.newEvent);
        console.log("Added Event:", this.newEvent);
        this.newEvent = {};
    };

}


