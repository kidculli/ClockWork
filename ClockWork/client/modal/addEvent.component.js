/**
 * Created by Son on 2/23/2016.
 */
/**
 * Author: Son Nguyen
 *
 * file: event-feed.component.js
 *
 * This file declare the controller for event-feed.html
 *
 *  -2/24/16 C Lam
 *      -Added fill init to 1
 *      -Added time_created, time_expire, and owner to new event
 *
 *   -2/27/16 C Lam
 *      - Added expired value to new event init false
 */
angular
    .module('ClockWork').controller('addEventCtrl', function($scope, $reactive) {

        //uses 'this' instead of '$scope' because of controllerAs.
        $reactive(this).attach($scope);

        //declaring empty eventS
        this.newEvent = {};

        //this.events = $meteor.collection(ClockWork);
        this.helpers({
            events: function(){
                return Events.find({});
            }
        });

        //use this variable to store the value that is selected in the timePicker.
        var expire_time= 0;

        //Edit the dictionary for user preference for the timePicker package.
        //For more information visit: https://github.com/rajeshwarpatlolla/ionic-timepicker
        //TimePicker uses Unix time stamp
        this.timePickerObject = {
            inputEpochTime: 0, //((new Date()).getHours() * 60 * 60),  //Optional
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
                expire_time = val*1000 + (new Date).getTime();  //Have to multiply 1000 to the epoch time.
            }
        }

        this.addEvent = function(){
            ////convert cap to int if not 10+
            if(this.newEvent['cap'].search('\\++') == -1)
            {
                this.newEvent['cap'] = parseInt(this.newEvent['cap'],10);
            }
            // append time created to newEvent date format is number milliseconds since epoch
            this.newEvent['time_created'] = new Date().getTime();
            //append expire time from timePicker into newEvent
            this.newEvent['time_expire'] = expire_time;
            // initialize current fill of event to 1
            this.newEvent['fill'] = 1;
            // hardcode user id, it will be changed to Meteor.UserId() when sign in implemented
            this.newEvent['owner'] = 'ClockWorkMaster';
            // add empty array for attendees
            this.newEvent['attendees'] = [];
            // add empty object for loc
            this.newEvent['loc'] = {};
            // add expired field
            this.newEvent['expired'] = false;
            Events.insert(this.newEvent);
            console.log("Added Event:", this.newEvent);
            //reset selected time to 0
            expire_time = 0;
            //reset newEvent
            this.newEvent = {};

        };

    });




